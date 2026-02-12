import React, { useState } from 'react';
import { IoClose } from "react-icons/io5";
import logo from "../../../assets/Navbar/Preleasegrid logo 1.png";

const SignUp = ({ onClose, onBack, onVerifyRequest, selectedRole }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        mobileNumber: '',
        email: '',
        reraNumber: ''
    });
    const [errors, setErrors] = useState({});
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [agreePrivacy, setAgreePrivacy] = useState(false);
    const [touched, setTouched] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        // Apply input restrictions based on field type
        let filteredValue = value;
        
        switch (name) {
            case 'firstName':
            case 'lastName':
                // Allow only letters and spaces (for names like "Mary Ann")
                filteredValue = value.replace(/[^A-Za-z\s]/g, '');
                break;
            case 'mobileNumber':
                // Allow only numbers, max 10 digits
                filteredValue = value.replace(/\D/g, '').slice(0, 10);
                break;
            case 'email':
                // Allow email characters
                filteredValue = value;
                break;
            case 'reraNumber':
                // Allow alphanumeric characters
                filteredValue = value.toUpperCase().replace(/[^A-Z0-9]/g, '');
                break;
            default:
                filteredValue = value;
        }
        
        setFormData({
            ...formData,
            [name]: filteredValue
        });
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ''
            });
        }
        
        // Validate on change for better UX
        if (touched[name]) {
            validateField(name, filteredValue);
        }
    };

    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched({
            ...touched,
            [name]: true
        });
        validateField(name, formData[name]);
    };

    const validateField = (name, value) => {
        let error = '';
        
        switch (name) {
            case 'firstName':
                if (!value.trim()) {
                    error = 'First name is required';
                } else if (!/^[A-Za-z\s]+$/.test(value)) {
                    error = 'Only letters and spaces allowed';
                } else if (value.trim().length < 2) {
                    error = 'Minimum 2 characters required';
                } else if (value.trim().length > 50) {
                    error = 'Maximum 50 characters allowed';
                }
                break;
            case 'lastName':
                if (!value.trim()) {
                    error = 'Last name is required';
                } else if (!/^[A-Za-z\s]+$/.test(value)) {
                    error = 'Only letters and spaces allowed';
                } else if (value.trim().length < 1) {
                    error = 'Minimum 1 character required';
                } else if (value.trim().length > 50) {
                    error = 'Maximum 50 characters allowed';
                }
                break;
            case 'mobileNumber':
                if (!value.trim()) {
                    error = 'Mobile number is required';
                } else if (!/^[0-9]{10}$/.test(value)) {
                    error = 'Must be exactly 10 digits';
                }
                break;
            case 'email':
                if (!value.trim()) {
                    error = 'Email is required';
                } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    error = 'Please enter a valid email address';
                } else if (value.trim().length > 100) {
                    error = 'Maximum 100 characters allowed';
                }
                break;
            case 'reraNumber':
                if ((selectedRole === 'broker' || selectedRole === 'owner') && !value.trim()) {
                    error = 'RERA number is required for ' + selectedRole;
                }
                break;
            default:
                break;
        }
        
        setErrors(prev => ({ ...prev, [name]: error }));
        return !error;
    };

    const validateForm = () => {
        const newErrors = {};
        
        // First Name validation
        if (!formData.firstName.trim()) {
            newErrors.firstName = 'First name is required';
        } else if (!/^[A-Za-z\s]+$/.test(formData.firstName)) {
            newErrors.firstName = 'Only letters and spaces allowed';
        } else if (formData.firstName.trim().length < 2) {
            newErrors.firstName = 'Minimum 2 characters required';
        }
        
        // Last Name validation
        if (!formData.lastName.trim()) {
            newErrors.lastName = 'Last name is required';
        } else if (!/^[A-Za-z\s]+$/.test(formData.lastName)) {
            newErrors.lastName = 'Only letters and spaces allowed';
        } else if (formData.lastName.trim().length < 1) {
            newErrors.lastName = 'Minimum 1 character required';
        }
        
        // Mobile Number validation
        if (!formData.mobileNumber.trim()) {
            newErrors.mobileNumber = 'Mobile number is required';
        } else if (!/^[0-9]{10}$/.test(formData.mobileNumber)) {
            newErrors.mobileNumber = 'Must be exactly 10 digits';
        }
        
        // Email validation (now required)
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }
        
        // RERA validation if applicable
        if ((selectedRole === 'broker' || selectedRole === 'owner') && !formData.reraNumber.trim()) {
            newErrors.reraNumber = 'RERA number is required';
        }
        
        // Checkboxes validation
        if (!agreeTerms) newErrors.terms = 'You must agree to terms & conditions';
        if (!agreePrivacy) newErrors.privacy = 'You must agree to privacy policy';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // Mark all fields as touched
        const allTouched = {
            firstName: true,
            lastName: true,
            mobileNumber: true,
            email: true
        };
        setTouched(allTouched);
        
        if (validateForm()) {
            try {
                // Simulate API call to submit form data and send OTP
                // In a real application, you would make an API call here
                console.log('Form submitted:', formData);
                
                // Simulate API delay
                await new Promise(resolve => setTimeout(resolve, 500));
                
                // If form is valid, call the onVerifyRequest callback with all form data
                if (onVerifyRequest) {
                    onVerifyRequest(formData);
                }
            } catch (error) {
                console.error('Error submitting form:', error);
                setErrors({ submit: 'Failed to submit form. Please try again.' });
            } finally {
                setIsSubmitting(false);
            }
        } else {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] font-montserrat">
                {/* Modal Header */}
                <div className="flex items-center justify-between p-3">
                    <div className="flex items-center gap-2">
                        <img src={logo} alt="logo" className="h-8" />
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 text-2xl md:text-3xl"
                        disabled={isSubmitting}
                    >
                        <IoClose className="text-[#EE2529]" />
                    </button>
                </div>

                {/* Modal Content */}
                <h1 className="text-xl font-semibold text-center mb-3 bg-[#FFFCF4] py-2 font-montserrat">
                    Create your account
                </h1>
                <div className="px-8 pb-2 pt-2">
                    {/* Header */}
                    <div className="mb-6">
                        <p className="text-gray-600 text-center text-base font-montserrat">
                            Just a few details to get you started
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-3 font-montserrat">
                        {/* First Name and Last Name side by side */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {/* First Name */}
                            <div>
                                <label className="block text-base font-medium text-gray-700 mb-2 font-montserrat">
                                    First Name *
                                </label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Enter your first name"
                                    className={`w-full px-4 py-2 border-2 border-[#767676] rounded-lg focus:outline-none focus:ring-2 focus:border-transparent text-base font-montserrat ${
                                        errors.firstName && touched.firstName 
                                            ? 'border-red-500 focus:ring-red-500' 
                                            : 'border-gray-300 focus:ring-red-500'
                                    }`}
                                    maxLength={50}
                                    disabled={isSubmitting}
                                />
                                {errors.firstName && touched.firstName && (
                                    <p className="mt-1 text-sm text-red-600 font-montserrat">{errors.firstName}</p>
                                )}
                            </div>

                            {/* Last Name */}
                            <div>
                                <label className="block text-base font-medium text-gray-700 mb-2 font-montserrat">
                                    Last Name *
                                </label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Enter your last name"
                                    className={`w-full px-4 py-2 border-2 border-[#767676] rounded-lg focus:outline-none focus:ring-2 focus:border-transparent text-base font-montserrat ${
                                        errors.lastName && touched.lastName 
                                            ? 'border-red-500 focus:ring-red-500' 
                                            : 'border-gray-300 focus:ring-red-500'
                                    }`}
                                    maxLength={50}
                                    disabled={isSubmitting}
                                />
                                {errors.lastName && touched.lastName && (
                                    <p className="mt-1 text-sm text-red-600 font-montserrat">{errors.lastName}</p>
                                )}
                            </div>
                        </div>

                        {/* Mobile Number */}
                        <div>
                            <label className="block text-base font-medium text-gray-700 mb-2 font-montserrat">
                                Mobile Number *
                            </label>
                            <input
                                type="tel"
                                name="mobileNumber"
                                value={formData.mobileNumber}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Enter 10-digit mobile number"
                                className={`w-full px-4 py-2 border-2 border-[#767676] rounded-lg focus:outline-none focus:ring-2 focus:border-transparent text-base font-montserrat ${
                                    errors.mobileNumber && touched.mobileNumber 
                                        ? 'border-red-500 focus:ring-red-500' 
                                        : 'border-gray-300 focus:ring-red-500'
                                }`}
                                maxLength={10}
                                inputMode="numeric"
                                disabled={isSubmitting}
                            />
                            {errors.mobileNumber && touched.mobileNumber && (
                                <p className="mt-1 text-sm text-red-600 font-montserrat">{errors.mobileNumber}</p>
                            )}
                            {formData.mobileNumber && !errors.mobileNumber && touched.mobileNumber && (
                                <p className="mt-1 text-sm text-green-600 font-montserrat">✓ Valid mobile number</p>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-base font-medium text-gray-700 mb-2 font-montserrat">
                                Email *
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Enter your Email"
                                className={`w-full px-4 py-2 border-2 border-[#767676] rounded-lg focus:outline-none focus:ring-2 focus:border-transparent text-base font-montserrat ${
                                    errors.email && touched.email 
                                        ? 'border-red-500 focus:ring-red-500' 
                                        : 'border-gray-300 focus:ring-red-500'
                                }`}
                                maxLength={100}
                                disabled={isSubmitting}
                            />
                            {errors.email && touched.email && (
                                <p className="mt-1 text-sm text-red-600 font-montserrat">{errors.email}</p>
                            )}
                            {formData.email && !errors.email && touched.email && (
                                <p className="mt-1 text-sm text-green-600 font-montserrat">✓ Valid email format</p>
                            )}
                        </div>

                        {/* RERA Number (Conditional) */}
                        {(selectedRole === 'broker' || selectedRole === 'owner') && (
                            <div>
                                <label className="block text-base font-medium text-gray-700 mb-2 font-montserrat">
                                    RERA Registration Number *
                                </label>
                                <input
                                    type="text"
                                    name="reraNumber"
                                    value={formData.reraNumber}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Enter RERA number"
                                    className={`w-full px-4 py-2 border-2 border-[#767676] rounded-lg focus:outline-none focus:ring-2 focus:border-transparent text-base font-montserrat ${
                                        errors.reraNumber && touched.reraNumber 
                                            ? 'border-red-500 focus:ring-red-500' 
                                            : 'border-gray-300 focus:ring-red-500'
                                    }`}
                                    disabled={isSubmitting}
                                />
                                {errors.reraNumber && touched.reraNumber && (
                                    <p className="mt-1 text-sm text-red-600 font-montserrat">{errors.reraNumber}</p>
                                )}
                            </div>
                        )}

                        {/* Checkboxes with validation */}
                        <div className="space-y-3">
                            <div className="flex items-start">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    checked={agreeTerms}
                                    onChange={(e) => {
                                        setAgreeTerms(e.target.checked);
                                        if (errors.terms) {
                                            setErrors({...errors, terms: ''});
                                        }
                                    }}
                                    className="h-5 w-5 text-red-600 focus:ring-red-500 border-gray-300 rounded mt-1"
                                    disabled={isSubmitting}
                                />
                                <div className="ml-3">
                                    <label htmlFor="terms" className="text-base text-gray-700 font-montserrat">
                                        agree to the{' '}
                                        <a 
                                            href="#" 
                                            className="text-blue-600 underline hover:text-blue-800 font-montserrat"
                                            onClick={(e) => e.preventDefault()}
                                        >
                                            terms & conditions
                                        </a>
                                    </label>
                                    {errors.terms && (
                                        <p className="mt-1 text-sm text-red-600 font-montserrat">{errors.terms}</p>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-start">
                                <input
                                    type="checkbox"
                                    id="privacy"
                                    checked={agreePrivacy}
                                    onChange={(e) => {
                                        setAgreePrivacy(e.target.checked);
                                        if (errors.privacy) {
                                            setErrors({...errors, privacy: ''});
                                        }
                                    }}
                                    className="h-5 w-5 text-red-600 focus:ring-red-500 border-gray-300 rounded mt-1"
                                    disabled={isSubmitting}
                                />
                                <div className="ml-3">
                                    <label htmlFor="privacy" className="text-base text-gray-700 font-montserrat">
                                        agree to the{' '}
                                        <a 
                                            href="#" 
                                            className="text-blue-600 underline hover:text-blue-800 font-montserrat"
                                            onClick={(e) => e.preventDefault()}
                                        >
                                            Privacy Policy
                                        </a>
                                    </label>
                                    {errors.privacy && (
                                        <p className="mt-1 text-sm text-red-600 font-montserrat">{errors.privacy}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Submit error */}
                        {errors.submit && (
                            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                                <p className="text-red-600 text-sm font-montserrat text-center">
                                    {errors.submit}
                                </p>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex items-center gap-5 justify-center mt-6">
                            <button
                                type="button"
                                onClick={onBack}
                                className="w-full border-2 border-[#767676] text-[#767676] py-3 rounded-lg font-medium text-base transition-colors hover:bg-gray-50 font-montserrat disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={isSubmitting}
                            >
                                Back
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full bg-gradient-to-r from-[#EE2529] to-[#C73834] text-white py-3 rounded-lg font-medium text-base transition-opacity font-montserrat ${
                                    isSubmitting 
                                        ? 'opacity-70 cursor-not-allowed' 
                                        : 'hover:opacity-90'
                                }`}
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Processing...
                                    </span>
                                ) : 'Continue'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;