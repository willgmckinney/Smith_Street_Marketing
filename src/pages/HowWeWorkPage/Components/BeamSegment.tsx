interface BeamSegmentProps {
  isActive: boolean;
  isPassed: boolean;
  isLast: boolean;
}

export const BeamSegment = ({
  isActive,
  isPassed,
  isLast,
}: BeamSegmentProps) => {
  const lit = isPassed || isActive;

  return (
    <div className="absolute inset-0 flex justify-center pointer-events-none">
      <div className="relative w-px h-full">
        {/* Structural beam / dimension line */}
        <div
          className="absolute inset-0 transition-all duration-700"
          style={{
            background: lit
              ? "linear-gradient(180deg, rgba(0,196,132,0.6), rgba(0,196,132,0.3), rgba(0,196,132,0.6))"
              : "linear-gradient(180deg, rgba(248,250,252,0.15), rgba(248,250,252,0.08))",
          }}
        />

        {/* End tick at segment top */}
        <div
          className={`absolute top-0 left-1/2 -translate-x-1/2 w-3 h-px transition-colors duration-700 ${
            lit ? "bg-marker-start/60" : "bg-chalk/20"
          }`}
        />

        {isActive && (
          <div className="absolute inset-0 -inset-x-1 bg-marker-start/10 animate-pulse" />
        )}
      </div>

      {isLast && (
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-2">
          <div
            className={`w-2 h-2 rounded-spec border transition-colors duration-700 ${
              lit
                ? "bg-marker-start border-marker-end"
                : "bg-sheet-mid border-sheet-light"
            }`}
          />
        </div>
      )}
    </div>
  );
};
