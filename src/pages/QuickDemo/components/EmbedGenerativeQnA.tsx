import { useCallback, useEffect, useRef, useState } from "react";
import { fetchEmbedUrl } from "../lib/embedClient";
import { getEmbeddingContext } from "../lib/embeddingContext";
import { EmbedFrame } from "./EmbedFrame";

interface EmbedGenerativeQnAProps {
  accessToken: string;
  topicId?: string;
}

export function EmbedGenerativeQnA({
  accessToken,
  topicId,
}: EmbedGenerativeQnAProps) {
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
          experience: "qna",
          accessToken,
          topicId,
        });
        if (cancelled) return;

        const ctx = await getEmbeddingContext();
        if (cancelled) return;

        await ctx.embedGenerativeQnA(
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
            panelOptions: {
              panelType: "FULL",
              title: "Ask Smith Avenue Insights",
              showQIcon: true,
            },
            showTopicName: false,
            allowTopicSelection: !topicId,
            searchPlaceholderText: "Ask a question about the data…",
            onMessage: (messageEvent) => {
              if (cancelled) return;
              if (messageEvent.eventName === "CONTENT_LOADED") setLoading(false);
              if (messageEvent.eventName === "ERROR_OCCURRED") {
                setError(
                  `Q&A error: ${messageEvent.message?.errorCode ?? "unknown"}`,
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
  }, [accessToken, topicId, reloadKey]);

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
