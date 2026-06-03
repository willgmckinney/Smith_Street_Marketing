import { createRoute } from "@tanstack/react-router";
import { ArcoaPortal } from "../pages/ArcoaPortal";
import { rootRoute } from "./__root";

export const arcoaPortalRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/arcoa-portal",
  component: function ArcoaPortalComponent() {
    return <ArcoaPortal />;
  },
});
