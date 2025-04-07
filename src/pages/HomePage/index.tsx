import { HeroBanner } from "./Components/HeroBanner";
import { ScreenWideCTA } from "./Components/ScreenWideCTA";
import { Services } from "./Components/Services";
import { Team } from "./Components/Team";

export const HomePage = () => {
  return (
    <div className="bg-neutral-color-2">
      <div className="relative z-[1] h-[100vh] min-h-screen">
        <HeroBanner />
      </div>
      <ScreenWideCTA />
      <Services />
      <Team />
    </div>
  );
};
