import { Link } from "@tanstack/react-router";
import Skyline from "../../../../assets/Getting_Started_BG.png";
import { BlueprintButton } from "../../../../componen../Blueprint/BlueprintButton";

export const ScreenWideCTA = () => {
  return (
    <div className="relative flex flex-col justify-center items-center bg-blueprint-base text-chalk min-h-[80vh] px-4 sm:px-8 py-20 overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: `url(${Skyline})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-blueprint-base via-transparent to-blueprint-base z-0" />

      <div className="relative z-10 max-w-7xl mx-auto w-full text-center space-y-12">
        <p className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-relaxed sm:leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
          Transforming Raw Data Into Actionable Insights and Custom Software
          Into Seamless Solutions.
        </p>

        <p className="font-sans text-lg sm:text-xl md:text-2xl text-chalk/80 max-w-4xl mx-auto">
          Helping Businesses Thrive With Clarity and Efficiency.
        </p>

        <div className="pt-8 flex justify-center">
          <Link to="/demo">
            <BlueprintButton size="lg" className="text-xl sm:text-2xl px-12 py-6">
              Get Started
            </BlueprintButton>
          </Link>
        </div>
      </div>
    </div>
  );
};
