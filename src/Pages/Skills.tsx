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
    <section className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 text-white">
      <h1 className="text-5xl font-bold mb-4">My Skills</h1>
      <p className="text-xl mb-8">
        A collection of my technical skills and expertise honed through various
        projects and experiences.
      </p>
      <div
        ref={boxRef}
        className="bg-gray-800 rounded-lg p-12 shadow-lg w-full max-w-4xl h-96 flex justify-center items-center">
        <div className="flex flex-wrap gap-6 justify-center">
          {skills.map((skill, index) => (
            <div
              key={index}
              ref={(el) => {
                skillsRef.current[index] = el;
              }}
              className={`flex items-center bg-gray-700 rounded-full px-6 py-3 text-xl font-medium space-x-3 transition-colors duration-300 ${skill.color}`}>
              <div className="text-3xl">{skill.icon}</div>
              <span>{skill.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
