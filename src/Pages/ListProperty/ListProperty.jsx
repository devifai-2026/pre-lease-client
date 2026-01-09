// ListProperty.js
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlinePercentage } from "react-icons/ai";
import { BsBuilding } from "react-icons/bs";
import { GoArrowUpRight, GoHome } from "react-icons/go";
import { LuUserRound, LuUsersRound } from "react-icons/lu";
import { PiCurrencyDollar } from "react-icons/pi";
import PersonalDetails from "./Components/PersonalDetails";
import BasicDetails from "./Components/BasicDetails";
import LegalDetails from "./Components/LegalDetails";
import LeaseDetails from "./Components/LeaseDetails";
import FinancialDetails from "./Components/FinancialDetails";
import LocationDetails from "./Components/LocationDetails";

const ListProperty = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const navigate = useNavigate();
  
  // Store form refs for each step
  const formRefs = useRef({});

  const cards = [
    {
      id: 0,
      icon: <LuUserRound className="text-3xl" />,
      label: "Personal Details",
      component: <PersonalDetails ref={el => formRefs.current[0] = el} onNext={handleNext} onFormValid={setIsFormValid} />,
    },
    {
      id: 1,
      icon: <PiCurrencyDollar className="text-3xl" />,
      label: "Basic Details",
      component: <BasicDetails ref={el => formRefs.current[1] = el} onNext={handleNext} onFormValid={setIsFormValid} />,
    },
    {
      id: 2,
      icon: <AiOutlinePercentage className="text-3xl" />,
      label: "Legal Details",
      component: <LegalDetails ref={el => formRefs.current[2] = el} onNext={handleNext} onFormValid={setIsFormValid} />,
    },
    {
      id: 3,
      icon: <GoHome className="text-3xl" />,
      label: "Lease Details",
      component: <LeaseDetails ref={el => formRefs.current[3] = el} onNext={handleNext} onFormValid={setIsFormValid} />,
    },
    {
      id: 4,
      icon: <BsBuilding className="text-3xl" />,
      label: "Financial Details",
      component: <FinancialDetails ref={el => formRefs.current[4] = el} onNext={handleNext} onFormValid={setIsFormValid} />,
    },
    {
      id: 5,
      icon: <LuUsersRound className="text-3xl" />,
      label: "Location Details",
      component: <LocationDetails ref={el => formRefs.current[5] = el} onNext={handleNext} onFormValid={setIsFormValid} />,
    },
  ];

  // Calculate progress percentage based on desired percentages
  const getProgressPercentage = () => {
    const percentages = [18, 30, 40, 50, 70, 100];
    return percentages[Math.min(currentStep, percentages.length - 1)];
  };
  
  const progressPercentage = getProgressPercentage();

  function handleNext(formDataFromStep) {
    // Save the form data
    setFormData({
      ...formData,
      ...formDataFromStep,
    });

    // Mark current step as completed
    setCompletedSteps(prev => new Set(prev).add(currentStep));

    // Move to next step
    if (currentStep < cards.length - 1) {
      setCurrentStep(currentStep + 1);
      // Reset form validation for the next step
      setIsFormValid(false);
    } else {
      // All steps completed - handle final submission
      handleFinalSubmit();
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      // Set form as valid when going back (user has already filled this step)
      setIsFormValid(true);
    }
  };

  const handleFinalSubmit = () => {
    console.log("All steps completed! Final form data:", formData);
    // Here you can send the data to your backend API
    alert("Property listed successfully!");
    
    // Navigate to explore-properties page
    navigate("/explore-properties");
  };

  // Handle form submission - trigger the form submit
  const handleFormSubmit = () => {
    // Get the form element from the ref and submit it
    const form = formRefs.current[currentStep]?.form || 
                 formRefs.current[currentStep]?.querySelector('form') ||
                 document.querySelector(`form`);
    
    if (form) {
      form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    }
  };

  return (
    <div className="mt-10 max-w-[90%] md:max-w-[85%] lg:max-w-[60%] mx-auto">
      <div className="text-center space-y-3">
        <h2 className="text-3xl font-bold">List Your Property</h2>
        <p className="text-[#767676] text-sm">
          Connect with serious investors looking for pre-leased commercial{" "}
          <br /> properties across India
        </p>
        <button
          className="px-3 mt-4 sm:mt-7 py-2 text-white font-semibold rounded-3xl transition 
            bg-gradient-to-r from-[#EE2529] to-[#C73834]
            hover:opacity-90 text-sm w-36 text-nowrap
            grid grid-cols-[1fr_auto] items-center gap-2 mx-auto"
        >
          <span className="text-center">Bulk Upload</span>
          <GoArrowUpRight className="bg-white p-1 rounded-full text-[#EE2529] h-6 w-6" />
        </button>
      </div>
      
      <div className="">
        {/* Cards Grid */}
        <div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-6 md:mt-8"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          {cards.map((card, index) => {
            const isActive = index <= currentStep; // Active if current or previous step
            const isCompleted = completedSteps.has(index);
            const textColor = isActive ? "text-[#EE2529]" : "text-gray-600";
            const borderColor = isActive
              ? "border-[#EE2529]"
              : "border-[#767676]";

            return (
              <div
                key={card.id}
                className="flex flex-col cursor-pointer group relative"
                onClick={() => index <= currentStep && setCurrentStep(index)} // Only allow clicking on completed or current step
                data-aos="zoom-in"
                data-aos-delay={300 + index * 50}
              >
                {/* Card Content */}
                <div
                  className={`
                  shadow-lg rounded-xl p-3 sm:p-3 md:p-4 lg:p-4 border-t-4 
                  flex flex-col items-center justify-center 
                  h-[90px] sm:h-[95px] md:h-[100px] lg:h-[110px] w-full
                  transition-all duration-300
                  ${borderColor}
                  ${isActive ? "bg-white" : "bg-white"}
                  ${index <= currentStep ? "hover:border-[#EE2529] hover:shadow-xl" : ""}
                `}
                >
                  <div
                    className={`${textColor} transition-colors duration-300 ${index <= currentStep ? "group-hover:text-[#EE2529]" : ""}`}
                  >
                    {card.icon}
                  </div>
                  <p
                    className={`
                  text-center mt-1 sm:mt-1.5 md:mt-2 lg:mt-2 
                  ${isActive ? "font-semibold" : "font-medium"}
                  ${textColor}
                  transition-colors duration-300
                  ${index <= currentStep ? "group-hover:text-[#EE2529]" : ""} 
                  text-xs sm:text-xs md:text-sm lg:text-sm font-montserrat
                `}
                  >
                    {card.label}
                  </p>
                 
                </div>

                {/* Horizontal Line */}
                <hr
                  className={`
                mt-3 md:mt-3 lg:mt-3 border-t-4 
                ${borderColor}
                transition-colors duration-300
                ${index <= currentStep ? "group-hover:border-[#EE2529]" : ""}
              `}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Form Container */}
      <div className="mt-6 sm:mt-8 md:mt-10">
        <div 
          className="shadow-md rounded-md p-6"
          data-aos="zoom-in"
          data-aos-delay="500"
        >
          {/* Progress Bar and Step Info */}
          <div 
            className="flex items-center justify-between font-montserrat mb-4"
            data-aos="fade-up"
            data-aos-delay="550"
          >
            <p className="bg-[#FFF3CA] px-2 sm:px-2.5 md:px-3 lg:px-3 py-1 sm:py-1.5 md:py-2 lg:py-2 rounded-3xl text-xs">
              Step {currentStep + 1} of {cards.length}
            </p>
            <p className="bg-[#FFF3CA] px-2 sm:px-2.5 md:px-3 lg:px-3 py-1 sm:py-1.5 md:py-2 lg:py-2 rounded-3xl text-xs">
              {progressPercentage}%
            </p>
          </div>

          {/* Render Current Step Component */}
          <div data-aos="fade-up" data-aos-delay="600">
            {cards[currentStep].component}
          </div>
        </div>

        {/* Navigation Buttons - Outside shadow box */}
        <div className="mt-8 flex justify-between items-center">
          {/* Previous Button - Only show if not on first step */}
          {currentStep > 0 ? (
            <button
              onClick={handlePrevious}
              className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-medium border border-[#767676] text-[#767676] hover:bg-gray-50 transition"
            >
              Previous
            </button>
          ) : (
            <div></div>
          )}
          
          {/* Next Button - Only enabled when form is valid */}
          <button
            onClick={handleFormSubmit}
            disabled={!isFormValid}
            className={`px-8 sm:px-10 py-2.5 sm:py-3 rounded-lg font-medium text-lg transition ${
              isFormValid
                ? "bg-[#EE2529] text-white hover:bg-[#C73834] cursor-pointer shadow-lg"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {currentStep === cards.length - 1 ? "List Property" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListProperty;