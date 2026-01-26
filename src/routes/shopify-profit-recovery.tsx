import { createRoute } from "@tanstack/react-router";
import { ShopifyProfitRecovery } from "../pages/ShopifyProfitRecovery";
import { rootRoute } from "./__root";

export const shopifyProfitRecoveryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/shopify-profit-recovery",
  component: function ShopifyProfitRecoveryComponent() {
    return <ShopifyProfitRecovery />;
  },
});
