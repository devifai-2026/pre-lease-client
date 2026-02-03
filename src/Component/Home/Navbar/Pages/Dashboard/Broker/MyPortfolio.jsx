import React, { useState, useEffect, useRef } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CiHeart, CiLocationOn } from 'react-icons/ci';
import { RiShareForwardLine } from 'react-icons/ri';
import { FaPlus, FaChevronDown, FaTimes } from 'react-icons/fa';
import tag from "../../../../../../assets/FeaturedProperties/tag.png";
import cardImg from "../../../../../../assets/FeaturedProperties/cardImg.png";
import { useNavigate } from "react-router-dom";
import boxes from "../../../../../../assets/Dashboard/boxes.png"
import dateArrow from "../../../../../../assets/Dashboard/dateArrow.svg"
import show from "../../../../../../assets/Dashboard/show.svg"
import cross from "../../../../../../assets/ExploreProperties/cross-circle.png";
import warning from "../../../../../../assets/ExploreProperties/warning.png";
import modalImg from "../../../../../../assets/ExploreProperties/modal.jpg";

const MyPortfolio = () => {
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState('date');
  const [filterDays, setFilterDays] = useState('30');
  const [currentImageIndex, setCurrentImageIndex] = useState({});
  const [selectedProperties, setSelectedProperties] = useState([]);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  
  // State for view mode
  const [selectedView, setSelectedView] = useState('grid');
  const [showViewDropdown, setShowViewDropdown] = useState(false);

  // Monthly Performance Data for Broker
  const monthlyData = [
    { month: 'May', 'Deals Closed': 4, 'Commission (₹)': 5 },
    { month: 'Jun', 'Deals Closed': 6, 'Commission (₹)': 6 },
    { month: 'Jul', 'Deals Closed': 5, 'Commission (₹)': 5 },
    { month: 'Aug', 'Deals Closed': 3, 'Commission (₹)': 4 },
    { month: 'Sep', 'Deals Closed': 5, 'Commission (₹)': 6 },
    { month: 'Oct', 'Deals Closed': 7, 'Commission (₹)': 7 },
    { month: 'Nov', 'Deals Closed': 4, 'Commission (₹)': 5 },
    { month: 'Dec', 'Deals Closed': 6, 'Commission (₹)': 6 }
  ];

  // Sales Pipeline Data
  const salesPipelineData = [
    { name: 'Leads', value: 45 },
    { name: 'Contacted', value: 32 },
    { name: 'Viewing', value: 17 },
    { name: 'Negotiation', value: 8 },
    { name: 'Closed', value: 3 }
  ];

  // Active Deals Pipeline
  const activeDealsPipeline = [
    { property: 'Residential Space', location: 'Pune', cost: '₹1.5Cr', status: 'Completed', action: 'Details' },
    { property: 'Commercial Space', location: 'Mumbai', cost: '₹1.8Cr', status: 'Pending', action: 'Details' }
  ];

  // Properties for the cards - Updated with broker specific data
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
      location: "Mumbai, Mundhra",
      clientType: "MNC Client",
      cost: "₹6.8 Crore",
      annualRent: "₹27.7 Lakhs",
      tenureLeft: "10 Yrs",
      roi: "90.2%",
      isVerified: false,
      images: [
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&h=400&fit=crop",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&h=400&fit=crop",
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500&h=400&fit=crop",
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500&h=400&fit=crop"
      ],
    }
  ];

  // Initialize currentImageIndex for all properties and set up auto-slide
  useEffect(() => {
    const initialState = {};
    propertyCards.forEach(property => {
      initialState[property.id] = 0;
    });
    setCurrentImageIndex(initialState);

    // Set up auto-slide interval for each property
    const intervals = {};
    propertyCards.forEach(property => {
      intervals[property.id] = setInterval(() => {
        setCurrentImageIndex(prev => ({
          ...prev,
          [property.id]: (prev[property.id] + 1) % property.images.length
        }));
      }, 4000); // Change image every 4 seconds
    });

    // Cleanup intervals on component unmount
    return () => {
      Object.values(intervals).forEach(interval => clearInterval(interval));
    };
  }, []);

  const handleDotClick = (propertyId, index) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [propertyId]: index
    }));
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
      setCurrentImageIndex(prev => ({
        ...prev,
        [propertyId]: (prev[propertyId] + 1) % propertyCards.find(p => p.id === propertyId).images.length
      }));
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

  // Handle compare button click - UPDATED: Max 3 properties
  const handleCompareClick = (propertyId, propertyTitle) => {
    setSelectedProperties(prev => {
      // Check if property is already selected
      const isAlreadySelected = prev.some(p => p.id === propertyId);
      
      if (isAlreadySelected) {
        // Remove from selection
        return prev.filter(p => p.id !== propertyId);
      } else {
        // Add to selection (limit to 3 properties for comparison)
        if (prev.length < 3) { // Changed from 4 to 3
          const property = propertyCards.find(p => p.id === propertyId);
          return [...prev, { 
            id: propertyId, 
            title: propertyTitle,
            location: property?.location || "Pune, Mundhva"
          }];
        } else {
          // Updated message
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
      {/* Sticky Compare Banner - UPDATED for max 3 properties */}
      {selectedProperties.length > 0 && (
        <div className="sticky top-20 z-40 bg-white shadow-lg border-b border-gray-200 mb-6">
          <div className="mx-auto font-montserrat max-w-[90%]">
            {/* Banner Header */}
            <div className="flex justify-between items-center py-3">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold text-[#EE2529]">
                  Compare Properties
                </h2>
                <span className="text-gray-700 font-bold text-base">|</span>
                <span className="text-sm text-[#262626]"> 
                  {selectedProperties.length} of 3 properties added {/* Changed from 4 to 3 */}
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

            {/* Selected Properties Grid - Updated layout for max 3 properties */}
            <div className="py-3">
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
                {/* Selected Property Cards Container */}
                <div className="flex-1 w-full">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {selectedProperties.map((property) => (
                      <div 
                        key={property.id}
                        className="flex items-center justify-between p-2 bg-white rounded-xl px-3 shadow-md min-h-[70px] relative"
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
                    
                    {/* Empty Boxes with dashed border - Only show up to 3 total */}
                    {Array.from({ length: 3 - selectedProperties.length }).map((_, index) => (
                      <div 
                        key={`empty-${index}`} 
                        className="border-2 border-dashed border-gray-300 rounded-lg min-h-[70px] flex items-center justify-center"
                      >
                        <span className="text-gray-400 text-sm">
                          Add Property {selectedProperties.length + index + 1}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Compare Button - Fixed positioning */}
                <div className="lg:flex-shrink-0 w-full lg:w-auto">
                  <button 
                    onClick={navigateToComparison}
                    disabled={selectedProperties.length < 2}
                    className={`w-full lg:w-auto px-6 py-3 rounded text-white text-sm font-semibold whitespace-nowrap ${
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

      {/* Charts Section - Updated for Broker */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 mb-6">
        {/* Monthly Performance */}
        <div className="bg-white shadow-lg rounded-lg p-1">
          <h3 className="text-base sm:text-lg font-semibold text-[#262626] mb-6 text-center">Monthly Performance</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis yAxisId="left" tick={{ fontSize: 12 }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="Deals Closed" fill="#EE2529" />
              <Bar yAxisId="right" dataKey="Commission (₹)" fill="#26BFCC" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Sales Pipeline */}
        <div className="shadow-lg rounded-lg p-4 pl-4">
          <h3 className="text-base sm:text-lg font-semibold text-[#262626] mb-6 text-center">Sales Pipeline</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart layout="vertical" data={salesPipelineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
              <XAxis type="number" tick={{ fontSize: 12 }} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 9 }} />
              <Tooltip />
              <Bar dataKey="value" fill="#00BCD4" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Active Deals Pipeline */}
      <div className="p-3 mb-6 shadow-lg rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-base sm:text-lg font-semibold text-[#262626]">Active Deals Pipeline</h3>
          <span className="text-sm text-[#F7C952] font-semibold bg-[#FFF3CA] rounded-3xl py-1 px-2 ">1 Pending</span>
        </div>
        <div className="overflow-x-auto ">
          <table className="w-full text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-[#E0E0E0]">
                <th className="text-center py-3 px-2 font-semibold text-[#262626]">Property</th>
                <th className="text-center py-3 px-2 font-semibold text-[#262626]">Location</th>
                <th className="text-center py-3 px-2 font-semibold text-[#262626]">Cost</th>
                <th className="text-center py-3 px-2 font-semibold text-[#262626]">Status</th>
                <th className="text-center py-3 px-2 font-semibold text-[#262626]">Action</th>
              </tr>
            </thead>
            <tbody>
              {activeDealsPipeline.map((deal) => (
                <tr key={deal.property} className="border-b border-[#E0E0E0]">
                  <td className="py-3 px-2 text-[#262626] text-center">{deal.property}</td>
                  <td className="py-3 px-2 text-[#767676] text-center">{deal.location}</td>
                  <td className="py-3 px-2 text-[#262626] text-center">{deal.cost}</td>
                  <td className="py-3 px-2 text-center">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      deal.status === 'Completed' 
                        ? 'bg-[#00BCD4] bg-opacity-20 text-[#00BCD4]' 
                        : 'bg-[#FFF3CA] text-[#F7C952]'
                    }`}>
                      {deal.status}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-center">
                    <button className="text-[#767676] border border-[#767676] px-5 py-2 rounded text-xs hover:bg-gray-50">
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Properties Owned Section */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row space-y-2 items-center justify-between mb-6">
          <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-[#EE2529]">Properties Owned</h1>
          <div className="flex flex-row items-center gap-1 sm:gap-3">
            {/* Last 30 Days Dropdown */}
            <div className="relative">
              <select
                value={filterDays}
                onChange={(e) => setFilterDays(e.target.value)}
                className="flex items-center justify-between gap-2 px-3 py-1 w-[150px] lg:w-[200px] text-sm border border-gray-300 rounded bg-[#F2F2F2] text-[#767676] appearance-none"
              >
                <option value="30">Last 30 Days</option>
                <option value="60">Last 60 Days</option>
                <option value="90">Last 90 Days</option>
              </select>
              <FaChevronDown size={10} className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Sort by Date Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="flex items-center gap-2 pr-8 pl-3 py-1 text-sm border-r-2 text-[#262626] hover:bg-gray-50 appearance-none bg-transparent"
              >
                <option value="date">Sort by: Date</option>
                <option value="price">Sort by: Price</option>
                <option value="roi">Sort by: ROI</option>
              </select>
              <img 
                className='text-[#EE2529] absolute right-2 top-1/2 transform -translate-y-1/2 w-3 h-3 pointer-events-none' 
                src={dateArrow} 
                alt="" 
              />
            </div>

            {/* Show as Dropdown */}
            <div className="relative">
              <button 
                className="flex items-center gap-2 text-sm hover:bg-gray-50 px-2 py-1"
                onClick={() => setShowViewDropdown(!showViewDropdown)}
              >
                <span>Show as:</span>
                <img className='h-3 w-3' src={show} alt="" />
                <img className='text-[#EE2529] w-3 h-3' src={dateArrow} alt="" />
              </button>
              
              {showViewDropdown && (
                <div className="absolute top-full right-0 mt-1 bg-white shadow-lg rounded-md z-10 min-w-[120px]">
                  <ul className="py-1">
                    <li>
                      <button
                        className="w-full px-3 py-2 flex items-center gap-2 text-sm text-[#262626] hover:bg-gray-50 transition-colors"
                        onClick={() => {
                          setSelectedView('grid');
                          setShowViewDropdown(false);
                        }}
                      >
                        <img className="h-3 w-3" src={show} alt="" />
                        Grid View
                      </button>
                    </li>
                    <li>
                      <button
                        className="w-full px-3 py-2 flex items-center gap-2 text-sm text-[#262626] hover:bg-gray-50 transition-colors"
                        onClick={() => {
                          setSelectedView('list');
                          setShowViewDropdown(false);
                        }}
                      >
                        <img src={dateArrow} alt="" className="h-3 w-3" />
                        List View
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Grid View */}
        {selectedView === 'grid' && (
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
                    <p className="text-sm sm:text-base md:text-lg lg:text-2xl font-normal pl-3 sm:pl-4 mt-5">{property.title}</p>
                    <div className="flex items-center justify-between mt-1 mb-2">
                      <p className="flex items-center gap-1 text-xs sm:text-sm md:text-base text-gray-700 pl-4">
                        <CiLocationOn className="text-[#EE2529] flex-shrink-0" />
                        {property.location}
                      </p>
                      {property.isVerified && (
                        <div className="relative">
                          <img className="w-20 md:w-24" src={tag} alt="Verified" />
                          <p className="absolute bottom-0 md:bottom-0 right-2 text-white text-base md:text-lg">Verified</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Property Image Section with swipe functionality - Fixed height */}
                  <div className="relative">
                    <div 
                      className="relative overflow-hidden cursor-grab active:cursor-grabbing"
                      style={{ height: '280px' }} // Fixed height for all cards
                      onMouseDown={(e) => handleMouseDown(property.id, e)}
                      onMouseMove={(e) => handleMouseMove(property.id, e)}
                      onMouseUp={() => handleMouseUp(property.id)}
                      onMouseLeave={() => {
                        if (touchStart !== null) {
                          setTouchStart(null);
                          setTouchEnd(null);
                        }
                      }}
                      onTouchStart={(e) => handleTouchStart(property.id, e)}
                      onTouchMove={(e) => handleTouchMove(property.id, e)}
                      onTouchEnd={() => handleTouchEnd(property.id)}
                    >
                      <img 
                        className="w-full h-full object-cover transition-transform duration-300"
                        src={property.images[currentImageIndex[property.id] || 0]} 
                        alt={property.title}
                      />
                      
                      {/* Gradient overlay for bottom blur */}
                      <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-white/80 to-transparent backdrop-blur-[2px] border-t border-white "></div>
                      
                      {/* Slider Dots with auto-slide indicator */}
                      <div 
                        className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex items-center gap-1.5"
                      >
                        {property.images.map((_, dotIndex) => (
                          <button
                            key={dotIndex}
                            onClick={() => handleDotClick(property.id, dotIndex)}
                            className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer relative ${
                              currentImageIndex[property.id] === dotIndex
                                ? "bg-red-500 w-2.5"
                                : "bg-white w-2.5 hover:bg-white/80"
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
                  <div className="flex items-center justify-between px-4 mt-1 p-1 ">
                    <div className="space-y-2">
                      <p className="text-xs sm:text-sm text-[#767676]">
                        Cost: <span className="font-semibold text-[#262626] text-base">{property.cost}</span>
                      </p>
                      <p className="text-xs sm:text-sm text-[#767676]">
                        Annual Rent: <span className="font-semibold text-[#262626] text-base">{property.annualRent}</span>
                      </p>
                      <p className="text-xs sm:text-sm text-[#767676]">
                        Tenure Left: <span className="font-semibold text-[#262626] text-base">{property.tenureLeft}</span>
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
                          className="flex-1 border border-[#767676] text-[#767676] rounded-md px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm hover:bg-gray-50 transition-colors hover:scale-105 font-semibold"
                        >
                          View
                        </button>
                        <button 
                          onClick={() => handleAddToListing(property.id)}
                          className="flex-1 border rounded-md text-white px-2 sm:px-3 py-1.5 sm:py-2 bg-gradient-to-r from-[#EE2529] to-[#C73834] text-xs sm:text-sm hover:opacity-90 transition-opacity hover:scale-105 text-nowrap font-semibold"
                        >
                          Add to Listing
                        </button>
                        <button 
                          onClick={() => handleEdit(property.id)}
                          className="flex-1 border rounded-md text-white px-2 sm:px-3 py-1.5 sm:py-2 bg-gradient-to-r from-[#EE2529] to-[#C73834] text-xs sm:text-sm hover:opacity-90 transition-opacity hover:scale-105 font-semibold"
                        >
                          Edit
                        </button>
                      </>
                    ) : (
                      // Second card keeps the original 2 buttons
                      <>
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
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* List View */}
        {selectedView === 'list' && (
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-[#E0E0E0]">
                  <th className="text-center py-3 px-2 font-semibold text-[#262626]">Property</th>
                  <th className="text-center py-3 px-2 font-semibold text-[#262626]">Location</th>
                  <th className="text-center py-3 px-2 font-semibold text-[#262626]">Client Type</th>
                  <th className="text-center py-3 px-2 font-semibold text-[#262626]">Cost</th>
                  <th className="text-center py-3 px-2 font-semibold text-[#262626]">Annual Rent</th>
                  <th className="text-center py-3 px-2 font-semibold text-[#262626]">ROI</th>
                  <th className="text-center py-3 px-2 font-semibold text-[#262626]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {propertyCards.map((property) => {
                  const isSelected = selectedProperties.some(p => p.id === property.id);
                  return (
                    <tr key={property.id} className="border-b border-[#E0E0E0] text-center">
                      <td className="py-3 px-2 text-[#262626] text-center">{property.title}</td>
                      <td className="py-3 px-2 text-[#767676] text-center">{property.location}</td>
                      <td className="py-3 px-2 text-[#767676] text-center">{property.clientType}</td>
                      <td className="py-3 px-2 text-[#262626] text-center">{property.cost}</td>
                      <td className="py-3 px-2 text-[#262626] text-center">{property.annualRent}</td>
                      <td className="py-3 px-2 text-[#EE2529] font-bold text-center">{property.roi}</td>
                      <td className="py-3 px-2 text-center">
                        <div className="flex gap-2 justify-center">
                          <button
                            onClick={() => handleViewClick(property.id)}
                            className="border border-[#767676] text-[#767676] rounded px-3 py-1 text-xs hover:bg-gray-50 font-semibold"
                          >
                            View
                          </button>
                          <button
                            onClick={() => handleCompareClick(property.id, property.title)}
                            className={`border rounded px-3 py-1 text-xs font-semibold ${
                              isSelected
                                ? "bg-[#EE2529] text-white border-[#EE2529]"
                                : "bg-white text-[#EE2529] border-[#EE2529] hover:bg-gray-50"
                            }`}
                          >
                            {isSelected ? "Remove" : "Compare"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPortfolio;