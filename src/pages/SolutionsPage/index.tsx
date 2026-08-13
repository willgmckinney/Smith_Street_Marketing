import { AssetFrame } from "../../components/Blueprint/AssetFrame";
import {
  AmazonQuickDiagram,
  PartnerApiDiagram,
} from "../../components/Blueprint/ArchitectureDiagrams";
import { BlueprintGrid } from "../../components/Blueprint/BlueprintGrid";
import { CtaSection } from "../../components/Blueprint/CtaSection";
import { DimensionLine } from "../../components/Blueprint/DimensionLine";
import { SpecLabel } from "../../components/Blueprint/SpecLabel";
import { Seo } from "../../components/Seo";
import { SolutionCard, type SolutionData } from "./Components/SolutionCard";

const solutions: SolutionData[] = [
  {
    index: 1,
    category: "data & analytics",
    title: "Amazon Quick Implementation and Organization-Wide Rollout",
    includes:
      "Account setup, data connections, permissions design, and phased rollout.",
    delivery: "Professional services",
    services: [
      "amazon quick",
      "aws iam identity center",
      "s3",
      "redshift",
      "aurora",
    ],
    to: "/solutions/amazon-quick-implementation",
    figure: 1,
    caption: "amazon quick data flow",
    asset: <AmazonQuickDiagram className="w-full" />,
  },
  {
    index: 2,
    category: "cloud architecture",
    title: "Secure Partner API Platform: Build and Production Launch on AWS",
    includes:
      "Infrastructure build, authentication and rate limiting, production cutover, and cost governance.",
    delivery: "Professional services",
    services: [
      "ecs fargate",
      "rds",
      "elasticache",
      "aws waf",
      "secrets manager",
      "aws cdk",
    ],
    to: "/solutions/secure-partner-api-platform",
    figure: 2,
    caption: "partner api platform",
    asset: <PartnerApiDiagram className="w-full max-w-md mx-auto" />,
  },
];

export const SolutionsPage = () => {
  return (
    <div className="min-h-screen bg-blueprint-base pt-24">
      <Seo
        title="Solutions"
        description="Repeatable AWS offerings from Smith Avenue Insights, built once and deployed consistently: Amazon Quick rollouts and secure partner API platforms."
        path="/solutions"
      />

      <div className="relative bg-drafting-surface py-2cell border-b border-chalk/10 overflow-hidden">
        <BlueprintGrid opacity={0.55} />
        <div className="max-w-7xl mx-auto px-cell relative z-10">
          <SpecLabel className="mb-cell">our solutions</SpecLabel>
          <div className="flex items-start gap-4 sm:gap-cell">
            <span className="font-mono text-label-mono text-marker-start mt-2">
              01
            </span>
            <div>
              <h1 className="font-display text-display-2 text-chalk font-extrabold leading-[0.95]">
                Solutions
              </h1>
              <DimensionLine
                reveal
                label="repeatable offerings, not one-off builds"
                className="my-6 max-w-xl"
              />
              <p className="font-sans text-body text-chalk/70 max-w-2xl">
                Packaged ways we help teams put AWS to work, built once and
                deployed consistently rather than scoped from scratch every
                time.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-cell py-2cell">
        <SpecLabel className="mb-cell">available now</SpecLabel>
        {solutions.map((solution) => (
          <SolutionCard
            key={solution.to}
            {...solution}
            asset={
              <AssetFrame figure={solution.figure} caption={solution.caption}>
                {solution.asset}
              </AssetFrame>
            }
          />
        ))}
      </div>

      <CtaSection
        headline="Want to talk through a solution?"
        body="Tell us what you are working with. Most engagements start with a 30-minute scoping call, no commitment required."
      />
    </div>
  );
};
