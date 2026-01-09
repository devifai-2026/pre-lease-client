import React, { useState, useRef } from "react";
import { MdCloudUpload, MdDelete } from "react-icons/md";

const BrokerRegistration = () => {
  const [formData, setFormData] = useState({
    profilePhoto: null,
    fullName: "",
    email: "",
    phone: "",
    company: "",
    rera: "",
    locality: "",
    specializations: [],
    properties: "",
    deals: "",
    bio: "",
  });

  const [photoPreview, setPhotoPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file (JPEG, PNG, etc.)');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size should be less than 5MB');
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);

      setFormData((prev) => ({ ...prev, profilePhoto: file }));
    }
  };

  const handleRemovePhoto = () => {
    setPhotoPreview(null);
    setFormData((prev) => ({ ...prev, profilePhoto: null }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // This function triggers the file input click
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSpecializationToggle = (spec) => {
    setFormData((prev) => ({
      ...prev,
      specializations: prev.specializations.includes(spec)
        ? prev.specializations.filter((s) => s !== spec)
        : [...prev.specializations, spec],
    }));
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    alert("Registration submitted successfully!");
  };

  const specializations = [
    "MNC Client",
    "Industrial",
    "Residential",
    "Commercial",
    "Office Lease",
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-6 md:py-8 px-3 sm:px-4 md:px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
        {/* Header */}
        <div className="text-center p-4 sm:p-6 md:p-8 ">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#EE2529] mb-2">
            Broker Registration
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Join our network of trusted real estate professionals
          </p>
        </div>

        <div className="p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8">
          {/* Personal Details Section */}
          <div>
            <h2 className="text-lg font-bold text-[#EE2529] mb-4 sm:mb-6">
              Personal Details
            </h2>

            {/* Profile Photo */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-800 mb-3">
                Profile Photo
              </label>
              
              {photoPreview ? (
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="relative w-32 h-32">
                    <img
                      src={photoPreview}
                      alt="Profile preview"
                      className="w-full h-full object-cover rounded-lg border-2 border-gray-300"
                    />
                    <button
                      type="button"
                      onClick={handleRemovePhoto}
                      className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700 transition"
                    >
                      <MdDelete className="w-4 h-4" />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={triggerFileInput} // Fixed: Changed to triggerFileInput
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm"
                  >
                    Change Photo
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full sm:w-48 h-48 sm:h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#EE2529] transition p-4">
                  <div className="text-center">
                    <MdCloudUpload className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400 mx-auto mb-2" />
                    <span className="text-xs sm:text-sm text-gray-500">
                      Click to upload photo
                    </span>
                    <p className="text-xs text-gray-400 mt-1">
                      JPEG, PNG (Max 5MB)
                    </p>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            {/* Full Name and Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className="w-full px-3 py-2 sm:py-1.5 rounded-md border border-gray-300 focus:border-[#EE2529] focus:ring-1 focus:ring-[#EE2529] outline-none transition"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email address"
                  className="w-full px-3 py-2 sm:py-1.5 rounded-md border border-gray-300 focus:border-[#EE2529] focus:ring-1 focus:ring-[#EE2529] outline-none transition"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter your phone number"
                className="w-full px-3 py-2 sm:py-1.5 rounded-md border border-gray-300 focus:border-[#EE2529] focus:ring-1 focus:ring-[#EE2529] outline-none transition"
                required
              />
            </div>
          </div>

          {/* Business Details Section */}
          <div>
            <h2 className="text-lg font-bold text-[#EE2529] mb-4 sm:mb-6">
              Business Details
            </h2>

            {/* Company */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Company Associated with
              </label>
              <input
                type="text"
                name="company"
                placeholder="Enter company name"
                value={formData.company}
                onChange={handleInputChange}
                className="w-full px-3 py-2 sm:py-1.5 rounded-md border border-gray-300 focus:border-[#EE2529] focus:ring-1 focus:ring-[#EE2529] outline-none transition"
              />
            </div>

            {/* RERA and Locality */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  RERA Registration Number *
                </label>
                <input
                  type="text"
                  name="rera"
                  placeholder="Enter RERA number"
                  value={formData.rera}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 sm:py-1.5 rounded-md border border-gray-300 focus:border-[#EE2529] focus:ring-1 focus:ring-[#EE2529] outline-none transition"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Locality *
                </label>
                <input
                  type="text"
                  name="locality"
                  placeholder="Enter city of operation"
                  value={formData.locality}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 sm:py-1.5 rounded-md border border-gray-300 focus:border-[#EE2529] focus:ring-1 focus:ring-[#EE2529] outline-none transition"
                  required
                />
              </div>
            </div>
          </div>

          {/* Professional Information Section */}
          <div>
            <h2 className="text-lg font-bold text-[#EE2529] mb-4 sm:mb-6">
              Professional Information
            </h2>

            {/* Specializations */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-800 mb-3">
                Specializations *
              </label>
              <p className="text-xs text-[#EE2529] mb-3 bg-red-50 p-2 rounded">
                Note: Select at least one property type you specialize in
              </p>
              <div className="flex flex-wrap gap-2">
                {specializations.map((spec) => (
                  <button
                    key={spec}
                    type="button"
                    onClick={() => handleSpecializationToggle(spec)}
                    className={`px-3 py-1.5 text-sm rounded-full border transition ${
                      formData.specializations.includes(spec)
                        ? "bg-yellow-100 border-yellow-400 text-yellow-800"
                        : "border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50"
                    }`}
                  >
                    {spec}
                  </button>
                ))}
              </div>
            </div>

            {/* Properties and Deals */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Properties Listed *
                </label>
                <input
                  type="number"
                  name="properties"
                  placeholder="Enter number of Properties Listed"
                  value={formData.properties}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 sm:py-1.5 rounded-md border border-gray-300 focus:border-[#EE2529] focus:ring-1 focus:ring-[#EE2529] outline-none transition"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Deals Closed *
                </label>
                <input
                  type="number"
                  name="deals"
                  placeholder="Enter number of Deals Closed"
                  value={formData.deals}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 sm:py-1.5 rounded-md border border-gray-300 focus:border-[#EE2529] focus:ring-1 focus:ring-[#EE2529] outline-none transition"
                  required
                />
              </div>
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Personal Bio *
              </label>
              <textarea
                name="bio"
                placeholder="Tell us about yourself, experience, expertise, etc."
                value={formData.bio}
                onChange={handleInputChange}
                className="w-full px-3 py-2 sm:py-1.5 rounded-md border border-gray-300 focus:border-[#EE2529] focus:ring-1 focus:ring-[#EE2529] outline-none transition resize-none h-32"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-4 sm:pt-6">
            <button
              onClick={handleSubmit}
              className="px-6 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-[#EE2529] to-[#C73834] text-white font-semibold rounded-lg hover:opacity-90 transition-all duration-300 shadow-md hover:shadow-lg text-sm sm:text-base w-full sm:w-auto"
            >
              Submit Registration
            </button>
          </div>
        </div>

        {/* Hidden file input that's accessible by both upload areas */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handlePhotoUpload}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default BrokerRegistration;