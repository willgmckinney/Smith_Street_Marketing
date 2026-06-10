import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { NodeSymbol, SYMBOL_RADIUS } from "./ArchitectureSymbols";
import { ARCHITECTURES, hingeInOf, type ArchNode } from "./architectures";

interface ArchitectureCycleProps {
  className?: string;
}

/* ------------------------------------------------------------------ */
/* Projection + layout constants                                       */
/* ------------------------------------------------------------------ */

// Placement is intentionally flatter/wider than the symbols' own 2:1 iso, so
// nodes spread out horizontally and don't pile on top of each other.
const GUX = 60; // horizontal px per grid step
const GUY = 24; // vertical px per grid step
const ORIGIN = { x: 430, y: 48 };
const ICON_SCALE = 0.7; // symbols are drawn large; shrink them for clearance
type Pt = { x: number; y: number };

const project = ([gx, gy]: [number, number]): Pt => ({
  x: ORIGIN.x + (gx - gy) * GUX,
  y: ORIGIN.y + (gx + gy) * GUY,
});

const trim = (from: Pt, to: Pt, r: number): Pt => {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const L = Math.hypot(dx, dy) || 1;
  return { x: from.x + (dx / L) * r, y: from.y + (dy / L) * r };
};

const SPEC = [0.2, 0, 0, 1] as const;
const HOLD = 4000;
const TRANS = 900;
const LABEL_DY = 30;

/* ------------------------------------------------------------------ */
/* Edge                                                                */
/* ------------------------------------------------------------------ */

const Edge = ({
  p1,
  p2,
  dashed,
  reduced,
}: {
  p1: Pt;
  p2: Pt;
  dashed?: boolean;
  reduced: boolean;
}) => (
  <motion.line
    x1={p1.x}
    y1={p1.y}
    x2={p2.x}
    y2={p2.y}
    className="stroke-chalk/45"
    style={{ strokeWidth: 1.5 }}
    strokeDasharray={dashed ? "5 4" : undefined}
    markerEnd="url(#ac-arrow)"
    initial={reduced ? { opacity: 0 } : { pathLength: 0, opacity: 0 }}
    animate={reduced ? { opacity: 1 } : { pathLength: 1, opacity: 1 }}
    exit={{ opacity: 0, transition: { duration: 0.15 } }}
    transition={
      reduced
        ? { duration: 0.2 }
        : { pathLength: { delay: 0.5, duration: 0.35, ease: SPEC }, opacity: { delay: 0.5, duration: 0.2 } }
    }
  />
);

/* ------------------------------------------------------------------ */
/* Node                                                                */
/* ------------------------------------------------------------------ */

type NodeRole = "hingeIn" | "hingeOut" | "plain";

// Label with a background knockout so connectors always read behind the text.
const Label = ({ text, accent }: { text: string; accent: boolean }) => {
  const w = text.length * 5.8 + 10;
  return (
    <g>
      <rect x={-w / 2} y={LABEL_DY - 10} width={w} height={14} rx={2.5} className="fill-blueprint-base" />
      <text
        x={0}
        y={LABEL_DY}
        textAnchor="middle"
        className={`font-mono [font-size:9.5px] lowercase ${accent ? "fill-marker-start" : "fill-chalk/55"}`}
      >
        {text}
      </text>
    </g>
  );
};

const Node = ({
  node,
  pos,
  role,
  accent,
  index,
  reduced,
}: {
  node: ArchNode;
  pos: Pt;
  role: NodeRole;
  accent: boolean;
  index: number;
  reduced: boolean;
}) => {
  if (reduced) {
    return (
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, x: pos.x, y: pos.y }}
        exit={{ opacity: 0, transition: { duration: 0.2 } }}
        transition={{ duration: 0.2 }}
      >
        <g transform={`scale(${ICON_SCALE})`}>
          <NodeSymbol name={node.symbol} accent={accent} />
        </g>
        <Label text={node.label} accent={accent} />
      </motion.g>
    );
  }

  const persists = role === "hingeIn"; // arrived from previous frame, eases into place
  return (
    <motion.g
      initial={{ x: pos.x, y: pos.y, scale: 0, opacity: 0 }}
      animate={{
        x: pos.x,
        y: pos.y,
        scale: persists ? [1, 1.06, 1] : 1,
        opacity: 1,
      }}
      exit={{ scale: 0, opacity: 0, transition: { duration: 0.32, delay: index * 0.04, ease: SPEC } }}
      transition={
        persists
          ? {
              x: { delay: 0.1, duration: 0.6, ease: SPEC },
              y: { delay: 0.1, duration: 0.6, ease: SPEC },
              scale: { delay: 0.1, duration: 0.6, ease: SPEC },
              opacity: { duration: 0.2 },
            }
          : { delay: 0.45 + index * 0.05, duration: 0.4, ease: SPEC }
      }
    >
      <g transform={`scale(${ICON_SCALE})`}>
        <NodeSymbol name={node.symbol} accent={accent} />
      </g>
      <Label text={node.label} accent={accent} />
    </motion.g>
  );
};

