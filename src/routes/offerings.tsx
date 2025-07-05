import { createRoute } from "@tanstack/react-router";
import { OfferingsPage } from "../pages/OfferingsPage";
import { rootRoute } from "./__root";
export const offeringsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/offerings",
  component: function Demo() {
    return <OfferingsPage />;
  },
});
