import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { BlueprintButton } from "../../../../components/Blueprint/BlueprintButton";
import { BlueprintGrid } from "../../../../components/Blueprint/BlueprintGrid";
import { ArchitectureCycle } from "../../../../components/Blueprint/ArchitectureCycle";

const recentBuilds = ["Airbus", "Ascent Pharma", "Kontinued"];

const column: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.5 } },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2, ease: [0.2, 0, 0, 1] },
  },
};

export const HeroBanner = () => {
  const prefersReducedMotion = useReducedMotion();
  const active = !prefersReducedMotion;

  return (
    <div className="relative flex items-center min-h-screen w-full bg-blueprint-base">
      <BlueprintGrid animate />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-cell py-2cell">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] xl:grid-cols-[5fr_8fr] gap-cell lg:gap-cell items-center">
          {/* Left: editorial copy */}
          <motion.div
            variants={column}
            initial={active ? "hidden" : false}
            animate={active ? "visible" : false}
            className="relative z-10"
          >
            <motion.p
              variants={rise}
              className="font-mono text-label-mono text-marker-start lowercase mb-cell"
            >
              software · data · cloud
            </motion.p>

            <motion.h1
              variants={rise}
              className="font-display font-extrabold text-chalk text-display-1"
            >
              General contractors
              <br />
              for your tech.
            </motion.h1>

            <motion.p
              variants={rise}
              className="font-sans text-body text-chalk/70 max-w-xl mt-cell"
            >
              Software and data infrastructure that helps your business grow
              instead of holding it back. We take on the hard problems and build
              what you actually need.
            </motion.p>

            <motion.div variants={rise} className="flex flex-col sm:flex-row gap-4 mt-cell">
              <Link to="/demo">
                <BlueprintButton size="lg">Start a project</BlueprintButton>
              </Link>
              <Link to="/portfolio">
                <BlueprintButton variant="outline" size="lg">
                  See the work
                </BlueprintButton>
              </Link>
            </motion.div>

            <motion.div
              variants={rise}
              className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-2cell font-mono text-label-mono text-chalk/60"
            >
              <span className="text-chalk/40">recent builds</span>
              {recentBuilds.map((client) => (
                <span key={client} className="text-chalk">
                  {client}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: six reference architectures cycle through a shared hinge. */}
          <ArchitectureCycle className="hidden lg:block w-full min-w-0" />
        </div>
      </div>
    </div>
  );
};
