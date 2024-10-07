import React from "react";

import { FaFacebookF } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import Logo from "../../images/future_path_logo.png";
import { Link } from "react-router-dom";
const NavBar = () => {
  return (
    <>
    <div className="max-w-[1820px] ps-2 mx-4 md:flex md:mx-16 mt-5 bg-gray-300/70">
      {/* Navigation Items */}
      <div className="flex flex-col md:flex-row md:gap-15 gap-4">
        {/* Left Side (Mobile: Grid, Desktop: Flex) */}
        <div className="grid grid-cols-3 gap-4 md:hidden mb-16 max-h-[300px]">
          <div className="hover:bg-teal-500 hover:scale-105 p-3 rounded-2xl hover:text-white transition">
            <Link to="/home">Home</Link>
          </div>
          <div className="hover:bg-teal-500 hover:scale-105 p-3 rounded-2xl hover:text-white transition">
            <Link to="/see-all-universities">See All Universities</Link>
          </div>
          <div className="hover:bg-teal-500 hover:scale-105 p-3 rounded-2xl hover:text-white transition">
            <Link to="/see-all-jobs">See All Jobs</Link>
          </div>
          <div className="hover:bg-teal-500 hover:scale-105 p-3 rounded-2xl hover:text-white transition">
            <Link to="/see-all-scholarships">See All Scholarships</Link>
          </div>
          <div className="hover:bg-teal-500 hover:scale-105 p-3 rounded-2xl hover:text-white transition">
            <Link to="/reviews">Manage Reviews</Link>
          </div>
          <div className="hover:bg-teal-500 hover:scale-105 p-3 rounded-2xl hover:text-white transition">
            <Link to="/students/:id/edit">Manage Your Profile</Link>
          </div>
          <div className="hover:bg-teal-500 hover:scale-105 p-3 rounded-2xl hover:text-white transition">
            <Link to="/appointments">My Appointments</Link>
          </div>
          <div className="hover:bg-teal-500 hover:scale-105 p-3 rounded-2xl hover:text-white transition">
            <Link to="/appointments/approved">Upload Documents</Link>
          </div>
          <div className="hover:bg-teal-500 hover:scale-105 p-3 rounded-2xl hover:text-white transition">
            <Link to="/payments">View My Payments</Link>
          </div>
          <div className="hover:bg-teal-500 hover:scale-105 p-3 rounded-2xl hover:text-white transition">
            <Link to="/agents">View Agents</Link>
          </div>
          <div className="hover:bg-teal-500 hover:scale-105 p-3 rounded-2xl hover:text-white transition">
          <Link className="text-black transform -skew-x-20" to="/students">
          View Students
        </Link>
          </div>
          
        </div>
        

        {/* Desktop Layout */}
        <div className="hidden md:flex md:items-center  md:gap-15">
          <div className="hover:bg-teal-500 hover:scale-105 p-3 rounded-2xl hover:text-white transition">
            <Link to="/">Home</Link>
          </div>
          <div className="hover:bg-teal-500 hover:scale-105 p-3 rounded-2xl hover:text-white transition">
            <Link to="/see-all-universities">See All Universities</Link>
          </div>
          <div className="hover:bg-teal-500 hover:scale-105 p-3 rounded-2xl hover:text-white transition">
            <Link to="/see-all-jobs">See All Jobs</Link>
          </div>
          <div className="hover:bg-teal-500 hover:scale-105 p-3 rounded-2xl hover:text-white transition">
            <Link to="/see-all-scholarships">See All Scholarships</Link>
          </div>
          <div className="hover:bg-teal-500 hover:scale-105 p-3 rounded-2xl hover:text-white transition">
            <Link to="/reviews">Manage Reviews</Link>
          </div>
          <div className="hover:bg-teal-500 hover:scale-105 p-3 rounded-2xl hover:text-white transition">
            <Link to="/students/:id/edit">Manage Your Profile</Link>
          </div>
          <div className="hover:bg-teal-500 hover:scale-105 p-3 rounded-2xl hover:text-white transition">
            <Link to="/appointments">My Appointments</Link>
          </div>
          <div className="hover:bg-teal-500 hover:scale-105 p-3 rounded-2xl hover:text-white transition">
            <Link to="/appointments/approved">Upload Documents</Link>
          </div>
          <div className="hover:bg-teal-500 hover:scale-105 p-3 rounded-2xl hover:text-white transition">
            <Link to="/payments">View My Payments</Link>
          </div>
          <div className="hover:bg-teal-500 hover:scale-105 p-3 rounded-2xl hover:text-white transition">
            <Link to="/agents">View Agents</Link>
          </div>
        </div>
      </div>

      {/* Right Side Button */}
      <div className="hidden relative w-full md:w-48 md:flex items-center p-2 md:p-8 h-24 bg-teal-500 skew-left md:-me-5 md:m-auto mt-4 md:mt-0 cursor-pointer">
        <Link className="text-white transform -skew-x-20" to="/students">
          View Students
        </Link>
      </div>
    </div>


  
    </>

    
  );
};

export default NavBar;


