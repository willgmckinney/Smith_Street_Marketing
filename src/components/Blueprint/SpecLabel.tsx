interface SpecLabelProps {
  children: React.ReactNode;
  tick?: boolean;
  className?: string;
}

export const SpecLabel = ({
  children,
  tick = true,
  className = "",
}: SpecLabelProps) => {
  return (
    <p
      className={`font-mono text-sm text-marker-start tracking-[0.16em] lowercase ${className}`}
    >
      {tick && <span className="mr-2 text-marker-start/60">—</span>}
      {children}
    </p>
  );
};
