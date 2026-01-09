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
  const [showMobileFilters, setShowMobileFilters] = useState(false);
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
    setShowMobileFilters(false);
  };

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case "location":
        return (
          <>
            {/* Proximity Options - Responsive */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-[#262626] mb-2">
                Proximity to
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 mb-6">
                {proximityOptions.map((option) => (
                  <label
                    key={option.id}
                    className="flex items-center gap-2 sm:gap-3 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={filters.proximity.includes(option.id)}
                      onChange={() => handleProximityChange(option.id)}
                      className="w-4 h-4 sm:w-5 sm:h-5 border border-gray-300 rounded cursor-pointer accent-red-600"
                    />
                    <span className="text-sm sm:text-base">{option.label}</span>
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
    <div className="w-full max-w-[95%] mx-auto font-montserrat mt-6">
      {/* Top Controls Section with Background */}
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
        <div className="absolute inset-0 bg-white/60 rounded-lg"></div>
        
        {/* Top Controls - Responsive */}
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-2 justify-between sm:justify-end p-4">
          {/* Mobile Filter Toggle Button */}
          <button 
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="sm:hidden flex items-center justify-center gap-2 border-2 border-[#767676] py-2 px-3 rounded-md w-full bg-white"
          >
            {showMobileFilters ? (
              <>
                <IoMdClose size={20} />
                Close Filters
              </>
            ) : (
              <>
                <IoMdMenu size={20} />
                Advanced Filters
                <img src={filter} alt="" className="w-5 h-5" />
              </>
            )}
          </button>

          {/* Desktop Advance Filters Button */}
          <button className="hidden sm:flex items-center gap-2 border-2 border-[#767676] py-2 px-3 rounded-md bg-white">
            Advance Filters
            <img src={filter} alt="" />
          </button>
          
          <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto">
            <span className="text-gray-700 text-sm sm:text-base">Sort by:</span>
            <button className="flex items-center gap-1 text-[#EE2529] font-semibold hover:bg-gray-100 text-sm sm:text-base bg-white px-2 py-1 rounded">
              A-Z <IoMdArrowDropdown size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Filter Container - Responsive */}
      <div className={`shadow-lg rounded-lg px-4 sm:px-6 py-6 sm:py-8 ${showMobileFilters ? 'block' : 'hidden sm:block'}`}>
        {/* Header */}
        <div className="mb-4 sm:mb-4">
          <div className="flex items-center gap-2">
            <CiFilter className="text-[#EE2529] text-2xl sm:text-3xl" />
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#EE2529]">
              Advanced Filters
            </h1>
          </div>
        </div>

        {/* Filter Tabs - Responsive */}
        <div className="flex flex-wrap gap-2 sm:gap-4 md:gap-8 mb-4 sm:mb-4 overflow-x-auto pb-2">
          <button 
            onClick={() => setActiveTab("location")}
            className={`pb-2 sm:pb-4 font-semibold whitespace-nowrap text-sm sm:text-base ${activeTab === "location" ? "text-[#EE2529] border-b-2 border-[#EE2529]" : "text-gray-600 hover:text-gray-900"}`}
          >
            Location Proximity
          </button>
          <button 
            onClick={() => setActiveTab("pricing")}
            className={`pb-2 sm:pb-4 font-semibold whitespace-nowrap text-sm sm:text-base ${activeTab === "pricing" ? "text-[#EE2529] border-b-2 border-[#EE2529]" : "text-gray-600 hover:text-gray-900"}`}
          >
            Pricing
          </button>
          <button 
            onClick={() => setActiveTab("unit")}
            className={`pb-2 sm:pb-4 font-semibold whitespace-nowrap text-sm sm:text-base ${activeTab === "unit" ? "text-[#EE2529] border-b-2 border-[#EE2529]" : "text-gray-600 hover:text-gray-900"}`}
          >
            Type of Unit
          </button>
          <button 
            onClick={() => setActiveTab("rent")}
            className={`pb-2 sm:pb-4 font-semibold whitespace-nowrap text-sm sm:text-base ${activeTab === "rent" ? "text-[#EE2529] border-b-2 border-[#EE2529]" : "text-gray-600 hover:text-gray-900"}`}
          >
            Annual Rent Achieved
          </button>
          <button 
            onClick={() => setActiveTab("roi")}
            className={`pb-2 sm:pb-4 font-semibold whitespace-nowrap text-sm sm:text-base ${activeTab === "roi" ? "text-[#EE2529] border-b-2 border-[#EE2529]" : "text-gray-600 hover:text-gray-900"}`}
          >
            ROI
          </button>
          <button 
            onClick={() => setActiveTab("tenure")}
            className={`pb-2 sm:pb-4 font-semibold whitespace-nowrap text-sm sm:text-base ${activeTab === "tenure" ? "text-[#EE2529] border-b-2 border-[#EE2529]" : "text-gray-600 hover:text-gray-900"}`}
          >
            Tenure Left
          </button>
        </div>

        {/* Info Box */}
        <div className="bg-[#FDEDEE] p-3 sm:p-4 mb-4 flex items-start gap-3 rounded-lg">
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
        <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4">
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

      {/* Properties Cards Section */}
      <PropertiesCard />
    </div>
  );
};

export default ExploreProperties;