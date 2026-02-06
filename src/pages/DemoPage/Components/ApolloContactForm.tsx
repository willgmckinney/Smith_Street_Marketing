import { useEffect, useRef, useState } from "react";
import { SummitButton } from "../../../components/Summit/SummitButton";

const APOLLO_FORM_ID = "apollo-demo-form";

const inputBase =
  "w-full rounded-xl px-4 py-3.5 text-deep-horizon placeholder:text-atmospheric-haze/50 border-2 bg-white/80 backdrop-blur-sm transition-all duration-300 ease-bouncy focus:outline-none focus:border-golden-hour-start focus:ring-4 focus:ring-golden-hour-start/15 focus:bg-white hover:border-atmospheric-haze/40";

export const ApolloContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{
    name?: string;
    email?: string;
  }>({});
  const succeededRef = useRef(false);
  const fallbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Watch for Apollo overlay being removed from the DOM (user closed calendar)
  useEffect(() => {
    if (!isSubmitting) return;

    const observer = new MutationObserver(() => {
      const apolloOverlay =
        document.querySelector("iframe[src*='apollo']") ||
        document.querySelector("[class*='apollo']") ||
        document.querySelector("[id*='apollo-overlay']");

      if (!apolloOverlay && succeededRef.current === false) {
        setTimeout(() => {
          if (!succeededRef.current) {
            setIsSubmitting(false);
            if (fallbackTimerRef.current)
              clearTimeout(fallbackTimerRef.current);
          }
        }, 500);
      }
    });

    const startTimer = setTimeout(() => {
      observer.observe(document.body, { childList: true, subtree: true });
    }, 2000);

    return () => {
      clearTimeout(startTimer);
      observer.disconnect();
    };
  }, [isSubmitting]);

  const validateFields = (form: HTMLFormElement) => {
    const formData = new FormData(form);
    const name = (formData.get("name") as string)?.trim() ?? "";
    const email = (formData.get("email") as string)?.trim() ?? "";
    const errors: { name?: string; email?: string } = {};

    if (!name) errors.name = "Please enter your name.";
    if (!email) {
      errors.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Please enter a valid email address.";
    }

    return errors;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    succeededRef.current = false;

    const errors = validateFields(e.currentTarget);
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    if (!window.ApolloMeetings) {
      setError(
        "Our scheduling tool is still loading. Please wait a moment and try again.",
      );
      return;
    }

    setIsSubmitting(true);
    fallbackTimerRef.current = setTimeout(() => {
      setIsSubmitting(false);
      setError("Something took too long. Please try again.");
    }, 30000);

    window.ApolloMeetings.submit({
      formId: APOLLO_FORM_ID,
      onSuccess: () => {
        succeededRef.current = true;
        if (fallbackTimerRef.current) clearTimeout(fallbackTimerRef.current);
        setIsSubmitting(false);
      },
      onError: () => {
        if (fallbackTimerRef.current) clearTimeout(fallbackTimerRef.current);
        setIsSubmitting(false);
        setError(
          "Something went wrong opening the calendar. Please try again.",
        );
      },
    });
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white via-granite/30 to-golden-hour-start/5 p-6 sm:p-8 shadow-rim-card border border-white/60">
      {/* Soft accent glow */}
      <div
        className="pointer-events-none absolute -top-12 -right-12 h-32 w-32 rounded-full bg-golden-hour-start/10 blur-3xl"
        aria-hidden
      />

      <div className="relative space-y-6">
        <div className="space-y-2">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-deep-horizon leading-tight">
            Let's find a time that works
          </h2>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-1 text-xs text-atmospheric-haze/70">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-golden-hour-start" />
              ~30 min
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-golden-hour-start" />
              No commitment
            </span>
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-600 text-sm">
            {error}
          </div>
        )}

        <form
          id={APOLLO_FORM_ID}
          onSubmit={handleSubmit}
          noValidate
          className="space-y-5"
        >
          <div className="space-y-2">
            <label
              htmlFor="apollo-name"
              className="block text-sm font-semibold text-deep-horizon/90"
            >
              Full name
            </label>
            <input
              id="apollo-name"
              type="text"
              name="name"
              autoComplete="name"
              placeholder="e.g. Jordan Smith"
              className={`${inputBase} ${fieldErrors.name ? "border-red-400" : "border-atmospheric-haze/20"}`}
              onChange={() =>
                fieldErrors.name &&
                setFieldErrors((prev) => ({ ...prev, name: undefined }))
              }
            />
            {fieldErrors.name && (
              <p className="mt-1 text-red-500 text-xs">{fieldErrors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="apollo-email"
              className="block text-sm font-semibold text-deep-horizon/90"
            >
              Email address
            </label>
            <input
              id="apollo-email"
              type="email"
              name="email"
              autoComplete="email"
              placeholder="you@company.com"
              className={`${inputBase} ${fieldErrors.email ? "border-red-400" : "border-atmospheric-haze/20"}`}
              onChange={() =>
                fieldErrors.email &&
                setFieldErrors((prev) => ({ ...prev, email: undefined }))
              }
            />
            {fieldErrors.email && (
              <p className="mt-1 text-red-500 text-xs">{fieldErrors.email}</p>
            )}
          </div>

          <div className="pt-3">
            <SummitButton
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto min-w-[200px] group"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-deep-horizon/30 border-t-deep-horizon" />
                  Opening calendar…
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Continue to calendar
                  <svg
                    className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </span>
              )}
            </SummitButton>
          </div>
        </form>
      </div>
    </div>
  );
};
