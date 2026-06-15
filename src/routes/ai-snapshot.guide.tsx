import { createRoute } from "@tanstack/react-router";
import { GuidePage } from "../pages/AiSnapshot/GuidePage";
import { rootRoute } from "./__root";

export const aiSnapshotGuideRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/ai-snapshot/guide",
  component: GuidePage,
});
