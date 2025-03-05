import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

const WhatIKnowPage = () => {
  const sectionRef = useRef(null);

  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    let mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      gsap.fromTo(
        ".whoAmIText",
        { opacity: 0, y: 30, filter: "blur(15px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.5,
          scrollTrigger: {
            trigger: ".whoAmIText",
            start: "top 75%",
            end: "top 50%",
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        sectionRef.current,
        { backgroundColor: "white" },
        {
          backgroundColor: "#D6C7AE",
          duration: 1.5,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 90%",
            end: "top 50%",
            scrub: true,
          },
        }
      );
    });

    mm.add("(max-width: 767px)", () => {
      gsap.fromTo(
        ".whoAmIText",
        { opacity: 0, y: 30, filter: "blur(15px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.5,
          scrollTrigger: {
            trigger: ".whoAmIText",
            start: "top 85%",
            end: "top 60%",
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        sectionRef.current,
        { backgroundColor: "white" },
        {
          backgroundColor: "#D6C7AE",
          duration: 1.5,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 30%",
            end: "top 55%",
            scrub: true,
          },
        }
      );
    });
  });

  return (
    <div
      ref={sectionRef}
      className="w-full h-[100vh] flex flex-col items-center justify-center relative text-center px-6 py-16 transition-colors duration-500"
    >
      <h2 className="whoAmIText text-3xl md:text-9xl font-bold text-gray-900">
        What Do i Do ?
      </h2>
    </div>
  );
};

export default WhatIKnowPage;
