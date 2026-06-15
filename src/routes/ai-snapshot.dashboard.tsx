import { createRoute } from "@tanstack/react-router";
import { DashboardPage } from "../pages/AiSnapshot/DashboardPage";
import { rootRoute } from "./__root";

export const aiSnapshotDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/ai-snapshot/dashboard",
  component: DashboardPage,
});
