import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

const KeywordsPage = () => {
  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    let mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      gsap.utils.toArray(".rotateText").forEach((el, index) => {
        gsap.from(el, {
          transform: "rotateX(-180deg) rotateY(-85deg) scale(0.8)",
          opacity: 0,
          duration: 1,
          delay: index * 0.2,
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            end: "top -20%",
            scrub: true,
          },
        });
      });
    });

    mm.add("(max-width: 767px)", () => {
      gsap.utils.toArray(".rotateText").forEach((el, index) => {
        gsap.from(el, {
          transform: "rotateX(-90deg) scale(0.9)",
          opacity: 0,
          duration: 1,
          delay: index * 0.3,
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            end: "top 10%",
            scrub: true,
          },
        });
      });
    });
  });

  return (
    <div
      className="bg-white text-center px-6 py-16 md:p-32 text-black"
      id="section2"
    >
      <h3 className="text-gray-500 text-lg md:text-3xl font-langar">
        Saurabh | designed and developed
      </h3>

      <div className="text-center keywordSection">
        <h1 className="rotateText text-[clamp(14vw,14vw,16vw)] text-black font-bodoni uppercase leading-[30vw] md:leading-[40vw] mb-32 md:mb-96">
          Design
        </h1>
      </div>
      <div className="text-center keywordSection">
        <h1 className="rotateText text-[clamp(14vw,14vw,16vw)] text-black font-bodoni uppercase leading-[30vw] md:leading-[40vw] mb-32 md:mb-96">
          Optimize
        </h1>
      </div>
      <div className="text-center pb-64 md:pb-80">
        <h1 className="rotateText text-[20vw] md:text-[12vw] lg:text-[14vw] text-black font-bodoni uppercase leading-[8vw] md:leading-[40vw] lg:my-[-8%] max-sm:my-20">
          Inspire
        </h1>
      </div>
    </div>
  );
};

export default KeywordsPage;
