import React from "react";

interface BlueprintCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  index?: number | string;
  accent?: boolean;
}

export const BlueprintCard: React.FC<BlueprintCardProps> = ({
  children,
  className = "",
  onClick,
  index,
  accent = false,
}) => {
  return (
    <div
      onClick={onClick}
      className={`
        bg-drafting-surface
        border border-chalk/10
        rounded-card
        relative overflow-hidden
        ${accent ? "border-t border-t-marker-start" : ""}
        ${onClick ? "cursor-pointer transition-transform duration-[120ms] ease-spec hover:-translate-y-px" : ""}
        ${className}
      `}
    >
      {index !== undefined && (
        <span className="absolute top-4 left-4 font-mono text-xs text-marker-start tracking-wider">
          {typeof index === "number"
            ? String(index).padStart(2, "0")
            : index}
        </span>
      )}
      {children}
    </div>
  );
};
