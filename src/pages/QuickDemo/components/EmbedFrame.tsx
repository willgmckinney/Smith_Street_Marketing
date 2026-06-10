import type { ReactNode } from "react";

interface EmbedFrameProps {
  /** Ref-target for the QuickSight SDK to mount its iframe into. */
  containerRef: React.RefObject<HTMLDivElement>;
  loading: boolean;
  error: string | null;
  onRetry?: () => void;
  /** Optional overlay shown above the iframe — controls, header, etc. */
  toolbar?: ReactNode;
  /** Minimum height for the iframe container (avoids layout shift). */
  minHeight?: string;
}

export function EmbedFrame({
  containerRef,
  loading,
  error,
  onRetry,
  toolbar,
  minHeight = "720px",
}: EmbedFrameProps) {
  return (
    <div className="bg-atmospheric-haze rounded-card border border-white/10 shadow-rim-card overflow-hidden">
      {toolbar ? (
        <div className="px-4 py-3 border-b border-white/10 flex items-center gap-3">
          {toolbar}
        </div>
      ) : null}

      <div className="relative" style={{ minHeight }}>
        <div
          ref={containerRef}
          className="w-full"
          style={{ minHeight }}
          data-embed-container
        />

        {loading && !error ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-atmospheric-haze/95 backdrop-blur-sm">
            <div className="h-10 w-10 rounded-full border-2 border-white/20 border-t-golden-hour-start animate-spin" />
            <p className="mt-3 text-granite/80 text-sm font-sans">
              Loading embedded experience…
            </p>
          </div>
        ) : null}

        {error ? (
          <div className="absolute inset-0 flex items-center justify-center p-8 bg-atmospheric-haze/95 backdrop-blur-sm">
            <div className="max-w-md text-center">
              <div className="inline-block px-3 py-1 mb-3 bg-red-500/20 border border-red-500/30 rounded-pill">
                <span className="text-red-400 font-bold text-xs uppercase tracking-wider">
                  Embed failed
                </span>
              </div>
              <p className="text-granite/80 text-sm font-sans whitespace-pre-wrap mb-4">
                {error}
              </p>
              {onRetry ? (
                <button
                  type="button"
                  onClick={onRetry}
                  className="px-6 py-2 rounded-pill bg-golden-gradient text-deep-horizon font-bold text-sm"
                >
                  Try again
                </button>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
