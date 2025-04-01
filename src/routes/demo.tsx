import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./__root";

export const demoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/demo",
  component: function Demo() {
    return (
      <div className="p-8 pt-24 min-h-screen">
        <div className="flex flex-row">
          <div className="flex flex-col space-y-4">
            <h1 className="text-3xl font-bold">Request Demo</h1>
            <p className="text-lg">Demo Request Page</p>
          </div>
        </div>
      </div>
    );
  },
});
