import { createRoute } from "@tanstack/react-router";
import { AmazonConnectAnalytics } from "../../pages/SolutionsPage/AmazonConnectAnalytics";
import { rootRoute } from "../__root";

export const amazonConnectAnalyticsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/solutions/amazon-connect-analytics",
  component: function AmazonConnectAnalyticsPage() {
    return <AmazonConnectAnalytics />;
  },
});
