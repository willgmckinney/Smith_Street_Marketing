import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { BlueprintButton } from "../../components/Blueprint/BlueprintButton";
import { BlueprintGrid } from "../../components/Blueprint/BlueprintGrid";
import { SpecLabel } from "../../components/Blueprint/SpecLabel";
import { Seo } from "../../components/Seo";
import {
  DUMMY_CONVERSATION_COUNT,
  getDummySnapshotMessages,
} from "../../data/aiSnapshotDummyData";
import { AI_PROVIDER_LABELS } from "../../lib/aiProviders";
import { useSnapshot } from "../../lib/state/snapshotContext";
import { withContactToken } from "../../lib/state/token";
import { trackSnapshotEvent } from "../../lib/tracking";
import { PrivacyBanner } from "./components/PrivacyBanner";
import { useContactToken } from "./hooks/useContactToken";

export function ComingSoonPage() {
  const navigate = useNavigate();
  const { token } = useContactToken();
  const { contact, processMessages } = useSnapshot();

  useEffect(() => {
    trackSnapshotEvent("entry", {
      token,
      step: "coming_soon",
      providers: contact.aiProviders ?? [],
    });
  }, [token, contact.aiProviders]);

  const selectedLabels = (contact.aiProviders ?? [])
    .filter((provider) => provider !== "chatgpt")
    .map((provider) => AI_PROVIDER_LABELS[provider]);

  const handleViewDemo = () => {
    const messages = getDummySnapshotMessages();
    processMessages(messages, DUMMY_CONVERSATION_COUNT, "sample");
    trackSnapshotEvent("dashboard", { token, dummy: true, source: "coming_soon" });
    navigate({ to: withContactToken("/ai-snapshot/dashboard", token) });
  };

  return (
    <div className="relative min-h-screen bg-blueprint-base pt-24">
      <Seo
        title="Other AI tools coming soon"
        description="ChatGPT is live today. Claude, Gemini, Copilot, and Amazon Quick are on the way. View the demo dashboard in the meantime."
        path="/ai-snapshot/coming-soon"
      />
      <BlueprintGrid opacity={0.45} />

      <section className="relative z-10 mx-auto max-w-3xl px-cell py-4cell">
        <div className="space-y-cell">
          <SpecLabel className="mb-0">ai snapshot · coming soon</SpecLabel>

          <h1 className="font-display text-display-2 font-bold text-chalk">
            Other tools are on the way
          </h1>

          <p className="max-w-prose text-body text-chalk">
            We're currently building out the required data formats for other AI tools. ChatGPT is
            live today, and the rest are on the way.
          </p>

          {selectedLabels.length > 0 && (
            <p className="max-w-prose font-mono text-label-mono uppercase text-muted">
              waiting on
              <span className="ml-2 text-chalk">{selectedLabels.join(" · ")}</span>
            </p>
          )}
        </div>

        <div className="mt-2cell">
          <BlueprintButton onClick={handleViewDemo}>
            View the demo dashboard
          </BlueprintButton>
        </div>

        <div className="mt-2cell">
          <PrivacyBanner />
        </div>
      </section>
    </div>
  );
}
