import React, { useState } from "react";
import img from "../../../../assets/ContactBroker/Vector.png";
import { FaChevronDown } from "react-icons/fa";
import CallEmail from "./CallEmail";

const ContactBroker = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    propertyType: "",
    budgetRange: "",
    timeline: "",
    additionalNotes: "",
  });

  const propertyTypes = [
    "Residential Apartment",
    "Commercial Office",
    "Retail Space",
    "Industrial Property",
    "Plot/Land",
    "Villa/Bungalow",
  ];

  const budgetRanges = [
    "Under ₹50 Lakhs",
    "₹50 Lakhs - ₹1 Crore",
    "₹1 Crore - ₹2 Crores",
    "₹2 Crores - ₹5 Crores",
    "₹5 Crores - ₹10 Crores",
    "Above ₹10 Crores",
  ];

  const timelines = [
    "Immediately",
    "Within 1 Month",
    "Within 3 Months",
    "Within 6 Months",
    "Within 1 Year",
    "Just Exploring",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add form submission logic here
  };

  return (
    <div className="mt-10 font-montserrat max-w-3xl mx-auto px-4">
      {/* Icon with circular background */}
      <div className="flex justify-center rounded-full bg-[#FFF3CA] p-10 w-fit mx-auto">
        <img className="w-20 h-20" src={img} alt="" />
      </div>

      {/* Heading section */}
      <div className="space-y-3 mt-6 mb-8">
        <h2 className="text-center font-bold text-2xl text-[#EE2529]">
          Connect with Broker
        </h2>
        <p className="text-center text-[#262626] text-sm max-w-2xl mx-auto">
          Let us help you find the perfect property. Fill out the form below and
          our expert broker will reach out to you.
        </p>
      </div>

      {/* Main form container */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-lg p-6 md:p-8 max-w-3xl mx-auto"
      >
        {/* Form header */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-[#262626] mb-2">
            Your Information
          </h3>
          <p className="text-[#767676] text-sm">
            Tell us about your property requirements and preferences
          </p>
        </div>

        {/* Section: Personal Details */}
        <div className="mb-8">
          <h4 className="text-lg font-semibold text-[#EE2529] mb-4">
            Personal Details
          </h4>

          {/* Full Name and Email row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-[#262626] mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full p-2 bg-[#F9F9F9] rounded-lg border border-[#E0E0E0] focus:outline-none focus:ring-2 focus:ring-[#EE2529] focus:border-transparent placeholder:text-[#767676]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#262626] mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                className="w-full p-2 bg-[#F9F9F9] rounded-lg border border-[#E0E0E0] focus:outline-none focus:ring-2 focus:ring-[#EE2529] focus:border-transparent placeholder:text-[#767676]"
              />
            </div>
          </div>

          {/* Phone Number */}
          <div className="max-w-md">
            <label className="block text-sm font-medium text-[#262626] mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="w-full p-2 bg-[#F9F9F9] rounded-lg border border-[#E0E0E0] focus:outline-none focus:ring-2 focus:ring-[#EE2529] focus:border-transparent placeholder:text-[#767676]"
            />
          </div>
        </div>

        {/* Section: Property Requirements */}
        <div className="mb-8">
          <h4 className="text-lg font-semibold text-[#EE2529] mb-4">
            Property Requirements
          </h4>

          {/* Type of Property Interest */}
          <div className="mb-4 max-w-2xl">
            <label className="block text-sm font-medium text-[#262626] mb-2">
              Type of Property Interest <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                name="propertyType"
                value={formData.propertyType}
                onChange={handleChange}
                required
                className="w-full p-2 bg-[#F9F9F9] rounded-lg border border-[#E0E0E0] text-[#767676] focus:outline-none focus:ring-2 focus:ring-[#EE2529] focus:border-transparent appearance-none cursor-pointer"
              >
                <option value="">Select Property Type</option>
                {propertyTypes.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <FaChevronDown
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#767676] pointer-events-none"
                size={16}
              />
            </div>
          </div>

          {/* Budget Range and Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
            {/* Budget Range */}
            <div>
              <label className="block text-sm font-medium text-[#262626] mb-2">
                Budget Range <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  name="budgetRange"
                  value={formData.budgetRange}
                  onChange={handleChange}
                  required
                  className="w-full p-2 bg-[#F9F9F9] rounded-lg border border-[#E0E0E0] text-[#767676] focus:outline-none focus:ring-2 focus:ring-[#EE2529] focus:border-transparent appearance-none cursor-pointer"
                >
                  <option value="">Select Budget Range</option>
                  {budgetRanges.map((range, index) => (
                    <option key={index} value={range}>
                      {range}
                    </option>
                  ))}
                </select>
                <FaChevronDown
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#767676] pointer-events-none"
                  size={16}
                />
              </div>
            </div>

            {/* When are you looking to invest? */}
            <div>
              <label className="block text-sm font-medium text-[#262626] mb-2">
                When are you looking to invest?{" "}
                <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleChange}
                  required
                  className="w-full p-2 bg-[#F9F9F9] rounded-lg border border-[#E0E0E0] text-[#767676] focus:outline-none focus:ring-2 focus:ring-[#EE2529] focus:border-transparent appearance-none cursor-pointer"
                >
                  <option value="">Select Timeline</option>
                  {timelines.map((time, index) => (
                    <option key={index} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
                <FaChevronDown
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#767676] pointer-events-none"
                  size={16}
                />
              </div>
            </div>
          </div>

          {/* Additional Notes - Textarea with placeholder */}
          <div className="mt-4 max-w-2xl">
            <label className="block text-sm font-medium text-[#262626] mb-2">
              Additional Notes / Requirements
            </label>
            <textarea
              name="additionalNotes"
              value={formData.additionalNotes}
              onChange={handleChange}
              placeholder="Tell us more about your specific requirements, preferred locations, or any other details..."
              rows="4"
              className="w-full p-2 bg-[#F9F9F9] rounded-lg border border-[#E0E0E0] text-[#262626] focus:outline-none focus:ring-2 focus:ring-[#EE2529] focus:border-transparent resize-none placeholder:text-[#767676]"
            />
          </div>
        </div>

        {/* Expert Consultation section */}
        <div className="bg-[#F2F2F2] rounded-xl p-6 mb-8 max-w-2xl">
          <h4 className="text-lg font-semibold text-[#262626] mb-2">
            Expert Consultation
          </h4>
          <p className="text-[#767676] text-sm">
            Our experienced brokers will analyze your requirements and provide
            personalized property recommendations with detailed financial
            projections.
          </p>
        </div>

        {/* Send button */}
        <div className="max-w-2xl">
          <button
            type="submit"
            className="py-3 px-8 bg-gradient-to-r from-[#EE2529] to-[#C73834] text-white font-medium mx-auto flex rounded-lg hover:opacity-90 transition-all duration-200"
          >
            Send
          </button>
        </div>
      </form>
      <CallEmail></CallEmail>
    </div>
  );
};

export default ContactBroker;
