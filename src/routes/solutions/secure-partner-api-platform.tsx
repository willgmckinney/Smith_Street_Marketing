import { createRoute } from "@tanstack/react-router";
import { SecurePartnerApiPlatform } from "../../pages/SolutionsPage/SecurePartnerApiPlatform";
import { rootRoute } from "../__root";

export const securePartnerApiPlatformRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/solutions/secure-partner-api-platform",
  component: function SecurePartnerApiPlatformPage() {
    return <SecurePartnerApiPlatform />;
  },
});
