interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
}

export default function ProjectCard({ title, description, technologies, link }: ProjectCardProps) {
  return (
    <article className="border border-slate-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow bg-white flex flex-col h-full">
      <h3 className="text-xl font-semibold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-600 mb-4 flex-grow">{description}</p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {technologies.map((tech) => (
          <span 
            key={tech} 
            className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded"
          >
            {tech}
          </span>
        ))}
      </div>

      {link && (
        <div className="mt-auto pt-2">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-blue-600 rounded inline-block"
            aria-label={`View ${title} project (opens in a new tab)`}
          >
            View Project &rarr;
          </a>
        </div>
      )}
    </article>
  );
}