import { createRoute } from "@tanstack/react-router";
import { CompanyPage } from "../pages/CompanyPage";
import { rootRoute } from "./__root";

export const companyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/company",
  component: function Company() {
    return <CompanyPage />;
  },
});
