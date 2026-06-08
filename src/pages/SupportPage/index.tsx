import { Link } from "@tanstack/react-router";
import { BlueprintButton } from "../../components/Blueprint/BlueprintButton";
import { BlueprintCard } from "../../components/Blueprint/BlueprintCard";

export const SupportPage = () => {
  const faqItems = [
    {
      question: "What services do you offer?",
      answer:
        "We offer data analysis and business intelligence, cloud integration and migration, website development and maintenance, and custom software development services.",
    },
    {
      question: "How do I get started with your services?",
      answer:
        "You can get started by scheduling a consultation through our demo page. We'll discuss your needs and create a tailored solution for your business.",
    },
    {
      question: "What is your typical project timeline?",
      answer:
        "Project timelines vary based on scope and complexity. Our Data Analytics Jumpstart Package typically takes 2 weeks, while our Full-Stack Application MVP Accelerator takes 30 days.",
    },
    {
      question: "Do you offer ongoing support?",
      answer:
        "Yes, we provide ongoing support and maintenance for all our services. We offer different support tiers to meet your specific needs.",
    },
  ];

  return (
    <div className="min-h-screen bg-blueprint-base pt-24">
      {/* Hero Section */}
      <div className="bg-drafting-surface py-20 border-b border-white/5">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-marker-start to-marker-end font-bold mb-6">
            Support Center
          </h1>
          <p className="font-sans text-xl md:text-2xl text-chalk max-w-3xl mx-auto leading-relaxed">
            Find answers to common questions and get the support you need to
            succeed.
          </p>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl text-white font-bold mb-12 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {faqItems.map((item, index) => (
                <BlueprintCard key={index} className="p-8">
                  <h3 className="font-display text-xl font-bold text-marker-start mb-4">
                    {item.question}
                  </h3>
                  <p className="font-sans text-chalk/70 leading-relaxed">
                    {item.answer}
                  </p>
                </BlueprintCard>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Contact Support Section */}
      <div className="bg-drafting-surface py-20 border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl text-white font-bold mb-8">
              Need More Help?
            </h2>
            <p className="font-sans text-lg md:text-xl text-chalk/80 mb-10 leading-relaxed">
              Our support team is here to help you with any questions or
              concerns.
            </p>
            <div className="flex flex-col md:flex-row gap-6 justify-center">
              <Link to="/demo">
                <BlueprintButton size="lg">Schedule a Consultation</BlueprintButton>
              </Link>
              <a href="mailto:support@smithavenueinsights.com">
                <BlueprintButton size="lg" variant="secondary">
                  Email Support
                </BlueprintButton>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
