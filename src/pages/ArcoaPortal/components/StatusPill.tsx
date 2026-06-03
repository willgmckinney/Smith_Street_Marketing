import type { AssetStatus } from "../mockData";

const statusStyles: Record<AssetStatus, { bg: string; text: string }> = {
  Received: { bg: "#F1F3F5", text: "#5B6B7B" },
  "Data Sanitized": { bg: "#E8F1FB", text: "#1565C0" },
  Remarketed: { bg: "#E8F5EE", text: "#2E9E5B" },
  Recycled: { bg: "#E8EDF2", text: "#0B2E4F" },
  "In Transit": { bg: "#FEF3E2", text: "#C77700" },
};

export function StatusPill({ status }: { status: AssetStatus }) {
  const style = statusStyles[status];
  return (
    <span
      className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap"
      style={{ backgroundColor: style.bg, color: style.text }}
    >
      {status}
    </span>
  );
}

export function ActivityStatusPill({
  label,
  color,
}: {
  label: string;
  color: "blue" | "green" | "amber" | "navy" | "muted";
}) {
  const colors = {
    blue: { bg: "#E8F1FB", text: "#1565C0" },
    green: { bg: "#E8F5EE", text: "#2E9E5B" },
    amber: { bg: "#FEF3E2", text: "#C77700" },
    navy: { bg: "#E8EDF2", text: "#0B2E4F" },
    muted: { bg: "#F1F3F5", text: "#5B6B7B" },
  };
  const style = colors[color];
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wide whitespace-nowrap"
      style={{ backgroundColor: style.bg, color: style.text }}
    >
      {label}
    </span>
  );
}
