import type { TopicBreakdown } from "./topics";
import type { OverviewStats } from "./overview";
import type { TimeOfDayStats } from "./timeofday";
import type { ExposureResult } from "./exposure";

function usageTier(avgPerDay: number): string {
  if (avgPerDay >= 8) return "Heavy daily AI user";
  if (avgPerDay >= 3) return "Daily AI user";
  if (avgPerDay >= 1) return "Regular AI user";
  return "Light AI user";
}

function complianceShare(topics: TopicBreakdown): number {
  const compliance = topics.slices
    .filter((slice) => slice.compliance)
    .reduce((sum, slice) => sum + slice.percent, 0);
  return Math.round(compliance);
}

export function computePersona(input: {
  overview: OverviewStats;
  topics: TopicBreakdown;
  timeOfDay: TimeOfDayStats;
  exposure: ExposureResult;
}): string {
  const { overview, topics, timeOfDay, exposure } = input;
  const avgPerDay =
    overview.daysActive > 0
      ? Math.round((overview.userMessages / overview.daysActive) * 10) / 10
      : 0;

  const primaryTopics = topics.ranked
    .filter((slice) => !slice.compliance)
    .slice(0, 2)
    .map((slice) => slice.category.toLowerCase());

  const topicPhrase =
    primaryTopics.length >= 2
      ? `${primaryTopics[0]} and ${primaryTopics[1]}`
      : primaryTopics[0] ?? "general work";

  const offHoursShare = Math.min(
    95,
    Math.round(timeOfDay.afterHoursPercent + timeOfDay.weekendPercent * 0.65),
  );

  const compliancePct = complianceShare(topics);
  const compliancePhrase =
    compliancePct >= 20
      ? `${compliancePct} percent of prompts touch legal, HR, and finance`
      : "a smaller share touches legal, HR, and finance";

  const secretPhrase =
    exposure.flaggedPromptCount > 0
      ? `${exposure.flaggedPromptCount.toLocaleString()} contained what look like live secrets.`
      : "No live secrets showed up in this export.";

  return `${usageTier(avgPerDay)}. ${overview.totalConversations.toLocaleString()} threads across ${overview.daysActive.toLocaleString()} days, ${offHoursShare} percent of it after hours and on weekends. Heaviest in ${topicPhrase}, but ${compliancePhrase}. ${secretPhrase}`;
}
