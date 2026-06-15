import type { FlatMessage } from "../lib/parse/types";

export const DUMMY_CONVERSATION_COUNT = 2847;
const SPAN_DAYS = 340;

type TopicBucket = "coding" | "data" | "legal" | "finance" | "hr" | "marketing" | "strategy" | "writing" | "personal";

function createRng(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

const rand = createRng(20260315);

function pick<T>(items: T[]): T {
  return items[Math.floor(rand() * items.length)];
}

function at(daysAgo: number, hour: number, minute = 0): number {
  const date = new Date();
  date.setHours(hour, minute, 0, 0);
  date.setDate(date.getDate() - daysAgo);
  return Math.floor(date.getTime() / 1000);
}

function randomHourWeighted(): number {
  const roll = rand();
  if (roll < 0.18) return pick([0, 1, 2, 3, 4, 5, 6]);
  if (roll < 0.3) return pick([19, 20, 21, 22, 23]);
  return pick([8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]);
}

const USER_PROMPTS: Record<TopicBucket, string[]> = {
  coding: [
    "Refactor this python ETL job to use pandas and cut runtime on large csv loads.",
    "Debug this typescript react component that re-renders on every chart hover.",
    "Write sql to compare api latency percentiles week over week.",
    "Convert this legacy bash deploy script into a github actions workflow.",
    "Suggest a clean architecture for a node service with postgres and redis.",
  ],
  data: [
    "Design a dashboard metric set for weekly active users and retention cohorts.",
    "Help me model warehouse facts and dimensions for subscription revenue.",
    "Explain how to validate a dbt model when source tables arrive late.",
    "Draft a query plan for anomaly detection on daily order volume.",
    "Summarize options for streaming analytics with kafka and a lakehouse.",
  ],
  legal: [
    "Review indemnity and limitation of liability clauses in this vendor contract.",
    "Draft redlines for a customer nda covering subcontractors and gdpr.",
    "Summarize termination rights in this SaaS agreement.",
    "Compare data processing addendum language across two vendor drafts.",
    "Flag risky language in an enterprise MSA for a healthcare buyer.",
  ],
  finance: [
    "Build a finance forecast template for Q4 revenue, cogs, and operating expense.",
    "Model margin impact if fulfillment costs rise 8 percent next quarter.",
    "Draft board slides on budget variance for cloud spend and headcount.",
    "Explain how to reconcile stripe payouts against net revenue in excel.",
    "Create scenario tables for pricing changes across enterprise tiers.",
  ],
  hr: [
    "Draft an offer letter for a senior data engineer with hybrid work language.",
    "Write a performance review template for analytics managers.",
    "Outline an onboarding checklist for new hires in engineering and data.",
    "Suggest interview rubric questions for a lead platform engineer.",
    "Summarize policy language for internal ai usage and data handling.",
  ],
  marketing: [
    "Write three launch headlines for a B2B analytics product.",
    "Draft nurture email copy for buyers evaluating embedded dashboards.",
    "Suggest seo page structure for a data governance landing page.",
    "Create ad variants focused on cost, speed, and trust.",
    "Outline a case study structure for a manufacturing analytics win.",
  ],
  strategy: [
    "Outline a strategy memo on expanding our data platform roadmap.",
    "Compare build vs buy for an internal metrics layer.",
    "Draft okrs for a platform team supporting analytics and ml.",
    "Summarize competitive positioning against incumbent bi vendors.",
    "Propose a phased plan to consolidate fragmented reporting tools.",
  ],
  writing: [
    "Tighten this executive summary for a board update on platform reliability.",
    "Rewrite this customer email to be direct and less jargon heavy.",
    "Draft a blog outline on moving from dashboards to operational analytics.",
    "Turn these bullet notes into a crisp one page project brief.",
    "Proofread this product announcement for tone and clarity.",
  ],
  personal: [
    "Plan a weekend workout schedule with strength and mobility blocks.",
    "Suggest a one week meal prep menu with high protein lunches.",
    "Help me outline a personal reading list on systems design.",
    "Draft a short travel itinerary for a three day city break.",
    "Recommend a simple stack for a hobby note taking app.",
  ],
};

const ASSISTANT_REPLIES = [
  "Here is a structured starting point you can adapt for your team.",
  "I broke this into steps so you can execute it in order.",
  "Below is a concise draft with the main tradeoffs called out.",
  "Start with the highest leverage change, then iterate from there.",
  "This version keeps scope tight enough to ship this week.",
];

const SECRET_USER_MESSAGES = [
  "Normalize this contact list before import: alice.wong@acmecorp.com, bob.smith@vendor.io, billing@clientco.net",
  "Rotate our staging key sk-proj-8f3a2b1c9d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0 and tell me the safe sequence.",
  "The legacy runbook still says password is TempOps2024! for the reporting box. Rewrite the incident steps.",
  "Can you validate these customer contacts: jlee@northwind.io, ops@partnerlabs.com, sara.kim@contoso.com?",
  "Our aws access key is AKIAIOSFODNN7EXAMPLE in the old terraform state. How do we rotate without downtime?",
  "Please redact and rewrite this note: api token ghp_1234567890abcdefghijklmnopqrstuv and send to security.",
  "Finance asked me to sanity check card 4111 1111 1111 1111 against the expense export format.",
  "HR file includes ssn 123-45-6789 on the signed form scan. Summarize what we must store vs redact.",
  "Connect to postgres://analytics:SuperSecret123@db.internal.local:5432/warehouse and run a row count sanity check.",
  "Call prep list: michael.reyes@vendor.com, +1 (312) 555-0198, and cc procurement@buyer.com on the follow up.",
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.testpayload still works in staging. Is that a leak?",
  "Legal wants a clean version of this vendor thread with client counsel at dana.roth@enterprise.com included.",
];

function topicForIndex(): TopicBucket {
  const roll = rand();
  if (roll < 0.22) return "coding";
  if (roll < 0.38) return "data";
  if (roll < 0.48) return "legal";
  if (roll < 0.57) return "finance";
  if (roll < 0.66) return "hr";
  if (roll < 0.74) return "marketing";
  if (roll < 0.82) return "strategy";
  if (roll < 0.92) return "writing";
  return "personal";
}

function userPromptForConversation(seed: number, turn: number, topic: TopicBucket): string {
  // User messages land on even turns (0, 2, 4, ...).
  if (seed % 61 === 0 && turn === 0) {
    return SECRET_USER_MESSAGES[Math.floor(seed / 61) % SECRET_USER_MESSAGES.length];
  }

  const base = pick(USER_PROMPTS[topic]);
  if (turn === 0) return base;
  if (turn === 2) return `${base} Keep the answer concise and production ready.`;
  if (turn === 4) return `Follow up on the previous answer. What would you change for a larger team?`;
  return pick(USER_PROMPTS[topic]);
}

export function getDummySnapshotMessages(): FlatMessage[] {
  const messages: FlatMessage[] = [];

  for (let index = 0; index < DUMMY_CONVERSATION_COUNT; index += 1) {
    const conversationId = `dummy-${index + 1}`;
    const topic = topicForIndex();
    const title = `${pick(USER_PROMPTS[topic]).slice(0, 42)}...`;
    const daysAgo = Math.floor(rand() * SPAN_DAYS);
    const depth = 8 + Math.floor(rand() * 8);
    let cursor = at(daysAgo, randomHourWeighted());

    for (let turn = 0; turn < depth; turn += 1) {
      const isUser = turn % 2 === 0;
      cursor += 90 + Math.floor(rand() * 240);

      messages.push({
        role: isUser ? "user" : "assistant",
        text: isUser
          ? userPromptForConversation(index, turn, topic)
          : pick(ASSISTANT_REPLIES),
        timestamp: cursor,
        conversationId,
        conversationTitle: title,
      });
    }
  }

  return messages;
}
