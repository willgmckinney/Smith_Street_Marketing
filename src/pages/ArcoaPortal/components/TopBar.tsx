import { client } from "../mockData";

export function TopBar() {
  return (
    <header
      className="sticky top-0 z-30 flex items-center justify-between px-4 py-3 border-b"
      style={{
        backgroundColor: "var(--card)",
        borderColor: "var(--border)",
      }}
    >
      <div className="flex items-baseline gap-1.5">
        <span
          className="text-lg font-bold tracking-tight"
          style={{ color: "var(--navy)" }}
        >
          ARCOA
        </span>
        <span
          className="font-mono text-[10px] uppercase tracking-widest"
          style={{ color: "var(--muted)" }}
        >
          Portal
        </span>
      </div>

      <div className="flex items-center gap-2.5 min-w-0">
        <span
          className="text-xs font-medium truncate max-w-[140px] sm:max-w-none"
          style={{ color: "var(--ink)" }}
        >
          {client.name}
        </span>
        <div
          className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-white"
          style={{ backgroundColor: "var(--blue)" }}
        >
          {client.initials}
        </div>
      </div>
    </header>
  );
}
