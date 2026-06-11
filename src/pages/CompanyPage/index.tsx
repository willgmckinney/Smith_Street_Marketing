import { BlueprintCard } from "../../components/Blueprint/BlueprintCard";
import { BlueprintGrid } from "../../components/Blueprint/BlueprintGrid";
import { CtaSection } from "../../components/Blueprint/CtaSection";
import { DimensionLine } from "../../components/Blueprint/DimensionLine";
import { SpecLabel } from "../../components/Blueprint/SpecLabel";
import { Seo } from "../../components/Seo";
import { Team } from "../HomePage/Components/Team";

const values = [
  {
    label: "context first",
    body: "We listen to your project, your users, and your constraints before writing a line. The solution comes from your situation, not a template.",
  },
  {
    label: "built to last",
    body: "We build for production, not demos. Systems we ship are running in production at companies like Airbus and Apollo Mapping years after handoff.",
  },
  {
    label: "your team owns it",
    body: "Handoff is the job. We document, we train, and we leave you with something your engineers can maintain and extend.",
  },
];

export const CompanyPage = () => {
  return (
    <div className="min-h-screen bg-blueprint-base pt-24">
      <Seo
        title="About"
        description="Smith Avenue Insights is a Chicago-based software and data consultancy. We scope honestly, build for production, and hand off so your team can run it."
        path="/company"
      />

      {/* Hero */}
      <div className="relative overflow-hidden border-b border-chalk/10 bg-drafting-surface py-2cell">
        <BlueprintGrid opacity={0.55} />
        <div className="relative z-10 mx-auto max-w-7xl px-cell">
          <SpecLabel className="mb-cell">about</SpecLabel>
          <h1 className="max-w-4xl font-display text-display-2 font-extrabold leading-[0.98] text-chalk">
            We build the thing. Then we hand you the keys.
          </h1>
          <DimensionLine reveal label="chicago, il" className="my-cell max-w-md" />
          <p className="max-w-2xl font-sans text-body text-chalk/70">
            Smith Avenue Insights is a Chicago-based software and data
            consultancy. We work the way a general contractor does: scoped
            honestly, built right, and handed off so your team can run it without
            us.
          </p>
        </div>
      </div>

      {/* Values */}
      <div className="mx-auto max-w-7xl px-cell py-3cell">
        <div className="grid gap-cell md:grid-cols-3">
          {values.map((v) => (
            <BlueprintCard key={v.label} className="flex flex-col p-8">
              <p className="mb-4 font-mono text-label-mono lowercase tracking-[0.16em] text-marker-start">
                {v.label}
              </p>
              <p className="font-sans text-chalk/70 leading-relaxed">{v.body}</p>
            </BlueprintCard>
          ))}
        </div>
      </div>

      {/* Positioning */}
      <div className="border-y border-chalk/10 bg-drafting-surface">
        <div className="mx-auto grid max-w-7xl gap-cell px-cell py-3cell lg:grid-cols-2 lg:gap-2cell">
          <div>
            <DimensionLine reveal label="how we operate" className="mb-cell max-w-xs" />
            <h2 className="font-display text-display-2 font-extrabold leading-[0.95] text-chalk">
              General contractors for your tech.
            </h2>
          </div>
          <div className="flex flex-col justify-center gap-6 font-sans text-body text-chalk/70">
            <p>
              A general contractor does not just swing a hammer. They scope the
              job, pull the right crew, manage the build from foundation to
              handoff, and stand behind the work.
            </p>
            <p>
              That is how we operate. We have built data lakehouses for Airbus,
              geospatial platforms for Apollo Mapping, and production web
              applications for pharma and education clients. Same standard on
              every project.
            </p>
          </div>
        </div>
      </div>

      {/* Crew */}
      <Team />

      {/* Closing CTA */}
      <CtaSection
        kicker="next step"
        headline="Ready to scope your build?"
        body="Most engagements start with a 30-minute call. No commitment required."
        buttonLabel="Start a project"
        to="/demo"
      />
    </div>
  );
};
