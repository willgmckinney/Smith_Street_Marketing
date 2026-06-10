import { HeroBanner } from "./Components/HeroBanner";
import { ClientsPartners } from "./Components/ClientsPartners";
import { Services } from "./Components/Services";
import { Team } from "./Components/Team";

export const HomePage = () => {
  return (
    <div className="bg-blueprint-base">
      <div className="relative z-[1] h-[100vh] min-h-screen">
        <HeroBanner />
      </div>
      <ClientsPartners />
      <Services />
      <Team />
    </div>
  );
};
