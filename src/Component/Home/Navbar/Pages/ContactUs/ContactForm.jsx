// components/ContactForm.jsx
import React, { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    message: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your form submission logic here
    // Example: API call, validation, etc.
  };

  const roles = [
    { value: "", label: "Select role", disabled: true },
    { value: "investor", label: "Investor" },
    { value: "property-owner", label: "Property Owner" },
    { value: "developer", label: "Developer" },
    { value: "broker", label: "Broker" },
    { value: "other", label: "Other" }
  ];

  return (
    <div className="w-full lg:w-1/2 bg-white p-4 md:p-5 lg:p-6 rounded-lg shadow-lg lg:h-full ">
      <h3 className="text-xl md:text-2xl font-semibold text-[#EE2529] mb-4 md:mb-6">
        Send us a Message
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5 h-full flex flex-col">
        {/* Name & Email Row */}
        <div className="flex flex-col sm:flex-row items-start justify-between gap-3 md:gap-4">
          {/* Name Field */}
          <div className="flex-1 w-full sm:w-auto">
            <label className="block text-gray-700 font-medium mb-1  text-sm md:text-base">
              Name *
            </label>
            <input
              type="text"
              name="name"
              placeholder="Your full name"
              className="w-full px-3 md:px-4 py-1.5  border border-[#000000] rounded-md focus:outline-none focus:ring-2 focus:ring-[#EE2529] focus:border-transparent transition text-sm md:text-base"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email Field */}
          <div className="flex-1 w-full sm:w-auto mt-3 sm:mt-0">
            <label className="block text-gray-700 font-medium mb-1 text-sm md:text-base">
              Email *
            </label>
            <input
              type="email"
              name="email"
              placeholder="Your email"
              className="w-full px-3 md:px-4 py-1.5  border border-[#000000] rounded-md focus:outline-none focus:ring-2 focus:ring-[#EE2529] focus:border-transparent transition text-sm md:text-base"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Phone & Role Row */}
        <div className="flex flex-col sm:flex-row items-start justify-between gap-3 md:gap-4">
          {/* Phone Field */}
          <div className="flex-1 w-full sm:w-auto">
            <label className="block text-gray-700 font-medium mb-1  text-sm md:text-base">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              placeholder="Mobile no"
              className="w-full px-3 md:px-4 py-1.5  border border-[#000000] rounded-md focus:outline-none focus:ring-2 focus:ring-[#EE2529] focus:border-transparent transition text-sm md:text-base"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          {/* Role Selection */}
          <div className="flex-1 w-full sm:w-auto mt-3 sm:mt-0 relative">
            <label className="block text-gray-700 font-medium mb-1  text-sm md:text-base">
              Choose Role
            </label>
            <select
              name="role"
              className="w-full px-3 md:px-4 py-1.5  border border-[#000000] rounded-md focus:outline-none focus:ring-2 focus:ring-[#EE2529] focus:border-transparent transition appearance-none bg-white pr-8 md:pr-10 text-sm md:text-base"
              value={formData.role}
              onChange={handleChange}
            >
              {roles.map((role, index) => (
                <option 
                  key={index} 
                  value={role.value} 
                  disabled={role.disabled}
                >
                  {role.label}
                </option>
              ))}
            </select>
            {/* Custom dropdown arrow */}
            <div className="absolute right-2 md:right-3 top-[36px] md:top-[40px] pointer-events-none">
              <svg className="w-4 h-4 md:w-5 md:h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
        </div>

        {/* Message Field */}
        <div className="flex-grow">
          <label className="block text-gray-700 font-medium mb-1 md:mb-1 text-sm md:text-base">
            Message *
          </label>
          <textarea
            name="message"
            placeholder="Please describe your inquiry in detail..."
            rows="3"
            className="w-full h-full min-h-[105px] px-3 md:px-4 py-1.5  border border-[#000000] rounded-md focus:outline-none focus:ring-2 focus:ring-[#EE2529] focus:border-transparent transition resize-none text-sm md:text-base"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full px-4 md:px-6 py-2 md:py-3 text-white font-semibold rounded-lg transition 
            bg-gradient-to-r from-[#EE2529] to-[#C73834]
            hover:opacity-90 text-base md:text-lg mt-1 md:mt-2"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactForm;