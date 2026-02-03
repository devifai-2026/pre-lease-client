import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Added useNavigate
import logo from "../assets/Navbar/Preleasegrid logo 1.png";

const Enquiry = () => {
    const { id } = useParams();
    const navigate = useNavigate(); // Initialize navigate
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        otp: ['', '', '', ''],
        termsAccepted: false,
        privacyAccepted: false
    });
    const [otpSent, setOtpSent] = useState(false);
    useEffect(() => {
  window.scrollTo({
    top: 0,
    behavior: "smooth", // Use "auto" for instant scroll
  });
}, []);

    // Sample property data - replace with actual data from your state/API
    const propertyData = {
        1: { type: 'Residential space', location: 'Pune, Mundhva', cost: '₹ 36.8 Crores' },
        2: { type: 'Commercial Space', location: 'Mumbai, Bandra', cost: '₹ 42.5 Crores' },
        3: { type: 'Industrial Space', location: 'Delhi, Noida', cost: '₹ 28.3 Crores' },
        4: { type: 'Residential Space', location: 'Bangalore, Koramangala', cost: '₹ 31.2 Crores' },
        5: { type: 'Commercial Space', location: 'Hyderabad, Hitech City', cost: '₹ 39.7 Crores' },
        6: { type: 'Industrial Space', location: 'Chennai, OMR', cost: '₹ 25.9 Crores' }
    };

    const currentProperty = propertyData[id] || propertyData[1];

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleOtpChange = (index, value) => {
        if (value.length <= 1 && /^\d*$/.test(value)) {
            const newOtp = [...formData.otp];
            newOtp[index] = value;
            setFormData(prev => ({ ...prev, otp: newOtp }));

            // Auto-focus next input
            if (value && index < 3) {
                const nextInput = document.getElementById(`otp-${index + 1}`);
                if (nextInput) nextInput.focus();
            }
        }
    };

    const handleSendOTP = () => {
        if (formData.phone.length === 10) {
            setOtpSent(true);
            // Add your OTP sending logic here
            console.log('Sending OTP to:', formData.phone);
        }
    };

    const handleSubmit = () => {
        if (formData.termsAccepted && formData.privacyAccepted) {
            console.log('Form submitted:', formData);
            // Add your form submission logic here
        }
    };

    const handleCancel = () => {
        // Navigate back to the previous page
        navigate(-1);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 font-montserrat">
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-6 sm:p-8">
                {/* Logo */}
                <div className="flex justify-start mb-6">
                    <img src={logo} alt="Preleasegrid Logo" className="h-12" />
                </div>

                <h1 className="text-2xl sm:text-3xl font-semibold text-center text-gray-800 mb-2 bg-[#FFFCF4] p-4">
                    Enquire About This Property
                </h1>
                {/* Title */}
                <p className="text-center text-gray-500 text-sm mb-8">
                    Please read carefully before confirming the Enquiry.
                </p>

                {/* Property Info */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    <div>
                        <p className="text-sm font-semibold text-gray-700 mb-1">Property Type</p>
                        <p className="text-gray-600">{currentProperty.type}</p>
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-gray-700 mb-1">Location</p>
                        <p className="text-gray-600">{currentProperty.location}</p>
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-gray-700 mb-1">Cost</p>
                        <p className="text-gray-600">{currentProperty.cost}</p>
                    </div>
                </div>

                {/* Description */}
                <div className="mb-6">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Description</p>
                    <p className="text-gray-600 text-sm">
                        The retail property diversification strategy focuses on spreading investments across various types of retail spaces, such as shopping malls, stand-alone stores, and mixed-use developments.
                    </p>
                </div>

                {/* Form Fields */}
                <div className="space-y-4">
                    {/* Name Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                First Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                placeholder="Enter your first name"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Last Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                placeholder="Enter your last name"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Enter your Email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
                        />
                    </div>

                    {/* Phone and OTP */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Confirm Phone No.
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    placeholder="+91"
                                    className="w-full px-2 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
                                    maxLength="10"
                                />
                                <button
                                    onClick={handleSendOTP}
                                    className="absolute right-1 top-1/2 transform -translate-y-1/2 px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors whitespace-nowrap text-sm font-medium"
                                >
                                    {otpSent ? "Resend OTP" : "Send OTP"}
                                </button>
                            </div>
                            <p className="text-xs text-[#262626] mt-2">
                                Didn't received OTP?{' '}
                                <button 
                                    onClick={handleSendOTP}
                                    className="text-[#262626] underline"
                                >
                                    Click to resend OTP.
                                </button>
                            </p>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">OTP</label>
                            <div className="flex gap-2 justify-between">
                                {formData.otp.map((digit, index) => (
                                    <input
                                        key={index}
                                        id={`otp-${index}`}
                                        type="text"
                                        value={digit}
                                        onChange={(e) => handleOtpChange(index, e.target.value)}
                                        maxLength="1"
                                        className="w-12 h-12 text-center border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none text-lg font-semibold"
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Checkboxes */}
                    <div className="space-y-3 pt-2">
                        <div className="flex items-start gap-2">
                            <input
                                type="checkbox"
                                name="termsAccepted"
                                id="terms"
                                checked={formData.termsAccepted}
                                onChange={handleInputChange}
                                className="mt-1 w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500 cursor-pointer"
                            />
                            <label htmlFor="terms" className="text-sm text-gray-600 cursor-pointer">
                                I agree to the{' '}
                                <a href="#" className="text-blue-600 underline">
                                    terms & conditions
                                </a>
                            </label>
                        </div>
                        <div className="flex items-start gap-2">
                            <input
                                type="checkbox"
                                name="privacyAccepted"
                                id="privacy"
                                checked={formData.privacyAccepted}
                                onChange={handleInputChange}
                                className="mt-1 w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500 cursor-pointer"
                            />
                            <label htmlFor="privacy" className="text-sm text-gray-600 cursor-pointer">
                                I agree to the{' '}
                                <a href="#" className="text-blue-600 underline">
                                    Privacy Policy
                                </a>
                            </label>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 pt-4">
                        <button
                            onClick={handleCancel}
                            className="flex-1 px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors font-semibold text-[#767676]"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={!formData.termsAccepted || !formData.privacyAccepted}
                            className="flex-1 px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed"
                        >
                            Enquire
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Enquiry;