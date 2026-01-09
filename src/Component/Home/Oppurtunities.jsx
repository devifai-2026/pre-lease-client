import React, { useState, useEffect } from "react";
import { AiOutlinePercentage } from "react-icons/ai";
import { FaRegBuilding } from "react-icons/fa";
import { GoHome } from "react-icons/go";
import { LuClock3, LuUsersRound } from "react-icons/lu";
import { PiCurrencyDollar } from "react-icons/pi";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import AOS from "aos";
import "aos/dist/aos.css";

// Add props parameter
const Opportunities = ({ onSkip, onShowProperties }) => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [selectedCard, setSelectedCard] = useState(0);
  const [selectedCity, setSelectedCity] = useState(0);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
    AOS.refresh();
  }, []);

  const cards = [
    {
      id: 0,
      icon: <FaRegBuilding className="text-3xl" />,
      label: "Cities",
    },
    {
      id: 1,
      icon: <AiOutlinePercentage className="text-3xl" />,
      label: "Annual Returns",
    },
    {
      id: 2,
      icon: <GoHome className="text-3xl" />,
      label: "Property Type",
    },
    {
      id: 3,
      icon: <PiCurrencyDollar className="text-3xl" />,
      label: "Budget",
    },
    {
      id: 4,
      icon: <LuUsersRound className="text-3xl" />,
      label: "Tenant Type",
    },
    {
      id: 5,
      icon: <LuClock3 className="text-3xl" />,
      label: "Tenure Left",
    },
  ];

  const cities = [
    "Pune",
    "Mumbai",
    "New Delhi",
    "Gurgaon",
    "Mumbai",
    "New Delhi",
  ];

  // Updated button handlers
  const handleSkipClick = () => {
    if (onSkip) {
      onSkip(); // Call parent handler if provided
    }
    // You can also add direct navigation here if needed
    // navigate('/explore-properties');
  };

  const handleShowPropertiesClick = () => {
    if (onShowProperties) {
      onShowProperties(); // Call parent handler if provided
    }
    // Navigate to explore properties page
    navigate('/explore-properties');
  };

  return (
    <div
      className="max-w-[90%] md:max-w-[80%] lg:max-w-[65%] mx-auto px-4 lg:px-0"
      data-aos="fade-up"
    >
      <h2
        className="text-center mt-4 md:mt-8 lg:mt-12 text-2xl md:text-3xl lg:text-4xl"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        Discover Opportunities Built for You
      </h2>

      {/* Cards Grid - Responsive */}
      <div
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-6 md:mt-8"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        {cards.map((card, index) => {
          const isSelected = selectedCard === card.id;
          const textColor = isSelected ? "text-[#EE2529]" : "text-gray-600";
          const borderColor = isSelected
            ? "border-[#EE2529]"
            : "border-[#767676]";

          return (
            <div
              key={card.id}
              className="flex flex-col cursor-pointer group"
              onClick={() => setSelectedCard(card.id)}
              data-aos="zoom-in"
              data-aos-delay={300 + index * 50}
            >
              <div
                className={`
                  shadow-lg rounded-xl p-3 sm:p-3 md:p-4 lg:p-4 border-t-4 
                  flex flex-col items-center justify-center 
                  h-[90px] sm:h-[105px] md:h-[125px] lg:h-[150px] w-full
                  transition-all duration-300
                  ${borderColor}
                  ${isSelected ? "bg-white" : "bg-white"}
                  hover:border-[#EE2529] hover:shadow-xl
                `}
              >
                <div
                  className={`${textColor} transition-colors duration-300 group-hover:text-[#EE2529]`}
                >
                  {card.icon}
                </div>
                <p
                  className={`
                  text-center mt-1 sm:mt-1.5 md:mt-2 lg:mt-2 
                  ${isSelected ? "font-semibold" : "font-medium"}
                  ${textColor}
                  transition-colors duration-300
                  group-hover:text-[#EE2529] text-xs sm:text-xs md:text-sm lg:text-sm font-montserrat
                `}
                >
                  {card.label}
                </p>
              </div>

              <hr
                className={`
                mt-3 md:mt-3 lg:mt-3 border-t-4 
                ${borderColor}
                transition-colors duration-300
                group-hover:border-[#EE2529]
              `}
              />
            </div>
          );
        })}
      </div>

      {/* City Preference Section */}
      <div className="mt-6 md:mt-8" data-aos="fade-up" data-aos-delay="400">
        <div
          className="max-w-full md:max-w-[90%] lg:max-w-[80%] mx-auto shadow-xl rounded-xl p-4 sm:p-5 md:p-6 lg:p-8"
          data-aos="zoom-in"
          data-aos-delay="500"
        >
          <div
            className="flex items-center justify-between font-montserrat"
            data-aos="fade-up"
            data-aos-delay="550"
          >
            <p className="bg-[#FFF3CA] px-2 sm:px-2.5 md:px-3 lg:px-3 py-1 sm:py-1.5 md:py-2 lg:py-2 rounded-3xl text-xs">
              Step 1 of 6
            </p>
            <p className="bg-[#FFF3CA] px-2 sm:px-2.5 md:px-3 lg:px-3 py-1 sm:py-1.5 md:py-2 lg:py-2 rounded-3xl text-xs">
              18%
            </p>
          </div>

          <div
            className="mt-3 sm:mt-3.5 md:mt-4 lg:mt-4 text-center"
            data-aos="fade-up"
            data-aos-delay="600"
          >
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-2xl font-semibold">
              What's your City Preference?
            </h2>
            <p className="text-gray-600 mt-1 text-sm sm:text-sm md:text-base lg:text-base">
              Select your City Preference.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-3 md:gap-4 lg:gap-4 mt-4 sm:mt-4 md:mt-6 lg:mt-6 max-w-full sm:max-w-[80%] md:max-w-[70%] lg:max-w-[60%] mx-auto font-montserrat">
            {cities.map((city, index) => {
              const isCitySelected = selectedCity === index;

              return (
                <div
                  key={index}
                  onClick={() => setSelectedCity(index)}
                  className={`
                    p-2 sm:p-2.5 md:p-3 lg:p-4 rounded-lg cursor-pointer transition-all duration-300
                    flex items-center justify-center  h-20 md:h-24 lg:h-32 w-full
                    ${
                      isCitySelected
                        ? `
                        bg-gradient-to-b from-[#FFFFFF] to-[#FFFFFF] 
                        text-[#EE2529]
                        border border-gray-200
                        shadow-[0_12px_8px_-8px_rgba(238,37,41,0.4)]
                      `
                        : `
                        bg-gradient-to-b from-[#F2F2F2] to-[#FFFFFF] 
                        text-gray-700
                        border border-gray-200
                        hover:shadow-[0_8px_6px_-6px_rgba(0,0,0,0.2)]
                      `
                    }
                  `}
                >
                  <span
                    className={`font-medium ${
                      isCitySelected ? "text-[#EE2529]" : "text-gray-800"
                    } text-center text-sm md:text-base lg:text-lg  whitespace-nowrap`}
                  >
                    {city}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Buttons - Updated with onClick handlers */}
        <div
          className="flex justify-center gap-2 sm:gap-2 md:gap-2 lg:gap-2 mt-4 sm:mt-4 md:mt-5 lg:mt-5 font-montserrat mb-8"
          data-aos="fade-up"
          data-aos-delay="800"
        >
          <button
            onClick={handleSkipClick} // Updated handler
            className="text-[#767676] border border-[#767676] rounded-md px-3 sm:px-3 md:px-4 lg:px-4 py-1.5 sm:py-1.5 md:py-2 lg:py-2 text-sm sm:text-sm md:text-base lg:text-base transition-all duration-300 hover:scale-105 hover:shadow-lg"
            data-aos="zoom-in-left"
            data-aos-delay="850"
          >
            Skip
          </button>
          <button
            onClick={handleShowPropertiesClick} // Updated handler with navigation
            className="bg-gradient-to-r from-[#EE2529] to-[#C73834] text-white rounded-md px-3 sm:px-3 md:px-4 lg:px-4 py-1.5 sm:py-1.5 md:py-2 lg:py-2 text-sm sm:text-sm md:text-base lg:text-base transition-all duration-300 hover:scale-105 hover:shadow-lg"
            data-aos="zoom-in-right"
            data-aos-delay="850"
          >
            Show Properties
          </button>
        </div>
      </div>
    </div>
  );
};

export default Opportunities;