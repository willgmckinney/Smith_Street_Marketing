import { Link } from "@tanstack/react-router";
import { AssetFrame } from "../../components/Blueprint/AssetFrame";
import { BlueprintGrid } from "../../components/Blueprint/BlueprintGrid";
import { CtaSection } from "../../components/Blueprint/CtaSection";
import { DimensionLine } from "../../components/Blueprint/DimensionLine";
import { SpecLabel } from "../../components/Blueprint/SpecLabel";
import { Wireframe } from "../../components/Blueprint/Wireframe";
import { Seo } from "../../components/Seo";

const challenges = [
  {
    label: "the challenge",
    title: "A weekly reporting grind eating the team alive",
    body: "Every single week, 6 to 10 team members spent 30+ hours building the same recurring PowerPoint deck. The process was entirely manual: writing queries by hand, filtering and adjusting each one before every cycle, copying results into shared CSVs, pulling chart screenshots one at a time from multiple sources, and updating dashboard filters individually. Then they did it all again the next week, with end-of-month reporting stacked on top.",
  },
  {
    label: "an overburdened BI team",
    title: "No bandwidth for ad hoc requests",
    body: "The internal BI team was stretched beyond capacity. Stakeholders across the business needed supplemental data beyond what the weekly report covered, with no efficient path to get it. Every ad hoc request created a bottleneck, with no bandwidth or tooling to respond without pulling resources off other priorities.",
  },
  {
    label: "risk at every touch point",
    title: "Decisions made on numbers no one could trust",
    body: "Every manual step introduced risk. Data moved across multiple systems and files by hand, compounding the chance of human error at each stage. Errors were often caught only after reports had already shipped, so decisions were being made on numbers no one could fully trust.",
  },
];

const solutionPillars = [
  {
    title: "Dynamic dashboards",
    body: "Dashboards with intelligent filtering that adjusts automatically by reporting period, with separate automated pipelines for the weekly and end-of-month cycles.",
  },
  {
    title: "Morning data feeds",
    body: "Data is refreshed and ingested into shared documentation every morning before the business day begins, with automated feeds wired directly to the shared reporting files.",
  },
  {
    title: "One source of truth",
    body: "A centralized dashboard drives every chart in the weekly deck. The only manual step left is placing the pre-built assets into the final presentation.",
  },
  {
    title: "Built on Amazon QuickSight",
    body: "SAI's recommended BI platform. Native AWS integration powers the automated pipelines, interactive self-service dashboards, and the scalability to grow as reporting needs expand.",
  },
];

const results = [
  { metric: "Weekly report build time", before: "30+ hours", after: "1–2 hours" },
  { metric: "Monthly hours on reporting", before: "150+ hours", after: "~8 hours" },
  { metric: "People in the manual process", before: "6–10", after: "Minimal oversight only" },
  { metric: "Monthly recovered value", before: "n/a", after: "$10,000–$20,000" },
  { metric: "Manual data-entry errors", before: "Frequent", after: "Nearly eliminated" },
  { metric: "Data freshness", before: "On-demand, manual", after: "Daily, automated" },
  { metric: "Implementation timeline", before: "n/a", after: "2–4 weeks" },
];

const highlights = [
  {
    index: "01",
    title: "Massive time recovery",
    body: "150 hours per month returned to the team for strategic work instead of repetitive data pulls.",
  },
  {
    index: "02",
    title: "Near-zero errors",
    body: "Automated pipelines removed the manual touchpoints that introduced inaccuracies every cycle.",
  },
  {
    index: "03",
    title: "Always-on access",
    body: "Stakeholders get fresh, reliable numbers every morning without requesting a thing.",
  },
];

const atAGlance = {
  challenges: [
    "30+ hours per week on manual report builds",
    "6–10 team members tied up in repetitive pulls",
    "BI team unable to handle ad hoc requests",
    "High risk of data-entry errors each cycle",
  ],
  goals: [
    "Eliminate manual reporting workflows",
    "Ensure data accuracy and consistency",
    "Give stakeholders daily access to fresh numbers",
    "Free the BI team for strategic work",
  ],
};

