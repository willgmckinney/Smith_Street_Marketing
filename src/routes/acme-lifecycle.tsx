import { createRoute } from "@tanstack/react-router";
import { AcmeLifecycle } from "../pages/AcmeLifecycle";
import { rootRoute } from "./__root";

export const acmeLifecycleRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/acme-lifecycle",
  component: AcmeLifecycle,
});
