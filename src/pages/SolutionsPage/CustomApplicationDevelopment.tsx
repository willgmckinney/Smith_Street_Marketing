import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { CustomApplicationDiagram } from "../../components/Blueprint/ArchitectureDiagrams";
import { AssetFrame } from "../../components/Blueprint/AssetFrame";
import { BlueprintGrid } from "../../components/Blueprint/BlueprintGrid";
import { CtaSection } from "../../components/Blueprint/CtaSection";
import { DimensionLine } from "../../components/Blueprint/DimensionLine";
import { SpecLabel } from "../../components/Blueprint/SpecLabel";
import { Seo } from "../../components/Seo";

const included = [
  {
    title: "Front end and API architecture",
    body: "React applications served through S3 and CloudFront behind AWS WAF, with an API layer matched to the workload: API Gateway and Lambda for lightweight, event-driven endpoints, and ECS Fargate for services that need sustained compute. RDS Proxy manages connection pooling so the application holds up under real concurrent load.",
  },
  {
    title: "Federated authentication",
    body: "Amazon Cognito federated to the client's existing identity provider (Okta, Microsoft Entra ID, or similar) via SAML or OIDC, with MFA and persona-to-role claim mapping configured from day one, not added after launch.",
  },
  {
    title: "Role-based access and data masking",
    body: "Role-based access control and field-level data masking enforced consistently at both the API and application layer, so what a user can see and do is governed by the same rules everywhere, not just in the UI.",
  },
  {
    title: "Write-back automation and embedded analytics",
    body: "Where an application needs to write changes back to a system of record, we build that as an orchestrated approval workflow (AWS Step Functions) rather than a direct write path. Where reporting is needed, BI dashboards can be embedded directly into the application experience with permission-scoped, registered-user access.",
  },
];

const sections: { label: string; title: string; body: ReactNode }[] = [
  {
    label: "what it is",
    title: "A production-ready application, built to scale from the start",
    body: "Custom applications often start strong and then hit friction at scale: authentication bolted on late, permissions enforced inconsistently across views, or a rollout that outpaces what the infrastructure was built to handle. This solution builds those pieces in from the beginning, architecture, identity, access control, and rollout planning, so scaling the application doesn't mean rebuilding it.",
  },
  {
    label: "how we help",
    title: "A phased path from first build to full rollout",
    body: "We start with an architecture validation phase that proves out the core patterns, authentication, data access, one working view end to end, before scaling to a full-featured, organization-wide release. That front-loads risk and validates the hard parts early, rather than discovering issues at launch. From there, we build out the full feature set and manage the rollout itself, including user onboarding and permissions cutover across the organization.",
  },
  {
    label: "who it's for",
    title: "Organizations building an application their team will actually depend on",
    body: (
      <>
        This fits organizations building an internal or partner-facing
        application from the ground up, especially where the application needs to
        integrate with existing identity systems, enforce real permissions, and
        scale to an entire organization rather than a small pilot group. It pairs
        naturally with a governed data layer underneath (see our{" "}
        <Link
          to="/solutions/data-lakehouse"
          className="text-marker-start underline decoration-marker-start/40 underline-offset-4 transition-colors hover:decoration-marker-start"
        >
          data lakehouse solution
        </Link>
        ), but works as a standalone engagement as well.
      </>
    ),
  },
];

export const CustomApplicationDevelopment = () => {
  return (
    <article className="min-h-screen bg-blueprint-base pt-24">
      <Seo
        title="Custom Application Development and Deployment on AWS"
        description="Custom application development on AWS: front-end and API architecture, federated authentication, permissions, and phased organization-wide rollout."
        path="/solutions/custom-application-development"
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
            solutions · application development
          </SpecLabel>
          <p className="mb-3 font-mono text-label-mono lowercase text-chalk/45">
            professional services · custom application build and deployment
          </p>
          <h1 className="max-w-4xl font-display text-display-2 font-extrabold leading-[0.95] text-chalk">
            Custom Application Development and Deployment on AWS
          </h1>
          <DimensionLine
            reveal
            label="from first architecture pass to org-wide rollout"
            className="my-cell max-w-2xl"
          />
          <p className="max-w-2xl font-sans text-body text-chalk/70">
            We design, build, and deploy custom web applications on AWS, from
            front-end architecture through federated authentication, secure
            hosting, and phased rollout. Every engagement covers the full
            application lifecycle, so what launches is production-ready from day
            one, not retrofitted after the fact.
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
          <AssetFrame figure={1} caption="application architecture">
            <CustomApplicationDiagram className="mx-auto w-full max-w-lg" />
          </AssetFrame>
        </div>
      </div>

      {/* What's included */}
      <div className="border-t border-chalk/10 bg-drafting-surface/40">
        <div className="mx-auto max-w-7xl px-cell py-2cell">
          <SpecLabel className="mb-cell">what's included</SpecLabel>
          <h2 className="mb-2cell max-w-3xl font-display text-h font-bold text-chalk">
            Four pieces of a production-ready build
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
        body="Tell us what you're building. Most engagements start with a short scoping call, no commitment required."
        buttonLabel="Start a project"
        to="/demo"
      />
    </article>
  );
};
