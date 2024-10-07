import React from 'react'
import { FaFacebookF } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import Logo from "../../images/future_path_logo.png";

const LogoWithSocial = () => {
  return (
    <div>
      <div className=" mx-auto flex justify-between items-center p-4 ">
      {/* left side */}
      <div className="flex items-center">
        <img src={Logo} className=" w-[400px]" />
      </div>

      <div className="flex justify-center gap-6 my-6 mb-10">
        <div className="p-2 border rounded-full bg-white hover:scale-110 cursor-pointer duration-300">
          <FaFacebookF size={20} color="#1eb2a6" />
        </div>

        <div className="p-2 border rounded-full bg-white hover:scale-110 cursor-pointer duration-300">
          <FaInstagram size={20} color="#1eb2a6" />
        </div>
        <div className="p-2 border rounded-full bg-white hover:scale-110 cursor-pointer duration-300">
          <FaTwitter size={20} color="#1eb2a6" />
        </div>
        <div className="p-2 border rounded-full bg-white hover:scale-110 cursor-pointer duration-300">
          <FaYoutube size={20} color="#1eb2a6" />
        </div>
      </div>
    </div>
    </div>
  )
}

export default LogoWithSocial
