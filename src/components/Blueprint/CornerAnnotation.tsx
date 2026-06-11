import { useReducedMotion } from "framer-motion";

interface CornerAnnotationProps {
  figure: number | string;
  label: string;
  className?: string;
}

export const CornerAnnotation = ({
  figure,
  label,
  className = "",
}: CornerAnnotationProps) => {
  const prefersReducedMotion = useReducedMotion();
  const figureStr =
    typeof figure === "number" ? String(figure).padStart(2, "0") : figure;

  return (
    <div
      className={`absolute top-6 right-6 flex items-center gap-2 font-mono text-xs text-chalk/40 tracking-wider ${className}`}
      aria-hidden={!prefersReducedMotion ? undefined : true}
    >
      <span className="w-4 h-px bg-chalk/30" />
      <span>
        fig.{figureStr} / {label}
      </span>
    </div>
  );
};
