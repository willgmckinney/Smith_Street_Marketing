export const ScreenWideCTA = () => {
  return (
    <div className="flex flex-col bg-neutral-color-1 text-neutral-color-1 min-h-[85vh] px-4 sm:px-5 pt-6 sm:pt-10">
      <span className="text-[2rem] sm:text-[3rem] md:text-[4rem] lg:text-[5rem] text-accent-color-1 font-bold leading-tight">
        We Connect The Dots...
      </span>
      <span className="text-[1.25rem] sm:text-[2rem] md:text-[3rem] lg:text-[4rem] text-neutral-color-2 leading-tight mt-4">
        Transforming Raw Data Into Actionable Insights and Custom Software Into
        Seamless Solutions, Helping Businesses Thrive With Clarity and
        Efficiency.
      </span>
      <div className="p-4 sm:p-5">
        <button className="text-neutral-color-1 bg-accent-color-1 border-2 border-neutral-color-1 hover:text-neutral-color-1 hover:bg-neutral-color-2 hover:border-neutral-color-1 py-3 px-6 rounded-lg w-full sm:w-auto sm:min-w-[200px] md:min-w-[300px] lg:min-w-[400px] text-xl sm:text-2xl md:text-3xl lg:text-4xl transition-colors duration-200">
          Request Demo
        </button>
      </div>
    </div>
  );
};
