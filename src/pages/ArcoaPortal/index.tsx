import { useCallback, useEffect, useState } from "react";
import "./arcoa.css";
import { AssetsScreen } from "./components/AssetsScreen";
import { BottomNav, type TabId } from "./components/BottomNav";
import { ComplianceScreen } from "./components/ComplianceScreen";
import { ImpactScreen } from "./components/ImpactScreen";
import { OverviewScreen } from "./components/OverviewScreen";
import { Toast } from "./components/Toast";
import { TopBar } from "./components/TopBar";

export const ArcoaPortal = () => {
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const [toast, setToast] = useState<string | null>(null);

  const showToast = useCallback((message: string) => {
    setToast(message);
  }, []);

  const dismissToast = useCallback(() => {
    setToast(null);
  }, []);

  useEffect(() => {
    document.title = "ACME Portal — Lakeshore Regional";
    return () => {
      document.title = "Smith Avenue Insights";
    };
  }, []);

  const renderScreen = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewScreen />;
      case "assets":
        return <AssetsScreen />;
      case "impact":
        return (
          <ImpactScreen
            onDownload={() => showToast("ESG report generated — ready for download")}
          />
        );
      case "compliance":
        return (
          <ComplianceScreen
            onDownload={(certId) =>
              showToast(`${certId} PDF ready for download`)
            }
          />
        );
    }
  };

  return (
    <div className="arcoa-portal min-h-[100dvh] flex justify-center">
      <div
        className="w-full max-w-[430px] flex flex-col min-h-[100dvh] shadow-xl"
        style={{ backgroundColor: "var(--bg)" }}
      >
        <TopBar />

        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          {renderScreen()}
        </main>

        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

        {toast && <Toast message={toast} onDismiss={dismissToast} />}
      </div>
    </div>
  );
};
