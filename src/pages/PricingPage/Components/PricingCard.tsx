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
    <div
      className={`flex flex-col p-8 rounded-xl border-2 ${isPopular ? "border-accent-color-1" : "border-neutral-color-1/20"} bg-white shadow-lg w-[350px]`}
    >
      <h3 className="text-xl font-medium text-tirtiary-color">{title}</h3>
      <p className="mt-2 text-tirtiary-color/60 text-sm">{description}</p>
      {price ? (
        <div className="mt-4 mb-6">
          <span className="text-4xl font-bold text-tirtiary-color">
            ${price}
          </span>
          <span className="text-tirtiary-color/60"></span>
        </div>
      ) : (
        <div className="mt-4 mb-6">
          <span className="text-4xl font-medium text-tirtiary-color italic">
            Custom
          </span>
        </div>
      )}
      <ul className="space-y-4 flex-grow">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <svg
              className="w-5 h-5 text-accent-color-1 mt-1"
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
            <span className="ml-3 text-tirtiary-color/80">{feature}</span>
          </li>
        ))}
      </ul>
      <button
        className={`mt-8 px-6 py-3 rounded-lg font-medium transition-colors
            ${
              isPopular
                ? "bg-accent-color-1 text-white hover:bg-accent-color-1/90"
                : "bg-tirtiary-color text-white hover:bg-neutral-color-1/90"
            }`}
      >
        Get started
      </button>
    </div>
  );
};
