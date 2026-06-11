import { BlueprintButton } from "../../components/Blueprint/BlueprintButton";
import { BlueprintGrid } from "../../components/Blueprint/BlueprintGrid";
import { CtaSection } from "../../components/Blueprint/CtaSection";
import { SpecLabel } from "../../components/Blueprint/SpecLabel";
import { Seo } from "../../components/Seo";

export const AccessibilityPage = () => {
  return (
    <div className="min-h-screen bg-blueprint-base pt-24">
      <Seo
        title="Accessibility"
        description="Smith Avenue Insights builds to WCAG 2.1 AA: keyboard navigation, screen reader support, high contrast, and reduced-motion safe interfaces across the site."
        path="/accessibility"
      />

      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-chalk/10 bg-drafting-surface py-2cell">
        <BlueprintGrid opacity={0.55} />
        <div className="relative z-10 mx-auto max-w-7xl px-cell">
          <SpecLabel className="mb-cell">accessibility</SpecLabel>
          <h1 className="font-display text-display-2 font-extrabold leading-[0.95] text-chalk">
            Accessibility statement.
          </h1>
          <p className="mt-cell max-w-2xl font-sans text-body text-chalk/70">
            We are committed to ensuring digital accessibility for people with
            disabilities.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-3cell">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl space-y-16">
            {/* Commitment Section */}
            <section>
              <h2 className="font-display text-3xl md:text-4xl text-chalk font-bold mb-6">
                Our Commitment
              </h2>
              <p className="font-sans text-lg text-chalk/80 leading-relaxed mb-4">
                Smith Avenue Insights is committed to ensuring digital
                accessibility for people with disabilities. We are continually
                improving the user experience for everyone and applying the
                relevant accessibility standards.
              </p>
            </section>

            {/* Standards Section */}
            <section>
              <h2 className="font-display text-3xl md:text-4xl text-chalk font-bold mb-6">
                Accessibility Standards
              </h2>
              <p className="font-sans text-lg text-chalk/80 leading-relaxed mb-4">
                Our website is designed to meet or exceed the Web Content
                Accessibility Guidelines (WCAG) 2.1 Level AA standards. These
                guidelines explain how to make web content more accessible for
                people with disabilities and more user-friendly for everyone.
              </p>
              <ul className="list-disc list-inside font-sans text-lg text-chalk/70 space-y-2 ml-4">
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
                  Robust - Content must be reliable enough to be interpreted by
                  a wide variety of user agents, including assistive
                  technologies.
                </li>
              </ul>
            </section>

            {/* Features Section */}
            <section>
              <h2 className="font-display text-3xl md:text-4xl text-chalk font-bold mb-6">
                Accessibility Features
              </h2>
              <ul className="list-disc list-inside font-sans text-lg text-chalk/70 space-y-2 ml-4">
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
              <h2 className="font-display text-3xl md:text-4xl text-chalk font-bold mb-6">
                Contact Us
              </h2>
              <p className="font-sans text-lg text-chalk/80 leading-relaxed mb-8 max-w-2xl">
                We welcome your feedback on the accessibility of our website.
                Please let us know if you encounter accessibility barriers or if
                you need assistance with any part of our site.
              </p>
              <a href="mailto:accessibility@smithavenueinsights.com" className="inline-block">
                <BlueprintButton>Contact Accessibility Team</BlueprintButton>
              </a>
            </section>
          </div>
        </div>
      </div>

      <CtaSection
        headline="Have a project in mind?"
        body="Most engagements start with a 30-minute scoping call. No commitment required."
      />
    </div>
  );
};
