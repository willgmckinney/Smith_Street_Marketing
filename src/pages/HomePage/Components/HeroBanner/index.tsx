import { Link } from "@tanstack/react-router";
import { BlueprintButton } from "../../../../components/Blueprint/BlueprintButton";
import { BlueprintGrid } from "../../../../components/Blueprint/BlueprintGrid";
import { SpecLabel } from "../../../../components/Blueprint/SpecLabel";

const recentBuilds = ["Apollo Mapping", "Eli Lilly", "Airbus"];

export const HeroBanner = () => {
  return (
    <div className="relative flex flex-col items-center justify-center h-screen w-full overflow-hidden bg-blueprint-base">
      <BlueprintGrid animate />

      <div className="absolute inset-0 bg-gradient-to-t from-blueprint-base via-blueprint-base/60 to-transparent pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center justify-center px-4 sm:px-8 max-w-5xl mx-auto text-center space-y-8">
        <SpecLabel>software · data · cloud</SpecLabel>

        <h1 className="font-display font-extrabold text-chalk text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight">
          General contractors for your tech.
        </h1>

        <p className="font-sans text-lg sm:text-xl text-chalk/80 max-w-3xl leading-relaxed">
          Software and data infrastructure that helps your business grow
          instead of holding it back. We take on the hard problems and build
          what you actually need. No project too big or too small.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 pt-2">
          <Link to="/demo">
            <BlueprintButton size="lg">Start a project</BlueprintButton>
          </Link>
          <Link to="/portfolio">
            <BlueprintButton variant="outline" size="lg">
              See the work
            </BlueprintButton>
          </Link>
        </div>

        <div className="flex flex-wrap justify-center gap-3 pt-4">
          {recentBuilds.map((client) => (
            <span
              key={client}
              className="font-mono text-xs text-chalk/50 border border-chalk/10 rounded-spec px-3 py-1.5 tracking-wider"
            >
              {client}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
