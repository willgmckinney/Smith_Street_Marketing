import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  clientStats,
  devices,
  formatNumber,
  isRiskRow,
  lifecycleDistribution,
} from "../../../data/mockData";
import { AssetTagChip } from "../components/AssetTagChip";
import { CountUp } from "../components/CountUp";
import { ResponsiveList } from "../components/ResponsiveList";
import type { Column } from "../components/ResponsiveList";
import { StatusPill } from "../components/StatusPill";
import type { Device } from "../../../data/mockData";

export function FleetScreen() {
  const deviceColumns: Column<Device>[] = [
    {
      key: "tag",
      header: "Asset Tag",
      render: (d) => <AssetTagChip tag={d.assetTag} />,
    },
    {
      key: "assignee",
      header: "Assignee",
      render: (d) => (
        <span>
          {d.former && (
            <span className="font-mono mr-1 text-[10px] uppercase text-[var(--text-muted)]">
              (former)
            </span>
          )}
          {d.assignee}{" "}
          <span className="text-[var(--text-muted)]">({d.department})</span>
        </span>
      ),
    },
    {
      key: "model",
      header: "Model",
      render: (d) => d.model,
    },
    {
      key: "location",
      header: "Location",
      render: (d) => d.location,
    },
    {
      key: "lastSeen",
      header: "Last Seen",
      cellClassName: "font-mono text-[var(--text-muted)]",
      render: (d) => (
        <span>
          last seen{" "}
          <span className="text-[var(--text)]">{d.lastSeen}</span>
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (d) => <StatusPill status={d.status} />,
    },
    {
      key: "age",
      header: "Age",
      cellClassName: "font-mono",
      render: (d) => (
        <span>
          {d.age.replace("y", "")}
          <span className="text-[var(--text-muted)]"> y</span>
        </span>
      ),
    },
    {
      key: "data",
      header: "Data",
      render: (d) =>
        d.dataBearing ? (
          <span className="font-mono text-xs text-[var(--c-accent)]">Yes</span>
        ) : (
          <span className="font-mono text-xs text-[var(--text-muted)]">No</span>
        ),
    },
  ];

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono mb-1 text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
            {clientStats.name.toUpperCase()}
          </p>
          <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
            Fleet
          </h1>
        </div>
        <span className="font-mono self-start rounded border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-xs text-[var(--text-muted)]">
          Last sync {clientStats.lastSync}
        </span>
      </header>

      {/* Bento stats */}
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-12">
        <div className="relative lg:col-span-5">
          <div className="relative rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6 pt-7">
            <span className="hero-badge-overlap font-mono rounded-full border border-[var(--a-accent)] bg-[var(--bg)] px-2.5 py-0.5 text-[10px] uppercase tracking-wider text-[var(--a-accent)]">
              Refresh Horizon
            </span>
            <p className="font-mono mb-1 text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
              Needs attention
            </p>
            <p className="text-5xl font-semibold tracking-tight md:text-6xl">
              <CountUp end={clientStats.needAttention} />{" "}
              <span className="text-2xl font-normal text-[var(--text-muted)] md:text-3xl">
                devices
              </span>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 lg:col-span-7 lg:grid-cols-4">
          <StatChip
            label="Tracked"
            value={formatNumber(clientStats.tracked)}
          />
          <StatChip
            label="Coverage"
            value={`${clientStats.coverage}%`}
            accent
          />
          <StatChip
            label="Unreachable >30d"
            value={String(clientStats.unreachableOver30)}
            warn
          />
          <StatChip
            label="Refresh window"
            value={String(clientStats.enteringRefreshWindow)}
            sub="next 180d"
          />
        </div>
      </div>

      {/* Lifecycle bar */}
      <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4">
        <p className="font-mono mb-3 text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
          Lifecycle distribution
        </p>
        <div className="h-28 overflow-visible">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={lifecycleDistribution}
              layout="vertical"
              margin={{ top: 0, right: 12, left: 4, bottom: 0 }}
            >
              <XAxis type="number" hide />
              <YAxis
                type="category"
                dataKey="label"
                width={96}
                tick={{
                  fill: "var(--text-muted)",
                  fontSize: 11,
                  fontFamily: "Spline Sans Mono",
                  textAnchor: "end",
                }}
                tickMargin={8}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: 6,
                  fontFamily: "Spline Sans Mono",
                  fontSize: 12,
                }}
                formatter={(value) => [
                  formatNumber(Number(value)),
                  "Devices",
                ]}
              />
              <Bar dataKey="count" radius={[0, 3, 3, 0]} barSize={14}>
                {lifecycleDistribution.map((entry) => (
                  <Cell key={entry.label} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Device list */}
      <div>
        <p className="font-mono mb-3 text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
          In-use devices
        </p>
        <ResponsiveList
          items={devices}
          columns={deviceColumns}
          getKey={(d) => d.id}
          rowClassName={(d) => (isRiskRow(d) ? "risk-accent" : "")}
        />
      </div>
    </div>
  );
}

function StatChip({
  label,
  value,
  sub,
  accent,
  warn,
}: {
  label: string;
  value: string;
  sub?: string;
  accent?: boolean;
  warn?: boolean;
}) {
  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-3">
      <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
        {label}
      </p>
      <p
        className={`font-mono mt-1 text-xl font-medium ${accent ? "text-[var(--good)]" : warn ? "text-[var(--a-accent)]" : ""}`}
      >
        {value}
        {sub && (
          <span className="ml-1 text-xs text-[var(--text-muted)]">{sub}</span>
        )}
      </p>
    </div>
  );
}
