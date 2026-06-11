import { Link } from "@tanstack/react-router";
import { BlueprintButton } from "../../components/Blueprint/BlueprintButton";
import { BlueprintCard } from "../../components/Blueprint/BlueprintCard";
import { BlueprintGrid } from "../../components/Blueprint/BlueprintGrid";
import { DimensionLine } from "../../components/Blueprint/DimensionLine";
import { SpecLabel } from "../../components/Blueprint/SpecLabel";
import { Seo } from "../../components/Seo";

const faqItems = [
  {
    question: "What do you build?",
    answer:
      "Data systems, custom software, and cloud infrastructure. On the data side that means pipelines, warehouses, and analytics layers. On the software side it means web applications, APIs, and internal tools. On the cloud side it means AWS architecture, migrations, and cost optimization.",
  },
  {
    question: "How does an engagement start?",
    answer:
      "With a scoping call. We spend 30 minutes understanding your project, then send a written scope with timeline and cost. Most engagements run on a fixed-scope model. We also take on retainer and hourly work for ongoing needs.",
  },
  {
    question: "How big is the team?",
    answer:
      "Three founders plus a network of trusted specialists we pull in for specific needs. You work directly with Will, Dylan, and Duncan. There is no offshore layer, no account manager between you and the people building.",
  },
  {
    question: "Do you sign NDAs?",
    answer:
      "Yes. We sign before any scoping conversation where proprietary information is involved. Standard mutual NDA, no negotiation required for typical terms.",
  },
  {
    question: "How fast can you start?",
    answer:
      "Typically within two weeks of a signed scope. If you have an urgent timeline, say so on the call and we will tell you honestly whether we can accommodate it.",
  },
  {
    question: "Can you work as a subcontractor under a prime?",
    answer:
      "Yes. We have done this with federal and state engagements. We can work under your paper or bring our own.",
  },
];

export const SupportPage = () => {
  return (
    <div className="min-h-screen bg-blueprint-base pt-24">
      <Seo
        title="FAQ"
        description="Answers to what buyers usually ask Smith Avenue Insights before reaching out: what we build, how engagements start, team size, NDAs, and timelines."
        path="/support"
      />

      {/* Hero */}
      <div className="relative overflow-hidden border-b border-chalk/10 bg-drafting-surface py-2cell">
        <BlueprintGrid opacity={0.55} />
        <div className="relative z-10 mx-auto max-w-7xl px-cell">
          <SpecLabel className="mb-cell">faq</SpecLabel>
          <h1 className="font-display text-display-2 font-extrabold leading-[0.95] text-chalk">
            Common questions.
          </h1>
          <DimensionLine reveal label="before you reach out" className="my-cell max-w-md" />
          <p className="max-w-2xl font-sans text-body text-chalk/70">
            Answers to what buyers usually ask before reaching out.
          </p>
        </div>
      </div>

      {/* FAQ */}
      <div className="mx-auto max-w-4xl px-cell py-3cell">
        <div className="space-y-cell">
          {faqItems.map((item, index) => (
            <BlueprintCard key={index} className="p-8">
              <div className="mb-3 flex items-baseline gap-3">
                <span className="font-mono text-label-mono text-marker-start">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2 className="font-display text-h font-bold text-chalk">
                  {item.question}
                </h2>
              </div>
              <p className="pl-9 font-sans text-chalk/70 leading-relaxed">
                {item.answer}
              </p>
            </BlueprintCard>
          ))}
        </div>
      </div>

      {/* Need more help */}
      <div className="relative overflow-hidden border-t border-chalk/10 bg-drafting-surface px-cell py-3cell">
        <BlueprintGrid opacity={0.5} />
        <div className="relative z-10 mx-auto max-w-7xl">
          <DimensionLine reveal label="next step" className="mb-cell max-w-xs" />
          <h2 className="font-display text-display-2 font-extrabold leading-[0.95] text-chalk">
            Need more help?
          </h2>
          <p className="mt-cell max-w-2xl font-sans text-body text-chalk/70">
            If your question is not answered here, the fastest path is a direct
            email.
          </p>
          <div className="mt-2cell flex flex-col gap-4 sm:flex-row">
            <Link to="/demo">
              <BlueprintButton size="lg">Start a project</BlueprintButton>
            </Link>
            <a href="mailto:will@smithaveinsights.com">
              <BlueprintButton size="lg" variant="secondary">
                Email us
              </BlueprintButton>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
