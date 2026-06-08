import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Link } from "@tanstack/react-router";
import { BlueprintButton } from "../../../components/Blueprint/BlueprintButton";
import type { ServiceType, TimelineMilestone } from "../data/timelineContent";
import { timelineContent } from "../data/timelineContent";
import { BeamSegment } from "./BeamSegment";
import { BlueprintSheet } from "./BlueprintSheet";
import { HighlightCard } from "./HighlightCard";
import { ProgressIndicator } from "./ProgressIndicator";
import { StationMarker } from "./StationMarker";

interface BuildTimelineProps {
  activeService: ServiceType;
}

const MilestoneSection = ({
  milestone,
  index,
  onInView,
}: {
  milestone: TimelineMilestone;
  index: number;
  onInView: (index: number, inView: boolean) => void;
}) => {
  const { ref } = useInView({
    threshold: 0.4,
    rootMargin: "-10% 0px -30% 0px",
    onChange: (inView) => onInView(index, inView),
  });

  return (
    <div
      ref={ref}
      data-milestone-id={milestone.id}
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
    />
  );
};

export const BuildTimeline = ({ activeService }: BuildTimelineProps) => {
  const [activeHighlight, setActiveHighlight] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const milestones = timelineContent[activeService];

  useEffect(() => {
    setActiveHighlight(0);
    setScrollProgress(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeService]);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const containerTop = rect.top + window.scrollY;
      const containerHeight = rect.height;
      const scrollPosition =
        window.scrollY - containerTop + window.innerHeight * 0.5;
      const progress = Math.max(
        0,
        Math.min(100, (scrollPosition / containerHeight) * 100),
      );
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeService]);

  const handleMilestoneInView = useCallback(
    (index: number, inView: boolean) => {
      if (inView) {
        setActiveHighlight(index);
      }
    },
    [],
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        const next = Math.min(activeHighlight + 1, milestones.length - 1);
        setActiveHighlight(next);
        scrollToMilestone(next);
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        const prev = Math.max(0, activeHighlight - 1);
        setActiveHighlight(prev);
        scrollToMilestone(prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeHighlight, milestones.length]);

  const scrollToMilestone = (index: number) => {
    const el = document.querySelector(
      `[data-milestone-id="${milestones[index]?.id}"]`,
    );
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div
      className="relative"
      role="region"
      aria-label="Project engagement timeline"
    >
      <BlueprintSheet scrollProgress={scrollProgress} />

      <ProgressIndicator
        progress={scrollProgress}
        currentStation={activeHighlight + 1}
        totalMilestones={milestones.length}
      />

      <div
        ref={containerRef}
        id={`timeline-panel-${activeService}`}
        role="tabpanel"
        aria-label={`${activeService} service timeline`}
        className="relative z-10 container mx-auto px-4 md:px-8"
      >
        <motion.div
          className="text-center pt-12 pb-16 md:pt-16 md:pb-24"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-spec bg-white/5 border border-chalk/10 mb-6">
            <div className="w-2 h-2 rounded-spec bg-marker-start animate-pulse" />
            <span className="font-mono text-xs text-chalk/60 tracking-wider lowercase">
              foundation — start here
            </span>
          </div>
          <h2 className="font-display text-2xl md:text-3xl text-white mb-3">
            The Build Begins
          </h2>
          <p className="text-chalk/60 max-w-xl mx-auto text-sm md:text-base">
            Follow the dimension line to see each phase of your engagement.
            Each station marks a critical milestone on the path to handoff.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeService}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {milestones.map((milestone, index) => {
              const side: "left" | "right" =
                index % 2 === 0 ? "left" : "right";
              const isActive = index === activeHighlight;
              const isPassed = index < activeHighlight;

              return (
                <div
                  key={milestone.id}
                  className="relative"
                  style={{ minHeight: "55vh" }}
                >
                  <MilestoneSection
                    milestone={milestone}
                    index={index}
                    onInView={handleMilestoneInView}
                  />

                  <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-14">
                    <BeamSegment
                      isActive={isActive}
                      isPassed={isPassed}
                      isLast={index === milestones.length - 1}
                    />
                    <StationMarker
                      isActive={isActive}
                      isPassed={isPassed}
                      number={index + 1}
                      side={side}
                    />
                  </div>

                  <div
                    className="flex items-center pt-16 md:pt-0"
                    style={{ minHeight: "55vh" }}
                  >
                    <div className="w-full flex px-2 md:px-8">
                      <HighlightCard
                        content={milestone}
                        isVisible={isActive}
                        side={side}
                        milestoneNumber={index + 1}
                        totalMilestones={milestones.length}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        <motion.div
          className="text-center py-24 md:py-32"
          initial={{ opacity: 0 }}
          animate={{
            opacity: scrollProgress > 85 ? 1 : 0.2,
          }}
          transition={{ duration: 0.8 }}
        >
          <div className="w-12 h-12 mx-auto mb-6 border border-marker-start rounded-spec flex items-center justify-center">
            <span className="font-mono text-marker-start text-lg">✓</span>
          </div>

          <h2 className="font-display text-3xl md:text-4xl text-white mb-4">
            Handoff Complete
          </h2>
          <p className="text-chalk/60 max-w-lg mx-auto mb-8 text-sm md:text-base">
            From foundation to final inspection, we're with you every step.
            Ready to start your build?
          </p>

          <Link to="/demo">
            <BlueprintButton size="lg">Start a Project</BlueprintButton>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};
