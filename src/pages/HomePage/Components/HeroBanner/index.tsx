import { Left } from "./Left";
import { Right } from "./Right";

export const HeroBanner = () => {
  return (
    <div className="flex flex-row items-center justify-between bg-[#00262D] text-white h-[90%]">
      <Left />
      <Right />
    </div>
  );
};
