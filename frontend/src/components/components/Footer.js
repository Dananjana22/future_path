import React from "react";

import {
  FaDribbbleSquare,
  FaFacebookSquare,
  FaGithubSquare,
  FaInstagram,
  FaTwitterSquare,
} from "react-icons/fa";
import { FaPhoneVolume, FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  return (
    <>
      

      {/* Footer Section */}
      <footer className=" mb-10">
        <div className="max-w-[1512px] mx-auto py-8 px-4 bg-black ">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 text-gray-300 mt-[150px] mb-[120px] ml-20">
            {/* Logo and description */}
            <div className="flex flex-col items-center justify-center text-center ">
             
              <p className="">Follow Us On</p>
              {/* Social media icons */}
              <div className="flex justify-center gap-6 my-6 mb-10">
                <div className="p-1 border border-gray-300">
                  <FaFacebookSquare size={30} />
                </div>
                <div className="p-1 border border-gray-300">
                  <FaInstagram size={30} />
                </div>
                <div className="p-1 border border-gray-300">
                  <FaTwitterSquare size={30} />
                </div>
                <div className="p-1 border border-gray-300">
                  <FaGithubSquare size={30} />
                </div>
                <div className="p-1 border border-gray-300">
                  <FaDribbbleSquare size={30} />
                </div>
              </div>
            </div>

            <div className="md:flex md:flex-col md:items-center md:ml-10 flex flex-col items-center text-center">
              <span className="pr-4 font-poppins">QUICK LINKS</span>
              <hr className="w-24 mt-2 border-b-2" />
              <ul className="md:text-left md:flex md:items-center md:flex-col">
                <li className="py-2 text-sm font-poppins">*******</li>
                <li className="py-2 text-sm font-poppins">*******</li>
                <li className="py-2 text-sm font-poppins">*******</li>
                <li className="py-2 text-sm font-poppins">*******</li>
                <li className="py-2 text-sm font-poppins">*******</li>
                <li className="py-2 text-sm font-poppins">*******</li>
              </ul>
            </div>

            <div className="md:flex md:flex-col md:items-center md:ml-10 flex flex-col items-center ">
            <span className="pr-4 font-poppins">About</span>
              <hr className="w-24 mt-2 border-b-2" />
              <ul className="md:text-left flex items-center flex-col">
                <li className="py-2 text-sm font-poppins">*******</li>
                <li className="py-2 text-sm font-poppins">*******</li>
                <li className="py-2 text-sm font-poppins">*******</li>
                <li className="py-2 text-sm font-poppins">*******</li>
                <li className="py-2 text-sm font-poppins">
                *******
                </li>
              </ul>
            </div>

            <div className="md:flex md:flex-col md:items-center md:ml-10 flex flex-col items-center">
              <span className="pr-4 font-poppins">QUICK LINKS</span>
              <hr className="w-12 mt-2 border-b-2" />
              <ul className="md:text-left flex items-center flex-col">
                <li className="py-2 text-sm font-poppins">*******</li>
                <li className="py-2 text-sm font-poppins">
                  *******
                </li>
                <li className="py-2 text-sm font-poppins">
                *******
                </li>
                <li className="py-2 text-sm font-poppins">
                *******
                </li>
                <li className="py-2 text-sm font-poppins">
                *******
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 text-white">
            <hr className="w-full my-4 border-white" />
            <div className="flex flex-col justify-between mx-10 lg:flex-row">
              <p className="font-poppins">
                Copyright @ 2024 <span className="text-blue-700">***</span>.
                All Rights Reserved
              </p>
              <p className="font-poppins">
                Designed & Developed by{" "}
                <span className="text-blue-700">***</span>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
