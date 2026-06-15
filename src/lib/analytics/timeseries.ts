import type { FlatMessage } from "../parse/types";

export type UsagePoint = {
  period: string;
  label: string;
  count: number;
  partial?: boolean;
};

function weekStart(date: Date): Date {
  const copy = new Date(date);
  const day = copy.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  copy.setDate(copy.getDate() + diff);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

function formatWeekLabel(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function currentWeekKey(): string {
  return formatWeekLabel(weekStart(new Date()));
}

export function computeUsageOverTime(messages: FlatMessage[], mode: "week" | "month" = "week"): UsagePoint[] {
  const userMessages = messages.filter(
    (m) => m.role === "user" && typeof m.timestamp === "number",
  );

  const buckets = new Map<string, number>();

  for (const message of userMessages) {
    const date = new Date((message.timestamp as number) * 1000);
    let key: string;
    if (mode === "month") {
      key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    } else {
      key = formatWeekLabel(weekStart(date));
    }
    buckets.set(key, (buckets.get(key) ?? 0) + 1);
  }

  const currentWeek = mode === "week" ? currentWeekKey() : null;

  return [...buckets.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .filter(([period]) => period !== currentWeek)
    .map(([period, count]) => ({
      period,
      label: period,
      count,
    }));
}

export function computeUsageTrend(points: UsagePoint[]): "up" | "down" | "flat" {
  const complete = points.filter((point) => !point.partial);
  if (complete.length < 2) return "flat";

  const recent = complete.slice(-4);
  const earlier = complete.slice(-8, -4);
  const recentAvg =
    recent.reduce((sum, point) => sum + point.count, 0) / Math.max(recent.length, 1);
  const earlierAvg =
    earlier.length > 0
      ? earlier.reduce((sum, point) => sum + point.count, 0) / earlier.length
      : recentAvg;

  if (recentAvg > earlierAvg * 1.1) return "up";
  if (recentAvg < earlierAvg * 0.9) return "down";
  return "flat";
}
