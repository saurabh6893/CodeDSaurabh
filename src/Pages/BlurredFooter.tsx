import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

interface BlurredFooterProps {
  text: string;
  className?: string;
}

const BlurredFooter: React.FC<BlurredFooterProps> = ({ className }) => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

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
        },
      }
    );
  }, []);

  return (
    <div
      ref={textRef}
      className={`text-lg md:text-xl w-full h-[20vh] font-light text-white mt-20 ${className}`}
    >
      this Website is being upgraded for more Awesomeness
      <br />
      <a
        href="https://saurabhkkedar.netlify.app/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-400 underline hover:text-blue-300 transition-colors duration-300 pl-2 mt-10"
      >
        click here.
      </a>
    </div>
  );
};

export default BlurredFooter;
