import { createRoute } from "@tanstack/react-router";
import { PricingPage } from "../pages/PricingPage";
import { rootRoute } from "./__root";

export const pricingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/pricing",
  component: function Pricing() {
    return <PricingPage />;
  },
});
