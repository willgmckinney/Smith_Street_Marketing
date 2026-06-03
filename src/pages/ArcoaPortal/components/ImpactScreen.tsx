import { Download, Leaf } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { environmental } from "../mockData";

interface ImpactScreenProps {
  onDownload: () => void;
}

function MetricCard({
  label,
  value,
  unit,
  delay,
}: {
  label: string;
  value: string;
  unit?: string;
  delay: number;
}) {
  return (
    <div
      className="arcoa-card arcoa-fade-in p-4"
      style={{ animationDelay: `${delay}ms` }}
    >
      <p
        className="text-[10px] font-semibold uppercase tracking-wider mb-1.5"
        style={{ color: "var(--muted)" }}
      >
        {label}
      </p>
      <div className="flex items-baseline gap-1">
        <span
          className="font-mono text-2xl font-semibold"
          style={{ color: "var(--green)" }}
        >
          {value}
        </span>
        {unit && (
          <span className="text-xs font-medium" style={{ color: "var(--muted)" }}>
            {unit}
          </span>
        )}
      </div>
    </div>
  );
}

export function ImpactScreen({ onDownload }: ImpactScreenProps) {
  const chartData = environmental.commodities.map((c) => ({
    name: c.name.replace(" ", "\n"),
    kg: c.kg,
    displayName: c.name,
  }));

  return (
    <div className="px-4 py-5 space-y-5 pb-6">
      <div className="arcoa-fade-in">
        <div className="flex items-center gap-2 mb-1">
          <Leaf size={20} style={{ color: "var(--green)" }} />
          <h1 className="text-xl font-semibold" style={{ color: "var(--ink)" }}>
            Environmental Impact
          </h1>
        </div>
        <p className="text-sm" style={{ color: "var(--muted)" }}>
          Your contribution to a circular IT lifecycle.
        </p>
      </div>

      <div className="space-y-3">
        <MetricCard
          label="CO₂e Avoided"
          value={environmental.co2AvoidedKg.toLocaleString()}
          unit="kg"
          delay={80}
        />
        <MetricCard
          label="e-Waste Diverted from Landfill"
          value={String(environmental.eWasteDivertedTons)}
          unit="metric tons"
          delay={140}
        />
        <MetricCard
          label="Materials Recovered for Reuse"
          value={String(environmental.materialsRecoveredTons)}
          unit="metric tons"
          delay={200}
        />
      </div>

      <div
        className="arcoa-card arcoa-fade-in p-5"
        style={{ animationDelay: "260ms" }}
      >
        <h2 className="text-sm font-semibold mb-4" style={{ color: "var(--ink)" }}>
          Materials Recovered by Commodity
        </h2>
        <div className="h-52 -mx-1">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 9, fill: "var(--muted)" }}
                axisLine={false}
                tickLine={false}
                interval={0}
              />
              <YAxis
                tick={{ fontSize: 10, fill: "var(--muted)" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `${v}`}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (!active || !payload?.[0]) return null;
                  const data = payload[0].payload;
                  return (
                    <div
                      className="px-3 py-2 rounded-lg text-xs shadow-lg border"
                      style={{
                        backgroundColor: "var(--card)",
                        borderColor: "var(--border)",
                        color: "var(--ink)",
                      }}
                    >
                      <p className="font-medium">{data.displayName}</p>
                      <p className="font-mono mt-0.5" style={{ color: "var(--green)" }}>
                        {data.kg.toLocaleString()} kg
                      </p>
                    </div>
                  );
                }}
              />
              <Bar
                dataKey="kg"
                fill="var(--green)"
                radius={[4, 4, 0, 0]}
                maxBarSize={40}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div
        className="arcoa-card arcoa-fade-in p-5"
        style={{
          animationDelay: "320ms",
          backgroundColor: "var(--blue-tint)",
          borderColor: "var(--border)",
        }}
      >
        <h2 className="text-sm font-semibold mb-1" style={{ color: "var(--navy)" }}>
          ESG Reporting
        </h2>
        <p className="text-xs mb-4 leading-relaxed" style={{ color: "var(--muted)" }}>
          Export an audit-ready ESG summary for your sustainability reporting.
        </p>
        <button
          type="button"
          onClick={onDownload}
          className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold text-white min-h-[44px] active:opacity-90"
          style={{ backgroundColor: "var(--blue)" }}
        >
          <Download size={16} />
          Download ESG Report (PDF)
        </button>
      </div>

      <p
        className="text-center text-xs arcoa-fade-in leading-relaxed px-2"
        style={{ animationDelay: "380ms", color: "var(--muted)" }}
      >
        Equivalent to taking{" "}
        <span className="font-mono font-medium" style={{ color: "var(--green)" }}>
          {environmental.carsOffRoadEquivalent}
        </span>{" "}
        cars off the road for a year.
      </p>
    </div>
  );
}
