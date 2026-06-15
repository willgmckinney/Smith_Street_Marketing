declare global {
  interface Window {
    trackingFunctions?: {
      onLoad?: (config: { appId: string }) => void;
      track?: (event: string, properties?: Record<string, unknown>) => void;
    };
  }
}

export function trackSnapshotEvent(
  step: "guide" | "upload" | "dashboard" | "pdf_downloaded" | "book_call_clicked" | "entry" | "report",
  properties?: Record<string, unknown>,
): void {
  const payload = {
    feature: "ai-snapshot",
    step,
    ...properties,
  };

  if (typeof window !== "undefined" && window.trackingFunctions?.track) {
    window.trackingFunctions.track("ai_snapshot_step", payload);
    return;
  }

  if (import.meta.env.DEV) {
    console.info("[ai-snapshot]", payload);
  }
}
