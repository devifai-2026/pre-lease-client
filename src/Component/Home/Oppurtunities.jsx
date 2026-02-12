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
  const [activeStep, setActiveStep] = useState(0);
  
  // State for selections in each step (storing indices)
  const [selections, setSelections] = useState({
    cities: 0, // Default to first index (Pune)
    annualReturns: null,
    propertyType: null,
    budget: null,
    tenantType: null,
    tenureLeft: null
  });

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
      key: "cities",
      question: "What's your City Preference?",
      subtitle: "Select your City Preference.",
      options: ["Pune", "Mumbai", "New Delhi", "Gurgaon", "Mumbai", "New Delhi"]
    },
    {
      id: 1,
      icon: <AiOutlinePercentage className="text-3xl" />,
      label: "Annual Returns",
      key: "annualReturns",
      question: "What ROI are you expecting?",
      subtitle: "Select your annual returns.",
      options: ["3-5%", "5-7%", "7-9%", "9%+"]
    },
    {
      id: 2,
      icon: <GoHome className="text-3xl" />,
      label: "Property Type",
      key: "propertyType",
      question: "What kind of asset class are you looking at?",
      subtitle: "Select your property type.",
      options: ["Residential", "Commercial", "Industrial", "Co-working", "Retail", "Others"]
    },
    {
      id: 3,
      icon: <PiCurrencyDollar className="text-3xl" />,
      label: "Budget",
      key: "budget",
      question: "What is your investment range?",
      subtitle: "Select your range (in INR). Higher range unlocks premium options.",
      options: ["0-25L", "25-50L", "51-100L", "100L - 250L", "251-500L", "500L+"]
    },
    {
      id: 4,
      icon: <LuUsersRound className="text-3xl" />,
      label: "Tenant Type",
      key: "tenantType",
      question: "What is the type of tenant you are looking at?",
      subtitle: "Select your right tenant type.",
      options: ["Institutional", "Startup", "MNC", "Nationalized Company", "MSME", "Others"]
    },
    {
      id: 5,
      icon: <LuClock3 className="text-3xl" />,
      label: "Tenure Left",
      key: "tenureLeft",
      question: "What is the ideal case of the lease end tenure?",
      subtitle: "Select your right tenure range.",
      options: ["0-3 months", "3-6 months", "6-12 months", "12 -24 months", "24-60 months", "60+ months"]
    },
  ];

  const handleOptionSelect = (index) => {
    const currentCard = cards[activeStep];
    setSelections(prev => ({
      ...prev,
      [currentCard.key]: index
    }));
  };

  const handleStepClick = (index) => {
    setActiveStep(index);
  };

  const handleSkipClick = () => {
    if (activeStep < cards.length - 1) {
      setActiveStep(activeStep + 1);
    } else {
      navigate('/explore-properties');
    }
  };

  const handleShowPropertiesClick = () => {
    navigate('/explore-properties');
  };

  const completionPercentage = Math.round(((activeStep + 1) / cards.length) * 100);

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

      {/* Cards Grid - Restored original design */}
      <div
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-6 md:mt-8 lg:mt-12 hidden lg:grid"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        {cards.map((card, index) => {
          const isActive = activeStep === index;
          // Step is "selected" if it's the active one OR has a user selection (except Cities which counts as selected by default)
          const isSelected = isActive || (selections[card.key] !== null && card.key !== "cities") || (card.key === "cities" && selections.cities !== null);
          
          const textColor = isSelected ? "text-[#EE2529]" : "text-gray-600";
          const borderColor = isSelected ? "border-[#EE2529]" : "border-[#767676]";

          return (
            <div
              key={card.id}
              className="flex flex-col cursor-pointer group"
              onClick={() => handleStepClick(index)}
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
                  bg-white
                  hover:border-[#EE2529] hover:shadow-xl
                `}
              >
                <div className={`${textColor} transition-colors duration-300 group-hover:text-[#EE2529]`}>
                  {card.icon}
                </div>
                <p className={`
                  text-center mt-1 sm:mt-1.5 md:mt-2 lg:mt-2 
                  ${isSelected ? "font-semibold" : "font-medium"}
                  ${textColor}
                  transition-colors duration-300
                  group-hover:text-[#EE2529] text-sm md:text-base lg:text-lg font-semibold font-montserrat
                `}>
                  {card.label}
                </p>
              </div>

              <hr className={`
                mt-3 md:mt-3 lg:mt-3 border-t-4 
                ${borderColor}
                transition-colors duration-300
                group-hover:border-[#EE2529]
              `} />
            </div>
          );
        })}
      </div>

      {/* Mobile Tiles Display */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-6 lg:hidden">
         {cards.map((card, index) => {
           const isActive = activeStep === index;
           const isSelected = isActive || selections[card.key] !== null;
           const borderColor = isSelected ? "border-[#EE2529]" : "border-gray-200";
           return (
             <div 
              key={card.id} 
              onClick={() => handleStepClick(index)}
              className={`p-2 border-b-2 ${borderColor} flex flex-col items-center justify-center text-xs font-semibold ${isSelected ? 'text-[#EE2529]' : 'text-gray-500'}`}
             >
               {card.label}
             </div>
           )
         })}
      </div>

      {/* Dynamic Step Content */}
      <div className="mt-8 md:mt-10 max-w-[85%] mx-auto" data-aos="fade-up" data-aos-delay="400">
        <div className="bg-white shadow-2xl rounded-2xl p-6 md:p-10 lg:p-12 relative overflow-hidden ring-1 ring-gray-100">
          {/* Progress Indicators */}
          <div className="flex items-center justify-between mb-8">
            <span className="bg-[#FFF3CA] text-[#000] px-4 py-1.5 rounded-full text-sm font-medium">
              Step {activeStep + 1} of {cards.length}
            </span>
            <span className="bg-[#FFF3CA] text-[#000] px-4 py-1.5 rounded-full text-sm font-medium">
              {completionPercentage}%
            </span>
          </div>

          {/* Heading Section */}
          <div className="text-center mb-10">
            <h3 className="text-lg md:text-xl lg:text-2xl  text-gray-800 mb-3 text-wrap">
              {cards[activeStep].question}
            </h3>
            <p className="text-gray-500 text-lg">
              {cards[activeStep].subtitle}
            </p>
          </div>

          {/* Options Grid */}
          <div className={`grid gap-3 md:gap-4 mx-auto ${
            cards[activeStep].options.length <= 4 ? 'grid-cols-2 max-w-[200px] md:max-w-[280px]' : 'grid-cols-2 lg:grid-cols-3 max-w-[300px] md:max-w-[380px]'
          }`}>
            {cards[activeStep].options.map((option, idx) => {
              const isSelected = selections[cards[activeStep].key] === idx;
              return (
                <div
                  key={idx}
                  onClick={() => handleOptionSelect(idx)}
                  className={`
                    flex items-center justify-center text-center p-2 rounded-xl cursor-pointer transition-all duration-300
                    aspect-square w-full
                    bg-gradient-to-b from-[#76767633] to-white border border-gray-200
                    ${isSelected 
                      ? "shadow-[0_10px_20px_-8px_rgba(238,37,41,0.2)]" 
                      : "shadow-[0_4px_12px_-4px_rgba(0,0,0,0.08)] hover:shadow-[0_6px_16px_-4px_rgba(0,0,0,0.12)]"
                    }
                  `}
                >
                  <span className={`text-sm md:text-base   font-bold leading-tight ${isSelected ? "text-[#EE2529]" : "text-[#767676]"} px-1`}>
                    {option}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-8 mb-12 lg:mb-20">
          <button
            onClick={handleSkipClick}
            className="min-w-[120px] md:min-w-[140px] border-2 border-gray-300 text-gray-600 rounded-md px-6 py-3 font-semibold transition-all duration-300 hover:bg-gray-50 hover:border-gray-400"
          >
            Skip
          </button>
          <button
            onClick={handleShowPropertiesClick}
            className="min-w-[160px] md:min-w-[200px] bg-[#EE2529] text-white rounded-md px-8 py-3 font-semibold shadow-lg shadow-red-200 transition-all duration-300 hover:bg-[#d61e22] hover:scale-[1.02]"
          >
            Show Properties
          </button>
        </div>
      </div>
    </div>
  );
};

export default Opportunities;
