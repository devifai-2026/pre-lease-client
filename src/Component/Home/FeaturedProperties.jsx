import React, { useEffect, useState } from "react";
import { CiHeart, CiLocationOn } from "react-icons/ci";
import tag from "../../assets/FeaturedProperties/tag.png";
import cardImg from "../../assets/FeaturedProperties/cardImg.png";
import { FaPlus } from "react-icons/fa";
import { RiShareForwardLine } from "react-icons/ri";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";

const FeaturedProperties = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    AOS.refresh();
  }, []);

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
      images: [cardImg, cardImg, cardImg, cardImg],
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
      images: [cardImg, cardImg, cardImg, cardImg],
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
      images: [cardImg, cardImg, cardImg, cardImg],
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
      images: [cardImg, cardImg, cardImg, cardImg],
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
      images: [cardImg, cardImg, cardImg, cardImg],
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
      images: [cardImg, cardImg, cardImg, cardImg],
    },
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
    <div 
      className="bg-[#F2F2F2] py-6 md:py-8"
      data-aos="fade-up"
    >
      <div className="max-w-[95%] mx-auto px-2 sm:px-4">
        <h2 
          className="text-center text-2xl md:text-3xl lg:text-4xl text-[#262626]"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          Featured Properties
        </h2>
        
        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 mt-6 sm:mt-8 md:mt-10 mb-6 sm:mb-8 md:mb-10 font-montserrat">
          {propertyCards.map((property, index) => (
            <div 
              key={property.id} 
              className="bg-white rounded-lg overflow-hidden"
              data-aos="fade-up"
              data-aos-delay={150 + (index * 50)}
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
                    <div 
                      className="relative"
                      data-aos="zoom-in"
                      data-aos-delay={200 + (index * 50)}
                    >
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
                    className="w-full h-48 sm:h-52 md:h-56 lg:h-60 object-cover" 
                    src={property.images[currentImageIndex[property.id] || 0]} 
                    alt={property.title}
                    data-aos="zoom-in"
                    data-aos-delay={250 + (index * 50)}
                  />
                  
                  {/* Gradient overlay for bottom blur */}
                  <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-white/80 to-transparent backdrop-blur-[2px] border-t border-white rounded-b-lg"></div>
                  
                  {/* Slider Dots - Positioned above the blur */}
                  <div 
                    className="absolute bottom-14 md:bottom-16 left-1/2 transform -translate-x-1/2 flex items-center gap-1.5 sm:gap-2"
                  >
                    {property.images.map((_, dotIndex) => (
                      <button
                        key={dotIndex}
                        onClick={() => handleDotClick(property.id, dotIndex)}
                        className={`h-2 sm:h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                          currentImageIndex[property.id] === dotIndex
                            ? "bg-red-500 w-2.5 "
                            : "bg-white/60 w-2.5 hover:bg-white/80"
                        }`}
                        aria-label={`Go to image ${dotIndex + 1}`}
                      />
                    ))}
                  </div>
                  
                  {/* Action Buttons on Image */}
                  <div 
                    className="absolute bottom-3 left-0 right-0 flex items-center justify-between px-3 sm:px-4"
                    data-aos="fade-up"
                    data-aos-delay={300 + (index * 50)}
                  >
                    <p className="bg-[#FFF3CA] py-1 px-2 sm:px-3 rounded-3xl text-xs sm:text-sm text-[#767676]">
                      {property.clientType}
                    </p>
                    <button className="bg-white text-[#EE2529] px-2 sm:px-3 py-1 sm:py-1.5 md:px-4 md:py-2 flex items-center gap-1 sm:gap-2 border border-[#EE2529] rounded-md text-xs sm:text-sm hover:bg-gray-50 transition-colors">
                      <FaPlus className="text-xs sm:text-sm" /> Compare
                    </button>
                  </div>
                  
                  {/* Share and Like Icons */}
                  <div 
                    className="absolute top-3 right-3 sm:right-4 flex flex-col gap-2"
                    data-aos="fade-down"
                    data-aos-delay={350 + (index * 50)}
                  >
                    <RiShareForwardLine className="bg-[#2626268A] rounded-full p-1 text-white h-6 w-6 sm:h-7 sm:w-7 cursor-pointer hover:scale-110 transition-transform" />
                    <CiHeart className="bg-[#2626268A] rounded-full p-1 text-white h-6 w-6 sm:h-7 sm:w-7 cursor-pointer hover:scale-110 transition-transform" />
                  </div>
                </div>
              </div>

              {/* Property Details */}
              <div 
                className="flex items-center justify-around mt-4 p-3 sm:p-4"
                data-aos="fade-up"
                data-aos-delay={400 + (index * 50)}
              >
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
                <div 
                  className="bg-gradient-to-r from-[#F2F2F2] to-[#FFFFFF] w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 flex flex-col items-center justify-center rounded-lg shadow-lg ml-2"
                  data-aos="zoom-in"
                  data-aos-delay={450 + (index * 50)}
                >
                  <p className="text-xs sm:text-sm font-medium">ROI</p>
                  <p className="text-[#EE2529] font-bold text-sm sm:text-base md:text-lg">{property.roi}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div 
                className="flex items-center justify-center gap-2 sm:gap-3 mt-4 mb-4 sm:mt-5 sm:mb-5 px-3 sm:px-4"
                data-aos="fade-up"
                data-aos-delay={500 + (index * 50)}
              >
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
              </div>
            </div>
          ))}
        </div>
        
        {/* Explore Properties Button */}
        <div 
          className="flex justify-center mx-auto"
          data-aos="zoom-in"
          data-aos-delay="600"
        >
          <button 
            onClick={handleExploreProperties}
            className="border rounded-md text-white px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-[#EE2529] to-[#C73834] text-xs sm:text-sm hover:opacity-90 transition-opacity hover:scale-105"
          >
            Explore Properties
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProperties;