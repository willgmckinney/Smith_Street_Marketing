import { SummitButton } from "../../components/Summit/SummitButton";

export const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-deep-horizon pt-24">
      {/* Hero Section */}
      <div className="bg-atmospheric-haze py-20 border-b border-white/5">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-golden-hour-start to-golden-hour-end font-bold mb-6">
            Privacy Policy
          </h1>
          <p className="font-sans text-xl md:text-2xl text-granite max-w-3xl mx-auto leading-relaxed">
            Your privacy is important to us. Learn how we collect, use, and
            protect your information.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-16">
            {/* Introduction */}
            <section>
              <h2 className="font-display text-3xl md:text-4xl text-white font-bold mb-6">
                Introduction
              </h2>
              <p className="font-sans text-lg text-granite/80 leading-relaxed mb-4">
                At Smith Avenue Insights, we take your privacy seriously. This
                Privacy Policy explains how we collect, use, disclose, and
                safeguard your information when you visit our website or use our
                services.
              </p>
            </section>

            {/* Information Collection */}
            <section>
              <h2 className="font-display text-3xl md:text-4xl text-white font-bold mb-6">
                Information We Collect
              </h2>
              <div className="space-y-8">
                <div>
                  <h3 className="font-display text-xl font-bold text-golden-hour-start mb-4">
                    Personal Information
                  </h3>
                  <ul className="list-disc list-inside font-sans text-lg text-granite/70 space-y-2 ml-4">
                    <li>Name and contact information</li>
                    <li>Email address</li>
                    <li>Company information</li>
                    <li>Communication preferences</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-golden-hour-start mb-4">
                    Usage Information
                  </h3>
                  <ul className="list-disc list-inside font-sans text-lg text-granite/70 space-y-2 ml-4">
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
              <h2 className="font-display text-3xl md:text-4xl text-white font-bold mb-6">
                How We Use Your Information
              </h2>
              <ul className="list-disc list-inside font-sans text-lg text-granite/70 space-y-2 ml-4">
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
              <h2 className="font-display text-3xl md:text-4xl text-white font-bold mb-6">
                Data Protection
              </h2>
              <p className="font-sans text-lg text-granite/80 leading-relaxed mb-4">
                We implement appropriate technical and organizational measures
                to protect your personal information against unauthorized
                access, alteration, disclosure, or destruction.
              </p>
            </section>

            {/* Your Rights */}
            <section>
              <h2 className="font-display text-3xl md:text-4xl text-white font-bold mb-6">
                Your Rights
              </h2>
              <p className="font-sans text-lg text-granite/80 leading-relaxed mb-4">
                You have the right to:
              </p>
              <ul className="list-disc list-inside font-sans text-lg text-granite/70 space-y-2 ml-4">
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Object to processing of your information</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </section>

            {/* Contact Section */}
            <section className="text-center">
              <h2 className="font-display text-3xl md:text-4xl text-white font-bold mb-6">
                Contact Us
              </h2>
              <p className="font-sans text-lg text-granite/80 leading-relaxed mb-8">
                If you have any questions about this Privacy Policy or our data
                practices, please contact us:
              </p>
              <a
                href="mailto:privacy@smithavenueinsights.com"
                className="inline-block"
              >
                <SummitButton>Contact Privacy Team</SummitButton>
              </a>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
