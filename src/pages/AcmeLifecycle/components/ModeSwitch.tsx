export type AppMode = "client" | "acme";
export type AppScreen = "fleet" | "recovery" | "radar";

interface ModeSwitchProps {
  mode: AppMode;
  onChange: (mode: AppMode) => void;
  compact?: boolean;
}

export function ModeSwitch({ mode, onChange, compact = false }: ModeSwitchProps) {
  return (
    <div className={compact ? "w-full" : ""}>
      {!compact && (
        <p className="font-mono mb-2 text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
          Viewing as
        </p>
      )}
      <div
        className={`flex rounded-md border border-[var(--border)] bg-[var(--bg)] p-0.5 ${compact ? "text-xs" : "text-sm"}`}
        role="group"
        aria-label="View mode"
      >
        <button
          type="button"
          onClick={() => onChange("client")}
          className={`min-h-[44px] flex-1 rounded px-2 py-1.5 font-medium transition-all duration-250 ${
            mode === "client"
              ? "bg-[var(--surface)] text-[var(--text)] shadow-sm"
              : "text-[var(--text-muted)] hover:text-[var(--text)]"
          }`}
        >
          {compact ? "Lakeshore" : "Lakeshore Regional"}
        </button>
        <button
          type="button"
          onClick={() => onChange("acme")}
          className={`min-h-[44px] flex-1 rounded px-2 py-1.5 font-medium transition-all duration-250 ${
            mode === "acme"
              ? "bg-[var(--accent)] text-[var(--a-bg)] shadow-sm"
              : "text-[var(--text-muted)] hover:text-[var(--text)]"
          }`}
        >
          {compact ? "ACME" : "ACME Team"}
        </button>
      </div>
    </div>
  );
}
