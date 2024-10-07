import React from "react";

const Email = () => {
  return (
    <div>
      <div className=" w-screen bg-teal-400 h-[200px] mb-10 ">
        <div className=" grid grid-cols-2 p-10">
          <div className=" ">
            <p className=" text-5xl text-white">
              Newsletter - Stay tune and get the latest update
            </p>
          </div>
          <div className="flex w-[600px] h-[50px] bg-white ">
            <input
              className=" w-[600px] h-[50px]"
              placeholder="Enter your email here"
            />
            <button><img
              width="48"
              height="30"
              src="https://img.icons8.com/fluency/48/filled-sent.png"
              alt="filled-sent"
            /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Email;
