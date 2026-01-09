import { useEffect } from "react";
import one from "../../assets/ExploreCategories/commercial.png";
import two from "../../assets/ExploreCategories/residential.png";
import three from "../../assets/ExploreCategories/industrial.png";
import four from "../../assets/ExploreCategories/others.png";

const ExploreCategories = () => {
  useEffect(() => {
    // AOS is already initialized globally
  }, []);

  return (
    <div className='mt-16 max-w-[95%] mx-auto'>
      <h2 
        className="text-center text-2xl md:text-3xl lg:text-4xl"
        data-aos="fade-up"
      >
        Explore all Categories
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 mt-10 gap-5">
        {/* 1 */}
        <div 
          className="shadow-lg rounded-t-xl font-montserrat overflow-hidden hover:shadow-xl transition-shadow duration-300"
          data-aos="zoom-in"
          data-aos-delay="100"
        >
          <img 
            src={one} 
            alt="Commercial" 
            className="w-full h-48 md:h-52 lg:h-56 object-cover hover:scale-105 transition-transform duration-500"
          />
          <div className="flex items-center flex-col lg:flex-row gap-2 justify-between p-4">
            <p className="bg-[#FFF3CA] py-1 px-2 sm:px-3 rounded-3xl text-xs md:text-sm text-[#262626] text-nowrap">
              26 Property Listed
            </p>
            <button className="border rounded-md text-white px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-[#EE2529] to-[#C73834] text-xs md:text-sm hover:opacity-90 transition-opacity hover:scale-105 hover:shadow-lg">
              Explore 
            </button>
          </div>
        </div>
        
        {/* 2 */}
        <div 
          className="shadow-lg rounded-t-xl font-montserrat overflow-hidden hover:shadow-xl transition-shadow duration-300"
          data-aos="zoom-in"
          data-aos-delay="200"
        >
          <img 
            src={two} 
            alt="Residential" 
            className="w-full h-48 md:h-52 lg:h-56 object-cover hover:scale-105 transition-transform duration-500"
          />
          <div className="flex items-center justify-between p-4 flex-col lg:flex-row gap-2">
            <p className="bg-[#FFF3CA] py-1 px-2 sm:px-3 rounded-3xl text-xs md:text-sm text-[#262626] text-nowrap">
              26 Property Listed
            </p>
            <button className="border rounded-md text-white px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-[#EE2529] to-[#C73834] text-xs md:text-sm hover:opacity-90 transition-opacity hover:scale-105 hover:shadow-lg">
              Explore 
            </button>
          </div>
        </div>
        
        {/* 3 */}
        <div 
          className="shadow-lg rounded-t-xl font-montserrat overflow-hidden hover:shadow-xl transition-shadow duration-300"
          data-aos="zoom-in"
          data-aos-delay="300"
        >
          <img 
            src={three} 
            alt="Industrial" 
            className="w-full h-48 md:h-52 lg:h-56 object-cover hover:scale-105 transition-transform duration-500"
          />
          <div className="flex items-center justify-between p-4 flex-col lg:flex-row gap-2">
            <p className="bg-[#FFF3CA] py-1 px-2 sm:px-3 rounded-3xl text-xs md:text-sm text-[#262626] text-nowrap">
              26 Property Listed
            </p>
            <button className="border rounded-md text-white px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-[#EE2529] to-[#C73834] text-xs md:text-sm hover:opacity-90 transition-opacity hover:scale-105 hover:shadow-lg">
              Explore 
            </button>
          </div>
        </div>
        
        {/* 4 */}
        <div 
          className="shadow-lg rounded-t-xl font-montserrat overflow-hidden hover:shadow-xl transition-shadow duration-300"
          data-aos="zoom-in"
          data-aos-delay="400"
        >
          <img 
            src={four} 
            alt="Others" 
            className="w-full h-48 md:h-52 lg:h-56 object-cover hover:scale-105 transition-transform duration-500"
          />
          <div className="flex items-center justify-between p-4 flex-col lg:flex-row gap-2">
            <p className="bg-[#FFF3CA] py-1 px-2 sm:px-3 rounded-3xl text-xs md:text-sm text-[#262626] text-nowrap">
              26 Property Listed
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