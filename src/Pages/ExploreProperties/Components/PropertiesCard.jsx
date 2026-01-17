import React, { useState, useEffect, useRef } from "react";
import { CiHeart, CiLocationOn } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";
import { RiShareForwardLine } from "react-icons/ri";
import circle from "../../../assets/PropertyCard/rounded.png";
import { useNavigate } from "react-router-dom";
import tag from "../../../assets/FeaturedProperties/tag.png";

const PropertiesCard = () => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState({});
  const [selectedProperties, setSelectedProperties] = useState([]);
  const [isHovered, setIsHovered] = useState({});
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const intervalRefs = useRef({});
  
  // Generate 12 property cards data with Unsplash images
  const propertyCards = Array.from({ length: 12 }, (_, index) => ({
    id: index + 1,
    title: index % 3 === 0 ? "Residential Space" : index % 3 === 1 ? "Commercial Space" : "Industrial Space",
    location: ["Pune, Mundhva", "Mumbai, Bandra", "Delhi, Noida", "Bangalore, Koramangala", 
               "Hyderabad, Hitech City", "Chennai, OMR", "Kolkata, Salt Lake", "Ahmedabad, SG Highway",
               "Jaipur, Malviya Nagar", "Lucknow, Gomti Nagar", "Chandigarh, Sector 17", "Bhopal, MP Nagar"][index],
    clientType: "MNC Client",
    cost: `₹${(25 + index * 1.5).toFixed(1)} Crore`,
    annualRent: `₹${(15 + index * 0.8).toFixed(2)} Lakhs`,
    tenureLeft: `${7 + (index % 5)} Yrs`,
    roi: `${85 + (index % 15)}.${index % 10}${index % 10}%`,
    isVerified: index % 2 === 0,
    images: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&h=400&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&h=400&fit=crop",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500&h=400&fit=crop",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500&h=400&fit=crop"
    ],
  }));

  // Initialize currentImageIndex for all properties
  useEffect(() => {
    const initialState = {};
    propertyCards.forEach(property => {
      initialState[property.id] = 0;
    });
    setCurrentImageIndex(initialState);
  }, []);

  // Start auto-sliding for all cards when currentImageIndex is initialized
  useEffect(() => {
    // Only start intervals if currentImageIndex has been initialized
    if (Object.keys(currentImageIndex).length > 0) {
      propertyCards.forEach(property => {
        startAutoSlide(property.id);
      });
    }

    // Cleanup intervals on component unmount
    return () => {
      Object.values(intervalRefs.current).forEach(clearInterval);
    };
  }, [currentImageIndex]); // Run this effect when currentImageIndex changes

  const startAutoSlide = (propertyId) => {
    // Clear any existing interval for this property
    if (intervalRefs.current[propertyId]) {
      clearInterval(intervalRefs.current[propertyId]);
    }

    // Start new interval
    intervalRefs.current[propertyId] = setInterval(() => {
      if (!isHovered[propertyId]) {
        setCurrentImageIndex(prev => {
          const currentIndex = prev[propertyId] || 0;
          const property = propertyCards.find(p => p.id === propertyId);
          if (!property) return prev;
          
          const nextIndex = (currentIndex + 1) % property.images.length;
          return {
            ...prev,
            [propertyId]: nextIndex
          };
        });
      }
    }, 3000); // Change image every 3 seconds
  };

  const handleDotClick = (propertyId, index) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [propertyId]: index
    }));
    
    // Restart auto-slide after manual dot click
    startAutoSlide(propertyId);
  };

  // Mouse drag handlers
  const handleMouseDown = (propertyId, e) => {
    setTouchStart(e.clientX);
  };

  const handleMouseMove = (propertyId, e) => {
    if (touchStart === null) return;
    setTouchEnd(e.clientX);
  };

  const handleMouseUp = (propertyId) => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isLeftSwipe) {
      // Swipe left - next image
      setCurrentImageIndex(prev => {
        const property = propertyCards.find(p => p.id === propertyId);
        if (!property) return prev;
        return {
          ...prev,
          [propertyId]: (prev[propertyId] + 1) % property.images.length
        };
      });
    }
    
    if (isRightSwipe) {
      // Swipe right - previous image
      const property = propertyCards.find(p => p.id === propertyId);
      const newIndex = prev => prev[propertyId] === 0 ? property.images.length - 1 : prev[propertyId] - 1;
      setCurrentImageIndex(prev => ({
        ...prev,
        [propertyId]: newIndex(prev)
      }));
    }
    
    // Reset touch values
    setTouchStart(null);
    setTouchEnd(null);
    
    // Restart auto-slide after swipe
    startAutoSlide(propertyId);
  };

  // Touch handlers for mobile
  const handleTouchStart = (propertyId, e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (propertyId, e) => {
    if (touchStart === null) return;
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = (propertyId) => {
    handleMouseUp(propertyId);
  };

  const handleMouseEnter = (propertyId) => {
    setIsHovered(prev => ({
      ...prev,
      [propertyId]: true
    }));
    
    // Pause auto-slide on hover
    if (intervalRefs.current[propertyId]) {
      clearInterval(intervalRefs.current[propertyId]);
    }
  };

  const handleMouseLeave = (propertyId) => {
    setIsHovered(prev => ({
      ...prev,
      [propertyId]: false
    }));
    
    // Resume auto-slide when mouse leaves
    startAutoSlide(propertyId);
  };

  // Handle view button click
  const handleViewClick = (propertyId) => {
    navigate(`/propertyDetails/${propertyId}`);
  };

  // Handle enquire button click
  const handleEnquireClick = (propertyId) => {
    navigate(`/enquiry/${propertyId}`);
  };

  // Handle contact expert button click
  const handleContactExpert = () => {
    navigate('/explore-brokers');
  };

  // Handle back button
  const handleBack = () => {
    navigate(-1);
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
    <div className="min-h-screen bg-[#F9F9F9] pt-6 pb-10">
      <div className=" mx-auto font-montserrat max-w-[95%] ">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-base md:text-lg text-[#262626]">
            <span className="text-[#EE2529]">Properties</span> found based on your above search criteria.
          </h2>
          
          {/* Compare Selected Button */}
          {selectedProperties.length > 0 && (
            <button 
              onClick={navigateToComparison}
              className="bg-gradient-to-r from-[#EE2529] to-[#C73834] text-white px-4 py-2 text-sm hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              <FaPlus /> Compare Selected ({selectedProperties.length})
            </button>
          )}
        </div>
        
        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mb-8">
          {propertyCards.map((property, index) => {
            // Check if this property is selected for comparison
            const isSelected = selectedProperties.some(p => p.id === property.id);
            
            // Show special card at 8th position (index 7 in 0-based array)
            if (index === 7) {
              return (
                <div key="special-card" className="bg-[#FFFFFF] rounded-2xl shadow-lg overflow-hidden p-6 flex flex-col items-start h-full min-h-[400px]">
                  <img src={circle} alt="Assistance" className="w-24 h-24 mb-4" />
                  <p className="text-sm md:text-base lg:text-xl text-gray-700 mb-2">Need assistance with your Investment ?</p>
                  <p className="text-xl md:text-2xl lg:text-3xl  text-[#262626] mb-6">
                    Get in touch with our expert to find a customized solution for preleased property for you
                  </p>
                  <button 
                    onClick={handleContactExpert}
                    className="border rounded-md text-white px-6 py-2.5 bg-gradient-to-r from-[#EE2529] to-[#C73834] text-sm hover:opacity-90 transition-opacity hover:scale-105 font-bold"
                  >
                    Contact our Expert
                  </button>
                </div>
              );
            }

            return (
              <div 
                key={property.id} 
                className={`bg-white rounded-2xl shadow-lg overflow-hidden relative ${isSelected ? 'ring-2 ring-[#EE2529] ring-offset-2' : ''}`}
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
                      <div className="relative ">
                        <div className="relative">
                          <img className="w-16 sm:w-18 md:w-20" src={tag} alt="Verified" />
                          <p className="absolute bottom-0 md:bottom-1 right-2 text-white text-xs md:text-xs">Verified</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Property Image Section with swipe functionality */}
                <div className="relative">
                  <div 
                    className="relative overflow-hidden cursor-grab active:cursor-grabbing"
                    onMouseEnter={() => handleMouseEnter(property.id)}
                    onMouseLeave={() => handleMouseLeave(property.id)}
                    onMouseDown={(e) => handleMouseDown(property.id, e)}
                    onMouseMove={(e) => handleMouseMove(property.id, e)}
                    onMouseUp={() => handleMouseUp(property.id)}
                    onTouchStart={(e) => handleTouchStart(property.id, e)}
                    onTouchMove={(e) => handleTouchMove(property.id, e)}
                    onTouchEnd={() => handleTouchEnd(property.id)}
                  >
                    <img 
                      className="w-full h-72 md:h-60 lg:h-72 object-cover transition-transform duration-300 ease-in-out" 
                      src={property.images[currentImageIndex[property.id] || 0]} 
                      alt={property.title}
                    />
                    {/* Gradient overlay for bottom blur */}
                    <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-white/80 to-transparent backdrop-blur-[2px] border-t border-white "></div>
                    
                    {/* Slider Dots with auto-slide indicator */}
                    <div 
                      className="absolute bottom-[72px] md:bottom-20 left-1/2 transform -translate-x-1/2 flex items-center gap-1.5 "
                    >
                      {property.images.map((_, dotIndex) => (
                        <button
                          key={dotIndex}
                          onClick={() => handleDotClick(property.id, dotIndex)}
                          className={`rounded-full transition-all duration-300 cursor-pointer relative ${
                            currentImageIndex[property.id] === dotIndex
                              ? "bg-red-500 w-3 h-3"
                              : "bg-white w-2 h-2 hover:bg-white/80"
                          }`}
                          aria-label={`Go to image ${dotIndex + 1}`}
                        >
                          {currentImageIndex[property.id] === dotIndex && (
                            <div className="absolute inset-0 bg-red-500 rounded-full animate-pulse"></div>
                          )}
                        </button>
                      ))}
                    </div>
                    
                    {/* Action Buttons on Image */}
                    <div className="absolute bottom-3 left-0 right-0 flex items-center justify-between px-3 sm:px-4">
                      <p className="bg-[#FFF3CA] py-1 px-2 sm:px-3 rounded-3xl text-xs sm:text-sm text-[#767676]">
                        {property.clientType}
                      </p>
                      <button 
                        onClick={() => handleCompareClick(property.id, property.title)}
                        className={`flex items-center gap-1 sm:gap-2 border rounded-md px-2 sm:px-3 py-1 sm:py-1.5 md:px-4 md:py-2 text-xs sm:text-sm transition-colors font-semibold ${
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
                <div className="flex items-center justify-center gap-2 sm:gap-3 mt-4 mb-3">
                  <button 
                    onClick={() => handleViewClick(property.id)}
                    className="border border-[#767676] text-[#767676] rounded-md px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm hover:bg-gray-50 transition-colors hover:scale-105 font-semibold"
                  >
                    View
                  </button>
                  <button 
                    onClick={() => handleEnquireClick(property.id)}
                    className="border rounded-md text-white px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-[#EE2529] to-[#C73834] text-xs sm:text-sm hover:opacity-90 transition-opacity hover:scale-105 font-semibold"
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
    </div>
  );
};

export default PropertiesCard;