import { createRoute } from "@tanstack/react-router";
import { AmazonQuickImplementation } from "../../pages/SolutionsPage/AmazonQuickImplementation";
import { rootRoute } from "../__root";

export const amazonQuickImplementationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/solutions/amazon-quick-implementation",
  component: function AmazonQuickImplementationPage() {
    return <AmazonQuickImplementation />;
  },
});
