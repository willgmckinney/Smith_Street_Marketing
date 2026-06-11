import { motion, useReducedMotion, type Variants } from "framer-motion";

interface ImageHunterDiagramProps {
  className?: string;
  /** When true, the diagram drafts itself in on mount. */
  animate?: boolean;
}

/* ------------------------------------------------------------------ */
/* Projection (2:1 dimetric) + shared palette                          */
/* ------------------------------------------------------------------ */

const U = 26; // grid unit (px per cell along an iso axis)
type Pt = { x: number; y: number };

const P = (cx: number, cy: number, gx: number, gy: number, z = 0): Pt => ({
  x: cx + (gx - gy) * U,
  y: cy + (gx + gy) * (U / 2) - z,
});
const S = (arr: Pt[]) => arr.map((p) => `${p.x},${p.y}`).join(" ");

const SLATE = { top: "#E6EAF0", left: "#C6CFDB", right: "#9DAABA" };

const INK = "stroke-chalk/70";

/* ------------------------------------------------------------------ */
/* Primitives                                                          */
/* ------------------------------------------------------------------ */

type Ramp = typeof SLATE;

const Box = ({
  cx,
  cy,
  a,
  b,
  h,
  z0 = 0,
  ramp,
  edge,
}: {
  cx: number;
  cy: number;
  a: number;
  b: number;
  h: number;
  z0?: number;
  ramp: Ramp;
  edge: string;
}) => {
  const A = P(cx, cy, -a, -b, z0 + h);
  const B = P(cx, cy, a, -b, z0 + h);
  const C = P(cx, cy, a, b, z0 + h);
  const D = P(cx, cy, -a, b, z0 + h);
  const Bb = P(cx, cy, a, -b, z0);
  const Cb = P(cx, cy, a, b, z0);
  const Db = P(cx, cy, -a, b, z0);
  const cls = `${edge} [stroke-width:1] [stroke-linejoin:round]`;
  return (
    <>
      <polygon points={S([B, C, Cb, Bb])} fill={ramp.right} className={cls} />
      <polygon points={S([D, C, Cb, Db])} fill={ramp.left} className={cls} />
      <polygon points={S([A, B, C, D])} fill={ramp.top} className={cls} />
    </>
  );
};

const Cyl = ({
  cx,
  cy,
  rx,
  ry,
  h,
  rings = 0,
  ramp,
  edge,
}: {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  h: number;
  rings?: number;
  ramp: Ramp;
  edge: string;
}) => {
  const topY = cy - h;
  const botY = cy;
  const cls = `${edge} [stroke-width:1]`;
  const body = `M ${cx - rx} ${topY} L ${cx - rx} ${botY} A ${rx} ${ry} 0 0 0 ${cx + rx} ${botY} L ${cx + rx} ${topY}`;
  const ringEls = [];
  for (let k = 1; k <= rings; k++) {
    const y = topY + (k * h) / (rings + 1);
    ringEls.push(
      <path
        key={k}
        d={`M ${cx - rx} ${y} A ${rx} ${ry} 0 0 0 ${cx + rx} ${y}`}
        fill="none"
        className="stroke-chalk/35 [stroke-width:1]"
      />
    );
  }
  return (
    <>
      <path d={body} fill={ramp.left} className={cls} />
      {ringEls}
      <ellipse cx={cx} cy={topY} rx={rx} ry={ry} fill={ramp.top} className={cls} />
    </>
  );
};

const lineProps = (p1: Pt, p2: Pt) => ({ x1: p1.x, y1: p1.y, x2: p2.x, y2: p2.y });

/* ------------------------------------------------------------------ */
/* Role-specific shapes                                                */
/* ------------------------------------------------------------------ */

const Monitor = ({ cx, cy }: { cx: number; cy: number }) => {
  const a = 0.12,
    b = 0.95,
    z0 = 20,
    h = 40;
  const B = P(cx, cy, a, -b, z0 + h);
  const C = P(cx, cy, a, b, z0 + h);
  const Cb = P(cx, cy, a, b, z0);
  const Bb = P(cx, cy, a, -b, z0);
  return (
    <g>
      <Box cx={cx} cy={cy} a={0.42} b={0.42} h={4} ramp={SLATE} edge={INK} />
      <Box cx={cx} cy={cy} a={0.1} b={0.1} h={16} z0={4} ramp={SLATE} edge={INK} />
      <Box cx={cx} cy={cy} a={a} b={b} h={h} z0={z0} ramp={SLATE} edge={INK} />
      <polygon points={S([B, C, Cb, Bb])} fill="#EDF1F7" className={`${INK} [stroke-width:1]`} />
    </g>
  );
};

