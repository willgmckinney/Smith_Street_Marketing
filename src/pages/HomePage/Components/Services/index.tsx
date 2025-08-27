/* eslint-disable @typescript-eslint/no-explicit-any */
import cloudServices from "../../../../assets/cloudServices.jpg";
import customSoftwareDevelopment from "../../../../assets/customSoftwareDevelopment.jpg";
import dataAnalysisBusinessIntelligence from "../../../../assets/dataAnalysisBusinessIntelligence.jpg";
import websiteDevelopment from "../../../../assets/websiteDevelopment.jpg";
import "./services.css";

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
    <div className="bg-neutral-color-1 pt-5 sm:pt-10 text-center">
      <main>
        <div className="flex flex-row items-center justify-center gap-3 mb-16 sm:mb-20">
          <span className="text-[3rem] sm:text-[3.5rem] md:text-6xl text-tirtiary-color font-bold">
            Our Services
          </span>
        </div>
        <ul className="stack-cards js-stack-cards">
          {servicesList.map((service: { [x: string]: any }) => (
            <li className="card p-3 sm:p-5" id="card_1">
              <div className="card__content">
                <div>
                  <h2 className="text-xl sm:text-2xl lg:text-3xl mb-2 sm:mb-4">
                    {service.title}
                  </h2>
                  <p className="text-sm sm:text-base lg:text-lg mb-4 sm:mb-6">
                    {service.description}
                  </p>
                </div>
                <figure>
                  <img src={service.image} alt={service.title} />
                </figure>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};
