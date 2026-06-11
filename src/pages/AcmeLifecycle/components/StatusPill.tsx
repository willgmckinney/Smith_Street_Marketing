import type { DeviceStatus } from "../../../data/mockData";

const statusConfig: Record<
  DeviceStatus | "High" | "Med" | "Low",
  { dot: string; label: string; pulse?: boolean }
> = {
  Active: { dot: "bg-[var(--status-active)]", label: "Active" },
  Idle: { dot: "bg-[var(--status-idle)]", label: "Idle" },
  Unreachable: { dot: "bg-[var(--a-accent)]", label: "Unreachable", pulse: true },
  "Pending Recovery": { dot: "border border-[var(--navy)] bg-transparent", label: "Pending Recovery" },
  "End-of-Life": { dot: "bg-[var(--a-accent)]", label: "End-of-Life" },
  High: { dot: "bg-[var(--a-accent)]", label: "High" },
  Med: { dot: "bg-[var(--muted)]", label: "Med" },
  Low: { dot: "bg-[var(--border)]", label: "Low" },
};

interface StatusPillProps {
  status: DeviceStatus | "High" | "Med" | "Low";
}

export function StatusPill({ status }: StatusPillProps) {
  const config = statusConfig[status];

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] px-2.5 py-0.5 text-xs font-medium text-[var(--text)]">
      <span
        className={`inline-block h-1.5 w-1.5 rounded-full ${config.dot} ${config.pulse ? "status-dot-pulse" : ""}`}
      />
      {config.label}
    </span>
  );
}
