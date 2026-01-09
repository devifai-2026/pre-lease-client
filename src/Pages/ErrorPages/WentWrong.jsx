import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdErrorOutline } from 'react-icons/md';
import { HiArrowPath } from 'react-icons/hi2';

const WentWrong = () => {
    const navigate = useNavigate();
    const [errorId, setErrorId] = useState('');
    const [timestamp, setTimestamp] = useState('');

    useEffect(() => {
        // Generate error ID
        const id = 'DK0PHQPBH';
        setErrorId(id);

        // Generate timestamp
        const now = new Date();
        const timestampStr = now.toISOString();
        setTimestamp(timestampStr);
    }, []);

    const handleTryAgain = () => {
        window.location.reload();
    };

    const handleHomeClick = () => {
        navigate('/');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full text-center">
                {/* Icon Circle Background */}
                <div className="flex justify-center mb-6">
                    <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center">
                        <MdErrorOutline className="text-5xl text-red-600" />
                    </div>
                </div>

                {/* Title */}
                <h1 className="text-3xl sm:text-4xl font-bold text-red-600 mb-4">
                    Sorry, Something Went Wrong
                </h1>

                {/* Description */}
                <p className="text-gray-600 text-sm sm:text-base mb-8">
                    Our team is working on this issue. Please refresh or come back later.
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

                {/* Error Details Section */}
                <div className="bg-gray-100 rounded-lg p-6 border border-gray-200">
                    <h2 className="text-lg font-bold text-red-600 mb-4">
                        Error Details
                    </h2>
                    
                    <div className="text-left space-y-3">
                        <div>
                            <p className="text-xs text-gray-600 font-semibold mb-1">Error ID</p>
                            <p className="text-sm text-gray-800 font-mono break-all">
                                {errorId}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs text-gray-600 font-semibold mb-1">Timestamp</p>
                            <p className="text-sm text-gray-800 font-mono break-all">
                                {timestamp}
                            </p>
                        </div>

                        <div className="border-t border-gray-300 pt-3">
                            <p className="text-xs text-gray-600 text-center">
                                Please include this information when contacting support.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WentWrong;