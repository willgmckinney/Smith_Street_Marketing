import { BlueprintCard } from "../../../components/Blueprint/BlueprintCard";
import { DimensionLine } from "../../../components/Blueprint/DimensionLine";

interface ProjectCardProps {
  index: number;
  title: string;
  description: string;
  imageUrl: string;
  linkUrl: string;
  technologies: string[];
}

export const ProjectCard = ({
  index,
  title,
  description,
  imageUrl,
  linkUrl,
  technologies,
}: ProjectCardProps) => {
  return (
    <a
      href={linkUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1rem)]"
    >
      <BlueprintCard
        index={index}
        accent
        className="h-full group transition-all duration-[120ms] ease-spec hover:-translate-y-px"
      >
        <div className="relative h-64 w-full overflow-hidden border-b border-chalk/10 bg-blueprint-base">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-blueprint-base via-blueprint-base/50 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />

          <div className="absolute bottom-4 right-4 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            <div className="bg-marker-start p-2 rounded-spec border border-chalk/10">
              <svg
                className="w-6 h-6 text-drafting-surface"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="p-6 pt-12 flex flex-col h-[calc(100%-16rem)]">
          <DimensionLine className="mb-4 max-w-[120px]" />

          <h3 className="font-display font-bold text-xl text-chalk mb-3 group-hover:text-marker-start transition-colors">
            {title}
          </h3>

          <p className="font-sans text-sm text-chalk/80 leading-relaxed mb-6 flex-grow">
            {description}
          </p>

          <div className="flex flex-wrap gap-2 mt-auto">
            {technologies.map((tech, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-blueprint-base border border-chalk/10 text-chalk text-xs rounded-spec font-mono tracking-wide"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </BlueprintCard>
    </a>
  );
};
