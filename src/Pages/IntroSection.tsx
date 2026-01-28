import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import InstagramIcon from "../assets/icons8-instagram-100.svg";
import EmailIcon from "../assets/email-1-svgrepo-com.svg";
import LinkedinIcon from "../assets/linkedin-161-svgrepo-com.svg";
import ResumeIcon from "../assets/old-man-svgrepo-com.svg";

const IntroSection = () => {
  gsap.registerPlugin(ScrollTrigger);

  const containerRef = useRef(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    // Base state
    gsap.set(".introText", { opacity: 0, y: 20, filter: "blur(10px)" });

    mm.add("(min-width: 768px)", () => {
      gsap.fromTo(".introText", 
        { 
            opacity: 0, 
            y: 20, 
            filter: "blur(10px)" 
        },
        {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1,
            stagger: 0.3,
            ease: "power2.out",
            scrollTrigger: {
            trigger: ".introText",
            start: "top 80%",
            end: "top 50%",
            scrub: true,
            invalidateOnRefresh: true,
            },
        }
      );
    });

    mm.add("(max-width: 767px)", () => {
      gsap.fromTo(".introText", 
        { 
            opacity: 0, 
            y: 20, 
            filter: "blur(10px)" 
        },
        {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.2,
            stagger: 0.4,
            ease: "power2.out",
            scrollTrigger: {
            trigger: ".introText",
            start: "top 85%",
            end: "top 60%",
            scrub: true,
            invalidateOnRefresh: true,
            },
        }
      );
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="w-full h-screen bg-slate-900 flex flex-col justify-center items-center text-center px-4 relative z-20">
      <div className="flex flex-col items-center justify-center">
        <h2 className="introText text-3xl md:text-6xl font-extrabold text-white mb-10">
          Hello I'm
        </h2>
        <h2 className="introText text-3xl md:text-6xl font-extrabold text-white">
          <span className="text-cyan-400 text-3xl md:text-8xl border-r-2 md:border-r-8 pr-2 md:pr-8 border-gray-500">
            Saurabh
          </span>
          <span className=" md:text-8xl text-2xl text-gray-300 font-semibold md:pl-8 pl-2">
            Frontend Developer
          </span>
        </h2>

        <p className="introText font-Langar text-lg md:text-2xl leading-relaxed mt-12 text-gray-400 max-w-2xl">
          I craft high-performance, dynamic user interfaces with seamless API
          integrations. Passionate about clean, scalable architecture and
          pushing the limits of frontend engineering.
        </p>
      </div>

      {/* Social Icons */}
      <div className="flex items-center justify-center gap-8 mt-10  md:gap-28 md:mt-40">
        <a
          href="https://www.instagram.com/getsaurabh?igsh=MXJzdm1wNnNoemIxOQ=="
          target="_blank"
          rel="noopener noreferrer">
          <img
            src={InstagramIcon}
            alt="Instagram"
            className="w-12 h-12 md:w-14 md:h-14 hover:scale-110 transition-transform duration-300 filter invert"
          />
        </a>
        <a href="mailto:saurabhspring5@gmail.com">
          <img
            src={EmailIcon}
            alt="Email"
            className="w-12 h-12 md:w-14 md:h-14 hover:scale-110 transition-transform duration-300 filter invert"
          />
        </a>
        <a href="https://www.linkedin.com/in/saurabhkedar681993/">
          <img
            src={LinkedinIcon}
            alt="LinkedIn"
            className="w-12 h-12 md:w-14 md:h-14 hover:scale-110 transition-transform duration-300 filter invert"
          />
        </a>
        <a href="https://saurabh6893.github.io/Resume/">
          <img
            src={ResumeIcon}
            alt="Resume"
            className="w-12 h-12 md:w-14 md:h-14 hover:scale-110 transition-transform duration-300 filter invert"
          />
        </a>
      </div>
    </section>
  );
};

export default IntroSection;
