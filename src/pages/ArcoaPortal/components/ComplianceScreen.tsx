import { CheckCircle2, Download, ShieldCheck } from "lucide-react";
import { certificates } from "../mockData";

interface ComplianceScreenProps {
  onDownload: (certId: string) => void;
}

function formatDate(dateStr: string) {
  return new Date(dateStr + "T12:00:00").toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function ComplianceScreen({ onDownload }: ComplianceScreenProps) {
  return (
    <div className="px-4 py-5 space-y-5 pb-6">
      <div className="arcoa-fade-in">
        <div className="flex items-center gap-2 mb-1">
          <ShieldCheck size={20} style={{ color: "var(--blue)" }} />
          <h1 className="text-xl font-semibold" style={{ color: "var(--ink)" }}>
            Compliance & Certificates
          </h1>
        </div>
        <p className="text-sm" style={{ color: "var(--muted)" }}>
          Audit-ready documentation for every asset.
        </p>
      </div>

      <div
        className="arcoa-card arcoa-fade-in p-4 border-2"
        style={{
          animationDelay: "80ms",
          borderColor: "var(--green)",
          backgroundColor: "#F0FAF4",
        }}
      >
        <div className="flex items-start gap-3">
          <CheckCircle2
            size={22}
            className="flex-shrink-0 mt-0.5"
            style={{ color: "var(--green)" }}
          />
          <div>
            <p className="font-semibold text-sm" style={{ color: "var(--ink)" }}>
              100% Data Destruction Verified
            </p>
            <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>
              NIST SP 800-88 · NAID AAA certified processes
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {certificates.map((cert, i) => (
          <div
            key={cert.id}
            className="arcoa-card arcoa-fade-in p-4"
            style={{ animationDelay: `${140 + i * 60}ms` }}
          >
            <p
              className="font-mono text-xs font-medium"
              style={{ color: "var(--blue)" }}
            >
              {cert.id}
            </p>
            <p
              className="font-semibold text-sm mt-1.5"
              style={{ color: "var(--ink)" }}
            >
              {cert.type}
            </p>

            <dl className="mt-3 space-y-1.5 text-xs">
              <div className="flex justify-between">
                <dt style={{ color: "var(--muted)" }}>Date Issued</dt>
                <dd className="font-mono" style={{ color: "var(--ink)" }}>
                  {formatDate(cert.dateIssued)}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt style={{ color: "var(--muted)" }}>Assets Covered</dt>
                <dd className="font-mono" style={{ color: "var(--ink)" }}>
                  {cert.assetsCovered.toLocaleString()}
                </dd>
              </div>
              <div>
                <dt style={{ color: "var(--muted)" }}>Method</dt>
                <dd
                  className="font-mono text-[11px] mt-0.5"
                  style={{ color: "var(--ink)" }}
                >
                  {cert.method}
                </dd>
              </div>
            </dl>

            <button
              type="button"
              onClick={() => onDownload(cert.id)}
              className="flex items-center justify-center gap-2 w-full mt-4 py-2.5 rounded-xl text-xs font-semibold border min-h-[44px] active:bg-gray-50"
              style={{
                borderColor: "var(--border)",
                color: "var(--blue)",
                backgroundColor: "var(--card)",
              }}
            >
              <Download size={14} />
              Download PDF
            </button>
          </div>
        ))}
      </div>

      <p
        className="text-center text-[11px] leading-relaxed px-2 arcoa-fade-in"
        style={{ animationDelay: "500ms", color: "var(--muted)" }}
      >
        All certificates generated and retained by ARCOA Group for 7 years per
        retention policy.
      </p>
    </div>
  );
}
