import { createRoute } from "@tanstack/react-router";
import { TaxCompanyDashboard } from "../pages/TaxCompanyDashboard";
import { rootRoute } from "./__root";

export const taxCompanyDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tax-company-dashboard",
  component: function TaxCompanyDashboardComponent() {
    return <TaxCompanyDashboard />;
  },
});
