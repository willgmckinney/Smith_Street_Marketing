import { createRoute } from "@tanstack/react-router";
import { HomePage } from "../pages/HomePage";
import { rootRoute } from "./__root";

export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: function Index() {
    return <HomePage />;
  },
});
