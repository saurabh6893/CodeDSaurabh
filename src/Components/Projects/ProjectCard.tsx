import React from "react";

interface ProjectProps {
  project: {
    id: string;
    title: string;
    image: string;
    githubUrl: string;
    description: string;
    features: string[];
    techStack: string[];
  };
}

export const ProjectCard: React.FC<ProjectProps> = ({ project }) => (
  <div className="bg-gradient-to-br from-cyan-900 via-neutral-900 to-teal-900 shadow-lg rounded-xl overflow-hidden hover:-translate-y-2 transition-transform border border-cyan-800">
    {/* Image */}
    <div className="w-full h-64 bg-gray-900 flex items-center justify-center">
      <img
        src={project.image}
        alt={project.title}
        className="object-cover w-full h-full"
      />
    </div>
    {/* Content */}
    <div className="p-6 flex flex-col gap-3">
      {/* Title */}
      <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
      {/* GitHub Link */}
      <a
        href={project.githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1 text-green-400 hover:text-teal-300 text-sm font-medium">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          width={18}
          height={18}
          viewBox="0 0 24 24">
          <path d="..." />
        </svg>
        GitHub Repository
      </a>
      {/* Description */}
      <p className="text-gray-300 text-[15px]">{project.description}</p>
      {/* Key Features */}
      <div>
        <h4 className="text-white font-semibold text-sm mb-1">Key Features:</h4>
        <ul className="list-none space-y-1">
          {project.features.map((feat, idx) => (
            <li key={idx} className="relative pl-5 text-gray-300 text-[13px]">
              <span className="absolute left-0 top-0 text-orange-400 font-bold text-xl">
                &#8226;
              </span>
              {feat}
            </li>
          ))}
        </ul>
      </div>
      {/* Tech Stack */}
      <div>
        <h4 className="text-white font-semibold text-sm mb-1">Tech Stack</h4>
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech, idx) => (
            <span
              key={idx}
              className="px-3 py-1 rounded-full bg-cyan-900 border border-cyan-600 text-cyan-400 text-xs font-semibold">
              {tech}
            </span>
          ))}
        </div>
      </div>
      {/* CTA Button */}
      <a
        href={project.githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 block w-full text-center py-3 rounded-lg font-bold bg-gradient-to-r from-cyan-400 via-teal-300 to-yellow-400 text-gray-900 hover:scale-105 transition">
        View on GitHub →
      </a>
    </div>
  </div>
);
