import React, { useEffect, useState, useRef } from "react";
import { CiHeart, CiLocationOn } from "react-icons/ci";
import { FaPlus, FaTimes } from "react-icons/fa";
import { RiShareForwardLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import tag from "../../assets/FeaturedProperties/tag.png";
import modalImg from "../../assets/ExploreProperties/modal.jpg";
import cross from "../../assets/ExploreProperties/cross-circle.png";
import warning from "../../assets/ExploreProperties/warning.png";

const FeaturedProperties = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState({});
  const [selectedProperties, setSelectedProperties] = useState([]);
  const [isHovered, setIsHovered] = useState({});
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const intervalRefs = useRef({});
  const navigate = useNavigate();

  const propertyCards = [
    {
      id: 1,
      title: "Residential Space",
      location: "Pune, Mundhva",
      clientType: "MNC Client",
      cost: "₹36.8 Crore",
      annualRent: "₹22.87 Lakhs",
      tenureLeft: "10 Yrs",
      roi: "90.21%",
      isVerified: true,
      images: [
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&h=400&fit=crop",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&h=400&fit=crop",
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500&h=400&fit=crop",
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500&h=400&fit=crop"
      ],
    },
    {
      id: 2,
      title: "Commercial Space",
      location: "Mumbai, Bandra",
      clientType: "MNC Client",
      cost: "₹42.5 Crore",
      annualRent: "₹28.50 Lakhs",
      tenureLeft: "8 Yrs",
      roi: "90.21%",
      isVerified: false,
      images: [
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&h=400&fit=crop",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&h=400&fit=crop",
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500&h=400&fit=crop",
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500&h=400&fit=crop"
      ],
    },
    {
      id: 3,
      title: "Industrial Space",
      location: "Delhi, Noida",
      clientType: "MNC Client",
      cost: "₹28.3 Crore",
      annualRent: "₹18.90 Lakhs",
      tenureLeft: "12 Yrs",
      roi: "90.21%",
      isVerified: true,
      images: [
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&h=400&fit=crop",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&h=400&fit=crop",
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500&h=400&fit=crop",
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500&h=400&fit=crop"
      ],
    },
    {
      id: 4,
      title: "Residential Space",
      location: "Bangalore, Koramangala",
      clientType: "MNC Client",
      cost: "₹31.2 Crore",
      annualRent: "₹20.15 Lakhs",
      tenureLeft: "9 Yrs",
      roi: "90.21%",
      isVerified: false,
      images: [
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&h=400&fit=crop",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&h=400&fit=crop",
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500&h=400&fit=crop",
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500&h=400&fit=crop"
      ],
    },
    {
      id: 5,
      title: "Commercial Space",
      location: "Hyderabad, Hitech City",
      clientType: "MNC Client",
      cost: "₹39.7 Crore",
      annualRent: "₹25.80 Lakhs",
      tenureLeft: "11 Yrs",
      roi: "90.21%",
      isVerified: true,
      images: [
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&h=400&fit=crop",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&h=400&fit=crop",
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500&h=400&fit=crop",
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500&h=400&fit=crop"
      ],
    },
    {
      id: 6,
      title: "Industrial Space",
      location: "Chennai, OMR",
      clientType: "MNC Client",
      cost: "₹25.9 Crore",
      annualRent: "₹16.45 Lakhs",
      tenureLeft: "7 Yrs",
      roi: "90.21%",
      isVerified: false,
      images: [
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&h=400&fit=crop",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&h=400&fit=crop",
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500&h=400&fit=crop",
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500&h=400&fit=crop"
      ],
    },
  ];

  // Initialize currentImageIndex for all cards
  useEffect(() => {
    const initialState = {};
    propertyCards.forEach(property => {
      initialState[property.id] = 0;
    });
    setCurrentImageIndex(initialState);
  }, []);

  // Start auto-sliding for all cards when currentImageIndex is initialized
  useEffect(() => {
    if (Object.keys(currentImageIndex).length > 0) {
      propertyCards.forEach(property => {
        startAutoSlide(property.id);
      });
    }

    return () => {
      Object.values(intervalRefs.current).forEach(clearInterval);
    };
  }, [currentImageIndex]);

  const startAutoSlide = (propertyId) => {
    if (intervalRefs.current[propertyId]) {
      clearInterval(intervalRefs.current[propertyId]);
    }

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
    }, 3000);
  };

  const handleDotClick = (propertyId, index) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [propertyId]: index
    }));
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
      const property = propertyCards.find(p => p.id === propertyId);
      const newIndex = prev => prev[propertyId] === 0 ? property.images.length - 1 : prev[propertyId] - 1;
      setCurrentImageIndex(prev => ({
        ...prev,
        [propertyId]: newIndex(prev)
      }));
    }
    
    setTouchStart(null);
    setTouchEnd(null);
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
    
    if (intervalRefs.current[propertyId]) {
      clearInterval(intervalRefs.current[propertyId]);
    }
  };

  const handleMouseLeave = (propertyId) => {
    setIsHovered(prev => ({
      ...prev,
      [propertyId]: false
    }));
    
    startAutoSlide(propertyId);
  };

  // Handle compare button click
  const handleCompareClick = (propertyId, propertyTitle) => {
    setSelectedProperties(prev => {
      const isAlreadySelected = prev.some(p => p.id === propertyId);
      
      if (isAlreadySelected) {
        return prev.filter(p => p.id !== propertyId);
      } else {
        if (prev.length < 3) {
          return [...prev, { 
            id: propertyId, 
            title: propertyTitle,
            location: propertyCards.find(p => p.id === propertyId)?.location || "Pune, Mundhva"
          }];
        } else {
          alert("You can compare up to 3 properties at a time.");
          return prev;
        }
      }
    });
  };

  // Remove property from comparison
  const removePropertyFromCompare = (propertyId) => {
    setSelectedProperties(prev => prev.filter(p => p.id !== propertyId));
  };

  // Navigate to comparison page
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

  const handleExploreProperties = () => {
    navigate('/explore-properties');
  };

  return (
    <div className="bg-[#F2F2F2] py-6 md:py-8 font-montserrat">
      {/* Sticky Compare Banner - Same as PropertiesCard */}
      {selectedProperties.length > 0 && (
        <div className="sticky top-0 z-40 bg-white shadow-lg border-b border-gray-200">
          <div className="mx-auto font-montserrat max-w-[90%]">
            {/* Banner Header */}
            <div className="flex justify-between items-center py-3">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold text-[#EE2529]">
                  Compare Properties
                </h2>
                <span className="text-gray-700 font-bold text-base">|</span>
                <span className="text-sm text-[#262626]"> 
                  {selectedProperties.length} of 3 properties added
                </span>
                {/* Show warning message only when exactly 1 property is selected */}
                {selectedProperties.length === 1 && (
                  <span className="bg-[#FFE0E080] rounded-3xl py-1 px-2 flex items-center gap-1 text-sm">
                    <img src={warning} alt="warning" className="w-2 h-2" />
                    Add 2 properties to compare
                  </span>
                )}
              </div>
              <button 
                onClick={() => setSelectedProperties([])}
                className="text-gray-500 hover:text-gray-700 flex items-center"
              >
                <img src={cross} alt="Clear all" className="w-3 h-3" />
              </button>
            </div>

            {/* Selected Properties Grid - Cards and Compare Button in same row */}
            <div className="py-3">
              <div className="flex items-center gap-6">
                {/* Selected Property Cards */}
                {selectedProperties.map((property) => (
                  <div 
                    key={property.id}
                    className="flex items-center justify-between p-2 bg-white rounded-xl px-3 shadow-md flex-1 min-h-[70px] relative"
                  >
                    <div className="flex items-center gap-3 w-full">
                      <div className="w-20 h-12 overflow-hidden flex-shrink-0">
                        <img src={modalImg} alt={property.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="min-w-0 space-y-1 flex-1">
                        <p className="font-normal text-lg text-[#262626] truncate">{property.title}</p>
                        <p className="text-sm text-[#262626] truncate flex items-center">
                          <CiLocationOn className="text-[#EE2529]"/>
                          {property.location}
                        </p>
                      </div>
                    </div>
                    {/* Cross button for individual card */}
                    <button 
                      onClick={() => removePropertyFromCompare(property.id)}
                      className="absolute top-1 right-2 bg-slate-600 rounded-full p-1 hover:shadow-lg"
                    >
                      <FaTimes className="text-gray-400 hover:text-[#EE2529] w-2 h-2" />
                    </button>
                  </div>
                ))}
                
                {/* Empty Box with dashed border */}
                {selectedProperties.length < 3 && (
                  <div className="flex-1 border-2 border-dashed border-gray-300 rounded-lg min-h-[70px]"></div>
                )}
                
                {/* Compare Button - Positioned in the same row */}
                <div className="flex-shrink-0">
                  <button 
                    onClick={navigateToComparison}
                    disabled={selectedProperties.length < 2}
                    className={`px-6 py-3 rounded text-white text-sm font-semibold whitespace-nowrap ${
                      selectedProperties.length >= 2 
                        ? 'bg-gradient-to-r from-[#EE2529] to-[#C73834] hover:opacity-90 font-semibold' 
                        : 'bg-gray-400 cursor-not-allowed font-semibold'
                    }`}
                  >
                    Compare ({selectedProperties.length})
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-[95%] mx-auto px-1 md:px-0 mt-4">
        <h2 className="text-center text-2xl md:text-3xl lg:text-4xl text-[#262626]">
          Featured Properties
        </h2>
        
        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3 mt-6 sm:mt-8 md:mt-10 mb-6 sm:mb-8 md:mb-10 font-montserrat px-8">
          {propertyCards.map((property, index) => {
            const isSelected = selectedProperties.some(p => p.id === property.id);
            
            return (
              <div 
                key={property.id} 
                className={`bg-white rounded-2xl overflow-hidden shadow-2xl ${isSelected ? 'ring-2 ring-[#EE2529] ring-offset-2' : ''}`}
              >
                {/* Property Title and Location */}
                <div className="">
                  <p className="text-sm sm:text-base md:text-lg lg:text-2xl font-normal pl-3 sm:pl-4 mt-5">{property.title}</p>
                  <div className="flex items-center justify-between mt-1 mb-2">
                    <p className="flex items-center gap-1 text-xs sm:text-sm md:text-base text-gray-700 pl-4">
                      <CiLocationOn className="text-[#EE2529] flex-shrink-0" />
                      {property.location}
                    </p>
                    {property.isVerified && (
                      <div className="relative">
                        <div className="relative">
                          <img className="w-20 md:w-24" src={tag} alt="Verified" />
                          <p className="absolute bottom-0 md:bottom-0 right-2 text-white text-sm md:text-base font-semibold">Verified</p>
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
                      className="w-full h-72 md:h-64 lg:h-72 object-cover" 
                      src={property.images[currentImageIndex[property.id] || 0]} 
                      alt={property.title}
                    />
                    
                    {/* Gradient overlay for bottom blur */}
                    <div className="absolute -bottom-4 left-0 right-0 h-1/4 bg-gradient-to-t from-white/80 to-transparent backdrop-blur-[2px] border-t border-white rounded-b-lg"></div>
                    
                    {/* Slider Dots with auto-slide indicator */}
                    <div className="absolute bottom-[72px] md:bottom-16 left-1/2 transform -translate-x-1/2 flex items-center gap-1.5">
                      {property.images.map((_, dotIndex) => (
                        <button
                          key={dotIndex}
                          onClick={() => handleDotClick(property.id, dotIndex)}
                          className={`rounded-full transition-all duration-300 cursor-pointer ${
                            currentImageIndex[property.id] === dotIndex
                              ? "bg-red-500 w-3 h-3"
                              : "bg-white w-2 h-2 hover:bg-white/80"
                          }`}
                          aria-label={`Go to image ${dotIndex + 1}`}
                        >
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
                            : 'bg-white text-[#EE2529] hover:bg-gray-50'
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
                <div className="flex items-center justify-between px-4 mt-4">
                  <div className="space-y-1 sm:space-y-2">
                    <p className="text-sm md:text-base text-[#767676] font-normal">
                      Cost: <span className="font-semibold text-[#262626] text-lg">{property.cost}</span>
                    </p>
                    <p className="text-sm md:text-base font-normal text-[#767676]">
                      Annual Rent: <span className="font-semibold text-[#262626]  text-lg">{property.annualRent}</span>
                    </p>
                    <p className="text-sm md:text-base font-normal text-[#767676]">
                      Tenure Left: <span className="font-semibold text-[#262626]  text-lg">{property.tenureLeft}</span>
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-[#F2F2F2] to-[#FFFFFF] w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 flex flex-col items-center justify-center rounded-lg shadow-lg ml-2">
                    <p className="text-lg md:text-xl font-semibold">ROI</p>
                    <p className="text-[#EE2529] font-bold text-sm sm:text-base md:text-lg">{property.roi}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-center gap-2 sm:gap-3 mt-4 mb-4 sm:mt-5 sm:mb-5 sm:px-4">
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
        
        {/* Explore Properties Button */}
        <div className="flex justify-center mx-auto">
          <button 
            onClick={handleExploreProperties}
            className="border rounded-md text-white px-3 sm:px-4 py-1.5 sm:py-3 bg-gradient-to-r from-[#EE2529] to-[#C73834] text-sm md:text-base hover:opacity-90 transition-opacity hover:scale-105 font-semibold"
          >
            Explore Properties
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProperties;