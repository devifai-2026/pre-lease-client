import React, { useState, useEffect } from 'react';
import { IoClose } from "react-icons/io5";
import logo from "../../../assets/Navbar/Preleasegrid logo 1.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, signup, reset } from "../../../redux/slices/authSlice";

const VerifyNumber = ({ onClose, onBack, mobileNumber, signupData, selectedRole }) => {
    const [otp, setOtp] = useState(['', '', '', '']);
    const [errors, setErrors] = useState({});
    const [isResending, setIsResending] = useState(false);
    const [timer, setTimer] = useState(60); // 1 minute timer
    const [showErrorAfterTimeout, setShowErrorAfterTimeout] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    // Handle success or error from Redux
    useEffect(() => {
        if (isError) {
            setErrors({ verify: message });
        }

        if (isSuccess && user) {
            // Role from backend might be capitalized
            const userRole = user?.role?.toLowerCase() || 'investor';
            navigateToDashboard(userRole);
            onClose();
            dispatch(reset());
        }
    }, [user, isError, isSuccess, message, navigate, onClose, dispatch]);

    // Timer countdown
    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer(prev => prev - 1);
            }, 1000);
            return () => clearInterval(interval);
        } else if (timer === 0 && !showErrorAfterTimeout) {
            setShowErrorAfterTimeout(true);
        }
    }, [timer, showErrorAfterTimeout]);

    // Format timer display
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    // Handle OTP input change
    const handleOtpChange = (index, value) => {
        // Allow only numbers
        if (!/^\d*$/.test(value)) return;
        
        const newOtp = [...otp];
        
        // If value is empty, clear the current field
        if (value === '') {
            newOtp[index] = '';
        } else {
            // Allow only one digit per input
            newOtp[index] = value.slice(-1);
            
            // Auto-focus next input if current input has a value
            if (value && index < 3) {
                const nextInput = document.getElementById(`otp-input-${index + 1}`);
                if (nextInput) nextInput.focus();
            }
        }
        
        setOtp(newOtp);
        
        // Clear OTP error when user starts typing
        if (errors.otp) {
            setErrors({...errors, otp: ''});
        }
    };

    // Handle paste event
    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text/plain').trim();
        
        if (/^\d{4}$/.test(pastedData)) {
            const newOtp = pastedData.split('').slice(0, 4);
            setOtp(newOtp);
            
            // Focus on last input
            const lastInput = document.getElementById('otp-input-3');
            if (lastInput) lastInput.focus();
        }
    };

    // Handle backspace/delete key
    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' || e.key === 'Delete') {
            e.preventDefault();
            
            const newOtp = [...otp];
            
            if (newOtp[index] === '' && index > 0) {
                // If current field is empty and not first field, focus previous
                newOtp[index - 1] = '';
                setOtp(newOtp);
                const prevInput = document.getElementById(`otp-input-${index - 1}`);
                if (prevInput) prevInput.focus();
            } else {
                // Clear current field
                newOtp[index] = '';
                setOtp(newOtp);
            }
        }
    };

    // Resend OTP
    const handleResendOtp = async () => {
        if (isResending) return;
        
        setIsResending(true);
        try {
            // Here you would typically make an API call to resend OTP
            console.log('Resending OTP to:', mobileNumber);
            
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 500));
            
            // Reset timer and states
            setTimer(60);
            setShowErrorAfterTimeout(false);
            
            // Clear previous OTP and errors
            setOtp(['', '', '', '']);
            setErrors({});
            
            // Focus on first input
            const firstInput = document.getElementById('otp-input-0');
            if (firstInput) {
                firstInput.focus();
            }
            
            // Show success message (optional)
            console.log('OTP resent successfully');
            
        } catch (error) {
            console.error('Error resending OTP:', error);
            setErrors({ resend: 'Failed to resend OTP. Please try again.' });
        } finally {
            setIsResending(false);
        }
    };

    // Contact support
    const handleContactSupport = () => {
        console.log('Contacting support...');
        alert('Please contact our support team at support@preleasegrid.com or call +91-XXXX-XXXXXX');
    };

    // Validate OTP
    const validateOtp = () => {
        if (otp.some(digit => digit === '')) {
            return { otp: 'Please enter all 4 digits' };
        }
        
        if (!otp.every(digit => /^\d$/.test(digit))) {
            return { otp: 'Invalid OTP format' };
        }
        
        return {};
    };

    // Navigate to specific dashboard based on user role
    const navigateToDashboard = (role) => {
        if (!role) {
            navigate('/');
            return;
        }
        
        const roleLower = role.toLowerCase();
        // Navigate to specific dashboard based on role
        switch(roleLower) {
            case 'investor':
                navigate('/investor-dashboard');
                break;
            case 'broker':
                navigate('/broker-dashboard');
                break;
            case 'owner':
                navigate('/owner-dashboard');
                break;
            default:
                navigate('/');
        }
    };

    // Handle verify
    const handleVerify = async (e) => {
        e.preventDefault();
        
        const validationErrors = validateOtp();
        
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        
        const enteredOtp = otp.join('');
        
        if (signupData) {
            // If we have signup data, call signup thunk
            const signupPayload = {
                ...signupData,
                roleName: selectedRole ? selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1) : 'Broker',
                otp: enteredOtp,
                deviceId: 'web-client'
            };
            dispatch(signup(signupPayload));
        } else {
            // Otherwise it's a login
            dispatch(login({
                mobileNumber: mobileNumber,
                otp: enteredOtp,
                deviceId: 'web-client'
            }));
        }
    };

    // Format mobile number for display
    const formattedNumber = mobileNumber 
        ? `+91 ${mobileNumber.slice(0, 5)} ${mobileNumber.slice(5)}`
        : '+91 ......';

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] font-montserrat">
                {/* Modal Header */}
                <div className="flex items-center justify-between p-3">
                    <div className="flex items-center gap-2">
                        <img src={logo} alt="logo"  />
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 text-2xl md:text-3xl"
                        disabled={isLoading}
                    >
                        <IoClose className="text-[#EE2529]" />
                    </button>
                </div>

                {/* Modal Content */}
                <h1 className="text-xl font-semibold text-center mb-3 bg-[#FFFCF4] py-2 font-montserrat">
                    Verify your Contact Number
                </h1>
                <div className="px-8 pb-8 pt-2">
                    {/* Header */}
                    <div className="mb-6 text-center">
                        <p className="text-gray-600 text-base font-montserrat mb-2">
                            We sent a verification code to
                        </p>
                        <p className="text-lg font-medium text-gray-800 font-montserrat">
                            {formattedNumber}
                        </p>
                        
                        {/* Demo Note */}
                        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                            <p className="text-sm text-yellow-800 font-montserrat">
                                <span className="font-semibold">Demo Note:</span> Use <span className="font-mono font-bold text-red-600">1111</span> as the OTP for testing
                            </p>
                        </div>
                    </div>

                    {/* OTP Input */}
                    <form onSubmit={handleVerify} className="space-y-6">
                        <div>
                            <label className="block text-base font-medium text-gray-700 mb-4 text-center font-montserrat">
                                Enter the 4-digit code
                            </label>
                            
                            <div className="flex justify-center gap-4 mb-2">
                                {otp.map((digit, index) => (
                                    <input
                                        key={index}
                                        id={`otp-input-${index}`}
                                        type="text"
                                        inputMode="numeric"
                                        value={digit}
                                        onChange={(e) => handleOtpChange(index, e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(index, e)}
                                        onPaste={index === 0 ? handlePaste : undefined}
                                        maxLength={1}
                                        className={`w-16 h-16 text-2xl text-center border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent font-montserrat ${
                                            errors.otp || errors.verify
                                                ? 'border-red-500' 
                                                : 'border-[#767676]'
                                        }`}
                                        autoFocus={index === 0}
                                        disabled={isLoading}
                                    />
                                ))}
                            </div>
                            
                            {errors.otp && (
                                <p className="text-center mt-2 text-sm text-red-600 font-montserrat">
                                    {errors.otp}
                                </p>
                            )}
                        </div>

                        {/* Timer and Resend OTP Section */}
                        <div className="text-center">
                            {timer > 0 ? (
                                <p className="text-gray-600 text-base font-montserrat mb-3">
                                    Didn't receive OTP?{' '}
                                    <button
                                        type="button"
                                        onClick={handleResendOtp}
                                        disabled={isResending || isLoading}
                                        className="text-[#C73834] font-medium underline hover:text-[#EE2529] transition-colors font-montserrat disabled:opacity-50 disabled:cursor-not-allowed disabled:no-underline"
                                    >
                                        {isResending ? 'Resending...' : 'Click to resend OTP'}
                                    </button>{' '}
                                    Resend in{' '}
                                    <span className="font-semibold text-[#C73834]">
                                        {formatTime(timer)}
                                    </span>
                                </p>
                            ) : showErrorAfterTimeout ? (
                                <>
                                    {/* Error message after 1 minute */}
                                    <div className="mb-4 ">
                                        <p className="text-red-600 text-sm font-montserrat text-center">
                                            Having trouble receiving your OTP? Please check your mobile number. If the issue persists, contact our support team
                                        </p>
                                    </div>
                                    
                                    {/* Resend OTP and Contact Support buttons */}
                                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-4">
                                        <button
                                            type="button"
                                            onClick={handleResendOtp}
                                            disabled={isResending || isLoading}
                                            className=" font-medium underline hover:text-[#EE2529] transition-colors font-montserrat disabled:opacity-50 disabled:cursor-not-allowed disabled:no-underline whitespace-nowrap"
                                        >
                                            {isResending ? 'Resending...' : 'Resend OTP'}
                                        </button>
                                        <span className="hidden sm:inline text-gray-400">|</span>
                                        <button
                                            type="button"
                                            onClick={handleContactSupport}
                                            className=" font-medium underline hover:text-[#EE2529] transition-colors font-montserrat disabled:opacity-50 disabled:cursor-not-allowed disabled:no-underline whitespace-nowrap"
                                        >
                                            Contact Support
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <p className="text-gray-600 text-base font-montserrat mb-3">
                                    Didn't receive OTP?{' '}
                                    <button
                                        type="button"
                                        onClick={handleResendOtp}
                                        disabled={isResending || isLoading}
                                        className="text-[#C73834] font-medium underline hover:text-[#EE2529] transition-colors font-montserrat disabled:opacity-50 disabled:cursor-not-allowed disabled:no-underline"
                                    >
                                        {isResending ? 'Resending...' : 'Click to resend OTP'}
                                    </button>
                                </p>
                            )}
                            
                            {errors.resend && (
                                <p className="mt-2 text-sm text-red-600 font-montserrat">
                                    {errors.resend}
                                </p>
                            )}
                        </div>

                        {/* Verification error */}
                        {errors.verify && (
                            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                                <p className="text-red-600 text-sm font-montserrat text-center">
                                    {errors.verify}
                                </p>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex items-center gap-5 justify-center mt-8">
                            <button
                                type="button"
                                onClick={onBack}
                                className="w-full border-2 border-[#767676] text-[#767676] py-3 rounded-lg font-medium text-base transition-colors hover:bg-gray-50 font-montserrat disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={isLoading}
                            >
                                Back
                            </button>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full bg-gradient-to-r from-[#EE2529] to-[#C73834] text-white py-3 rounded-lg font-medium text-base transition-opacity font-montserrat ${
                                    isLoading 
                                        ? 'opacity-70 cursor-not-allowed' 
                                        : 'hover:opacity-90'
                                }`}
                            >
                                {isLoading ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Verifying...
                                    </span>
                                ) : 'Verify & Continue'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default VerifyNumber;