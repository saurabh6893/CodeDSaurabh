import { useState, useEffect } from "react";
import HomePageBottom from "../Components/HomePageBottom";
import TiltedCard from "../Components/TiltedCard";
import TextPressure from "../Components/TextPressure";

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
        <TextPressure
          text="Saurabh"
          flex={true}
          alpha={false}
          stroke={false}
          width={true}
          weight={true}
          italic={true}
          textColor="#ffffff"
          strokeColor="#ff0000"
          minFontSize={36}
        />
      </div>

      <HomePageBottom />
    </div>
  );
};

export default HomePage;
