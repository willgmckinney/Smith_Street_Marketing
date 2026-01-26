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
    <div className="min-h-screen bg-deep-horizon pt-24">
      <div className="bg-atmospheric-haze py-20 border-b border-white/5">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-golden-hour-start to-golden-hour-end font-bold mb-10">
            Transparent Pricing
          </h1>
          <p className="font-sans text-xl text-granite max-w-2xl mx-auto leading-relaxed">
            No guesswork or hidden fees. Just clear paths to your summit.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="flex justify-center gap-8 flex-wrap items-center md:items-stretch">
          <div className="flex h-100">
            <PricingCard
              title="Data Analytics Jumpstart"
              price="15,000"
              features={pricingFeatures.analytics}
              description="A customized AWS QuickSight dashboard for actionable insights in 2 weeks."
            />
          </div>
          <div className="flex h-100">
            <PricingCard
              title="Full-Stack MVP Accelerator"
              price="30,000"
              features={pricingFeatures.mvp}
              description="Get your Minimum Viable Product (MVP) live in 30 days using TypeScript and AWS."
              isPopular={true}
            />
          </div>
          <div className="flex h-100">
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
    </div>
  );
};
