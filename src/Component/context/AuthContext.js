// context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user data exists in localStorage on initial load
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (credentials) => {
    // Dummy credentials for Investor, Broker, and Owner
    const dummyUsers = {
      investor: {
        id: 1,
        mobile: '9999999991',
        name: 'John Investor',
        role: 'investor',
        email: 'investor@example.com',
      },
      broker: {
        id: 2,
        mobile: '9999999992',
        name: 'Jane Broker',
        role: 'broker',
        email: 'broker@example.com',
      },
      owner: {
        id: 3,
        mobile: '9999999993',
        name: 'Mike Owner',
        role: 'owner',
        email: 'owner@example.com',
      },
    };

    // Check if mobile number matches any dummy user
    const mobileNumber = credentials.mobile.trim();
    let loggedInUser = null;

    if (mobileNumber === dummyUsers.investor.mobile) {
      loggedInUser = dummyUsers.investor;
    } else if (mobileNumber === dummyUsers.broker.mobile) {
      loggedInUser = dummyUsers.broker;
    } else if (mobileNumber === dummyUsers.owner.mobile) {
      loggedInUser = dummyUsers.owner;
    } else {
      // For any other number, assign a default role based on what was selected
      // or create a new user with the selected role
      loggedInUser = {
        id: Date.now(),
        mobile: mobileNumber,
        name: `User ${mobileNumber.slice(-4)}`,
        role: credentials.role || 'investor', // Default to investor if no role specified
        email: '',
      };
    }

    // Save to localStorage
    localStorage.setItem('user', JSON.stringify(loggedInUser));
    setUser(loggedInUser);
    return { success: true, user: loggedInUser };
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const updateUser = (updatedUserData) => {
    const updatedUser = { ...user, ...updatedUserData };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};