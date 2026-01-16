import React, { useEffect, useState } from "react";
import { CiFilter } from "react-icons/ci";
import {
  IoIosInformationCircleOutline,
  IoMdArrowDropdown,
  IoMdMenu,
  IoMdClose,
} from "react-icons/io";
import filter from "../../assets/ExploreProperties/filter.png";
import PropertiesCard from "../../../src/Pages/ExploreProperties/Components/PropertiesCard"; 
import Pricing from "../../../src/Pages/ExploreProperties/Components/Pricing"; 
import TypeOfUnit from "../../../src/Pages/ExploreProperties/Components/TypeOfUnit";
import AnnualRent from "../../../src/Pages/ExploreProperties/Components/AnualRent";
import ROI from "../../../src/Pages/ExploreProperties/Components/ROI";
import Tenure from "../../../src/Pages/ExploreProperties/Components/Tenure"; 
import squarebg from "../../assets/propertyDetails/squaresbg.png";

const ExploreProperties = () => {
  const [filters, setFilters] = useState({
    proximity: [],
    pricing: { min: 0, max: 50000000 },
    rent: { min: 0, max: 5000000 },
    roi: 100, // Default to 100%
    tenure: 20, // Default to 20 years
  });
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState("location");

   useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const proximityOptions = [
    { id: "metro", label: "Metro Station" },
    { id: "business", label: "Business District" },
    { id: "shopping", label: "Shopping Center" },
    { id: "highway", label: "Major Highway" },
    { id: "industrial", label: "Industrial Zone" },
    { id: "university", label: "University" },
    { id: "airport", label: "Airport" },
    { id: "port", label: "Port/Harbor" },
  ];

  const handleProximityChange = (id) => {
    setFilters((prev) => ({
      ...prev,
      proximity: prev.proximity.includes(id)
        ? prev.proximity.filter((item) => item !== id)
        : [...prev.proximity, id],
    }));
  };

  const handlePricingChange = (pricingData) => {
    setFilters((prev) => ({
      ...prev,
      pricing: pricingData,
    }));
  };

  const handleRentChange = (rentData) => {
    setFilters((prev) => ({
      ...prev,
      rent: rentData,
    }));
  };

  const handleROIChange = (roiValue) => {
    setFilters((prev) => ({
      ...prev,
      roi: roiValue,
    }));
  };

  const handleTenureChange = (tenureValue) => {
    setFilters((prev) => ({
      ...prev,
      tenure: tenureValue,
    }));
  };

  const handleResetFilters = () => {
    setFilters({ 
      proximity: [],
      pricing: { min: 0, max: 50000000 },
      rent: { min: 0, max: 5000000 },
      roi: 100,
      tenure: 20,
    });
  };

  const handleApplyFilters = () => {
    console.log("Applied filters:", filters);
    setShowFilters(false);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case "location":
        return (
          <>
            {/* Proximity Options - Responsive */}
            <div>
              <h3 className="text-sm font-bold text-[#262626] mb-2">
                Proximity to
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mb-6">
                {proximityOptions.map((option) => (
                  <label
                    key={option.id}
                    className="flex items-center gap-2 sm:gap-3 cursor-pointer "
                  >
                    <input
                      type="checkbox"
                      checked={filters.proximity.includes(option.id)}
                      onChange={() => handleProximityChange(option.id)}
                      className="w-3 h-3 sm:w-4 sm:h-4 border border-gray-300 bg-[#6E6E6E] rounded cursor-pointer accent-red-600"
                    />
                    <span className="text-sm ">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </>
        );
      case "pricing":
        return (
          <Pricing 
            onPricingChange={handlePricingChange}
            initialPricing={filters.pricing}
          />
        );
      case "unit":
        return <TypeOfUnit />;
      case "rent":
        return (
          <AnnualRent 
            onRentChange={handleRentChange}
            initialRent={filters.rent}
          />
        );
      case "roi":
        return (
          <ROI 
            onROIChange={handleROIChange}
            initialROI={filters.roi}
          />
        );
      case "tenure":
        return (
          <Tenure 
            onTenureChange={handleTenureChange}
            initialTenure={filters.tenure}
          />
        );
      default:
        return null;
    }
  };

  return (
   <div>
     <div className="">
        <div className="w-full max-w-[95%] mx-auto font-montserrat mt-4 mb-8">
      {/* Top Controls Section with Background - Updated with toggle */}
      <div 
        className="relative rounded-lg mb-4"
        style={{
          backgroundImage: `url(${squarebg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '80px'
        }}
      >
        {/* Overlay for better readability */}
        <div className="absolute inset-0 bg-white/30 rounded-lg"></div>
        
        {/* Top Controls - Responsive */}
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0 p-4 sm:p-6">
          {/* Results count - Hidden on mobile when filters are shown */}
          <div className={`${showFilters ? 'hidden sm:block' : 'block'} w-full sm:w-auto`}>
            <p className=" font-bold text-sm sm:text-base text-[#767676]">
             <span className="text-[#EE2529]"> Properties</span> found based on your above search criteria.
            </p>
          </div>
          
          {/* Controls on right side */}
          <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto justify-end">
            {/* Advance Filters Button */}
            <button 
              onClick={toggleFilters}
              className="flex items-center gap-2 border-2 border-[#767676] py-1 px-2 md:py-2 md:px-3 rounded-md bg-white hover:bg-gray-50 transition-colors"
            >
              {showFilters ? (
                <>
                  <IoMdClose size={18} className="sm:hidden" />
                  <span className="hidden sm:inline">Close Filters</span>
                  <span className="sm:hidden">Close</span>
                </>
              ) : (
                <>
                  <span className="">Advance Filters</span>
                
                  <img src={filter} alt="filter" className="w-3 h-3 sm:w-4 sm:h-4" />
                </>
              )}
            </button>
            
            {/* Sort by dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-gray-700 text-sm sm:text-base">Sort by:</span>
              <button className="flex items-center gap-1 text-[#EE2529] font-semibold hover:bg-gray-100 text-sm sm:text-base bg-white px-3 py-2 rounded border border-gray-300">
                A-Z <IoMdArrowDropdown size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Filter Container - Responsive with toggle */}
      {showFilters && (
        <div className="shadow-lg rounded-lg px-4 sm:px-6 py-6 sm:py-8 mb-6">
          {/* Header */}
          <div className="mb-4 sm:mb-4">
            <div className="flex items-center gap-2">
              <CiFilter className="text-[#EE2529] text-sm md:text-base lg:text-xl" />
              <h1 className="text-sm md:text-base lg:text-xl  font-bold text-[#EE2529]">
                Advanced Filters
              </h1>
            </div>
          </div>

         <div className="flex flex-wrap justify-between gap-2 sm:gap-4 md:gap-8 mb-4 sm:mb-4 overflow-x-auto pb-2">
  <button 
    onClick={() => setActiveTab("location")}
    className={`pb-2 sm:pb-4 font-bold whitespace-nowrap text-xs sm:text-base ${activeTab === "location" ? "text-[#EE2529] border-b-2 border-[#EE2529]" : "text-[#262626] hover:text-gray-900"}`}
  >
    <span className="block sm:hidden">Location</span>
    <span className="hidden sm:block">
      Location <br /> Proximity
    </span>
  </button>
  
  <button 
    onClick={() => setActiveTab("pricing")}
    className={`pb-2 sm:pb-4 font-bold whitespace-nowrap text-xs sm:text-base ${activeTab === "pricing" ? "text-[#EE2529] border-b-2 border-[#EE2529]" : "text-[#262626] hover:text-gray-900"}`}
  >
    <span className="block sm:hidden">Pricing</span>
    <span className="hidden sm:block">Pricing</span>
  </button>
  
  <button 
    onClick={() => setActiveTab("unit")}
    className={`pb-2 sm:pb-4 font-bold whitespace-nowrap text-xs sm:text-base ${activeTab === "unit" ? "text-[#EE2529] border-b-2 border-[#EE2529]" : "text-[#262626] hover:text-gray-900"}`}
  >
    <span className="block sm:hidden">Unit</span>
    <span className="hidden sm:block">Type of Unit</span>
  </button>
  
  <button 
    onClick={() => setActiveTab("rent")}
    className={`pb-2 sm:pb-4 font-bold whitespace-nowrap text-xs sm:text-base ${activeTab === "rent" ? "text-[#EE2529] border-b-2 border-[#EE2529]" : "text-[#262626] hover:text-gray-900"}`}
  >
    <span className="block sm:hidden">Rent</span>
    <span className="hidden sm:block">
      Annual Rent <br /> Achieved
    </span>
  </button>
  
  <button 
    onClick={() => setActiveTab("roi")}
    className={`pb-2 sm:pb-4 font-bold whitespace-nowrap text-xs sm:text-base ${activeTab === "roi" ? "text-[#EE2529] border-b-2 border-[#EE2529]" : "text-[#262626] hover:text-gray-900"}`}
  >
    <span className="block sm:hidden">ROI</span>
    <span className="hidden sm:block">ROI</span>
  </button>
  
  <button 
    onClick={() => setActiveTab("tenure")}
    className={`pb-2 sm:pb-4 font-bold whitespace-nowrap text-xs sm:text-base ${activeTab === "tenure" ? "text-[#EE2529] border-b-2 border-[#EE2529]" : "text-[#262626] hover:text-gray-900"}`}
  >
    <span className="block sm:hidden">Tenure</span>
    <span className="hidden sm:block">Tenure Left</span>
  </button>
</div>

          {/* Info Box */}
          <div className="bg-[#FDEDEE] p-2 mb-4 flex items-start gap-3 rounded-2xl">
            <div className="text-lg sm:text-xl">
              <IoIosInformationCircleOutline />
            </div>
            <p className="text-gray-700 text-xs sm:text-sm">
              This information is certified from the person listing the property
            </p>
          </div>

          {/* Dynamic Tab Content */}
          {renderActiveTabContent()}

          {/* Divider */}
          <div className="border-t border-gray-200 mb-6 sm:mb-8 mt-6 sm:mt-8"></div>

          {/* Action Buttons - Responsive */}
          <div className="flex flex-row justify-end gap-3 sm:gap-4">
            <button
              onClick={handleResetFilters}
              className="px-4 sm:px-6 py-2 border-2 border-gray-400 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 transition text-sm sm:text-base w-full sm:w-auto"
            >
              Reset Filters
            </button>
            <button
              onClick={handleApplyFilters}
              className="px-4 sm:px-6 py-2 text-white font-semibold rounded-lg transition 
                bg-gradient-to-r from-[#EE2529] to-[#C73834]
                hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 text-sm sm:text-base w-full sm:w-auto"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}

      {/* Properties Cards Section */}
    </div>
     </div>
      <PropertiesCard />
   </div>
  );
};

export default ExploreProperties;