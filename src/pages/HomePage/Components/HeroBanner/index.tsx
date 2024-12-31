import { Left } from "./Left";
import { Right } from "./Right";

export const HeroBanner = () => {
  return (
    <div className="flex flex-row items-center justify-between bg-neutral-color-2 text-neutral-color-1 h-[90%]">
      <Left />
      <Right />
    </div>
  );
};
