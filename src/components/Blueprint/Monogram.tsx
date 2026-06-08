interface MonogramProps {
  className?: string;
  /** Pixel size of the square mark. */
  size?: number;
}

/**
 * Drafting monogram: a 1px-bordered square holding the "SA" mark with a single
 * marker-start corner tick. Single color, squared, pairs with the project index
 * marks used across the site. Replaces the old climbing mascot.
 */
export const Monogram = ({ className = "", size = 44 }: MonogramProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 44 44"
      fill="none"
      role="img"
      aria-label="Smith Avenue Insights"
      className={className}
    >
      <rect
        x="1.5"
        y="1.5"
        width="41"
        height="41"
        rx="3"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <text
        x="22"
        y="23"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="Archivo, sans-serif"
        fontWeight="800"
        fontSize="18"
        letterSpacing="0.5"
        fill="currentColor"
      >
        SA
      </text>
      {/* corner tick: the only flourish, in the marking accent */}
      <line
        x1="31"
        y1="1.5"
        x2="42.5"
        y2="1.5"
        stroke="#129A6A"
        strokeWidth="3"
      />
    </svg>
  );
};
