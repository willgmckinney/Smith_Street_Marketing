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
      className={`flex items-center font-mono text-label-mono text-marker-start lowercase ${className}`}
    >
      {tick && (
        <span
          aria-hidden
          className="mr-3 inline-block h-px w-6 bg-marker-start/60"
        />
      )}
      {children}
    </p>
  );
};
