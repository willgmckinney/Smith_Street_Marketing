import { Link } from "@tanstack/react-router";
import { BlueprintButton } from "../../../../components/Blueprint/BlueprintButton";
import { BlueprintGrid } from "../../../../components/Blueprint/BlueprintGrid";
import { SystemDiagram } from "../../../../components/Blueprint/SystemDiagram";

const recentBuilds = ["Apollo Mapping", "Airbus", "Eli Lilly"];

export const HeroBanner = () => {
  return (
    <div className="relative flex items-center min-h-screen w-full overflow-hidden bg-blueprint-base">
      <BlueprintGrid animate />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-cell py-2cell">
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-2cell items-center">
          {/* Left: editorial copy */}
          <div>
            <p className="font-mono text-label-mono text-marker-start lowercase mb-cell">
              software · data · cloud
            </p>

            <h1 className="font-display font-extrabold text-chalk text-display-1">
              General contractors
              <br />
              for your tech.
            </h1>

            <p className="font-sans text-body text-chalk/70 max-w-xl mt-cell">
              Software and data infrastructure that helps your business grow
              instead of holding it back. We take on the hard problems and build
              what you actually need.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-cell">
              <Link to="/demo">
                <BlueprintButton size="lg">Start a project</BlueprintButton>
              </Link>
              <Link to="/portfolio">
                <BlueprintButton variant="outline" size="lg">
                  See the work
                </BlueprintButton>
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-2cell font-mono text-label-mono text-chalk/60">
              <span className="text-chalk/40">recent builds</span>
              {recentBuilds.map((client) => (
                <span key={client} className="text-chalk">
                  {client}
                </span>
              ))}
            </div>
          </div>

          {/* Right: system illustration */}
          <div className="hidden lg:block">
            <SystemDiagram animate className="w-full max-w-sm mx-auto" />
          </div>
        </div>
      </div>
    </div>
  );
};
