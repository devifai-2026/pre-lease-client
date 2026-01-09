import React from 'react';
import { FaHome } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    const handleHomeClick = () => {
        navigate('/');
    };

    const handleExploreProperties = () => {
        navigate('/explore-properties');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="text-center">
                {/* 404 Number */}
                <h1 className="text-8xl sm:text-9xl font-bold text-red-600 mb-4">
                    404
                </h1>

                {/* Title */}
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
                    Page Not Found
                </h2>

                {/* Description */}
                <p className="text-gray-600 text-base sm:text-lg mb-8 max-w-md mx-auto">
                    Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                    <button
                        onClick={handleGoBack}
                        className="px-6 py-2.5 border border-gray-400 text-gray-700 rounded-md hover:bg-gray-100 transition-colors font-medium text-sm sm:text-base"
                    >
                        Go Back
                    </button>

                    <button
                        onClick={handleHomeClick}
                        className="px-6 py-2.5 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors font-medium text-sm sm:text-base flex items-center gap-2"
                    >
                       <FaHome /> Home Page
                    </button>

                    <button
                        onClick={handleExploreProperties}
                        className="px-6 py-2.5 border border-gray-400 text-gray-700 rounded-md hover:bg-gray-100 transition-colors font-medium text-sm sm:text-base"
                    >
                        Explore Properties
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotFound;