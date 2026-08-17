import { Link } from "@tanstack/react-router";
import { AgentConnectorDiagram } from "../../components/Blueprint/ArchitectureDiagrams";
import { AssetFrame } from "../../components/Blueprint/AssetFrame";
import { BlueprintGrid } from "../../components/Blueprint/BlueprintGrid";
import { CtaSection } from "../../components/Blueprint/CtaSection";
import { DimensionLine } from "../../components/Blueprint/DimensionLine";
import { SpecLabel } from "../../components/Blueprint/SpecLabel";
import { Seo } from "../../components/Seo";

const included = [
  {
    title: "Layered connector architecture",
    body: "An OpenAPI specification defines every action a connector exposes as an explicit, reviewable contract. An API gateway handles routing, throttling, and validation, and a serverless compute layer translates agent requests into the target system's native API calls and normalizes the response into the exact shape the agent expects.",
  },
  {
    title: "Read/write separation",
    body: "Where a system supports both lookups and changes, read and write actions are built as separate connectors rather than combined, keeping permissions cleaner and preventing a loosely scoped read action from accidentally exposing a write capability.",
  },
  {
    title: "Authentication matched to each system",
    body: "Per-user delegated OAuth where a vendor supports it, service-level credentials with access control enforced inside the connector for systems that only offer one organization-wide credential, or simple key-based auth for narrowly scoped internal tools, matched to what each system actually supports rather than a one-size-fits-all approach.",
  },
  {
    title: "Organization-level governance",
    body: "Connectors are scoped and shared at the organization level, so access to a sensitive connector (like payroll) and a low-sensitivity one (like a directory lookup) can be governed separately, matching how sensitive the underlying data actually is.",
  },
];

const sections = [
  {
    label: "what it is",
    title: "An agent is only as useful as what it's allowed to touch",
    body: "Out of the box, a conversational agent can answer questions from documents or general knowledge, but it can't check a real record, submit a real request, or update a real system on your behalf. Custom connectors close that gap: a safe, well-defined way for an agent to read from and write to the actual applications a business runs on, with every action explicit, documented, and reviewable before it ever runs in production.",
  },
  {
    label: "how we help",
    title: "A pattern that scales past the first connector",
    body: "We design the connector architecture and authentication approach around what each target system actually supports, then build and test the connector, including the read/write separation and access governance, before it goes live. Because the underlying pattern (spec plus gateway plus compute layer) is repeatable, adding access to a new system after the first connector is a matter of writing a new spec and translation layer, not a bespoke integration effort each time.",
  },
  {
    label: "who it's for",
    title: "Organizations extending an agent beyond its default reach",
    body: "This fits organizations already using or implementing Amazon Quick who want their agent to do more than answer questions from static data, checking a real system, submitting a request, or pulling a live record. It works well alongside a broader Quick implementation, but is also a fit for organizations with Quick already in place who are ready to extend it to new systems.",
  },
];

export const CustomAiAgentConnectors = () => {
  return (
    <article className="min-h-screen bg-blueprint-base pt-24">
      <Seo
        title="Custom AI Agent Connectors: Secure System Access for Amazon Quick"
        description="Custom AI agent connectors for Amazon Quick, giving agents secure, governed access to real business systems through a repeatable architecture."
        path="/solutions/custom-ai-agent-connectors"
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
          <SpecLabel className="mb-cell">solutions · ai agents</SpecLabel>
          <p className="mb-3 font-mono text-label-mono lowercase text-chalk/45">
            professional services · custom connectors for ai agents
          </p>
          <h1 className="max-w-4xl font-display text-display-2 font-extrabold leading-[0.95] text-chalk">
            Custom AI Agent Connectors: Secure System Access for Amazon Quick
          </h1>
          <DimensionLine
            reveal
            label="give your agent real access to the systems you run on"
            className="my-cell max-w-2xl"
          />
          <p className="max-w-2xl font-sans text-body text-chalk/70">
            We design and build custom connectors that give AI agents like
            Amazon Quick safe, governed access to the real business systems an
            organization runs on, HR platforms, ticketing systems, payroll,
            expense tools, and more. Each connector follows a repeatable
            architecture, so an agent can read from and act on real systems
            without calling vendor APIs directly, and adding the next connector
            doesn't mean rearchitecting anything.
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
          <AssetFrame figure={1} caption="agent connector flow">
            <AgentConnectorDiagram className="w-full" />
          </AssetFrame>
        </div>
      </div>

      {/* What's included */}
      <div className="border-t border-chalk/10 bg-drafting-surface/40">
        <div className="mx-auto max-w-7xl px-cell py-2cell">
          <SpecLabel className="mb-cell">what's included</SpecLabel>
          <h2 className="mb-2cell max-w-3xl font-display text-h font-bold text-chalk">
            Four pieces of a governed connector build
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
        headline="Want your agent to do more?"
        body="Tell us what systems you want connected. Most engagements start with a short scoping call, no commitment required."
        buttonLabel="Start a project"
        to="/demo"
      />
    </article>
  );
};
