import { createRoute } from "@tanstack/react-router";
import { ActiveCampaignCaseStudy } from "../../pages/CaseStudyPage/ActiveCampaignCaseStudy";
import { rootRoute } from "../__root";

export const activeCampaignCaseStudyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/case-studies/activecampaign",
  component: function ActiveCampaignCaseStudyPage() {
    return <ActiveCampaignCaseStudy />;
  },
});
