import { createRoute } from "@tanstack/react-router";
import { SalesPipelineIntelligence } from "../../pages/SolutionsPage/SalesPipelineIntelligence";
import { rootRoute } from "../__root";

export const salesPipelineIntelligenceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/solutions/sales-pipeline-intelligence",
  component: function SalesPipelineIntelligencePage() {
    return <SalesPipelineIntelligence />;
  },
});
