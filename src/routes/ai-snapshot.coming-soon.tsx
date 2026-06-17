import { createRoute } from "@tanstack/react-router";
import { ComingSoonPage } from "../pages/AiSnapshot/ComingSoonPage";
import { rootRoute } from "./__root";

export const aiSnapshotComingSoonRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/ai-snapshot/coming-soon",
  component: ComingSoonPage,
});
