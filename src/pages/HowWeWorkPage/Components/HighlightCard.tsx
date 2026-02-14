import { motion } from "framer-motion";
import type { TimelineMilestone } from "../data/timelineContent";

interface HighlightCardProps {
  content: TimelineMilestone;
  isVisible: boolean;
  side: "left" | "right";
  milestoneNumber: number;
  totalMilestones: number;
}

const iconMap: Record<string, React.ReactNode> = {
  compass: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  ),
  layers: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  ),
  brain: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" />
    </svg>
  ),
  chart: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  ),
  summit: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 3l4 8 5-5 5 15H2L8 3z" />
    </svg>
  ),
};

export const HighlightCard = ({
  content,
  isVisible,
  side,
  milestoneNumber,
  totalMilestones,
}: HighlightCardProps) => {
  const isLastMilestone = milestoneNumber === totalMilestones;

  return (
    <motion.div
      className={`
        w-full md:w-[calc(50%-40px)]
        ${side === "left" ? "md:mr-auto md:pr-4" : "md:ml-auto md:pl-4"}
      `}
      initial={{ opacity: 0, x: 0, y: 20 }}
      animate={{
        opacity: isVisible ? 1 : 0.15,
        x: 0,
        y: isVisible ? 0 : 10,
      }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: 0.1,
      }}
    >
      <div
        className={`
          relative p-6 md:p-8 rounded-2xl
          bg-atmospheric-haze/90 backdrop-blur-xl
          border transition-all duration-500
          ${
            isVisible
              ? "border-sunrise-amber/30 shadow-[0_8px_32px_rgba(100,181,246,0.15)]"
              : "border-white/5 shadow-lg"
          }
          ${isLastMilestone && isVisible ? "ring-2 ring-golden-hour-start/30" : ""}
        `}
      >
        {/* Top rim light */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        {/* Altitude label */}
        <div className="flex items-center gap-3 mb-4">
          <div
            className={`
              w-10 h-10 rounded-xl flex items-center justify-center
              transition-all duration-500
              ${
                isVisible
                  ? "bg-gradient-to-br from-sunrise-amber to-golden-hour-start text-deep-horizon"
                  : "bg-cliff-mid text-cliff-light"
              }
            `}
          >
            {iconMap[content.icon] || iconMap.compass}
          </div>

          <div className="flex-1">
            <span
              className={`
                font-mono text-[10px] tracking-[0.2em] uppercase
                ${isVisible ? "text-sunrise-amber" : "text-cliff-light"}
              `}
            >
              Camp {milestoneNumber} of {totalMilestones}
              {isLastMilestone ? " — Summit" : ""}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3
          className={`
            font-display text-xl md:text-2xl font-bold mb-3
            transition-colors duration-500
            ${isVisible ? "text-white" : "text-granite/40"}
          `}
        >
          {content.title}
        </h3>

        {/* Description */}
        <p
          className={`
            text-sm md:text-base leading-relaxed mb-6
            transition-colors duration-500
            ${isVisible ? "text-granite/80" : "text-granite/30"}
          `}
        >
          {content.description}
        </p>

        {/* Metrics */}
        {content.metrics && content.metrics.length > 0 && (
          <div
            className={`
              flex gap-6 pt-5 border-t transition-colors duration-500
              ${isVisible ? "border-white/10" : "border-white/5"}
            `}
          >
            {content.metrics.map((metric, i) => (
              <div key={i} className="flex flex-col">
                <span
                  className={`
                    font-mono text-2xl md:text-3xl font-bold leading-none
                    transition-colors duration-500
                    ${isVisible ? "text-alpine-ice" : "text-cliff-light"}
                  `}
                >
                  {metric.value}
                </span>
                <span
                  className={`
                    text-[10px] uppercase tracking-wider mt-1
                    transition-colors duration-500
                    ${isVisible ? "text-granite/50" : "text-granite/20"}
                  `}
                >
                  {metric.label}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Connector line to center (desktop only) */}
        <div
          className={`
            hidden md:block absolute top-1/2 w-8 h-[2px]
            transition-all duration-500
            ${
              isVisible
                ? "bg-gradient-to-r from-sunrise-amber/60 to-transparent"
                : "bg-white/5"
            }
            ${side === "left" ? "right-0 translate-x-full" : "left-0 -translate-x-full rotate-180"}
          `}
        />
      </div>
    </motion.div>
  );
};
