import type { ReactNode } from "react";

interface AssetFrameProps {
  children: ReactNode;
  /** Figure number, rendered as fig.0X. */
  figure: number | string;
  /** Short mono caption after the figure number. */
  caption: string;
  className?: string;
}

/**
 * Frames an asset as a blueprint artifact: thin hairline border, paper-toned
 * field, and a mono fig.0X caption bar. Used for architecture diagrams and
 * screenshots so they sit inside the drafting system.
 */
export const AssetFrame = ({
  children,
  figure,
  caption,
  className = "",
}: AssetFrameProps) => {
  const fig =
    typeof figure === "number" ? String(figure).padStart(2, "0") : figure;

  return (
    <figure
      className={`border border-chalk/15 bg-blueprint-base rounded-spec overflow-hidden ${className}`}
    >
      <div className="relative flex items-center justify-center p-cell bg-blueprint-base">
        {children}
        {/* faint blueprint grid draws over the asset on case-study hover */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-blueprint-grid bg-[length:16px_16px] opacity-0 transition-opacity duration-150 ease-spec group-hover:opacity-70 motion-reduce:transition-none motion-reduce:group-hover:opacity-0"
        />
      </div>
      <figcaption className="flex items-center gap-2 border-t border-chalk/15 px-4 py-2 font-mono text-label-mono text-chalk/50 lowercase">
        <span className="h-px w-4 bg-marker-start/60" />
        <span className="text-marker-start">fig.{fig}</span>
        <span>/ {caption}</span>
      </figcaption>
    </figure>
  );
};
