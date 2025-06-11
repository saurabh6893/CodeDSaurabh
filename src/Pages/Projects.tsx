import { useState, useRef, useEffect } from "react";
import gsap from "gsap";

interface Project {
  name: string;
  description: string;
  github: string;
  techStack: string;
  images: string[];
}

const projects: Project[] = [
  {
    name: "BEAWESOME GPT",
    description: `
      Developed a full-stack conversational web app that simulates interacting with a beloved character (e.g., Barney Stinson from How I Met Your Mother). Users engage in dynamic, context-aware dialogue powered by OpenAI's GPT‑3.5. 
      The app utilizes in-memory and vector-based retrieval (via Pinecone) to maintain conversation context. It features smooth UI transitions using GSAP and client-side routing for a modern single-page experience.
      The backend, built with Node.js and Express, handles conversation persistence in MongoDB, enforces rate limiting, and exposes RESTful endpoints to support front-end interactions.
      
      Key Features:

      🎭 Character-specific AI responses powered by GPT‑3.5

      🔁 Contextual continuity with Pinecone-powered memory

      💬 Chat history saved to MongoDB for session persistence

      🚫 Rate limiting implemented for fair usage

      🔄 Dynamic routing & animated UX powered by React + GSAP
    `,
    github: "https://github.com/saurabh6893/Beawesomegpt",
    techStack:
      "React, TypeScript, GSAP, Express.js, MongoDB, OpenAI GPT‑3.5 API, Pinecone",
    images: ["stinson4.png", "stinson3.png", "stinson2.png", "stinson1.png"],
  },
  {
    name: "Neuroforce (MERN Migration)",
    description: `
      A full-stack migration of the Neuroforce project to the MERN stack (MongoDB, Express.js, React, Node.js). This involves restructuring the backend with Express.js and MongoDB for scalable data storage, 
      while transitioning the frontend to React for a modern, interactive user experience. The migration focuses on improving performance, maintainability, and developer experience.

      Key Features:

      🚀 MERN Stack Transition – Migrated from a legacy stack to MongoDB + Express + React + Node.js.
      
      🔄 RESTful API – Backend exposes structured endpoints for CRUD operations.
      
      🧠 MongoDB Data Models – Optimized database schemas for neuro-related data (e.g., brainwave analysis, cognitive metrics).
      
      ⚛️ React Frontend – Dynamic UI with reusable components, state management, and modern hooks.
      
      🔒 Authentication – JWT-based user sessions for secure access.
      
      📊 Real-time Data Handling – Efficient API integrations for neuroscientific computations.

      Future Work:
      - Integrate Redux/Context for global state.
      - Add real-time updates via WebSockets.
      - Optimize MongoDB queries for large-scale neuro datasets.
    `,
    github:
      "https://github.com/saurabh6893/neuroforce/tree/feature/mern-migration",
    techStack: "React, Node.js, Express.js, MongoDB, JWT, REST API",
    images: ["neuro1.png", "neuro2.png", "neuro3.png"],
  },
];

const Projects = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const cardRef = useRef<HTMLDivElement | null>(null);

  const currentProject = projects[currentIndex];

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, x: 40 },
        { opacity: 1, x: 0, duration: 0.5 }
      );
    }
  }, [currentIndex]);

  const nextProject = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
    setImageIndex(0);
  };

  const prevProject = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + projects.length) % projects.length
    );
    setImageIndex(0);
  };

  const nextImage = () => {
    setImageIndex(
      (prevIndex) => (prevIndex + 1) % currentProject.images.length
    );
  };

  const prevImage = () => {
    setImageIndex(
      (prevIndex) =>
        (prevIndex - 1 + currentProject.images.length) %
        currentProject.images.length
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-800 via-gray-900 to-black flex flex-col items-center justify-center text-white px-2 sm:px-4 py-10">
      <h1 className="text-4xl sm:text-5xl font-bold mb-6 sm:mb-8 text-center">
        Projects
      </h1>
      <div className="relative w-full max-w-lg sm:max-w-3xl md:max-w-4xl mx-auto">
        {/* Project Card (only current) */}
        <div
          ref={cardRef}
          className="bg-gray-900 p-4 sm:p-8 rounded-lg shadow-lg w-full flex flex-col md:flex-row items-stretch">
          {/* Image section */}
          <div className="flex flex-col justify-center items-center mb-4 md:mb-0 md:mr-6 w-full md:w-1/2 relative">
            <img
              src={currentProject.images[imageIndex]}
              alt={currentProject.name}
              className="object-cover w-[200px] h-[260px] sm:w-[270px] sm:h-[340px] rounded shadow-md"
            />
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 text-xl bg-gray-700 bg-opacity-60 hover:bg-opacity-80 rounded-full w-8 h-8 flex items-center justify-center">
              ◀
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xl bg-gray-700 bg-opacity-60 hover:bg-opacity-80 rounded-full w-8 h-8 flex items-center justify-center">
              ▶
            </button>
          </div>
          {/* Details section */}
          <div className="w-full md:w-1/2 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-4">
                {currentProject.name}
              </h2>
              <div className="text-sm sm:text-base mb-4 overflow-auto max-h-[180px] sm:max-h-[340px] scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-300 whitespace-pre-line">
                {currentProject.description}
              </div>
              <p className="mb-2">
                <a
                  href={currentProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline">
                  GitHub Repo
                </a>
              </p>
              <div className="flex flex-wrap mt-2">
                {currentProject.techStack.split(",").map((tech) => (
                  <span
                    key={tech}
                    className="bg-gray-600 text-xs sm:text-sm px-2 py-1 mr-2 mb-2 rounded">
                    {tech.trim()}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Desktop/Tablet Project navigation (sides) */}
        <button
          onClick={prevProject}
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center bg-gray-800 bg-opacity-50 hover:bg-opacity-70 transition-all duration-300 rounded-full group z-20">
          <span className="text-2xl">❮</span>
        </button>
        <button
          onClick={nextProject}
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center bg-gray-800 bg-opacity-50 hover:bg-opacity-70 transition-all duration-300 rounded-full group z-20">
          <span className="text-2xl">❯</span>
        </button>
      </div>

      {/* Mobile navigation below card */}
      <div className="flex md:hidden justify-center gap-8 mt-4">
        <button
          onClick={prevProject}
          className="flex items-center justify-center bg-gray-800 bg-opacity-70 hover:bg-opacity-90 rounded-full w-10 h-10">
          <span className="text-xl">❮</span>
        </button>
        <button
          onClick={nextProject}
          className="flex items-center justify-center bg-gray-800 bg-opacity-70 hover:bg-opacity-90 rounded-full w-10 h-10">
          <span className="text-xl">❯</span>
        </button>
      </div>
    </div>
  );
};

export default Projects;
