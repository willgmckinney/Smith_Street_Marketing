import type { SnapshotAnalytics } from "../../../lib/analytics";
import { formatCount } from "../../../lib/format";
import { GoatMark } from "../../../components/Blueprint/GoatMark";
import { DimensionLine } from "../../../components/Blueprint/DimensionLine";
import { SpecLabel } from "../../../components/Blueprint/SpecLabel";
import { ExposurePanel } from "./ExposurePanel";
import { KpiRow } from "./KpiCard";
import { DepthChart } from "./charts/DepthChart";
import { TopicChart } from "./charts/TopicChart";
import { UsageChart } from "./charts/UsageChart";

type ReportDocumentProps = {
  analytics: SnapshotAnalytics;
  /** Tighter layout for single-page PDF capture. */
  compact?: boolean;
};

export function ReportDocument({ analytics, compact = false }: ReportDocumentProps) {
  const pad = compact ? "p-4" : "px-8 py-10";
  const chartWrap = compact ? "grid grid-cols-2 gap-3" : "space-y-6";

  return (
    <div className={`bg-blueprint-base text-chalk ${pad}`}>
      <div className="flex items-center gap-3">
        <GoatMark size={compact ? 32 : 40} alt="Smith Avenue Insights" />
        <div>
          <p className={`font-display font-bold ${compact ? "text-lg" : "text-2xl"}`}>
            AI Usage & Exposure Snapshot
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
            {analytics.generatedAt}
          </p>
        </div>
      </div>

      <div className={`mt-4 grid gap-4 ${compact ? "grid-cols-[140px_1fr]" : "lg:grid-cols-2"}`}>
        <div>
          <p className={`font-display font-bold text-redline ${compact ? "text-3xl" : "text-4xl"}`}>
            {formatCount(analytics.exposure.headlineCount)}
          </p>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em]">
            likely secrets or pii detected
          </p>
        </div>
        <p className={`leading-snug text-chalk/90 ${compact ? "text-[11px]" : "text-sm"}`}>
          {analytics.persona}
        </p>
      </div>

      <DimensionLine className="mt-4" label="smith avenue insights" />

      <div className={compact ? "mt-4 space-y-3" : "mt-8 space-y-6"}>
        <KpiRow overview={analytics.overview} compact={compact} />
        <ExposurePanel exposure={analytics.exposure} compact={compact} />
        <div className={chartWrap}>
          <UsageChart
            data={analytics.usageOverTime}
            trend={analytics.usageTrend}
            compact={compact}
          />
          <TopicChart topics={analytics.topics} compact={compact} />
        </div>
        <DepthChart data={analytics.depthDistribution} compact={compact} />
      </div>

      <div className={`border-t border-chalk/15 ${compact ? "mt-4 pt-4" : "mt-8 pt-8"}`}>
        <SpecLabel>what the full engagement looks like</SpecLabel>
        <p className={`mt-2 max-w-2xl text-chalk/80 ${compact ? "text-[11px]" : "text-sm"}`}>
          Smith Avenue Insights builds org-wide AI governance: live monitoring, policy controls, and
          dashboards your security and data teams can run without handing raw prompts to a vendor.
        </p>
        <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.12em] text-marker-start">
          smithaveinsights.com/demo
        </p>
        <p className={`mt-3 font-mono text-muted ${compact ? "text-[9px]" : "text-xs"}`}>
          Processed entirely in your browser. Nothing is uploaded to Smith Avenue. Data clears when
          you close this tab. No secret or PII is ever shown in full or stored.
        </p>
      </div>
    </div>
  );
}
