import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./__root";

export const pricingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/pricing",
  component: function Pricing() {
    return (
      <div className="p-8 pt-24 min-h-screen">
        <div className="flex flex-row">
          <div className="flex flex-col space-y-4">
            <h1 className="text-3xl font-bold">Pricing</h1>
            <p className="text-lg">Pricing Page</p>
          </div>
        </div>
      </div>
    );
  },
});
