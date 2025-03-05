import React from "react";
import { FaReact } from "react-icons/fa";
import {
  SiTailwindcss,
  SiJavascript,
  SiTypescript,
  SiGithub,
  SiTestcafe,
} from "react-icons/si";
import { MdSpeed } from "react-icons/md";
import RotatingText from "../Components/RotatingText";
import { DiResponsive } from "react-icons/di";

const skills = [
  {
    text: "JavaScript",
    icon: <SiJavascript className="ml-2 text-yellow-500" />,
  },
  { text: "React", icon: <FaReact className="ml-2 text-blue-500" /> },
  {
    text: "Responsive Design",
    icon: <DiResponsive className="ml-2 text-blue-500" />,
  },
  { text: "Git & GitHub", icon: <SiGithub className="ml-2 text-gray-800" /> },
  { text: "TypeScript", icon: <SiTypescript className="ml-2 text-blue-600" /> },
  { text: "Playwright", icon: <SiTestcafe className="ml-2 text-blue-600" /> },

  {
    text: "Tailwind CSS",
    icon: <SiTailwindcss className="ml-2 text-teal-500" />,
  },
  {
    text: `Performance Optimization`,
    icon: <MdSpeed className="ml-2 text-red-500" />,
  },
];

const Skills = () => {
  return (
    <section className="relative w-full h-[40vh] bg-[#fdf0d5] flex flex-col justify-center items-center text-center px-4">
      <h1 className="absolute top-10">My Skill Stack</h1>
      <RotatingText
        texts={skills}
        mainClassName="introText inline-flex items-center font-Galada text-2xl md:text-6xl lg:text-8xl w-full sm:px-2 md:px-3 text-black overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
        staggerFrom={"last"}
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "-120%" }}
        staggerDuration={0.025}
        splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
        transition={{ type: "spring", damping: 30, stiffness: 400 }}
        rotationInterval={2000}
      />
    </section>
  );
};

export default Skills;
