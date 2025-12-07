import React from "react";

interface SummitButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
}

export const SummitButton: React.FC<SummitButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) => {
  const baseStyles =
    "font-display font-bold rounded-pill transition-all duration-300 ease-bouncy active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center";

  const variants = {
    primary:
      "bg-golden-gradient text-deep-horizon shadow-button-glow hover:-translate-y-[2px] hover:brightness-110",
    secondary:
      "bg-atmospheric-haze text-granite border border-white/10 hover:bg-slate-700 hover:-translate-y-[2px]",
    outline:
      "bg-transparent border-2 border-golden-hour-start text-golden-hour-start hover:bg-golden-hour-start/10",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-8 py-3 text-base",
    lg: "px-10 py-4 text-lg",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
