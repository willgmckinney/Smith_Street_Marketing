import { createRoute } from "@tanstack/react-router";
import { CustomAiAgentConnectors } from "../../pages/SolutionsPage/CustomAiAgentConnectors";
import { rootRoute } from "../__root";

export const customAiAgentConnectorsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/solutions/custom-ai-agent-connectors",
  component: function CustomAiAgentConnectorsPage() {
    return <CustomAiAgentConnectors />;
  },
});
