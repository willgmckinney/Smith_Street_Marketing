import { createRoute } from "@tanstack/react-router";
import { UploadPage } from "../pages/AiSnapshot/UploadPage";
import { rootRoute } from "./__root";

export const aiSnapshotUploadRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/ai-snapshot/upload",
  component: UploadPage,
});
