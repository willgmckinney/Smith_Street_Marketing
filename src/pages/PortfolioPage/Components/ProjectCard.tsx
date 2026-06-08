import { BlueprintCard } from "../../../components/Blueprint/BlueprintCard";

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
  linkUrl: string;
  technologies: string[];
}

export const ProjectCard = ({
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
      <BlueprintCard className="h-full group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
        {/* Background Image Container */}
        <div className="relative h-64 w-full overflow-hidden border-b border-white/10 bg-blueprint-base">
          <img
            src={imageUrl}
            alt={title}
            className={`w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-110 `}
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-blueprint-base via-blueprint-base/50 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />

          {/* View Project Indicator */}
          <div className="absolute bottom-4 right-4 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            <div className="bg-marker-gradient p-2 rounded-full shadow-lg">
              <svg
                className="w-6 h-6 text-blueprint-base"
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

        {/* Content */}
        <div className="p-6 flex flex-col h-[calc(100%-16rem)]">
          <h3 className="font-display font-bold text-xl text-white mb-3 group-hover:text-marker-start transition-colors">
            {title}
          </h3>

          <p className="font-sans text-sm text-chalk/80 leading-relaxed mb-6 flex-grow">
            {description}
          </p>

          <div className="flex flex-wrap gap-2 mt-auto">
            {technologies.map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-white/5 border border-white/10 text-chalk text-xs rounded-full font-medium backdrop-blur-sm"
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
