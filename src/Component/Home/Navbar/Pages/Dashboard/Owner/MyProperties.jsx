import React, { useState, useEffect } from 'react';
import { CiHeart, CiLocationOn } from 'react-icons/ci';
import { RiShareForwardLine } from 'react-icons/ri';
import { FaPlus, FaChevronDown } from 'react-icons/fa';
import tag from "../../../../../../assets/FeaturedProperties/tag.png";
import cardImg from "../../../../../../assets/FeaturedProperties/cardImg.png";
import { useNavigate } from "react-router-dom";
import boxes from "../../../../../../assets/Dashboard/boxes.png";

const MyProperties = () => {
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState('date');
  const [filterDays, setFilterDays] = useState('30');
  const [currentImageIndex, setCurrentImageIndex] = useState({});
  const [selectedProperties, setSelectedProperties] = useState([]);

  // Properties for the cards
  const propertyCards = [
    {
      id: 1,
      title: "Residential Space",
      location: "Pune, Mundhva",
      clientType: "MNC Client",
      cost: "₹6.8 Crore",
      annualRent: "₹27.7 Lakhs",
      tenureLeft: "10 Yrs",
      roi: "90.2%",
      isVerified: true,
      images: [cardImg, cardImg, cardImg, cardImg],
    },
    {
      id: 2,
      title: "Commercial Space",
      location: "Mumbai, Mundhra",
      clientType: "MNC Client",
      cost: "₹6.8 Crore",
      annualRent: "₹27.7 Lakhs",
      tenureLeft: "10 Yrs",
      roi: "90.2%",
      isVerified: false,
      images: [cardImg, cardImg, cardImg, cardImg],
    },
   
  ];

  // Initialize currentImageIndex for all properties
  useEffect(() => {
    const initialState = {};
    propertyCards.forEach(property => {
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

  // Handle add to listing button click
  const handleAddToListing = (propertyId) => {
    console.log(`Add property ${propertyId} to listing`);
    // Add your logic here
  };

  // Handle edit button click
  const handleEdit = (propertyId) => {
    console.log(`Edit property ${propertyId}`);
    // Add your logic here
  };

  // Handle compare button click
  const handleCompareClick = (propertyId, propertyTitle) => {
    setSelectedProperties(prev => {
      // Check if property is already selected
      const isAlreadySelected = prev.some(p => p.id === propertyId);
      
      if (isAlreadySelected) {
        // Remove from selection
        return prev.filter(p => p.id !== propertyId);
      } else {
        // Add to selection (limit to 4 properties for comparison)
        if (prev.length < 4) {
          return [...prev, { id: propertyId, title: propertyTitle }];
        } else {
          alert("You can compare up to 4 properties at a time.");
          return prev;
        }
      }
    });
  };

  // Navigate to comparison page with selected properties
  const navigateToComparison = () => {
    if (selectedProperties.length < 2) {
      alert("Please select at least 2 properties to compare.");
      return;
    }
    
    // Create a comma-separated string of property IDs
    const propertyIds = selectedProperties.map(p => p.id).join(',');
    navigate(`/compare/${propertyIds}`);
  };

  return (
    <div className="font-montserrat">
      {/* Compare Selected Button */}
      {selectedProperties.length > 0 && (
        <div className="mb-4">
          <button 
            onClick={navigateToComparison}
            className="bg-gradient-to-r from-[#EE2529] to-[#C73834] text-white px-4 py-2 rounded-md text-sm hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            <FaPlus /> Compare Selected ({selectedProperties.length})
          </button>
        </div>
      )}

      {/* Properties Owned Section */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row items-center justify-between mb-6 space-y-2">
          <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-[#EE2529]">Properties Owned</h1>
          <div className="flex flex-row items-center gap-1">
            <button className="flex items-center justify-between gap-2 px-3 py-1 text-nowrap w-150px lg:w-[200px] text-sm border border-gray-300 rounded bg-[#F2F2F2] text-[#767676]">
              Last 30 Days
              <FaChevronDown size={10} />
            </button>
            <button className="flex items-center gap-2 border-r-2 pr-1 text-nowrap text-sm hover:bg-gray-50">
              Sort by: <span className='text-[#EE2529]'> Date</span>
              <FaChevronDown className='text-[#EE2529]' size={10} />
            </button>
            <button className="text-sm hover:bg-gray-50 flex items-center text-nowrap gap-1 lg:gap-2">
              Show as: <img className='h-3 w-3' src={boxes} alt="" />
              <FaChevronDown className='text-[#EE2529]' size={10} />
            </button>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6 mb-8">
          {propertyCards.map((property, index) => {
            // Check if this property is selected for comparison
            const isSelected = selectedProperties.some(p => p.id === property.id);
            
            return (
              <div 
                key={property.id} 
                className={`bg-white shadow-md rounded-lg overflow-hidden relative ${isSelected ? 'ring-2 ring-[#EE2529] ring-offset-2' : ''}`}
              >
                {/* Property Title and Location */}
                <div className="">
                  <p className="text-sm sm:text-base md:text-lg font-medium pl-3 sm:pl-4 mt-5">{property.title}</p>
                  <div className="flex items-center justify-between mt-1 mb-2">
                    <p className="flex items-center gap-1 text-xs sm:text-sm md:text-base text-gray-700 pl-4">
                      <CiLocationOn className="text-[#EE2529] flex-shrink-0" />
                      {property.location}
                    </p>
                    {property.isVerified && (
                      <div className="relative">
                        <img className="w-16 sm:w-18 md:w-20" src={tag} alt="Verified" />
                        <p className="absolute bottom-0 md:bottom-1 right-2 text-white text-xs md:text-xs">Verified</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Property Image Section */}
                <div className="relative">
                  <div className="relative">
                    <img 
                      className="w-full h-72 md:h-60 lg:h-72 object-cover" 
                      src={property.images[currentImageIndex[property.id] || 0]} 
                      alt={property.title}
                    />
                    {/* Gradient overlay for bottom blur */}
                    <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-white/80 to-transparent backdrop-blur-[2px] border-t border-white "></div>
                    
                    {/* Slider Dots - Positioned above the blur */}
                    <div 
                      className="absolute bottom-[72px] md:bottom-20 left-1/2 transform -translate-x-1/2 flex items-center gap-1.5"
                    >
                      {property.images.map((_, dotIndex) => (
                        <button
                          key={dotIndex}
                          onClick={() => handleDotClick(property.id, dotIndex)}
                          className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                            currentImageIndex[property.id] === dotIndex
                              ? "bg-red-500 w-2.5"
                              : "bg-white w-2.5 hover:bg-white/80"
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
                            : 'bg-white text-[#EE2529]  hover:bg-gray-50'
                        }`}
                      >
                        <FaPlus className="text-xs sm:text-sm" /> 
                        {isSelected ? 'Remove' : 'Compare'}
                      </button>
                    </div>
                    
                    {/* Share and Like Icons */}
                    <div className="absolute top-3 right-3 sm:right-4 flex flex-col gap-2">
                      <RiShareForwardLine className="bg-[#2626268A] rounded-full p-1 text-white h-6 w-6 sm:h-7 sm:w-7 cursor-pointer hover:scale-110 transition-transform" />
                      <CiHeart className="bg-[#2626268A] rounded-full p-1 text-white h-6 w-6 sm:h-7 sm:w-7 cursor-pointer hover:scale-110 transition-transform" />
                    </div>
                  </div>
                </div>

                {/* Property Details */}
                <div className="flex items-center justify-around mt-1 p-1 ">
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
                  {/* First card gets 3 buttons */}
                  {property.id === 1 ? (
                    <>
                      <button 
                        onClick={() => handleViewClick(property.id)}
                        className="flex-1 border border-[#767676] text-[#767676] rounded-md px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm hover:bg-gray-50 transition-colors hover:scale-105"
                      >
                        View
                      </button>
                      <button 
                        onClick={() => handleAddToListing(property.id)}
                        className="flex-1 border rounded-md text-white px-2 sm:px-3 py-1.5 sm:py-2 bg-gradient-to-r from-[#EE2529] to-[#C73834] text-xs sm:text-sm hover:opacity-90 transition-opacity hover:scale-105 text-nowrap"
                      >
                        Add to Listing
                      </button>
                      <button 
                        onClick={() => handleEdit(property.id)}
                        className="flex-1 border rounded-md text-white px-2 sm:px-3 py-1.5 sm:py-2 bg-gradient-to-r from-[#EE2529] to-[#C73834] text-xs sm:text-sm hover:opacity-90 transition-opacity hover:scale-105"
                      >
                        Edit
                      </button>
                    </>
                  ) : (
                    // Other cards keep the original 2 buttons
                    <>
                      <button 
                        onClick={() => handleViewClick(property.id)}
                        className=" border border-[#767676] text-[#767676] rounded-md px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm hover:bg-gray-50 transition-colors hover:scale-105"
                      >
                        View
                      </button>
                      <button 
                        onClick={() => handleEnquireClick(property.id)}
                        className=" border rounded-md text-white px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-[#EE2529] to-[#C73834] text-xs sm:text-sm hover:opacity-90 transition-opacity hover:scale-105"
                      >
                        Enquire
                      </button>
                    </>
                  )}
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
    </div>
  );
};

export default MyProperties;