import { SnapshotCard } from "../SnapshotCard";

type ChartTooltipProps = {
  active?: boolean;
  payload?: Array<{ value?: number }>;
  label?: string | number;
};

export function ChartTooltip({ active, payload, label }: ChartTooltipProps) {
  if (!active || !payload?.length) return null;

  return (
    <SnapshotCard className="!p-3 shadow-sm">
      <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted">{label}</p>
      <p className="mt-1 font-mono text-sm text-chalk">{payload[0]?.value?.toLocaleString()}</p>
    </SnapshotCard>
  );
}
