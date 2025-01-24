import AnimatedCanvas from "./Background/animatedCanvas";

export const HeroBanner = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-neutral-color-2 text-neutral-color-1 h-[90%]">
      <div className="flex flex-col items-center justify-center justify-items-center bg-transparent space-y-10 z-10 w-[60%]">
        <h1 className="text-[6rem] text-accent-color-1">We Connect The Dots</h1>
        <p className="text-4xl">
          We leverage software to increase impactful insights
        </p>
      </div>
      <div className="flex flex-col items-center justify-center bg-transparent pt-10 z-10">
        <button className="bg-accent-color-1 hover:text-neutral-color-1 text-3xl px-8 py-3 rounded-full">
          <h1 className="text-5xl">Get Started</h1>
        </button>
      </div>
      <AnimatedCanvas />
    </div>
  );
};
