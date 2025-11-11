import { createRoute } from "@tanstack/react-router";
import { AscentPharmaceuticalsLanding } from "../pages/AscentPharmaceuticalsLanding";
import { rootRoute } from "./__root";

export const ascentPharmaceuticalsLandingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/ascent-pharmaceuticals-landing",
  component: function AscentPharmaceuticalsLandingComponent() {
    return <AscentPharmaceuticalsLanding />;
  },
});


