import { useEffect, useState } from "react";
import { CiFilter } from "react-icons/ci";
import {
  IoIosInformationCircleOutline,
  IoMdArrowDropdown,
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
    pricing: { min: 0, max: 50000000 },
    rent: { min: 0, max: 5000000 },
    roi: 100,
    tenure: 20,
  });
  const [showFilters, setShowFilters] = useState(false);
  const [showDesktopFilters, setShowDesktopFilters] = useState(true); // New state for desktop filters
  const [activeTab, setActiveTab] = useState("pricing");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  const toggleDesktopFilters = () => {
    setShowDesktopFilters(!showDesktopFilters);
  };

  const renderActiveTabContent = () => {
    switch (activeTab) {
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
        return <ROI onROIChange={handleROIChange} initialROI={filters.roi} />;
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

  const tabOptions = [
    { id: "pricing", label: "Pricing" },
    { id: "unit", label: "Type of Unit" },
    { id: "rent", label: "Annual Rent\nAchieved" },
    { id: "roi", label: "ROI" },
    { id: "tenure", label: "Tenure Left" },
  ];

  return (
    <div className="font-montserrat">
      <div className="">
        <div className="w-full max-w-[95%] mx-auto font-montserrat mt-4 mb-8">
          {/* Top Controls Section with Background */}
          <div
            className="relative rounded-lg mb-4"
            style={{
              backgroundImage: `url(${squarebg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              minHeight: "80px",
            }}
          >
            <div className="absolute inset-0 bg-white/30 rounded-lg"></div>

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-3 sm:gap-0 p-4 lg:p-6 space-y-2">
              <div
                className={`${
                  showFilters || !showDesktopFilters ? "hidden sm:block" : "block"
                } w-full sm:w-auto`}
              >
                <p className="font-bold text-sm sm:text-base text-[#767676]">
                  <span className="text-[#EE2529]">Properties</span> found based
                  on your above search criteria.
                </p>
              </div>

              <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto justify-end">
                <button
                  onClick={() => {
                    // On mobile, toggle mobile drawer
                    // On desktop, toggle desktop filters panel
                    if (window.innerWidth >= 1024) {
                      toggleDesktopFilters();
                    } else {
                      toggleFilters();
                    }
                  }}
                  className="flex items-center gap-2 border-2 border-[#767676] py-1 px-2 md:py-2 md:px-3 rounded-md bg-white hover:bg-gray-50 transition-colors"
                >
                  {showFilters || !showDesktopFilters ? (
                    <>
                      <IoMdClose size={18} className="sm:hidden" />
                      <span className="hidden sm:inline">Close Filters</span>
                      <span className="sm:hidden">Close</span>
                    </>
                  ) : (
                    <>
                      <span className="">Advance Filters</span>
                      <img
                        src={filter}
                        alt="filter"
                        className="w-3 h-3 sm:w-4 sm:h-4"
                      />
                    </>
                  )}
                </button>

                <div className="flex items-center gap-2">
                  <span className="text-gray-700 text-sm sm:text-base">
                    Sort by:
                  </span>
                  <button className="flex items-center gap-1 text-[#EE2529] font-semibold hover:bg-gray-100 text-sm sm:text-base bg-white px-3 py-2 rounded border border-gray-300">
                    A-Z <IoMdArrowDropdown size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Filter Container -  toggleable */}
          {showDesktopFilters && (
            <div className="hidden lg:block shadow-lg rounded-lg px-6 py-8 mb-6 bg-white">
              <div className="mb-4">
                <div className="flex items-center gap-2">
                  <CiFilter className="text-[#EE2529] text-xl" />
                  <h1 className="text-xl font-bold text-[#EE2529]">
                    Advanced Filters
                  </h1>
                </div>
              </div>

              <div className="flex justify-between gap-8 mb-4 overflow-x-auto pb-4">
                {tabOptions.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`pb-4 font-bold whitespace-nowrap text-base whitespace-pre-line text-center px-4 ${
                      activeTab === tab.id
                        ? "text-[#EE2529] border-b-2 border-[#EE2529]"
                        : "text-[#262626] hover:text-gray-900"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="bg-[#FDEDEE] p-2 mb-4 flex items-start gap-3 rounded-2xl">
                <div className="text-lg">
                  <IoIosInformationCircleOutline />
                </div>
                <p className="text-gray-700 text-sm">
                  This information is certified from the person listing the
                  property
                </p>
              </div>

              {renderActiveTabContent()}

              <div className="border-t border-gray-200 mb-8 mt-8"></div>

              <div className="flex justify-end gap-4">
                <button
                  onClick={handleResetFilters}
                  className="px-6 py-2 border-2 border-gray-400 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 transition text-base"
                >
                  Reset Filters
                </button>
                <button
                  onClick={handleApplyFilters}
                  className="px-6 py-2 text-white font-semibold rounded-lg transition bg-gradient-to-r from-[#EE2529] to-[#C73834] hover:opacity-90 text-base"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          )}

          {/* Mobile/Tablet Drawer Filter */}
          {showFilters && (
            <div className="lg:hidden fixed inset-0 z-50">
              {/* Backdrop */}
              <div
                className="absolute inset-0 bg-black/30"
                onClick={() => setShowFilters(false)}
              ></div>

              {/* Drawer Panel */}
              <div className="absolute right-0 top-0 bottom-0 w-full bg-white shadow-2xl flex flex-col overflow-hidden">
                {/* Header */}
                <div className="border-b border-gray-200 p-4 flex items-center gap-2">
                  <CiFilter className="text-[#EE2529] text-xl" />
                  <h1 className="text-base font-bold text-[#EE2529]">
                    Advanced Filters
                  </h1>
                </div>

                {/* Scrollable Content Area */}
                <div className="flex-1 overflow-y-auto">
                  {/* Left Column - Tab Names */}
                  <div className="p-4">
                    <div className="flex">
                      {/* Left Side - Tab Names */}
                      <div className="w-2/5 pr-4 bg-[#F2F2F2] min-h-screen">
                        <div className="flex flex-col gap-2">
                          {tabOptions.map((tab) => (
                            <button
                              key={tab.id}
                              onClick={() => setActiveTab(tab.id)}
                              className={`text-left text-xs font-semibold py-2 px-1 pr-3 rounded transition-colors  whitespace-pre-line ${
                                activeTab === tab.id
                                  ? "text-[#EE2529] bg-[#FDEDEE]"
                                  : "text-[#262626] hover:bg-gray-100"
                              }`}
                            >
                              {tab.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Right Side - Content */}
                      <div className="w-3/5 pl-4 pr-3">
                        <div className="bg-[#FDEDEE] p-3 mb-4 flex items-start gap-2 rounded-lg">
                          <IoIosInformationCircleOutline className="text-sm flex-shrink-0 mt-0.5" />
                          <p className="text-gray-700 text-xs">
                            This information is certified from the person
                            listing the property
                          </p>
                        </div>
                        {renderActiveTabContent()}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Buttons - Always Visible */}
                <div className=" p-4 flex gap-2 bg-[#F2F2F2]">
                  <button
                    onClick={() => setShowFilters(false)}
                    className="flex-1 px-3 py-2 border border-gray-400 text-gray-700 font-semibold rounded text-xs hover:bg-gray-50 transition"
                  >
                    Close
                  </button>
                  <button
                    onClick={handleResetFilters}
                    className="flex-1 px-3 py-2 border border-gray-400 text-gray-700 font-semibold rounded text-xs hover:bg-gray-50 transition"
                  >
                    Reset Filters
                  </button>
                  <button
                    onClick={handleApplyFilters}
                    className="flex-1 px-3 py-2 text-white font-semibold rounded text-xs bg-gradient-to-r from-[#EE2529] to-[#C73834] hover:opacity-90 transition"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <PropertiesCard />
    </div>
  );
};

export default ExploreProperties;