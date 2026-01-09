import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { CiHeart, CiLocationOn } from 'react-icons/ci';
import { RiShareForwardLine } from 'react-icons/ri';
import { FaPlus, FaChevronDown, FaClock } from 'react-icons/fa';

const MyPortfolio = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState({});
  const [selectedProperties, setSelectedProperties] = useState([]);

  // Monthly Performance Data
  const monthlyData = [
    { month: 'May', 'Revenue': 50, 'Expenses': 30 },
    { month: 'Jun', 'Revenue': 52, 'Expenses': 28 },
    { month: 'Jul', 'Revenue': 51, 'Expenses': 29 },
    { month: 'Aug', 'Revenue': 53, 'Expenses': 27 },
    { month: 'Sep', 'Revenue': 50, 'Expenses': 30 },
    { month: 'Oct', 'Revenue': 54, 'Expenses': 26 },
  ];

  // Occupancy Trend Data
  const occupancyData = [
    { month: 'May', occupancy: 85 },
    { month: 'Jun', occupancy: 85 },
    { month: 'Jul', occupancy: 85 },
    { month: 'Aug', occupancy: 85 },
    { month: 'Sep', occupancy: 85 },
  ];

  // Active Tenants
  const activeTenants = [
    { property: 'Residential Space', location: 'Pune', tenant: 'AP Realtors', leaseStart: '15/12/2025', leaseEnd: '16/12/2025', annualRent: '₹2,65,000' },
    { property: 'Commercial Space', location: 'Mumbai', tenant: 'Global Innovations', leaseStart: '20/12/2025', leaseEnd: '20/12/2025', annualRent: '₹2,95,000' }
  ];

  // Maintenance Tracker
  const maintenanceData = [
    { property: 'Residential Space', location: 'Pune', task: 'HVAC Servicing', date: '15/12/2025', status: 'Scheduled' },
    { property: 'Commercial Space', location: 'Mumbai', task: 'Painting - Unit 204', date: '23/12/2025', status: 'In progress' }
  ];

  // Properties - Updated to include multiple images and clientType
  const propertyCards = [
    {
      id: 1,
      title: "Residential Space",
      location: "Pune, Mundhra",
      clientType: "MNC Client",
      cost: "₹56.8 Crore",
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
      cost: "₹56.8 Crore",
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

  const handleViewClick = (propertyId) => {
    console.log(`View property ${propertyId}`);
    // Add your view logic here
  };

  const handleAddToListing = (propertyId) => {
    console.log(`Add property ${propertyId} to listing`);
    // Add your logic here
  };

  const handleEdit = (propertyId) => {
    console.log(`Edit property ${propertyId}`);
    // Add your logic here
  };

  const handleEnquireClick = (propertyId) => {
    console.log(`Enquire property ${propertyId}`);
    // Add your logic here
  };

  return (
    <div className="min-h-screen font-montserrat">
      {/* Revenue vs Expenses & Occupancy Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6">
        {/* Revenue vs Expenses */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Revenue vs Expenses</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="Revenue" fill="#EE2529" />
              <Bar dataKey="Expenses" fill="#26BFCC" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Occupancy Trend */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Occupancy Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={occupancyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line type="monotone" dataKey="occupancy" stroke="#26BFCC" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Active Tenants */}
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Active Tenants</h3>
          <span className="text-xs font-semibold bg-red-100 text-red-600 px-3 py-1 rounded-full">1 Expiring Soon</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs sm:text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-2 font-semibold text-gray-700">Property</th>
                <th className="text-left py-3 px-2 font-semibold text-gray-700">Location</th>
                <th className="text-left py-3 px-2 font-semibold text-gray-700">Tenant</th>
                <th className="text-left py-3 px-2 font-semibold text-gray-700">Lease Start</th>
                <th className="text-left py-3 px-2 font-semibold text-gray-700">Lease End</th>
                <th className="text-left py-3 px-2 font-semibold text-gray-700">Annual Rent</th>
              </tr>
            </thead>
            <tbody>
              {activeTenants.map((tenant, idx) => (
                <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-2 text-gray-700">{tenant.property}</td>
                  <td className="py-3 px-2 text-gray-600">{tenant.location}</td>
                  <td className="py-3 px-2 text-gray-700">{tenant.tenant}</td>
                  <td className="py-3 px-2 text-gray-700">{tenant.leaseStart}</td>
                  <td className="py-3 px-2 text-gray-700">{tenant.leaseEnd}</td>
                  <td className="py-3 px-2 text-gray-700">{tenant.annualRent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Maintenance Tracker */}
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Maintenance Tracker</h3>
          <button className="text-xs font-semibold text-gray-600 border border-gray-300 px-3 py-1 rounded hover:bg-gray-50">
            Schedule Maintenance
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs sm:text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-2 font-semibold text-gray-700">Property</th>
                <th className="text-left py-3 px-2 font-semibold text-gray-700">Location</th>
                <th className="text-left py-3 px-2 font-semibold text-gray-700">Task</th>
                <th className="text-left py-3 px-2 font-semibold text-gray-700">Date</th>
                <th className="text-left py-3 px-2 font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {maintenanceData.map((item, idx) => (
                <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-2 text-gray-700">{item.property}</td>
                  <td className="py-3 px-2 text-gray-600">{item.location}</td>
                  <td className="py-3 px-2 text-gray-700">{item.task}</td>
                  <td className="py-3 px-2 text-gray-700">{item.date}</td>
                  <td className="py-3 px-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      item.status === 'Scheduled' 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Properties Owned Section - UPDATED TO MATCH SECOND CODE */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row items-center justify-between mb-6 space-y-2">
          <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-[#EE2529]">Properties Owned</h1>
          <div className="flex flex-col md:flex-row items-center gap-1">
            <button className="flex items-center justify-between gap-2 px-3 py-2 w-[200px] text-sm border border-gray-300 rounded bg-[#F2F2F2] text-[#767676]">
              Last 30 Days
              <FaChevronDown size={10} />
            </button>
            <button className="flex items-center gap-2 border-r-2 pr-2 text-sm hover:bg-gray-50">
              Sort by: <span className='text-[#EE2529]'> Date</span>
              <FaChevronDown className='text-[#EE2529]' size={10} />
            </button>
            <button className="text-sm hover:bg-gray-50 flex items-center gap-2">
              Show as: ≡
              <FaChevronDown className='text-[#EE2529]' size={10} />
            </button>
          </div>
        </div>

        {/* Updated Cards Grid to match second code */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6 mb-8">
          {propertyCards.map((property) => {
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
                      <div className="relative ">
                        {/* Simulating the verified tag - you can replace with actual image */}
                        <div className="w-16 sm:w-18 md:w-20 h-6 bg-red-600 rounded-sm relative">
                          <p className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">
                            Verified
                          </p>
                          <div className="absolute right-0 top-0 h-full w-2 bg-red-700 transform skew-x-12"></div>
                        </div>
                      </div>
                    )}
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
                    
                    {/* Slider Dots */}
                    <div className="absolute bottom-12 md:bottom-16 left-1/2 transform -translate-x-1/2 flex items-center gap-1.5">
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
                      <CiHeart className="bg-[#2626268A] rounded-full p-1 text-white h-6 w-6 sm:h-7 sm:w-7 cursor-pointer hover:scale-110 transition-transform" />
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
                    // Second card keeps the original 2 buttons
                    <>
                      <button 
                        onClick={() => handleViewClick(property.id)}
                        className="border border-[#767676] text-[#767676] rounded-md px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm hover:bg-gray-50 transition-colors hover:scale-105"
                      >
                        View
                      </button>
                      <button 
                        onClick={() => handleEnquireClick(property.id)}
                        className="border rounded-md text-white px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-[#EE2529] to-[#C73834] text-xs sm:text-sm hover:opacity-90 transition-opacity hover:scale-105"
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
              onClick={() => console.log("Navigate to comparison")}
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

export default MyPortfolio;