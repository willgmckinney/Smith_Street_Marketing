import { createRoute } from "@tanstack/react-router";
import { RealEstateDashboard } from "../pages/RealEstateDashboard";
import { rootRoute } from "./__root";

export const realEstateDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/real-estate-dashboard",
  component: function RealEstateDashboardComponent() {
    return <RealEstateDashboard />;
  },
}); 