import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import type { TopicBreakdown } from "../../../../lib/analytics/topics";
import { formatCount } from "../../../../lib/format";
import { SpecLabel } from "../../../../components/Blueprint/SpecLabel";
import { SnapshotCard } from "../SnapshotCard";
import { ChartTooltip } from "./ChartTooltip";

export function TopicChart({ topics, compact = false }: { topics: TopicBreakdown; compact?: boolean }) {
  const chartData = topics.ranked.map((slice) => ({
    name: slice.category,
    value: slice.count,
    color: slice.color,
    compliance: slice.compliance,
  }));
  const listed = compact ? topics.ranked.slice(0, 5) : topics.ranked;

  return (
    <SnapshotCard className={compact ? "!p-3" : ""}>
      <SpecLabel className={compact ? "!text-[10px]" : ""}>topic breakdown</SpecLabel>
      <div className={`mt-3 ${compact ? "space-y-2" : "mt-6 grid gap-6 lg:grid-cols-2"}`}>
        {!compact && (
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
              >
                {chartData.map((entry) => (
                  <Cell
                    key={entry.name}
                    fill={entry.color}
                    stroke={entry.compliance ? "#C2402E" : undefined}
                    strokeWidth={entry.compliance ? 1 : 0}
                  />
                ))}
              </Pie>
              <Tooltip content={<ChartTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        )}
        <div className={compact ? "space-y-1" : "space-y-3"}>
          {listed.map((slice) => (
            <div
              key={slice.category}
              className={`flex items-center justify-between border-b border-chalk/10 pb-2 ${slice.compliance ? "border-l-2 border-l-redline pl-3" : ""}`}
            >
              <div className="flex items-center gap-3">
                <span
                  className="inline-block h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: slice.color }}
                />
                <span className="text-sm text-chalk">{slice.category}</span>
              </div>
              <span className="font-mono text-xs text-muted">
                {formatCount(slice.count)} · {slice.percent}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </SnapshotCard>
  );
}
