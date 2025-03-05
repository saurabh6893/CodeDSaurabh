import { useState, useEffect } from "react";
import HomePageBottom from "../Components/HomePageBottom";
import DecryptedText from "../Components/DecryptedText";
import TiltedCard from "../Components/TiltedCard";

const HomePage = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="h-screen p-4 md:p-8 flex items-center justify-center">
      {isLargeScreen ? (
        <>
          <TiltedCard
            imageSrc="/toonya.jpg"
            altText=""
            captionText="Saurabh"
            containerHeight="95vh"
            containerWidth="95vw"
            imageHeight="96vh"
            imageWidth="96vw"
            rotateAmplitude={2}
            scaleOnHover={1}
            showMobileWarning={false}
            showTooltip={false}
            displayOverlayContent={true}
          />
        </>
      ) : (
        <div
          className="relative w-full h-full shadow-xl shadow-sky-200 
          bg-cover bg-no-repeat bg-center rounded-[30px]
          lg:bg-[url('/toonya.jpg')] bg-[url('/mob.jpg')]"
        ></div>
      )}

      <div
        className="absolute top-[60%] right-[5%] 
        bg-white/20 bg-opacity-30 backdrop-blur-md 
        md:top-[45%] md:right-[15%] md:bg-white/20 md:backdrop-blur-lg 
        lg:top-[50%] lg:right-[10%] lg:bg-transparent lg:backdrop-blur-0
        xl:top-[20%] xl:right-[2%] xl:bg-transparent xl:backdrop-blur-0"
      >
        <DecryptedText
          text="Code-D-Saurabh"
          speed={100}
          maxIterations={20}
          characters="ABCD1234!?"
          className="revealed font-Sancreek text-5xl md:text-8xl lg:text-9xl"
          parentClassName="all-letters"
          encryptedClassName="encrypted font-Sancreek text-5xl md:text-8xl lg:text-9xl"
        />
      </div>

      <HomePageBottom />
    </div>
  );
};

export default HomePage;
