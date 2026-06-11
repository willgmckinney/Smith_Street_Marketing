import { Seo } from "../../components/Seo";
import { HeroBanner } from "./Components/HeroBanner";
import { ClientsPartners } from "./Components/ClientsPartners";
import { Services } from "./Components/Services";
import { Team } from "./Components/Team";

export const HomePage = () => {
  return (
    <div className="bg-blueprint-base">
      <Seo
        title="Software, data, and cloud consultancy"
        description="Smith Avenue Insights is a Chicago-based software and data consultancy. We scope honestly, build for production, and hand off so your team can run it."
        path="/"
      />
      <div className="relative z-[1] h-[100vh] min-h-screen">
        <HeroBanner />
      </div>
      <ClientsPartners />
      <Services />
      <Team />
    </div>
  );
};
