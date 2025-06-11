import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";

const Header = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isModalVisible) {
      document.body.style.overflow = "hidden";
      // Add subtle background blur when modal is open
      document.body.style.backdropFilter = "blur(4px)";
    } else {
      document.body.style.overflow = "auto";
      document.body.style.backdropFilter = "none";
    }

    return () => {
      document.body.style.overflow = "auto";
      document.body.style.backdropFilter = "none";
    };
  }, [isModalVisible]);

  const showModal = () => {
    setModalVisible(true);
    gsap.fromTo(
      modalRef.current,
      { opacity: 0, backdropFilter: "blur(0px)" },
      {
        opacity: 1,
        backdropFilter: "blur(4px)",
        duration: 0.5,
        ease: "power2.out",
      }
    );
    gsap.fromTo(
      contentRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "back.out(1.7)" }
    );
  };

  const hideModal = () => {
    gsap.to(contentRef.current, {
      y: 50,
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
    });
    gsap.to(modalRef.current, {
      opacity: 0,
      backdropFilter: "blur(0px)",
      duration: 0.5,
      delay: 0.2,
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
          className="bg-black border-2 text-white rounded-2xl text-lg sm:text-xl px-5 sm:px-6 py-2 sm:py-3 transition-all hover:bg-gray-200 hover:text-black hover:scale-105 active:scale-95 shadow-lg">
          Hire Me
        </button>
      </div>

      {isModalVisible && (
        <div
          ref={modalRef}
          className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
          <div
            ref={contentRef}
            className="relative bg-gradient-to-br from-[#F2F0EF] to-[#E0DEDD] rounded-2xl p-8 max-w-2xl w-full mx-4 shadow-2xl border border-white/20 overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2IiBoZWlnaHQ9IjYiPgo8cmVjdCB3aWR0aD0iNiIgaGVpZ2h0PSI2IiBmaWxsPSIjZmZmIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDBMNiA2WiIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2U9IiNlZGUiPjwvcGF0aD4KPC9zdmc+')] opacity-10"></div>

            {/* Accent border */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#245F73] via-[#733E24] to-[#245F73]"></div>

            <div className="relative z-10 flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-6 text-[#245F73]">
                  Saurabh Kishor Kedar
                </h2>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#245F73]/10 flex items-center justify-center">
                      <i className="ri-mail-line text-[#245F73] text-xl"></i>
                    </div>
                    <a
                      href="mailto:saurabhspring5@gmail.com"
                      className="hover:text-[#733E24] transition-colors">
                      saurabhspring5@gmail.com
                    </a>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#245F73]/10 flex items-center justify-center">
                      <i className="ri-phone-line text-[#245F73] text-xl"></i>
                    </div>
                    <a
                      href="tel:832-915-2215"
                      className="hover:text-[#733E24] transition-colors">
                      832-915-2215
                    </a>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#245F73]/10 flex items-center justify-center">
                      <i className="ri-linkedin-box-line text-[#245F73] text-xl"></i>
                    </div>
                    <a
                      href="https://www.linkedin.com/in/saurabhkedar681993/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#733E24] transition-colors underline underline-offset-4 decoration-[#733E24]/50 hover:decoration-[#733E24]">
                      LinkedIn Profile
                    </a>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#245F73]/10 flex items-center justify-center">
                      <i className="ri-github-fill text-[#245F73] text-xl"></i>
                    </div>
                    <a
                      href="https://github.com/saurabh6893"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#733E24] transition-colors underline underline-offset-4 decoration-[#733E24]/50 hover:decoration-[#733E24]">
                      GitHub Profile
                    </a>
                  </div>
                </div>
              </div>

              <div className="w-40 h-40 flex-shrink-0 self-center">
                <div className="relative group">
                  <img
                    src="s2k.jpg"
                    alt="Profile"
                    className="w-full h-auto rounded-full border-4 border-white shadow-lg transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-2"
                  />
                  <div className="absolute inset-0 rounded-full border-4 border-transparent group-hover:border-[#733E24]/30 transition-all duration-500"></div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <button
                onClick={hideModal}
                className="relative overflow-hidden bg-gradient-to-r from-[#245F73] to-[#733E24] text-white px-8 py-3 rounded-full font-medium transition-all hover:shadow-lg hover:scale-105 active:scale-95 group">
                <span className="relative z-10">Close</span>
                <span className="absolute inset-0 bg-gradient-to-r from-[#733E24] to-[#245F73] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
