import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const WhatIKnowPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=300%", //this is like for reading roles
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });

    // drawing line type of animaton
    tl.fromTo(
      pathRef.current,
      { strokeDasharray: 2000, strokeDashoffset: 2000 },
      { strokeDashoffset: 0, ease: "none", duration: 1 }
    );

    // experince appearances
    const experiences = gsap.utils.toArray(".experience-node");
    experiences.forEach((exp: any, i) => {
        const progressStart = i * 0.3 + 0.05; //timing of appearance
        
    
        tl.fromTo(
            exp,
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 0.05, ease: "power2.out" },
            progressStart
        );
        
        
        tl.to(exp, { scale: 1.1, filter: "brightness(1.2)", duration: 0.1 }, progressStart);
        tl.to(exp, { scale: 1, filter: "brightness(0.8)", duration: 0.1 }, progressStart + 0.25);
    });

  }, { scope: containerRef });

  return (
    <section 
        ref={containerRef} 
        className="w-full h-screen bg-slate-900 relative flex items-center justify-center overflow-hidden z-20"
    >
        <h2 className="absolute top-10 text-4xl sm:text-6xl font-bold text-gray-200 z-10">My Experience</h2>

       
        <div className="absolute inset-0 flex items-center justify-center">
            <svg width="800" height="1000" viewBox="0 0 800 1000" fill="none" className="w-full h-full max-w-4xl max-h-[95vh]">
                <path 
                    ref={pathRef}
                    d="M 400 50 Q 600 200 400 350 Q 200 500 400 650 Q 600 800 400 950" 
                    stroke="#22d3ee" 
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                    className="opacity-80"
                />
            </svg>
        </div>

    
        <div className="absolute top-[15%] left-[10%] sm:left-[20%] max-w-xs text-right experience-node opacity-0">
             <div className="text-xl font-bold text-cyan-200">Freelance Developer</div>
             <div className="text-sm text-gray-400 mb-2">March 2022 – Sept 2023</div>
             <p className="text-gray-300 text-sm leading-relaxed">
                Focused on foundations: React.js and responsive UI.
                Shipped real client work, learning through iteration.
             </p>
             <div className="w-3 h-3 bg-cyan-400 rounded-full absolute -right-6 top-2 shadow-[0_0_10px_cyan]"></div>
        </div>

        
        <div className="absolute top-[45%] right-[10%] sm:right-[20%] max-w-xs text-left experience-node opacity-0">
            <div className="w-3 h-3 bg-cyan-400 rounded-full absolute -left-6 top-2 shadow-[0_0_10px_cyan]"></div>
            <div className="text-xl font-bold text-cyan-200">Dhan AI (Frontend Engineer)</div>
            <div className="text-sm text-gray-400 mb-2">Oct 2022 – May 2023</div>
            <p className="text-gray-300 text-sm leading-relaxed">
                Built dashboards and API-driven UIs. 
                Worked with React Native & Electron.
                Handled real data and system constraints.
            </p>
        </div>

       
        <div className="absolute top-[75%] left-[10%] sm:left-[20%] max-w-xs text-right experience-node opacity-0">
             <div className="text-xl font-bold text-cyan-200">Greyspace Digital (Software Engineer)</div>
             <div className="text-sm text-gray-400 mb-2">Aug 2023 – Present</div>
             <p className="text-gray-300 text-sm leading-relaxed">
                Scalable React + TS architecture.
                Ownership of UI automation (Playwright).
                Focus on long-term maintainability.
             </p>
             <div className="w-3 h-3 bg-cyan-400 rounded-full absolute -right-6 top-2 shadow-[0_0_10px_cyan]"></div>
        </div>

    </section>
  );
};

export default WhatIKnowPage;
