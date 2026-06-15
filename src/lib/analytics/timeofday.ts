import type { FlatMessage } from "../parse/types";

export type HeatmapCell = {
  day: number;
  hour: number;
  count: number;
};

export type TimeOfDayStats = {
  cells: HeatmapCell[];
  afterHoursPercent: number;
  weekendPercent: number;
  peakHour: number;
  peakDay: number;
};

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function dayLabel(day: number): string {
  return DAY_LABELS[day] ?? "Day";
}

export function computeTimeOfDay(messages: FlatMessage[]): TimeOfDayStats {
  const grid = Array.from({ length: 7 }, () => Array.from({ length: 24 }, () => 0));
  const userMessages = messages.filter(
    (m) => m.role === "user" && typeof m.timestamp === "number",
  );

  let afterHours = 0;
  let weekend = 0;

  for (const message of userMessages) {
    const date = new Date((message.timestamp as number) * 1000);
    const day = date.getDay();
    const hour = date.getHours();
    grid[day][hour] += 1;

    if (day === 0 || day === 6) weekend += 1;
    if (hour < 7 || hour >= 19) afterHours += 1;
  }

  const cells: HeatmapCell[] = [];
  let peakDay = 0;
  let peakHour = 0;
  let peakCount = 0;

  for (let day = 0; day < 7; day += 1) {
    for (let hour = 0; hour < 24; hour += 1) {
      const count = grid[day][hour];
      cells.push({ day, hour, count });
      if (count > peakCount) {
        peakCount = count;
        peakDay = day;
        peakHour = hour;
      }
    }
  }

  const total = userMessages.length || 1;

  return {
    cells,
    afterHoursPercent: Math.round((afterHours / total) * 100),
    weekendPercent: Math.round((weekend / total) * 100),
    peakHour,
    peakDay,
  };
}

export function heatmapFill(count: number, max: number): string {
  if (max === 0 || count === 0) return "#F1F0EC";
  const ratio = count / max;
  if (ratio < 0.25) return "#D6E8DF";
  if (ratio < 0.5) return "#8FCBB2";
  if (ratio < 0.75) return "#129A6A";
  return "#0E7A55";
}
