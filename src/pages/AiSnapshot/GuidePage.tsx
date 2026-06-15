import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { BlueprintButton } from "../../components/Blueprint/BlueprintButton";
import { BlueprintCard } from "../../components/Blueprint/BlueprintCard";
import { Seo } from "../../components/Seo";
import { withContactToken } from "../../lib/state/token";
import { trackSnapshotEvent } from "../../lib/tracking";
import { PrivacyBanner } from "./components/PrivacyBanner";
import { EXPORT_STEP_COUNT, Stepper } from "./components/Stepper";
import { useContactToken } from "./hooks/useContactToken";

export function GuidePage() {
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();
  const { token } = useContactToken();

  useEffect(() => {
    trackSnapshotEvent("guide", { token });
  }, [token]);

  return (
    <div className="min-h-screen bg-blueprint-base pt-24">
      <Seo
        title="Export guide"
        description="Step-by-step instructions to export your ChatGPT data for a browser-side AI usage snapshot."
        path="/ai-snapshot/guide"
      />
      <div className="mx-auto max-w-3xl px-4 py-16">
        <BlueprintCard className="p-8">
          <Stepper activeStep={activeStep} />
          <div className="mt-8 flex flex-wrap gap-3">
            <BlueprintButton
              variant="secondary"
              size="sm"
              disabled={activeStep === 0}
              onClick={() => setActiveStep((step) => Math.max(0, step - 1))}
            >
              Back
            </BlueprintButton>
            {activeStep < EXPORT_STEP_COUNT - 1 ? (
              <BlueprintButton size="sm" onClick={() => setActiveStep((step) => step + 1)}>
                Next step
              </BlueprintButton>
            ) : (
              <BlueprintButton
                size="sm"
                onClick={() =>
                  navigate({ to: withContactToken("/ai-snapshot/upload", token) })
                }
              >
                I have my export, continue
              </BlueprintButton>
            )}
          </div>
        </BlueprintCard>
        <div className="mt-6">
          <PrivacyBanner />
        </div>
      </div>
    </div>
  );
}
