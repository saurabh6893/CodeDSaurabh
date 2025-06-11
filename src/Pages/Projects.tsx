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
  const currentProject = projects[currentIndex];
  const [imageIndex, setImageIndex] = useState(0);
  const cardContainerRef = useRef<(HTMLDivElement | null)[]>([]);

  // Initialize ref array
  useEffect(() => {
    cardContainerRef.current = cardContainerRef.current.slice(
      0,
      projects.length
    );
  }, []);

  useEffect(() => {
    cardContainerRef.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(
          card,
          { opacity: 0, x: index === currentIndex ? "100%" : "0%" },
          { opacity: index === currentIndex ? 1 : 0, x: "0%", duration: 0.5 }
        );
      }
    });
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
    <div className="min-h-screen bg-gradient-to-r from-gray-800 via-gray-900 to-black flex flex-col items-center justify-center text-white px-4">
      <h1 className="text-5xl font-bold mb-8">Projects</h1>

      <div className="relative w-3/4 max-w-[1200px] h-[480px]">
        {projects.map((project, index) => (
          <div
            key={index}
            ref={(el) => {
              if (el) {
                cardContainerRef.current[index] = el;
              }
            }}
            className={`absolute top-0 left-0 bg-gray-900 p-8 rounded-lg shadow-lg flex items-stretch w-full transition-all duration-500 ${
              currentIndex === index ? "z-10" : "z-0"
            }`}
            style={{
              opacity: currentIndex === index ? 1 : 0,
              transform:
                currentIndex === index ? "translateX(0)" : "translateX(100%)",
            }}>
            <div className="flex flex-col justify-center items-center mr-6 w-1/2 relative h-full">
              <img
                src={project.images[imageIndex]}
                alt={project.name}
                className="object-cover w-full max-h-[80vh] rounded shadow-md"
              />
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 text-xl bg-gray-700 bg-opacity-60 hover:bg-opacity-80 rounded-full w-10 h-10 flex items-center justify-center">
                ◀
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xl bg-gray-700 bg-opacity-60 hover:bg-opacity-80 rounded-full w-10 h-10 flex items-center justify-center">
                ▶
              </button>
            </div>
            <div className="w-1/2">
              <h2 className="text-3xl font-bold mb-4">{project.name}</h2>
              <div className="text-base mb-4 overflow-auto max-h-[400px] scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-300">
                {project.description}
              </div>
              <p className="mb-2">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline">
                  GitHub Repo
                </a>
              </p>
              <div className="flex flex-wrap mt-4">
                {project.techStack.split(",").map((tech) => (
                  <span
                    key={tech}
                    className="bg-gray-600 text-sm px-2 py-1 mr-2 mb-2 rounded">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={prevProject}
          className="absolute left-0 top-0 h-full w-16 flex items-center justify-center bg-gray-800 bg-opacity-50 hover:bg-opacity-70 transition-all duration-300 rounded-l-lg group -translate-x-full z-20"></button>

        <button
          onClick={nextProject}
          className="absolute right-0 top-0 h-full w-16 flex items-center justify-center bg-gray-800 bg-opacity-50 hover:bg-opacity-70 transition-all duration-300 rounded-r-lg group translate-x-full z-20"></button>
      </div>
    </div>
  );
};

export default Projects;
