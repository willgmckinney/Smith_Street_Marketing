export function PrivacyBanner({ bold = false }: { bold?: boolean }) {
  return (
    <div
      className={`relative border border-chalk/15 bg-drafting-surface px-4 py-3 ${bold ? "border-chalk/25" : ""}`}
    >
      <p className={`font-mono text-xs uppercase tracking-[0.14em] text-chalk ${bold ? "font-semibold" : ""}`}>
        Processed entirely in your browser. Nothing is uploaded to Smith Avenue.
      </p>
      <p className="mt-1 font-mono text-xs text-muted">
        Data clears when you close this tab. No secret or PII is ever shown in full or stored.
      </p>
    </div>
  );
}
