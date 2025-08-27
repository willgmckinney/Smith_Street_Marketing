import { Link } from "@tanstack/react-router";
import Skyline from "../../../../assets/skyline.jpg";

export const ScreenWideCTA = () => {
  return (
    <div className="flex flex-col justify-center items-center bg-neutral-color-1 text-neutral-color-1 min-h-screen px-4 sm:px-5 py-12 sm:py-16 pt-32 relative">
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, 
            rgba(51, 51, 51, 0) 0%, 
            rgba(51, 51, 51, 0.2) 50%, 
            rgba(51, 51, 51, 0) 100%
          )`,
          pointerEvents: "none",
          backgroundImage: `url(${Skyline})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.3,
        }}
      />
      <div className="max-w-7xl mx-auto w-full relative">
        <div className="space-y-6 sm:space-y-8 text-center">
          <h1 className="text-[2.5rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem] text-tirtiary-color font-bold leading-tight">
            We Connect The Dots...
          </h1>
          <p className="text-[1.5rem] sm:text-[2.25rem] md:text-[3rem] lg:text-[3.5rem] text-tirtiary-color leading-relaxed font-bold">
            Transforming Raw Data Into Actionable Insights and Custom Software
            Into Seamless Solutions, Helping Businesses Thrive With Clarity and
            Efficiency.
          </p>
        </div>
        <div className="mt-12 sm:mt-16 flex justify-center">
          <Link
            to="/demo"
            className="inline-block text-neutral-color-1 bg-accent-color-1 border-2 border-neutral-color-1 hover:text-neutral-color-1 hover:bg-tirtiary-color hover:border-neutral-color-1 py-4 sm:py-5 px-8 sm:px-10 rounded-xl w-full sm:w-auto sm:min-w-[250px] md:min-w-[350px] lg:min-w-[450px] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 text-center"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};
