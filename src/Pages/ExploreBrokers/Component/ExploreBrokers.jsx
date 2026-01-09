import React from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import img from "../../../assets/ExploreBrokers/cardImg.png";
import { CiLocationOn } from "react-icons/ci";
import top from "../../../assets/ExploreBrokers/top.png";
import bottom from "../../../assets/ExploreBrokers/bottom.png";
import { useNavigate } from "react-router-dom"; 
import squarebg from "../../../assets/propertyDetails/squaresbg.png"

const ExploreBrokers = () => {
  const navigate = useNavigate();

  const handleContactBroker = (brokerId) => {
    navigate(`/contact-brokers/${brokerId}`);
  };

  return (
    <div className="max-w-[95%] mx-auto mt-6 font-montserrat">
      {/* Header with squarebg background */}
      <div 
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 sm:px-0 py-4 sm:py-6 rounded-t-lg"
        style={{
          backgroundImage: `url(${squarebg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <h2 className="text-base md:text-lg">
          <span className="text-[#EE2529] font-semibold">Agents</span>{" "}
          <span className="text-[#767676]">available for you</span>
        </h2>
        <p className="flex items-center gap-1 text-sm sm:text-base mt-2 sm:mt-0 bg-white px-3 py-1 rounded-md">
          Sort by: <span className="text-[#EE2529] font-semibold"> A-Z</span>
          <IoMdArrowDropdown className="text-[#EE2529]" />
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 px-4 sm:px-0 bg-white rounded-b-lg shadow-md">
        {[...Array(8)].map((_, index) => (
          <div 
            key={index}
            className="flex flex-col sm:flex-row items-stretch sm:items-center p-4 sm:p-5 rounded-md shadow-sm relative overflow-hidden bg-white"
          >
            {/* Background Images */}
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: `url(${top}), url(${bottom})`,
                backgroundPosition: 'left 5rem center, right bottom',
                backgroundRepeat: 'no-repeat, no-repeat',
                backgroundSize: 'auto 20rem, auto 15rem',
                opacity: 0.8,
                zIndex: 1
              }}
            />
            
            {/* Content Container */}
            <div className="relative z-10 w-full flex flex-col sm:flex-row items-center justify-between">
              {/* Left Section */}
              <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
                <div className="space-y-3">
                  <h2 className="text-[#EE2529] text-lg sm:text-xl font-bold">APJ Realtors</h2>
                  <img src={img} alt="Broker logo" className="" />
                </div>
                <button
                  onClick={() => handleContactBroker(index + 1)}
                  className="px-3 mt-4 sm:mt-7 py-2 text-white font-semibold rounded-lg transition 
                  bg-gradient-to-r from-[#EE2529] to-[#C73834]
                  hover:opacity-90 text-sm w-36 text-nowrap"
                >
                  Contact Broker
                </button>
              </div>

              {/* Right Section */}
              <div className="w-full sm:w-1/2">
                <p className="text-[#EE2529] font-bold text-lg sm:text-xl md:text-2xl">Rajendra P</p>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mt-1">
                  <p className="flex items-center gap-1 text-sm">
                    <CiLocationOn className="text-[#EE2529] flex-shrink-0" />
                    Pune{" "}
                  </p>
                  <p className="text-sm">RERA : 123456789</p>
                </div>
                <div className="mt-3">
                  <hr className="border border-[#EE2529]" />
                </div>
                <div className="flex items-center gap-3 mt-3">
                  <p className="text-sm">Specializes In:</p>
                  <p className="bg-[#FFF3CA] rounded-3xl py-1 px-2 text-sm">MNC Client</p>
                </div>
                <div className="flex items-center gap-3 mt-3">
                  <p className="bg-[#FFF3CA] rounded-3xl py-1 px-2 text-sm">Industrial</p>
                  <p className="bg-[#FFF3CA] rounded-3xl py-1 px-2 text-sm">Industrial</p>
                </div>
                <div className="flex items-center gap-3 mt-3 mb-4">
                  <p className="bg-[#FFF3CA] rounded-3xl py-1 px-2 text-sm">Commercial</p>
                  <p className="bg-[#FFF3CA] rounded-3xl py-1 px-2 text-sm">Office Lease</p>
                </div>
                <p className="mb-3 text-sm">
                  <span className="text-[#EE2529] mr-2">7</span> Properties Listed{" "}
                </p>
                <p className="text-sm">
                  <span className="text-[#EE2529] mr-2">45</span> Deals Closed{" "}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreBrokers;