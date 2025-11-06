import React, { useState } from "react";

interface Project {
  id: string;
  title: string;
  image: string;
  images?: string[];
  githubUrl: string;
  description: string;
  features: string[];
  techStack: string[];
}

const projects: Project[] = [
  {
    id: "beawesome-gpt",
    title: "BEAWESOME GPT",
    image: "stinson4.png",
    images: ["stinson4.png", "stinson3.png", "stinson2.png", "stinson1.png"],
    githubUrl: "https://github.com/saurabh6893/Beawesomegpt",
    description:
      "Developed a full-stack conversational web app that simulates interacting with a beloved character (e.g., Barney Stinson from How I Met Your Mother). Users engage in dynamic, context-aware dialogue powered by OpenAI's GPT‑3.5. The app utilizes in-memory and vector-based retrieval (via Pinecone) to maintain conversation context. It features smooth UI transitions using GSAP and client-side routing for a modern single-page experience. The backend, built with Node.js and Express, handles conversation persistence in MongoDB, enforces rate limiting, and exposes RESTful endpoints to support front-end interactions.",
    features: [
      "🎭 Character-specific AI responses powered by GPT‑3.5",
      "🔁 Contextual continuity with Pinecone-powered memory",
      "💬 Chat history saved to MongoDB for session persistence",
      "🚫 Rate limiting implemented for fair usage",
      "🔄 Dynamic routing & animated UX powered by React + GSAP",
    ],
    techStack: [
      "React",
      "TypeScript",
      "GSAP",
      "Express.js",
      "MongoDB",
      "OpenAI GPT‑3.5 API",
      "Pinecone",
    ],
  },
  {
    id: "neuroforce-mern",
    title: "Neuroforce (MERN Migration)",
    image: "neuro1.png",
    images: ["neuro1.png", "neuro2.png", "neuro3.png"], // Multiple images
    githubUrl:
      "https://github.com/saurabh6893/neuroforce/tree/feature/mern-migration",
    description:
      "A full-stack migration of the Neuroforce project to the MERN stack (MongoDB, Express.js, React, Node.js). This involves restructuring the backend with Express.js and MongoDB for scalable data storage, while transitioning the frontend to React for a modern, interactive user experience. The migration focuses on improving performance, maintainability, and developer experience.",
    features: [
      "🚀 MERN Stack Transition – Migrated from a legacy stack to MongoDB + Express + React + Node.js",
      "🔄 RESTful API – Backend exposes structured endpoints for CRUD operations",
      "🧠 MongoDB Data Models – Optimized database schemas for neuro-related data",
      "⚛️ React Frontend – Dynamic UI with reusable components, state management, and modern hooks",
      "🔒 Authentication – JWT-based user sessions for secure access",
      "📊 Real-time Data Handling – Efficient API integrations for neuroscientific computations",
    ],
    techStack: ["React", "Node.js", "Express.js", "MongoDB", "JWT", "REST API"],
  },
];

