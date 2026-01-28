import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

const KeywordsPage = () => {
  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    let mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      gsap.utils.toArray(".rotateText").forEach((el, index) => {
        const target = el as HTMLElement;
        // Explicit initial state
        gsap.set(target, { transform: "rotateX(-180deg) rotateY(-85deg) scale(0.8)", opacity: 0 });
        
        gsap.fromTo(target, 
        {
          transform: "rotateX(-180deg) rotateY(-85deg) scale(0.8)",
          opacity: 0,
        },
        {
          transform: "rotateX(0deg) rotateY(0deg) scale(1)",
          opacity: 1,
          duration: 1,
          delay: index * 0.2,
          scrollTrigger: {
            trigger: target,
            start: "top 90%",
            end: "top -20%",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      });
    });

    mm.add("(max-width: 767px)", () => {
      gsap.utils.toArray(".rotateText").forEach((el, index) => {
        const target = el as HTMLElement;
        gsap.set(target, { transform: "rotateX(-90deg) scale(0.9)", opacity: 0 });
        
        gsap.fromTo(target, 
        {
          transform: "rotateX(-90deg) scale(0.9)",
          opacity: 0,
        },
        {
          transform: "rotateX(0deg) scale(1)",
          opacity: 1,
          duration: 1,
          delay: index * 0.3,
          scrollTrigger: {
            trigger: target,
            start: "top 80%",
            end: "top 10%",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      });
    });
  });

  return (
    <div
      className="bg-black text-center px-6 py-16 md:p-32 text-white relative z-20"
      id="section2"
    >
      <h3 className="text-gray-400 text-lg md:text-3xl font-langar">
        Saurabh | designed and developed
      </h3>

      <div className="text-center keywordSection">
        <h1 className="rotateText text-[clamp(14vw,14vw,16vw)] text-white font-bodoni uppercase leading-[30vw] md:leading-[40vw] mb-32 md:mb-96 opacity-50">
          Design
        </h1>
      </div>
      <div className="text-center keywordSection">
        <h1 className="rotateText text-[clamp(14vw,14vw,16vw)] text-white font-bodoni uppercase leading-[30vw] md:leading-[40vw] mb-32 md:mb-96 opacity-50">
          Optimize
        </h1>
      </div>
      <div className="text-center pb-64 md:pb-80">
        <h1 className="rotateText text-[20vw] md:text-[12vw] lg:text-[14vw] text-white font-bodoni uppercase leading-[8vw] md:leading-[40vw] lg:my-[-8%] max-sm:my-20 opacity-50">
          Inspire
        </h1>
      </div>
    </div>
  );
};

export default KeywordsPage;
