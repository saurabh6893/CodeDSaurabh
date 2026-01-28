import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

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
  const containerRef = useRef<HTMLElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useGSAP(() => {
    const panels = gsap.utils.toArray(".project-panel");
    const totalPanels = panels.length;
    
    gsap.fromTo(panels, 
      { xPercent: 0 },
      {
        xPercent: -100 * (totalPanels - 1),
        ease: "none",
        scrollTrigger: {
            trigger: containerRef.current,
            pin: true,
            scrub: 1,
            // Use functional value for end to support refresh
            end: () => "+=" + (containerRef.current?.offsetWidth || window.innerWidth), 
            snap: 1 / (totalPanels - 1), 
            invalidateOnRefresh: true, // Crucial for horizontal scroll resizing
        }
    });
  }, { scope: containerRef });

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
        ref={containerRef}
        className="h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-teal-950 to-cyan-950 relative z-20"
        id="projects">
        
        {/* Horizontal Container */}
        <div ref={sliderRef} className="flex h-full w-[200%] sm:w-[200%]"> 
            {/* Note: Width should be 100% * number of projects. We have 2 projects, so 200%. 
                Dynamic width handling in production apps usually done via style={{ width: `${projects.length * 100}%` }}
            */}
            <style>{`.project-panel { width: 100vw; height: 100vh; flex-shrink: 0; }`}</style>
            
            {projects.map((project, index) => (
                <div key={project.id} className="project-panel flex items-center justify-center p-4 sm:p-20 border-r border-gray-800/50">
                    <div className="w-full max-w-6xl flex flex-col md:flex-row items-center gap-10">
                        {/* Image Side */}
                        <div className="w-full md:w-1/2">
                            <ProjectCard
                                project={project}
                                onClick={() => openModal(project)}
                            />
                        </div>
                        
                        {/* Text Side (Visible on large screens for context) */}
                        <div className="hidden md:flex w-full md:w-1/2 flex-col text-left">
                            <span className="text-cyan-400 font-bold text-xl mb-2">Project 0{index + 1}</span>
                            <h2 className="text-5xl font-bold text-white mb-6">{project.title}</h2>
                            <p className="text-gray-300 text-lg mb-8 line-clamp-4">{project.description}</p>
                             <button
                                onClick={() => openModal(project)}
                                className="w-fit px-8 py-3 rounded-full bg-cyan-500 text-black font-bold hover:bg-cyan-400 transition-colors">
                                View Case Study
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        <div className="absolute bottom-10 left-10 text-white opacity-50 pointer-events-none">
            &larr; Scroll to explore &rarr;
        </div>

      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </section>
  );
};

export default Projects;
