import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";

const Header = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const modalRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (isModalVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalVisible]);

  const showModal = () => {
    setModalVisible(true);
    gsap.fromTo(
      modalRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5, ease: "power2.out" }
    );
    gsap.fromTo(
      contentRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1, delay: 0.5, ease: "power2.out" }
    );
  };

  const hideModal = () => {
    gsap.to(modalRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.out",
      onComplete: () => setModalVisible(false),
    });
  };

  return (
    <div>
      <div className="fixed w-full flex items-center justify-between z-10 p-8 md:p-16 lg:p-20 py-4 sm:p-6 min-w-0">
        <i className="ri-more-2-fill text-3xl"></i>
        <div className="flex-1"></div>
        <button
          onClick={showModal}
          className="bg-black border-2 text-white rounded-2xl text-lg sm:text-xl px-5 sm:px-6 py-2 sm:py-3 transition hover:bg-gray-200 hover:text-black">
          Hire Me
        </button>
      </div>

      {isModalVisible && (
        <div
          ref={modalRef}
          className="fixed inset-0 flex items-center justify-center z-20 bg-black bg-opacity-70">
          <div
            ref={contentRef}
            className="relative bg-[#F2F0EF] rounded-xl p-8 max-w-2xl w-full shadow-lg">
            <div className="absolute top-0 left-0 w-full h-2 bg-[#245F73] rounded-t-xl"></div>
            <div className="absolute inset-y-0 left-0 w-2 bg-[#245F73] rounded-l-xl"></div>

            <div className="flex">
              <div className="flex-1" style={{ color: "#245F73" }}>
                <h2 className="text-3xl font-bold mb-4">
                  Saurabh Kishor Kedar
                </h2>
                <p className="mb-2">
                  <i className="ri-mail-line"></i> saurahbspring5@gmail.com
                </p>
                <p className="mb-2">
                  <i className="ri-phone-line"></i> 832-915-2215
                </p>
                <p className="mb-2">
                  <i className="ri-linkedin-box-line"></i>
                  <a
                    href="https://www.linkedin.com/in/saurabhkedar681993/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-[#733E24]">
                    LinkedIn
                  </a>
                </p>
                <p className="mb-2">
                  <i className="ri-github-fill"></i>
                  <a
                    href="https://github.com/saurabh6893"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-[#733E24]">
                    GitHub
                  </a>
                </p>
              </div>
              <div className="w-40 h-40 flex justify-center items-center ml-4">
                <img
                  src={`s2k.jpg`}
                  alt="Profile"
                  className="object-cover w-full h-auto rounded transform transition-transform duration-300 hover:scale-105"
                />
              </div>
            </div>
            <button
              onClick={hideModal}
              className="mt-6 bg-[#245F73] text-white px-6 py-3 rounded-md transition hover:bg-[#733E24] hover:text-black">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
