import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CiCircleQuestion, CiHeart, CiLocationOn } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";
import { RiShareForwardLine } from "react-icons/ri";
import { IoDocumentTextOutline } from "react-icons/io5";
import { SiSimpleanalytics } from "react-icons/si";
import { PiBuildingApartmentFill } from "react-icons/pi";
import LeaseDetails from "../PropertyDetails/Components/LeaseDetails";
import Analytics from "../PropertyDetails/Components/Analytics/Analytics";
import FAQ from "../PropertyDetails/Components/FAQ";
import LocationDetails from "../PropertyDetails/Components/LocationDetails";
import PropertyDetailsCards from "../PropertyDetails/Components/PropertyDetailsCards";
import squaresbg from "../../../assets/propertyDetails/squaresbg.png";
import share from "../../../assets/propertyDetails/share.svg"
import download from "../../../assets/propertyDetails/download.svg"
import tag from "../../../assets/FeaturedProperties/tag.png";

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("property");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const intervalRef = useRef(null);

  // Property images array with Unsplash images
  const propertyImages = [
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&h=400&fit=crop",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&h=400&fit=crop",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500&h=400&fit=crop",
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500&h=400&fit=crop"
  ];

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const handleDotClick = (index) => {
    setCurrentImageIndex(index);
    startAutoSlide();
  };

  // Mouse drag handlers
  const handleMouseDown = (e) => {
    setTouchStart(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (touchStart === null) return;
    setTouchEnd(e.clientX);
  };

  const handleMouseUp = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isLeftSwipe) {
      // Swipe left - next image
      setCurrentImageIndex(prev => (prev + 1) % propertyImages.length);
    }
    
    if (isRightSwipe) {
      // Swipe right - previous image
      setCurrentImageIndex(prev => prev === 0 ? propertyImages.length - 1 : prev - 1);
    }
    
    // Reset touch values
    setTouchStart(null);
    setTouchEnd(null);
    
    // Restart auto-slide after swipe
    startAutoSlide();
  };

  // Touch handlers for mobile
  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (touchStart === null) return;
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    handleMouseUp();
  };

  const handleEnquireClick = () => {
    navigate(`/enquiry/${id}`);
  };

  const startAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      if (!isHovered) {
        setCurrentImageIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % propertyImages.length;
          return nextIndex;
        });
      }
    }, 3000);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    startAutoSlide();
  };

  useEffect(() => {
    startAutoSlide();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div 
      className="min-h-screen font-montserrat p-3 sm:p-4 md:p-6"
      style={{
        backgroundImage: `url(${squaresbg})`,
        backgroundSize: 'cover 500px',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="max-w-[96%] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-3 md:gap-5">
          {/* Left Column - Image and Assistance Card (30%) */}
          <div className="lg:col-span-3 space-y-4 sm:space-y-6">
            {/* Image Card - MOBILE OPTIMIZED */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
              {/* DESKTOP: Header Section */}
              <div className="hidden sm:block pt-3 sm:pt-4 md:pt-5">
                <p className="text-base md:text-lg lg:text-2xl font-normal pl-3 sm:pl-4">
                  Residential Space
                </p>
                <div className="flex items-center justify-between mt-1 mb-1 sm:mb-2">
                  <p className="flex items-center gap-1 text-sm sm:text-base text-gray-700 pl-3 sm:pl-4">
                    <CiLocationOn className="text-[#EE2529] flex-shrink-0 text-sm sm:text-base" />
                    <span className="text-xs sm:text-sm md:text-base">
                      Pune, Mundhva
                    </span>
                  </p>
                  <div className="relative ">
                   <div className="relative">
                          <img className="w-16 sm:w-18 md:w-20" src={tag} alt="Verified" />
                          <p className="absolute bottom-0 md:bottom-1 right-2 text-white text-xs md:text-xs">Verified</p>
                        </div>
                  </div>
                </div>
              </div>

              {/* MOBILE: Horizontal Layout with Image on Left */}
              <div className="block sm:hidden p-3 ">
                <div className="flex gap-3 items-start">
                  {/* Image - Left Side */}
                  <div className="flex-shrink-0 w-24 h-24 relative overflow-hidden">
                    <img
                      src={propertyImages[currentImageIndex]}
                      alt="Property"
                      className="w-full h-16 object-cover"
                    />
                    {/* Verified Badge */}
                  </div>

                  {/* Text Content - Right Side */}
                  <div className="flex-1 flex flex-col justify-between py-1">
                    {/* Title & Location */}
                    <div>
                      <p className="text-xl  text-gray-900 leading-tight">
                        Residential Space
                      </p>
                      <p className="flex items-center gap-1 text-base text-gray-600 mt-2">
                        <CiLocationOn className="text-[#EE2529] flex-shrink-0 text-xs" />
                        Pune, Mundhva
                      </p>
                    </div>

                    {/* Cost Info */}
                    {/* <div className="space-y-0.5">
                      <p className="text-xs text-gray-600">
                        Cost: <span className="font-semibold text-gray-900">₹36.8 Cr</span>
                      </p>
                      <p className="text-xs text-gray-600">
                        Annual Rent: <span className="font-semibold text-gray-900">₹22.87L</span>
                      </p>
                    </div> */}
                  </div>
                </div>
              </div>

              {/* MOBILE: Buttons */}
              <div className="block sm:hidden px-3 pb-2 flex gap-2 justify-center">
                <button 
                  onClick={handleEnquireClick}
                  className=" rounded-md text-white px-3 py-2 bg-gradient-to-r from-[#EE2529] to-[#C73834] text-xs font-semibold hover:opacity-90 transition-opacity"
                >
                  Enquire
                </button>
                <button className=" border border-[#EE2529] text-[#EE2529] rounded-md px-3 py-2 flex items-center justify-center gap-1 text-xs font-semibold hover:bg-red-50 transition-colors">
                  <FaPlus className="text-xs" /> Compare
                </button>
              </div>

              {/* DESKTOP: Full Image Section with swipe functionality */}
              <div className="hidden sm:block relative">
                <div 
                  className="relative overflow-hidden cursor-grab active:cursor-grabbing"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  <img
                    src={propertyImages[currentImageIndex]}
                    alt="Property"
                    className="w-full h-[160px] sm:h-[180px] md:h-[200px] lg:h-[250px] object-cover transition-transform duration-300 ease-in-out"
                  />
                  
                  {/* Gradient overlay for bottom blur */}
                  <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-white/80 to-transparent backdrop-blur-[2px] border-t border-white rounded-b-lg"></div>
                  
                  {/* Slider Dots with auto-slide indicator */}
                  <div className="absolute bottom-12 md:bottom-16 left-1/2 transform -translate-x-1/2 flex items-center gap-1.5">
                    {propertyImages.map((_, dotIndex) => (
                      <button
                        key={dotIndex}
                        onClick={() => handleDotClick(dotIndex)}
                        onMouseEnter={handleMouseEnter}
                        className={`rounded-full transition-all duration-300 cursor-pointer relative ${
                          currentImageIndex === dotIndex
                            ? "bg-red-500 w-2.5 h-2.5 sm:w-3 sm:h-3"
                            : "bg-white w-2 h-2 sm:w-2.5 sm:h-2.5 hover:bg-white/30"
                        }`}
                        aria-label={`Go to image ${dotIndex + 1}`}
                      >
                        {currentImageIndex === dotIndex && (
                          <div className="absolute inset-0 bg-red-500 rounded-full animate-pulse"></div>
                        )}
                      </button>
                    ))}
                  </div>
                  
                  {/* Action Buttons on Image */}
                  <div className="absolute bottom-2 sm:bottom-3 left-0 right-0 flex items-center justify-between px-3 sm:px-4">
                    <div className="bg-[#FFF3CA] py-1 px-2 sm:px-3 rounded-3xl text-xs sm:text-sm text-[#767676]">
                      MNC Client
                    </div>
                    <button className="bg-white text-[#EE2529] px-2 py-1 sm:px-3 sm:py-1.5 flex items-center gap-1 sm:gap-2 rounded-md text-xs sm:text-sm hover:bg-gray-50 transition-colors font-semibold">
                      <FaPlus className="text-xs sm:text-sm" /> Compare
                    </button>
                  </div>
                  <div className="absolute top-2 sm:top-3 right-3 sm:right-4 flex flex-col gap-1.5 sm:gap-2">
                    <RiShareForwardLine className="bg-[#2626268A] rounded-full p-1 text-white h-6 w-6 sm:h-7 sm:w-7 cursor-pointer hover:scale-110 transition-transform" />
                    <CiHeart className="bg-[#2626268A] rounded-full p-1 text-white h-6 w-6 sm:h-7 sm:w-7 cursor-pointer hover:scale-110 transition-transform" />
                  </div>
                </div>
              </div>

              {/* DESKTOP: Details Section */}
              <div className="hidden sm:flex items-center justify-between px-4 mt-1 p-1">
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

              {/* DESKTOP: Enquire button */}
              <div className="hidden sm:flex items-center justify-center gap-2 sm:gap-3 mt-3 sm:mt-4 mb-3 sm:mb-5">
                <button 
                  onClick={handleEnquireClick}
                  className="border rounded-md text-white px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-[#EE2529] to-[#C73834] text-xs sm:text-sm hover:opacity-90 transition-opacity hover:scale-105"
                >
                  Enquire
                </button>
              </div>
            </div>

            {/* Assistance Card */}
            <div className="bg-white rounded-lg overflow-hidden p-3 sm:p-4 md:p-5 hidden lg:block ">
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
            <div className="mb-4 sm:mb-6">
              <div className="flex items-center justify-between shadow-lg rounded-lg mb-4 sm:mb-6 md:mb-8 border-b border-gray-200 pb-2 overflow-x-auto">
                <div className="flex w-full justify-between space-x-0 sm:space-x-2 md:space-x-4 mb-0.5">
                  {/* Property Details Tab */}
                  <div
                    className={`text-center flex flex-col items-center cursor-pointer group relative pb-1 flex-1 ${
                      activeTab === "property"
                        ? "text-[#EE2529]"
                        : "text-[#767676]"
                    }`}
                    onClick={() => handleTabClick("property")}
                  >
                    <PiBuildingApartmentFill
                      className={`w-5 h-5 sm:w-6 sm:h-6 mb-0.5 sm:mb-1 ${
                        activeTab === "property"
                          ? "text-[#EE2529]"
                          : "text-[#767676] group-hover:text-[#EE2529]"
                      }`}
                    />
                    <p className="text-xs sm:text-sm font-bold">
                      Property Details
                    </p>
                    {activeTab === "property" && (
                      <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-[#EE2529]"></div>
                    )}
                  </div>

                  {/* Lease Details Tab */}
                  <div
                    className={`text-center flex flex-col items-center cursor-pointer group relative pb-1 flex-1 ${
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
                    <p className="text-xs sm:text-sm font-bold">Lease Details</p>
                    {activeTab === "lease" && (
                      <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-[#EE2529]"></div>
                    )}
                  </div>

                  {/* Analytics Tab */}
                  <div
                    className={`text-center flex flex-col items-center cursor-pointer group relative pb-1 flex-1 ${
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
                    <p className="text-xs sm:text-sm font-bold">Analytics</p>
                    {activeTab === "analytics" && (
                      <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-[#EE2529]"></div>
                    )}
                  </div>

                  {/* Location Details Tab */}
                  <div
                    className={`text-center flex flex-col items-center cursor-pointer group relative pb-1 flex-1 ${
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
                    <p className="text-xs sm:text-sm font-bold">Location Details</p>
                    {activeTab === "location" && (
                      <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-[#EE2529]"></div>
                    )}
                  </div>

                  {/* FAQs Tab */}
                  <div
                    className={`text-center flex flex-col items-center cursor-pointer group relative pb-1 flex-1 ${
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
                    <p className="text-xs sm:text-sm font-bold">FAQs</p>
                    {activeTab === "faqs" && (
                      <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-[#EE2529]"></div>
                    )}
                  </div>
                </div>
              </div>

              {/* Download and Share buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-between mb-3 gap-3">
                <div className="flex items-center gap-2 sm:gap-3 order-2 sm:order-1">
                  <div className="bg-[#FFF3CA] py-1 px-2 sm:px-3 rounded-3xl text-xs sm:text-sm text-[#767676] ">
                    Premium Location
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 order-1 sm:order-2 w-full sm:w-auto justify-center sm:justify-end hidden lg:flex">
                  <button className="flex items-center gap-1 sm:gap-2 border border-[#767676] text-[#767676] rounded-md px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm hover:bg-gray-50 transition-colors">
                    <img src={download} alt="" />
                    <span className="hidden xs:inline">Download Report</span>
                    <span className="xs:hidden">Download</span>
                  </button>
                  <button className="flex items-center gap-1 sm:gap-2 border border-[#767676] text-[#767676] rounded-md px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm hover:bg-gray-50 transition-colors">
                  <img src={share} alt="" />
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
                  <p className="text-[#767676] text-xs md:text-sm lg:text-base">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse varius enim in eros elementum tristique. Duis
                    cursus, mi quis viverra ornare, eros dolor interdum nulla,
                    ut commodo diam libero vitae erat.
                  </p>
                </>
              )}

              {activeTab === "analytics" && (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#EE2529]">
                    Property Investment ROI Analytics
                  </h3>
                </div>
              )}

              {activeTab === "lease" && (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#EE2529]">
                    Lease & Tenant Details
                  </h3>
                </div>
              )}

              {activeTab === "location" && (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#EE2529]">
                    Location & Market Overview
                  </h3>
                </div>
              )}

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

            {activeTab === "lease" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <LeaseDetails />
              </div>
            )}

            {activeTab === "analytics" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <Analytics />
              </div>
            )}

            {activeTab === "location" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <LocationDetails />
              </div>
            )}

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