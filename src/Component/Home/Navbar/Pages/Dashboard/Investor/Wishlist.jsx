import React, { useState, useEffect } from 'react';
import { CiHeart, CiLocationOn } from 'react-icons/ci';
import { FaChevronDown, FaPlus } from 'react-icons/fa';
import { RiShareForwardLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import cardImg from "../../../../../../assets/FeaturedProperties/cardImg.png";
import boxes from "../../../../../../assets/Dashboard/boxes.png"

const Wishlist = () => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState({});
  const [selectedProperties, setSelectedProperties] = useState([]);
  
  // Wishlist data
  const wishlistData = [
    {
      id: 1,
      title: "Commercial Space",
      location: "Mumbai, Mundhva",
      clientType: "MNC Client",
      cost: "₹36.8 Crore",
      annualRent: "₹22.87 Lakhs",
      tenureLeft: "10 Yrs",
      roi: "90.21%",
      isVerified: true,
      images: [cardImg, cardImg, cardImg, cardImg],
    },
    {
      id: 2,
      title: "Commercial Space",
      location: "Mumbai, Mundhva",
      clientType: "MNC Client",
      cost: "₹36.8 Crore",
      annualRent: "₹22.87 Lakhs",
      tenureLeft: "10 Yrs",
      roi: "90.21%",
      isVerified: true,
      images: [cardImg, cardImg, cardImg, cardImg],
    },
    {
      id: 3,
      title: "Commercial Space",
      location: "Mumbai, Mundhva",
      clientType: "MNC Client",
      cost: "₹36.8 Crore",
      annualRent: "₹22.87 Lakhs",
      tenureLeft: "10 Yrs",
      roi: "90.21%",
      isVerified: true,
      images: [cardImg, cardImg, cardImg, cardImg],
    },
    
  ];

  // Initialize currentImageIndex for all properties
  useEffect(() => {
    const initialState = {};
    wishlistData.forEach(property => {
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

  const handleCompareClick = (propertyId, propertyTitle) => {
    setSelectedProperties(prev => {
      const isAlreadySelected = prev.some(p => p.id === propertyId);
      
      if (isAlreadySelected) {
        return prev.filter(p => p.id !== propertyId);
      } else {
        if (prev.length < 4) {
          return [...prev, { id: propertyId, title: propertyTitle }];
        } else {
          alert("You can compare up to 4 properties at a time.");
          return prev;
        }
      }
    });
  };

  const navigateToComparison = () => {
    if (selectedProperties.length < 2) {
      alert("Please select at least 2 properties to compare.");
      return;
    }
    
    const propertyIds = selectedProperties.map(p => p.id).join(',');
    navigate(`/compare/${propertyIds}`);
  };

  const handleViewClick = (propertyId) => {
    navigate(`/propertyDetails/${propertyId}`);
  };

  const handleEnquireClick = (propertyId) => {
    navigate(`/enquiry/${propertyId}`);
  };

  return (
    <div className="font-montserrat">
      {/* Title */}
       <div className="flex flex-col md:flex-row space-y-2 items-center justify-between mb-6">
             <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-[#EE2529]">Properties liked</h1>
             <div className="flex flex-col md:flex-row space-y-2 items-center  gap-1">
               <button className="flex items-center justify-between gap-2 px-3 py-2  w-[200px] text-sm border border-gray-300 rounded bg-[#F2F2F2] text-[#767676]">
                 Last 30 Days
                 <FaChevronDown size={10} />
               </button>
               <button className="flex items-center gap-2 border-r-2 pr-2 text-sm   hover:bg-gray-50">
                 Sort by: <span className='text-[#EE2529]'> Date</span>
                 <FaChevronDown className='text-[#EE2529]' size={10} />
               </button>
               <button className="  text-sm  hover:bg-gray-50 flex items-center gap-2">
                 Show as: <img className='h-3 w-3' src={boxes} alt="" />
                 <FaChevronDown className='text-[#EE2529]' size={10} />
               </button>
             </div>
           </div>
      
      {/* Compare Selected Button */}
      {selectedProperties.length > 0 && (
        <div className="mb-6">
          <button 
            onClick={navigateToComparison}
            className="bg-gradient-to-r from-[#EE2529] to-[#C73834] text-white px-4 py-2 rounded-md text-sm hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            <FaPlus /> Compare Selected ({selectedProperties.length})
          </button>
        </div>
      )}

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6 mb-8">
        {wishlistData.map((property) => {
          const isSelected = selectedProperties.some(p => p.id === property.id);
          
          return (
            <div 
              key={property.id} 
              className={`bg-white rounded-lg overflow-hidden relative ${isSelected ? 'ring-2 ring-[#EE2529] ring-offset-2' : ''}`}
            >
              {/* Property Title and Location */}
              <div className="">
                <p className="text-sm sm:text-base md:text-lg font-medium pl-3 sm:pl-4 mt-5">{property.title}</p>
                <div className="flex items-center justify-between mt-1 mb-2">
                  <p className="flex items-center gap-1 text-xs sm:text-sm md:text-base text-gray-700 pl-4">
                    <CiLocationOn className="text-[#EE2529] flex-shrink-0" />
                    {property.location}
                  </p>
                 
                </div>
              </div>

              {/* Property Image Section */}
              <div className="relative">
                <div className="relative">
                  <img 
                    className="w-full h-48 sm:h-52 md:h-56 lg:h-60 object-cover" 
                    src={property.images[currentImageIndex[property.id] || 0]} 
                    alt={property.title}
                  />
                  {/* Gradient overlay for bottom blur */}
                  <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-white/80 to-transparent backdrop-blur-[2px] border-t border-white rounded-b-lg"></div>
                  
                  {/* Slider Dots - Positioned above the blur */}
                  <div 
                    className="absolute bottom-12 md:bottom-16 left-1/2 transform -translate-x-1/2 flex items-center gap-1.5"
                  >
                    {property.images.map((_, dotIndex) => (
                      <button
                        key={dotIndex}
                        onClick={() => handleDotClick(property.id, dotIndex)}
                        className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                          currentImageIndex[property.id] === dotIndex
                            ? "bg-red-500 w-2.5"
                            : "bg-white/60 w-2.5 hover:bg-white/80"
                        }`}
                        aria-label={`Go to image ${dotIndex + 1}`}
                      />
                    ))}
                  </div>
                  
                  {/* Action Buttons on Image */}
                  <div className="absolute bottom-3 left-0 right-0 flex items-center justify-between px-3 sm:px-4">
                    <p className="bg-[#FFF3CA] py-1 px-2 sm:px-3 rounded-3xl text-xs sm:text-sm text-[#767676]">
                      {property.clientType}
                    </p>
                    <button 
                      onClick={() => handleCompareClick(property.id, property.title)}
                      className={`flex items-center gap-1 sm:gap-2 border rounded-md px-2 sm:px-3 py-1 sm:py-1.5 md:px-4 md:py-2 text-xs sm:text-sm transition-colors ${
                        isSelected 
                          ? 'bg-[#EE2529] text-white border-[#EE2529]' 
                          : 'bg-white text-[#EE2529] border-[#EE2529] hover:bg-gray-50'
                      }`}
                    >
                      <FaPlus className="text-xs sm:text-sm" /> 
                      {isSelected ? 'Remove' : 'Compare'}
                    </button>
                  </div>
                  
                  {/* Share and Like Icons */}
                  <div className="absolute top-3 right-3 sm:right-4 flex flex-col gap-2">
                    <RiShareForwardLine className="bg-[#2626268A] rounded-full p-1 text-white h-6 w-6 sm:h-7 sm:w-7 cursor-pointer hover:scale-110 transition-transform" />
                    <CiHeart className="bg-[#2626268A] rounded-full p-1 text-white h-6 w-6 sm:h-7 sm:w-7 cursor-pointer hover:scale-110 transition-transform bg-[#EE2529]" />
                  </div>
                </div>
              </div>

              {/* Property Details */}
              <div className="flex items-center justify-around mt-1 p-1">
                <div className="space-y-2">
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
                <div className="bg-gradient-to-r from-[#F2F2F2] to-[#FFFFFF] w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 flex flex-col items-center justify-center rounded-lg shadow-lg ml-2">
                  <p className="text-xs sm:text-sm font-medium">ROI</p>
                  <p className="text-[#EE2529] font-bold text-sm sm:text-base md:text-lg">{property.roi}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-center gap-2 sm:gap-3 mt-4 mb-3 px-4">
                <button 
                  onClick={() => handleViewClick(property.id)}
                  className="flex-1 border border-[#767676] text-[#767676] rounded-md px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm hover:bg-gray-50 transition-colors hover:scale-105"
                >
                  View
                </button>
                <button 
                  onClick={() => handleEnquireClick(property.id)}
                  className="flex-1 border rounded-md text-white px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-[#EE2529] to-[#C73834] text-xs sm:text-sm hover:opacity-90 transition-opacity hover:scale-105"
                >
                  Enquire
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Compare Selected Button at bottom */}
      {selectedProperties.length > 0 && (
        <div className="flex justify-center mb-6">
          <button 
            onClick={navigateToComparison}
            className="bg-gradient-to-r from-[#EE2529] to-[#C73834] text-white px-6 py-3 rounded-md text-sm hover:opacity-90 transition-opacity flex items-center gap-2 font-semibold"
          >
            <FaPlus /> Compare {selectedProperties.length} Selected Properties
          </button>
        </div>
      )}
    </div>
  );
};

export default Wishlist;