import React, { useEffect, useState } from "react";
import bannerImg from "../../assets/Calculator/bannerImg.png";
import { FaArrowTrendUp, FaCalculator } from "react-icons/fa6";
import { ImCalculator } from "react-icons/im";
import RentalYield from "./Component/RentalYield/RentalYield";
import EMICalculator from "./Component/EMI/EMICalculator";
import squarebg from "../../assets/propertyDetails/squaresbg.png"

const Calculator = () => {
  const [activeSection, setActiveSection] = useState("roi");
  useEffect(() => {
  window.scrollTo({
    top: 0,
    behavior: "smooth", // Use "auto" for instant scroll
  });
}, []);

  return (
    <div className="font-montserrat">
      {/* Background section - positioned separately */}
      <div 
        className="absolute top-0 left-0 right-0 h-[400px] sm:h-[550px] -z-10"
        style={{
          backgroundImage: `url(${squarebg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Light overlay for better readability */}
        <div className="absolute inset-0 bg-white/10"></div>
      </div>

     {/* Section with content */}
<div className="flex flex-col sm:flex-row items-center justify-between relative z-10">
  {/* Content container */}
  <div className="flex flex-col-reverse sm:flex-row justify-between w-full">
    {/* left content */}
    <div className="flex-1 ml-0 sm:ml-14 space-y-4 sm:space-y-6 px-4 sm:px-0 -mt-28 md:mt-6">
      {/* Mobile: Professional Investment Tools above the flex container */}
      <div className="sm:hidden mb-1 text-left">
        <p className="bg-[#FFF3CA] py-1 px-2 rounded-3xl text-[#767676] text-sm w-fit  whitespace-nowrap">
          Professional Investment Tools
        </p>
      </div>
      
      <div className="flex items-center gap-3 justify-center sm:justify-start">
        <FaCalculator className="bg-[#EE2529] rounded-lg p-2 w-12 h-12 sm:w-16 sm:h-16 text-white" />

        <div>
          {/* Desktop: Professional Investment Tools */}
          <p className="hidden sm:block bg-[#FFF3CA] py-1 px-2 rounded-3xl text-[#767676] text-xs sm:text-sm w-fit whitespace-nowrap">
            Professional Investment Tools
          </p>
          <p className="text-[#262626] font-bold text-2xl sm:text-2xl text-left md:text-center sm:text-left">
            Property Investment Platform
          </p>
        </div>
      </div>
      <div>
        <p className="font-normal text-sm sm:text-base text-center sm:text-left">
          Make data-driven decisions with comprehensive ROI analysis, loan
          coverage insights, and detailed cash flow projections for your
          real estate investments
        </p>
      </div>
      <div className="flex  flex-row items-center gap-3 justify-center sm:justify-start">
        {/* 1 */}
        <div className="shadow-md rounded-md p-3 sm:p-4 space-y-1 sm:space-y-2 w-full sm:w-[160px] text-center bg-white">
          <p className="text-xs sm:text-sm text-[#767676] font-semibold">
            Yield Analysis
          </p>
          <p className="text-[#EE2529] text-xs md:text-base">
            Gross & Net <br /> Returns
          </p>
        </div>
        {/* 2 */}
        <div className="shadow-md rounded-md p-3 sm:p-4 space-y-1 sm:space-y-2 w-full sm:w-[160px] text-center bg-white">
          <p className="text-xs sm:text-sm text-[#767676] font-semibold text-nowrap">
            Loan Planning
          </p>
          <p className="text-[#EE2529] text-xs md:text-base hidden md:block">
            EMI & Coverage <br />
            Ratio
          </p>
          <p className="text-[#EE2529] text-xs sm:text-base block md:hidden">
            EMI &  <br /><span className="text-nowrap">Coverage
            Ratio</span>
          </p>
        </div>
        {/* 3 */}
        <div className="shadow-md rounded-md p-3 sm:p-4 space-y-1 sm:space-y-2 w-full sm:w-[160px] text-center bg-white">
          <p className="text-xs sm:text-sm text-[#767676] font-semibold">
            Cash Flow
          </p>
          <p className="text-[#EE2529] text-xs md:text-base">
            10-Year <br />Projections
          </p>
        </div>
      </div>
    </div>
    {/* right Img */}
    <div className="flex-1 -mt-16 md:-mt-2 lg:-mt-24">
      <img src={bannerImg} alt="" className="w-full sm:w-auto" />
    </div>
  </div>
</div>

     {/* Calculator Sections */}
<div className="relative shadow-md rounded-lg p-2 flex items-center justify-around max-w-[92%] mx-auto mt-8">
  {/* ROI Calculator - Default Active */}
  <div
    className="cursor-pointer relative p-2 text-center"
    onClick={() => setActiveSection("roi")}
  >
    <div className="flex flex-col items-center  gap-2">
      <FaArrowTrendUp
        className={`p-2 w-7 h-7 rounded-md ${
          activeSection === "roi"
            ? "bg-[#EE2529] text-white"
            : "text-[#767676]"
        }`}
      />
      <p
        className={`text-lg md:text-xl lg:text-2xl ${
          activeSection === "roi"
            ? "text-[#EE2529] font-bold"
            : "text-[#767676] font-normal "
        }`}
      >
        ROI & Rental Yield Calculator
      </p>
    </div>
    {/* Bottom border for active section */}
    {activeSection === "roi" && (
  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[410px] h-[4px] bg-[#EE2529]"></div>
)}
  </div>

  {/* Separator - Always show */}
  <div>
    <hr className="border-t-2 border-[#EE2529] h-8"></hr>
  </div>

  {/* EMI Calculator */}
  <div
    className="cursor-pointer relative p-2 text-center"
    onClick={() => setActiveSection("emi")}
  >
    <div className=" flex flex-col items-center gap-2">
      <ImCalculator
        className={`p-2 w-7 h-7 rounded-md ${
          activeSection === "emi"
            ? "bg-[#EE2529] text-white"
            : "text-[#767676]"
        }`}
      />
      <p
        className={`text-lg md:text-xl lg:text-2xl ${
          activeSection === "emi"
            ? "text-[#EE2529] font-bold "
            : "text-[#767676] font-normal "
        }`}
      >
        EMI Calculator
      </p>
    </div>
    {/* Bottom border for active section */}
   {activeSection === "emi" && (
  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[250px] h-[4px] bg-[#EE2529]"></div>
)}
  </div>
</div>
      {/* Conditional Content Display */}
      <div className="mt-6 sm:mt-8 max-w-[100%] mx-auto px-2 sm:px-0">
        {activeSection === "roi" && <RentalYield />}
        {activeSection === "emi" && <EMICalculator />} 
      </div>
    </div>
  );
};

export default Calculator;