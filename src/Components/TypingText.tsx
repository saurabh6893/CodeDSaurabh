import  { useEffect, useRef } from "react";
import gsap from "gsap";

const TypingText = ({
  text = "FRONTEND WEB DEVELOPER",
  duration = 4,
  delay = 2,
}) => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textRef.current) {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: delay });

      tl.fromTo(
        textRef.current,
        { opacity: 0, filter: "blur(10px)" }, // Start blurred and invisible
        { opacity: 1, filter: "blur(0px)", duration, ease: "power2.out" } // Fade in & sharpen
      )
        .to({}, { duration: delay }) // Hold visible for 2 seconds
        .to(
          textRef.current,
          { opacity: 0, filter: "blur(10px)", duration, ease: "power2.out" } // Blur out
        );
    }
  }, [duration, delay]);

  return (
    <div className="absolute right-10 top-1/4 text-center">
      <div
        className="px-20 py-10 rounded-lg shadow-lg"
        style={{
          backdropFilter: "blur(10px)",
          background: "rgba(255, 255, 255, 0.1)",
          borderRadius: "25px",
          padding: "12px 24px",
        }}
      >
        <div ref={textRef} className="font-bold text-5xl text-white">
          {text}
        </div>
      </div>
    </div>
  );
};

export default TypingText;
