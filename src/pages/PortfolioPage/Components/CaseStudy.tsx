import type { ReactNode } from "react";

export interface CaseStudyData {
  index: number;
  client: string;
  system: string;
  built: string;
  stack: string[];
  scale: string;
  href?: string;
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

export const CaseStudy = ({
  index,
  client,
  system,
  built,
  stack,
  scale,
  href,
  asset,
}: CaseStudyData & { asset: ReactNode }) => {
  const external = href?.startsWith("http");

  const inner = (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-cell lg:gap-2cell items-center">
        {/* spec column */}
        <div>
          <div className="flex items-baseline gap-4 mb-cell">
            <span className="font-mono text-label-mono text-marker-start">
              {String(index).padStart(2, "0")}
            </span>
            <div>
              <p className="font-mono text-label-mono text-chalk/45 lowercase mb-1">
                {client}
              </p>
              <h3 className="font-display font-bold text-h text-chalk group-hover:text-marker-start transition-colors">
                {system}
              </h3>
            </div>
          </div>

          <SpecRow label="what we built">
            <p className="font-sans text-body text-chalk/80">{built}</p>
          </SpecRow>

          <SpecRow label="stack">
            <div className="flex flex-wrap gap-2">
              {stack.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-label-mono text-chalk/70 border border-chalk/15 rounded-spec px-2.5 py-1 lowercase"
                >
                  {tag}
                </span>
              ))}
            </div>
          </SpecRow>

          <SpecRow label="scale">
            <p className="font-mono text-label-mono text-marker-start lowercase leading-relaxed">
              {scale}
            </p>
          </SpecRow>
        </div>

        {/* asset column */}
        <div className="lg:pl-cell">{asset}</div>
      </div>
  );

  const base = "group block border-t border-chalk/15 py-2cell";

  if (href) {
    return (
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={`${base} transition-transform duration-150 ease-spec hover:-translate-y-px`}
      >
        {inner}
      </a>
    );
  }

  return <div className={base}>{inner}</div>;
};
