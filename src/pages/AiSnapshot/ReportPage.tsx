import { useEffect } from "react";
import { Seo } from "../../components/Seo";
import { useSnapshot } from "../../lib/state/snapshotContext";
import { trackSnapshotEvent } from "../../lib/tracking";
import { ReportDocument } from "./components/ReportDocument";

export function ReportPage() {
  const { analytics } = useSnapshot();

  useEffect(() => {
    let el = document.head.querySelector<HTMLMetaElement>('meta[name="robots"]');
    const created = !el;
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute("name", "robots");
      document.head.appendChild(el);
    }
    const previous = el.getAttribute("content");
    el.setAttribute("content", "noindex, follow");
    return () => {
      if (created) el?.remove();
      else if (previous) el?.setAttribute("content", previous);
      else el?.removeAttribute("content");
    };
  }, []);

  useEffect(() => {
    trackSnapshotEvent("report");
  }, []);

  if (!analytics) {
    return (
      <div className="min-h-screen bg-blueprint-base p-8 text-chalk">
        No snapshot loaded.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blueprint-base py-10 text-chalk print:py-0">
      <Seo
        title="AI snapshot report"
        description="Printable AI usage and exposure snapshot report."
        path="/ai-snapshot/report"
      />
      <div className="mx-auto max-w-3xl px-4 print:max-w-none print:px-0">
        <ReportDocument analytics={analytics} />
      </div>
    </div>
  );
}
