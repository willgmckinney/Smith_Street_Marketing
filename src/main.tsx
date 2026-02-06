import { RouterProvider, createRouter } from "@tanstack/react-router";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { indexRoute } from "./routes";
import { rootRoute } from "./routes/__root";
import { accessibilityRoute } from "./routes/accessibility";
import { agenticBIRoute } from "./routes/agentic-bi";
import { ascentPharmaceuticalsLandingRoute } from "./routes/ascent-pharmaceuticals-landing";
import { blogRoute } from "./routes/blog";
import { blogPostRoute } from "./routes/blog/$postId";
import { companyRoute } from "./routes/company";
import { constructionDashboardRoute } from "./routes/construction-dashboard";
import { demoRoute } from "./routes/demo";
import { portfolioRoute } from "./routes/portfolio";
import { pricingRoute } from "./routes/pricing";
import { privacyRoute } from "./routes/privacy";
import { realEstateDashboardRoute } from "./routes/real-estate-dashboard";
import { securitySchedulingDashboardRoute } from "./routes/security-scheduling-dashboard";
import { shopifyProfitRecoveryRoute } from "./routes/shopify-profit-recovery";
import { supportRoute } from "./routes/support";
import { taxCompanyDashboardRoute } from "./routes/tax-company-dashboard";

const routeTree = rootRoute.addChildren([
  indexRoute,
  pricingRoute,
  demoRoute,
  companyRoute,
  portfolioRoute,
  constructionDashboardRoute,
  realEstateDashboardRoute,
  securitySchedulingDashboardRoute,
  shopifyProfitRecoveryRoute,
  agenticBIRoute,
  supportRoute,
  accessibilityRoute,
  privacyRoute,
  taxCompanyDashboardRoute,
  ascentPharmaceuticalsLandingRoute,
  blogRoute,
  blogPostRoute,
]);

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  );
}
