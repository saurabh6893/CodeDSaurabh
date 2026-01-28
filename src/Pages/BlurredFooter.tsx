import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";


interface BlurredFooterProps {
  className?: string;
}

const BlurredFooter: React.FC<BlurredFooterProps> = ({ className }) => {
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Explicit initial state
    gsap.set(textRef.current, { filter: "blur(10px)", opacity: 0 });

    gsap.fromTo(
      textRef.current,
      { filter: "blur(10px)", opacity: 0 },
      {
        filter: "blur(0px)",
        opacity: 1,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 85%", // Adjust as needed
          toggleActions: "play none none none",
          invalidateOnRefresh: true,
        },
      }
    );
  }, { scope: textRef });

  return (
    <div
      ref={textRef}
      className={`w-full min-h-[50vh] flex flex-col items-center justify-center bg-black text-white relative z-30 pb-20 ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/20 to-transparent pointer-events-none"></div>
      
      <h2 className="text-4xl md:text-7xl font-bold mb-10 text-center tracking-tighter">
        Ready to build the future?
      </h2>
      
      <a
        href="mailto:saurabhspring5@gmail.com"
        className="group relative inline-flex items-center justify-center px-10 py-5 overflow-hidden font-bold text-white transition-all duration-300 bg-cyan-600 rounded-full hover:bg-cyan-500 hover:scale-110 hover:shadow-[0_0_40px_rgba(34,211,238,0.6)]"
        onMouseMove={(e) => {
            const btn = e.currentTarget;
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.2 });
        }}
        onMouseLeave={(e) => {
            gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.2 });
        }}
      >
        <span className="relative z-10 text-xl">Let's Talk</span>
        <div className="absolute inset-0 h-full w-full scale-0 rounded-full transition-all duration-300 group-hover:scale-100 group-hover:bg-cyan-400/30"></div>
      </a>

      <p className="mt-20 text-gray-500 text-sm">
        © {new Date().getFullYear()} Saurabh. All rights reserved.
      </p>
    </div>
  );
};

export default BlurredFooter;
