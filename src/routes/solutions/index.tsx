import { createRoute } from "@tanstack/react-router";
import { SolutionsPage } from "../../pages/SolutionsPage";
import { rootRoute } from "../__root";

export const solutionsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/solutions",
  component: function Solutions() {
    return <SolutionsPage />;
  },
});
