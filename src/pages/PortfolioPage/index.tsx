import { DimensionLine } from "../../components/Blueprint/DimensionLine";
import { SpecLabel } from "../../components/Blueprint/SpecLabel";
import { BlueprintGrid } from "../../components/Blueprint/BlueprintGrid";
import { AssetFrame } from "../../components/Blueprint/AssetFrame";
import {
  LakehouseDiagram,
  GeospatialPlatformDiagram,
} from "../../components/Blueprint/ArchitectureDiagrams";
import { Wireframe } from "../../components/Blueprint/Wireframe";
import { CaseStudy } from "./Components/CaseStudy";
import type { ReactNode } from "react";

type Entry = {
  index: number;
  client: string;
  system: string;
  built: string;
  stack: string[];
  scale: string;
  href?: string;
  figure: number;
  caption: string;
  asset: ReactNode;
};

const flagships: Entry[] = [
  {
    index: 1,
    client: "Airbus",
    system: "Imagery Lakehouse",
    built:
      "A lakehouse for satellite imagery data, from ingestion through governed analytics.",
    stack: ["glue", "dms", "lake formation", "kafka msk", "redshift"],
    scale:
      "governed s3 lakehouse with lake formation access control, served to redshift",
    figure: 1,
    caption: "lakehouse data flow",
    asset: <LakehouseDiagram className="w-full" />,
  },
  {
    index: 2,
    client: "Apollo Mapping",
    system: "Geospatial Platform",
    built:
      "A search-and-order platform for satellite imagery: web application, API layer, governed catalog, and async processing behind it.",
    stack: ["react", "aws", "spatial database", "async workers", "object storage"],
    scale: "multi-vendor imagery catalog with async preview delivery",
    href: "https://apollomapping.com/",
    figure: 2,
    caption: "platform architecture",
    asset: <GeospatialPlatformDiagram className="w-full" />,
  },
  {
    index: 3,
    client: "Ascent Pharmaceuticals",
    system: "Manufacturer Website",
    built:
      "A conversion-focused manufacturer site covering facilities, product portfolio, and partnership paths.",
    stack: ["react", "typescript", "vite"],
    scale: "live manufacturer site with product portfolio and partnership paths",
    href: "https://www.ascentpharm.com/",
    figure: 3,
    caption: "site layout",
    asset: <Wireframe variant="landing" className="w-full max-w-md mx-auto" />,
  },
  {
    index: 4,
    client: "Kontinued",
    system: "Higher-Education Platform",
    built:
      "An interactive higher-education platform with course discovery and enrollment.",
    stack: ["react", "typescript"],
    scale: "course discovery and enrollment across continuing-ed programs",
    href: "https://kontinued.com/",
    figure: 4,
    caption: "platform layout",
    asset: <Wireframe variant="landing" className="w-full max-w-md mx-auto" />,
  },
];

const demos: Entry[] = [
  {
    index: 5,
    client: "Construction",
    system: "Site Manager Dashboard",
    built:
      "A project dashboard tracking real-time KPIs and crew productivity across active sites.",
    stack: ["react", "recharts", "typescript"],
    scale: "real-time kpis and productivity tracking across active sites",
    href: "/construction-dashboard",
    figure: 5,
    caption: "site manager view",
    asset: <Wireframe variant="dashboard" className="w-full max-w-md mx-auto" />,
  },
  {
    index: 6,
    client: "Real Estate",
    system: "Broker Dashboard",
    built:
      "A market-intelligence dashboard with property analytics, pipeline tracking, and dynamic filtering.",
    stack: ["react", "recharts", "typescript"],
    scale: "property analytics and pipeline tracking with dynamic filters",
    href: "/real-estate-dashboard",
    figure: 6,
    caption: "broker map view",
    asset: <Wireframe variant="map" className="w-full max-w-md mx-auto" />,
  },
  {
    index: 7,
    client: "Security",
    system: "Shift Scheduler",
    built:
      "A scheduling system for security personnel with user and admin views and CSV export.",
    stack: ["react", "typescript"],
    scale: "user and admin views with real-time assignment and export",
    href: "/security-scheduling-dashboard",
    figure: 7,
    caption: "schedule grid",
    asset: <Wireframe variant="schedule" className="w-full max-w-md mx-auto" />,
  },
  {
    index: 8,
    client: "ACME Group",
    system: "Lifecycle & Opportunity Radar",
    built:
      "A two-sided IT asset lifecycle demo: fleet tracking for the client, ranked opportunities for ACME.",
    stack: ["react", "data viz"],
    scale: "two-sided fleet view and ranked sales opportunities from one dataset",
    href: "/acme-lifecycle",
    figure: 8,
    caption: "fleet dashboard",
    asset: <Wireframe variant="dashboard" className="w-full max-w-md mx-auto" />,
  },
];

export const PortfolioPage = () => {
  return (
    <div className="min-h-screen bg-blueprint-base pt-24">
      <div className="relative bg-drafting-surface py-2cell border-b border-chalk/10 overflow-hidden">
        <BlueprintGrid opacity={0.55} />
        <div className="max-w-7xl mx-auto px-cell relative z-10">
          <SpecLabel className="mb-cell">recent builds</SpecLabel>
          <div className="flex items-start gap-4 sm:gap-cell">
            <span className="font-mono text-label-mono text-marker-start mt-2">
              01
            </span>
            <div>
              <h1 className="font-display text-display-2 text-chalk font-extrabold leading-[0.95]">
                The
                <br />
                work
              </h1>
              <DimensionLine reveal label="jobs completed" className="max-w-xs my-6" />
              <p className="font-sans text-body text-chalk/70 max-w-2xl">
                From a two-person startup to Airbus. Same standard either way.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-cell py-2cell">
        <SpecLabel className="mb-cell">flagship engagements</SpecLabel>
        {flagships.map((p) => (
          <CaseStudy
            key={p.system}
            {...p}
            asset={
              <AssetFrame figure={p.figure} caption={p.caption}>
                {p.asset}
              </AssetFrame>
            }
          />
        ))}

        <SpecLabel className="mb-cell mt-3cell">interactive demos</SpecLabel>
        {demos.map((p) => (
          <CaseStudy
            key={p.system}
            {...p}
            asset={
              <AssetFrame figure={p.figure} caption={p.caption}>
                {p.asset}
              </AssetFrame>
            }
          />
        ))}
      </div>
    </div>
  );
};
