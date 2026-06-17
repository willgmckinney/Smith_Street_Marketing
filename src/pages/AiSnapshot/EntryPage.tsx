import { useNavigate } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { BlueprintGrid } from "../../components/Blueprint/BlueprintGrid";
import { BlueprintCard } from "../../components/Blueprint/BlueprintCard";
import { SpecLabel } from "../../components/Blueprint/SpecLabel";
import { Seo } from "../../components/Seo";
import { normalizeAiProviders } from "../../lib/aiProviders";
import {
  encodeContactToken,
  saveStoredContact,
  withContactToken,
} from "../../lib/state/token";
import { useSnapshot } from "../../lib/state/snapshotContext";
import { trackSnapshotEvent } from "../../lib/tracking";
import { PrivacyBanner } from "./components/PrivacyBanner";

type FieldValue = string | string[] | number | boolean | null | undefined;
type HubSpotFormField = { name: string; value: FieldValue };

type HubSpotFormV4Instance = {
  getFormId: () => string;
  getFormFieldValues: () => Promise<HubSpotFormField[]>;
};

declare global {
  interface Window {
    HubSpotFormsV4?: {
      getFormFromEvent: (event: Event) => HubSpotFormV4Instance | null;
    };
  }
}

const HUBSPOT_PORTAL = import.meta.env.VITE_HUBSPOT_PORTAL_ID ?? "245672611";
const HUBSPOT_FORM = import.meta.env.VITE_HUBSPOT_FORM_ID ?? "02f2722e-8f4a-471e-8f84-a9b2c87893e3";
const HUBSPOT_REGION = import.meta.env.VITE_HUBSPOT_REGION ?? "na2";
const HUBSPOT_AI_APPLICATIONS_FIELD =
  import.meta.env.VITE_HUBSPOT_AI_APPLICATIONS_FIELD ?? "agentic_ai_applications";

const HUBSPOT_EMBED_SRC = `https://js-${HUBSPOT_REGION}.hsforms.net/forms/embed/${HUBSPOT_PORTAL}.js`;

function ensureHubspotEmbed(): void {
  if (typeof document === "undefined") return;
  if (document.querySelector<HTMLScriptElement>(`script[src="${HUBSPOT_EMBED_SRC}"]`)) {
    return;
  }
  const script = document.createElement("script");
  script.src = HUBSPOT_EMBED_SRC;
  script.defer = true;
  document.body.appendChild(script);
}

/**
 * V4 form field names are namespaced like "0-1/firstname". Match by exact
 * name or suffix so we don't have to hardcode the section index.
 */
function findField(fields: HubSpotFormField[], ...names: string[]): FieldValue {
  for (const name of names) {
    const match = fields.find(
      (field) => field.name === name || field.name.endsWith(`/${name}`),
    );
    if (match) return match.value;
  }
  return undefined;
}

function toString(value: FieldValue): string {
  if (typeof value === "string") return value.trim();
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  if (Array.isArray(value)) {
    return value.map((part) => String(part).trim()).filter(Boolean).join("; ");
  }
  return "";
}

function toArray(value: FieldValue): string[] {
  if (Array.isArray(value)) {
    return value.map((part) => String(part).trim()).filter(Boolean);
  }
  if (typeof value === "string" && value.trim()) {
    return value
      .split(/[;,]/)
      .map((part) => part.trim())
      .filter(Boolean);
  }
  return [];
}

type SubmissionEventDetail = { formId?: string; instanceId?: string };

export function EntryPage() {
  const navigate = useNavigate();
  const { setContact } = useSnapshot();
  const navigateRef = useRef(navigate);
  const setContactRef = useRef(setContact);
  const handledRef = useRef(false);

  navigateRef.current = navigate;
  setContactRef.current = setContact;

  useEffect(() => {
    trackSnapshotEvent("entry");
  }, []);

  useEffect(() => {
    ensureHubspotEmbed();

    const handleSuccess = (event: Event) => {
      if (handledRef.current) return;

      const detail = (event as CustomEvent<SubmissionEventDetail>).detail;
      if (detail?.formId && detail.formId !== HUBSPOT_FORM) return;

      const formApi = window.HubSpotFormsV4?.getFormFromEvent(event);
      if (!formApi) {
        console.warn("[ai-snapshot] HubSpotFormsV4 unavailable on submission event");
        return;
      }

      handledRef.current = true;

      void formApi
        .getFormFieldValues()
        .then((fields) => {
          const email = toString(findField(fields, "email"));
          if (!email) {
            handledRef.current = false;
            return;
          }

          const providers = normalizeAiProviders(
            toArray(findField(fields, HUBSPOT_AI_APPLICATIONS_FIELD)),
          );

          const contact = {
            email,
            firstName: toString(findField(fields, "firstname")),
            lastName: toString(findField(fields, "lastname")),
            company: toString(findField(fields, "company", "name")),
            role: toString(findField(fields, "jobtitle")),
            aiProviders: providers,
          };

          saveStoredContact(contact);
          setContactRef.current(contact);

          const token = encodeContactToken(email);
          const destination = providers.includes("chatgpt")
            ? "/ai-snapshot/guide"
            : "/ai-snapshot/coming-soon";

          navigateRef.current({ to: withContactToken(destination, token) });
        })
        .catch((err) => {
          handledRef.current = false;
          console.error("[ai-snapshot] failed to read HubSpot form fields", err);
        });
    };

    window.addEventListener("hs-form-event:on-submission:success", handleSuccess);
    return () => {
      window.removeEventListener("hs-form-event:on-submission:success", handleSuccess);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-blueprint-base pt-24">
      <Seo
        title="AI Usage Snapshot"
        description="Export your ChatGPT data and get an instant browser-side dashboard of AI usage and exposure risk. Nothing is uploaded."
        path="/ai-snapshot"
      />
      <BlueprintGrid opacity={0.45} />
      <div className="relative z-10 mx-auto max-w-3xl px-4 py-16">
        <SpecLabel className="mb-4">ai usage & exposure snapshot</SpecLabel>
        <h1 className="font-display text-display-2 font-bold text-chalk">
          See what your ChatGPT export reveals
        </h1>
        <p className="mt-4 max-w-2xl text-body text-chalk/80">
          Upload your export and get an instant dashboard of usage patterns and exposure risk. Parsed
          entirely in your browser.
        </p>

        <BlueprintCard className="mt-10 p-8">
          <div
            className="hs-form-frame"
            data-region={HUBSPOT_REGION}
            data-form-id={HUBSPOT_FORM}
            data-portal-id={HUBSPOT_PORTAL}
          />
        </BlueprintCard>
      </div>
    </div>
  );
}
