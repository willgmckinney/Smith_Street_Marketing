import { useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Seo } from "../../components/Seo";
import { formatCount } from "../../lib/format";
import { buildPdfFilename, exportReportPdf, PDF_EXPORT_WIDTH_PX } from "../../lib/pdf/export";
import { useSnapshot } from "../../lib/state/snapshotContext";
import { withContactToken } from "../../lib/state/token";
import { trackSnapshotEvent } from "../../lib/tracking";
import { CtaBand } from "./components/CtaBand";
import { DepthChart } from "./components/charts/DepthChart";
import { HeatmapChart } from "./components/charts/HeatmapChart";
import { TopTermsList } from "./components/charts/TopTermsList";
import { TopicChart } from "./components/charts/TopicChart";
import { UsageChart } from "./components/charts/UsageChart";
import { ExposurePanel } from "./components/ExposurePanel";
import { KpiRow } from "./components/KpiCard";
import { ReportDocument } from "./components/ReportDocument";
import { useContactToken } from "./hooks/useContactToken";

export function DashboardPage() {
  const { analytics } = useSnapshot();
  const navigate = useNavigate();
  const { token } = useContactToken();
  const [downloading, setDownloading] = useState(false);
  const pdfSourceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!analytics) {
      navigate({ to: withContactToken("/ai-snapshot/upload", token) });
      return;
    }
    trackSnapshotEvent("dashboard", { token });
  }, [analytics, navigate, token]);

  if (!analytics) return null;

  const handleDownloadPdf = async () => {
    setDownloading(true);
    trackSnapshotEvent("pdf_downloaded", { token });

    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      const source = pdfSourceRef.current;
      if (!source) return;
      await exportReportPdf(source, buildPdfFilename(analytics.generatedAt));
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blueprint-base pb-28">
      <Seo
        title="AI snapshot dashboard"
        description="Browser-side AI usage and exposure snapshot from your ChatGPT export."
        path="/ai-snapshot/dashboard"
      />

      <div
        ref={pdfSourceRef}
        aria-hidden
        className="pointer-events-none fixed top-0 -z-10"
        style={{ width: PDF_EXPORT_WIDTH_PX, left: -PDF_EXPORT_WIDTH_PX - 32 }}
      >
        <ReportDocument analytics={analytics} compact />
      </div>

      <section className="bg-chalk px-4 py-12 text-drafting-surface md:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-drafting-surface/60">
            ai usage & exposure snapshot
          </p>
          <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_1.1fr]">
            <div>
              <p className="font-display text-5xl font-bold text-redline md:text-6xl">
                {formatCount(analytics.exposure.headlineCount)}
              </p>
              <p className="mt-2 font-mono text-xs uppercase tracking-[0.14em]">
                likely secrets or pii detected
              </p>
            </div>
            <div>
              <p className="font-display text-xl font-semibold leading-snug md:text-2xl">
                {analytics.persona}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-8 px-4 py-10 md:px-8">
        <ExposurePanel exposure={analytics.exposure} prominent />
        <KpiRow overview={analytics.overview} />
        <UsageChart data={analytics.usageOverTime} trend={analytics.usageTrend} />
        <HeatmapChart stats={analytics.timeOfDay} />
        <TopicChart topics={analytics.topics} />
        <DepthChart data={analytics.depthDistribution} />
        {analytics.topTerms.length > 0 && <TopTermsList terms={analytics.topTerms} />}
      </div>

      <CtaBand token={token} onDownloadPdf={() => void handleDownloadPdf()} downloading={downloading} />
    </div>
  );
}
