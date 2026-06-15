import { useNavigate } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { BlueprintGrid } from "../../components/Blueprint/BlueprintGrid";
import { BlueprintCard } from "../../components/Blueprint/BlueprintCard";
import { SpecLabel } from "../../components/Blueprint/SpecLabel";
import { Seo } from "../../components/Seo";
import {
  encodeContactToken,
  saveStoredContact,
  withContactToken,
} from "../../lib/state/token";
import { useSnapshot } from "../../lib/state/snapshotContext";
import { trackSnapshotEvent } from "../../lib/tracking";
import { PrivacyBanner } from "./components/PrivacyBanner";

declare global {
  interface Window {
    hbspt?: {
      forms: {
        create: (options: {
          portalId: string;
          formId: string;
          target: string;
          onFormSubmitted?: ($form: HTMLFormElement) => void;
        }) => void;
      };
    };
  }
}

const HUBSPOT_PORTAL = import.meta.env.VITE_HUBSPOT_PORTAL_ID;
const HUBSPOT_FORM = import.meta.env.VITE_HUBSPOT_FORM_ID;

export function EntryPage() {
  const navigate = useNavigate();
  const { setContact } = useSnapshot();
  const formRef = useRef<HTMLDivElement>(null);
  const hubspotLoaded = useRef(false);

  useEffect(() => {
    trackSnapshotEvent("entry");
  }, []);

  useEffect(() => {
    if (!HUBSPOT_PORTAL || !HUBSPOT_FORM || !formRef.current || hubspotLoaded.current) return;

    const mountForm = () => {
      if (!window.hbspt || !formRef.current) return;
      hubspotLoaded.current = true;
      window.hbspt.forms.create({
        portalId: HUBSPOT_PORTAL,
        formId: HUBSPOT_FORM,
        target: "#ai-snapshot-hubspot-form",
        onFormSubmitted: ($form) => {
          const email =
            ($form.querySelector('input[name="email"]') as HTMLInputElement | null)?.value ?? "";
          const firstName =
            ($form.querySelector('input[name="firstname"]') as HTMLInputElement | null)?.value ?? "";
          const lastName =
            ($form.querySelector('input[name="lastname"]') as HTMLInputElement | null)?.value ?? "";
          const company =
            ($form.querySelector('input[name="company"]') as HTMLInputElement | null)?.value ?? "";
          const role =
            ($form.querySelector('input[name="jobtitle"]') as HTMLInputElement | null)?.value ?? "";

          const contact = { email, firstName, lastName, company, role };
          saveStoredContact(contact);
          setContact(contact);
          const token = encodeContactToken(email);
          navigate({ to: withContactToken("/ai-snapshot/guide", token) });
        },
      });
    };

    if (window.hbspt) {
      mountForm();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://js.hsforms.net/forms/embed/v2.js";
    script.async = true;
    script.onload = mountForm;
    document.body.appendChild(script);
  }, [navigate, setContact]);

  const handleFallbackSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "").trim();
    const contact = {
      firstName: String(formData.get("firstName") ?? "").trim(),
      lastName: String(formData.get("lastName") ?? "").trim(),
      email,
      company: String(formData.get("company") ?? "").trim(),
      role: String(formData.get("role") ?? "").trim(),
    };

    if (!email) return;
    saveStoredContact(contact);
    setContact(contact);
    const token = encodeContactToken(email);
    navigate({ to: withContactToken("/ai-snapshot/guide", token) });
  };

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
          {HUBSPOT_PORTAL && HUBSPOT_FORM ? (
            <div id="ai-snapshot-hubspot-form" ref={formRef} />
          ) : (
            <form className="space-y-4" onSubmit={handleFallbackSubmit}>
              <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted">
                Development intake form (set VITE_HUBSPOT_* for production HubSpot embed)
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  name="firstName"
                  placeholder="First name"
                  required
                  className="w-full rounded-spec border border-chalk/15 bg-blueprint-base px-4 py-3 text-chalk"
                />
                <input
                  name="lastName"
                  placeholder="Last name"
                  required
                  className="w-full rounded-spec border border-chalk/15 bg-blueprint-base px-4 py-3 text-chalk"
                />
              </div>
              <input
                name="email"
                type="email"
                placeholder="Work email"
                required
                className="w-full rounded-spec border border-chalk/15 bg-blueprint-base px-4 py-3 text-chalk"
              />
              <input
                name="company"
                placeholder="Company"
                required
                className="w-full rounded-spec border border-chalk/15 bg-blueprint-base px-4 py-3 text-chalk"
              />
              <input
                name="role"
                placeholder="Role"
                required
                className="w-full rounded-spec border border-chalk/15 bg-blueprint-base px-4 py-3 text-chalk"
              />
              <button
                type="submit"
                className="w-full rounded-spec bg-marker-start px-6 py-3 font-display font-bold text-marker-ink"
              >
                Continue to export guide
              </button>
            </form>
          )}
        </BlueprintCard>

        <div className="mt-6">
          <PrivacyBanner />
        </div>
      </div>
    </div>
  );
}
