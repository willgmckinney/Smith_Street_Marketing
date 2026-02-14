interface RopeSegmentProps {
  isActive: boolean;
  isPassed: boolean;
  isLast: boolean;
}

export const RopeSegment = ({ isActive, isPassed, isLast }: RopeSegmentProps) => {
  const lit = isPassed || isActive;

  return (
    <div className="absolute inset-0 flex justify-center pointer-events-none">
      {/* Main rope strand */}
      <div className="relative w-[5px] h-full">
        {/* Shadow / depth layer */}
        <div
          className="absolute inset-0 rounded-full translate-x-[1px] translate-y-[1px] opacity-40"
          style={{
            background: "linear-gradient(180deg, rgba(0,0,0,0.3), rgba(0,0,0,0.15))",
          }}
        />

        {/* Primary rope body */}
        <div
          className="absolute inset-0 rounded-full transition-all duration-700"
          style={{
            background: lit
              ? "linear-gradient(180deg, #5BA4D9, #4A8DB7, #5BA4D9, #3D7EA8, #5BA4D9)"
              : "linear-gradient(180deg, #4A4A4A, #3D3D3D, #4A4A4A, #3D3D3D, #4A4A4A)",
            backgroundSize: "100% 40px",
          }}
        />

        {/* Twist/braid texture overlay — repeating diagonal stripes */}
        <div
          className="absolute inset-0 rounded-full overflow-hidden transition-opacity duration-700"
          style={{ opacity: lit ? 0.35 : 0.15 }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `repeating-linear-gradient(
                -45deg,
                transparent,
                transparent 3px,
                ${lit ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.15)"} 3px,
                ${lit ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.15)"} 4px,
                transparent 4px,
                transparent 7px
              )`,
            }}
          />
        </div>

        {/* Second strand highlight (left edge) */}
        <div
          className="absolute top-0 bottom-0 left-0 w-[2px] rounded-full transition-opacity duration-700"
          style={{
            opacity: lit ? 0.3 : 0.1,
            background: lit
              ? "linear-gradient(180deg, #C8E6FF, #5BA4D9, #C8E6FF, #5BA4D9)"
              : "linear-gradient(180deg, #5C5C5C, #4A4A4A, #5C5C5C)",
            backgroundSize: "100% 24px",
          }}
        />

        {/* Active glow */}
        {isActive && (
          <div
            className="absolute inset-0 -inset-x-2 rounded-full animate-pulse"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(100,181,246,0.2) 0%, transparent 70%)",
            }}
          />
        )}
      </div>

      {/* Rope end knot if last milestone */}
      {isLast && (
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-2">
          <div
            className={`
              w-3 h-3 rounded-full border-2 transition-colors duration-700
              ${lit ? "bg-rope-gold border-rope-tan" : "bg-cliff-mid border-cliff-light"}
            `}
          />
        </div>
      )}
    </div>
  );
};
