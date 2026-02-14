import { motion } from "framer-motion";

interface PitonProps {
  isActive: boolean;
  isPassed: boolean;
  number: number;
  side: "left" | "right";
}

export const Piton = ({ isActive, isPassed, number, side }: PitonProps) => {
  const lit = isPassed || isActive;

  return (
    <motion.div
      className={`absolute top-1/2 -translate-y-1/2 z-20 ${
        side === "left"
          ? "-left-4 -translate-x-1/2"
          : "-right-4 translate-x-1/2"
      }`}
      initial={{ scale: 0 }}
      animate={{ scale: isActive ? 1.1 : isPassed ? 1 : 0.9 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
    >
      {/* Outer glow for active piton */}
      {isActive && (
        <div className="absolute -inset-4 rounded-full animate-piton-pulse" />
      )}

      {/* Piton body — metal anchor ring the rope threads through */}
      <div
        className={`
          relative w-12 h-12 rounded-full
          flex items-center justify-center
          transition-all duration-500
          ${
            isActive
              ? "bg-gradient-to-br from-sunrise-amber via-[#4A90B8] to-rope-gold shadow-[0_0_20px_rgba(100,181,246,0.4)]"
              : lit
                ? "bg-gradient-to-br from-[#7A7A7A] to-[#5C5C5C] shadow-lg"
                : "bg-gradient-to-br from-cliff-mid to-cliff-dark shadow-md"
          }
        `}
      >
        {/* Metal ring border */}
        <div
          className={`
            absolute inset-0 rounded-full border-2 transition-colors duration-500
            ${
              isActive
                ? "border-[#C8E6FF]/60"
                : lit
                  ? "border-white/15"
                  : "border-white/5"
            }
          `}
        />

        {/* Inner bevel / depth ring */}
        <div
          className={`
            absolute inset-[3px] rounded-full border transition-colors duration-500
            ${
              isActive
                ? "border-black/20"
                : "border-black/15"
            }
          `}
        />

        {/* Carabiner hole (top notch) */}
        <div
          className={`
            absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full
            transition-colors duration-500
            ${
              isActive
                ? "bg-deep-horizon border-2 border-sunrise-amber/80"
                : lit
                  ? "bg-deep-horizon border-2 border-white/20"
                  : "bg-deep-horizon border-2 border-white/10"
            }
          `}
        />

        {/* Milestone number */}
        <span
          className={`
            relative font-mono text-sm font-bold leading-none
            transition-colors duration-500
            ${isActive ? "text-deep-horizon" : lit ? "text-white/80" : "text-white/30"}
          `}
        >
          {number}
        </span>

        {/* Shine highlight */}
        <div
          className={`
            absolute top-1 left-1 w-4 h-4 rounded-full
            bg-gradient-to-br from-white/30 to-transparent
            transition-opacity duration-500
            ${isActive ? "opacity-60" : lit ? "opacity-20" : "opacity-10"}
          `}
        />
      </div>
    </motion.div>
  );
};
