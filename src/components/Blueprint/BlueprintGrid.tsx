import { motion, useReducedMotion } from "framer-motion";

interface BlueprintGridProps {
  dense?: boolean;
  className?: string;
  animate?: boolean;
  /** Layer opacity multiplier, 0–1. Grid line weight is set in tailwind.config.js. */
  opacity?: number;
}

export const BlueprintGrid = ({
  dense = false,
  className = "",
  animate = false,
  opacity = 0.65,
}: BlueprintGridProps) => {
  const prefersReducedMotion = useReducedMotion();

  const gridClass = dense ? "bg-blueprint-grid-dense" : "bg-blueprint-grid";
  const sizeClass = dense ? "bg-[length:16px_16px]" : "bg-[length:32px_32px]";

  if (animate && !prefersReducedMotion) {
    return (
      <motion.div
        aria-hidden
        className={`absolute inset-0 bg-blueprint-base ${gridClass} ${sizeClass} pointer-events-none ${className}`}
        initial={{ opacity: 0, scale: 1.02 }}
        animate={{ opacity: Math.max(opacity, 0.75), scale: 1 }}
        transition={{ duration: 1.2, ease: [0.2, 0, 0, 1] }}
      />
    );
  }

  return (
    <div
      aria-hidden
      className={`absolute inset-0 bg-blueprint-base ${gridClass} ${sizeClass} pointer-events-none ${className}`}
      style={{ opacity }}
    />
  );
};
