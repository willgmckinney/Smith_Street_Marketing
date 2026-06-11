import { motion, useReducedMotion } from "framer-motion";

interface DimensionLineProps {
  label?: string;
  className?: string;
  /** When true, the line draws in once on scroll into view. */
  reveal?: boolean;
}

export const DimensionLine = ({
  label,
  className = "",
  reveal = false,
}: DimensionLineProps) => {
  const prefersReducedMotion = useReducedMotion();
  const animate = reveal && !prefersReducedMotion;

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <motion.div
        className="flex-1 flex items-center origin-left"
        {...(animate
          ? {
              initial: { scaleX: 0, opacity: 0 },
              whileInView: { scaleX: 1, opacity: 1 },
              viewport: { once: true, margin: "-10% 0px" },
              transition: { duration: 0.3, ease: [0.2, 0, 0, 1] },
            }
          : {})}
      >
        <div className="w-px h-2 bg-marker-start/60" />
        <div className="flex-1 h-px bg-marker-start/40" />
        <div className="w-px h-2 bg-marker-start/60" />
      </motion.div>
      {label && (
        <span className="font-mono text-label-mono text-marker-start/80 lowercase shrink-0">
          {label}
        </span>
      )}
    </div>
  );
};
