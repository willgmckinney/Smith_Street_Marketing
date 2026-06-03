import { certifications } from "../mockData";

export function CertificationBadges({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`flex flex-wrap gap-2 ${compact ? "justify-center" : ""}`}
    >
      {certifications.map((cert) => (
        <span
          key={cert}
          className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-medium tracking-wide uppercase border"
          style={{
            backgroundColor: "var(--blue-tint)",
            color: "var(--navy)",
            borderColor: "var(--border)",
          }}
        >
          {cert}
        </span>
      ))}
    </div>
  );
}
