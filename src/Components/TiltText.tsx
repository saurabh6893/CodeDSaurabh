import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const TiltText = () => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!textRef.current) return;

      const { clientX, clientY } = event;
      const { innerWidth, innerHeight } = window;

      // Normalize mouse position between -1 and 1
      const xOffset = (clientX / innerWidth - 0.5) * 50; // Increased tilt range
      const yOffset = (clientY / innerHeight - 0.5) * 50;

      gsap.to(textRef.current, {
        x: xOffset,
        y: yOffset,
        scale: 1.05, // Slight zoom effect
        rotationX: -yOffset * 0.4,
        rotationY: xOffset * 0.4,
        skewX: xOffset * 0.2,
        skewY: yOffset * 0.2,
        perspective: 800, // Adds depth effect
        ease: "power3.out",
        duration: 0.4,
      });
    };

    const rippleEffect = () => {
      gsap.fromTo(
        textRef.current,
        { scale: 1, opacity: 1 },
        {
          scale: 1.08,
          opacity: 0.9,
          ease: "power3.out",
          duration: 0.4,
          yoyo: true,
          repeat: 1, // Creates a subtle "pulse" effect
        }
      );
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousemove", rippleEffect);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousemove", rippleEffect);
    };
  }, []);

  return (
    <div
      ref={textRef}
      className="absolute top-1/2 right-10 transform -translate-y-1/2"
    >
      {/* Desktop + Tablet (md and up) */}
      <div className="hidden md:block">
        <h1 className="text-5xl leading-snug uppercase font-galada font-bold">
          Saurabh
        </h1>
      </div>

      {/* Mobile Only (below md) */}
      <div className="md:hidden bg-black/50 p-5 px-14 rounded-lg text-white text-center">
        <h1 className="text-4xl leading-snug uppercase font-galada ml-5">
          Saurabh
        </h1>
      </div>
    </div>
  );
};

export default TiltText;
