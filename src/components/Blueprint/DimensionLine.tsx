interface DimensionLineProps {
  label?: string;
  className?: string;
}

export const DimensionLine = ({ label, className = "" }: DimensionLineProps) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="flex-1 flex items-center">
        <div className="w-px h-2 bg-marker-start/60" />
        <div className="flex-1 h-px bg-marker-start/40" />
        <div className="w-px h-2 bg-marker-start/60" />
      </div>
      {label && (
        <span className="font-mono text-xs text-marker-start/80 tracking-wider shrink-0">
          {label}
        </span>
      )}
    </div>
  );
};
