import React, { useState, useEffect } from "react";
import { AiOutlinePercentage } from "react-icons/ai";
import { FaRegBuilding } from "react-icons/fa";
import { GoHome } from "react-icons/go";
import { LuClock3, LuUsersRound } from "react-icons/lu";
import { PiCurrencyDollar } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const Opportunities = () => {
  const navigate = useNavigate();
  const [selectedCards, setSelectedCards] = useState([0]); // Cities selected by default
  const [selectedCity, setSelectedCity] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);
  const [completionPercentage, setCompletionPercentage] = useState(18);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
    AOS.refresh();
  }, []);

  // Update step and percentage when cards are selected
  useEffect(() => {
    // Step is the number of selected cards (max 6)
    const step = Math.min(selectedCards.length, 6);
    setCurrentStep(step);
    
    // Calculate percentage (18% for each step, max 100%)
    const percentage = Math.min(step * 18, 100);
    setCompletionPercentage(percentage);
  }, [selectedCards]);

  const cards = [
    {
      id: 0,
      icon: <FaRegBuilding className="text-3xl" />,
      label: "Cities",
      step: 1,
    },
    {
      id: 1,
      icon: <AiOutlinePercentage className="text-3xl" />,
      label: "Annual Returns",
      step: 2,
    },
    {
      id: 2,
      icon: <GoHome className="text-3xl" />,
      label: "Property Type",
      step: 3,
    },
    {
      id: 3,
      icon: <PiCurrencyDollar className="text-3xl" />,
      label: "Budget",
      step: 4,
    },
    {
      id: 4,
      icon: <LuUsersRound className="text-3xl" />,
      label: "Tenant Type",
      step: 5,
    },
    {
      id: 5,
      icon: <LuClock3 className="text-3xl" />,
      label: "Tenure Left",
      step: 6,
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

  // Handle card selection - allow multiple selections
  const handleCardClick = (cardId) => {
    setSelectedCards(prev => {
      if (prev.includes(cardId)) {
        // Don't allow deselecting Cities (id: 0)
        if (cardId === 0) {
          return prev;
        }
        return prev.filter(id => id !== cardId);
      } else {
        // Add the new card to selection
        return [...prev, cardId];
      }
    });
  };

  // Skip button handler - navigates to explore properties
  const handleSkipClick = () => {
    navigate('/explore-properties');
  };

  // Show Properties button handler - also navigates to explore properties
  const handleShowPropertiesClick = () => {
    navigate('/explore-properties');
  };

  // Get step label based on selected cards
  const getStepLabel = () => {
    const selectedCardLabels = selectedCards
      .map(id => cards.find(card => card.id === id)?.label)
      .filter(Boolean);
    
    if (selectedCardLabels.length === 0) return "Cities";
    
    return selectedCardLabels[selectedCardLabels.length - 1];
  };

  return (
    <div
      className="max-w-[95%] md:max-w-[80%] lg:max-w-[65%] mx-auto px-4 lg:px-0 font-montserrat"
      data-aos="fade-up"
    >
      <h2
        className="text-center mt-4 md:mt-8 lg:mt-12 text-2xl md:text-4xl lg:text-4xl"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        Discover Opportunities Built for You
      </h2>

      {/* Cards Grid - Responsive */}
      <div
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-6 md:mt-8 lg:mt-12 hidden lg:grid"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        {cards.map((card, index) => {
          const isSelected = selectedCards.includes(card.id);
          const textColor = isSelected ? "text-[#EE2529]" : "text-gray-600";
          const borderColor = isSelected
            ? "border-[#EE2529]"
            : "border-[#767676]";

          return (
            <div
              key={card.id}
              className="flex flex-col cursor-pointer group"
              onClick={() => handleCardClick(card.id)}
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
                  group-hover:text-[#EE2529] text-sm md:text-base lg:text-lg font-semibold font-montserrat
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

      {/* Dynamic Step Section */}
      <div className="mt-6 md:mt-8" data-aos="fade-up" data-aos-delay="400">
        <div
          className="max-w-full md:max-w-[90%] lg:max-w-[90%] mx-auto shadow-xl rounded-xl p-4 sm:p-5 md:p-6 lg:p-8"
          data-aos="zoom-in"
          data-aos-delay="500"
        >
          <div
            className="flex items-center justify-between font-montserrat"
            data-aos="fade-up"
            data-aos-delay="550"
          >
            <p className="bg-[#FFF3CA] px-2 sm:px-2.5 md:px-3 lg:px-3 py-1 sm:py-1.5 md:py-2 lg:py-2 rounded-3xl text-xs">
              Step {currentStep} of 6
            </p>
            <p className="bg-[#FFF3CA] px-2 sm:px-2.5 md:px-3 lg:px-3 py-1 sm:py-1.5 md:py-2 lg:py-2 rounded-3xl text-xs">
              {completionPercentage}%
            </p>
          </div>

          <div
            className="mt-3 sm:mt-3.5 md:mt-4 lg:mt-4 text-center"
            data-aos="fade-up"
            data-aos-delay="600"
          >
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-2xl font-semibold">
              {getStepLabel() === "Cities" 
                ? "What's your City Preference?" 
                : `Select your ${getStepLabel()}`}
            </h2>
            <p className="text-gray-600 mt-1 text-sm sm:text-sm md:text-base lg:text-base">
              {getStepLabel() === "Cities" 
                ? "Select your City Preference." 
                : `Choose your preferred ${getStepLabel()}.`}
            </p>
          </div>

          {/* Only show city selection for Cities step */}
          {getStepLabel() === "Cities" && (
            <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-3 md:gap-4 lg:gap-4 mt-4 sm:mt-4 md:mt-6 lg:mt-6 max-w-full sm:max-w-[80%] md:max-w-[70%] lg:max-w-[60%] mx-auto font-montserrat">
              {cities.map((city, index) => {
                const isCitySelected = selectedCity === index;

                return (
                  <div
                    key={index}
                    onClick={() => setSelectedCity(index)}
                    className={`
                      p-2 sm:p-2.5 md:p-3 lg:p-4 rounded-lg cursor-pointer transition-all duration-300
                      flex items-center justify-center h-24 md:h-24 lg:h-32 w-full
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
                      className={`font-bold ${
                        isCitySelected ? "text-[#EE2529]" : "text-gray-800"
                      } text-center text-base text-wrap md:text-base lg:text-lg whitespace-nowrap`}
                    >
                      {city}
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          {/* For other steps, show a simple message */}
          {getStepLabel() !== "Cities" && (
            <div className="mt-8 text-center">
              <p className="text-gray-600">
                You've selected: {getStepLabel()}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Continue selecting other preferences or click "Show Properties" to see results.
              </p>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div
          className="flex justify-center gap-2 sm:gap-2 md:gap-2 lg:gap-2 mt-4 sm:mt-4 md:mt-5 lg:mt-5 font-montserrat mb-8 md:mb-12 lg:mb-16"
          data-aos="fade-up"
          data-aos-delay="800"
        >
          <button
            onClick={handleSkipClick}
            className="text-[#767676] border border-[#767676] rounded-md px-3 sm:px-3 md:px-4 lg:px-4 py-1.5 sm:py-1.5 md:py-2 lg:py-2 text-sm sm:text-sm md:text-base lg:text-base transition-all duration-300 hover:scale-105 hover:shadow-lg"
            data-aos="zoom-in-left"
            data-aos-delay="850"
          >
            Skip
          </button>
          <button
            onClick={handleShowPropertiesClick}
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