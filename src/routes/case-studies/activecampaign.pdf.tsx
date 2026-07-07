import { createRoute } from "@tanstack/react-router";
import { ActiveCampaignPdfPage } from "../../pages/CaseStudyPage/ActiveCampaignPdfPage";
import { rootRoute } from "../__root";

export const activeCampaignPdfRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/case-studies/activecampaign/pdf",
  component: function ActiveCampaignPdfPageRoute() {
    return <ActiveCampaignPdfPage />;
  },
});
