import { motion, useReducedMotion } from "framer-motion";

const STEPS = [
  {
    title: "Open ChatGPT settings",
    body: "Click your profile, then Settings.",
  },
  {
    title: "Request your export",
    body: "Go to Data controls, choose Export data, and confirm.",
  },
  {
    title: "Wait for the email",
    body: "ChatGPT sends a download link. It can take minutes to hours.",
  },
  {
    title: "Download the zip",
    body: "Save the export file from the email link.",
  },
  {
    title: "Upload it here",
    body: "The zip stays on your computer. We never receive it.",
  },
];

export function Stepper({ activeStep }: { activeStep: number }) {
  const reduce = useReducedMotion();
  const step = STEPS[activeStep] ?? STEPS[0];

  return (
    <div>
      <div className="mb-6 flex gap-2">
        {STEPS.map((_, index) => (
          <span
            key={index}
            className={`h-1 flex-1 ${index <= activeStep ? "bg-marker-start" : "bg-chalk/10"}`}
          />
        ))}
      </div>
      <motion.div
        key={activeStep}
        initial={reduce ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
          step {activeStep + 1} of {STEPS.length}
        </p>
        <h2 className="mt-3 font-display text-2xl font-semibold text-chalk">{step.title}</h2>
        <p className="mt-3 text-body text-chalk/80">{step.body}</p>
        <div className="mt-6 flex h-40 items-center justify-center border border-dashed border-chalk/20 bg-blueprint-base text-sm text-muted">
          Screenshot placeholder for step {activeStep + 1}
        </div>
      </motion.div>
    </div>
  );
}

export const EXPORT_STEP_COUNT = STEPS.length;
