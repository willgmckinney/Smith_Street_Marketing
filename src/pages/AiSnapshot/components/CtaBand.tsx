import { BlueprintButton } from "../../../components/Blueprint/BlueprintButton";
import { withContactToken } from "../../../lib/state/token";
import { trackSnapshotEvent } from "../../../lib/tracking";

export function CtaBand({
  token,
  onDownloadPdf,
  downloading = false,
}: {
  token?: string | null;
  onDownloadPdf: () => void;
  downloading?: boolean;
}) {
  const bookHref = withContactToken("/demo?utm_source=ai-snapshot", token ?? null);

  return (
    <div className="sticky bottom-0 z-20 border-t border-chalk/15 bg-drafting-surface/95 backdrop-blur px-4 py-4">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row">
          <BlueprintButton size="md" onClick={onDownloadPdf} disabled={downloading}>
            {downloading ? "Building PDF..." : "Download PDF report"}
          </BlueprintButton>
          <a
            href={bookHref}
            onClick={() => trackSnapshotEvent("book_call_clicked", { token })}
          >
            <BlueprintButton variant="outline" size="md" className="w-full sm:w-auto">
              Book a call to make this yours
            </BlueprintButton>
          </a>
        </div>
        <p className="max-w-md text-sm text-chalk/70">
          This is a sample of one export. We build the org-wide version, with live monitoring and
          controls. Let's scope it.
        </p>
      </div>
    </div>
  );
}