// a browser/app window: a thin wide slab with three green window dots + content
const ClientPanel = ({ cx, cy }: { cx: number; cy: number }) => {
  const h = 12;
  const dots = [-0.78, -0.62, -0.46].map((g, i) => {
    const p = P(cx, cy, g, -0.6, h);
    return <circle key={i} cx={p.x} cy={p.y} r={2.4} className="fill-marker-start" />;
  });
  const rows = [-0.2, 0.05, 0.3].map((g, i) => (
    <line
      key={i}
      {...lineProps(P(cx, cy, -0.78, g, h), P(cx, cy, 0.5 - i * 0.12, g, h))}
      className="stroke-chalk/30 [stroke-width:1.5]"
    />
  ));
  return (
    <g>
      <Box cx={cx} cy={cy} a={1.0} b={0.85} h={h} ramp={SLATE} edge={INK} />
      {dots}
      {rows}
    </g>
  );
};

const Tower = ({ cx, cy }: { cx: number; cy: number }) => {
  const a = 0.78,
    b = 0.78,
    h = 78;
  const slats = [0.32, 0.5, 0.68].map((f, i) => {
    const z = h * f;
    return (
      <line
        key={i}
        {...lineProps(P(cx, cy, a, -b * 0.55, z), P(cx, cy, a, b * 0.55, z))}
        className="stroke-chalk/35 [stroke-width:1.5]"
      />
    );
  });
  return (
    <g>
      <Box cx={cx} cy={cy} a={a} b={b} h={h} ramp={SLATE} edge={INK} />
      {slats}
    </g>
  );
};

const Database = ({ cx, cy }: { cx: number; cy: number }) => (
  <Cyl cx={cx} cy={cy} rx={30} ry={12} h={66} rings={2} ramp={SLATE} edge={INK} />
);

// a single open storage bucket (tapered pail): wide open top, narrow base
const Bucket = ({ cx, cy }: { cx: number; cy: number }) => {
  const rxT = 30,
    rxB = 20,
    ry = 11,
    ryB = 8,
    h = 42;
  const topY = cy - h;
  const botY = cy;
  const body = `M ${cx - rxT} ${topY} L ${cx - rxB} ${botY} A ${rxB} ${ryB} 0 0 0 ${cx + rxB} ${botY} L ${cx + rxT} ${topY}`;
  return (
    <g>
      <path d={body} fill={SLATE.left} className={`${INK} [stroke-width:1]`} />
      <ellipse cx={cx} cy={topY} rx={rxT} ry={ry} fill={SLATE.top} className={`${INK} [stroke-width:1]`} />
      <ellipse cx={cx} cy={topY} rx={rxT - 6} ry={ry - 3} fill={SLATE.right} className="stroke-chalk/30 [stroke-width:1]" />
    </g>
  );
};

// an external cloud (the third-party vendor APIs)
const Cloud = ({ cx, cy }: { cx: number; cy: number }) => {
  const d = `M ${cx - 58} ${cy + 16} C ${cx - 74} ${cy + 16} ${cx - 74} ${cy - 8} ${cx - 52} ${cy - 9} C ${cx - 48} ${cy - 32} ${cx - 14} ${cy - 36} ${cx - 4} ${cy - 18} C ${cx + 4} ${cy - 40} ${cx + 42} ${cy - 40} ${cx + 46} ${cy - 12} C ${cx + 72} ${cy - 15} ${cx + 74} ${cy + 13} ${cx + 52} ${cy + 16} Z`;
  return (
    <g>
      <path d={d} fill={SLATE.top} className={`${INK} [stroke-width:1.5] [stroke-linejoin:round]`} />
      <line
        {...lineProps({ x: cx - 56, y: cy + 16 }, { x: cx + 50, y: cy + 16 })}
        className="stroke-chalk/20 [stroke-width:1]"
      />
    </g>
  );
};

// a stack of offset flat sheets => the celery message queue
const Queue = ({ cx, cy }: { cx: number; cy: number }) => (
  <g>
    {[
      { dx: 22, dy: -12 },
      { dx: 0, dy: 0 },
      { dx: -22, dy: 12 },
    ].map((o, i) => (
      <Box key={i} cx={cx + o.dx} cy={cy + o.dy} a={0.72} b={0.55} h={6} ramp={SLATE} edge={INK} />
    ))}
  </g>
);

/* ------------------------------------------------------------------ */
/* Nodes                                                               */
/* ------------------------------------------------------------------ */

type Shape = "monitor" | "client" | "tower" | "database" | "bucket" | "cloud" | "queue";

