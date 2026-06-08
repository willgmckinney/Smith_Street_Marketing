interface ProgressIndicatorProps {
  progress: number;
  currentStation: number;
  totalMilestones: number;
}

export const ProgressIndicator = ({
  progress,
  currentStation,
  totalMilestones,
}: ProgressIndicatorProps) => {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (progress / 100) * circumference;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-end gap-3 scale-75 sm:scale-90 md:scale-100">
      <div className="relative">
        <svg width="100" height="100" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="#FFFFFF"
            stroke="rgba(18, 154, 106, 0.35)"
            strokeWidth="2"
          />

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

          <defs>
            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#129A6A" />
              <stop offset="100%" stopColor="#1FB97E" />
            </linearGradient>
          </defs>

          <text
            x="50"
            y="44"
            textAnchor="middle"
            fill="#1E293B"
            fontSize="22"
            fontWeight="bold"
            fontFamily="monospace"
          >
            {currentStation}
          </text>

          <text
            x="50"
            y="60"
            textAnchor="middle"
            fill="#64748B"
            fontSize="10"
            fontFamily="monospace"
          >
            / {totalMilestones}
          </text>
        </svg>

        <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap">
          <span className="font-mono text-[9px] text-sheet-light tracking-[0.15em] lowercase">
            station
          </span>
        </div>
      </div>

      <div className="w-1 h-32 bg-chalk/10 rounded-spec overflow-hidden relative">
        <div
          className="absolute bottom-0 w-full rounded-spec transition-all duration-500"
          style={{
            height: `${progress}%`,
            background: "linear-gradient(to top, #129A6A, #1FB97E)",
          }}
        />

        {Array.from({ length: totalMilestones }, (_, i) => {
          const pos = ((i + 1) / totalMilestones) * 100;
          return (
            <div
              key={i}
              className="absolute w-2 h-px -left-0.5 bg-chalk/20"
              style={{ bottom: `${pos}%` }}
            />
          );
        })}
      </div>
    </div>
  );
};
