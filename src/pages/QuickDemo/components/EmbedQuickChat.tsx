import { useCallback, useEffect, useRef, useState } from "react";
import { fetchEmbedUrl } from "../lib/embedClient";
import { getEmbeddingContext } from "../lib/embeddingContext";
import { EmbedFrame } from "./EmbedFrame";

interface EmbedQuickChatProps {
  accessToken: string;
  /** Optional Quick Suite agent id; locks the chat to a single agent. */
  agentId?: string;
}

export function EmbedQuickChat({ accessToken, agentId }: EmbedQuickChatProps) {
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
          experience: "quickchat",
          accessToken,
        });
        if (cancelled) return;

        const ctx = await getEmbeddingContext();
        if (cancelled) return;

        await ctx.embedQuickChat(
          {
            url,
            container,
            height: "720px",
            width: "100%",
            onChange: (changeEvent) => {
              if (changeEvent.eventName === "FRAME_LOADED" && !cancelled) {
                setLoading(false);
              }
            },
          },
          {
            agentOptions: agentId ? { fixedAgentId: agentId } : undefined,
            promptOptions: {
              allowFileAttachments: true,
              showAgentKnowledgeBoundary: true,
              showChatHistory: true,
              showPromptArea: true,
              showWebSearch: true,
            },
            footerOptions: {
              showBrandAttribution: true,
              showUsagePolicy: true,
            },
            onMessage: (messageEvent) => {
              if (cancelled) return;
              if (messageEvent.eventName === "CONTENT_LOADED") setLoading(false);
              if (messageEvent.eventName === "ERROR_OCCURRED") {
                setError(
                  `Quick Chat error: ${messageEvent.message?.errorCode ?? "unknown"}`,
                );
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
      if (container) container.innerHTML = "";
    };
  }, [accessToken, agentId, reloadKey]);

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
