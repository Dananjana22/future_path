import React from "react";
import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import HeadLineCards from "./components/HeadLineCards";
import LogoWithSocial from "./components/LogoWithSocial";
import Courses from "./components/Courses";
import Email from "./components/Email";
import Footer from "./components/Footer";

const Home = () => {
  return (
    <>
      <div className=" ">
        <LogoWithSocial />
        <NavBar />
        <Hero />
        <div className=" md:mt-[650px] bg-gray-200 h-full">
          <HeadLineCards />
          <Courses />
          <Email />
          <Footer />
        </div>
        
      </div>
    </>
  );
};

export default Home;
