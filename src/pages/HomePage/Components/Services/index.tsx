/* eslint-disable @typescript-eslint/no-explicit-any */
import cloudServices from "../../../../assets/cloudServices.png";
import customSoftwareDevelopment from "../../../../assets/customSoftwareDevelopment.png";
import dataAnalysisBusinessIntelligence from "../../../../assets/dataAnalysisBusinessIntelligence.png";
import websiteDevelopment from "../../../../assets/websiteDevelopment.png";
import { SummitCard } from "../../../../components/Summit/SummitCard";
// import "./services.css"; // Removing old CSS in favor of Tailwind/Summit styles

const servicesList = [
  {
    title: "Data Analysis and Business Intelligence",
    description:
      "Unlock the power of your data with our comprehensive analysis and business intelligence solutions. We transform raw data into actionable insights, enabling you to make informed decisions, streamline operations, and identify new growth opportunities.",
    image: dataAnalysisBusinessIntelligence,
  },
  {
    title: "Cloud Integration and Migration",
    description:
      "Seamlessly transition to the cloud with our expert integration and migration services. We ensure a smooth and secure migration process, optimizing your cloud infrastructure for maximum efficiency and cost savings, while minimizing downtime.",
    image: cloudServices,
  },
  {
    title: "Website Development and Maintenance",
    description:
      "Enhance your online presence with our cutting-edge website development and maintenance services. We create stunning, user-friendly websites that drive traffic and engagement, and provide ongoing support to keep your site secure and up-to-date.",
    image: websiteDevelopment,
  },
  {
    title: "Custom Software Development",
    description:
      "Tailor-made software solutions designed to meet your unique business needs. Our custom software development services deliver robust, scalable, and user-friendly applications that enhance productivity and support your business goals.",
    image: customSoftwareDevelopment,
  },
];

export const Services = () => {
  return (
    <section className="bg-deep-horizon py-20 sm:py-32 px-4 sm:px-8 relative overflow-hidden">
      {/* Atmospheric background elements could be added here */}

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 mb-4">
            Our Services
          </h2>
          <div className="h-1 w-24 bg-golden-gradient mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {servicesList.map((service, index) => (
            <SummitCard key={index} className="flex flex-col h-full group">
              <div className="h-64 overflow-hidden relative bg-deep-horizon">
                <div className="absolute inset-0 bg-deep-horizon/20 z-10 group-hover:bg-transparent transition-colors duration-500" />
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-110"
                />
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <h3 className="font-display font-bold text-2xl text-white mb-4 group-hover:text-golden-hour-start transition-colors">
                  {service.title}
                </h3>
                <p className="font-sans text-granite/80 text-lg leading-relaxed flex-1">
                  {service.description}
                </p>
              </div>
            </SummitCard>
          ))}
        </div>
      </div>
    </section>
  );
};
