import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import type { ServiceType, TimelineMilestone } from "../data/timelineContent";
import { timelineContent } from "../data/timelineContent";
import { CliffFace } from "./CliffFace";
import { HighlightCard } from "./HighlightCard";
import { Piton } from "./Piton";
import { ProgressIndicator } from "./ProgressIndicator";
import { RopeSegment } from "./RopeSegment";

interface MountainTimelineProps {
  activeService: ServiceType;
}

/** Wrapper around each milestone that reports when it enters/exits the viewport */
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

export const MountainTimeline = ({
  activeService,
}: MountainTimelineProps) => {
  const [activeHighlight, setActiveHighlight] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const milestones = timelineContent[activeService];

  // Reset active highlight when service changes
  useEffect(() => {
    setActiveHighlight(0);
    setScrollProgress(0);
    // Scroll to top of timeline when switching services
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeService]);

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const containerTop = rect.top + window.scrollY;
      const containerHeight = rect.height;
      const scrollPosition = window.scrollY - containerTop + window.innerHeight * 0.5;
      const progress = Math.max(
        0,
        Math.min(100, (scrollPosition / containerHeight) * 100)
      );
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial calculation
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeService]);

  const handleMilestoneInView = useCallback(
    (index: number, inView: boolean) => {
      if (inView) {
        setActiveHighlight(index);
      }
    },
    []
  );

  // Keyboard navigation
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
      `[data-milestone-id="${milestones[index]?.id}"]`
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
      {/* Parallax mountain background */}
      <CliffFace scrollProgress={scrollProgress} />

      {/* Progress indicator */}
      <ProgressIndicator
        progress={scrollProgress}
        currentAltitude={activeHighlight + 1}
        totalMilestones={milestones.length}
      />

      {/* Timeline content */}
      <div
        ref={containerRef}
        id={`timeline-panel-${activeService}`}
        role="tabpanel"
        aria-label={`${activeService} service timeline`}
        className="relative z-10 container mx-auto px-4 md:px-8"
      >
        {/* Base camp intro */}
        <motion.div
          className="text-center pt-12 pb-16 md:pt-16 md:pb-24"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <div className="w-2 h-2 rounded-full bg-golden-hour-start animate-pulse" />
            <span className="font-mono text-xs text-granite/60 tracking-wider uppercase">
              Base Camp — Start Here
            </span>
          </div>
          <h2 className="font-display text-2xl md:text-3xl text-white mb-3">
            Your Ascent Begins
          </h2>
          <p className="text-granite/60 max-w-xl mx-auto text-sm md:text-base">
            Follow the rope up the mountain to see each phase of your engagement.
            Each piton marks a critical milestone on the path to your summit.
          </p>
        </motion.div>

        {/* Milestones */}
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
                  {/* Intersection observer sentinel */}
                  <MilestoneSection
                    milestone={milestone}
                    index={index}
                    onInView={handleMilestoneInView}
                  />

                  {/* Rope + Piton center column (hidden on mobile) */}
                  <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-14">
                    {/* Rope running through this section */}
                    <RopeSegment
                      isActive={isActive}
                      isPassed={isPassed}
                      isLast={index === milestones.length - 1}
                    />

                    {/* Piton marker — odd to the left, even to the right */}
                    <Piton
                      isActive={isActive}
                      isPassed={isPassed}
                      number={index + 1}
                      side={side}
                    />
                  </div>

                  {/* Content card */}
                  <div className="flex items-center pt-16 md:pt-0" style={{ minHeight: "55vh" }}>
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

        {/* Summit reached */}
        <motion.div
          className="text-center py-24 md:py-32"
          initial={{ opacity: 0 }}
          animate={{
            opacity: scrollProgress > 85 ? 1 : 0.2,
          }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative inline-block">
            {/* Summit glow */}
            <div
              className="absolute inset-0 -m-8 rounded-full transition-opacity duration-1000"
              style={{
                background:
                  "radial-gradient(circle, rgba(100,181,246,0.2) 0%, transparent 70%)",
                opacity: scrollProgress > 90 ? 1 : 0,
              }}
            />

            <svg
              className="w-16 h-16 mx-auto mb-6 text-sunrise-amber"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M8 3l4 8 5-5 5 15H2L8 3z" />
            </svg>
          </div>

          <h2 className="font-display text-3xl md:text-4xl text-white mb-4">
            Summit Reached
          </h2>
          <p className="text-granite/60 max-w-lg mx-auto mb-8 text-sm md:text-base">
            From base camp to the peak, we're with you every step. Ready to
            start your ascent?
          </p>

          <a
            href="/demo"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-golden-hour-start to-golden-hour-end text-deep-horizon font-display font-bold text-lg shadow-button-glow hover:-translate-y-0.5 transition-all duration-300 active:scale-95"
          >
            Start Your Climb
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </motion.div>
      </div>
    </div>
  );
};
