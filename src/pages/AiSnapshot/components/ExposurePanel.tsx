import type { ExposureResult } from "../../../lib/analytics/exposure";
import { formatCount } from "../../../lib/format";
import { DimensionLine } from "../../../components/Blueprint/DimensionLine";
import { SpecLabel } from "../../../components/Blueprint/SpecLabel";
import { SnapshotCard } from "./SnapshotCard";

const TYPE_ICONS: Record<string, string> = {
  Email: "@",
  "Phone number": "#",
  "API key or token": "key",
  "Credit card": "$",
  SSN: "id",
  "IP address": "ip",
  "Credentials in prose": "lock",
};

export function ExposurePanel({
  exposure,
  prominent = false,
  compact = false,
}: {
  exposure: ExposureResult;
  prominent?: boolean;
  compact?: boolean;
}) {
  const hits = compact ? exposure.hits.slice(0, 4) : exposure.hits;

  return (
    <SnapshotCard risk className={prominent ? "p-8 md:p-10" : compact ? "!p-3" : ""}>
      <SpecLabel className={`text-redline ${compact ? "!text-[10px]" : ""}`}>exposure panel</SpecLabel>
      {!compact && (
        <>
          <p className={`mt-4 font-display font-bold text-redline ${prominent ? "text-6xl md:text-7xl" : "text-5xl"}`}>
            {formatCount(exposure.headlineCount)}
          </p>
          <p className="mt-2 font-mono text-xs uppercase tracking-[0.14em] text-chalk">
            likely secrets or pii detected
          </p>
          <DimensionLine className="mt-4" label="across this export" />
        </>
      )}

      <div className={`${compact ? "mt-2 grid grid-cols-2 gap-2" : `mt-6 ${prominent ? "grid gap-4 md:grid-cols-2" : "space-y-4"}`}`}>
        {exposure.hits.length === 0 ? (
          <p className="text-sm text-chalk/80 md:col-span-2">
            No obvious secrets or PII patterns detected in user prompts.
          </p>
        ) : (
          hits.map((hit) => (
            <div key={hit.type} className={`border border-redline/15 bg-redline-wash/40 ${compact ? "p-2" : "p-4"}`}>
              <div className="flex items-center gap-2">
                <span className={`flex items-center justify-center border border-redline/30 font-mono text-redline ${compact ? "h-6 w-6 text-[10px]" : "h-8 w-8 text-xs"}`}>
                  {TYPE_ICONS[hit.type] ?? "!"}
                </span>
                <div>
                  <p className={`font-mono uppercase tracking-[0.12em] text-chalk ${compact ? "text-[9px]" : "text-xs"}`}>
                    {hit.type}
                  </p>
                  <p className={`font-display font-bold text-chalk ${compact ? "text-lg" : "text-2xl"}`}>
                    {formatCount(hit.count)}
                  </p>
                </div>
              </div>
              {!compact && hit.samples.length > 0 && (
                <div className="mt-3 space-y-1">
                  {hit.samples.map((sample) => (
                    <p key={sample} className="font-mono text-xs text-chalk/80">
                      {sample}
                    </p>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {exposure.flaggedPromptCount > 0 && !compact && (
        <p className="mt-6 font-mono text-xs uppercase tracking-[0.12em] text-muted">
          {formatCount(exposure.flaggedPromptCount)} prompts contained at least one match
        </p>
      )}

      {!compact && (
      <p className="mt-8 text-sm text-chalk">
        This is one person. Now imagine your{" "}
        <span className="font-semibold text-marker-start">whole company</span>, with no visibility and
        no controls.
      </p>
      )}
    </SnapshotCard>
  );
}