export const ActiveCampaignCaseStudy = () => {
  return (
    <article className="min-h-screen bg-blueprint-base pt-24">
      <Seo
        title="ActiveCampaign case study"
        description="How Smith Avenue Insights turned a 30-hour weekly reporting grind into a daily, automated pipeline for ActiveCampaign: 150 hours recovered, 95% less reporting, zero manual touches."
        path="/case-studies/activecampaign"
      />

      {/* Hero */}
      <div className="relative overflow-hidden border-b border-chalk/10 bg-drafting-surface py-2cell">
        <BlueprintGrid opacity={0.55} />
        <div className="relative z-10 mx-auto max-w-7xl px-cell">
          <Link
            to="/portfolio"
            className="mb-cell inline-block font-mono text-label-mono lowercase text-chalk/50 transition-colors hover:text-marker-start"
          >
            ← the work
          </Link>
          <SpecLabel className="mb-cell">case study · analytics & reporting</SpecLabel>
          <p className="mb-3 font-mono text-label-mono lowercase text-chalk/45">
            ActiveCampaign · email marketing SaaS · marketing analytics & operations
          </p>
          <h1 className="max-w-4xl font-display text-display-2 font-extrabold leading-[0.95] text-chalk">
            150 hours recovered.
            <br />
            95% less reporting.
            <br />
            Zero manual touches.
          </h1>
          <DimensionLine
            reveal
            label="turning a 30-hour weekly grind into a daily automated pipeline"
            className="my-cell max-w-lg"
          />
          <p className="max-w-2xl font-sans text-body text-chalk/70">
            Smith Avenue Insights partnered with ActiveCampaign to redesign the
            reporting workflow end to end, removing manual intervention at nearly
            every stage.
          </p>
        </div>
      </div>

      {/* Headline metrics */}
      <div className="border-b border-chalk/10 bg-blueprint-base">
        <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-chalk/10 px-cell sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {[
            { value: "150", unit: "hours", label: "recovered per month" },
            { value: "95%", unit: "", label: "less reporting time" },
            { value: "0", unit: "", label: "manual data touches" },
          ].map((stat) => (
            <div key={stat.label} className="py-cell sm:px-cell sm:first:pl-0 sm:last:pr-0">
              <p className="font-display text-display-2 font-extrabold text-marker-start leading-none">
                {stat.value}
                {stat.unit && (
                  <span className="ml-1 text-h text-chalk/70">{stat.unit}</span>
                )}
              </p>
              <p className="mt-2 font-mono text-label-mono lowercase text-chalk/50">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* At a glance + asset */}
      <div className="mx-auto max-w-7xl px-cell py-2cell">
        <div className="grid grid-cols-1 gap-2cell lg:grid-cols-[1fr_1fr] lg:items-start">
          <div>
            <SpecLabel className="mb-cell">at a glance</SpecLabel>
            <div className="grid gap-cell sm:grid-cols-2">
              <div>
                <p className="mb-4 font-mono text-label-mono lowercase text-marker-start">
                  challenges
                </p>
                <ul className="space-y-3">
                  {atAGlance.challenges.map((item) => (
                    <li
                      key={item}
                      className="border-t border-chalk/10 pt-3 font-sans text-body text-chalk/75"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-4 font-mono text-label-mono lowercase text-marker-start">
                  goals
                </p>
                <ul className="space-y-3">
                  {atAGlance.goals.map((item) => (
                    <li
                      key={item}
                      className="border-t border-chalk/10 pt-3 font-sans text-body text-chalk/75"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <AssetFrame figure={1} caption="automated reporting dashboard">
            <Wireframe variant="dashboard" className="mx-auto w-full max-w-md" />
          </AssetFrame>
        </div>
      </div>

      {/* Challenge sections */}
      <div className="border-t border-chalk/10 bg-drafting-surface/40">
        <div className="mx-auto max-w-7xl px-cell py-2cell">
          <SpecLabel className="mb-cell">the challenge</SpecLabel>
          <div className="space-y-2cell">
            {challenges.map((section) => (
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
      </div>

      {/* Solution */}
      <div className="mx-auto max-w-7xl px-cell py-2cell">
        <SpecLabel className="mb-cell">the solution</SpecLabel>
        <h2 className="mb-2 max-w-3xl font-display text-h font-bold text-chalk">
          Automated pipelines, a single source of truth
        </h2>
        <p className="mb-2cell max-w-3xl font-sans text-body text-chalk/75">
          SAI partnered with ActiveCampaign to redesign the reporting workflow
          end to end, removing manual intervention at nearly every stage. The
          full implementation was completed in just 2 to 4 weeks.
        </p>
        <div className="grid gap-cell sm:grid-cols-2">
          {solutionPillars.map((pillar) => (
            <div
              key={pillar.title}
              className="border border-chalk/10 bg-drafting-surface/30 p-cell rounded-spec"
            >
              <p className="mb-3 font-mono text-label-mono lowercase text-marker-start">
                {pillar.title}
              </p>
              <p className="font-sans text-body text-chalk/75 leading-relaxed">
                {pillar.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Results table */}
      <div className="border-t border-chalk/10 bg-drafting-surface/40">
        <div className="mx-auto max-w-7xl px-cell py-2cell">
          <SpecLabel className="mb-cell">results</SpecLabel>
          <div className="overflow-x-auto border border-chalk/10 rounded-spec">
            <table className="w-full min-w-[520px] border-collapse font-mono text-label-mono lowercase">
              <thead>
                <tr className="border-b border-chalk/10 bg-blueprint-base">
                  <th className="px-4 py-3 text-left font-normal text-chalk/45">
                    metric
                  </th>
                  <th className="px-4 py-3 text-left font-normal text-chalk/45">
                    before
                  </th>
                  <th className="px-4 py-3 text-left font-normal text-marker-start">
                    after
                  </th>
                </tr>
              </thead>
              <tbody>
                {results.map((row) => (
                  <tr key={row.metric} className="border-t border-chalk/10">
                    <td className="px-4 py-3 text-chalk/80">{row.metric}</td>
                    <td className="px-4 py-3 text-chalk/50">{row.before}</td>
                    <td className="px-4 py-3 text-marker-start">{row.after}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-2cell grid gap-cell md:grid-cols-3">
            {highlights.map((item) => (
              <div key={item.index} className="border-t border-chalk/10 pt-cell">
                <span className="font-mono text-label-mono text-marker-start">
                  {item.index}
                </span>
                <h3 className="mt-2 mb-3 font-display text-body font-bold text-chalk">
                  {item.title}
                </h3>
                <p className="font-sans text-body text-chalk/70 leading-relaxed">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonial */}
      <div className="mx-auto max-w-7xl px-cell py-2cell">
        <blockquote className="border-l-2 border-marker-start bg-chalk/5 px-cell py-cell rounded-r-spec">
          <p className="max-w-3xl font-sans text-body text-chalk/85 leading-relaxed italic">
            "Our team was spending significant time each week on a manual
            reporting process that was still producing errors. Smith Avenue
            Insights rebuilt how we handle that work. Now the data is accurate,
            the process is automated, and the team is focused on higher-value
            work. It's been a meaningful improvement to how we operate."
          </p>
          <footer className="mt-cell font-mono text-label-mono lowercase text-chalk/55">
            <span className="text-chalk/80">Nick McClanahan</span>
            <span aria-hidden> · </span>
            Director of Marketing Analytics & Operations, ActiveCampaign
          </footer>
        </blockquote>
      </div>

      <CtaSection
        kicker="next step"
        headline="Want results like these?"
        body="Tell us what you are building. Most engagements start with a 30-minute scoping call, no commitment required."
        buttonLabel="Book a demo"
        to="/demo"
      />
    </article>
  );
};
