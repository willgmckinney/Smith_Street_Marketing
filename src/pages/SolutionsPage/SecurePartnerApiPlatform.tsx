import { Link } from "@tanstack/react-router";
import { PartnerApiDiagram } from "../../components/Blueprint/ArchitectureDiagrams";
import { AssetFrame } from "../../components/Blueprint/AssetFrame";
import { BlueprintGrid } from "../../components/Blueprint/BlueprintGrid";
import { CtaSection } from "../../components/Blueprint/CtaSection";
import { DimensionLine } from "../../components/Blueprint/DimensionLine";
import { SpecLabel } from "../../components/Blueprint/SpecLabel";
import { Seo } from "../../components/Seo";

const included = [
  {
    title: "Infrastructure, built as code",
    body: "A fully independent environment defined in AWS CDK: containerized compute with auto-scaling, a dedicated database tier with read replicas for search workloads, and caching for tokens and rate limiting. Edge security includes managed WAF rules, TLS, and centralized credential management.",
  },
  {
    title: "Authentication & API management",
    body: "OAuth 2.0 client-credentials and API-key authentication, per-client scopes and rate limits, cursor-based pagination, webhook subscriptions, self-service key management, and full audit logging with no internal error detail exposed externally.",
  },
  {
    title: "Zero-downtime production launch",
    body: "Fully separate staging and production stacks, cut over independently with dual-environment smoke and stress testing completed before go-live, and the partner's first production credentials issued as part of the rollout.",
  },
  {
    title: "Cost governance",
    body: "A full pricing analysis comparing on-demand, 1-year, and 3-year commitment options against the actual partner contract term, plus right-sizing shared resources between environments to eliminate redundant spend.",
  },
];

const sections = [
  {
    label: "what it is",
    title: "Turn an internal platform into a partner-ready product",
    body: "Opening an internal system to outside partners raises the bar on security, reliability, and cost control all at once. This solution covers that full transition: a dedicated, independently deployed environment, production-grade authentication and rate limiting, and a governed cost model, so the first external partner isn't running on infrastructure built for internal use only.",
  },
  {
    label: "how we help",
    title: "From architecture to production, cost included",
    body: "We design and build the infrastructure end to end, execute the production cutover, and stay through the cost governance pass so the environment is priced correctly against the partner agreement, not left on default on-demand rates. Documentation, including the integration guide, runbook, and API reference, is delivered and kept current with what's actually deployed.",
  },
  {
    label: "who it's for",
    title: "Companies opening a platform to outside partners",
    body: "This fits any company with an internal data platform or system that a partner now needs to integrate with directly, whether that's the first external integration or a growing partner program that's outgrown ad hoc access.",
  },
];

export const SecurePartnerApiPlatform = () => {
  return (
    <article className="min-h-screen bg-blueprint-base pt-24">
      <Seo
        title="Secure Partner API Platform: Build and Production Launch on AWS"
        description="Secure, production-grade partner API builds on AWS, covering infrastructure, authentication, zero-downtime launch, and cost governance."
        path="/solutions/secure-partner-api-platform"
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
            solutions · cloud architecture
          </SpecLabel>
          <p className="mb-3 font-mono text-label-mono lowercase text-chalk/45">
            professional services · secure api infrastructure
          </p>
          <h1 className="max-w-4xl font-display text-display-2 font-extrabold leading-[0.95] text-chalk">
            Secure Partner API Platform: Build and Production Launch on AWS
          </h1>
          <DimensionLine
            reveal
            label="expose your platform to partners, securely and on budget"
            className="my-cell max-w-2xl"
          />
          <p className="max-w-2xl font-sans text-body text-chalk/70">
            We design, build, and launch secure, production-grade APIs that let
            companies expose internal data or platforms to external partners.
            Every engagement covers the full path from infrastructure to
            production cutover, plus a cost governance pass to make sure the AWS
            footprint actually matches the contract driving the work.
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
          <AssetFrame figure={1} caption="partner api platform">
            <PartnerApiDiagram className="mx-auto w-full max-w-md" />
          </AssetFrame>
        </div>
      </div>

      {/* What's included */}
      <div className="border-t border-chalk/10 bg-drafting-surface/40">
        <div className="mx-auto max-w-7xl px-cell py-2cell">
          <SpecLabel className="mb-cell">what's included</SpecLabel>
          <h2 className="mb-2cell max-w-3xl font-display text-h font-bold text-chalk">
            Four pieces of a production-ready launch
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
        body="Tell us what you're opening up to partners. Most engagements start with a short scoping call, no commitment required."
        buttonLabel="Start a project"
        to="/demo"
      />
    </article>
  );
};
