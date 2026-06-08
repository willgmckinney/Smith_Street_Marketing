import { useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  formatCurrency,
  formatNumber,
  opportunityClients,
  totalPipeline,
  type OpportunityClient,
} from "../../../data/mockData";
import { CountUp } from "../components/CountUp";
import { ResponsiveList } from "../components/ResponsiveList";
import type { Column } from "../components/ResponsiveList";
import { StatusPill } from "../components/StatusPill";

export function OpportunityRadarScreen() {
  const [expandedId, setExpandedId] = useState<string>("c1");

  const columns: Column<OpportunityClient>[] = [
    {
      key: "client",
      header: "Client",
      render: (c) => (
        <button
          type="button"
          className="flex items-center gap-1.5 text-left font-medium hover:text-[var(--accent)]"
          onClick={() =>
            setExpandedId(expandedId === c.id ? "" : c.id)
          }
        >
          {c.drillDown && (
            <ChevronDown
              className={`h-3.5 w-3.5 shrink-0 transition-transform ${expandedId === c.id ? "rotate-180" : ""}`}
            />
          )}
          {c.name}
        </button>
      ),
    },
    {
      key: "devices",
      header: "Refresh window",
      cellClassName: "font-mono",
      render: (c) => (
        <span>
          {formatNumber(c.refreshWindowDevices)}
          {c.refreshNote && (
            <span className="ml-1 text-xs text-[var(--text-muted)]">
              ({c.refreshNote})
            </span>
          )}
        </span>
      ),
    },
    {
      key: "value",
      header: "Est. recoverable",
      cellClassName: "font-mono text-[var(--accent)]",
      render: (c) => formatCurrency(c.estimatedRecoverable),
    },
    {
      key: "engagement",
      header: "Last engagement",
      cellClassName: "font-mono text-[var(--text-muted)]",
      render: (c) => c.lastEngagement,
    },
    {
      key: "priority",
      header: "Priority",
      render: (c) => <StatusPill status={c.priority} />,
    },
    {
      key: "action",
      header: "Recommended action",
      render: (c) => (
        <span className="text-[var(--text-muted)]">{c.recommendedAction}</span>
      ),
    },
  ];

  const lakeshore = opportunityClients.find((c) => c.id === "c1");

  return (
    <div className="space-y-6 vignette">
      <header>
        <p className="font-mono mb-1 text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
          ACME · INTERNAL
        </p>
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Opportunity Radar
        </h1>
      </header>

      {/* Hero money */}
      <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6">
        <p className="font-mono mb-1 text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
          Total pipeline surfaced
        </p>
        <p className="font-mono text-4xl font-semibold text-[var(--accent)] md:text-5xl">
          <CountUp
            end={totalPipeline}
            formatter={(v) => formatCurrency(v)}
          />
        </p>
        <p className="mt-2 text-sm text-[var(--text-muted)]">
          across 4 active clients · refresh + recovery
        </p>
      </div>

      {/* Lakeshore drill-down: prominent */}
      {lakeshore?.drillDown && (
        <div className="rounded-lg border border-[var(--accent)] bg-[var(--surface)] px-5 py-4" style={{ borderColor: "color-mix(in srgb, var(--accent) 40%, transparent)", background: "color-mix(in srgb, var(--accent) 8%, var(--surface))" }}>
          <p className="font-mono mb-1 text-[10px] uppercase tracking-wider text-[var(--accent)]">
            #1 · {lakeshore.name}
          </p>
          <p className="text-base leading-relaxed md:text-lg">
            {lakeshore.drillDown}
          </p>
        </div>
      )}

      <ResponsiveList
        items={opportunityClients}
        columns={columns}
        getKey={(c) => c.id}
        rowClassName={(c) =>
          c.id === "c1" ? "border-l-2 border-l-[var(--accent)]" : ""
        }
      />

      {/* Expanded detail for mobile / secondary */}
      {expandedId && (
        <div className="md:hidden rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4">
          <p className="text-sm leading-relaxed">
            {opportunityClients.find((c) => c.id === expandedId)?.drillDown}
          </p>
        </div>
      )}

      <p className="font-mono text-[11px] text-[var(--text-muted)]">
        Estimates are FMV-based and ACME-internal. Don&apos;t quote these to
        the client.
      </p>
    </div>
  );
}
