import {
  HardDrive,
  LayoutDashboard,
  Leaf,
  ShieldCheck,
} from "lucide-react";

export type TabId = "overview" | "assets" | "impact" | "compliance";

const tabs: { id: TabId; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "assets", label: "Assets", icon: HardDrive },
  { id: "impact", label: "Impact", icon: Leaf },
  { id: "compliance", label: "Compliance", icon: ShieldCheck },
];

interface BottomNavProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav
      className="sticky bottom-0 z-30 border-t"
      style={{
        backgroundColor: "var(--card)",
        borderColor: "var(--border)",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
    >
      <div className="flex items-stretch">
        {tabs.map(({ id, label, icon: Icon }) => {
          const isActive = activeTab === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onTabChange(id)}
              className="flex-1 flex flex-col items-center justify-center gap-1 py-3 min-h-[56px] transition-colors"
              style={{ color: isActive ? "var(--blue)" : "var(--muted)" }}
            >
              <Icon size={20} strokeWidth={isActive ? 2.25 : 1.75} />
              <span className="text-[10px] font-medium">{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
