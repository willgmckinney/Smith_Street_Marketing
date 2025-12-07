import Skyline from "../../assets/Skyline.jpg";
import { CalendlyEmbed } from "./Components/CalendlyEmbed";

export const DemoPage = () => {
  return (
    <div className="min-h-screen bg-deep-horizon pt-24 relative overflow-hidden">
      {/* Background Overlay */}
      <div
        className="absolute inset-0 z-0 opacity-20"
        style={{
          pointerEvents: "none",
          backgroundImage: `url(${Skyline})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-deep-horizon via-transparent to-deep-horizon z-0 pointer-events-none" />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-20">
          {/* Left content section */}
          <div className="lg:w-1/2 pt-8">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-white leading-tight">
              Let's discuss your{" "}
              <span className="text-golden-hour-start">
                unique requirements
              </span>
            </h1>

            <div className="space-y-10">
              <h2 className="font-display text-2xl font-semibold text-white/90">
                What to expect from your consultation:
              </h2>

              <ul className="space-y-6">
                {[
                  "Tailored discussion of your specific needs and goals",
                  "Explore flexible engagement models that work for you",
                  "Learn about our enterprise-grade support options",
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <div className="bg-golden-gradient p-1 rounded-full mr-4 mt-1">
                      <svg
                        className="w-4 h-4 text-deep-horizon"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="3"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="text-xl text-granite/80 font-sans">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right calendar section */}
          <div className="lg:w-1/2 w-full bg-white rounded-card shadow-2xl p-4 sm:p-6 border border-white/10 overflow-hidden">
            <CalendlyEmbed />
          </div>
        </div>
      </div>
    </div>
  );
};
