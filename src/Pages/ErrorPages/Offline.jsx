import React, { useState, useEffect } from 'react';
import { MdSignalCellularAlt } from 'react-icons/md';
import { IoWifi } from 'react-icons/io5';

const Offline = () => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    useEffect(() => {
        // Handle online event
        const handleOnline = () => {
            setIsOnline(true);
        };

        // Handle offline event
        const handleOffline = () => {
            setIsOnline(false);
        };

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    const handleRetryConnection = () => {
        // Check if back online
        if (navigator.onLine) {
            setIsOnline(true);
            window.location.reload();
        } else {
            alert('Still offline. Please check your internet connection.');
        }
    };

    const handleContactSupport = () => {
        // Open support page or email
        window.location.href = 'mailto:support@preleasegrid.com';
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full text-center">
                {/* Icon Circle Background */}
                <div className="flex justify-center mb-6">
                    <div className="relative w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center">
                        <div className="relative">
                            <IoWifi className="text-5xl text-red-600" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="absolute w-8 h-1 bg-red-600 transform -rotate-45"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Title */}
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
                    You're Offline
                </h1>

                {/* Description */}
                <p className="text-gray-600 text-sm sm:text-base mb-8">
                    Please check your internet connection and try again.
                </p>

                {/* Retry Button */}
                <button
                    onClick={handleRetryConnection}
                    className="w-full px-6 py-2.5 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors font-medium mb-8 flex items-center justify-center gap-2"
                >
                    <MdSignalCellularAlt className="text-lg" />
                    Retry Connection
                </button>

                {/* Additional Help Section */}
                <div className="border-t pt-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-3">
                        While You're Offline
                    </h2>
                    <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                        Make sure your device is connected to WiFi or mobile data. If you're connected and still seeing this message, the problem might be on our end.
                    </p>

                    {/* Contact Support Button */}
                    <button
                        onClick={handleContactSupport}
                        className="px-6 py-2 border border-gray-400 text-gray-700 rounded-md hover:bg-gray-100 transition-colors font-medium text-sm"
                    >
                        Contact Support
                    </button>
                </div>

                {/* Connection Status Indicator */}
                <div className="mt-8 p-3 bg-gray-100 rounded-md">
                    <p className="text-xs text-gray-600">
                        Connection Status:{' '}
                        <span className={`font-semibold ${isOnline ? 'text-green-600' : 'text-red-600'}`}>
                            {isOnline ? 'Online' : 'Offline'}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Offline;