import { BlueprintGrid } from "../../../components/Blueprint/BlueprintGrid";

interface BlueprintSheetProps {
  scrollProgress: number;
}

export const BlueprintSheet = ({ scrollProgress }: BlueprintSheetProps) => {
  const gridOpacity = Math.min(0.35 + scrollProgress * 0.004, 0.7);
  const lineProgress = Math.min(scrollProgress / 100, 1);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-blueprint-base">
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{ opacity: gridOpacity }}
      >
        <BlueprintGrid opacity={1} />
      </div>

      {/* Vertical dimension line, draws in on scroll */}
      <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px">
        <div
          className="w-full bg-marker-start/30 origin-top animate-line-extend"
          style={{
            height: `${lineProgress * 100}%`,
            animation: scrollProgress > 5 ? undefined : "none",
          }}
        />
      </div>

      {/* Horizontal reference lines */}
      {[25, 50, 75].map((pos) => (
        <div
          key={pos}
          className="absolute left-0 right-0 h-px bg-marker-start/10 transition-opacity duration-700"
          style={{
            top: `${pos}%`,
            opacity: scrollProgress > pos - 10 ? 1 : 0.2,
          }}
        />
      ))}

      {/* Handoff marker at top */}
      <div
        className="absolute top-8 left-1/2 -translate-x-1/2 text-center transition-all duration-700"
        style={{
          opacity: Math.max(0, (scrollProgress - 85) / 15),
        }}
      >
        <div className="flex flex-col items-center gap-2">
          <div className="w-8 h-8 border border-marker-start/60 rounded-spec flex items-center justify-center">
            <span className="font-mono text-xs text-marker-start">✓</span>
          </div>
          <span className="font-mono text-xs text-marker-start/80 tracking-[0.2em] lowercase">
            handoff
          </span>
        </div>
      </div>

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(244, 243, 239, 0.85) 100%)",
        }}
      />
    </div>
  );
};
