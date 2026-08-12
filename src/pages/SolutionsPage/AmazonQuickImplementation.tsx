import { Link } from "@tanstack/react-router";
import { AmazonQuickDiagram } from "../../components/Blueprint/ArchitectureDiagrams";
import { AssetFrame } from "../../components/Blueprint/AssetFrame";
import { BlueprintGrid } from "../../components/Blueprint/BlueprintGrid";
import { CtaSection } from "../../components/Blueprint/CtaSection";
import { DimensionLine } from "../../components/Blueprint/DimensionLine";
import { SpecLabel } from "../../components/Blueprint/SpecLabel";
import { Seo } from "../../components/Seo";

const included = [
  {
    title: "BI & agentic AI analytics",
    body: "Standard dashboards for recurring reporting, plus an AI agent that can answer ad hoc questions without a report being built ahead of time.",
  },
  {
    title: "Ad hoc reporting & knowledge bases",
    body: "Connect existing files and folders (SharePoint, OneDrive, Google Drive) so questions can be asked across documents and spreadsheets, not just structured databases. One-off questions can also be answered from a direct CSV or PDF upload with no connector setup at all.",
  },
  {
    title: "Embedded delivery",
    body: "For teams who want analytics built into an existing portal or client-facing application, Quick can be embedded directly, with access controlled per user or by tag so each person or partner only sees their own data.",
  },
  {
    title: "Permissions & security",
    body: "Single sign-on through AWS IAM Identity Center, role assignment (admin, author, reader), and row-level security so access always matches how your organization is actually structured, by user or by group.",
  },
];

const sections = [
  {
    label: "what it is",
    title: "BI dashboards and agentic AI, in one place",
    body: "Amazon Quick combines traditional BI dashboards with an agentic AI layer that can answer questions directly from your data. Teams keep the dashboards they rely on for recurring reporting, while adding the ability to ask a question in plain language and get an answer traced back to its source, whether that's a database, a document, or a spreadsheet.",
  },
  {
    label: "how we help",
    title: "From account setup to org-wide rollout",
    body: "We handle the full setup: account and identity configuration, connecting your data sources, and designing the permissions model before anyone logs in. Rollout is planned in phases, typically starting with a pilot group before expanding to the full organization. If you're running another BI tool today, we can stand up Quick alongside it as a proof of concept first, so your team can evaluate agentic AI on real usage before deciding whether, or how much, to migrate. For organizations modernizing their broader data architecture, we can also help design a data lake on AWS (S3, Redshift, Aurora) so Quick connects natively without custom pipeline work.",
  },
  {
    label: "who it's for",
    title: "From a first BI tool to an org-wide rollout",
    body: "This works whether you're introducing structured analytics for the first time or adding an agentic AI layer on top of a mature BI setup. We scope the deployment to match, from a lightweight single-team setup to a phased rollout across dozens of stakeholders.",
  },
];

export const AmazonQuickImplementation = () => {
  return (
    <article className="min-h-screen bg-blueprint-base pt-24">
      <Seo
        title="Amazon Quick Implementation and Organization-Wide Rollout"
        description="Amazon Quick implementation for BI, agentic AI analytics, ad hoc reporting, embedded delivery, and permissions, rolled out by Smith Avenue Insights."
        path="/solutions/amazon-quick-implementation"
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
            professional services · agentic ai analytics
          </p>
          <h1 className="max-w-4xl font-display text-display-2 font-extrabold leading-[0.95] text-chalk">
            Amazon Quick Implementation and Organization-Wide Rollout
          </h1>
          <DimensionLine
            reveal
            label="turn your data into questions your team can just ask"
            className="my-cell max-w-2xl"
          />
          <p className="max-w-2xl font-sans text-body text-chalk/70">
            We help organizations stand up Amazon Quick from the ground up:
            connecting the data you already have, configuring who can see what,
            and rolling it out to your team in phases. The result is a working,
            secured environment where people can ask plain-language questions
            and get verified answers, instead of waiting on a report request.
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
          <AssetFrame figure={1} caption="amazon quick data flow">
            <AmazonQuickDiagram className="w-full" />
          </AssetFrame>
        </div>
      </div>

      {/* What's included */}
      <div className="border-t border-chalk/10 bg-drafting-surface/40">
        <div className="mx-auto max-w-7xl px-cell py-2cell">
          <SpecLabel className="mb-cell">what's included</SpecLabel>
          <h2 className="mb-2cell max-w-3xl font-display text-h font-bold text-chalk">
            Four things every rollout needs
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
        headline="Want to see how this fits your team?"
        body="Tell us what you're working with. Most engagements start with a short scoping call, no commitment required."
        buttonLabel="Start a project"
        to="/demo"
      />
    </article>
  );
};
