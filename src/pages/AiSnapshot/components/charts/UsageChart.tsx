import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { UsagePoint } from "../../../../lib/analytics/timeseries";
import { DimensionLine } from "../../../../components/Blueprint/DimensionLine";
import { SpecLabel } from "../../../../components/Blueprint/SpecLabel";
import { SnapshotCard } from "../SnapshotCard";
import { ChartTooltip } from "./ChartTooltip";

export function UsageChart({
  data,
  trend,
  compact = false,
}: {
  data: UsagePoint[];
  trend: "up" | "down" | "flat";
  compact?: boolean;
}) {
  const start = data[0]?.label;
  const end = data.length ? data[data.length - 1]?.label : undefined;
  const trendLabel =
    trend === "up" ? "trending up" : trend === "down" ? "trending down" : "steady";

  return (
    <SnapshotCard className={compact ? "!p-3" : ""}>
      <SpecLabel className={compact ? "!text-[10px]" : ""}>usage over time</SpecLabel>
      <div className={compact ? "mt-3 h-28" : "mt-6 h-72"}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="usageFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#129A6A" stopOpacity={0.18} />
                <stop offset="100%" stopColor="#129A6A" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#CBD5E1" strokeDasharray="2 4" vertical={false} />
            <XAxis
              dataKey="label"
              tick={{ fill: "#6E7680", fontSize: compact ? 8 : 11, fontFamily: "Spline Sans Mono" }}
              axisLine={false}
              tickLine={false}
              interval={compact ? "preserveStartEnd" : undefined}
            />
            <YAxis
              tick={{ fill: "#6E7680", fontSize: compact ? 8 : 11, fontFamily: "Spline Sans Mono" }}
              axisLine={false}
              tickLine={false}
              width={compact ? 28 : undefined}
            />
            <Tooltip content={<ChartTooltip />} />
            <Area
              type="monotone"
              dataKey="count"
              stroke="#129A6A"
              fill="url(#usageFill)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      {start && end && !compact && <DimensionLine className="mt-4" label={`${start} to ${end}`} />}
      {!compact && (
      <p className="mt-3 font-mono text-xs uppercase tracking-[0.12em] text-muted">{trendLabel}</p>
      )}
    </SnapshotCard>
  );
}
