type WireframeVariant = "dashboard" | "map" | "schedule" | "landing";

interface WireframeProps {
  variant: WireframeVariant;
  className?: string;
}

const stroke = "stroke-chalk/60 [stroke-width:1.25]";
const fillSoft = "fill-chalk/10";
const fillSofter = "fill-chalk/[0.06]";
const accent = "fill-marker-start/70";

/**
 * Vector wireframe of a shipped screen, drawn in the blueprint line style.
 * Stands in for a product screenshot as labeled "system art" for live demos.
 */
export const Wireframe = ({ variant, className = "" }: WireframeProps) => {
  return (
    <svg
      viewBox="0 0 320 220"
      fill="none"
      className={className}
      role="img"
      aria-label={`Wireframe of a ${variant} screen`}
    >
      {/* screen + chrome */}
      <rect x="8" y="8" width="304" height="204" rx="4" className={`fill-drafting-surface ${stroke}`} />
      <line x1="8" y1="32" x2="312" y2="32" className={stroke} />
      <circle cx="22" cy="20" r="3" className="fill-chalk/25" />
      <circle cx="34" cy="20" r="3" className="fill-chalk/25" />
      <circle cx="46" cy="20" r="3" className="fill-chalk/25" />

      {variant === "dashboard" && (
        <>
          {/* sidebar */}
          <rect x="8" y="32" width="56" height="180" className={fillSofter} />
          <rect x="18" y="48" width="36" height="6" rx="2" className={fillSoft} />
          <rect x="18" y="62" width="36" height="6" rx="2" className={fillSoft} />
          <rect x="18" y="76" width="36" height="6" rx="2" className={accent} />
          {/* kpi row */}
          <rect x="76" y="46" width="64" height="34" rx="2" className={`fill-none ${stroke}`} />
          <rect x="150" y="46" width="64" height="34" rx="2" className={`fill-none ${stroke}`} />
          <rect x="224" y="46" width="76" height="34" rx="2" className={`fill-none ${stroke}`} />
          {/* chart */}
          <rect x="76" y="92" width="224" height="62" rx="2" className={`fill-none ${stroke}`} />
          <polyline points="86,140 116,120 146,128 176,104 206,112 236,96 286,100" className={`fill-none stroke-marker-start [stroke-width:1.5]`} />
          {/* table */}
          <rect x="76" y="166" width="224" height="8" rx="2" className={fillSoft} />
          <rect x="76" y="180" width="224" height="6" rx="2" className={fillSofter} />
          <rect x="76" y="192" width="224" height="6" rx="2" className={fillSofter} />
        </>
      )}

      {variant === "map" && (
        <>
          <rect x="76" y="40" width="236" height="172" className={fillSofter} />
          {/* map grid */}
          <line x1="130" y1="40" x2="130" y2="212" className="stroke-chalk/15" />
          <line x1="190" y1="40" x2="190" y2="212" className="stroke-chalk/15" />
          <line x1="250" y1="40" x2="250" y2="212" className="stroke-chalk/15" />
          <line x1="76" y1="96" x2="312" y2="96" className="stroke-chalk/15" />
          <line x1="76" y1="154" x2="312" y2="154" className="stroke-chalk/15" />
          {/* pins */}
          <circle cx="150" cy="90" r="5" className={accent} />
          <circle cx="232" cy="140" r="5" className={accent} />
          <circle cx="190" cy="176" r="5" className="fill-chalk/30" />
          {/* side panel */}
          <rect x="8" y="32" width="56" height="180" className={fillSofter} />
          <rect x="18" y="48" width="36" height="6" rx="2" className={fillSoft} />
          <rect x="18" y="62" width="36" height="6" rx="2" className={fillSoft} />
          <rect x="18" y="76" width="36" height="6" rx="2" className={fillSoft} />
        </>
      )}

      {variant === "schedule" && (
        <>
          <rect x="24" y="48" width="120" height="8" rx="2" className={fillSoft} />
          {/* calendar grid */}
          {[0, 1, 2, 3, 4].map((c) =>
            [0, 1, 2, 3].map((r) => (
              <rect
                key={`${c}-${r}`}
                x={24 + c * 56}
                y={68 + r * 34}
                width="48"
                height="26"
                rx="2"
                className={`fill-none ${stroke}`}
              />
            )),
          )}
          {/* filled shifts */}
          <rect x="24" y="68" width="48" height="26" rx="2" className={accent} />
          <rect x="136" y="102" width="48" height="26" rx="2" className="fill-chalk/15" />
          <rect x="248" y="136" width="48" height="26" rx="2" className="fill-chalk/15" />
        </>
      )}

      {variant === "landing" && (
        <>
          {/* nav */}
          <rect x="24" y="44" width="40" height="8" rx="2" className={accent} />
          <rect x="220" y="44" width="76" height="8" rx="2" className={fillSoft} />
          {/* hero */}
          <rect x="24" y="68" width="170" height="14" rx="2" className={fillSoft} />
          <rect x="24" y="90" width="130" height="14" rx="2" className={fillSoft} />
          <rect x="24" y="116" width="64" height="20" rx="2" className={accent} />
          {/* feature cols */}
          <rect x="24" y="156" width="84" height="44" rx="2" className={`fill-none ${stroke}`} />
          <rect x="118" y="156" width="84" height="44" rx="2" className={`fill-none ${stroke}`} />
          <rect x="212" y="156" width="84" height="44" rx="2" className={`fill-none ${stroke}`} />
        </>
      )}
    </svg>
  );
};
