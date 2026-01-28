import { useRef } from "react";
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
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { text: "JavaScript", icon: <SiJavascript />, color: "hover:bg-yellow-500", speed: 0.2 },
  { text: "React", icon: <FaReact />, color: "hover:bg-blue-400", speed: 0.5 },
  {
    text: "Responsive Design",
    icon: <DiResponsive />,
    color: "hover:bg-green-500",
    speed: 0.3
  },
  { text: "Git & GitHub", icon: <SiGithub />, color: "hover:bg-gray-700", speed: 0.8 },
  { text: "TypeScript", icon: <SiTypescript />, color: "hover:bg-blue-600", speed: 0.4 },
  { text: "Playwright", icon: <SiTestcafe />, color: "hover:bg-indigo-500", speed: 0.6 },
  { text: "Tailwind CSS", icon: <SiTailwindcss />, color: "hover:bg-teal-400", speed: 0.1 },
  { text: "Perf Optimization", icon: <MdSpeed />, color: "hover:bg-red-500", speed: 0.7 },
];

const Skills = () => {
  const containerRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom center",
        scrub: 1,
      },
    });

    skillsRef.current.forEach((el, index) => {
      if (!el) return;
      
      const speed = skills[index].speed;

      const randomZ = Math.random() * 500 - 200; 
      const randomRot = Math.random() * 90 - 45;
      

      gsap.set(el, { 
          opacity: 0, 
          z: randomZ, 
          rotation: randomRot, 
          scale: 0.5, 
          y: 100 * speed 
      });
      
      // Enter Animation (Scroll-driven)
      gsap.fromTo(el, 
        { 
          opacity: 0,
          z: randomZ,
          rotation: randomRot,
          scale: 0.5,
          y: 100 * speed
        },
        {
          opacity: 1,
          z: 0,
          rotation: 0,
          scale: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 90%",
            end: "top 100%",
            scrub: 2,
            invalidateOnRefresh: true,
          }
        }
      );
      
      // 2. Parallax Exit (Continuous)
      // Note: We use a separate timeline or just a simple to() that starts AFTER entry or runs in parallel but affects a different property (y)
      // To avoid conflict, we can animate a wrapper or use overwrite: 'auto', but since the first anim ends at y:0, we can start the second one from y:0
      gsap.fromTo(el,
        { y: 0 },
        {
          y: -50 * speed,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom", // Starts as soon as section enters
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
          }
        }
      );
    });

    gsap.from(".skills-title", {
        y: 50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
        }
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white px-2 sm:px-4 perspective-1000 overflow-hidden relative z-20">
      <h1 className="skills-title text-4xl sm:text-5xl font-bold mb-12 sm:mb-16 text-center text-cyan-400">
        The Toolkit
      </h1>
      
      <div className="w-full max-w-5xl flex flex-wrap justify-center gap-6 sm:gap-10 perspective-[1000px]">
          {skills.map((skill, index) => (
            <div
              key={index}
              ref={(el) => {
                skillsRef.current[index] = el;
              }}
              className={`
                flex flex-col items-center justify-center
                bg-slate-800/50 backdrop-blur-sm border border-slate-700
                rounded-2xl
                w-28 h-28 sm:w-40 sm:h-40
                transition-all duration-300
                ${skill.color} hover:text-white hover:scale-110 hover:z-50 cursor-pointer
                shadow-2xl shadow-black/50
              `}>
              <div className="text-4xl sm:text-5xl mb-3 text-cyan-300">{skill.icon}</div>
              <span className="text-xs sm:text-sm font-semibold text-gray-300">{skill.text}</span>
            </div>
          ))}
      </div>
    </section>
  );
};

export default Skills;
