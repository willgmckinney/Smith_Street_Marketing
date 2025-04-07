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
    <div className="min-h-screen bg-neutral-color-2 pt-24">
      {/* Hero Section */}
      <div className="bg-neutral-color-1 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-accent-color-1 font-bold mb-6">
            Support Center
          </h1>
          <p className="text-xl md:text-2xl text-neutral-color-2 max-w-3xl">
            Find answers to common questions and get the support you need to
            succeed.
          </p>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl text-accent-color-1 font-bold mb-12">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {faqItems.map((item, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-bold text-accent-color-1 mb-4">
                    {item.question}
                  </h3>
                  <p className="text-neutral-color-1">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Contact Support Section */}
      <div className="bg-neutral-color-1 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl text-accent-color-1 font-bold mb-8">
              Need More Help?
            </h2>
            <p className="text-lg md:text-xl text-neutral-color-2 mb-8">
              Our support team is here to help you with any questions or
              concerns.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <a
                href="/demo"
                className="inline-block bg-accent-color-1 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-accent-color-1/90 transition-colors"
              >
                Schedule a Consultation
              </a>
              <a
                href="mailto:support@smithavenueinsights.com"
                className="inline-block bg-white text-accent-color-1 px-8 py-3 rounded-lg text-lg font-medium hover:bg-neutral-color-1/10 transition-colors border-2 border-accent-color-1"
              >
                Email Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
