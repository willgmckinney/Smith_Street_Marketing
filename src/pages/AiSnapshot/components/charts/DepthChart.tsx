import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { DepthBucket } from "../../../../lib/analytics/depth";
import { SpecLabel } from "../../../../components/Blueprint/SpecLabel";
import { SnapshotCard } from "../SnapshotCard";
import { ChartTooltip } from "./ChartTooltip";

export function DepthChart({ data, compact = false }: { data: DepthBucket[]; compact?: boolean }) {
  return (
    <SnapshotCard className={compact ? "!p-3" : ""}>
      <SpecLabel className={compact ? "!text-[10px]" : ""}>conversation depth</SpecLabel>
      <div className={compact ? "mt-3 h-24" : "mt-6 h-64"}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid stroke="#CBD5E1" strokeDasharray="2 4" vertical={false} />
            <XAxis
              dataKey="label"
              tick={{ fill: "#6E7680", fontSize: compact ? 8 : 11, fontFamily: "Spline Sans Mono" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#6E7680", fontSize: compact ? 8 : 11, fontFamily: "Spline Sans Mono" }}
              axisLine={false}
              tickLine={false}
              width={compact ? 28 : undefined}
            />
            <Tooltip content={<ChartTooltip />} />
            <Bar dataKey="count" fill="#129A6A" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </SnapshotCard>
  );
}
