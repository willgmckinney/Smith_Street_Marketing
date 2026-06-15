import {
  dayLabel,
  heatmapFill,
  type HeatmapCell,
  type TimeOfDayStats,
} from "../../../../lib/analytics/timeofday";
import { SpecLabel } from "../../../../components/Blueprint/SpecLabel";
import { SnapshotCard } from "../SnapshotCard";

const HOURS = Array.from({ length: 24 }, (_, hour) => hour);

export function HeatmapChart({ stats }: { stats: TimeOfDayStats }) {
  const max = Math.max(...stats.cells.map((cell) => cell.count), 1);
  const grid = Array.from({ length: 7 }, () => Array.from({ length: 24 }, () => 0));
  for (const cell of stats.cells) {
    grid[cell.day][cell.hour] = cell.count;
  }

  return (
    <SnapshotCard>
      <SpecLabel>time of day</SpecLabel>
      <div className="mt-6 overflow-x-auto">
        <div className="min-w-[720px]">
          <div className="grid grid-cols-[48px_repeat(24,minmax(0,1fr))] gap-1">
            <div />
            {HOURS.map((hour) => (
              <div
                key={hour}
                className={`text-center font-mono text-[10px] uppercase text-muted ${hour < 7 || hour >= 19 ? "text-redline" : ""}`}
              >
                {hour}
              </div>
            ))}
            {grid.map((row, day) => (
              <div key={`row-${day}`} className="contents">
                <div
                  className={`flex items-center font-mono text-xs uppercase text-muted ${day === 0 || day === 6 ? "text-redline" : ""}`}
                >
                  {dayLabel(day)}
                </div>
                {row.map((count, hour) => (
                  <div
                    key={`${day}-${hour}`}
                    title={`${dayLabel(day)} ${hour}:00 · ${count}`}
                    className={`aspect-square rounded-sm ${hour < 7 || hour >= 19 ? "ring-1 ring-redline/30" : ""} ${day === 0 || day === 6 ? "ring-1 ring-redline/20" : ""}`}
                    style={{ backgroundColor: heatmapFill(count, max) }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-4 font-mono text-xs uppercase tracking-[0.12em] text-muted">
        <span className="text-redline">{stats.afterHoursPercent}% after hours</span>
        <span className="text-redline">{stats.weekendPercent}% weekends</span>
      </div>
    </SnapshotCard>
  );
}

export type { HeatmapCell };
