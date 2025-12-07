import { Link } from "@tanstack/react-router";
import { SummitButton } from "../../components/Summit/SummitButton";
import { SummitCard } from "../../components/Summit/SummitCard";
import { Team } from "../HomePage/Components/Team";

export const CompanyPage = () => {
  return (
    <div className="min-h-screen bg-deep-horizon pt-24">
      {/* Hero Section */}
      <div className="bg-atmospheric-haze py-20 border-b border-white/5">
        <div className="container mx-auto px-4">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-golden-hour-start to-golden-hour-end font-bold mb-6">
            Our Company
          </h1>
          <p className="font-sans text-xl md:text-2xl text-granite max-w-3xl leading-relaxed">
            Smith Avenue Insights is a forward-thinking technology consultancy
            dedicated to transforming businesses through data-driven insights
            and innovative software solutions.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl md:text-4xl text-white font-bold mb-6">
                Our Mission
              </h2>
              <p className="font-sans text-lg md:text-xl text-granite/80 max-w-3xl mx-auto leading-relaxed">
                We connect the dots between data and business success, helping
                organizations make informed decisions and drive growth through
                technology innovation.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <SummitCard className="p-8">
                <h3 className="font-display text-xl font-bold text-golden-hour-start mb-4">
                  Innovation
                </h3>
                <p className="font-sans text-granite/70">
                  Pushing boundaries with cutting-edge technology solutions
                </p>
              </SummitCard>
              <SummitCard className="p-8">
                <h3 className="font-display text-xl font-bold text-golden-hour-start mb-4">
                  Excellence
                </h3>
                <p className="font-sans text-granite/70">
                  Delivering outstanding results through expertise and
                  dedication
                </p>
              </SummitCard>
              <SummitCard className="p-8">
                <h3 className="font-display text-xl font-bold text-golden-hour-start mb-4">
                  Partnership
                </h3>
                <p className="font-sans text-granite/70">
                  Building lasting relationships with our clients
                </p>
              </SummitCard>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <Team />

      {/* Contact Section */}
      <div className="bg-atmospheric-haze py-20 border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl text-white font-bold mb-8">
              Get in Touch
            </h2>
            <p className="font-sans text-lg md:text-xl text-granite/80 mb-10 leading-relaxed">
              Ready to transform your business? Let's start a conversation about
              how we can help you achieve your goals.
            </p>
            <Link to="/demo" className="inline-block">
              <SummitButton size="lg">Schedule a Consultation</SummitButton>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
