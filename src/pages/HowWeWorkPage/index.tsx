import { useState } from "react";
import { SpecLabel } from "../../components/Blueprint/SpecLabel";
import { BuildTimeline } from "./Components/BuildTimeline";
import { ServiceSelector } from "./Components/ServiceSelector";
import type { ServiceType } from "./data/timelineContent";

export const HowWeWorkPage = () => {
  const [activeService, setActiveService] = useState<ServiceType>("analytics");

  return (
    <div className="min-h-screen bg-blueprint-base">
      <div className="relative z-20 pt-24 pb-8 md:pt-28 md:pb-12 overflow-hidden border-b border-chalk/10">
        <div
          className="absolute inset-0 bg-blueprint-grid bg-[length:32px_32px] opacity-50"
          aria-hidden
        />

        <div className="relative container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-spec bg-chalk/5 border border-chalk/10 mb-6">
            <span className="font-mono text-xs text-marker-start tracking-wider lowercase">
              The Build
            </span>
          </div>

          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-chalk font-bold mb-6">
            Process
          </h1>

          <div className="flex justify-center mb-4">
            <SpecLabel tick={false}>scope of work</SpecLabel>
          </div>

          <p className="font-sans text-lg md:text-xl text-chalk/70 max-w-2xl mx-auto leading-relaxed mb-4">
            Every solid build starts with a plan, the right tools, and a crew
            that knows the job. Follow the blueprint to see how we get it done.
          </p>

          <p className="font-sans text-sm text-chalk/40 max-w-xl mx-auto">
            Select your service below, then scroll through the build from
            foundation to handoff.
          </p>
        </div>
      </div>

      <ServiceSelector
        activeService={activeService}
        onServiceChange={setActiveService}
      />

      <BuildTimeline activeService={activeService} />
    </div>
  );
};
