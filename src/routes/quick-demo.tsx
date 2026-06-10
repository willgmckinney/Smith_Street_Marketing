import { createRoute } from "@tanstack/react-router";
import { RequireAuth } from "../lib/auth";
import { QuickDemo } from "../pages/QuickDemo";
import { rootRoute } from "./__root";

export const quickDemoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/quick-demo",
  component: function QuickDemoComponent() {
    return (
      <RequireAuth>
        <QuickDemo />
      </RequireAuth>
    );
  },
});