type Node = {
  id: string;
  fig: string;
  name: string;
  shape: Shape;
  cx: number;
  cy: number;
  ch: number; // connect height (mid) above ground
  r: number; // connect radius
  ldy: number; // label drop below ground
};

const NODES: Node[] = [
  { id: "user", fig: "01", name: "user", shape: "monitor", cx: 115, cy: 150, ch: 38, r: 36, ldy: 30 },
  { id: "client", fig: "02", name: "client", shape: "client", cx: 255, cy: 235, ch: 12, r: 44, ldy: 34 },
  { id: "ec2", fig: "03", name: "ec2", shape: "tower", cx: 450, cy: 305, ch: 44, r: 44, ldy: 36 },
  { id: "postgis", fig: "04", name: "postgis", shape: "database", cx: 880, cy: 210, ch: 36, r: 34, ldy: 30 },
  { id: "s3", fig: "05", name: "s3", shape: "bucket", cx: 885, cy: 400, ch: 22, r: 36, ldy: 34 },
  { id: "vendor", fig: "06", name: "vendor apis", shape: "cloud", cx: 630, cy: 120, ch: 0, r: 58, ldy: 56 },
  { id: "celery", fig: "07", name: "celery queue", shape: "queue", cx: 300, cy: 410, ch: 8, r: 50, ldy: 36 },
];

const renderShape = (n: Node) => {
  switch (n.shape) {
    case "monitor":
      return <Monitor cx={n.cx} cy={n.cy} />;
    case "client":
      return <ClientPanel cx={n.cx} cy={n.cy} />;
    case "tower":
      return <Tower cx={n.cx} cy={n.cy} />;
    case "database":
      return <Database cx={n.cx} cy={n.cy} />;
    case "bucket":
      return <Bucket cx={n.cx} cy={n.cy} />;
    case "cloud":
      return <Cloud cx={n.cx} cy={n.cy} />;
    case "queue":
      return <Queue cx={n.cx} cy={n.cy} />;
  }
};

const byId = Object.fromEntries(NODES.map((n) => [n.id, n]));
const connect = (id: string) => {
  const n = byId[id];
  return { x: n.cx, y: n.cy - n.ch, r: n.r };
};

type Conn = {
  from: string;
  to: string;
  dashed?: boolean;
  accent?: boolean;
  label?: string;
  labelOff?: Pt;
};

const CONNS: Conn[] = [
  { from: "user", to: "client", accent: true, label: "https", labelOff: { x: 26, y: -6 } },
  { from: "client", to: "ec2", accent: true, label: "jwt", labelOff: { x: 4, y: -14 } },
  { from: "ec2", to: "vendor" },
  { from: "ec2", to: "postgis" },
  { from: "ec2", to: "s3" },
  { from: "celery", to: "ec2", dashed: true },
];

/* ------------------------------------------------------------------ */
/* Motion                                                              */
/* ------------------------------------------------------------------ */

const nodeRise: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.3 + i * 0.08, duration: 0.35, ease: [0.2, 0, 0, 1] },
  }),
};

const drawLine: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { delay: 1.0 + i * 0.05, duration: 0.45, ease: [0.2, 0, 0, 1] },
      opacity: { delay: 1.0 + i * 0.05, duration: 0.15 },
    },
  }),
};

const drawAccent: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { delay: 1.3 + i * 0.08, duration: 0.45, ease: [0.2, 0, 0, 1] },
      opacity: { delay: 1.3 + i * 0.08, duration: 0.15 },
    },
  }),
};

const fadeDash: Variants = {
  hidden: { opacity: 0 },
  visible: (i: number) => ({
    opacity: 1,
    transition: { delay: 1.15 + i * 0.05, duration: 0.4 },
  }),
};

/* ------------------------------------------------------------------ */
/* Wrappers                                                            */
/* ------------------------------------------------------------------ */

const IsoNode = ({ node, flowIndex, active }: { node: Node; flowIndex: number; active: boolean }) => (
  <g className="group transition-[transform,filter] duration-[130ms] ease-spec hover:-translate-y-px hover:[filter:brightness(1.05)] motion-reduce:transition-none">
    <motion.g custom={flowIndex} variants={active ? nodeRise : undefined}>
      {renderShape(node)}
      <text
        x={node.cx}
        y={node.cy + node.ldy}
        textAnchor="middle"
        className="font-mono [font-size:15px] lowercase [letter-spacing:0.04em]"
      >
        <tspan className="fill-marker-start">{node.fig} </tspan>
        <tspan className="fill-chalk">{node.name}</tspan>
      </text>
    </motion.g>
  </g>
);

const trim = (from: Pt, to: Pt, r: number): Pt => {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const L = Math.hypot(dx, dy) || 1;
  return { x: from.x + (dx / L) * r, y: from.y + (dy / L) * r };
};

