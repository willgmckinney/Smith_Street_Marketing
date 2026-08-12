import { createRoute } from "@tanstack/react-router";
import { AutomatedReportingCaseStudy } from "../../pages/CaseStudyPage/AutomatedReportingCaseStudy";
import { rootRoute } from "../__root";

export const automatedReportingCaseStudyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/case-studies/automated-reporting",
  component: function AutomatedReportingCaseStudyPage() {
    return <AutomatedReportingCaseStudy />;
  },
});
