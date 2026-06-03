import {
  Award,
  Package,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { CertificationBadges } from "../components/CertificationBadges";
import { ActivityStatusPill } from "../components/StatusPill";
import {
  client,
  dispositionMix,
  kpis,
  recentActivity,
} from "../mockData";

const activityIcons = {
  certificate: Award,
  remarket: Package,
  pickup: Truck,
  sanitize: ShieldCheck,
};

function KpiCard({
  label,
  value,
  delay,
}: {
  label: string;
  value: string;
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
      <p
        className="font-mono text-2xl font-semibold leading-tight"
        style={{ color: "var(--ink)" }}
      >
        {value}
      </p>
    </div>
  );
}

export function OverviewScreen() {
  const dateRange = "Last 90 days";

  return (
    <div className="px-4 py-5 space-y-5 pb-6">
      <div className="arcoa-fade-in">
        <h1 className="text-xl font-semibold" style={{ color: "var(--ink)" }}>
          Welcome back, {client.shortName}
        </h1>
        <span
          className="inline-flex mt-2 px-2.5 py-1 rounded-full text-xs font-medium"
          style={{
            backgroundColor: "var(--blue-tint)",
            color: "var(--blue)",
          }}
        >
          {dateRange}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <KpiCard
          label="Assets Processed"
          value={kpis.assetsProcessed.toLocaleString()}
          delay={80}
        />
        <KpiCard
          label="Devices Sanitized"
          value={kpis.devicesSanitized.toLocaleString()}
          delay={140}
        />
        <KpiCard
          label="Value Recovered"
          value={`$${kpis.valueRecovered.toLocaleString()}`}
          delay={200}
        />
        <KpiCard
          label="e-Waste Diverted"
          value={`${kpis.eWasteDiverted} t`}
          delay={260}
        />
      </div>

      <div
        className="arcoa-card arcoa-fade-in p-5"
        style={{ animationDelay: "320ms" }}
      >
        <h2 className="text-sm font-semibold mb-4" style={{ color: "var(--ink)" }}>
          Asset Disposition
        </h2>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={dispositionMix}
                cx="50%"
                cy="50%"
                innerRadius={52}
                outerRadius={72}
                paddingAngle={3}
                dataKey="value"
                stroke="none"
              >
                {dispositionMix.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {dispositionMix.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-xs" style={{ color: "var(--muted)" }}>
                {item.name}
              </span>
              <span
                className="font-mono text-xs font-medium ml-auto"
                style={{ color: "var(--ink)" }}
              >
                {item.value}%
              </span>
            </div>
          ))}
        </div>
      </div>

      <div
        className="arcoa-card arcoa-fade-in p-5"
        style={{ animationDelay: "380ms" }}
      >
        <h2 className="text-sm font-semibold mb-4" style={{ color: "var(--ink)" }}>
          Recent Activity
        </h2>
        <ul className="space-y-4">
          {recentActivity.map((event) => {
            const Icon = activityIcons[event.icon];
            return (
              <li key={event.id} className="flex gap-3">
                <div
                  className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: "var(--blue-tint)" }}
                >
                  <Icon size={16} style={{ color: "var(--blue)" }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className="text-sm font-medium leading-snug"
                    style={{ color: "var(--ink)" }}
                  >
                    {event.title}
                  </p>
                  <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                    <span
                      className="text-[11px]"
                      style={{ color: "var(--muted)" }}
                    >
                      {event.timestamp}
                    </span>
                    <ActivityStatusPill
                      label={event.status}
                      color={event.statusColor}
                    />
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div
        className="arcoa-fade-in pt-2"
        style={{ animationDelay: "440ms" }}
      >
        <CertificationBadges compact />
      </div>
    </div>
  );
}
