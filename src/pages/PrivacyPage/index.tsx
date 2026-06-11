import { BlueprintButton } from "../../components/Blueprint/BlueprintButton";
import { BlueprintGrid } from "../../components/Blueprint/BlueprintGrid";
import { CtaSection } from "../../components/Blueprint/CtaSection";
import { SpecLabel } from "../../components/Blueprint/SpecLabel";
import { Seo } from "../../components/Seo";

export const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-blueprint-base pt-24">
      <Seo
        title="Privacy Policy"
        description="How Smith Avenue Insights collects, uses, and protects your information, the data we gather on this site, and the rights you have over your personal data."
        path="/privacy"
      />

      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-chalk/10 bg-drafting-surface py-2cell">
        <BlueprintGrid opacity={0.55} />
        <div className="relative z-10 mx-auto max-w-7xl px-cell">
          <SpecLabel className="mb-cell">legal</SpecLabel>
          <h1 className="font-display text-display-2 font-extrabold leading-[0.95] text-chalk">
            Privacy policy.
          </h1>
          <p className="mt-cell max-w-2xl font-sans text-body text-chalk/70">
            Your privacy is important to us. Learn how we collect, use, and
            protect your information.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-3cell">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl space-y-16">
            {/* Introduction */}
            <section>
              <h2 className="font-display text-3xl md:text-4xl text-chalk font-bold mb-6">
                Introduction
              </h2>
              <p className="font-sans text-lg text-chalk/80 leading-relaxed mb-4">
                At Smith Avenue Insights, we take your privacy seriously. This
                Privacy Policy explains how we collect, use, disclose, and
                safeguard your information when you visit our website or use our
                services.
              </p>
            </section>

            {/* Information Collection */}
            <section>
              <h2 className="font-display text-3xl md:text-4xl text-chalk font-bold mb-6">
                Information We Collect
              </h2>
              <div className="space-y-8">
                <div>
                  <h3 className="font-display text-xl font-bold text-marker-start mb-4">
                    Personal Information
                  </h3>
                  <ul className="list-disc list-inside font-sans text-lg text-chalk/70 space-y-2 ml-4">
                    <li>Name and contact information</li>
                    <li>Email address</li>
                    <li>Company information</li>
                    <li>Communication preferences</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-marker-start mb-4">
                    Usage Information
                  </h3>
                  <ul className="list-disc list-inside font-sans text-lg text-chalk/70 space-y-2 ml-4">
                    <li>Browser type and version</li>
                    <li>Operating system</li>
                    <li>Pages visited</li>
                    <li>Time spent on pages</li>
                    <li>Referring websites</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* How We Use Information */}
            <section>
              <h2 className="font-display text-3xl md:text-4xl text-chalk font-bold mb-6">
                How We Use Your Information
              </h2>
              <ul className="list-disc list-inside font-sans text-lg text-chalk/70 space-y-2 ml-4">
                <li>To provide and maintain our services</li>
                <li>To communicate with you about our services</li>
                <li>To improve our website and services</li>
                <li>
                  To send you marketing communications (with your consent)
                </li>
                <li>To comply with legal obligations</li>
              </ul>
            </section>

            {/* Data Protection */}
            <section>
              <h2 className="font-display text-3xl md:text-4xl text-chalk font-bold mb-6">
                Data Protection
              </h2>
              <p className="font-sans text-lg text-chalk/80 leading-relaxed mb-4">
                We implement appropriate technical and organizational measures
                to protect your personal information against unauthorized
                access, alteration, disclosure, or destruction.
              </p>
            </section>

            {/* Your Rights */}
            <section>
              <h2 className="font-display text-3xl md:text-4xl text-chalk font-bold mb-6">
                Your Rights
              </h2>
              <p className="font-sans text-lg text-chalk/80 leading-relaxed mb-4">
                You have the right to:
              </p>
              <ul className="list-disc list-inside font-sans text-lg text-chalk/70 space-y-2 ml-4">
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Object to processing of your information</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </section>

            {/* Contact Section */}
            <section>
              <h2 className="font-display text-3xl md:text-4xl text-chalk font-bold mb-6">
                Contact Us
              </h2>
              <p className="font-sans text-lg text-chalk/80 leading-relaxed mb-8 max-w-2xl">
                If you have any questions about this Privacy Policy or our data
                practices, please contact us:
              </p>
              <a
                href="mailto:privacy@smithavenueinsights.com"
                className="inline-block"
              >
                <BlueprintButton>Contact Privacy Team</BlueprintButton>
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
