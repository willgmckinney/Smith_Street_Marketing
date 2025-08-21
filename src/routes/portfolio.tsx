import { createRoute } from "@tanstack/react-router";
import { PortfolioPage } from "../pages/PortfolioPage";
import { rootRoute } from "./__root";

export const portfolioRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/portfolio",
  component: function Portfolio() {
    return <PortfolioPage />;
  },
}); 