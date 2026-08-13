import { Link } from "@tanstack/react-router";
import { DataLakehouseDiagram } from "../../components/Blueprint/ArchitectureDiagrams";
import { AssetFrame } from "../../components/Blueprint/AssetFrame";
import { BlueprintGrid } from "../../components/Blueprint/BlueprintGrid";
import { CtaSection } from "../../components/Blueprint/CtaSection";
import { DimensionLine } from "../../components/Blueprint/DimensionLine";
import { SpecLabel } from "../../components/Blueprint/SpecLabel";
import { Seo } from "../../components/Seo";

const included = [
  {
    title: "Source-appropriate ingestion",
    body: "Batch and near-real-time event ingestion via AWS AppFlow and Glue, event-driven orchestration through EventBridge and Step Functions, and SFTP-based transfer via AWS Transfer Family where required. Every source normalizes into a shared canonical schema through AWS Lambda, so downstream systems work against one consistent model.",
  },
  {
    title: "Medallion-architecture storage",
    body: "S3 as the raw landing zone, Redshift for the modeled, analytics-ready layer (typically structured as a star schema for BI performance), and RDS PostgreSQL for transactional and application state. OpenSearch and ElastiCache are added where search performance and low-latency access matter.",
  },
  {
    title: "Field-level governance",
    body: "AWS Lake Formation governs access at the field level across the lakehouse, with IAM and KMS handling identity and encryption, Secrets Manager centralizing credentials, and CloudTrail and GuardDuty providing full audit logging and threat detection.",
  },
  {
    title: "Cross-cutting data quality",
    body: "Validation, reconciliation, and alerting run across every source as a shared pipeline health layer, rather than being rebuilt per connector, so issues surface early regardless of which system they originate from.",
  },
];

const sections = [
  {
    label: "what it is",
    title: "One governed model instead of five one-off pipelines",
    body: "Most organizations don't have one data problem, they have one per source system. Each new integration tends to get bolted on with its own logic, its own schema assumptions, and its own blind spots. This solution replaces that pattern with a single governed lakehouse: every source lands in one place, gets normalized to a shared model, and becomes queryable by any downstream consumer without repeating the ingestion and governance work each time.",
  },
  {
    label: "how we help",
    title: "From first connector to full governance",
    body: "We design the canonical data model up front, so every new source system fits into the same structure instead of requiring its own one-off logic. From there, we build the ingestion pipelines, stand up the storage layers, and implement governance and access control before the lakehouse goes into production. The result supports multiple consumption patterns from the same governed foundation, including internal APIs, application data layers, and embedded BI dashboards, without duplicating ingestion or governance work for each new use case.",
  },
  {
    label: "who it's for",
    title: "Organizations pulling data from multiple systems",
    body: "This fits any organization consolidating data from several disconnected source systems, whether that's five HR and finance platforms feeding one people-data model, or a mix of operational and transactional systems that need to power analytics and applications from the same trusted source.",
  },
];

export const DataLakehouse = () => {
  return (
    <article className="min-h-screen bg-blueprint-base pt-24">
      <Seo
        title="Multi-Source Data Lakehouse: Ingestion, Governance, and Analytics on AWS"
        description="Governed data lakehouse builds on AWS: multi-source ingestion, medallion-architecture storage, field-level governance, and analytics-ready modeling."
        path="/solutions/data-lakehouse"
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
            professional services · data lakehouse architecture
          </p>
          <h1 className="max-w-4xl font-display text-display-2 font-extrabold leading-[0.95] text-chalk">
            Multi-Source Data Lakehouse: Ingestion, Governance, and Analytics on
            AWS
          </h1>
          <DimensionLine
            reveal
            label="unify every source system into one trusted model"
            className="my-cell max-w-2xl"
          />
          <p className="max-w-2xl font-sans text-body text-chalk/70">
            We design and build governed data lakehouses on AWS that unify data
            from multiple disconnected source systems into a single, trusted
            model. Using a medallion architecture across S3, Redshift, and RDS,
            we handle ingestion, schema normalization, cataloging, and
            field-level governance, so analytics, applications, and dashboards
            all draw from the same reliable foundation.
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
          <AssetFrame figure={1} caption="lakehouse data flow">
            <DataLakehouseDiagram className="w-full" />
          </AssetFrame>
        </div>
      </div>

      {/* What's included */}
      <div className="border-t border-chalk/10 bg-drafting-surface/40">
        <div className="mx-auto max-w-7xl px-cell py-2cell">
          <SpecLabel className="mb-cell">what's included</SpecLabel>
          <h2 className="mb-2cell max-w-3xl font-display text-h font-bold text-chalk">
            Four layers of a production-ready lakehouse
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
        headline="Want to see how this fits your data?"
        body="Tell us what systems you're working with. Most engagements start with a short scoping call, no commitment required."
        buttonLabel="Start a project"
        to="/demo"
      />
    </article>
  );
};
