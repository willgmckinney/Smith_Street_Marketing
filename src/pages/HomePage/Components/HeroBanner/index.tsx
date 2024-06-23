import { Left } from "./Left";
import { Right } from "./Right";

export const HeroBanner = () => {
  return (
    <div className="flex flex-row items-center justify-between h-screen bg-[#00262D] text-white">
      <Left />
      <Right />
    </div>
  );
};
