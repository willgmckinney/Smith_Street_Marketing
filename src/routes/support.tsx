import { createRoute } from "@tanstack/react-router";
import { SupportPage } from "../pages/SupportPage";
import { rootRoute } from "./__root";

export const supportRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/support",
  component: function Support() {
    return <SupportPage />;
  },
});
