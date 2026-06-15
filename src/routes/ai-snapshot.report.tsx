import { createRoute } from "@tanstack/react-router";
import { ReportPage } from "../pages/AiSnapshot/ReportPage";
import { rootRoute } from "./__root";

export const aiSnapshotReportRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/ai-snapshot/report",
  component: ReportPage,
});
