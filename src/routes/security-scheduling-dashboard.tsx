import { createRoute } from "@tanstack/react-router";
import { SecuritySchedulingDashboard } from "../pages/SecuritySchedulingDashboard";
import { rootRoute } from "./__root";

export const securitySchedulingDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/security-scheduling-dashboard",
  component: function SecuritySchedulingDashboardComponent() {
    return <SecuritySchedulingDashboard />;
  },
});
