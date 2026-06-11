import { DimensionLine } from "../../../../components/Blueprint/DimensionLine";
import { SpecLabel } from "../../../../components/Blueprint/SpecLabel";
import {
  ServiceIcon,
  type ServiceIconName,
} from "../../../../components/Blueprint/ServiceIcon";

type Service = {
  icon: ServiceIconName;
  title: string;
  what: string;
  stack: string[];
  example: string;
};

const servicesList: Service[] = [
  {
    icon: "data",
    title: "Data & business intelligence",
    what: "We build the pipelines and warehouses your reporting runs on.",
    stack: ["kafka", "redshift", "glue", "dbt"],
    example: "Built a satellite imagery lakehouse for Airbus on Glue and Redshift.",
  },
  {
    icon: "cloud",
    title: "Cloud integration & migration",
    what: "We move workloads to AWS and keep the bill in check.",
    stack: ["cdk", "ecs fargate", "well-architected"],
    example:
      "Migrated container workloads to ECS Fargate with CDK and OAuth2-secured APIs.",
  },
  {
    icon: "web",
    title: "Website development & maintenance",
    what: "We ship fast, accessible sites and keep them current.",
    stack: ["react", "typescript", "vite"],
    example:
      "Shipped the Ascent Pharmaceuticals landing experience end to end.",
  },
  {
    icon: "software",
    title: "Custom software development",
    what: "We build the application when off-the-shelf does not fit.",
    stack: ["react", "fastapi", "postgres"],
    example:
      "Built the Kontinued course-discovery and enrollment experience in React and TypeScript.",
  },
];

export const Services = () => {
  return (
    <section className="bg-blueprint-base py-3cell px-cell relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-2cell space-y-4 max-w-2xl">
          <SpecLabel>capabilities</SpecLabel>
          <h2 className="font-display font-extrabold text-display-2 text-chalk">
            What we build
          </h2>
          <DimensionLine reveal className="max-w-xs" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-2cell gap-y-2cell">
          {servicesList.map((service) => (
            <div
              key={service.title}
              className="border-t border-chalk/15 pt-cell"
            >
              <div className="flex items-start gap-4">
                <ServiceIcon
                  name={service.icon}
                  className="text-marker-start shrink-0 mt-1"
                />
                <div>
                  <h3 className="font-display font-bold text-h text-chalk mb-2">
                    {service.title}
                  </h3>
                  <p className="font-sans text-body text-chalk/80">
                    {service.what}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {service.stack.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-label-mono text-chalk/70 border border-chalk/15 rounded-spec px-2.5 py-1 lowercase"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <p className="font-mono text-label-mono text-marker-start lowercase mt-4 leading-relaxed">
                    {service.example}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
