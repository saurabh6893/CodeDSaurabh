import  { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const messages = [
  "Custom Web Solutions",
  "High-Performance & Scalable Development",
  "User-Centric & Engaging Interfaces",
  "SEO & Web Optimization",
];

const HomePageBottom = () => {
  const textRef = useRef(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      gsap.to(textRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.5,
        onComplete: () => {
          setIndex((prevIndex) => (prevIndex + 1) % messages.length);
          gsap.fromTo(
            textRef.current,
            { y: 20, opacity: 0 },
            { opacity: 1, y: 0, duration: 0.5 }
          );
        },
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute bottom-10 w-full p-6 md:p-24 flex flex-col md:flex-row items-center md:items-end justify-center md:justify-end">
      <h2
        ref={textRef}
        className="text-2xl md:text-4xl font-extrabold text-white font-dhurjati 
                 p-4 md:p-5 rounded-xl bg-black/30 border border-gray-500 
                 shadow-xl shadow-gray-900 backdrop-blur-2xl text-center"
      >
        {messages[index]}
      </h2>
    </div>
  );
};

export default HomePageBottom;

// page1bottom
