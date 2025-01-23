import { CoreBeliefs } from "./Components/CoreBeliefs";
import { Header } from "./Components/Header";
import { HeroBanner } from "./Components/HeroBanner";
import { Services } from "./Components/Services";
import { Team } from "./Components/Team";

export const HomePage = () => {
  return (
    <div className="h-screen bg-neutral-color-2">
      <Header />
      <HeroBanner />
      <CoreBeliefs />
      <Services />
      <Team />
    </div>
  );
};
