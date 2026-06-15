import { createRoute } from "@tanstack/react-router";
import { EntryPage } from "../pages/AiSnapshot/EntryPage";
import { rootRoute } from "./__root";

export const aiSnapshotRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/ai-snapshot",
  component: EntryPage,
});
