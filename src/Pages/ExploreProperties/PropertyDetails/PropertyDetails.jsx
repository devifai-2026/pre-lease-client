import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CiCircleQuestion, CiHeart, CiLocationOn } from "react-icons/ci";
import { FaBuilding, FaPlus } from "react-icons/fa";
import { RiShareForwardLine } from "react-icons/ri";
import { IoIosArrowBack } from "react-icons/io";
import cardImg from "../../../assets/FeaturedProperties/cardImg.png";
import tag from "../../../assets/FeaturedProperties/tag.png";
import { IoDocumentTextOutline } from "react-icons/io5";
import { SiSimpleanalytics } from "react-icons/si";
import LeaseDetails from "../PropertyDetails/Components/LeaseDetails";
import Analytics from "../PropertyDetails/Components/Analytics/Analytics";
import FAQ from "../PropertyDetails/Components/FAQ";
import LocationDetails from "../PropertyDetails/Components/LocationDetails";
import PropertyDetailsCards from "../PropertyDetails/Components/PropertyDetailsCards";
import squaresbg from "../../../assets/propertyDetails/squaresbg.png";

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("property");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Property images array
  const propertyImages = [cardImg, cardImg, cardImg, cardImg];

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const handleDotClick = (index) => {
    setCurrentImageIndex(index);
  };

  // NEW: Handle Enquire button click - Navigate to enquiry page
  const handleEnquireClick = () => {
    // Navigate to the enquiry page with the property ID
    navigate(`/enquiry/${id}`);
  };

  return (
    <div 
      className="min-h-screen font-montserrat p-3 sm:p-4 md:p-6"
      style={{
        backgroundImage: `url(${squaresbg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Back Button */}
      <button
        onClick={handleGoBack}
        className="mb-4 sm:mb-6 flex items-center gap-2 text-[#767676] hover:text-[#EE2529] transition-colors text-sm sm:text-base"
      >
        <IoIosArrowBack className="text-lg sm:text-xl" />
        <span>Back to Properties</span>
      </button>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-4 sm:gap-6 md:gap-8">
          {/* Left Column - Image and Assistance Card (30%) */}
          <div className="lg:col-span-3 space-y-4 sm:space-y-6">
            {/* Image Card */}
            <div className="bg-white rounded-lg overflow-hidden shadow-lg">
              <div className="pt-3 sm:pt-4 md:pt-5">
                <p className="text-base sm:text-lg font-medium pl-3 sm:pl-4">
                  Residential Space
                </p>
                <div className="flex items-center justify-between mt-1 mb-1 sm:mb-2">
                  <p className="flex items-center gap-1 text-sm sm:text-base text-gray-700 pl-3 sm:pl-4">
                    <CiLocationOn className="text-[#EE2529] flex-shrink-0 text-sm sm:text-base" />
                    <span className="text-xs sm:text-sm md:text-base">
                      Pune, Mundhva
                    </span>
                  </p>
                  <div className="relative">
                    <img
                      className="w-12 sm:w-16 md:w-20"
                      src={tag}
                      alt="Verified"
                    />
                    <p className="absolute bottom-0.5 sm:bottom-1 right-1.5 sm:right-2 text-white text-[10px] sm:text-xs">
                      Verified
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="relative">
                  <img
                    src={propertyImages[currentImageIndex]}
                    alt="Property"
                    className="w-full h-[160px] sm:h-[180px] md:h-[200px] lg:h-[250px] object-cover"
                  />
                  
                  {/* Gradient overlay for bottom blur */}
                  <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-white/80 to-transparent backdrop-blur-[2px] border-t border-white rounded-b-lg"></div>
                  
                  {/* Slider Dots */}
                  <div className="absolute bottom-12 md:bottom-16 left-1/2 transform -translate-x-1/2 flex items-center gap-1.5 sm:gap-2">
                    {propertyImages.map((_, dotIndex) => (
                      <button
                        key={dotIndex}
                        onClick={() => handleDotClick(dotIndex)}
                        className={`h-2 sm:h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                          currentImageIndex === dotIndex
                            ? "bg-red-500 w-2.5"
                            : "bg-white/60 w-2.5 hover:bg-white/80"
                        }`}
                        aria-label={`Go to image ${dotIndex + 1}`}
                      />
                    ))}
                  </div>
                  
                  {/* Action Buttons on Image */}
                  <div className="absolute bottom-2 sm:bottom-3 left-0 right-0 flex items-center justify-between px-3 sm:px-4">
                    <div className="bg-[#FFF3CA] py-1 px-2 sm:px-3 rounded-3xl text-xs sm:text-sm text-[#767676]">
                      MNC Client
                    </div>
                    <button className="bg-white text-[#EE2529] px-2 py-1 sm:px-3 sm:py-1.5 flex items-center gap-1 sm:gap-2 border border-[#EE2529] rounded-md text-xs sm:text-sm hover:bg-gray-50 transition-colors">
                      <FaPlus className="text-xs sm:text-sm" /> Compare
                    </button>
                  </div>
                  <div className="absolute top-2 sm:top-3 right-3 sm:right-4 flex flex-col gap-1.5 sm:gap-2">
                    <RiShareForwardLine className="bg-[#2626268A] rounded-full p-1 text-white h-6 w-6 sm:h-7 sm:w-7 cursor-pointer hover:scale-110 transition-transform" />
                    <CiHeart className="bg-[#2626268A] rounded-full p-1 text-white h-6 w-6 sm:h-7 sm:w-7 cursor-pointer hover:scale-110 transition-transform" />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-around mt-1 p-1">
                <div className="space-y-1 sm:space-y-2">
                  <p className="text-xs sm:text-sm text-[#767676]">
                    Cost:{" "}
                    <span className="font-semibold text-[#262626] text-xs sm:text-sm">
                      ₹36.8 Cr
                    </span>
                  </p>
                  <p className="text-xs sm:text-sm text-[#767676]">
                    Annual Rent:{" "}
                    <span className="font-semibold text-[#262626] text-xs sm:text-sm">
                      ₹22.87L
                    </span>
                  </p>
                  <p className="text-xs sm:text-sm text-[#767676]">
                    Tenure Left:{" "}
                    <span className="font-semibold text-[#262626] text-xs sm:text-sm">
                      10 Yrs
                    </span>
                  </p>
                </div>
                <div className="bg-gradient-to-r from-[#F2F2F2] to-[#FFFFFF] w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 flex flex-col items-center justify-center rounded-lg shadow-lg ml-1 sm:ml-2">
                  <p className="text-xs sm:text-sm font-medium">ROI</p>
                  <p className="text-[#EE2529] font-bold text-sm sm:text-base md:text-lg">
                    90.21%
                  </p>
                </div>
              </div>

              {/* UPDATED: Enquire button with onClick handler */}
              <div className="flex items-center justify-center gap-2 sm:gap-3 mt-3 sm:mt-4 mb-3 sm:mb-5">
                <button 
                  onClick={handleEnquireClick}
                  className="border rounded-md text-white px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-[#EE2529] to-[#C73834] text-xs sm:text-sm hover:opacity-90 transition-opacity hover:scale-105"
                >
                  Enquire
                </button>
              </div>
            </div>

            {/* Assistance Card */}
            <div className="bg-white rounded-lg overflow-hidden p-3 sm:p-4 md:p-5">
              <div className="flex flex-col md:flex-row items-center gap-4 sm:gap-6">
                <div className="w-full">
                  <h3 className="text-base sm:text-lg font-semibold text-[#262626] mb-1 sm:mb-2">
                    Need Assistance?
                  </h3>
                  <p className="text-[#767676] text-xs sm:text-sm mb-3 sm:mb-4">
                    Have questions about returns, tenants, or documents? Our
                    team is hired to guide you both with clear answers on
                    certain topics, and compliance directly from our property
                    advisers.
                  </p>
                  <button className="border border-[#767676] text-[#767676] rounded-sm px-4 py-2 sm:px-6 sm:py-2.5 text-xs sm:text-sm hover:bg-gray-50 transition-colors hover:scale-105 w-28 sm:w-32 flex justify-center text-nowrap mx-auto">
                    Get Support
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Content changes based on active tab (70%) */}
          <div className="lg:col-span-7">
            {/* Tab Navigation Card */}
            <div className="bg-white p-4 sm:p-5 md:p-6 mb-4 sm:mb-6">
              <div className="flex items-center justify-between mb-4 sm:mb-6 md:mb-8 border-b border-gray-200 pb-2 overflow-x-auto">
                <div className="flex space-x-3 sm:space-x-4 md:space-x-8 min-w-max mb-0.5">
                  {/* Property Details Tab */}
                  <div
                    className={`text-center flex flex-col items-center cursor-pointer group relative pb-1 ${
                      activeTab === "property"
                        ? "text-[#EE2529]"
                        : "text-[#767676]"
                    }`}
                    onClick={() => handleTabClick("property")}
                  >
                    <FaBuilding
                      className={`w-5 h-5 sm:w-6 sm:h-6 mb-0.5 sm:mb-1 ${
                        activeTab === "property"
                          ? "text-[#EE2529]"
                          : "text-[#767676] group-hover:text-[#EE2529]"
                      }`}
                    />
                    <p className="text-xs sm:text-sm font-medium">
                      Property Details
                    </p>
                    {activeTab === "property" && (
                      <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-[#EE2529]"></div>
                    )}
                  </div>

                  {/* Lease Details Tab */}
                  <div
                    className={`text-center flex flex-col items-center cursor-pointer group relative pb-1 ${
                      activeTab === "lease"
                        ? "text-[#EE2529]"
                        : "text-[#767676]"
                    }`}
                    onClick={() => handleTabClick("lease")}
                  >
                    <IoDocumentTextOutline
                      className={`w-5 h-5 sm:w-6 sm:h-6 mb-0.5 sm:mb-1 ${
                        activeTab === "lease"
                          ? "text-[#EE2529]"
                          : "text-[#767676] group-hover:text-[#EE2529]"
                      }`}
                    />
                    <p className="text-xs sm:text-sm">Lease Details</p>
                    {activeTab === "lease" && (
                      <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-[#EE2529]"></div>
                    )}
                  </div>

                  {/* Analytics Tab */}
                  <div
                    className={`text-center flex flex-col items-center cursor-pointer group relative pb-1 ${
                      activeTab === "analytics"
                        ? "text-[#EE2529]"
                        : "text-[#767676]"
                    }`}
                    onClick={() => handleTabClick("analytics")}
                  >
                    <SiSimpleanalytics
                      className={`w-5 h-5 sm:w-6 sm:h-6 mb-0.5 sm:mb-1 ${
                        activeTab === "analytics"
                          ? "text-[#EE2529]"
                          : "text-[#767676] group-hover:text-[#EE2529]"
                      }`}
                    />
                    <p className="text-xs sm:text-sm">Analytics</p>
                    {activeTab === "analytics" && (
                      <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-[#EE2529]"></div>
                    )}
                  </div>

                  {/* Location Details Tab */}
                  <div
                    className={`text-center flex flex-col items-center cursor-pointer group relative pb-1 ${
                      activeTab === "location"
                        ? "text-[#EE2529]"
                        : "text-[#767676]"
                    }`}
                    onClick={() => handleTabClick("location")}
                  >
                    <CiLocationOn
                      className={`w-5 h-5 sm:w-6 sm:h-6 mb-0.5 sm:mb-1 ${
                        activeTab === "location"
                          ? "text-[#EE2529]"
                          : "text-[#767676] group-hover:text-[#EE2529]"
                      }`}
                    />
                    <p className="text-xs sm:text-sm">Location Details</p>
                    {activeTab === "location" && (
                      <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-[#EE2529]"></div>
                    )}
                  </div>

                  {/* FAQs Tab */}
                  <div
                    className={`text-center flex flex-col items-center cursor-pointer group relative pb-1 ${
                      activeTab === "faqs" ? "text-[#EE2529]" : "text-[#767676]"
                    }`}
                    onClick={() => handleTabClick("faqs")}
                  >
                    <CiCircleQuestion
                      className={`w-5 h-5 sm:w-6 sm:h-6 mb-0.5 sm:mb-1 ${
                        activeTab === "faqs"
                          ? "text-[#EE2529]"
                          : "text-[#767676] group-hover:text-[#EE2529]"
                      }`}
                    />
                    <p className="text-xs sm:text-sm">FAQs</p>
                    {activeTab === "faqs" && (
                      <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-[#EE2529]"></div>
                    )}
                  </div>
                </div>
              </div>

              {/* Download and Share buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-between mb-3 gap-3">
                <div className="flex items-center gap-2 sm:gap-3 order-2 sm:order-1">
                  <div className="bg-[#FFF3CA] py-1 px-2 sm:px-3 rounded-3xl text-xs sm:text-sm text-[#767676]">
                    Premium Location
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 order-1 sm:order-2 w-full sm:w-auto justify-center sm:justify-end">
                  <button className="flex items-center gap-1 sm:gap-2 border border-[#767676] text-[#767676] rounded-md px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm hover:bg-gray-50 transition-colors">
                    <svg
                      className="w-3 h-3 sm:w-4 sm:h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      ></path>
                    </svg>
                    <span className="hidden xs:inline">Download Report</span>
                    <span className="xs:hidden">Download</span>
                  </button>
                  <button className="flex items-center gap-1 sm:gap-2 border border-[#767676] text-[#767676] rounded-md px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm hover:bg-gray-50 transition-colors">
                    <svg
                      className="w-3 h-3 sm:w-4 sm:h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                      ></path>
                    </svg>
                    <span className="hidden xs:inline">Share Report</span>
                    <span className="xs:hidden">Share</span>
                  </button>
                </div>
              </div>

              {/* Content changes based on active tab - TITLES GO HERE */}
              {activeTab === "property" && (
                <>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 sm:mb-4 gap-2 sm:gap-4">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#EE2529]">
                      Residential Space
                    </h3>
                  </div>
                  <p className="text-[#767676] text-xs sm:text-sm">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse varius enim in eros elementum tristique. Duis
                    cursus, mi quis viverra ornare, eros dolor interdum nulla,
                    ut commodo diam libero vitae erat.
                  </p>
                </>
              )}

              {/* Add Analytics Title HERE - inside the same card */}
              {activeTab === "analytics" && (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#EE2529]">
                    Property Investment ROI Analytics
                  </h3>
                </div>
              )}

              {/* Add Lease Details Title HERE - inside the same card */}
              {activeTab === "lease" && (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#EE2529]">
                    Lease & Tenant Details
                  </h3>
                </div>
              )}
              {/* Add Location Title HERE - inside the same card */}
              {activeTab === "location" && (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#EE2529]">
                    Location & Market Overview
                  </h3>
                </div>
              )}

              {/* Add FAQ Title HERE - inside the same card */}
              {activeTab === "faqs" && (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="space-y-2">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#EE2529]">
                      Frequently Asked Questions
                    </h3>
                    <p className="text-sm">
                      Get answers to common questions from each stakeholder type
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Content Area - Changes based on tab */}
            {activeTab === "property" && <PropertyDetailsCards />}

            {/* Render LeaseDetails component when lease tab is active */}
            {activeTab === "lease" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <LeaseDetails />
              </div>
            )}

            {/* Render Analytics component when analytics tab is active */}
            {activeTab === "analytics" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <Analytics />
              </div>
            )}

            {/* For Location Details - use same structure */}
            {activeTab === "location" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <LocationDetails />
              </div>
            )}

            {/* For FAQs */}
            {activeTab === "faqs" && (
              <div className="col-span-1 lg:col-span-2">
                <FAQ />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;