import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

export interface SolutionData {
  index: number;
  category: string;
  title: string;
  includes: string;
  delivery: string;
  services: string[];
  to: string;
  figure: number;
  caption: string;
  asset: ReactNode;
}

const SpecRow = ({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) => (
  <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-1 sm:gap-4 py-3 border-t border-chalk/10">
    <span className="font-mono text-label-mono text-chalk/45 lowercase pt-1">
      {label}
    </span>
    <div>{children}</div>
  </div>
);

/**
 * Solution entry on /solutions. Mirrors the portfolio case-study card, with
 * offering-level rows (what it includes, delivery model, aws services) in place
 * of the engagement rows.
 */
export const SolutionCard = ({
  index,
  category,
  title,
  includes,
  delivery,
  services,
  to,
  asset,
}: SolutionData & { asset: ReactNode }) => (
  <Link
    to={to}
    className="group block border-t border-chalk/15 py-2cell transition-transform duration-150 ease-spec hover:-translate-y-px"
  >
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-cell lg:gap-2cell items-center">
      {/* spec column */}
      <div>
        <div className="flex items-baseline gap-4 mb-cell">
          <span className="font-mono text-label-mono text-marker-start">
            {String(index).padStart(2, "0")}
          </span>
          <div>
            <p className="font-mono text-label-mono text-chalk/45 lowercase mb-1">
              {category}
            </p>
            <h3 className="font-display font-bold text-h text-chalk group-hover:text-marker-start transition-colors">
              {title}
            </h3>
          </div>
        </div>

        <SpecRow label="what it includes">
          <p className="font-sans text-body text-chalk/80">{includes}</p>
        </SpecRow>

        <SpecRow label="delivery model">
          <p className="font-sans text-body text-chalk/80">{delivery}</p>
        </SpecRow>

        <SpecRow label="aws services">
          <div className="flex flex-wrap gap-2">
            {services.map((tag) => (
              <span
                key={tag}
                className="font-mono text-label-mono text-chalk/70 border border-chalk/15 rounded-spec px-2.5 py-1 lowercase"
              >
                {tag}
              </span>
            ))}
          </div>
        </SpecRow>
      </div>

      {/* asset column */}
      <div className="lg:pl-cell">{asset}</div>
    </div>
  </Link>
);
