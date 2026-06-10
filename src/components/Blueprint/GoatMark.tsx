interface GoatMarkProps {
  className?: string;
  /** Pixel size of the square mark. */
  size?: number;
}

/**
 * Brand mark: the leaping goat, sized to a square box. Replaces the "SA"
 * monogram.
 */
export const GoatMark = ({ className = "", size = 44 }: GoatMarkProps) => {
  return (
    <img
      src="/sai-goat-mark.png"
      alt=""
      aria-hidden
      className={`shrink-0 object-contain ${className}`}
      style={{ width: size, height: size }}
    />
  );
};
