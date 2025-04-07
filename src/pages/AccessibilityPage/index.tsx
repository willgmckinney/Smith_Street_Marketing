export const AccessibilityPage = () => {
  return (
    <div className="min-h-screen bg-neutral-color-2 pt-24">
      {/* Hero Section */}
      <div className="bg-neutral-color-1 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-accent-color-1 font-bold mb-6">
            Accessibility Statement
          </h1>
          <p className="text-xl md:text-2xl text-neutral-color-2 max-w-3xl">
            We are committed to ensuring digital accessibility for people with
            disabilities.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Commitment Section */}
            <section>
              <h2 className="text-3xl md:text-4xl text-accent-color-1 font-bold mb-6">
                Our Commitment
              </h2>
              <p className="text-lg text-neutral-color-1 mb-4">
                Smith Avenue Insights is committed to ensuring digital
                accessibility for people with disabilities. We are continually
                improving the user experience for everyone and applying the
                relevant accessibility standards.
              </p>
            </section>

            {/* Standards Section */}
            <section>
              <h2 className="text-3xl md:text-4xl text-accent-color-1 font-bold mb-6">
                Accessibility Standards
              </h2>
              <p className="text-lg text-neutral-color-1 mb-4">
                Our website is designed to meet or exceed the Web Content
                Accessibility Guidelines (WCAG) 2.1 Level AA standards. These
                guidelines explain how to make web content more accessible for
                people with disabilities and more user-friendly for everyone.
              </p>
              <ul className="list-disc list-inside text-lg text-neutral-color-1 space-y-2">
                <li>
                  Perceivable - Information and user interface components must
                  be presentable to users in ways they can perceive.
                </li>
                <li>
                  Operable - User interface components and navigation must be
                  operable.
                </li>
                <li>
                  Understandable - Information and the operation of user
                  interface must be understandable.
                </li>
                <li>
                  Robust - Content must be robust enough to be interpreted by a
                  wide variety of user agents, including assistive technologies.
                </li>
              </ul>
            </section>

            {/* Features Section */}
            <section>
              <h2 className="text-3xl md:text-4xl text-accent-color-1 font-bold mb-6">
                Accessibility Features
              </h2>
              <ul className="list-disc list-inside text-lg text-neutral-color-1 space-y-2">
                <li>Keyboard navigation support</li>
                <li>Screen reader compatibility</li>
                <li>High contrast text and background colors</li>
                <li>Text resizing capabilities</li>
                <li>Alternative text for images</li>
                <li>Clear and consistent navigation</li>
                <li>Proper heading structure</li>
                <li>Form labels and error messages</li>
              </ul>
            </section>

            {/* Contact Section */}
            <section>
              <h2 className="text-3xl md:text-4xl text-accent-color-1 font-bold mb-6">
                Contact Us
              </h2>
              <p className="text-lg text-neutral-color-1 mb-4">
                We welcome your feedback on the accessibility of our website.
                Please let us know if you encounter accessibility barriers or if
                you need assistance with any part of our site.
              </p>
              <a
                href="mailto:accessibility@smithavenueinsights.com"
                className="inline-block bg-accent-color-1 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-accent-color-1/90 transition-colors"
              >
                Contact Accessibility Team
              </a>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
