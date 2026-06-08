import { motion } from "framer-motion";

interface StationMarkerProps {
  isActive: boolean;
  isPassed: boolean;
  number: number;
  side: "left" | "right";
}

export const StationMarker = ({
  isActive,
  isPassed,
  number,
  side,
}: StationMarkerProps) => {
  const lit = isPassed || isActive;

  return (
    <motion.div
      className={`absolute top-1/2 -translate-y-1/2 z-20 ${
        side === "left"
          ? "-left-4 -translate-x-1/2"
          : "-right-4 translate-x-1/2"
      }`}
      initial={{ scale: 0 }}
      animate={{ scale: isActive ? 1.05 : isPassed ? 1 : 0.9 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
    >
      {isActive && (
        <div className="absolute -inset-3 rounded-spec animate-station-set" />
      )}

      <div
        className={`
          relative w-10 h-10 rounded-spec
          flex items-center justify-center
          border transition-all duration-500
          ${
            isActive
              ? "bg-marker-start border-marker-end text-blueprint-base"
              : lit
                ? "bg-sheet-mid border-chalk/20 text-chalk/80"
                : "bg-sheet-dark border-chalk/10 text-chalk/30"
          }
        `}
      >
        <span className="relative font-mono text-sm font-bold leading-none">
          {number}
        </span>

        {/* Corner ticks */}
        <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-current opacity-40" />
        <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-current opacity-40" />
      </div>
    </motion.div>
  );
};
