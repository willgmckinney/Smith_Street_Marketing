import React from "react";

interface BlueprintButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
}

export const BlueprintButton: React.FC<BlueprintButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) => {
  const baseStyles =
    "font-display font-bold rounded-spec transition-all duration-[120ms] ease-spec disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center";

  const variants = {
    primary:
      "bg-marker-gradient text-blueprint-base hover:-translate-y-px hover:brightness-110",
    secondary:
      "bg-drafting-surface text-chalk border border-chalk/10 hover:bg-slate-700 hover:-translate-y-px",
    outline:
      "bg-transparent border border-marker-start text-marker-start hover:bg-drafting-surface hover:-translate-y-px",
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
