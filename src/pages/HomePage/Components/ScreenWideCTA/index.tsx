import { Link } from "@tanstack/react-router";
import { BlueprintButton } from "../../../../components/Blueprint/BlueprintButton";
import { BlueprintGrid } from "../../../../components/Blueprint/BlueprintGrid";
import { DimensionLine } from "../../../../components/Blueprint/DimensionLine";

export const ScreenWideCTA = () => {
  return (
    <div className="relative flex flex-col justify-center items-center bg-blueprint-base text-chalk min-h-[80vh] px-4 sm:px-8 py-20 overflow-hidden border-y border-chalk/10">
      <BlueprintGrid opacity={0.55} />

      <div className="relative z-10 max-w-7xl mx-auto w-full text-center space-y-12">
        <DimensionLine
          reveal
          label="scope of work"
          className="max-w-md mx-auto mb-8"
        />

        <p className="font-display font-bold text-display-2 text-chalk">
          We build data systems and custom software that hold up under load.
        </p>

        <p className="font-sans text-body text-chalk/80 max-w-3xl mx-auto">
          From foundation to handoff: clarity, efficiency, and work that lasts.
        </p>

        <div className="pt-8 flex justify-center">
          <Link to="/demo">
            <BlueprintButton size="lg" className="px-12 py-6">
              Get Started
            </BlueprintButton>
          </Link>
        </div>
      </div>
    </div>
  );
};
