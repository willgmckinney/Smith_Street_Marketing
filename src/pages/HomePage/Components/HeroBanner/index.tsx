import AnimatedCanvas from "./Background/animatedCanvas";

export const HeroBanner = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-neutral-color-2 text-tirtiary-color h-[100%] px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center justify-center justify-items-center bg-transparent space-y-6 sm:space-y-10 z-10">
        <h1 className="text-[1.5rem] sm:text-[2.5rem] md:text-[4rem] lg:text-[6rem] text-tirtiary-color text-center leading-tight">
          SMITH AVENUE INSIGHTS
        </h1>
      </div>
      <AnimatedCanvas />
    </div>
  );
};