const IsoConnector = ({ conn, order, active }: { conn: Conn; order: number; active: boolean }) => {
  const a = connect(conn.from);
  const b = connect(conn.to);
  const p1 = trim({ x: a.x, y: a.y }, { x: b.x, y: b.y }, a.r);
  const p2 = trim({ x: b.x, y: b.y }, { x: a.x, y: a.y }, b.r);
  const mid = { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 };

  const stroke = conn.accent ? "stroke-marker-start" : "stroke-chalk/45";
  const width = conn.accent ? 2 : 1.4;
  const marker = conn.accent ? "url(#ih-arrow-green)" : "url(#ih-arrow-ink)";
  const variants = conn.dashed ? fadeDash : conn.accent ? drawAccent : drawLine;
  const off = conn.labelOff ?? { x: 0, y: -6 };

  return (
    <g>
      <motion.line
        x1={p1.x}
        y1={p1.y}
        x2={p2.x}
        y2={p2.y}
        className={stroke}
        style={{ strokeWidth: width }}
        strokeDasharray={conn.dashed ? "6 5" : undefined}
        markerEnd={marker}
        custom={order}
        variants={active ? variants : undefined}
      />
      {conn.label && (
        <text
          x={mid.x + off.x}
          y={mid.y + off.y}
          textAnchor="middle"
          className="font-mono [font-size:13px] lowercase [letter-spacing:0.08em] fill-marker-start"
        >
          {conn.label}
        </text>
      )}
    </g>
  );
};

const FloorGrid = ({ active }: { active: boolean }) => {
  const O = { x: 450, y: 70 };
  const lines: [Pt, Pt][] = [];
  for (let gx = -18; gx <= 30; gx++) lines.push([P(O.x, O.y, gx, -6), P(O.x, O.y, gx, 26)]);
  for (let gy = -6; gy <= 26; gy++) lines.push([P(O.x, O.y, -18, gy), P(O.x, O.y, 30, gy)]);
  return (
    <motion.g
      aria-hidden
      className="stroke-chalk/[0.07]"
      style={{ strokeWidth: 1 }}
      initial={active ? { opacity: 0 } : false}
      animate={active ? { opacity: 1 } : false}
      transition={{ duration: 0.35 }}
    >
      {lines.map((l, i) => (
        <line key={i} x1={l[0].x} y1={l[0].y} x2={l[1].x} y2={l[1].y} />
      ))}
    </motion.g>
  );
};

/* ------------------------------------------------------------------ */
/* Diagram                                                             */
/* ------------------------------------------------------------------ */

const drawOrder = [...NODES].sort((a, b) => a.cy - b.cy);

export const ImageHunterDiagram = ({ className = "", animate = false }: ImageHunterDiagramProps) => {
  const prefersReducedMotion = useReducedMotion();
  const active = animate && !prefersReducedMotion;

  return (
    <motion.svg
      viewBox="60 60 890 404"
      fill="none"
      className={className}
      role="img"
      aria-label="Isometric architecture of Apollo Mapping's ImageHunter. A user on a monitor reaches the client over HTTPS, which calls an EC2 backend over a JWT-secured path. EC2 queries a PostGIS imagery catalog, fetches availability from a cloud of vendor APIs, and caches previews to an S3 bucket. A Celery queue feeds the backend asynchronously."
      initial={active ? "hidden" : false}
      animate={active ? "visible" : false}
    >
      <defs>
        <marker id="ih-arrow-ink" viewBox="0 0 8 8" refX="6.5" refY="4" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0,0 L8,4 L0,8 Z" fill="#64748B" />
        </marker>
        <marker id="ih-arrow-green" viewBox="0 0 8 8" refX="6.5" refY="4" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0,0 L8,4 L0,8 Z" fill="#129A6A" />
        </marker>
      </defs>

      <FloorGrid active={active} />

      {/* ink + dashed paths, behind the shapes so they read as anchored */}
      {CONNS.filter((c) => !c.accent).map((c, i) => (
        <IsoConnector key={`${c.from}-${c.to}`} conn={c} order={i} active={active} />
      ))}

      {/* shapes, back to front */}
      {drawOrder.map((n) => (
        <IsoNode key={n.id} node={n} flowIndex={NODES.findIndex((x) => x.id === n.id)} active={active} />
      ))}

      {/* green request path, drawn last on top */}
      {CONNS.filter((c) => c.accent).map((c, i) => (
        <IsoConnector key={`${c.from}-${c.to}`} conn={c} order={i} active={active} />
      ))}
    </motion.svg>
  );
};