// Image Slider Component
const ImageSlider: React.FC<{
  images: string[];
  title: string;
}> = ({ images, title }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!images || images.length === 0) return null;

  const goToPrev = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="relative w-full rounded-xl overflow-hidden bg-gray-900">
      <div className="relative w-full h-96">
        <img
          src={images[currentImageIndex]}
          alt={`${title} - ${currentImageIndex + 1}`}
          className="w-full h-full object-cover"
        />

        <div className="absolute top-4 right-4 bg-black bg-opacity-60 px-3 py-1 rounded-full text-cyan-300 text-sm font-semibold">
          {currentImageIndex + 1} / {images.length}
        </div>
      </div>

      {images.length > 1 && (
        <>
          <button
            onClick={goToPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full w-10 h-10 flex items-center justify-center transition-all duration-300 font-bold text-lg">
            ❮
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full w-10 h-10 flex items-center justify-center transition-all duration-300 font-bold text-lg">
            ❯
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImageIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  idx === currentImageIndex
                    ? "bg-cyan-400 w-6"
                    : "bg-white bg-opacity-50 hover:bg-opacity-70"
                }`}
                aria-label={`Go to image ${idx + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const ProjectModal: React.FC<{
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}> = ({ project, isOpen, onClose }) => {
  if (!isOpen || !project) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
      onClick={onClose}>
      <div
        className="bg-gradient-to-br from-cyan-900 via-neutral-900 to-teal-900 rounded-2xl shadow-2xl border border-cyan-700 max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center p-6 bg-gradient-to-r from-cyan-900 to-teal-900 border-b border-cyan-700 flex-shrink-0">
          <h2 className="text-3xl font-bold text-cyan-300">{project.title}</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-cyan-300 text-2xl font-bold transition-colors flex-shrink-0">
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-hide p-8 space-y-6">
          <ImageSlider
            images={project.images || [project.image]}
            title={project.title}
          />

          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-green-400 hover:text-teal-300 text-base font-medium transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              width={20}
              height={20}
              viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            View on GitHub
          </a>

          <div>
            <h3 className="text-lg font-semibold text-cyan-300 mb-2">
              Overview
            </h3>
            <p className="text-gray-300 text-base leading-relaxed">
              {project.description}
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-cyan-300 mb-3">
              Key Features:
            </h4>
            <ul className="list-none space-y-2">
              {project.features.map((feat, idx) => (
                <li
                  key={idx}
                  className="relative pl-6 text-gray-300 text-sm leading-relaxed">
                  <span className="absolute left-0 top-1 text-orange-400 font-bold text-lg">
                    ●
                  </span>
                  {feat}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-cyan-300 mb-3">
              Tech Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 rounded-full bg-cyan-900 border border-cyan-600 text-cyan-300 text-sm font-semibold hover:bg-cyan-800 transition-colors">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 bg-gradient-to-r from-cyan-900 to-teal-900 border-t border-cyan-700 flex-shrink-0">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center py-3 rounded-lg font-bold bg-gradient-to-r from-cyan-400 via-teal-300 to-yellow-400 text-gray-900 hover:shadow-lg hover:shadow-cyan-400/50 transition-all duration-300">
            Visit Repository →
          </a>
        </div>
      </div>
    </div>
  );
};

// Project Card (Horizontal Scroll)
const ProjectCard: React.FC<{
  project: Project;
  onClick: () => void;
}> = ({ project, onClick }) => (
  <div
    onClick={onClick}
    className="flex-shrink-0 w-full bg-gradient-to-br from-cyan-900 via-neutral-900 to-teal-900 shadow-lg rounded-xl overflow-hidden hover:-translate-y-2 transition-all duration-300 border border-cyan-800 cursor-pointer group">
    <div className="w-full h-80 bg-gray-900 flex items-center justify-center overflow-hidden">
      <img
        src={project.image}
        alt={project.title}
        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
      />
    </div>

    <div className="p-8 flex flex-col gap-4">
      <h3 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
        {project.title}
      </h3>

      <a
        href={project.githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className="flex items-center gap-2 text-green-400 hover:text-teal-300 text-sm font-medium transition-colors">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          width={18}
          height={18}
          viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
        GitHub Repository
      </a>

      <p className="text-gray-300 text-sm line-clamp-2">
        {project.description}
      </p>

      <div>
        <h4 className="text-white font-semibold text-xs mb-2">Tech Stack</h4>
        <div className="flex flex-wrap gap-2">
          {project.techStack.slice(0, 4).map((tech, idx) => (
            <span
              key={idx}
              className="px-2 py-1 rounded-full bg-cyan-900 border border-cyan-600 text-cyan-300 text-xs font-semibold">
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="px-2 py-1 text-cyan-400 text-xs">
              +{project.techStack.length - 4}
            </span>
          )}
        </div>
      </div>

      <p className="text-cyan-400 text-xs font-semibold group-hover:text-yellow-400 transition-colors">
        Click to view details →
      </p>
    </div>
  </div>
);

const Projects = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentProject = projects[currentIndex];

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <section
      className="min-h-screen py-20 bg-gradient-to-br from-gray-900 via-teal-950 to-cyan-950"
      id="projects">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-12 gap-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-cyan-400">
            Projects
          </h1>
          <span className="text-lg text-gray-400 font-semibold">
            <span className="text-cyan-400 font-bold">{currentIndex + 1}</span>
            <span className="text-gray-500"> / </span>
            <span className="text-gray-400">{projects.length}</span>
          </span>
        </div>

        <div className="relative">
          <div className="flex justify-center items-center">
            <div className="w-full max-w-2xl">
              <ProjectCard
                project={currentProject}
                onClick={() => openModal(currentProject)}
              />
            </div>
          </div>

          <button
            onClick={goToPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-20 md:-translate-x-16 w-12 h-12 bg-cyan-900 border border-cyan-600 rounded-full flex items-center justify-center hover:bg-cyan-800 transition-all duration-300 text-white text-xl font-bold group hover:text-cyan-300">
            ❮
          </button>

          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-20 md:translate-x-16 w-12 h-12 bg-cyan-900 border border-cyan-600 rounded-full flex items-center justify-center hover:bg-cyan-800 transition-all duration-300 text-white text-xl font-bold group hover:text-cyan-300">
            ❯
          </button>
        </div>

        <div className="flex justify-center gap-3 mt-12">
          {Array.from({ length: projects.length }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`transition-all duration-300 rounded-full ${
                i === currentIndex
                  ? "w-8 h-3 bg-cyan-400"
                  : "w-3 h-3 bg-cyan-800 border border-cyan-500 hover:bg-cyan-700"
              }`}
              aria-label={`Go to project ${i + 1}`}
              aria-current={i === currentIndex ? "page" : undefined}
            />
          ))}
        </div>
      </div>

      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeModal}
      />

      <style>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default Projects;
