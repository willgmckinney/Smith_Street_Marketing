import { useCallback, useEffect, useState } from "react";
import type { AppMode, AppScreen } from "./components/ModeSwitch";
import { AppShell } from "./components/AppShell";
import { FleetScreen } from "./screens/FleetScreen";
import { OpportunityRadarScreen } from "./screens/OpportunityRadarScreen";
import { RecoveryWatchScreen } from "./screens/RecoveryWatchScreen";
import "./acme-lifecycle.css";

export function AcmeLifecycle() {
  const [mode, setMode] = useState<AppMode>("client");
  const [screen, setScreen] = useState<AppScreen>("fleet");
  const [transitioning, setTransitioning] = useState(false);

  const handleModeChange = useCallback((newMode: AppMode) => {
    if (newMode === mode) return;
    setTransitioning(true);
    setTimeout(() => {
      setMode(newMode);
      setTimeout(() => setTransitioning(false), 30);
    }, 125);
  }, [mode]);

  useEffect(() => {
    document.title = "ACME Lifecycle: Fleet & Opportunity Demo";
    return () => {
      document.title = "Smith Avenue Insights";
    };
  }, []);

  const renderScreen = () => {
    if (mode === "acme") return <OpportunityRadarScreen />;
    if (screen === "recovery") return <RecoveryWatchScreen />;
    return <FleetScreen />;
  };

  return (
    <div className={`acme-lifecycle ${mode === "acme" ? "mode-acme" : ""}`}>
      <AppShell
        mode={mode}
        screen={screen}
        transitioning={transitioning}
        onModeChange={handleModeChange}
        onScreenChange={setScreen}
      >
        {renderScreen()}
      </AppShell>
    </div>
  );
}
