import { createRoute } from "@tanstack/react-router";
import { ConstructionDashboard } from "../pages/ConstructionDashboard";
import { rootRoute } from "./__root";

export const constructionDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/construction-dashboard",
  component: function ConstructionDashboardComponent() {
    return <ConstructionDashboard />;
  },
});