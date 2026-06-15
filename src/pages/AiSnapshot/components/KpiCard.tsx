import { formatAverage, formatCount } from "../../../lib/format";
import type { OverviewStats } from "../../../lib/analytics/overview";
import { SpecLabel } from "../../../components/Blueprint/SpecLabel";
import { SnapshotCard } from "./SnapshotCard";

type KpiCardProps = {
  label: string;
  value: string | number;
  unit?: string;
};

function KpiCard({
  label,
  value,
  unit,
  compact = false,
}: KpiCardProps & { compact?: boolean }) {
  return (
    <SnapshotCard className={compact ? "!p-3" : ""}>
      <p className={`font-display font-bold text-chalk ${compact ? "text-xl" : "text-3xl"}`}>
        {value}
      </p>
      {unit && (
        <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-muted">{unit}</p>
      )}
      <SpecLabel tick={false} className={`text-muted ${compact ? "mt-2 !text-[10px]" : "mt-4"}`}>
        {label}
      </SpecLabel>
    </SnapshotCard>
  );
}

export function KpiRow({ overview, compact = false }: { overview: OverviewStats; compact?: boolean }) {
  return (
    <div className={`grid gap-3 ${compact ? "grid-cols-4" : "gap-4 sm:grid-cols-2 xl:grid-cols-4"}`}>
      <KpiCard label="conversations" value={formatCount(overview.totalConversations)} unit="total" compact={compact} />
      <KpiCard label="user prompts" value={formatCount(overview.userMessages)} unit="messages" compact={compact} />
      <KpiCard
        label="avg depth"
        value={formatAverage(overview.avgMessagesPerConversation)}
        unit="msgs / conv"
        compact={compact}
      />
      <KpiCard label="days active" value={formatCount(overview.daysActive)} unit="unique days" compact={compact} />
    </div>
  );
}
