import { BlueprintGrid } from "../../components/Blueprint/BlueprintGrid";
import { SpecLabel } from "../../components/Blueprint/SpecLabel";
import { ApolloContactForm } from "./Components/ApolloContactForm";

export const DemoPage = () => {
  return (
    <div className="min-h-screen bg-blueprint-base pt-24 relative overflow-hidden">
      <BlueprintGrid opacity={0.55} />
      <div className="absolute inset-0 bg-gradient-to-b from-blueprint-base via-transparent to-blueprint-base z-0 pointer-events-none" />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-20">
          <div className="lg:w-1/2 pt-8">
            <SpecLabel className="mb-6">consultation</SpecLabel>
            <h1 className="font-display text-display-2 font-extrabold mb-8 text-chalk">
              Let's scope your{" "}
              <span className="text-marker-start">next build</span>
            </h1>

            <div className="space-y-10">
              <h2 className="font-display text-h font-medium text-chalk/90">
                What to expect from your consultation:
              </h2>

              <ul className="space-y-6">
                {[
                  "A straight discussion of your requirements and goals",
                  "Engagement models that fit the scope of the job",
                  "Enterprise-grade support options when you need them",
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <div className="bg-marker-start p-1 rounded-spec mr-4 mt-1">
                      <svg
                        className="w-4 h-4 text-drafting-surface"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="3"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="text-body text-chalk/80 font-sans">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:w-1/2 w-full bg-drafting-surface rounded-card border border-chalk/10 p-0 overflow-hidden">
            <ApolloContactForm />
          </div>
        </div>
      </div>
    </div>
  );
};
