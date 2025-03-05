import React from "react";
import "remixicon/fonts/remixicon.css";
import ShapeBlur from "./ShapeBlur";

const Header = () => {
  return (
    <div className="fixed w-full flex items-center justify-between z-10 p-8 md:p-16 lg:p-20 py-4 sm:p-6 min-w-0">
      {/* Mobile Menu Icon (Hidden on Large Screens) */}
      <i className="ri-more-2-fill text-3xl"></i>

      {/* Empty div to keep spacing correct */}
      <div className="flex-1"></div>

      {/* Hire Me Button (Always on the Right) */}

      <button className="bg-black border-2 text-white rounded-2xl text-lg sm:text-xl px-5 sm:px-6 py-2 sm:py-3 hover:bg-gray-200 hover:text-black transition">
        Hire Me
      </button>
    </div>
  );
};

export default Header;
