import React from "react";
import { FaPlane, FaTelegramPlane } from "react-icons/fa";
import { IoMdTrain } from "react-icons/io";

const LocationDetails = () => {
  return (
    <>
      {/* Left side cards container */}
      <div className="space-y-4 sm:space-y-6">
       {/* Location Details Card */}
<div className="bg-white shadow-lg rounded-lg overflow-hidden">
  <div className="pt-4 sm:pt-5 md:pt-6">
    <p className="text-base sm:text-lg font-medium pl-4 sm:pl-5 text-[#EE2529]">
      Location Details
    </p>
  </div>
  <div className="p-4 sm:p-5 pt-2 sm:pt-3">
    <div className="space-y-2">
      {/* Micro-Market City row */}
      <div className="flex items-center justify-between">
        <p className="text-[#767676] text-xs">Micro-Market</p>
        <p className="text-[#767676] text-sm ">City</p>
      </div>
      
      {/* Hinjawadi Phase 1 Pune row */}
      <div className="flex items-center justify-between">
        <p className="font-bold text-xs ">Hinjawadi Phase 1</p>
        <p className="font-bold text-sm ">Pune</p>
      </div>
      
      {/* State Maharashtra row */}
      <div className=" pt-2 ">
        <p className="text-[#767676] text-xs">State</p>
        <p className="font-bold text-sm">Maharashtra</p>
      </div>
    </div>
  </div>
</div>

        {/* Demand Drivers Card */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="pt-4 sm:pt-5 md:pt-6">
            <p className="text-base sm:text-lg font-medium pl-4 sm:pl-5 text-[#EE2529]">
              Demand Drivers
            </p>
          </div>
          <div className="p-4 sm:p-5 pt-2 sm:pt-3">
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-start">
                <div className="flex flex-col">
                  <p className=" ">
                    <span className="text-xs">Proximity to major IT campuses</span>
                    <br />
                    <span className=" text-sm font-semibold">Infosys, Wipro, TCS.High demand </span>
                    <br />
                    <span className="text-sm font-semibold">for Grade A office spaces.Growing </span>
                    <br />
                    <span className="text-sm font-semibold">tech hub with multinational presence.</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Market Benchmark Data Card */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="pt-4 sm:pt-5 md:pt-6">
            <p className="text-base sm:text-lg font-medium pl-4 sm:pl-5 text-[#EE2529]">
              Market Benchmark Data
            </p>
          </div>
          <div className="p-4 sm:p-5 ">
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-start justify-between">
                <div className="flex flex-col pr-2">
                  <p className="text-[#767676] text-xs">
                    Market Min Rent
                  </p>
                   <p className="font-bold text-sm ">
                    ₹45/sq.ft
                  </p>
                </div>
              </div>
              <div className="flex items-start justify-between ">
                <div className="flex flex-col pr-2">
                  <p className="text-[#767676] text-xs">
                    Market Max Rent
                  </p>
                   <p className="font-bold text-sm  ">
                    ₹70/sq.ft
                  </p>
                </div>
              
              </div>
              </div>
             <div className="flex items-center justify-between">
                 <div className="flex items-start justify-between">
                <div className="flex flex-col pr-2">
                  <p className="text-[#767676] text-xs">
                    Market Avg Rent
                  </p>
                   <p className="font-bold text-sm  ">
                    ₹55/sq.ft
                  </p>
                </div>
              
              </div>
              <div className="flex items-start justify-between ">
                <div className="flex flex-col pr-2">
                  <p className="text-[#767676] text-xs">
                    Market Cap Rate
                  </p>
                   <p className="font-bold text-sm  ">
                    6.5%
                  </p>
                </div>
              
              </div>
             </div>
              <div className="  rounded-lg ">
                <p className="text-[#767676]  text-xs  ">
                  Competitive Advantage
                </p>
                <p className="text-sm mt-1 text-black font-semibold">
                  This property's rent of ₹57/sq.ft is above the market average
                  of ₹55/sq.ft, with a net yield of 7.43% exceeding the market
                  cap rate of 6.5%.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side cards container */}
      <div className="space-y-4 sm:space-y-6">
        {/* Proximity Card */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="pt-4 sm:pt-5 md:pt-6">
            <p className="text-base sm:text-lg font-medium pl-4 sm:pl-5 text-[#EE2529]">
              Proximity
            </p>
          </div>
          <div className="p-4 sm:p-5 pt-2 sm:pt-3">
            <div className="space-y-1">
              <div className="flex items-start justify-between">
                <div className="flex flex-col pr-2">
                  <p className="text-[#767676] text-sm flex items-center gap-1"><FaPlane className="text-[#F7C952]" />Airport</p>
                </div>
                <div className="flex flex-col">
                  <p className=" text-sm  text-right bg-[#FFF3CA] rounded-3xl py-1 px-2 text-[#767676]">
                    12 km
                  </p>
                </div>
              </div>
              <div className="flex items-start justify-between pt-2 sm:pt-3">
                <div className="flex flex-col pr-2">
                  <p className="text-[#767676] text-sm flex items-center gap-1">
                   <IoMdTrain className="text-[#F7C952]" /> Metro Station
                  </p>
                </div>
                <div className="flex flex-col">
                  <p className=" text-sm  text-right bg-[#FFF3CA] rounded-3xl py-1 px-2 text-[#767676]">
                    1.2 km
                  </p>
                </div>
              </div>
              <div className="flex items-start justify-between pt-2 sm:pt-3">
                <div className="flex flex-col pr-2">
                  <p className="text-[#767676] text-sm flex items-center gap-1">
                    <FaTelegramPlane className="text-[#F7C952]"/>Major Junction
                  </p>
                </div>
                <div className="flex flex-col">
                  <p className=" text-sm  text-right bg-[#FFF3CA] rounded-3xl py-1 px-2 text-[#767676]">
                    3.5 km
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Future Infrastructure Card */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="pt-4 sm:pt-5 md:pt-6">
            <p className="text-base sm:text-lg font-medium pl-4 sm:pl-5 text-[#EE2529]">
              Future Infrastructure
            </p>
          </div>
          <div className="p-4 sm:p-5 pt-2 sm:pt-3">
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-start">
                <div className="flex flex-col">
                  <ul className="space-y-2 text-[#767676] text-sm sm:text-base">
                    <li className="flex items-start text-[#262626] font-semibold text-sm">
                    
                      Pune Metro Line 3 extension planned (ETA 2027)
                    </li>
                    <li className="flex items-start text-[#262626] font-semibold text-sm">
                      
                      Ring Road expansion (ETA 2026)
                    </li>
                    <li className="flex items-start text-[#262626] font-semibold text-sm">
                     
                      New IT parks under development in the vicinity
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LocationDetails;
