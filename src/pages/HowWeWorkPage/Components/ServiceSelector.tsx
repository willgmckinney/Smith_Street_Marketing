import { motion } from "framer-motion";
import type { ServiceType } from "../data/timelineContent";
import { serviceLabels } from "../data/timelineContent";

interface ServiceSelectorProps {
  activeService: ServiceType;
  onServiceChange: (service: ServiceType) => void;
}

const serviceIcons: Record<ServiceType, React.ReactNode> = {
  analytics: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3v18h18" />
      <path d="M7 16l4-8 4 4 4-6" />
    </svg>
  ),
  software: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  aws: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
    </svg>
  ),
};

export const ServiceSelector = ({
  activeService,
  onServiceChange,
}: ServiceSelectorProps) => {
  const services = Object.entries(serviceLabels) as [
    ServiceType,
    { label: string; description: string },
  ][];

  return (
    <div className="sticky top-[72px] z-30 bg-deep-horizon/90 backdrop-blur-lg border-b border-white/10">
      <div className="container mx-auto px-4">
        <nav
          className="flex items-center justify-center gap-2 py-3"
          role="tablist"
          aria-label="Select service type"
        >
          {services.map(([key, { label }]) => {
            const isActive = activeService === key;
            return (
              <button
                key={key}
                role="tab"
                aria-selected={isActive}
                aria-controls={`timeline-panel-${key}`}
                onClick={() => onServiceChange(key)}
                className={`
                  relative flex items-center gap-2 px-4 py-2.5 rounded-xl
                  font-display font-semibold text-sm md:text-base
                  transition-all duration-300 ease-bouncy
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-alpine-ice/50
                  ${
                    isActive
                      ? "text-deep-horizon"
                      : "text-granite/60 hover:text-granite hover:bg-white/5"
                  }
                `}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeServiceBg"
                    className="absolute inset-0 bg-gradient-to-r from-golden-hour-start to-golden-hour-end rounded-xl"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10 hidden sm:block">{serviceIcons[key]}</span>
                <span className="relative z-10">{label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
