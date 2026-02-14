import { useState } from "react";
import { MountainTimeline } from "./Components/MountainTimeline";
import { ServiceSelector } from "./Components/ServiceSelector";
import type { ServiceType } from "./data/timelineContent";

export const HowWeWorkPage = () => {
  const [activeService, setActiveService] = useState<ServiceType>("analytics");

  return (
    <div className="min-h-screen bg-deep-horizon">
      {/* Hero section — z-20 keeps it above the fixed CliffFace (z-0) inside MountainTimeline */}
      <div className="relative z-20 pt-24 pb-8 md:pt-28 md:pb-12 overflow-hidden">
        {/* Subtle mountain silhouette background */}
        <div className="absolute inset-0 opacity-10">
          <svg
            className="absolute bottom-0 w-full"
            viewBox="0 0 1440 200"
            preserveAspectRatio="none"
            style={{ height: "100%" }}
          >
            <path
              d="M0,200 L0,140 Q180,80 360,120 Q540,60 720,100 Q900,40 1080,80 Q1260,20 1440,60 L1440,200 Z"
              fill="#1E293B"
            />
          </svg>
        </div>

        <div className="relative container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <svg
              className="w-4 h-4 text-sunrise-amber"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M8 3l4 8 5-5 5 15H2L8 3z" />
            </svg>
            <span className="font-mono text-xs text-granite/60 tracking-wider uppercase">
              The Ascent
            </span>
          </div>

          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-golden-hour-start to-golden-hour-end font-bold mb-6">
            How We Work
          </h1>

          <p className="font-sans text-lg md:text-xl text-granite/70 max-w-2xl mx-auto leading-relaxed mb-4">
            Every great summit starts with a plan, the right gear, and a guide
            who knows the route. Follow the rope to see how we'll get you to
            the top.
          </p>

          <p className="font-sans text-sm text-granite/40 max-w-xl mx-auto">
            Select your service below, then scroll to follow the climbing
            route from base camp to summit.
          </p>
        </div>
      </div>

      {/* Service selector */}
      <ServiceSelector
        activeService={activeService}
        onServiceChange={setActiveService}
      />

      {/* Mountain timeline */}
      <MountainTimeline activeService={activeService} />
    </div>
  );
};
