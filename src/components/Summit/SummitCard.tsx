import React from "react";

interface SummitCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const SummitCard: React.FC<SummitCardProps> = ({
  children,
  className = "",
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`
        bg-atmospheric-haze/80 backdrop-blur-md 
        border border-white/10 
        shadow-rim-card rounded-card 
        relative overflow-hidden
        before:absolute before:inset-x-0 before:top-0 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent
        ${onClick ? "cursor-pointer transition-transform duration-300 hover:-translate-y-1" : ""}
        ${className}
      `}
    >
      {/* Inner top highlight for that "Rim Light" effect */}
      <div className="absolute top-0 left-0 right-0 h-px bg-white/10 pointer-events-none" />

      {children}
    </div>
  );
};
