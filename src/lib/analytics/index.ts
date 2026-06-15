import type { FlatMessage } from "../parse/types";
import { computeDepthDistribution } from "./depth";
import { computeExposure } from "./exposure";
import { computeOverview } from "./overview";
import { computePersona } from "./persona";
import { computeTimeOfDay } from "./timeofday";
import { computeTopTerms } from "./terms";
import { computeTopics } from "./topics";
import { computeUsageOverTime, computeUsageTrend } from "./timeseries";

export type SnapshotAnalytics = {
  overview: ReturnType<typeof computeOverview>;
  usageOverTime: ReturnType<typeof computeUsageOverTime>;
  usageTrend: ReturnType<typeof computeUsageTrend>;
  timeOfDay: ReturnType<typeof computeTimeOfDay>;
  topics: ReturnType<typeof computeTopics>;
  exposure: ReturnType<typeof computeExposure>;
  topTerms: ReturnType<typeof computeTopTerms>;
  persona: string;
  depthDistribution: ReturnType<typeof computeDepthDistribution>;
  generatedAt: string;
};

export function runAnalytics(messages: FlatMessage[]): SnapshotAnalytics {
  const overview = computeOverview(messages);
  const usageOverTime = computeUsageOverTime(messages, "week");
  const timeOfDay = computeTimeOfDay(messages);
  const topics = computeTopics(messages);
  const exposure = computeExposure(messages);

  return {
    overview,
    usageOverTime,
    usageTrend: computeUsageTrend(usageOverTime),
    timeOfDay,
    topics,
    exposure,
    topTerms: computeTopTerms(messages),
    persona: computePersona({ overview, topics, timeOfDay, exposure }),
    depthDistribution: computeDepthDistribution(messages),
    generatedAt: new Date().toISOString().slice(0, 10),
  };
}

export type { FlatMessage } from "../parse/types";
