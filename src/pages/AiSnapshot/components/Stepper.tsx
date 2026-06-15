import { motion, useReducedMotion } from "framer-motion";
import { AssetFrame } from "../../../components/Blueprint/AssetFrame";

const STEPS = [
  {
    title: "Open ChatGPT settings",
    body: "Click your profile, then Settings.",
    image: "/how_to_guide_pics/Step1.png",
    alt: "ChatGPT profile menu with Settings highlighted",
  },
  {
    title: "Request your export",
    body: "Go to Data controls, choose Export data, and confirm.",
    image: "/how_to_guide_pics/Step2.png",
    alt: "ChatGPT Data controls screen with Export data option",
  },
  {
    title: "Wait for the email",
    body: "ChatGPT sends a download link. It can take minutes to hours.",
    image: "/how_to_guide_pics/Step3.png",
    alt: "Email from OpenAI with a link to download your ChatGPT data export",
  },
  {
    title: "Download the zip",
    body: "Save the export file from the email link.",
    image: "/how_to_guide_pics/Step4.png",
    alt: "Browser download prompt for the ChatGPT export zip file",
  },
  {
    title: "Upload it here",
    body: "The zip stays on your computer. We never receive it.",
    image: "/how_to_guide_pics/Step5.png",
    alt: "Smith Avenue Insights upload page with a zip file ready to drop",
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
        <div className="mt-6">
          <AssetFrame figure={activeStep + 1} caption={step.title.toLowerCase()}>
            <img
              src={step.image}
              alt={step.alt}
              className="w-full h-auto max-h-[420px] object-contain object-top"
              loading={activeStep === 0 ? "eager" : "lazy"}
            />
          </AssetFrame>
        </div>
      </motion.div>
    </div>
  );
}

export const EXPORT_STEP_COUNT = STEPS.length;
