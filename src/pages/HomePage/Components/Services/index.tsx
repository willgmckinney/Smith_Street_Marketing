import logo from "../../../../assets/logo.png";

const servicesList = [
  {
    title: "Data Analysis and Business Intelligence",
    description:
      "Unlock the power of your data with our comprehensive analysis and business intelligence solutions. We transform raw data into actionable insights, enabling you to make informed decisions, streamline operations, and identify new growth opportunities.",
    image: logo,
  },
  {
    title: "Cloud Integration and Migration",
    description:
      "Seamlessly transition to the cloud with our expert integration and migration services. We ensure a smooth and secure migration process, optimizing your cloud infrastructure for maximum efficiency and cost savings, while minimizing downtime.",
    image: logo,
  },
  {
    title: "Website Development and Maintenance",
    description:
      "Enhance your online presence with our cutting-edge website development and maintenance services. We create stunning, user-friendly websites that drive traffic and engagement, and provide ongoing support to keep your site secure and up-to-date.",
    image: logo,
  },
  {
    title: "Custom Software Development",
    description:
      "Tailor-made software solutions designed to meet your unique business needs. Our custom software development services deliver robust, scalable, and user-friendly applications that enhance productivity and support your business goals.",
    image: logo,
  },
];

export const Services = () => {
  return (
    <div className="bg-secondary-color-1">
      <div className="flex flex-row">
        <div className="flex flex-col items-center space-y-12 py-16 w-[100%]">
          <h1 className="text-4xl text-accent-color-1">Our Services</h1>
          <div className=" flex flex-row">
            {servicesList.map((service) => (
              <div
                key={service.title}
                className="flex flex-col justify-between items-center text-center space-y-4 px-8 py-12 m-4 bg-neutral-color-2 rounded-lg shadow-lg"
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-40 h-40 object-cover rounded-full"
                />
                <h2 className="text-2xl text-[#00262D] font-semibold">
                  {service.title}
                </h2>
                <p className="text-lg text-[#00262D] text-center">
                  {service.description}
                </p>
                <button className="bg-accent-color-1 hover:text-neutral-color-1 text-3xl px-8 py-3 rounded-full">
                  <h1 className="text-xl">Get Started</h1>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
