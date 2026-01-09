import React, { useState, useEffect } from "react";
import { CiHeart, CiLocationOn } from "react-icons/ci";
import cardImg from "../../../assets/FeaturedProperties/cardImg.png";
import { RiShareForwardLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const PropertyCards = () => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState({});
  
  // Comparison property data based on the image
  const comparisonProperties = [
    {
      id: 1,
      title: "Residential Space",
      location: "Pune, Mundhva",
      clientType: "MNC Client",
      cost: "₹36.8 Crore",
      annualRent: "₹22.87 Lakhs",
      tenureLeft: "10 Yrs",
      roi: "90.21%",
      images: [cardImg, cardImg, cardImg, cardImg],
      propertyType: "Residency"
    },
    {
      id: 2,
      title: "Bank Space",
      location: "Gurgaon",
      clientType: "MNC Client",
      cost: "₹36.8 Crore",
      annualRent: "₹22.87 Lakhs",
      tenureLeft: "10 Yrs",
      roi: "90.21%",
      images: [cardImg, cardImg, cardImg, cardImg],
      propertyType: "Banking"
    },
    {
      id: 3,
      title: "Retail Space",
      location: "Bangalore",
      clientType: "MNC Client",
      cost: "₹36.8 Crore",
      annualRent: "₹22.87 Lakhs",
      tenureLeft: "10 Yrs",
      roi: "90.21%",
      images: [cardImg, cardImg, cardImg, cardImg],
      propertyType: "Retail Chain"
    }
  ];

  // Initialize currentImageIndex for all properties
  useEffect(() => {
    const initialState = {};
    comparisonProperties.forEach(property => {
      initialState[property.id] = 0;
    });
    setCurrentImageIndex(initialState);
  }, []);

  const handleDotClick = (propertyId, index) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [propertyId]: index
    }));
  };

  // Handle view button click
  const handleViewClick = (propertyId) => {
    navigate(`/propertyDetails/${propertyId}`);
  };

  // Handle enquire button click
  const handleEnquireClick = (propertyId) => {
    navigate(`/enquiry/${propertyId}`);
  };

  // Handle remove from comparison
  const handleRemoveClick = (propertyId) => {
    console.log(`Remove property ${propertyId} from comparison`);
  };

  return (
    <div className="font-montserrat">
      {/* Header - responsive */}
      <div className="grid grid-cols-2 lg:grid-cols-4  border-b-2 border-[#767676] pb-4">
        {/* 1 */}
        <div className="border-r-0 sm:border-r-2 lg:border-r-2 border-[#EDECEC] p-2 sm:p-3 lg:p-4 text-center">
          <p className="text-xs sm:text-sm font-semibold">Property Comparison</p>
          <p className="text-[#767676] text-[10px] sm:text-xs mt-1">Compare key metrics of properties</p>
        </div>
        {/* 2 */}
        <div className="border-r-0 sm:border-r-2 lg:border-r-2 border-[#EDECEC] p-2 sm:p-3 lg:p-4 text-center">
          <p className="text-xs sm:text-sm font-semibold">Residential Space</p>
          <p className="text-[#767676] text-[10px] sm:text-xs mt-1">Residency</p>
        </div>
        {/* 3 */}
        <div className="border-r-0 lg:border-r-2 border-[#EDECEC] p-2 sm:p-3 lg:p-4 text-center">
          <p className="text-xs sm:text-sm font-semibold">Bank Space Gurgaon</p>
          <p className="text-[#767676] text-[10px] sm:text-xs mt-1">Banking</p>
        </div>
        {/* 4 */}
        <div className="p-2 sm:p-3 lg:p-4 text-center">
          <p className="text-xs sm:text-sm font-semibold">Retail Hub Bangalore</p>
          <p className="text-[#767676] text-[10px] sm:text-xs mt-1">Retail Chain</p>
        </div>
      </div>
      
      <div className="flex items-center flex-col lg:flex-row justify-between">
        <h2 className="text-[#EE2529] mr-16 font-bold text-base sm:text-xl mt-6 lg:mt-0">Property</h2>
        
        {/* Property Cards Grid - Exactly like PropertiesCard */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-8">
          {comparisonProperties.map((property) => (
            <div 
              key={property.id} 
              className="bg-white rounded-lg overflow-hidden relative shadow-sm"
            >
              {/* Property Title and Location */}
              <div className="">
                <p className="text-sm sm:text-base md:text-lg font-medium pl-3 sm:pl-4 mt-4 sm:mt-5">{property.title}</p>
                <div className="flex items-center justify-between mt-1 mb-2">
                  <p className="flex items-center gap-1 text-xs sm:text-sm md:text-base text-gray-700 pl-3 sm:pl-4">
                    <CiLocationOn className="text-[#EE2529] flex-shrink-0" />
                    {property.location}
                  </p>
                  {/* Cross symbol instead of verified */}
                  <button 
                    onClick={() => handleRemoveClick(property.id)}
                    className="mr-3 sm:mr-4 text-gray-500 hover:text-red-500 text-lg sm:text-xl font-bold"
                  >
                    ×
                  </button>
                </div>
              </div>

              {/* Property Image Section */}
              <div className="relative">
                <div className="relative">
                  <img 
                    className="w-full h-40 sm:h-48 md:h-56 object-cover" 
                    src={property.images[currentImageIndex[property.id] || 0]} 
                    alt={property.title}
                  />
                  {/* Gradient overlay for bottom blur */}
                  <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-white/80 to-transparent backdrop-blur-[2px] border-t border-white rounded-b-lg"></div>
                  
                  {/* Slider Dots */}
                  <div 
                    className="absolute bottom-10 sm:bottom-12 md:bottom-14 left-1/2 transform -translate-x-1/2 flex items-center gap-1.5"
                  >
                    {property.images.map((_, dotIndex) => (
                      <button
                        key={dotIndex}
                        onClick={() => handleDotClick(property.id, dotIndex)}
                        className={`h-2 sm:h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                          currentImageIndex[property.id] === dotIndex
                            ? "bg-red-500 w-2 sm:w-2.5"
                            : "bg-white/60 w-2 sm:w-2.5 hover:bg-white/80"
                        }`}
                        aria-label={`Go to image ${dotIndex + 1}`}
                      />
                    ))}
                  </div>
                  
                  {/* Client Type Badge */}
                  <div className="absolute bottom-2 sm:bottom-3 left-0 px-3 sm:px-4">
                    <p className="bg-[#FFF3CA] py-1 px-2 sm:px-3 rounded-3xl text-xs text-[#767676]">
                      {property.clientType}
                    </p>
                  </div>
                  
                  {/* Share and Like Icons */}
                  <div className="absolute top-2 sm:top-3 right-2 sm:right-3 flex flex-col gap-2">
                    <RiShareForwardLine className="bg-[#2626268A] rounded-full p-1 text-white h-5 w-5 sm:h-6 sm:w-6 cursor-pointer hover:scale-110 transition-transform" />
                    <CiHeart className="bg-[#2626268A] rounded-full p-1 text-white h-5 w-5 sm:h-6 sm:w-6 cursor-pointer hover:scale-110 transition-transform" />
                  </div>
                </div>
              </div>

              {/* Property Details */}
              <div className="flex items-center justify-around mt-3 sm:mt-4 p-2">
                <div className="space-y-1 sm:space-y-2">
                  <p className="text-xs sm:text-sm text-[#767676]">
                    Cost: <span className="font-semibold text-[#262626]">{property.cost}</span>
                  </p>
                  <p className="text-xs sm:text-sm text-[#767676]">
                    Annual Rent: <span className="font-semibold text-[#262626]">{property.annualRent}</span>
                  </p>
                  <p className="text-xs sm:text-sm text-[#767676]">
                    Tenure Left: <span className="font-semibold text-[#262626]">{property.tenureLeft}</span>
                  </p>
                </div>
                <div className="bg-gradient-to-r from-[#F2F2F2] to-[#FFFFFF] w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 flex flex-col items-center justify-center rounded-lg shadow-lg ml-1 sm:ml-2">
                  <p className="text-xs sm:text-sm font-medium">ROI</p>
                  <p className="text-[#EE2529] font-bold text-sm sm:text-base md:text-lg">{property.roi}</p>
                </div>
              </div>

              {/* Action Buttons - EXACTLY as original */}
              <div className="flex items-center justify-center gap-2 sm:gap-3 mt-3 sm:mt-4 mb-3 sm:mb-4 px-3 sm:px-4">
                <button 
                  onClick={() => handleViewClick(property.id)}
                  className="flex-1 border border-[#767676] text-[#767676] rounded-md px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm hover:bg-gray-50 transition-colors text-center"
                >
                  View
                </button>
                <button 
                  onClick={() => handleEnquireClick(property.id)}
                  className="flex-1 border rounded-md text-white px-2 sm:px-3 py-1.5 sm:py-2 bg-gradient-to-r from-[#EE2529] to-[#C73834] text-xs sm:text-sm hover:opacity-90 transition-opacity text-center"
                >
                  Enquire
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyCards;