import { Link } from "@tanstack/react-router";
import { BlueprintButton } from "../../../../components/Blueprint/BlueprintButton";
import { BlueprintGrid } from "../../../../components/Blueprint/BlueprintGrid";
import { DimensionLine } from "../../../../components/Blueprint/DimensionLine";

export const ScreenWideCTA = () => {
  return (
    <div className="relative flex flex-col justify-center items-center bg-blueprint-base text-chalk min-h-[80vh] px-4 sm:px-8 py-20 overflow-hidden border-y border-chalk/10">
      <BlueprintGrid className="opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto w-full text-center space-y-12">
        <DimensionLine label="scope of work" className="max-w-md mx-auto mb-8" />

        <p className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-relaxed sm:leading-tight text-chalk">
          We build data systems and custom software that hold up under load.
        </p>

        <p className="font-sans text-lg sm:text-xl md:text-2xl text-chalk/80 max-w-4xl mx-auto">
          From foundations to handoff — clarity, efficiency, and work that
          lasts.
        </p>

        <div className="pt-8 flex justify-center">
          <Link to="/demo">
            <BlueprintButton size="lg" className="text-xl sm:text-2xl px-12 py-6">
              Get Started
            </BlueprintButton>
          </Link>
        </div>
      </div>
    </div>
  );
};
