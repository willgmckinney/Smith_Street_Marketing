import { useCallback, useEffect, useRef, useState } from "react";
import { fetchEmbedUrl } from "../lib/embedClient";
import { getEmbeddingContext } from "../lib/embeddingContext";
import { EmbedFrame } from "./EmbedFrame";

interface EmbedDashboardProps {
  accessToken: string;
  dashboardId?: string;
}

export function EmbedDashboard({ accessToken, dashboardId }: EmbedDashboardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const container = containerRef.current;
    if (!container) return;

    setLoading(true);
    setError(null);

    (async () => {
      try {
        const url = await fetchEmbedUrl({
          experience: "dashboard",
          accessToken,
          dashboardId,
        });
        if (cancelled) return;

        const ctx = await getEmbeddingContext();
        if (cancelled) return;

        await ctx.embedDashboard(
          {
            url,
            container,
            height: "720px",
            width: "100%",
            resizeHeightOnSizeChangedEvent: true,
            onChange: (changeEvent) => {
              if (changeEvent.eventName === "FRAME_LOADED" && !cancelled) {
                setLoading(false);
              }
            },
          },
          {
            toolbarOptions: {
              export: false,
              undoRedo: false,
              reset: false,
            },
            attributionOptions: { overlayContent: true },
            sheetOptions: { singleSheet: false },
            onMessage: (messageEvent) => {
              if (cancelled) return;
              if (messageEvent.eventName === "CONTENT_LOADED") setLoading(false);
              if (messageEvent.eventName === "ERROR_OCCURRED") {
                setError(
                  `Dashboard error: ${messageEvent.message?.errorCode ?? "unknown"}`,
                );
              }
              if (messageEvent.eventName === "MODAL_OPENED") {
                window.scrollTo({ top: 0 });
              }
            },
          },
        );
      } catch (e) {
        if (cancelled) return;
        setError(e instanceof Error ? e.message : String(e));
        setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
      // Tear down the iframe so a remount or tab switch gets a fresh embed URL.
      if (container) container.innerHTML = "";
    };
  }, [accessToken, dashboardId, reloadKey]);

  const handleRetry = useCallback(() => setReloadKey((n) => n + 1), []);

  return (
    <EmbedFrame
      containerRef={containerRef}
      loading={loading}
      error={error}
      onRetry={handleRetry}
      minHeight="720px"
    />
  );
}
