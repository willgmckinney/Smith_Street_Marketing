export type ServiceIconName = "data" | "cloud" | "web" | "software";

interface ServiceIconProps {
  name: ServiceIconName;
  className?: string;
  size?: number;
}

/**
 * Line-style blueprint service icons drawn in currentColor. Replaces the stock
 * 3D render thumbnails on the Services section.
 */
export const ServiceIcon = ({
  name,
  className = "",
  size = 40,
}: ServiceIconProps) => {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 40 40",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
    "aria-hidden": true,
  };

  switch (name) {
    case "data":
      return (
        <svg {...common}>
          <ellipse cx="20" cy="9" rx="12" ry="4" />
          <path d="M8 9v22c0 2.2 5.4 4 12 4s12-1.8 12-4V9" />
          <path d="M8 20c0 2.2 5.4 4 12 4s12-1.8 12-4" />
        </svg>
      );
    case "cloud":
      return (
        <svg {...common}>
          <path d="M12 28a6 6 0 0 1 .8-12 8 8 0 0 1 15.2 2.2A5.5 5.5 0 0 1 27 28H12Z" />
          <path d="M20 33v-9" />
          <path d="M16.5 27.5 20 24l3.5 3.5" />
        </svg>
      );
    case "web":
      return (
        <svg {...common}>
          <rect x="6" y="9" width="28" height="22" rx="2" />
          <path d="M6 16h28" />
          <circle cx="10.5" cy="12.5" r="0.8" fill="currentColor" />
          <circle cx="13.5" cy="12.5" r="0.8" fill="currentColor" />
          <path d="M16 23h12M16 27h8" />
        </svg>
      );
    case "software":
      return (
        <svg {...common}>
          <rect x="6" y="8" width="28" height="24" rx="2" />
          <path d="M15 17l-4 3 4 3" />
          <path d="M25 17l4 3-4 3" />
          <path d="M22 15l-4 10" />
        </svg>
      );
  }
};