/* ------------------------------------------------------------------ */
/* Cycle                                                               */
/* ------------------------------------------------------------------ */

export const ArchitectureCycle = ({ className = "" }: ArchitectureCycleProps) => {
  const reduced = useReducedMotion() ?? false;
  const [step, setStep] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduced || paused) return;
    const t = setTimeout(() => setStep((s) => (s + 1) % ARCHITECTURES.length), HOLD + TRANS);
    return () => clearTimeout(t);
  }, [step, paused, reduced]);

  const arch = ARCHITECTURES[step];
  const hingeOutId = arch.hingeOut;
  const hingeInId = hingeInOf(step);
  const prevHinge = (step - 1 + ARCHITECTURES.length) % ARCHITECTURES.length;

  const posById: Record<string, Pt> = {};
  arch.nodes.forEach((n) => {
    posById[n.id] = project(n.grid);
  });

  const keyFor = (n: ArchNode): string => {
    if (n.id === hingeOutId) return `H${step}`;
    if (n.id === hingeInId) return `H${prevHinge}`;
    return `${step}:${n.id}`;
  };
  const roleFor = (n: ArchNode): NodeRole =>
    n.id === hingeInId ? "hingeIn" : n.id === hingeOutId ? "hingeOut" : "plain";

  // draw back-to-front by screen depth so nearer nodes overlap farther ones
  const drawNodes = [...arch.nodes].sort((a, b) => project(a.grid).y - project(b.grid).y);

  return (
    <div
      className={className}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <svg
        viewBox="195 80 660 250"
        fill="none"
        className="w-full"
        role="img"
        aria-label={`${arch.name}: ${arch.useCase}. One of six reference architectures cycling through a shared hinge node.`}
      >
        <defs>
          <marker
            id="ac-arrow"
            markerUnits="userSpaceOnUse"
            markerWidth="11"
            markerHeight="11"
            refX="7.5"
            refY="4"
            orient="auto"
          >
            {/* open chevron: the shaft merges into the point, no filled head to show through */}
            <path
              d="M1.5,1 L7.5,4 L1.5,7"
              fill="none"
              className="stroke-chalk/50"
              strokeWidth={1.4}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </marker>
        </defs>

        <AnimatePresence>
          {arch.edges.map((e) => {
            const a = posById[e.from];
            const b = posById[e.to];
            if (!a || !b) return null;
            const ra = (SYMBOL_RADIUS[arch.nodes.find((n) => n.id === e.from)?.symbol ?? ""] ?? 30) * ICON_SCALE + 6;
            const rb = (SYMBOL_RADIUS[arch.nodes.find((n) => n.id === e.to)?.symbol ?? ""] ?? 30) * ICON_SCALE + 6;
            return (
              <Edge
                key={`${step}:${e.from}-${e.to}`}
                p1={trim(a, b, ra)}
                p2={trim(b, a, rb)}
                dashed={e.style === "dashed"}
                reduced={reduced}
              />
            );
          })}
        </AnimatePresence>

        <AnimatePresence>
          {drawNodes.map((n, i) => (
            <Node
              key={keyFor(n)}
              node={n}
              pos={posById[n.id]}
              role={roleFor(n)}
              accent={n.id === hingeOutId}
              index={i}
              reduced={reduced}
            />
          ))}
        </AnimatePresence>
      </svg>

      {/* use-case caption, styled like a drawing's notes block, pinned to the right */}
      <div className="mt-cell flex min-h-[5rem] justify-end px-1 pr-10 sm:pr-16 lg:pr-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0.2 : 0.3 }}
            className="w-full max-w-xs border-t border-chalk/15 pt-2 text-right"
          >
            <p className="font-mono text-label-mono lowercase tracking-wide">
              <span className="text-chalk/40">notes · </span>
              <span className="text-marker-start">
                {String(step + 1).padStart(2, "0")} / {String(ARCHITECTURES.length).padStart(2, "0")}
              </span>
            </p>
            <p className="mt-1 font-display font-semibold leading-tight text-chalk">{arch.name}</p>
            <p className="mt-1 font-mono text-xs lowercase text-chalk/55">// {arch.useCase}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
