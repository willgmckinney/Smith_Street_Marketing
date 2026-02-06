import { createRoute } from "@tanstack/react-router";
import { AgenticBI } from "../pages/AgenticBI";
import { rootRoute } from "./__root";

export const agenticBIRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/agentic-bi",
  component: function AgenticBIComponent() {
    return <AgenticBI />;
  },
});
