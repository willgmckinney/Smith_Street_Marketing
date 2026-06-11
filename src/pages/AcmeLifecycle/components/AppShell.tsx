import type { ReactNode } from "react";
import { LayoutGrid, Radar, ShieldAlert } from "lucide-react";
import { clientStats } from "../../../data/mockData";
import type { AppMode, AppScreen } from "./ModeSwitch";
import { ModeSwitch } from "./ModeSwitch";

interface NavItem {
  id: AppScreen;
  label: string;
  icon: ReactNode;
  modes: AppMode[];
}

const navItems: NavItem[] = [
  {
    id: "fleet",
    label: "Fleet",
    icon: <LayoutGrid className="h-5 w-5" strokeWidth={1.75} />,
    modes: ["client"],
  },
  {
    id: "recovery",
    label: "Recovery Watch",
    icon: <ShieldAlert className="h-5 w-5" strokeWidth={1.75} />,
    modes: ["client"],
  },
  {
    id: "radar",
    label: "Opportunity Radar",
    icon: <Radar className="h-5 w-5" strokeWidth={1.75} />,
    modes: ["acme"],
  },
];

interface AppShellProps {
  mode: AppMode;
  screen: AppScreen;
  transitioning: boolean;
  onModeChange: (mode: AppMode) => void;
  onScreenChange: (screen: AppScreen) => void;
  children: ReactNode;
}

export function AppShell({
  mode,
  screen,
  transitioning,
  onModeChange,
  onScreenChange,
  children,
}: AppShellProps) {
  const visibleNav = navItems.filter((item) => item.modes.includes(mode));

  const handleModeChange = (newMode: AppMode) => {
    onModeChange(newMode);
    if (newMode === "acme") {
      onScreenChange("radar");
    } else if (screen === "radar") {
      onScreenChange("fleet");
    }
  };

  return (
    <div className={`flex min-h-screen min-h-[100dvh] ${mode === "acme" ? "mode-acme" : ""}`}>
      {/* Desktop sidebar */}
      <aside className="grain-texture fixed inset-y-0 left-0 z-30 hidden w-60 flex-col border-r border-[var(--rail-border)] bg-[var(--rail-bg)] lg:flex">
        <div className="border-b border-[var(--rail-border)] px-5 py-5">
          <p className={`text-lg font-bold tracking-tight ${mode === "acme" ? "text-[var(--accent)]" : "text-[var(--navy)]"}`}>
            ACME
          </p>
          <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
            Lifecycle
          </p>
        </div>

        <div className="px-4 py-4">
          <ModeSwitch mode={mode} onChange={handleModeChange} />
        </div>

        <nav className="flex-1 px-3">
          {visibleNav.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onScreenChange(item.id)}
              className={`mb-1 flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm font-medium transition-colors ${
                screen === item.id
                  ? "bg-[var(--accent)]/10 text-[var(--accent)]"
                  : "text-[var(--text-muted)] hover:bg-[var(--bg)] hover:text-[var(--text)]"
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        <div className="border-t border-[var(--rail-border)] px-5 py-4">
          <p className="text-sm font-medium">
            {mode === "client" ? clientStats.shortName : "ACME Sales"}
          </p>
          <p className="font-mono text-[11px] text-[var(--text-muted)]">
            {mode === "client" ? "Asset Manager" : "Internal · Demo"}
          </p>
        </div>
      </aside>

      {/* Tablet icon rail */}
      <aside className="grain-texture fixed inset-y-0 left-0 z-30 hidden w-16 flex-col border-r border-[var(--rail-border)] bg-[var(--rail-bg)] md:flex lg:hidden">
        <div className="flex h-14 items-center justify-center border-b border-[var(--rail-border)]">
          <span className={`text-sm font-bold ${mode === "acme" ? "text-[var(--accent)]" : "text-[var(--navy)]"}`}>
            A
          </span>
        </div>
        <nav className="flex flex-1 flex-col items-center gap-1 px-2 py-3">
          {visibleNav.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onScreenChange(item.id)}
              title={item.label}
              className={`flex h-11 w-11 items-center justify-center rounded-md transition-colors ${
                screen === item.id
                  ? "bg-[var(--accent)]/10 text-[var(--accent)]"
                  : "text-[var(--text-muted)] hover:text-[var(--text)]"
              }`}
            >
              {item.icon}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex min-h-screen min-h-[100dvh] flex-1 flex-col md:pl-16 lg:pl-60">
        {/* Mobile top bar */}
        <header className="grain-texture sticky top-0 z-20 flex items-center justify-between gap-3 border-b border-[var(--rail-border)] bg-[var(--rail-bg)] px-4 py-3 md:hidden">
          <div>
            <p className="text-base font-bold tracking-tight">ACME</p>
          </div>
          <div className="w-[200px]">
            <ModeSwitch mode={mode} onChange={handleModeChange} compact />
          </div>
        </header>

        {/* Tablet mode switch bar */}
        <header className="grain-texture sticky top-0 z-20 hidden border-b border-[var(--rail-border)] bg-[var(--rail-bg)] px-4 py-3 md:block lg:hidden">
          <ModeSwitch mode={mode} onChange={handleModeChange} />
        </header>

        <main className="flex-1 px-4 py-6 pb-24 md:px-6 md:pb-8 lg:px-8">
          <div className="mx-auto max-w-[1200px]">
            <div
              className={`mode-transition ${transitioning ? "mode-transition-enter" : "mode-transition-active"}`}
            >
              {children}
            </div>
          </div>
        </main>

        {/* Mobile bottom nav */}
        <nav
          className="fixed bottom-0 left-0 right-0 z-20 flex border-t border-[var(--rail-border)] bg-[var(--rail-bg)] md:hidden"
          style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
        >
          {visibleNav.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onScreenChange(item.id)}
              className={`flex min-h-[56px] flex-1 flex-col items-center justify-center gap-0.5 text-[10px] font-medium ${
                screen === item.id
                  ? "text-[var(--accent)]"
                  : "text-[var(--text-muted)]"
              }`}
            >
              {item.icon}
              <span className="max-w-[80px] truncate">{item.label.split(" ")[0]}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
