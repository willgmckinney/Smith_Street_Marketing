interface GoatMarkProps {
  className?: string;
  /** Pixel size of the square mark. */
  size?: number;
  /**
   * Alt text. Defaults to a descriptive logo label. Pass "" where an adjacent
   * wordmark already names the brand, to keep the mark decorative.
   */
  alt?: string;
}

/**
 * Brand mark: the leaping goat, sized to a square box. Replaces the "SA"
 * monogram.
 */
export const GoatMark = ({
  className = "",
  size = 44,
  alt = "Smith Avenue Insights logo",
}: GoatMarkProps) => {
  return (
    <img
      src="/sai-goat-mark.png"
      alt={alt}
      aria-hidden={alt === "" ? true : undefined}
      className={`shrink-0 object-contain ${className}`}
      style={{ width: size, height: size }}
    />
  );
};
