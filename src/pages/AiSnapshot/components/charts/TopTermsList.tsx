import type { TermCount } from "../../../../lib/analytics/terms";
import { formatCount } from "../../../../lib/format";
import { SpecLabel } from "../../../../components/Blueprint/SpecLabel";
import { SnapshotCard } from "../SnapshotCard";

export function TopTermsList({ terms }: { terms: TermCount[] }) {
  const max = terms[0]?.count ?? 1;

  return (
    <SnapshotCard>
      <SpecLabel>top terms</SpecLabel>
      <div className="mt-6 space-y-3">
        {terms.length === 0 ? (
          <p className="text-sm text-chalk/70">Not enough text to rank terms.</p>
        ) : (
          terms.map((term) => (
            <div key={term.term} className="grid grid-cols-[1fr_auto] items-center gap-4">
              <div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm text-chalk">{term.term}</span>
                  <span className="font-mono text-xs text-muted">{formatCount(term.count)}</span>
                </div>
                <div className="mt-2 h-2 bg-marker-start/10">
                  <div
                    className="h-full bg-marker-start/40"
                    style={{ width: `${Math.max(8, (term.count / max) * 100)}%` }}
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </SnapshotCard>
  );
}
