import React from "react";

function HeadLineCards() {
  return (
    <div className="max-w-full px-4 md:px-20 mx-auto p-4 py-12 grid grid-cols-1 md:grid-cols-3 mt-10 gap-6 bg-gray-200">
      {/* Card 1 */}
      <div className="relative h-[400px]">
        {/* overlay */}
        <div className="absolute w-full h-full bg-white text-teal-500 flex flex-col justify-between p-4">
          <p className="font-bold text-2xl">
            Introducing to Software Engineering
          </p>
          <div className="flex items-center">
            <i className="fa fa-star text-customTurquoise"></i>
            <i className="fa fa-star text-customTurquoise"></i>
            <i className="fa fa-star text-customTurquoise"></i>
            <i className="fa fa-star text-customTurquoise"></i>
            <i className="fa fa-star text-customTurquoise"></i>
            <label className="ml-2 text-customTurquoise">(5.0)</label>
          </div>
          <div className=" flex items-center gap-5">
            <img
              className="w-[50px] rounded-full bg-white mt-2"
              src="https://i.dell.com/is/image/DellContent/content/dam/ss2/page-specific/category-pages/alienware-desktop-aurora-r16-notebook-m18-800x620-image-v2.png?fmt=png-alpha&wid=800&hei=620"
              alt="Course Thumbnail"
            />
            <p>by someone</p>
          </div>
          <button className=" border border-teal-400 p-3 bg-white text-teal-500 hover:scale-105 duration-300">
            View More Details
          </button>
        </div>
      </div>

      {/* Card 2 */}
      <div className="relative h-[400px]">
        {/* overlay */}
        <div className="absolute w-full h-full bg-white text-teal-500 flex flex-col justify-between p-4">
          <p className="font-bold text-2xl">
            Introducing to Software Engineering
          </p>
          <div className="flex items-center">
            <i className="fa fa-star text-customTurquoise"></i>
            <i className="fa fa-star text-customTurquoise"></i>
            <i className="fa fa-star text-customTurquoise"></i>
            <i className="fa fa-star text-customTurquoise"></i>
            <i className="fa fa-star text-customTurquoise"></i>
            <label className="ml-2 text-customTurquoise">(5.0)</label>
          </div>
          <div className=" flex items-center gap-5">
            <img
              className="w-[50px] rounded-full bg-white mt-2"
              src="https://i.dell.com/is/image/DellContent/content/dam/ss2/page-specific/category-pages/alienware-desktop-aurora-r16-notebook-m18-800x620-image-v2.png?fmt=png-alpha&wid=800&hei=620"
              alt="Course Thumbnail"
            />
            <p>by someone</p>
          </div>
          <button className=" border border-teal-400 p-3 bg-white text-teal-500 hover:scale-105 duration-300">
            View More Details
          </button>
        </div>
      </div>

      {/* Card 3 */}
      <div className="relative h-[400px]">
        {/* overlay */}
        <div className="absolute w-full h-full bg-white text-teal-500 flex flex-col justify-between p-4">
          <p className="font-bold text-2xl">
            Introducing to Software Engineering
          </p>
          <div className="flex items-center">
            <i className="fa fa-star text-customTurquoise"></i>
            <i className="fa fa-star text-customTurquoise"></i>
            <i className="fa fa-star text-customTurquoise"></i>
            <i className="fa fa-star text-customTurquoise"></i>
            <i className="fa fa-star text-customTurquoise"></i>
            <label className="ml-2 text-customTurquoise">(5.0)</label>
          </div>
          <div className=" flex items-center gap-5">
            <img
              className="w-[50px] rounded-full bg-white mt-2"
              src="https://i.dell.com/is/image/DellContent/content/dam/ss2/page-specific/category-pages/alienware-desktop-aurora-r16-notebook-m18-800x620-image-v2.png?fmt=png-alpha&wid=800&hei=620"
              alt="Course Thumbnail"
            />
            <p>by someone</p>
          </div>
          <button className=" border border-teal-400 p-3 bg-white text-teal-500 hover:scale-105 duration-300">
            View More Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default HeadLineCards;
