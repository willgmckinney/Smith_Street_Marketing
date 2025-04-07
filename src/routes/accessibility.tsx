import { createRoute } from "@tanstack/react-router";
import { AccessibilityPage } from "../pages/AccessibilityPage";
import { rootRoute } from "./__root";

export const accessibilityRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/accessibility",
  component: function Accessibility() {
    return <AccessibilityPage />;
  },
});
