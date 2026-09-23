import { Link } from "@tanstack/react-router";
import { SalesPipelineDiagram } from "../../components/Blueprint/ArchitectureDiagrams";
import { AssetFrame } from "../../components/Blueprint/AssetFrame";
import { BlueprintGrid } from "../../components/Blueprint/BlueprintGrid";
import { CtaSection } from "../../components/Blueprint/CtaSection";
import { DimensionLine } from "../../components/Blueprint/DimensionLine";
import { SpecLabel } from "../../components/Blueprint/SpecLabel";
import { Seo } from "../../components/Seo";

const included = [
  {
    title: "Agent layer connected to your GTM stack",
    body: "Quick chat agents and automations connected to CRM, scheduling, outreach, and collaboration tools, so a rep can ask which deals have gone quiet, or let a completed meeting update the CRM automatically, without switching tools.",
  },
  {
    title: "Governed data lake and conformed model",
    body: "A data lake on Amazon S3 with AWS Glue and Amazon Athena feeding SPICE datasets, built around a single opportunity-grain table that joins lead source, outreach activity, meetings, and deal outcomes, the table every dashboard is built on.",
  },
  {
    title: "Connectors beyond the native list",
    body: "Native Quick connectors where they exist, plus custom connectors and a service-authentication gateway deployed in your own AWS account for systems Quick cannot authenticate against directly, so automations reach the tools that matter without exposing a full API surface.",
  },
  {
    title: "Attribution and measurement design",
    body: "A source taxonomy and identity resolution layer that reconciles systems which disagree about who a person is, with an event log recording when things changed, so later reporting can explain its own discontinuities instead of just showing a number.",
  },
];

const sections = [
  {
    label: "what it is",
    title: "Revenue teams don't want another dashboard to log into",
    body: "Most revenue teams run five or more disconnected tools, a CRM, an outreach platform, a scheduling tool, enrichment sources, with no single view across them. Reporting is manual, attribution is modeled by guesswork, and the CRM often goes stale because updating it is one more task competing with selling. This solution puts Amazon Quick inside the tools a revenue team already lives in, so adoption doesn't depend on anyone opening a new BI tool.",
  },
  {
    label: "how we help",
    title: "A phased path from audit to full adoption",
    body: "We start with a discovery and assessment phase auditing your current GTM stack, attribution gaps, and data quality, producing a target architecture and sequenced plan. From there, a proof of concept implements one high-value workflow end to end with baseline measurement, before scaling to full implementation: the connector layer, the data lake, dashboards, and remaining automations. We close with enablement, runbooks, agent instruction sets, and onboarding, with ongoing managed support available for organizations that want it.",
  },
  {
    label: "who it's for",
    title: "Revenue and sales operations teams running a multi-tool stack",
    body: "This fits revenue operations and sales operations leaders at organizations running a multi-tool GTM stack, CRM plus outreach plus scheduling plus enrichment, with no single view across it and no appetite for another dashboard nobody logs into. It's not a fit for teams wanting a pure BI refresh with no agent or action component, or for organizations whose data cannot leave an on-premises environment.",
  },
];

export const SalesPipelineIntelligence = () => {
  return (
    <article className="min-h-screen bg-blueprint-base pt-24">
      <Seo
        title="Sales Pipeline Intelligence on Amazon Quick"
        description="Consolidate your CRM, outreach, scheduling and enrichment tools into Amazon Quick, so sales teams can query and act on the pipeline in plain language."
        path="/solutions/sales-pipeline-intelligence"
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
          <SpecLabel className="mb-cell">
            solutions · revenue operations
          </SpecLabel>
          <p className="mb-3 font-mono text-label-mono lowercase text-chalk/45">
            professional services · sales pipeline intelligence
          </p>
          <h1 className="max-w-4xl font-display text-display-2 font-extrabold leading-[0.95] text-chalk">
            Sales Pipeline Intelligence on Amazon Quick
          </h1>
          <DimensionLine
            reveal
            label="built for revenue teams, not bi teams"
            className="my-cell max-w-2xl"
          />
          <p className="max-w-2xl font-sans text-body text-chalk/70">
            Most Amazon Quick engagements target data and BI teams. This one
            targets revenue teams who want their pipeline acted on inside the
            tools they already use, not viewed in a separate dashboard. We
            connect CRM, outreach, scheduling, and collaboration tools into
            Quick's agent layer, so a rep can ask a plain-language question or
            trigger a workflow without leaving their existing systems, while a
            governed data lake underneath models attribution and conversion
            across every channel.
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
          <AssetFrame figure={1} caption="pipeline intelligence flow">
            <SalesPipelineDiagram className="w-full" />
          </AssetFrame>
        </div>
      </div>

      {/* What's included */}
      <div className="border-t border-chalk/10 bg-drafting-surface/40">
        <div className="mx-auto max-w-7xl px-cell py-2cell">
          <SpecLabel className="mb-cell">what's included</SpecLabel>
          <h2 className="mb-2cell max-w-3xl font-display text-h font-bold text-chalk">
            Four pieces of a working revenue operations layer
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
        headline="Want to see your pipeline in one place?"
        body="Tell us what your GTM stack looks like today. Most engagements start with a short scoping call, no commitment required."
        buttonLabel="Start a project"
        to="/demo"
      />
    </article>
  );
};
