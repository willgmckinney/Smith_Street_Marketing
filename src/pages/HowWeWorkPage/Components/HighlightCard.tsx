import { motion } from "framer-motion";
import { BlueprintCard } from "../../../components/Blueprint/BlueprintCard";
import type { TimelineMilestone } from "../data/timelineContent";

const STAGE_LABELS = [
  "foundations",
  "framing",
  "framing",
  "finishing",
  "handoff",
];

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
  handoff: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
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
  const stageLabel = STAGE_LABELS[milestoneNumber - 1] ?? "scope";

  return (
    <motion.div
      className={`
        w-full md:w-[calc(50%-40px)]
        ${side === "left" ? "md:mr-auto md:pr-4" : "md:ml-auto md:pl-4"}
      `}
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: isVisible ? 1 : 0.15,
        y: isVisible ? 0 : 10,
      }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: 0.1,
      }}
    >
      <BlueprintCard
        index={milestoneNumber}
        accent={isVisible}
        className={`p-6 md:p-8 transition-all duration-500 ${
          isVisible ? "border-marker-start/30" : "border-chalk/5"
        }`}
      >
        <div className="flex items-center gap-3 mb-4 pt-6">
          <div
            className={`
              w-10 h-10 rounded-spec flex items-center justify-center border
              transition-all duration-500
              ${
                isVisible
                  ? "bg-marker-start/20 border-marker-start text-marker-start"
                  : "bg-sheet-mid border-chalk/10 text-sheet-light"
              }
            `}
          >
            {iconMap[content.icon] || iconMap.compass}
          </div>

          <div className="flex-1">
            <span
              className={`
                font-mono text-[10px] tracking-[0.2em] lowercase
                ${isVisible ? "text-marker-start" : "text-sheet-light"}
              `}
            >
              {stageLabel} · station {milestoneNumber} of {totalMilestones}
            </span>
          </div>
        </div>

        <h3
          className={`
            font-display text-xl md:text-2xl font-bold mb-3
            transition-colors duration-500
            ${isVisible ? "text-white" : "text-chalk/40"}
          `}
        >
          {content.title}
        </h3>

        <p
          className={`
            text-sm md:text-base leading-relaxed mb-6
            transition-colors duration-500
            ${isVisible ? "text-chalk/80" : "text-chalk/30"}
          `}
        >
          {content.description}
        </p>

        {content.metrics && content.metrics.length > 0 && (
          <div
            className={`
              flex gap-6 pt-5 border-t transition-colors duration-500
              ${isVisible ? "border-chalk/10" : "border-chalk/5"}
            `}
          >
            {content.metrics.map((metric, i) => (
              <div key={i} className="flex flex-col">
                <span
                  className={`
                    font-mono text-2xl md:text-3xl font-bold leading-none
                    transition-colors duration-500
                    ${isVisible ? "text-marker-start" : "text-sheet-light"}
                  `}
                >
                  {metric.value}
                </span>
                <span
                  className={`
                    text-[10px] uppercase tracking-wider mt-1
                    transition-colors duration-500
                    ${isVisible ? "text-chalk/50" : "text-chalk/20"}
                  `}
                >
                  {metric.label}
                </span>
              </div>
            ))}
          </div>
        )}

        <div
          className={`
            hidden md:block absolute top-1/2 w-8 h-px
            transition-all duration-500
            ${
              isVisible
                ? "bg-marker-start/40"
                : "bg-chalk/5"
            }
            ${side === "left" ? "right-0 translate-x-full" : "left-0 -translate-x-full"}
          `}
        />
      </BlueprintCard>
    </motion.div>
  );
};
