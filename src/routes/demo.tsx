import { createRoute } from "@tanstack/react-router";
import { DemoPage } from "../pages/DemoPage";
import { rootRoute } from "./__root";
export const demoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/demo",
  component: function Demo() {
    return <DemoPage />;
  },
});
