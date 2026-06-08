import { DimensionLine } from "../../components/Blueprint/DimensionLine";
import { SpecLabel } from "../../components/Blueprint/SpecLabel";
import { BlueprintGrid } from "../../components/Blueprint/BlueprintGrid";
import { AssetFrame } from "../../components/Blueprint/AssetFrame";
import { SystemDiagram } from "../../components/Blueprint/SystemDiagram";
import {
  LakehouseDiagram,
  CheckoutFlowDiagram,
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
    client: "Apollo Mapping",
    system: "ImageHunter API",
    built:
      "A geospatial imagery API that searches and orders satellite scenes across providers.",
    stack: ["fastapi", "ecs fargate", "asyncpg", "redis", "aws cdk", "oauth 2.0"],
    scale:
      "oauth2 client-credentials api on ecs fargate serving production imagery traffic",
    href: "https://imagehunter.apollomapping.com/",
    figure: 1,
    caption: "imagehunter request path",
    asset: <SystemDiagram className="w-full max-w-md mx-auto" />,
  },
  {
    index: 2,
    client: "Airbus",
    system: "Imagery Lakehouse",
    built:
      "A lakehouse for satellite imagery data, from ingestion through governed analytics.",
    stack: ["glue", "dms", "lake formation", "kafka msk", "redshift"],
    scale:
      "governed s3 lakehouse with lake formation access control, served to redshift",
    figure: 2,
    caption: "lakehouse data flow",
    asset: <LakehouseDiagram className="w-full" />,
  },
  {
    index: 3,
    client: "Eli Lilly",
    system: "LillyDirect",
    built:
      "Checkout and order-status pages taken from Figma to production for the direct-to-patient platform.",
    stack: ["react", "typescript", "figma to prod"],
    scale: "production checkout and order-status flow shipped to lillydirect",
    figure: 3,
    caption: "checkout flow",
    asset: <CheckoutFlowDiagram className="w-full" />,
  },
];

const demos: Entry[] = [
  {
    index: 4,
    client: "Construction",
    system: "Site Manager Dashboard",
    built:
      "A project dashboard tracking real-time KPIs and crew productivity across active sites.",
    stack: ["react", "recharts", "typescript"],
    scale: "real-time kpis and productivity tracking across active sites",
    href: "/construction-dashboard",
    figure: 4,
    caption: "site manager view",
    asset: <Wireframe variant="dashboard" className="w-full max-w-md mx-auto" />,
  },
  {
    index: 5,
    client: "Real Estate",
    system: "Broker Dashboard",
    built:
      "A market-intelligence dashboard with property analytics, pipeline tracking, and dynamic filtering.",
    stack: ["react", "recharts", "typescript"],
    scale: "property analytics and pipeline tracking with dynamic filters",
    href: "/real-estate-dashboard",
    figure: 5,
    caption: "broker map view",
    asset: <Wireframe variant="map" className="w-full max-w-md mx-auto" />,
  },
  {
    index: 6,
    client: "Security",
    system: "Shift Scheduler",
    built:
      "A scheduling system for security personnel with user and admin views and CSV export.",
    stack: ["react", "typescript"],
    scale: "user and admin views with real-time assignment and export",
    href: "/security-scheduling-dashboard",
    figure: 6,
    caption: "schedule grid",
    asset: <Wireframe variant="schedule" className="w-full max-w-md mx-auto" />,
  },
  {
    index: 7,
    client: "Tax Services",
    system: "Practice Dashboard",
    built:
      "A tax-prep dashboard for client management, return tracking, and refund analytics.",
    stack: ["react", "recharts"],
    scale: "client management, return tracking, and refund analytics",
    href: "/tax-company-dashboard",
    figure: 7,
    caption: "practice overview",
    asset: <Wireframe variant="dashboard" className="w-full max-w-md mx-auto" />,
  },
  {
    index: 8,
    client: "Ascent Pharmaceuticals",
    system: "Manufacturer Landing",
    built:
      "A conversion-focused landing experience covering facilities, product portfolio, and partnerships.",
    stack: ["react", "typescript", "vite"],
    scale: "manufacturer landing with product portfolio and partnership paths",
    href: "/ascent-pharmaceuticals-landing",
    figure: 8,
    caption: "landing layout",
    asset: <Wireframe variant="landing" className="w-full max-w-md mx-auto" />,
  },
  {
    index: 9,
    client: "kontinu-ed",
    system: "Higher-Education Platform",
    built:
      "An interactive higher-education platform with course discovery and enrollment.",
    stack: ["react", "typescript"],
    scale: "interactive higher-education platform with course discovery",
    href: "https://kontinued.com/",
    figure: 9,
    caption: "platform layout",
    asset: <Wireframe variant="landing" className="w-full max-w-md mx-auto" />,
  },
  {
    index: 10,
    client: "ACME Group",
    system: "Lifecycle & Opportunity Radar",
    built:
      "A two-sided IT asset lifecycle demo: fleet tracking for the client, ranked opportunities for ACME.",
    stack: ["react", "data viz"],
    scale: "two-sided fleet view and ranked sales opportunities from one dataset",
    href: "/acme-lifecycle",
    figure: 10,
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
              <DimensionLine label="jobs completed" className="max-w-xs my-6" />
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
