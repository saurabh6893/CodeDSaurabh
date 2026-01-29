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
  { text: "JavaScript", icon: <SiJavascript />, color: "#F7DF1E", shadow: "rgba(247, 223, 30, 0.2)" },
  { text: "React", icon: <FaReact />, color: "#61DAFB", shadow: "rgba(97, 218, 251, 0.2)" },
  { text: "Responsive", icon: <DiResponsive />, color: "#10B981", shadow: "rgba(16, 185, 129, 0.2)" },
  { text: "GitHub", icon: <SiGithub />, color: "#FFFFFF", shadow: "rgba(255, 255, 255, 0.1)" },
  { text: "TypeScript", icon: <SiTypescript />, color: "#3178C6", shadow: "rgba(49, 120, 198, 0.2)" },
  { text: "Playwright", icon: <SiTestcafe />, color: "#45BA4B", shadow: "rgba(69, 186, 75, 0.2)" },
  { text: "Tailwind", icon: <SiTailwindcss />, color: "#06B6D4", shadow: "rgba(6, 182, 212, 0.2)" },
  { text: "Optimization", icon: <MdSpeed />, color: "#EF4444", shadow: "rgba(239, 68, 68, 0.2)" },
];

const SkillCard = ({ skill, index, setRefs }: { skill: typeof skills[0], index: number, setRefs: (el: HTMLDivElement | null, i: number) => void }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const reflectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!cardRef.current) return;
    
    cardRef.current.style.willChange = "transform";

    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReducedMotion) return;

    const xTo = gsap.quickTo(cardRef.current, "x", { duration: 0.4, ease: "power3" });
    const yTo = gsap.quickTo(cardRef.current, "y", { duration: 0.4, ease: "power3" });
    const rotateXTo = gsap.quickTo(cardRef.current, "rotateX", { duration: 0.4, ease: "power3" });
    const rotateYTo = gsap.quickTo(cardRef.current, "rotateY", { duration: 0.4, ease: "power3" });

    const onMouseEnter = () => {
      gsap.to(glowRef.current, { opacity: 1, duration: 0.3 });
      gsap.fromTo(reflectionRef.current, { xPercent: -100, opacity: 0 }, { xPercent: 100, opacity: 0.3, duration: 0.8, ease: "power2.inOut" });
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = cardRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      xTo(x * 0.2);
      yTo(y * 0.2);

      rotateXTo(-y * 0.1);
      rotateYTo(x * 0.1);
    };

    const onMouseLeave = () => {
      gsap.to(glowRef.current, { opacity: 0, duration: 0.3 });
      xTo(0);
      yTo(0);
      rotateXTo(0);
      rotateYTo(0);
    };

    cardRef.current.addEventListener("mouseenter", onMouseEnter);
    cardRef.current.addEventListener("mousemove", onMouseMove);
    cardRef.current.addEventListener("mouseleave", onMouseLeave);

    return () => {
      cardRef.current?.removeEventListener("mouseenter", onMouseEnter);
      cardRef.current?.removeEventListener("mousemove", onMouseMove);
      cardRef.current?.removeEventListener("mouseleave", onMouseLeave);
    };
  }, { scope: cardRef });

  return (
    <div
      ref={(el) => {
        cardRef.current = el;
        setRefs(el, index);
      }}
      className="relative group w-28 h-28 sm:w-40 sm:h-40 flex flex-col items-center justify-center bg-slate-800/40 backdrop-blur-xl border border-white/10 rounded-3xl cursor-pointer preserve-3d transition-shadow duration-500 hover:shadow-[0_0_30px_rgba(0,0,0,0.5)] overflow-hidden"
    >
      <div 
        ref={glowRef}
        className="absolute inset-0 opacity-0 pointer-events-none transition-opacity duration-300"
        style={{ background: `radial-gradient(circle at center, ${skill.shadow}, transparent 70%)` }}
      />
      
      <div 
        ref={reflectionRef}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-[150%] pointer-events-none"
      />

      <div className="relative z-10 text-4xl sm:text-5xl mb-3 transition-transform duration-500 group-hover:scale-110 group-hover:-translate-z-10" style={{ color: skill.color }}>
        {skill.icon}
      </div>
      <span className="relative z-10 text-[10px] sm:text-xs font-bold tracking-widest uppercase text-white/60 group-hover:text-white transition-colors duration-300">
        {skill.text}
      </span>
    </div>
  );
};

const BackgroundSystem = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150" />
      
      <div className="skills-bg-blob absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full" />
      <div className="skills-bg-blob absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full" />
    </div>
  );
};

const Skills = () => {
  const containerRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<(HTMLDivElement | null)[]>([]);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const setRefs = (el: HTMLDivElement | null, i: number) => {
    skillsRef.current[i] = el;
  };

  useGSAP(() => {
    if (!containerRef.current) return;

    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!isReducedMotion) {
      gsap.fromTo(titleRef.current, 
        { 
          y: 100, 
          opacity: 0, 
          scale: 0.9,
          letterSpacing: "0.5em" 
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          letterSpacing: "-0.02em",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 95%",
            end: "top 70%",
            scrub: 1,
          }
        }
      );
    } else {
      gsap.to(titleRef.current, { opacity: 1, duration: 1 });
    }

    if (!isReducedMotion) {
      gsap.to(".skills-bg-blob", {
        y: (i) => (i === 0 ? -150 : 150),
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      });
    }

    skillsRef.current.forEach((el, i) => {
      if (!el) return;

      if (isReducedMotion) {
        gsap.to(el, { opacity: 1, duration: 1, delay: i * 0.1 });
        return;
      }

      const row = Math.floor(i / 4);
      const col = i % 4;
      const centerX = 1.5;
      const centerY = 0.5;

      const deltaX = col - centerX;
      const deltaY = row - centerY;
      
      const diagonalIndex = col + row;

      gsap.fromTo(el, 
        { 
          opacity: 0, 
          z: -500, 
          scale: 0.5,
          x: 0,
          y: 0
        },
        {
          opacity: 1,
          z: 0,
          scale: 1,
          duration: 1,
          delay: diagonalIndex * 0.1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "top 40%",
            scrub: 2,
          }
        }
      );

      gsap.to(el, {
        x: deltaX * 80,
        y: deltaY * 40,
        scale: 1.15,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "center 80%",
          end: "center 20%",
          scrub: 2,
        }
      });
    });

  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef} 
      className="relative flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white px-4 py-20 overflow-hidden z-20 perspective-2000"
      id="skills"
    >
      <BackgroundSystem />

      <div className="relative z-10 w-full max-w-6xl flex flex-col items-center">
        <h1 
          ref={titleRef}
          className="text-5xl sm:text-7xl font-black mb-24 text-center bg-gradient-to-b from-white to-white/20 bg-clip-text text-transparent uppercase"
        >
          The Toolkit
        </h1>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 justify-items-center">
          {skills.map((skill, index) => (
            <SkillCard 
              key={skill.text} 
              skill={skill} 
              index={index} 
              setRefs={setRefs} 
            />
          ))}
        </div>
      </div>

      <style>{`
        .preserve-3d { transform-style: preserve-3d; }
        .perspective-2000 { perspective: 2000px; }
      `}</style>
    </section>
  );
};

export default Skills;
