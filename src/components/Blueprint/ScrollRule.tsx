import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

/**
 * A persistent thin dimension line pinned to the left margin whose measured
 * length grows as the page scrolls. Doubles as a reading-progress indicator and
 * reinforces the scope-of-work / contractor metaphor.
 */
export const ScrollRule = () => {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
  });
  const height = useTransform(smooth, [0, 1], ["0%", "100%"]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed left-3 lg:left-5 top-24 bottom-16 z-40 hidden sm:flex flex-col items-center"
    >
      {/* top tick */}
      <span className="h-px w-2 bg-chalk/30" />
      {/* track */}
      <div className="relative flex-1 w-px bg-chalk/10">
        <motion.div
          className="absolute top-0 left-0 w-px bg-marker-start origin-top"
          style={{ height: prefersReducedMotion ? "100%" : height }}
        />
      </div>
      {/* bottom tick */}
      <span className="h-px w-2 bg-chalk/30" />
    </div>
  );
};
