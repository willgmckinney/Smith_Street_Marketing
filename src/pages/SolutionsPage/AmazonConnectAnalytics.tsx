import { Link } from "@tanstack/react-router";
import { ConnectAnalyticsDiagram } from "../../components/Blueprint/ArchitectureDiagrams";
import { AssetFrame } from "../../components/Blueprint/AssetFrame";
import { BlueprintGrid } from "../../components/Blueprint/BlueprintGrid";
import { CtaSection } from "../../components/Blueprint/CtaSection";
import { DimensionLine } from "../../components/Blueprint/DimensionLine";
import { SpecLabel } from "../../components/Blueprint/SpecLabel";
import { Seo } from "../../components/Seo";

const included = [
  {
    title: "Native Analytics Data Lake path",
    body: "The default deployment connects Quick directly to Connect's native Analytics Data Lake, sharing CTR, agent event, and Contact Lens data through AWS Lake Formation and queried through Athena, with no custom streaming or ETL pipeline required. This is the fastest path to deploy and the one AWS is actively investing in.",
  },
  {
    title: "Custom pipeline path",
    body: "For clients needing real-time streaming, custom transformations, or data blended from outside Connect, a custom pipeline (Kinesis or Firehose into S3, transformed via Glue, queried through Athena, visualized in Quick via SPICE) covers what the native data lake doesn't.",
  },
  {
    title: "Row-level security by default",
    body: "Access defaults to group-based rules mapped to how a client organizes queues, teams, or accounts, so access updates automatically as users move between groups. User-based RLS is available as a customization for clients needing tighter scoping.",
  },
  {
    title: "White-labeled embedded portal",
    body: "A portal where a partner's own customers access dashboards and agentic AI chat under the partner's brand, with access configured per user (Quick registered, Cognito-based, or SSO-authenticated) and advanced Quick capabilities, Chat Agents, Spaces, Flows, Research, and Automations, layered in as needed.",
  },
];

const sections = [
  {
    label: "what it is",
    title: "A consistent data shape makes this genuinely repeatable",
    body: "Most \u201creusable\u201d analytics builds still turn into custom work per client, because the underlying data never looks quite the same twice. Amazon Connect changes that: its Analytics Data Lake gives every client the same consistent data shape (CTR, agent events, Contact Lens data), so the same deployable infrastructure pattern actually redeploys client to client instead of being rebuilt from scratch each time.",
  },
  {
    label: "how we help",
    title: "A packaging model built for reselling, not one-off delivery",
    body: "We package this as two tiers: a default package (native data lake, standard dashboard set, baseline agent) that's fast to deploy for most clients, and a customizable package (custom pipeline, tailored dashboards and agent behavior) for clients whose needs go beyond the default. Both are delivered as infrastructure-as-code (AWS CDK or CloudFormation), so the deployment redeploys consistently as your client base grows instead of requiring a new scoped engagement each time.",
  },
  {
    label: "who it's for",
    title: "Partners and resellers building on Amazon Connect",
    body: "This fits partners, resellers, and ISVs who already work with Amazon Connect and want to offer analytics as part of their own product, under their own brand, rather than pointing clients to a generic dashboard. It's built for organizations serving many clients on the same underlying pattern, not a single company's internal rollout.",
  },
];

export const AmazonConnectAnalytics = () => {
  return (
    <article className="min-h-screen bg-blueprint-base pt-24">
      <Seo
        title="Amazon Connect Analytics: Deployable Quick Infrastructure and Embedded Portals"
        description="Deployable Amazon Quick infrastructure for Amazon Connect data, packaged with row-level security and a white-labeled embedded portal for partners and resellers."
        path="/solutions/amazon-connect-analytics"
      />

      {/* Hero */}
      <div className="relative overflow-hidden border-b border-chalk/10 bg-drafting-surface py-2cell">
        <BlueprintGrid opacity={0.55} />
        <div className="relative z-10 mx-auto max-w-7xl px-cell">
          <Link
            to="/solutions"
            className="mb-cell inline-block font-mono text-label-mono lowercase text-chalk/50 transition-colors hover:text-marker-start"
          >
            ← solutions
          </Link>
          <SpecLabel className="mb-cell">solutions · data & analytics</SpecLabel>
          <p className="mb-3 font-mono text-label-mono lowercase text-chalk/45">
            professional services · amazon connect analytics
          </p>
          <h1 className="max-w-4xl font-display text-display-2 font-extrabold leading-[0.95] text-chalk">
            Amazon Connect Analytics: Deployable Quick Infrastructure and
            Embedded Portals
          </h1>
          <DimensionLine
            reveal
            label="built once, deployed across every client"
            className="my-cell max-w-2xl"
          />
          <p className="max-w-2xl font-sans text-body text-chalk/70">
            We build repeatable, deployable Amazon Quick infrastructure for
            Amazon Connect data, packaged so partners and resellers can roll it
            out across their own client base instead of scoping a custom build
            every time. The default path connects Quick directly to Connect's
            native Analytics Data Lake, with a custom pipeline available for
            clients needing real-time streaming or data blended from outside
            Connect, all wrapped in a white-labeled embedded portal end
            customers can use directly.
          </p>
        </div>
      </div>

      {/* What it is + diagram */}
      <div className="mx-auto max-w-7xl px-cell py-2cell">
        <div className="grid grid-cols-1 gap-2cell lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <SpecLabel className="mb-cell">{sections[0].label}</SpecLabel>
            <h2 className="mb-4 max-w-3xl font-display text-h font-bold text-chalk">
              {sections[0].title}
            </h2>
            <p className="max-w-3xl font-sans text-body text-chalk/75 leading-relaxed">
              {sections[0].body}
            </p>
          </div>
          <AssetFrame figure={1} caption="connect analytics flow">
            <ConnectAnalyticsDiagram className="w-full" />
          </AssetFrame>
        </div>
      </div>

      {/* What's included */}
      <div className="border-t border-chalk/10 bg-drafting-surface/40">
        <div className="mx-auto max-w-7xl px-cell py-2cell">
          <SpecLabel className="mb-cell">what's included</SpecLabel>
          <h2 className="mb-2cell max-w-3xl font-display text-h font-bold text-chalk">
            Four pieces of a deployable analytics package
          </h2>
          <div className="grid gap-cell sm:grid-cols-2">
            {included.map((item) => (
              <div
                key={item.title}
                className="border border-chalk/10 bg-drafting-surface/30 p-cell rounded-spec"
              >
                <p className="mb-3 font-mono text-label-mono lowercase text-marker-start">
                  {item.title}
                </p>
                <p className="font-sans text-body text-chalk/75 leading-relaxed">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How we help + who it's for */}
      <div className="mx-auto max-w-7xl px-cell py-2cell">
        <div className="space-y-2cell">
          {sections.slice(1).map((section) => (
            <div
              key={section.label}
              className="border-t border-chalk/10 pt-cell first:border-t-0 first:pt-0"
            >
              <p className="mb-2 font-mono text-label-mono lowercase text-chalk/45">
                {section.label}
              </p>
              <h2 className="mb-4 max-w-3xl font-display text-h font-bold text-chalk">
                {section.title}
              </h2>
              <p className="max-w-3xl font-sans text-body text-chalk/75 leading-relaxed">
                {section.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      <CtaSection
        kicker="next step"
        headline="Want to see how this fits your platform?"
        body="Tell us how you're using Connect today. Most engagements start with a short scoping call, no commitment required."
        buttonLabel="Start a project"
        to="/demo"
      />
    </article>
  );
};
