import { RouterProvider, createRouter } from "@tanstack/react-router";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { indexRoute } from "./routes";
import { rootRoute } from "./routes/__root";
import { accessibilityRoute } from "./routes/accessibility";
import { companyRoute } from "./routes/company";
import { demoRoute } from "./routes/demo";
import { pricingRoute } from "./routes/pricing";
import { privacyRoute } from "./routes/privacy";
import { supportRoute } from "./routes/support";
import { offeringsRoute } from "./routes/offerings";

const routeTree = rootRoute.addChildren([
  indexRoute,
  pricingRoute,
  demoRoute,
  companyRoute,
  supportRoute,
  accessibilityRoute,
  privacyRoute,
  offeringsRoute,
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
    </StrictMode>
  );
}
