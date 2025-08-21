interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
  linkUrl: string;
  technologies: string[];
}

export const ProjectCard = ({ title, description, imageUrl, linkUrl, technologies }: ProjectCardProps) => {
  return (
    <a
      href={linkUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group block relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
    >
      {/* Background Image */}
      <div className="relative h-64 w-full">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Dark Overlay - Always present, darker on hover */}
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/70 transition-all duration-300" />
        
        {/* Content Overlay */}
        <div className="absolute inset-0 p-6 flex flex-col justify-end">
          {/* Title - Always visible but more prominent on hover */}
          <h3 className="text-xl font-bold text-white mb-2 drop-shadow-lg">
            {title}
          </h3>
          
          {/* Description - Appears on hover */}
          <p className="text-white/0 group-hover:text-white/90 transition-all duration-300 text-sm leading-relaxed mb-3 drop-shadow-lg">
            {description}
          </p>
          
          {/* Technologies - Appears on hover */}
          <div className="flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
            {technologies.map((tech, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-primary-color-1/80 text-white text-xs rounded-full font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
          
          {/* View Project Button - Appears on hover */}
          <div className="mt-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <span className="inline-flex items-center text-white font-medium text-sm">
              View Project
              <svg
                className="ml-2 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}; 