import { motion, useReducedMotion, type Variants } from "framer-motion";

interface SystemDiagramProps {
  className?: string;
  /** When true, the diagram draws itself in on mount. */
  animate?: boolean;
}

const container: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const draw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 0.6, ease: [0.2, 0, 0, 1] },
      opacity: { duration: 0.2 },
    },
  },
};

const fade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
};

/**
 * Blueprint-line schematic of a production system: client to API on ECS
 * Fargate, backed by Postgres and Redis, fronted by S3 imagery. Drawn in the
 * site's line style with mono annotations. Doubles as the hero asset and a
 * reusable architecture-diagram primitive for case studies.
 */
export const SystemDiagram = ({
  className = "",
  animate = false,
}: SystemDiagramProps) => {
  const prefersReducedMotion = useReducedMotion();
  const active = animate && !prefersReducedMotion;

  const node =
    "fill-drafting-surface stroke-chalk/70 [stroke-width:1.5]";
  const accentNode = "fill-drafting-surface stroke-marker-start [stroke-width:1.5]";
  const link = "stroke-chalk/40 [stroke-width:1.5]";

  return (
    <motion.svg
      viewBox="0 0 360 420"
      fill="none"
      className={className}
      role="img"
      aria-label="System architecture: client to API on ECS Fargate, backed by Postgres and Redis, fronted by S3 imagery."
      variants={container}
      initial={active ? "hidden" : false}
      animate={active ? "visible" : false}
    >
      {/* connectors */}
      <motion.line x1="180" y1="86" x2="180" y2="150" className={link} variants={draw} />
      <motion.line x1="180" y1="214" x2="100" y2="300" className={link} variants={draw} />
      <motion.line x1="180" y1="214" x2="260" y2="300" className={link} variants={draw} />
      <motion.line x1="260" y1="182" x2="320" y2="120" className={link} variants={draw} />

      {/* client */}
      <motion.rect x="110" y="32" width="140" height="54" rx="3" className={node} variants={draw} />
      {/* api / ecs fargate (accent node) */}
      <motion.rect x="100" y="150" width="160" height="64" rx="3" className={accentNode} variants={draw} />
      {/* postgres */}
      <motion.rect x="32" y="300" width="136" height="54" rx="3" className={node} variants={draw} />
      {/* redis */}
      <motion.rect x="200" y="300" width="128" height="54" rx="3" className={node} variants={draw} />
      {/* s3 imagery */}
      <motion.rect x="262" y="92" width="78" height="48" rx="3" className={node} variants={draw} />

      {/* labels */}
      <motion.g variants={fade} className="font-mono fill-chalk [font-size:13px] [letter-spacing:0.04em]">
        <text x="180" y="63" textAnchor="middle">client</text>
        <text x="180" y="178" textAnchor="middle" className="fill-marker-start">api</text>
        <text x="180" y="198" textAnchor="middle" className="fill-chalk/60 [font-size:11px]">ecs fargate</text>
        <text x="100" y="331" textAnchor="middle">postgres</text>
        <text x="264" y="331" textAnchor="middle">redis</text>
        <text x="301" y="120" textAnchor="middle" className="[font-size:11px]">s3</text>
      </motion.g>

      {/* edge dimension annotation */}
      <motion.g variants={fade} className="font-mono fill-marker-start/80 [font-size:11px] [letter-spacing:0.12em]">
        <line x1="84" y1="150" x2="84" y2="214" className="stroke-marker-start/50" />
        <line x1="80" y1="150" x2="88" y2="150" className="stroke-marker-start/50" />
        <line x1="80" y1="214" x2="88" y2="214" className="stroke-marker-start/50" />
        <text x="76" y="186" textAnchor="end">async</text>
      </motion.g>
    </motion.svg>
  );
};
