import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MdDesktopAccessDisabled } from "react-icons/md";
import { HiArrowPath } from 'react-icons/hi2';

const ServerError = () => {
    const navigate = useNavigate();

    const handleTryAgain = () => {
        window.location.reload();
    };

    const handleHomeClick = () => {
        navigate('/');
    };

    const handleContactSupport = () => {
        window.location.href = 'mailto:support@preleasegrid.com';
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full text-center">
                {/* Icon Circle Background */}
                <div className="flex justify-center mb-6">
                    <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center">
                        <MdDesktopAccessDisabled className="text-5xl text-red-600" />
                    </div>
                </div>

                {/* Title */}
                <h1 className="text-3xl sm:text-4xl font-bold text-red-600 mb-4">
                    Server Error
                </h1>

                {/* Description */}
                <p className="text-gray-600 text-sm sm:text-base mb-8">
                    We're experiencing technical difficulties. Our team has been notified and is working to fix the issue.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-8">
                    <button
                        onClick={handleTryAgain}
                        className="px-6 py-2.5 border border-gray-400 text-gray-700 rounded-md hover:bg-gray-100 transition-colors font-medium text-sm sm:text-base flex items-center justify-center gap-2"
                    >
                        <HiArrowPath className="text-lg" />
                        Try Again
                    </button>

                    <button
                        onClick={handleHomeClick}
                        className="px-6 py-2.5 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors font-medium text-sm sm:text-base"
                    >
                        Home Page
                    </button>
                </div>

                {/* Help Section */}
                <div className="border-t pt-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">
                        What can you do?
                    </h2>
                    
                    {/* Help List */}
                    <ul className="text-gray-600 text-sm space-y-2 mb-6 text-left">
                        <li className="flex items-start gap-2">
                            <span className="text-red-600 font-bold mt-1">•</span>
                            <span>Try refreshing the page</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-red-600 font-bold mt-1">•</span>
                            <span>Come back in a few minutes</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-red-600 font-bold mt-1">•</span>
                            <span>Contact our support team if the problem persists</span>
                        </li>
                    </ul>

                    {/* Contact Support Button */}
                    <button
                        onClick={handleContactSupport}
                        className="px-6 py-2 border border-gray-400 text-gray-700 rounded-md hover:bg-gray-100 transition-colors font-medium text-sm"
                    >
                        Contact Support
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ServerError;