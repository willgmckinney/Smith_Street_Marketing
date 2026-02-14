interface ProgressIndicatorProps {
  progress: number;
  currentAltitude: number;
  totalMilestones: number;
}

export const ProgressIndicator = ({
  progress,
  currentAltitude,
  totalMilestones,
}: ProgressIndicatorProps) => {
  // Calculate the stroke dash for the circular progress
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (progress / 100) * circumference;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-end gap-3 scale-75 sm:scale-90 md:scale-100">
      {/* Altimeter gauge */}
      <div className="relative">
        <svg width="100" height="100" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="rgba(30, 41, 59, 0.9)"
            stroke="rgba(168, 216, 234, 0.15)"
            strokeWidth="2"
          />

          {/* Progress arc */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="url(#progressGradient)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            transform="rotate(-90 50 50)"
            className="transition-all duration-500"
          />

          {/* Gradient definition */}
          <defs>
            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#A8D8EA" />
              <stop offset="100%" stopColor="#64B5F6" />
            </linearGradient>
          </defs>

          {/* Camp number */}
          <text
            x="50"
            y="44"
            textAnchor="middle"
            fill="#F8FAFC"
            fontSize="22"
            fontWeight="bold"
            fontFamily="monospace"
          >
            {currentAltitude}
          </text>

          {/* Fraction */}
          <text
            x="50"
            y="60"
            textAnchor="middle"
            fill="#5C6370"
            fontSize="10"
            fontFamily="monospace"
          >
            / {totalMilestones}
          </text>
        </svg>

        {/* Label */}
        <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap">
          <span className="font-mono text-[9px] text-cliff-light tracking-[0.15em] uppercase">
            Altitude
          </span>
        </div>
      </div>

      {/* Vertical progress bar */}
      <div className="w-1 h-32 bg-white/5 rounded-full overflow-hidden relative">
        <div
          className="absolute bottom-0 w-full rounded-full transition-all duration-500"
          style={{
            height: `${progress}%`,
            background: "linear-gradient(to top, #A8D8EA, #64B5F6)",
          }}
        />

        {/* Milestone tick marks */}
        {Array.from({ length: totalMilestones }, (_, i) => {
          const pos = ((i + 1) / totalMilestones) * 100;
          return (
            <div
              key={i}
              className="absolute w-2 h-[1px] -left-0.5 bg-white/20"
              style={{ bottom: `${pos}%` }}
            />
          );
        })}
      </div>
    </div>
  );
};
