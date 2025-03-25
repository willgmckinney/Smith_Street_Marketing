import AnimatedCanvas from "./Background/animatedCanvas";

export const HeroBanner = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-neutral-color-2 text-neutral-color-1 h-[100%]">
      <div className="flex flex-col items-center justify-center justify-items-center bg-transparent space-y-10 z-10">
        <h1 className="text-[2rem] lg:text-[6rem] text-accent-color-1">
          SMITH AVENUE INSIGHTS
        </h1>
      </div>
      <AnimatedCanvas />
    </div>
  );
};
