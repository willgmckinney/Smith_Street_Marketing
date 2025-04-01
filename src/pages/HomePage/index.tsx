import ContactForm from "./Components/ContactForm";
import { HeroBanner } from "./Components/HeroBanner";
import { ScreenWideCTA } from "./Components/ScreenWideCTA";
import { Services } from "./Components/Services";
import { Team } from "./Components/Team";

export const HomePage = () => {
  return (
    <div className="h-screen bg-neutral-color-2">
      <div className="relative z-[1] h-[100%]">
        <HeroBanner />
      </div>
      <div className="sticky bottom-0 left-0">
        <ScreenWideCTA />
      </div>
      <Services />
      <Team />
      <ContactForm />
    </div>
  );
};
