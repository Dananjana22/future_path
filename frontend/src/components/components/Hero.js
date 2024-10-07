import React from "react";
import Edu from "../../images/edu.jpg";

function Hero() {
  return (
    <div className=" mx-auto top-0  fixed -z-30">
      <div className="max-h-full relative">
        {/* overlay */}
        <div className="absolute w-full h-full text-gray-200  bg-black/40 flex flex-col justify-center">
        <div className=" ml-[200px] ">
        <h2>HOME/COURSES</h2>
        </div>
          <h1 className="px-4 text-4xl text-white sm:text-5xl md:text-6xl lg:text-7xl ">
            Explore Curses
          </h1>
        </div>
        <img className="w-screen max-h-[800px] object-cover " src={Edu} />
      </div>
    </div>
  );
}

export default Hero;
