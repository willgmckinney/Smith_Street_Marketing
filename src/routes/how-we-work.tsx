import { createRoute } from "@tanstack/react-router";
import { HowWeWorkPage } from "../pages/HowWeWorkPage";
import { rootRoute } from "./__root";

export const howWeWorkRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/how-we-work",
  component: function HowWeWork() {
    return <HowWeWorkPage />;
  },
});
