import { PricingCard } from "./Components/PricingCard";

const pricingFeatures = {
  analytics: [
    "Setup and integration with your existing AWS infrastructure",
    "Custom metrics and visualizations tailored to your KPIs",
    "Training for your team on dashboard usage and maintenance",
    "Money-back guarantee if we can't deliver actionable insights",
  ],
  mvp: [
    "Architecture design and scalable cloud infrastructure setup",
    "Full front-end and back-end development",
    "Initial deployment and monitoring with AWS services",
    "Post-launch support for 1 month",
  ],
};

export const PricingPage = () => {
  return (
    <div className="p-8 pt-24 min-h-screen bg-neutral-color-2">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <svg
              className="w-6 h-6 text-accent-color-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              ></path>
            </svg>
            <h2 className="text-xl font-medium tirtiary-color">
              Direct, upfront pricing
            </h2>
          </div>
          <p className="text-tirtiary-color">
            No guesswork or hidden fees. Just transparent pricing plans.
          </p>
        </div>

        <div className="flex justify-center gap-8 flex-wrap">
          <PricingCard
            title="Data Analytics Jumpstart Package"
            price="15,000"
            features={pricingFeatures.analytics}
            description="A fully customized AWS QuickSight dashboard for actionable insights in under 2 weeks."
          />
          <PricingCard
            title="Full-Stack Application MVP Accelerator"
            price="30,000"
            features={pricingFeatures.mvp}
            description="Get your Minimum Viable Product (MVP) live in 30 days using TypeScript and AWS."
            isPopular={true}
          />
          <PricingCard
            title="Custom Solutions"
            features={[
              "Tailored to your specific needs",
              "Flexible engagement models",
              "Enterprise-grade support",
            ]}
            description="Let's discuss your unique requirements and create a custom solution together."
          />
        </div>
      </div>
    </div>
  );
};
