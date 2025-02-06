/* eslint-disable @typescript-eslint/no-explicit-any */
import cloudServices from "../../../../assets/cloudServices.webp";
import customSoftwareDevelopment from "../../../../assets/customSoftwareDevelopment.webp";
import dataAnalysisBusinessIntelligence from "../../../../assets/dataAnalysisBusinessIntelligence.webp";
import websiteDevelopment from "../../../../assets/websiteDevelopment.webp";
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
    <div className="bg-neutral-color-1 pt-10 text-center">
      <main>
        <ul className="stack-cards js-stack-cards">
          <li className="card p-5" id="card_1">
            <div className="card__content text-[6rem] flex flex-row justify-center items-center align h-[40vh] rounded-xl">
              <p className={"pr-5 text-neutral-color-1"}>{`Our `}</p>
              <p className={"pr-5 text-accent-color-1"}>{`Services`}</p>
            </div>
          </li>
          {servicesList.map((service: { [x: string]: any }) => (
            <li className="card p-5" id="card_1">
              <div className="card__content">
                <div>
                  <h2 className="text-4xl">{service.title}</h2>
                  <p className="text-xl">{service.description}</p>
                  <div>
                    <button className="text-neutral-color-2 bg-neutral-color-1 border-2 border-neutral-color-2 hover:text-neutral-color-1 hover:bg-neutral-color-2 hover:border-neutral-color-1 h-auto p-5 rounded-lg text-xl">
                      Request Demo
                    </button>
                  </div>
                </div>
                <figure>
                  <img src={service.image} alt="Image description" />
                </figure>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};
