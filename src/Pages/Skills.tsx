import { useEffect, useRef } from "react";
import { FaReact } from "react-icons/fa";
import {
  SiTailwindcss,
  SiJavascript,
  SiTypescript,
  SiGithub,
  SiTestcafe,
} from "react-icons/si";
import { MdSpeed } from "react-icons/md";
import { DiResponsive } from "react-icons/di";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { text: "JavaScript", icon: <SiJavascript />, color: "hover:bg-yellow-500" },
  { text: "React", icon: <FaReact />, color: "hover:bg-blue-400" },
  {
    text: "Responsive Design",
    icon: <DiResponsive />,
    color: "hover:bg-green-500",
  },
  { text: "Git & GitHub", icon: <SiGithub />, color: "hover:bg-gray-700" },
  { text: "TypeScript", icon: <SiTypescript />, color: "hover:bg-blue-600" },
  { text: "Playwright", icon: <SiTestcafe />, color: "hover:bg-indigo-500" },
  { text: "Tailwind CSS", icon: <SiTailwindcss />, color: "hover:bg-teal-400" },
  { text: "Perf Optimization", icon: <MdSpeed />, color: "hover:bg-red-500" },
];

const Skills = () => {
  const boxRef = useRef<HTMLDivElement | null>(null);
  const skillsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!boxRef.current) return;

    gsap.fromTo(
      boxRef.current,
      { y: "100%", opacity: 0 },
      {
        y: "0%",
        opacity: 1,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: boxRef.current,
          start: "top 90%",
          end: "top 40%",
          toggleActions: "play none none reverse",
        },
      }
    );

    skillsRef.current.forEach((el, index) => {
      if (!el) return;

      gsap.fromTo(
        el,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: index * 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: boxRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, []);

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 text-white px-2 sm:px-4">
      <h1 className="text-4xl sm:text-5xl font-bold mb-3 sm:mb-4 text-center">
        My Skills
      </h1>
      <p className="text-lg sm:text-xl mb-6 sm:mb-8 max-w-xl text-center">
        A collection of my technical skills and expertise honed through various
        projects and experiences.
      </p>
      <div
        ref={boxRef}
        className="bg-gray-800 rounded-2xl p-3 sm:p-8 shadow-lg w-full max-w-3xl flex justify-center items-center">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-6 w-full">
          {skills.map((skill, index) => (
            <div
              key={index}
              ref={(el) => {
                skillsRef.current[index] = el;
              }}
              className={`
                flex items-center justify-center
                bg-gray-700 rounded-full
                px-3 sm:px-6 py-2 sm:py-3
                text-sm sm:text-lg font-medium space-x-2 transition-colors duration-300
                ${skill.color}
              `}>
              <div className="text-2xl sm:text-3xl">{skill.icon}</div>
              <span>{skill.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
