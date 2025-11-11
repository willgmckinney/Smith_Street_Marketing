import { Link } from "@tanstack/react-router";
import Skyline from "../../assets/Skyline.jpg";
import { CalendlyEmbed } from "./Components/CalendlyEmbed";

export const DemoPage = () => {
  return (
    <div className="min-h-screen">
      <div
        className="absolute inset-0 z-0"
        style={{
          pointerEvents: "none",
          backgroundImage: `url(${Skyline})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.3,
        }}
      />
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="flex flex-col lg:flex-row items-start gap-12">
          {/* Left content section */}
          <div className="lg:w-1/2 text-black pt-8">
            <h1 className="text-5xl font-bold mb-12">
              Let's discuss your unique requirements
            </h1>

            <div className="space-y-8">
              <h2 className="text-3xl font-semibold mb-6">
                What to expect from your custom solution consultation:
              </h2>

              <ul className="space-y-4 text-xl">
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 mt-1 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Tailored discussion of your specific needs and goals
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 mt-1 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Explore flexible engagement models that work for you
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 mt-1 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Learn about our enterprise-grade support options
                </li>
              </ul>
              <div className="bg-white/80 backdrop-blur-sm border border-white/60 rounded-xl p-6 shadow-lg shadow-black/5">
                <h3 className="text-2xl font-semibold text-tirtiary-color mb-3">
                  Featured interactive experience
                </h3>
                <p className="text-lg text-gray-700 mb-4">
                  Preview our Ascent Pharmaceuticals landing page to see how we blend
                  storytelling, compliance, and conversion-focused design for life sciences teams.
                </p>
                <Link
                  to="/ascent-pharmaceuticals-landing"
                  className="inline-flex items-center justify-center rounded-lg border-2 border-tirtiary-color px-4 py-2 text-base font-semibold text-tirtiary-color hover:bg-tirtiary-color hover:text-neutral-color-2 transition-colors duration-200"
                >
                  Launch Ascent Pharmaceuticals demo
                </Link>
              </div>
            </div>
          </div>

          {/* Right calendar section */}
          <div className="lg:w-1/2 bg-white rounded-lg shadow-xl p-6 sm:mt-0 md:mt-10 z-20">
            <CalendlyEmbed />
          </div>
        </div>
      </div>
    </div>
  );
};
