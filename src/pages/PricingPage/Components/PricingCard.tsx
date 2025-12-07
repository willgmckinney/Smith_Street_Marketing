import { Link } from "@tanstack/react-router";
import { SummitButton } from "../../../components/Summit/SummitButton";
import { SummitCard } from "../../../components/Summit/SummitCard";

export const PricingCard = ({
  title,
  price,
  features,
  isPopular = false,
  description,
}: {
  title: string;
  price?: string;
  features: string[];
  isPopular?: boolean;
  description: string;
}) => {
  return (
    <SummitCard
      className={`flex flex-col p-8 w-[350px] relative h-full ${
        isPopular
          ? "border-golden-hour-start shadow-[0_0_30px_-5px_rgba(255,184,0,0.3)] z-10 !overflow-visible"
          : ""
      }`}
    >
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-golden-gradient text-deep-horizon font-bold px-4 py-1 rounded-full text-sm shadow-lg">
          Most Popular
        </div>
      )}

      <h3 className="font-display font-bold text-xl text-white mb-2">
        {title}
      </h3>
      <p className="font-sans text-sm text-granite/60 min-h-[40px]">
        {description}
      </p>

      {price ? (
        <div className="mt-6 mb-8 flex items-baseline">
          <span className="text-4xl font-display font-bold text-golden-hour-start">
            ${price}
          </span>
          {/* <span className="text-granite/60 ml-2">/project</span> */}
        </div>
      ) : (
        <div className="mt-6 mb-8">
          <span className="text-4xl font-display font-bold text-white italic">
            Custom
          </span>
        </div>
      )}

      <ul className="space-y-4 flex-grow mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <svg
              className="w-5 h-5 text-alpine-flora mt-1 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
            <span className="ml-3 text-granite/90 text-sm leading-relaxed">
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <Link to="/demo" className="w-full">
        <SummitButton
          variant={isPopular ? "primary" : "secondary"}
          className="w-full"
        >
          Get Started
        </SummitButton>
      </Link>
    </SummitCard>
  );
};
