import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";

const PersonalDetails = forwardRef(({ onNext, onFormValid }, ref) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    listUnder: "",
    otp: "",
    agreeTerms: false,
    agreePrivacy: false,
  });

  const [otpSent, setOtpSent] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false); // Track if form has been submitted

  // Validate form for enabling/disabling Next button
  useEffect(() => {
    const isValid = validateFormSilently();
    onFormValid(isValid);
  }, [formData, otpSent]);

  const validateFormSilently = () => {
    const mobileNumber = formData.mobile.replace(/\D/g, "");
    
    return (
      formData.firstName.trim() !== "" &&
      formData.lastName.trim() !== "" &&
      (!formData.email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) &&
      mobileNumber.length === 10 &&
      formData.listUnder !== "" &&
      (!otpSent || (formData.otp && formData.otp.length === 4)) &&
      formData.agreeTerms &&
      formData.agreePrivacy
    );
  };

  const validateFormWithErrors = () => {
    const newErrors = {};
    const mobileNumber = formData.mobile.replace(/\D/g, "");

    // Only show errors after submission
    if (isSubmitted) {
      if (!formData.firstName.trim()) {
        newErrors.firstName = "First Name is required";
      }
      if (!formData.lastName.trim()) {
        newErrors.lastName = "Last Name is required";
      }
      if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Invalid email format";
      }
      if (!formData.mobile || mobileNumber.length !== 10) {
        newErrors.mobile = "Mobile number must be 10 digits";
      }
      if (!formData.listUnder) {
        newErrors.listUnder = "Please select Broker or Owner";
      }
      if (otpSent && !formData.otp) {
        newErrors.otp = "OTP is required";
      }
      if (otpSent && formData.otp.length !== 4) {
        newErrors.otp = "OTP must be 4 digits";
      }
      if (!formData.agreeTerms) {
        newErrors.agreeTerms = "Please agree to terms & conditions";
      }
      if (!formData.agreePrivacy) {
        newErrors.agreePrivacy = "Please agree to Privacy Policy";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleMobileChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    
    // Format as Indian mobile number
    if (value.length > 5) {
      value = `${value.slice(0, 5)}-${value.slice(5, 10)}`;
    }
    
    setFormData({
      ...formData,
      mobile: value,
    });
    
    // Clear mobile error when user starts typing
    if (errors.mobile) {
      setErrors({
        ...errors,
        mobile: "",
      });
    }
  };

  const handleSendOtp = () => {
    const mobileNumber = formData.mobile.replace(/\D/g, "");
    if (mobileNumber.length === 10) {
      setOtpSent(true);
      // Here you would typically make API call to send OTP
      console.log("OTP sent to:", mobileNumber);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true); // Mark form as submitted
    
    if (validateFormWithErrors()) {
      if (onNext) {
        onNext(formData);
      }
    }
  };

  // Expose submit function to parent via ref
  useImperativeHandle(ref, () => ({
    form: {
      dispatchEvent: () => {
        handleSubmit({ preventDefault: () => {} });
      }
    },
    querySelector: () => null
  }), [formData, otpSent, isSubmitted]);

  const mobileNumber = formData.mobile.replace(/\D/g, "");

  return (
    <form onSubmit={handleSubmit} className="mt-4 sm:mt-5 md:mt-6">
      <div>
        <div 
          className="mt-3 sm:mt-3.5 md:mt-4 lg:mt-4 text-center"
          data-aos="fade-up"
          data-aos-delay="600"
        >
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-2xl font-semibold text-[#EE2529]">
            Personal Details
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6 mt-4">
          {/* First Name */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">
              First Name *
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter Your First Name"
              className={`w-full px-3 sm:px-3 py-2 sm:py-2 bg-[#F2F2F2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EE2529] focus:border-transparent transition ${
                isSubmitted && errors.firstName ? "border-red-500" : "border-gray-300"
              }`}
            />
            {isSubmitted && errors.firstName && (
              <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">
              Last Name *
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter Your Last Name"
              className={`w-full px-3 sm:px-3 py-2 sm:py-2 bg-[#F2F2F2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EE2529] focus:border-transparent transition ${
                isSubmitted && errors.lastName ? "border-red-500" : "border-gray-300"
              }`}
            />
            {isSubmitted && errors.lastName && (
              <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>
            )}
          </div>

          {/* Email and List Property Under side by side */}
          <div className="md:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2  gap-4 sm:gap-5 md:gap-6">
              {/* Email */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter Email Address"
                  className={`w-full px-3 sm:px-3 py-2 sm:py-2 bg-[#F2F2F2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EE2529] focus:border-transparent transition ${
                    isSubmitted && errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {isSubmitted && errors.email && (
                  <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                )}
              </div>

              {/* List Property Under - Rounded Checkbox Style */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  List Property Under *
                </label>
                <div className="flex gap-4 sm:gap-6 mt-4">
                  {/* Broker Checkbox */}
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <div className="relative">
                      <input
                        type="radio"
                        name="listUnder"
                        value="broker"
                        checked={formData.listUnder === "broker"}
                        onChange={handleChange}
                        className="sr-only peer"
                      />
                      <div className={`w-5 h-5 border-2 rounded-full peer-checked:border-[#EE2529] peer-checked:bg-[#EE2529] flex items-center justify-center transition ${
                        isSubmitted && errors.listUnder ? "border-red-500" : "border-gray-300"
                      }`}>
                        {formData.listUnder === "broker" && (
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        )}
                      </div>
                    </div>
                    <span className="text-sm text-gray-700">Broker</span>
                  </label>

                  {/* Owner Checkbox */}
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <div className="relative">
                      <input
                        type="radio"
                        name="listUnder"
                        value="owner"
                        checked={formData.listUnder === "owner"}
                        onChange={handleChange}
                        className="sr-only peer"
                      />
                      <div className={`w-5 h-5 border-2 rounded-full peer-checked:border-[#EE2529] peer-checked:bg-[#EE2529] flex items-center justify-center transition ${
                        isSubmitted && errors.listUnder ? "border-red-500" : "border-gray-300"
                      }`}>
                        {formData.listUnder === "owner" && (
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        )}
                      </div>
                    </div>
                    <span className="text-sm text-gray-700">Owner</span>
                  </label>
                </div>
                {isSubmitted && errors.listUnder && (
                  <p className="text-xs text-red-500 mt-1">{errors.listUnder}</p>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Number and OTP Section */}
          <div className="md:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
              {/* Mobile Number */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Mobile Number *
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleMobileChange}
                      placeholder="98765-43210"
                      maxLength="11"
                      className={`w-full px-3 sm:px-3 py-2 sm:py-2 pr-32 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EE2529] focus:border-transparent transition ${
                        isSubmitted && errors.mobile ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      disabled={mobileNumber.length !== 10 || otpSent}
                      className={`absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2 rounded-md font-medium text-sm transition ${
                        mobileNumber.length === 10 && !otpSent
                          ? "bg-[#EE2529] text-white hover:bg-[#C73834] cursor-pointer"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      {otpSent ? "Resend OTP" : "Send OTP"}
                    </button>
                  </div>
                </div>
                {isSubmitted && errors.mobile && (
                  <p className="text-xs text-red-500 mt-1">{errors.mobile}</p>
                )}
              </div>

              {/* OTP Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  OTP {otpSent && <span className="text-[#EE2529]">*</span>}
                </label>
                <div className="flex gap-2">
                  {[0, 1, 2, 3].map((index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength="1"
                      name={`otp${index}`}
                      value={formData.otp[index] || ""}
                      onChange={(e) => {
                        const otp = formData.otp.split("");
                        otp[index] = e.target.value.replace(/\D/g, "");
                        setFormData({ ...formData, otp: otp.join("") });
                        
                        // Clear OTP error when user starts typing
                        if (errors.otp) {
                          setErrors({
                            ...errors,
                            otp: "",
                          });
                        }
                        
                        // Auto focus next input
                        if (e.target.value && index < 3) {
                          document.querySelector(`[name="otp${index + 1}"]`)?.focus();
                        }
                        
                        // Auto focus previous input on backspace
                        if (!e.target.value && index > 0) {
                          document.querySelector(`[name="otp${index - 1}"]`)?.focus();
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Backspace" && !formData.otp[index] && index > 0) {
                          document.querySelector(`[name="otp${index - 1}"]`)?.focus();
                        }
                      }}
                      disabled={!otpSent}
                      className={`w-8 h-8 sm:w-10 sm:h-10 text-center text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EE2529] focus:border-transparent transition ${
                        isSubmitted && errors.otp ? "border-red-500" : otpSent ? "border-gray-300" : "border-gray-300 "
                      }  disabled:cursor-not-allowed`}
                    />
                  ))}
                </div>
                {otpSent && (
                  <p className="text-xs text-gray-500 mt-2">
                    Didn't receive OTP? <button type="button" onClick={handleSendOtp} className="text-[#EE2529] hover:underline">Resend OTP</button>
                  </p>
                )}
                {isSubmitted && errors.otp && (
                  <p className="text-xs text-red-500 mt-1">{errors.otp}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Checkboxes */}
        <div className="mt-6 sm:mt-8 space-y-3">
          <div className="flex items-start">
            <input
              type="checkbox"
              id="terms"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
              className="w-4 h-4 text-[#EE2529] border-gray-300 rounded focus:ring-[#EE2529] mt-1"
            />
            <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
              I agree to the <a className="text-blue-400 underline" href="">terms & conditions</a> 
            </label>
          </div>
          {isSubmitted && errors.agreeTerms && (
            <p className="text-xs text-red-500 ml-6">{errors.agreeTerms}</p>
          )}
          
          <div className="flex items-start">
            <input
              type="checkbox"
              id="privacy"
              name="agreePrivacy"
              checked={formData.agreePrivacy}
              onChange={handleChange}
              className="w-4 h-4 text-[#EE2529] border-gray-300 rounded focus:ring-[#EE2529] mt-1"
            />
            <label htmlFor="privacy" className="ml-2 text-sm text-gray-700">
              I agree to the <a className="text-blue-400 underline" href="">Privacy Policy</a> 
            </label>
          </div>
          {isSubmitted && errors.agreePrivacy && (
            <p className="text-xs text-red-500 ml-6">{errors.agreePrivacy}</p>
          )}
        </div>
      </div>
    </form>
  );
});

export default PersonalDetails;