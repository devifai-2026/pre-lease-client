// components/UserProfile.js
import React, { useState, useRef, useEffect } from 'react';
import { FaRegUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const UserProfile = () => {
  const { user, logout } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) return null;

  const roleColors = {
    investor: 'bg-blue-100 text-blue-800',
    broker: 'bg-red-100 text-red-800',
    owner: 'bg-green-100 text-green-800'
  };

  const roleLabels = {
    investor: 'Investor',
    broker: 'Broker',
    owner: 'Owner'
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* User Profile Button */}
      <button
        onClick={() => setIsProfileOpen(!isProfileOpen)}
        className="flex items-center gap-2 px-3 py-1 rounded-full border border-gray-300 hover:border-[#EE2529] transition-colors duration-200 bg-white"
      >
        <FaRegUserCircle className="text-[#EE2529] w-5 h-5" />
        <span className="hidden sm:inline text-sm font-medium truncate max-w-[100px]">
          {user.name.split(' ')[0]}
        </span>
        <span className={`text-xs px-2 py-0.5 rounded-full ${roleColors[user.role]}`}>
          {roleLabels[user.role]}
        </span>
      </button>

      {/* Profile Dropdown */}
      {isProfileOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
          {/* User Info */}
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#EE2529] to-[#C73834] flex items-center justify-center text-white font-bold">
                {user.name.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-gray-800">{user.name}</p>
                <p className="text-sm text-gray-600">{user.mobile}</p>
                <p className="text-xs text-gray-500 capitalize">{user.role}</p>
              </div>
            </div>
          </div>

          {/* Dashboard Link */}
          <div className="px-2 py-1">
            <a
              href={`/${user.role}-dashboard`}
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded transition-colors"
              onClick={() => setIsProfileOpen(false)}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
              </svg>
              Go to Dashboard
            </a>
          </div>

          {/* Logout Button */}
          <div className="px-2 py-1 border-t border-gray-100">
            <button
              onClick={() => {
                logout();
                setIsProfileOpen(false);
              }}
              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded transition-colors"
            >
              <FaSignOutAlt className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;