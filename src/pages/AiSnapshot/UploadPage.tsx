import { useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { BlueprintCard } from "../../components/Blueprint/BlueprintCard";
import { BlueprintGrid } from "../../components/Blueprint/BlueprintGrid";
import { Seo } from "../../components/Seo";
import { parseChatGPTExportFile } from "../../lib/parse/chatgpt";
import { DUMMY_CONVERSATION_COUNT, getDummySnapshotMessages } from "../../data/aiSnapshotDummyData";
import { useSnapshot } from "../../lib/state/snapshotContext";
import { withContactToken } from "../../lib/state/token";
import { trackSnapshotEvent } from "../../lib/tracking";
import { PrivacyBanner } from "./components/PrivacyBanner";
import { RegistrationTicks } from "./components/RegistrationTicks";
import { useContactToken } from "./hooks/useContactToken";

export function UploadPage() {
  const [dragging, setDragging] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { token } = useContactToken();
  const { processMessages, clearAnalytics } = useSnapshot();

  useEffect(() => {
    trackSnapshotEvent("upload", { token });
  }, [token]);

  const handleDummyData = useCallback(() => {
    setError(null);
    setProcessing(true);
    setStatus(
      `Loading sample dashboard with ${DUMMY_CONVERSATION_COUNT.toLocaleString()} conversations, all in your browser.`,
    );

    const messages = getDummySnapshotMessages();
    clearAnalytics();
    processMessages(messages, DUMMY_CONVERSATION_COUNT, "sample");
    trackSnapshotEvent("upload", { token, dummy: true });
    navigate({ to: withContactToken("/ai-snapshot/dashboard", token) });
  }, [clearAnalytics, navigate, processMessages, token]);

  const handleFile = useCallback(
    async (file: File) => {
      setError(null);
      setProcessing(true);
      clearAnalytics();
      setStatus("Reading export file...");

      try {
        const parsed = await parseChatGPTExportFile(file);
        setStatus(`Parsing ${parsed.conversationCount.toLocaleString()} conversations, all in your browser.`);
        const result = processMessages(parsed.messages, parsed.conversationCount, "upload");
        trackSnapshotEvent("upload", {
          token,
          source: "upload",
          conversations: result.overview.totalConversations,
          userMessages: result.overview.userMessages,
        });
        navigate({ to: withContactToken("/ai-snapshot/dashboard", token) });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Could not process this file.");
        setProcessing(false);
        setStatus(null);
      }
    },
    [clearAnalytics, navigate, processMessages, token],
  );

  const onDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setDragging(false);
    const file = event.dataTransfer.files?.[0];
    if (file) void handleFile(file);
  };

  return (
    <div className="relative min-h-screen bg-blueprint-base pt-24">
      <Seo
        title="Upload export"
        description="Upload your ChatGPT export zip or conversations JSON. Parsed entirely in your browser."
        path="/ai-snapshot/upload"
      />
      <BlueprintGrid opacity={0.35} />
      <div className="relative z-10 mx-auto max-w-3xl px-4 py-16">
        <BlueprintCard className="relative overflow-hidden p-0">
          <RegistrationTicks />
          <label
            htmlFor="ai-export-file"
            onDragOver={(event) => {
              event.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={onDrop}
            className={`block cursor-pointer px-8 py-16 text-center transition-colors ${dragging ? "bg-marker-start/5" : "bg-drafting-surface"}`}
          >
            <p className="font-display text-2xl font-semibold text-chalk">Drop your ChatGPT export here</p>
            <p className="mt-3 text-sm text-chalk/70">Accepts .zip or conversations JSON from your export</p>
            <input
              id="ai-export-file"
              type="file"
              accept=".zip,.json,application/zip,application/json"
              className="sr-only"
              disabled={processing}
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) void handleFile(file);
              }}
            />
          </label>
        </BlueprintCard>

        {status && (
          <p className="mt-4 font-mono text-sm uppercase tracking-[0.12em] text-chalk">{status}</p>
        )}
        {error && <p className="mt-4 text-sm text-redline">{error}</p>}

        <div className="mt-8 border-t border-chalk/10 pt-8 text-center">
          <p className="text-sm text-chalk/70">
            No data yet, or don't want to wait on ChatGPT?
          </p>
          <button
            type="button"
            disabled={processing}
            onClick={handleDummyData}
            className="mt-3 font-mono text-xs uppercase tracking-[0.14em] text-marker-start underline decoration-marker-start/40 underline-offset-4 transition-colors hover:text-accent-green hover:decoration-accent-green disabled:opacity-50"
          >
            See a dashboard with sample data
          </button>
          <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
            Same analysis pipeline. Still runs locally in your browser.
          </p>
        </div>

        <div className="mt-6">
          <PrivacyBanner bold />
        </div>
      </div>
    </div>
  );
}
