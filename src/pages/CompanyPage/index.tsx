import { Team } from "../HomePage/Components/Team";

export const CompanyPage = () => {
  return (
    <div className="min-h-screen bg-neutral-color-2 pt-24">
      {/* Hero Section */}
      <div className="bg-neutral-color-1 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-accent-color-1 font-bold mb-6">
            Our Company
          </h1>
          <p className="text-xl md:text-2xl text-neutral-color-2 max-w-3xl">
            Smith Avenue Insights is a forward-thinking technology consultancy
            dedicated to transforming businesses through data-driven insights
            and innovative software solutions.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl text-accent-color-1 font-bold mb-8">
              Our Mission
            </h2>
            <p className="text-lg md:text-xl text-neutral-color-1 mb-8">
              We connect the dots between data and business success, helping
              organizations make informed decisions and drive growth through
              technology innovation.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold text-accent-color-1 mb-4">
                  Innovation
                </h3>
                <p className="text-neutral-color-1">
                  Pushing boundaries with cutting-edge technology solutions
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold text-accent-color-1 mb-4">
                  Excellence
                </h3>
                <p className="text-neutral-color-1">
                  Delivering outstanding results through expertise and
                  dedication
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold text-accent-color-1 mb-4">
                  Partnership
                </h3>
                <p className="text-neutral-color-1">
                  Building lasting relationships with our clients
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <Team />

      {/* Contact Section */}
      <div className="bg-neutral-color-1 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl text-accent-color-1 font-bold mb-8">
              Get in Touch
            </h2>
            <p className="text-lg md:text-xl text-neutral-color-2 mb-8">
              Ready to transform your business? Let's start a conversation about
              how we can help you achieve your goals.
            </p>
            <a
              href="/demo"
              className="inline-block bg-accent-color-1 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-accent-color-1/90 transition-colors"
            >
              Schedule a Consultation
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
