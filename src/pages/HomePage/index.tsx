import { CoreBeliefs } from "./Components/CoreBeliefs";
import { Header } from "./Components/Header";
import { HeroBanner } from "./Components/HeroBanner";
import { Services } from "./Components/Services";

export const HomePage = () => {
  return (
    <div className="h-screen bg-[#00262D]">
      <Header />
      <HeroBanner />
      <CoreBeliefs />
      <Services />
    </div>
  );
};
