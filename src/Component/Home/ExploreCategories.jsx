import { useEffect } from "react";
import one from "../../assets/ExploreCategories/one.png"; //commercial
import two from "../../assets/ExploreCategories/two.png"; //residential
import three from "../../assets/ExploreCategories/three.png"; //industrial
import four from "../../assets/ExploreCategories/four.png"; //others

const ExploreCategories = () => {
  useEffect(() => {
    // AOS is already initialized globally
  }, []);

  return (
    <div className="mt-16 max-w-[95%] mx-auto">
      <h2
        className="text-center text-2xl md:text-3xl lg:text-4xl"
        data-aos="fade-up"
      >
        Explore all Categories
      </h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 mt-10 gap-2 md:gap-5">
        {/* 1 - Commercial */}
        <div
          className="shadow-lg rounded-2xl font-montserrat overflow-hidden hover:shadow-xl transition-shadow duration-300"
          data-aos="zoom-in"
          data-aos-delay="100"
        >
          <div className="relative">
            <img
              src={one}
              alt="Commercial"
              className="w-full h-36 md:h-52 lg:h-56 object-cover hover:scale-105 transition-transform duration-500"
            />
            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-black/20"></div>
            <h2 className="absolute top-3 md:top-6 left-4 text-white font-bold text-xl">
               Residential
            </h2>
          </div>
          <div className="flex items-center  gap-2 justify-between p-4">
           <p className="bg-[#FFF3CA] py-1 px-1 sm:px-3 rounded-3xl text-xs md:text-xs text-[#262626] text-nowrap">
  26 Property <span className="hidden lg:inline-block">Listed</span>
</p>
            <button className="border rounded-md text-white px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-[#EE2529] to-[#C73834] text-xs md:text-sm hover:opacity-90 transition-opacity hover:scale-105 hover:shadow-lg">
              Explore
            </button>
          </div>
        </div>

        {/* 2 - Residential */}
        <div
          className="shadow-lg rounded-2xl font-montserrat overflow-hidden hover:shadow-xl transition-shadow duration-300"
          data-aos="zoom-in"
          data-aos-delay="200"
        >
          <div className="relative">
            <img
              src={two}
              alt="Residential"
              className="w-full h-36 md:h-52 lg:h-56 object-cover hover:scale-105 transition-transform duration-500"
            />
            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-black/20"></div>
            <h2 className="absolute top-3 md:top-6 left-4 text-white font-bold text-xl">
              Industrial
            </h2>
          </div>
            <div className="flex items-center  gap-2 justify-between p-4">
           <p className="bg-[#FFF3CA] py-1 px-1 sm:px-3 rounded-3xl text-xs md:text-xs text-[#262626] text-nowrap">
  26 Property <span className="hidden lg:inline-block">Listed</span>
</p>
            <button className="border rounded-md text-white px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-[#EE2529] to-[#C73834] text-xs md:text-sm hover:opacity-90 transition-opacity hover:scale-105 hover:shadow-lg">
              Explore
            </button>
          </div>
        </div>

        {/* 3 - Industrial */}
        <div
          className="shadow-lg rounded-2xl font-montserrat overflow-hidden hover:shadow-xl transition-shadow duration-300"
          data-aos="zoom-in"
          data-aos-delay="300"
        >
          <div className="relative">
            <img
              src={three}
              alt="Industrial"
              className="w-full h-36 md:h-52 lg:h-56 object-cover hover:scale-105 transition-transform duration-500"
            />
            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-black/20"></div>
            <h2 className="absolute top-3 md:top-6 left-4 text-white font-bold text-xl">
              Commercial
            </h2>
          </div>
         <div className="flex items-center  gap-2 justify-between p-4">
           <p className="bg-[#FFF3CA] py-1 px-1 sm:px-3 rounded-3xl text-xs md:text-xs text-[#262626] text-nowrap">
  26 Property <span className="hidden lg:inline-block">Listed</span>
</p>
            <button className="border rounded-md text-white px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-[#EE2529] to-[#C73834] text-xs md:text-sm hover:opacity-90 transition-opacity hover:scale-105 hover:shadow-lg">
              Explore
            </button>
          </div>
        </div>

        {/* 4 - Others */}
        <div
          className="shadow-lg rounded-2xl font-montserrat overflow-hidden hover:shadow-xl transition-shadow duration-300"
          data-aos="zoom-in"
          data-aos-delay="400"
        >
          <div className="relative">
            <img
              src={four}
              alt="Others"
              className="w-full h-36 md:h-52 lg:h-56 object-cover hover:scale-105 transition-transform duration-500"
            />
            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-black/20"></div>
            <h2 className="absolute top-3 md:top-6 left-4 text-white font-bold text-xl">
              Others
            </h2>
          </div>
          <div className="flex items-center  gap-2 justify-between p-4">
          <p className="bg-[#FFF3CA] py-1 px-1 sm:px-3 rounded-3xl text-xs md:text-xs text-[#262626] text-nowrap">
  26 Property <span className="hidden lg:inline-block">Listed</span>
</p>
            <button className="border rounded-md text-white px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-[#EE2529] to-[#C73834] text-xs md:text-sm hover:opacity-90 transition-opacity hover:scale-105 hover:shadow-lg">
              Explore
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreCategories;