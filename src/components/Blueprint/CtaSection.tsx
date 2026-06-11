import { Link } from "@tanstack/react-router";
import { BlueprintButton } from "./BlueprintButton";
import { BlueprintGrid } from "./BlueprintGrid";
import { DimensionLine } from "./DimensionLine";

interface CtaSectionProps {
  /** Mono dimension-line label. */
  kicker?: string;
  headline: string;
  body: string;
  buttonLabel?: string;
  /** Destination route. Defaults to the consultation page. */
  to?: string;
}

/**
 * Closing call to action, matching the editorial paper-and-grid treatment used
 * across the site. Every page funnels here.
 */
export const CtaSection = ({
  kicker = "next step",
  headline,
  body,
  buttonLabel = "Start a project",
  to = "/demo",
}: CtaSectionProps) => {
  return (
    <section className="relative overflow-hidden border-t border-chalk/10 bg-drafting-surface px-cell py-3cell">
      <BlueprintGrid opacity={0.5} />
      <div className="relative z-10 mx-auto max-w-7xl">
        <DimensionLine reveal label={kicker} className="mb-cell max-w-xs" />
        <h2 className="max-w-3xl font-display text-display-2 font-extrabold leading-[0.95] text-chalk">
          {headline}
        </h2>
        <p className="mt-cell max-w-2xl font-sans text-body text-chalk/70">{body}</p>
        <Link to={to} className="mt-2cell inline-block">
          <BlueprintButton size="lg">{buttonLabel}</BlueprintButton>
        </Link>
      </div>
    </section>
  );
};
