import { createRoute } from "@tanstack/react-router";
import { CustomApplicationDevelopment } from "../../pages/SolutionsPage/CustomApplicationDevelopment";
import { rootRoute } from "../__root";

export const customApplicationDevelopmentRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/solutions/custom-application-development",
  component: function CustomApplicationDevelopmentPage() {
    return <CustomApplicationDevelopment />;
  },
});
