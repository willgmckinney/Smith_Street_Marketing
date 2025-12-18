import { createRoute } from "@tanstack/react-router";
import BlogPage from "../../pages/Blog";
import { rootRoute } from "../__root";

export const blogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "blog",
  component: BlogPage,
});
