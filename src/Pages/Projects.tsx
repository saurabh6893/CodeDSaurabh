import React, { useState } from "react";
import gsap from "gsap";

const projects = [
  {
    name: "BEAWESOME GPT",
    description: `
      Developed a full-stack conversational web app that simulates interacting with a beloved character (e.g., Barney Stinson from How I Met Your Mother). Users engage in dynamic, context-aware dialogue powered by OpenAI’s GPT‑3.5. The app utilizes in-memory and vector-based retrieval (via Pinecone) to maintain conversation context. It features smooth UI transitions using GSAP and client-side routing for a modern single-page experience. The backend, built with Node.js and Express, handles conversation persistence in MongoDB, enforces rate limiting, and exposes RESTful endpoints to support front-end interactions.
      
      Key Features:

      🎭 Character-specific AI responses powered by GPT‑3.5

      🔁 Contextual continuity with Pinecone-powered memory

      💬 Chat history saved to MongoDB for session persistence

      🚫 Rate limiting implemented for fair usage

      🔄 Dynamic routing & animated UX powered by React + GSAP
    `,
    github: "https://github.com/saurabh6893/Beawesomegpt",
    techStack:
      "React,TypeScript,GSAP,Express.js,MongoDB,OpenAI GPT‑3.5 API,Pinecone",
    images: ["stinson4.png", "stinson3.png", "stinson2.png", "stinson1.png"],
  },
  {
    name: "Neuroforce (MERN Migration)",
    description: `
      A full-stack migration of the Neuroforce project to the MERN stack (MongoDB, Express.js, React, Node.js). This involves restructuring the backend with Express.js and MongoDB for scalable data storage, while transitioning the frontend to React for a modern, interactive user experience. The migration focuses on improving performance, maintainability, and developer experience.

      Key Features:

      🚀 **MERN Stack Transition** – Migrated from a legacy stack to MongoDB + Express + React + Node.js.
      
      🔄 **RESTful API** – Backend exposes structured endpoints for CRUD operations.
      
      🧠 **MongoDB Data Models** – Optimized database schemas for neuro-related data (e.g., brainwave analysis, cognitive metrics).
      
      ⚛️ **React Frontend** – Dynamic UI with reusable components, state management, and modern hooks.
      
      🔒 **Authentication** – JWT-based user sessions for secure access.
      
      📊 **Real-time Data Handling** – Efficient API integrations for neuroscientific computations.

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
    <div className="h-screen bg-gray-800 flex flex-col items-center justify-center text-white px-4">
      <div className="w-full max-w-6xl bg-gray-900 p-8 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">{currentProject.name}</h2>
          <div className="flex items-center">
            <button
              onClick={prevProject}
              className="text-2xl p-2 hover:text-gray-300">
              ◀
            </button>
            <button
              onClick={nextProject}
              className="text-2xl p-2 hover:text-gray-300">
              ▶
            </button>
          </div>
        </div>
        <div className="flex">
          <div className="w-2/5 mr-6">
            <img
              src={currentProject.images[imageIndex]}
              alt={currentProject.name}
              className="object-cover w-full h-64 rounded shadow-md"
            />
            <div className="flex justify-center mt-2">
              <button
                onClick={prevImage}
                className="text-xl p-2 hover:text-gray-300">
                ◀
              </button>
              <button
                onClick={nextImage}
                className="text-xl p-2 hover:text-gray-300">
                ▶
              </button>
            </div>
          </div>
          <div className="w-3/5">
            <p className="text-base mb-4 overflow-auto h-56 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-300">
              {currentProject.description}
            </p>
            <p className="mb-2">
              <a
                href={currentProject.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline">
                GitHub Repo
              </a>
            </p>
            <div className="flex flex-wrap space-x-2 space-y-2 bg-gray-700 p-2 rounded">
              {currentProject.techStack.split(",").map((tech) => (
                <span
                  key={tech}
                  className="bg-gray-600 text-sm px-2 py-1 rounded">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
