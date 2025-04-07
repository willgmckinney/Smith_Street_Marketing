import { createRoute } from "@tanstack/react-router";
import { PrivacyPage } from "../pages/PrivacyPage";
import { rootRoute } from "./__root";

export const privacyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/privacy",
  component: function Privacy() {
    return <PrivacyPage />;
  },
});
