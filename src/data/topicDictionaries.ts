export type TopicCategory =
  | "Coding"
  | "Data & Analytics"
  | "Writing & Content"
  | "Marketing"
  | "Legal & Contracts"
  | "HR & People"
  | "Finance"
  | "Strategy"
  | "Personal"
  | "Other";

export type TopicDefinition = {
  id: TopicCategory;
  keywords: string[];
  color: string;
  compliance: boolean;
};

export const TOPIC_DEFINITIONS: TopicDefinition[] = [
  {
    id: "Coding",
    keywords: [
      "code",
      "python",
      "javascript",
      "typescript",
      "react",
      "api",
      "function",
      "bug",
      "debug",
      "sql",
      "database",
      "deploy",
      "git",
      "refactor",
      "algorithm",
    ],
    color: "#129A6A",
    compliance: false,
  },
  {
    id: "Data & Analytics",
    keywords: [
      "data",
      "analytics",
      "dashboard",
      "metric",
      "report",
      "excel",
      "csv",
      "sql",
      "query",
      "visualization",
      "chart",
      "forecast",
      "model",
    ],
    color: "#0E7A55",
    compliance: false,
  },
  {
    id: "Writing & Content",
    keywords: [
      "write",
      "draft",
      "edit",
      "blog",
      "article",
      "copy",
      "email",
      "newsletter",
      "headline",
      "proofread",
      "tone",
      "rewrite",
    ],
    color: "#7FB8A0",
    compliance: false,
  },
  {
    id: "Marketing",
    keywords: [
      "marketing",
      "campaign",
      "seo",
      "ads",
      "brand",
      "audience",
      "conversion",
      "landing page",
      "social media",
      "content strategy",
    ],
    color: "#3A4A5A",
    compliance: false,
  },
  {
    id: "Legal & Contracts",
    keywords: [
      "contract",
      "legal",
      "nda",
      "clause",
      "liability",
      "terms",
      "agreement",
      "compliance",
      "regulation",
      "gdpr",
      "privacy policy",
    ],
    color: "#C2402E",
    compliance: true,
  },
  {
    id: "HR & People",
    keywords: [
      "hire",
      "hiring",
      "employee",
      "performance review",
      "onboarding",
      "hr",
      "payroll",
      "benefits",
      "termination",
      "recruiting",
      "offer letter",
    ],
    color: "#D06B4F",
    compliance: true,
  },
  {
    id: "Finance",
    keywords: [
      "budget",
      "finance",
      "invoice",
      "revenue",
      "forecast",
      "accounting",
      "expense",
      "profit",
      "margin",
      "pricing",
      "financial",
      "tax",
    ],
    color: "#8E2E22",
    compliance: true,
  },
  {
    id: "Strategy",
    keywords: [
      "strategy",
      "roadmap",
      "plan",
      "vision",
      "prioritize",
      "okr",
      "goal",
      "initiative",
      "competitive",
      "market",
    ],
    color: "#1B2A38",
    compliance: false,
  },
  {
    id: "Personal",
    keywords: [
      "recipe",
      "vacation",
      "workout",
      "health",
      "family",
      "weekend",
      "hobby",
      "travel",
      "gift",
      "personal",
    ],
    color: "#6E7680",
    compliance: false,
  },
  {
    id: "Other",
    keywords: [],
    color: "#C9C3B4",
    compliance: false,
  },
];

export const TOPIC_COLORS = Object.fromEntries(
  TOPIC_DEFINITIONS.map((topic) => [topic.id, topic.color]),
) as Record<TopicCategory, string>;
