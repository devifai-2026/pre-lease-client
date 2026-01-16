import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { CiHeart, CiLocationOn } from "react-icons/ci";
import { RiShareForwardLine } from "react-icons/ri";
import { FaPlus } from "react-icons/fa";
import tag from "../../../../../../assets/FeaturedProperties/tag.png";
import cardImg from "../../../../../../assets/FeaturedProperties/cardImg.png";
import circle from "../../../../../../assets/PropertyCard/rounded.png";
import { useNavigate } from "react-router-dom";
import dateArrow from "../../../../../../assets/Dashboard/dateArrow.svg";
import show from "../../../../../../assets/Dashboard/show.svg";

const MyPortfolio = () => {
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState("date");
  const [filterDays, setFilterDays] = useState("30");
  const [currentImageIndex, setCurrentImageIndex] = useState({});
  const [selectedProperties, setSelectedProperties] = useState([]);

  // Portfolio Diversification Data
  const diversificationData = [
    { name: "Commercial", value: 55, color: "#EE2529" },
    { name: "Residential", value: 30, color: "#767676" },
    { name: "Industrial", value: 15, color: "#00BCD4" },
  ];

  // Income Tracker Data - Updated Y-axis values
  const incomeTrackerData = [
    { year: "Year 1", received: 45, expected: 50 },
    { year: "Year 2", received: 48, expected: 50 },
    { year: "Year 3", received: 50, expected: 50 },
    { year: "Year 4", received: 50, expected: 50 },
    { year: "Year 5", received: 50, expected: 50 },
  ];

  // Y-axis tick values in lakhs
  const yAxisTicks = [15, 30, 45, 60, 75];

  // Custom Y-axis formatter to add "L" suffix
  const yAxisFormatter = (value) => `${value}L`;

  // Custom Tooltip formatter
  const tooltipFormatter = (value) => [`₹${value}L`, ""];
  const tooltipLabelFormatter = (label) => `${label}`;

  // Lease Renewals Data
  const leaseRenewals = [
    {
      id: 1,
      property: "Residential Space",
      location: "Pune",
      tenant: "AP Realtors",
      expiryDate: "15/12/2025",
      annualRent: "₹2,65,00,000",
      status: "Expiring Soon",
    },
    {
      id: 2,
      property: "Commercial Space",
      location: "Mumbai",
      tenant: "Global Innovations",
      expiryDate: "20/12/2025",
      annualRent: "₹2,55,00,000",
      status: "Expiring Soon",
    },
  ];

  // Properties for the cards
  const propertyCards = [
    {
      id: 1,
      title: "Residential Space",
      location: "Pune, Mundhva",
      clientType: "MNC Client",
      cost: "₹25.0 Crore",
      annualRent: "₹15.00 Lakhs",
      tenureLeft: "7 Yrs",
      roi: "85.00%",
      isVerified: true,
      images: [cardImg, cardImg, cardImg, cardImg],
    },
    {
      id: 2,
      title: "Commercial Space",
      location: "Mumbai, Bandra",
      clientType: "MNC Client",
      cost: "₹26.5 Crore",
      annualRent: "₹15.80 Lakhs",
      tenureLeft: "8 Yrs",
      roi: "86.11%",
      isVerified: false,
      images: [cardImg, cardImg, cardImg, cardImg],
    },
  ];

  // Initialize currentImageIndex for all properties
  useEffect(() => {
    const initialState = {};
    propertyCards.forEach((property) => {
      initialState[property.id] = 0;
    });
    setCurrentImageIndex(initialState);
  }, []);

  const handleDotClick = (propertyId, index) => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [propertyId]: index,
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

  // Handle contact expert button click
  const handleContactExpert = () => {
    navigate("/explore-brokers");
  };

  // Handle compare button click
  const handleCompareClick = (propertyId, propertyTitle) => {
    setSelectedProperties((prev) => {
      // Check if property is already selected
      const isAlreadySelected = prev.some((p) => p.id === propertyId);

      if (isAlreadySelected) {
        // Remove from selection
        return prev.filter((p) => p.id !== propertyId);
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
    const propertyIds = selectedProperties.map((p) => p.id).join(",");
    navigate(`/compare/${propertyIds}`);
  };

  return (
    <div className="min-h-screen  font-montserrat">
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

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 mb-6">
        {/* Portfolio Diversification */}
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h3 className="text-base sm:text-lg font-semibold text-[#262626] mb-6 text-center">
            Portfolio Diversification
          </h3>
          <div className="flex justify-center">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={diversificationData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {diversificationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-4 flex-wrap">
            {diversificationData.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-xs sm:text-sm text-[#767676]">
                  {item.name} {item.value}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Income Tracker - UPDATED with new colors and Y-axis values */}
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h3 className="text-base sm:text-lg font-semibold text-[#262626] mb-6 text-center">
            Income Tracker
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={incomeTrackerData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
              <XAxis dataKey="year" tick={{ fontSize: 12 }} />
              <YAxis
                tick={{ fontSize: 12 }}
                ticks={yAxisTicks}
                tickFormatter={yAxisFormatter}
                domain={[0, 75]}
              />
              <Tooltip
                formatter={tooltipFormatter}
                labelFormatter={tooltipLabelFormatter}
              />
              <Line
                type="monotone"
                dataKey="received"
                stroke="#C73834"
                strokeWidth={2}
                name="Received"
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="expected"
                stroke="#429482"
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Expected"
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Lease Renewals */}
      <div className="bg-white rounded-lg  mb-6">
        <div className="flex flex-col md:flex-row space-y-2 justify-between items-center mb-4">
          <h3 className=" text-base md:text-lg lg:text-xl font-semibold text-[#262626]">
            Upcoming Lease Renewals
          </h3>
          <span className="text-sm text-[#EE2529] font-semibold bg-[#FDEDEE] rounded-3xl py-1 px-2">
            {leaseRenewals.length} Expiring Soon
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-[#E0E0E0]">
                <th className="text-left py-3 px-2 font-semibold text-[#262626]">
                  Property
                </th>
                <th className="text-left py-3 px-2 font-semibold text-[#262626]">
                  Location
                </th>
                <th className="text-left py-3 px-2 font-semibold text-[#262626]">
                  Tenant
                </th>
                <th className="text-left py-3 px-2 font-semibold text-[#262626]">
                  Expiry Date
                </th>
                <th className="text-left py-3 px-2 font-semibold text-[#262626]">
                  Annual Rent
                </th>
                <th className="text-left py-3 px-2 font-semibold text-[#262626]">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {leaseRenewals.map((renewal) => (
                <tr key={renewal.id} className="border-b border-[#E0E0E0]">
                  <td className="py-3 px-2 text-[#262626]">
                    {renewal.property}
                  </td>
                  <td className="py-3 px-2 text-[#767676]">
                    {renewal.location}
                  </td>
                  <td className="py-3 px-2 text-[#767676]">{renewal.tenant}</td>
                  <td className="py-3 px-2 text-[#262626]">
                    {renewal.expiryDate}
                  </td>
                  <td className="py-3 px-2 text-[#262626]">
                    {renewal.annualRent}
                  </td>
                  <td className="py-3 px-2">
                    <button className="text-[#767676] border border-[#767676] px-3 py-1 rounded text-xs hover:bg-gray-50">
                      view
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
        <div className="flex flex-col md:flex-row space-y-2 justify-between items-center mb-4">
          <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-[#EE2529]">
            Properties Owned
          </h3>
          <div className="flex flex-row gap-2 sm:gap-3 items-center">
            {/* Filter dropdown */}
            <select
              value={filterDays}
              onChange={(e) => setFilterDays(e.target.value)}
              className="text-xs sm:text-sm border border-[#E0E0E0] rounded px-2 py-1 bg-white"
            >
              <option value="30">Last 30 Days</option>
              <option value="60">Last 60 Days</option>
              <option value="90">Last 90 Days</option>
            </select>

            {/* Sort by with date arrow */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm  rounded px-2 py-1 pr-8 bg-white appearance-none"
              >
                <option value="date">Sort by Date</option>
                <option value="price">Sort by Price</option>
                <option value="roi">Sort by ROI</option>
              </select>
              <img
                src={dateArrow}
                alt="Date arrow"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 w-3 h-3 pointer-events-none"
              />
            </div>
            {/* Show as section */}
            <div className="flex items-center gap-2">
              <span className="text-sm  whitespace-nowrap">
                Show as:
              </span>
              <img
                src={show}
                alt="Show view"
                className="w-3 h-3 cursor-pointer hover:opacity-80"
              />
               <img
                src={dateArrow}
                alt="Date arrow"
                className="w-3 h-3 cursor-pointer hover:opacity-80"
              />
             
            </div>
          </div>
        </div>
        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6 mb-8">
          {propertyCards.map((property, index) => {
            // Check if this property is selected for comparison
            const isSelected = selectedProperties.some(
              (p) => p.id === property.id
            );

            return (
              <div
                key={property.id}
                className={`bg-white rounded-lg overflow-hidden shadow-lg relative ${
                  isSelected ? "ring-2 ring-[#EE2529] ring-offset-2" : ""
                }`}
              >
                {/* Property Title and Location */}
                <div className="">
                  <p className="text-sm sm:text-base md:text-lg font-medium pl-3 sm:pl-4 mt-5">
                    {property.title}
                  </p>
                  <div className="flex items-center justify-between mt-1 mb-2">
                    <p className="flex items-center gap-1 text-xs sm:text-sm md:text-base text-gray-700 pl-4">
                      <CiLocationOn className="text-[#EE2529] flex-shrink-0" />
                      {property.location}
                    </p>
                    {property.isVerified && (
                      <div className="relative">
                        <img
                          className="w-16 sm:w-18 md:w-20"
                          src={tag}
                          alt="Verified"
                        />
                        <p className="absolute bottom-0 md:bottom-1 right-2 text-white text-xs md:text-xs">
                          Verified
                        </p>
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
                    <div className="absolute bottom-[72px] md:bottom-20 left-1/2 transform -translate-x-1/2 flex items-center gap-1.5">
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
                        onClick={() =>
                          handleCompareClick(property.id, property.title)
                        }
                        className={`flex items-center gap-1 sm:gap-2 border rounded-md px-2 sm:px-3 py-1 sm:py-1.5 md:px-4 md:py-2 text-xs sm:text-sm transition-colors ${
                          isSelected
                            ? "bg-[#EE2529] text-white border-[#EE2529]"
                            : "bg-white text-[#EE2529]  hover:bg-gray-50"
                        }`}
                      >
                        <FaPlus className="text-xs sm:text-sm" />
                        {isSelected ? "Remove" : "Compare"}
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
                      Cost:{" "}
                      <span className="font-semibold text-[#262626]">
                        {property.cost}
                      </span>
                    </p>
                    <p className="text-xs sm:text-sm text-[#767676]">
                      Annual Rent:{" "}
                      <span className="font-semibold text-[#262626]">
                        {property.annualRent}
                      </span>
                    </p>
                    <p className="text-xs sm:text-sm text-[#767676]">
                      Tenure Left:{" "}
                      <span className="font-semibold text-[#262626]">
                        {property.tenureLeft}
                      </span>
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-[#F2F2F2] to-[#FFFFFF] w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 flex flex-col items-center justify-center rounded-lg shadow-lg ml-2">
                    <p className="text-base md:text-lg lg:text-xl font-semibold">
                      ROI
                    </p>
                    <p className="text-[#EE2529] font-bold text-sm sm:text-base md:text-lg">
                      {property.roi}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-center gap-2 sm:gap-3 mt-4 mb-3 px-4">
                  {/* First card (Residential Space) gets 3 buttons */}
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
                    // Second card (Commercial Space) keeps the original 2 buttons
                    <>
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

export default MyPortfolio;
