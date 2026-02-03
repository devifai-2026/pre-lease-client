import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/Navbar/Preleasegrid logo 1.png";
import plus from "../../assets/Navbar/plus.png";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";
import { IoMdTrendingUp } from "react-icons/io";
import { FaRegHandshake, FaRegUserCircle, FaSignOutAlt } from "react-icons/fa";
import {
  MdPhoneInTalk,
  MdInfo,
  MdHelpOutline,
  MdOutlineSpaceDashboard,
} from "react-icons/md";
import SignUp from "./auth/SignUp";
import VerifyContactNumber from "./auth/VerifyNumber";
import { RiArrowDropDownLine } from "react-icons/ri";
import whatsapp from "../../assets/Navbar/whatsapp.svg";
import switchAccounts from "../../assets/Navbar/switchAccounts.svg";
import notifications from "../../assets/Navbar/notifications.svg";
import lout from "../../assets/Navbar/logout.svg";
import wishlist from "../../assets/Navbar/wishlist.svg";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const dropdownRef = useRef(null);

  // State for user authentication
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // State for UI
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isCreateAccountModalOpen, setIsCreateAccountModalOpen] =
    useState(false);
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [mobileToVerify, setMobileToVerify] = useState("");
  const [signInMobileNumber, setSignInMobileNumber] = useState("");
  const [signInError, setSignInError] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  // Dummy users for login
  const DUMMY_USERS = {
    investor: {
      id: 1,
      mobile: "9999999991",
      name: "John Investor",
      role: "investor",
      email: "investor@example.com",
    },
    broker: {
      id: 2,
      mobile: "9999999992",
      name: "Jane Broker",
      role: "broker",
      email: "broker@example.com",
    },
    owner: {
      id: 3,
      mobile: "9999999993",
      name: "Mike Owner",
      role: "owner",
      email: "owner@example.com",
    },
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial scroll position
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Check if user is logged in on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const isActive = (path) => currentPath === path;
  const isListPropertyPage = currentPath === "/list-property";

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleListPropertyClick = () => {
    navigate("/list-property");
  };

  // Authentication functions
  const login = (credentials) => {
    const mobileNumber = credentials.mobile.trim();
    let loggedInUser = null;

    if (mobileNumber === DUMMY_USERS.investor.mobile) {
      loggedInUser = DUMMY_USERS.investor;
    } else if (mobileNumber === DUMMY_USERS.broker.mobile) {
      loggedInUser = DUMMY_USERS.broker;
    } else if (mobileNumber === DUMMY_USERS.owner.mobile) {
      loggedInUser = DUMMY_USERS.owner;
    } else {
      loggedInUser = {
        id: Date.now(),
        mobile: mobileNumber,
        name: `User ${mobileNumber.slice(-4)}`,
        role: credentials.role || "investor",
        email: "",
      };
    }

    localStorage.setItem("user", JSON.stringify(loggedInUser));
    setUser(loggedInUser);
    return { success: true, user: loggedInUser };
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setIsDropdownOpen(false);
    setIsMenuOpen(false);
    navigate("/");
  };

  // Modal handlers
  const openSignInModal = () => {
    setIsSignInModalOpen(true);
    setSignInMobileNumber("");
    setSignInError("");
  };

  const closeSignInModal = () => {
    setIsSignInModalOpen(false);
    setSignInMobileNumber("");
    setSignInError("");
  };

  const openSignUpModal = () => {
    setIsSignInModalOpen(false);
    setIsSignUpModalOpen(true);
    setSignInMobileNumber("");
    setSignInError("");
  };

  const closeSignUpModal = () => {
    setIsSignUpModalOpen(false);
    setSelectedRole(null);
  };

  const goBackToSignIn = () => {
    setIsSignUpModalOpen(false);
    setIsSignInModalOpen(true);
    setSelectedRole(null);
  };

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };

  const openCreateAccountModal = () => {
    if (selectedRole) {
      setIsSignUpModalOpen(false);
      setIsCreateAccountModalOpen(true);
    }
  };

  const closeCreateAccountModal = () => {
    setIsCreateAccountModalOpen(false);
    setSelectedRole(null);
  };

  const goBackToRoleSelection = () => {
    setIsCreateAccountModalOpen(false);
    setIsSignUpModalOpen(true);
  };

  const handleVerifyRequest = (mobileNumber) => {
    setMobileToVerify(mobileNumber);
    setIsCreateAccountModalOpen(false);
    setIsVerifyModalOpen(true);
  };

  const handleSignInContinue = () => {
    if (signInMobileNumber.trim() === "") {
      setSignInError("Please enter your mobile number first");
      return;
    }

    if (signInMobileNumber.length !== 10) {
      setSignInError("Please enter a valid 10-digit mobile number");
      return;
    }

    const loginResult = login({
      mobile: signInMobileNumber,
      role: selectedRole,
    });

    if (loginResult.success) {
      setSignInError("");
      setMobileToVerify(signInMobileNumber);
      setIsSignInModalOpen(false);
      navigateToDashboard(loginResult.user.role);
    }
  };

  const navigateToDashboard = (role) => {
    switch (role) {
      case "investor":
        navigate("/investor-dashboard");
        break;
      case "broker":
        navigate("/broker-dashboard");
        break;
      case "owner":
        navigate("/owner-dashboard");
        break;
      default:
        navigate("/");
    }
  };

  const closeVerifyModal = () => {
    setIsVerifyModalOpen(false);
    setMobileToVerify("");
  };

  const goBackToSignUpFromVerify = () => {
    setIsVerifyModalOpen(false);
    setIsCreateAccountModalOpen(true);
  };

  const goBackToSignInFromVerify = () => {
    setIsVerifyModalOpen(false);
    setIsSignInModalOpen(true);
  };

  const handleSignInMobileChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10);
    setSignInMobileNumber(value);
    if (signInError) {
      setSignInError("");
    }
  };

  // User Profile Component
  const UserProfile = () => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const profileRef = useRef(null);

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (profileRef.current && !profileRef.current.contains(event.target)) {
          setIsProfileOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    if (!user) return null;

    const getUserInitial = () => {
      if (!user.name) {
        return user.mobile ? user.mobile.charAt(0) : "U";
      }
      return user.name.charAt(0);
    };

    const getDisplayName = () => {
      if (!user.name) {
        return user.mobile ? `User ${user.mobile.slice(-4)}` : "User";
      }
      return user.name;
    };

    return (
      <div className="relative font-montserrat" ref={profileRef}>
        <button
          onClick={() => setIsProfileOpen(!isProfileOpen)}
          className="flex items-center gap-2 px-2 py-2 rounded-full border border-gray-300 hover:border-[#EE2529] transition-colors duration-200 bg-white hidden lg:flex"
        >
          <FaRegUserCircle className="text-[#EE2529] w-5 h-5" />
          <RiArrowDropDownLine className="text-[#EE2529] w-5 h-5" />
        </button>

        {isProfileOpen && (
          <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
            <div className="px-4 py-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#EE2529] to-[#C73834] flex items-center justify-center text-white font-bold">
                  {getUserInitial()}
                </div>
                <div>
                  <p className="font-semibold text-gray-800">
                    {getDisplayName()}
                  </p>
                  <p className="text-sm text-gray-600">
                    {user.mobile || "No phone"}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">
                    {user.role || "user"}
                  </p>
                </div>
              </div>
            </div>

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

  // Menu items
  const menuItems = [
    { label: "Contact Support", icon: MdPhoneInTalk, link: "/contact-support" },
    { label: "How It Works", icon: MdInfo, link: "/how-it-works" },
    { label: "Contact Us", icon: MdHelpOutline, link: "/contact-us" },
  ];

  if (!user) {
    menuItems.push({
      label: "Sign Up/Sign In",
      icon: MdPhoneInTalk,
      action: openSignInModal,
    });
  }

  return (
    <>
      {/* Sticky Navbar Container */}
      <div className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? ' backdrop-blur-lg ' 
          : 'bg-gradient-to-r from-white via-white/70 to-transparent backdrop-blur-sm'
      }`}>
        <div className={`flex justify-between items-center rounded-full px-6 py-3 max-w-[95%] mx-auto mt-4 font-montserrat transition-all duration-300 ${
          isScrolled 
            ? 'shadow-md' 
            : 'shadow-md'
        }`}>
          {/* Logo */}
          <Link to="/">
            <div>
              <img
                className="w-20 h-8 md:w-28 md:h-11 lg:w-36 lg:h-14"
                src={logo}
                alt="Preleasegrid Logo"
              />
            </div>
          </Link>

          {/* Navigation links - hidden on md and below */}
          <div className="hidden lg:flex items-center gap-6 font-semibold whitespace-nowrap">
            <Link to="/explore-properties">
              <p
                className={`${
                  isActive("/explore-properties")
                    ? "text-[#EE2529]"
                    : "text-[#262626]"
                } hover:text-[#EE2529] transition-colors duration-200`}
              >
                Explore Properties
              </p>
            </Link>
            <Link to="/calculators">
              <p
                className={`${
                  isActive("/calculators") ? "text-[#EE2529]" : "text-[#262626]"
                } hover:text-[#EE2529] transition-colors duration-200`}
              >
                Calculators
              </p>
            </Link>
            <Link to="/explore-brokers">
              <p
                className={`${
                  isActive("/explore-brokers")
                    ? "text-[#EE2529]"
                    : "text-[#262626]"
                } hover:text-[#EE2529] transition-colors duration-200`}
              >
                Explore Brokers
              </p>
            </Link>

            {user && (
              <Link to={`/${user.role}-dashboard`}>
                <p
                  className={`${
                    currentPath.includes("dashboard")
                      ? "text-[#EE2529]"
                      : "text-[#262626]"
                  } hover:text-[#EE2529] transition-colors duration-200`}
                >
                  {user.role
                    ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
                    : "Dashboard"}
                </p>
              </Link>
            )}
          </div>

          {/* Sign In/User Profile, List Property, and Hamburger */}
          <div className="flex items-center gap-2 whitespace-nowrap">
            {!user && (
              <p
                className="block font-semibold text-xs md:text-sm lg:text-base cursor-pointer text-[#262626] hover:text-[#EE2529] transition-colors duration-200"
                onClick={openSignInModal}
              >
                Sign In
              </p>
            )}
            
            {!isListPropertyPage && (
              <p
                className="flex items-center gap-1 lg:gap-2 border border-[#262626] rounded-full px-2 lg:px-3 py-1 lg:py-2 text-xs md:text-sm lg:text-base cursor-pointer hover:border-[#EE2529] hover:text-[#EE2529] transition-colors duration-200"
                onClick={handleListPropertyClick}
              >
                <img
                  className="bg-[#EE2529] rounded-full p-0.5 lg:p-1 w-3 h-3 md:w-5 md:h-5 lg:w-6 lg:h-6"
                  src={plus}
                  alt="Add Property"
                />
                List Property
              </p>
            )}
            
            {user && <UserProfile />}

            <div className="relative" ref={dropdownRef}>
              <RxHamburgerMenu
                onClick={toggleDropdown}
                className="hidden lg:block bg-[#FDEDEE] w-5 h-5 md:w-7 md:h-7 lg:w-8 lg:h-8 rounded-full p-1 text-[#C73834] cursor-pointer hover:bg-[#FAD4D6] transition-colors duration-200"
              />

              {isDropdownOpen && (
                <div className="hidden lg:block absolute right-0 mt-[-32px] w-60 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50">
                  <div className="flex items-center justify-between px-6 py-2 border-b border-gray-100">
                    <div>
                      <img className="w-24 h-10" src={logo} alt="Preleasegrid Logo" />
                    </div>
                    <button
                      onClick={toggleDropdown}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <IoClose className="text-[#C73834] w-6 h-6" />
                    </button>
                  </div>

                  <div className="px-2">
                    {menuItems.map((item, index) => {
                      const Icon = item.icon;
                      const itemActive = isActive(item.link);
                      return (
                        <div key={index}>
                          {item.link ? (
                            <Link to={item.link}>
                              <div
                                className={`flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer transition-all group border-l-2 ${
                                  itemActive
                                    ? "bg-red-50 border-l-[#EE2529]"
                                    : "border-l-transparent hover:bg-gray-50 hover:border-l-2 hover:border-l-[#EE2529]"
                                }`}
                                onClick={() => setIsDropdownOpen(false)}
                              >
                                <span
                                  className={`text-sm font-medium ${
                                    itemActive
                                      ? "text-[#EE2529]"
                                      : "text-[#262626] group-hover:text-[#EE2529]"
                                  }`}
                                >
                                  {item.label}
                                </span>
                                <Icon
                                  className={`w-5 h-5 transition-opacity ${
                                    itemActive
                                      ? "opacity-100 text-[#EE2529]"
                                      : "opacity-0 group-hover:opacity-100 text-[#EE2529]"
                                  }`}
                                />
                              </div>
                            </Link>
                          ) : (
                            <div
                              onClick={() => {
                                item.action();
                                setIsDropdownOpen(false);
                              }}
                              className={`flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer transition-all group border-l-2 ${
                                isActive("/sign-in-up")
                                  ? "bg-red-50 border-l-[#EE2529]"
                                  : "border-l-transparent hover:bg-gray-50 hover:border-l-2 hover:border-l-[#EE2529]"
                              }`}
                            >
                              <span
                                className={`text-sm font-medium ${
                                  isActive("/sign-in-up")
                                    ? "text-[#EE2529]"
                                    : "text-[#262626] group-hover:text-[#EE2529]"
                                }`}
                              >
                                {item.label}
                              </span>
                              <Icon
                                className={`w-5 h-5 transition-opacity ${
                                  isActive("/sign-in-up")
                                    ? "opacity-100 text-[#EE2529]"
                                    : "opacity-0 group-hover:opacity-100 text-[#EE2529]"
                                }`}
                              />
                            </div>
                          )}
                        </div>
                      );
                    })}

                    {user && (
                      <Link to={`/${user.role}-dashboard`}>
                        <div
                          className={`flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer transition-all group border-l-2 ${
                            currentPath.includes("dashboard")
                              ? "bg-red-50 border-l-[#EE2529]"
                              : "border-l-transparent hover:bg-gray-50 hover:border-l-2 hover:border-l-[#EE2529]"
                          }`}
                          onClick={() => {
                            setIsDropdownOpen(false);
                            navigateToDashboard(user.role);
                          }}
                        >
                          <span
                            className={`text-sm font-medium ${
                              currentPath.includes("dashboard")
                                ? "text-[#EE2529]"
                                : "text-[#262626] group-hover:text-[#EE2529]"
                            }`}
                          >
                            My Dashboard
                          </span>
                          <svg
                            className={`w-5 h-5 transition-opacity ${
                              currentPath.includes("dashboard")
                                ? "opacity-100 text-[#EE2529]"
                                : "opacity-0 group-hover:opacity-100 text-[#EE2529]"
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                            />
                          </svg>
                        </div>
                      </Link>
                    )}
                  </div>
                </div>
              )}

              {isMenuOpen ? (
                <IoClose
                  onClick={toggleMenu}
                  className="lg:hidden bg-[#FDEDEE] w-5 h-5 md:w-7 md:h-7 rounded-full p-1 text-[#C73834] cursor-pointer hover:bg-[#FAD4D6] transition-colors duration-200"
                />
              ) : (
                <RxHamburgerMenu
                  onClick={toggleMenu}
                  className="lg:hidden bg-[#FDEDEE] w-5 h-5 md:w-7 md:h-7 rounded-full p-1 text-[#C73834] cursor-pointer hover:bg-[#FAD4D6] transition-colors duration-200"
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white shadow-lg mt-2 rounded-lg border border-gray-100 max-w-[95%] mx-auto z-40 relative">
          {user && (
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#EE2529] to-[#C73834] flex items-center justify-center text-white font-bold text-lg">
                  {user.name
                    ? user.name.charAt(0)
                    : user.mobile
                    ? user.mobile.charAt(0)
                    : "U"}
                </div>
                <div>
                  <p className="font-bold text-[#EE2529] text-xl">
                    Hi,{" "}
                    {user.name
                      ? user.name.split(" ")[0]
                      : `User ${user.mobile ? user.mobile.slice(-4) : ""}`}
                  </p>
                  <div className="flex items-center gap-1">
                    <img src={whatsapp} alt="" />
                    <p className="text-sm text-gray-600">
                      {user.mobile || "No phone"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="p-2 font-montserrat flex flex-col gap-0">
            {user ? (
              <>
                <Link
                  to={`/${user.role}-dashboard`}
                  onClick={() => {
                    toggleMenu();
                    navigateToDashboard(user.role);
                  }}
                >
                  <div
                    className={`py-3 px-4 font-medium text-sm rounded cursor-pointer transition-all border-l-2 flex items-center gap-2 ${
                      currentPath.includes("dashboard")
                        ? "text-[#EE2529] bg-red-50 border-l-[#EE2529]"
                        : "text-[#262626] border-l-transparent hover:bg-gray-50 hover:border-l-2 hover:border-l-[#EE2529]"
                    }`}
                  >
                    <MdOutlineSpaceDashboard className="text-[#EE2529] h-5 w-5" />
                    Dashboard
                  </div>
                </Link>

                <div
                  className="py-3 px-4 font-medium text-sm rounded cursor-pointer transition-all border-l-2 text-[#262626] border-l-transparent hover:bg-gray-50 hover:border-l-2 hover:border-l-[#EE2529] flex items-center gap-2"
                  onClick={() => {
                    openSignInModal();
                    toggleMenu();
                  }}
                >
                  <img className="h-5 w-5" src={switchAccounts} alt="" />
                  Switch Accounts
                </div>

                <Link to="/notifications" onClick={toggleMenu}>
                  <div
                    className={`py-3 px-4 font-medium text-sm rounded cursor-pointer transition-all border-l-2 flex items-center gap-2 ${
                      isActive("/notifications")
                        ? "text-[#EE2529] bg-red-50 border-l-[#EE2529]"
                        : "text-[#262626] border-l-transparent hover:bg-gray-50 hover:border-l-2 hover:border-l-[#EE2529]"
                    }`}
                  >
                    <img className="h-5 w-5" src={notifications} alt="" />
                    Notifications
                  </div>
                </Link>

                <Link to="/wishlist" onClick={toggleMenu}>
                  <div
                    className={`py-3 px-4 font-medium text-sm rounded cursor-pointer transition-all border-l-2 flex items-center gap-2 ${
                      isActive("/wishlist")
                        ? "text-[#EE2529] bg-red-50 border-l-[#EE2529]"
                        : "text-[#262626] border-l-transparent hover:bg-gray-50 hover:border-l-2 hover:border-l-[#EE2529]"
                    }`}
                  >
                    <img className="h-5 w-5" src={wishlist} alt="" />
                    Wishlist
                  </div>
                </Link>

                <Link to="/settings" onClick={toggleMenu}>
                  <div
                    className={`py-3 px-4 font-medium text-sm rounded cursor-pointer transition-all border-l-2 flex items-center gap-2 ${
                      isActive("/settings")
                        ? "text-[#EE2529] bg-red-50 border-l-[#EE2529]"
                        : "text-[#262626] border-l-transparent hover:bg-gray-50 hover:border-l-2 hover:border-l-[#EE2529]"
                    }`}
                  >
                    <svg
                      className="w-5 h-5 text-[#EE2529]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    Settings
                  </div>
                </Link>
                <div
                  className="py-3 px-4 font-medium text-sm rounded cursor-pointer transition-all border-l-2 border-l-transparent hover:border-l-2 hover:border-l-red-600 flex items-center gap-2"
                  onClick={() => {
                    logout();
                    toggleMenu();
                  }}
                >
                  <img className="h-5 w-5" src={lout} alt="" />
                  Logout
                </div>
              </>
            ) : (
              <>
                <Link to="/" onClick={toggleMenu}>
                  <div
                    className={`py-3 px-4 font-medium text-sm rounded cursor-pointer transition-all border-l-2 flex items-center justify-between group ${
                      isActive("/")
                        ? "text-[#EE2529] bg-red-50 border-l-[#EE2529]"
                        : "text-[#262626] border-l-transparent hover:bg-gray-50 hover:border-l-2 hover:border-l-[#EE2529]"
                    }`}
                  >
                    <span>Home</span>
                    <svg
                      className={`w-5 h-5 transition-opacity ${
                        isActive("/")
                          ? "opacity-100 text-[#EE2529]"
                          : "opacity-0 group-hover:opacity-100 text-[#EE2529]"
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                  </div>
                </Link>

                <Link to="/explore-properties" onClick={toggleMenu}>
                  <div
                    className={`py-3 px-4 font-medium text-sm rounded cursor-pointer transition-all border-l-2 flex items-center justify-between group ${
                      isActive("/explore-properties")
                        ? "text-[#EE2529] bg-red-50 border-l-[#EE2529]"
                        : "text-[#262626] border-l-transparent hover:bg-gray-50 hover:border-l-2 hover:border-l-[#EE2529]"
                    }`}
                  >
                    <span>Explore Properties</span>
                    <svg
                      className={`w-5 h-5 transition-opacity ${
                        isActive("/explore-properties")
                          ? "opacity-100 text-[#EE2529]"
                          : "opacity-0 group-hover:opacity-100 text-[#EE2529]"
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                  </div>
                </Link>

                <Link to="/calculators" onClick={toggleMenu}>
                  <div
                    className={`py-3 px-4 font-medium text-sm rounded cursor-pointer transition-all border-l-2 flex items-center justify-between group ${
                      isActive("/calculators")
                        ? "text-[#EE2529] bg-red-50 border-l-[#EE2529]"
                        : "text-[#262626] border-l-transparent hover:bg-gray-50 hover:border-l-2 hover:border-l-[#EE2529]"
                    }`}
                  >
                    <span>Calculator</span>
                    <svg
                      className={`w-5 h-5 transition-opacity ${
                        isActive("/calculators")
                          ? "opacity-100 text-[#EE2529]"
                          : "opacity-0 group-hover:opacity-100 text-[#EE2529]"
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                </Link>

                <Link to="/contact-support" onClick={toggleMenu}>
                  <div
                    className={`py-3 px-4 font-medium text-sm rounded cursor-pointer transition-all border-l-2 flex items-center justify-between group ${
                      isActive("/contact-support")
                        ? "text-[#EE2529] bg-red-50 border-l-[#EE2529]"
                        : "text-[#262626] border-l-transparent hover:bg-gray-50 hover:border-l-2 hover:border-l-[#EE2529]"
                    }`}
                  >
                    <span>Contact Support</span>
                    <MdPhoneInTalk
                      className={`w-5 h-5 transition-opacity ${
                        isActive("/contact-support")
                          ? "opacity-100 text-[#EE2529]"
                          : "opacity-0 group-hover:opacity-100 text-[#EE2529]"
                      }`}
                    />
                  </div>
                </Link>

                <Link to="/how-it-works" onClick={toggleMenu}>
                  <div
                    className={`py-3 px-4 font-medium text-sm rounded cursor-pointer transition-all border-l-2 flex items-center justify-between group ${
                      isActive("/how-it-works")
                        ? "text-[#EE2529] bg-red-50 border-l-[#EE2529]"
                        : "text-[#262626] border-l-transparent hover:bg-gray-50 hover:border-l-2 hover:border-l-[#EE2529]"
                    }`}
                  >
                    <span>How It Works</span>
                    <MdInfo
                      className={`w-5 h-5 transition-opacity ${
                        isActive("/how-it-works")
                          ? "opacity-100 text-[#EE2529]"
                          : "opacity-0 group-hover:opacity-100 text-[#EE2529]"
                      }`}
                    />
                  </div>
                </Link>

                <Link to="/contact-us" onClick={toggleMenu}>
                  <div
                    className={`py-3 px-4 font-medium text-sm rounded cursor-pointer transition-all border-l-2 flex items-center justify-between group ${
                      isActive("/contact-us")
                        ? "text-[#EE2529] bg-red-50 border-l-[#EE2529]"
                        : "text-[#262626] border-l-transparent hover:bg-gray-50 hover:border-l-2 hover:border-l-[#EE2529]"
                    }`}
                  >
                    <span>Contact Us</span>
                    <MdHelpOutline
                      className={`w-5 h-5 transition-opacity ${
                        isActive("/contact-us")
                          ? "opacity-100 text-[#EE2529]"
                          : "opacity-0 group-hover:opacity-100 text-[#EE2529]"
                      }`}
                    />
                  </div>
                </Link>

                <div
                  className="py-3 px-4 font-medium text-sm rounded cursor-pointer transition-all border-l-2 text-[#262626] border-l-transparent hover:bg-gray-50 hover:border-l-2 hover:border-l-[#EE2529] flex items-center justify-between group"
                  onClick={() => {
                    openSignInModal();
                    toggleMenu();
                  }}
                >
                  <span>Sign In/Sign Up</span>
                  <MdPhoneInTalk className="w-5 h-5 opacity-0 group-hover:opacity-100 text-[#EE2529]" />
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Rest of the modal components remain the same */}
      {isSignInModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4">
            <div className="flex items-center justify-between p-4">
              <div>
                <img src={logo} alt="Preleasegrid Logo" />
              </div>
              <button
                onClick={closeSignInModal}
                className="text-gray-400 hover:text-gray-600 text-2xl md:text-4xl"
              >
                <IoClose className="text-[#EE2529]" />
              </button>
            </div>

            <h2 className="text-2xl font-bold text-center mb-2 bg-[#FFFCF4] py-2">
              Welcome
            </h2>
            <div className="px-8 pb-8 font-montserrat">
              <p className="text-gray-600 text-center mb-6">
                Sign in to your account to continue
              </p>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mobile Number *
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    value={signInMobileNumber}
                    onChange={handleSignInMobileChange}
                    placeholder="Enter your contact number"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                      signInError ? "border-red-500" : "border-gray-300"
                    }`}
                    maxLength={10}
                    inputMode="numeric"
                  />
                </div>
                {signInError && (
                  <p className="mt-1 text-sm text-red-600 font-montserrat">
                    {signInError}
                  </p>
                )}
              </div>

              <div className="mb-6 p-3 bg-gray-50 rounded-lg font-montserrat">
                <p className="text-sm font-semibold text-gray-700 mb-1">
                  Dummy Login Credentials:
                </p>
                <div className="text-xs text-gray-600">
                  <p>• Investor: <span className="">9999999991</span></p>
                  <p>• Broker: <span className="">9999999992</span></p>
                  <p>• Owner: <span className="">9999999993</span></p>
                </div>
              </div>

              <div className="flex items-center gap-4 justify-center mt-6">
                <button
                  onClick={openSignUpModal}
                  className="w-full border border-[#767676] text-[#767676] py-3 rounded-lg font-medium transition-colors hover:bg-gray-50"
                >
                  Sign Up
                </button>
                <button
                  onClick={handleSignInContinue}
                  className="w-full bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 transition-colors"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isSignUpModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none]">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-2">
                <img src={logo} alt="Preleasegrid Logo" />
              </div>
              <button
                onClick={closeSignUpModal}
                className="text-gray-400 hover:text-gray-600 text-2xl md:text-4xl"
              >
                <IoClose className="text-[#EE2529]" />
              </button>
            </div>

            <h2 className="text-base text-center mb-2 bg-[#FFFCF4] py-2 font-montserrat">
              <span className="text-[#262626] font-semibold">Sign UP.</span> To live in our space.
            </h2>
            <div className="px-8 pb-8">
              <div className="mb-8 font-montserrat">
                <p className="text-gray-600 text-center text-sm">
                  Tell us who you are to personalize your experience
                </p>
              </div>

              <div className="space-y-6 mb-8 font-montserrat">
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 font-montserrat">
                  <div
                    onClick={() => handleRoleSelect("investor")}
                    className={`w-full md:w-48 p-4 rounded-lg cursor-pointer transition-all flex flex-col items-center text-center relative ${
                      selectedRole === "investor"
                        ? "bg-gradient-to-t from-[#D7EFF7] to-[#FFFFFF] shadow-md"
                        : "bg-gradient-to-b from-[#D7EFF7] to-[#FFFFFF] shadow-md"
                    }`}
                    style={{
                      borderBottom: selectedRole === "investor" ? "4px solid #26BFCC" : "none",
                      borderRight: selectedRole === "investor" ? "2px solid #26BFCC" : "none",
                      borderBottomRightRadius: selectedRole === "investor" ? "0.5rem" : "0",
                    }}
                  >
                    <IoMdTrendingUp className="text-[#26BFCC] h-10 w-10 mb-2" />
                    <h3 className="text-xl font-bold mb-1">Investor</h3>
                    <p className="text-[#767676] text-sm mb-1">
                      Find profitable opportunities
                    </p>
                  </div>

                  <div
                    onClick={() => handleRoleSelect("broker")}
                    className={`w-full md:w-48 p-4 rounded-lg cursor-pointer transition-all flex flex-col items-center text-center relative ${
                      selectedRole === "broker"
                        ? "bg-gradient-to-t from-[#FDEDEE] to-[#FFFFFF] shadow-md"
                        : "bg-gradient-to-b from-[#FDEDEE] to-[#FFFFFF] shadow-md"
                    }`}
                    style={{
                      borderBottom: selectedRole === "broker" ? "4px solid #C73834" : "none",
                      borderRight: selectedRole === "broker" ? "2px solid #C73834" : "none",
                      borderBottomRightRadius: selectedRole === "broker" ? "0.5rem" : "0",
                    }}
                  >
                    <FaRegHandshake className="text-[#C73834] h-10 w-10 mb-2" />
                    <h3 className="text-xl font-bold mb-1">Broker</h3>
                    <p className="text-[#767676] text-sm mb-1">
                      Connect buyers and sellers
                    </p>
                  </div>
                </div>

                <div
                  onClick={() => handleRoleSelect("owner")}
                  className={`w-full md:w-48 p-4 rounded-lg cursor-pointer transition-all flex flex-col items-center text-center mx-auto relative ${
                    selectedRole === "owner"
                      ? "bg-gradient-to-t from-[#D1E2DE] to-[#FFFFFF] shadow-md"
                      : "bg-gradient-to-b from-[#D1E2DE] to-[#FFFFFF] shadow-md"
                  }`}
                  style={{
                    borderBottom: selectedRole === "owner" ? "4px solid #429482" : "none",
                    borderRight: selectedRole === "owner" ? "2px solid #429482" : "none",
                    borderBottomRightRadius: selectedRole === "owner" ? "0.5rem" : "0",
                  }}
                >
                  <FaRegUserCircle className="text-[#429482] h-10 w-10 mb-2" />
                  <h3 className="text-xl font-bold mb-1">Owner</h3>
                  <p className="text-[#767676] text-sm mb-1">
                    Manage your properties
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 justify-center">
                <button
                  onClick={goBackToSignIn}
                  className="w-full border border-[#767676] text-[#767676] py-3 rounded-lg font-medium transition-colors hover:bg-gray-50"
                >
                  Back to Sign In
                </button>
                <button
                  onClick={openCreateAccountModal}
                  disabled={!selectedRole}
                  className={`w-full py-3 rounded-lg font-medium transition-colors ${
                    selectedRole
                      ? "bg-red-600 text-white hover:bg-red-700 cursor-pointer"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isCreateAccountModalOpen && (
        <SignUp
          onClose={closeCreateAccountModal}
          onBack={goBackToRoleSelection}
          onVerifyRequest={handleVerifyRequest}
          selectedRole={selectedRole}
        />
      )}

      {isVerifyModalOpen && (
        <VerifyContactNumber
          onClose={closeVerifyModal}
          onBack={
            mobileToVerify === signInMobileNumber
              ? goBackToSignInFromVerify
              : goBackToSignUpFromVerify
          }
          mobileNumber={mobileToVerify}
          userRole={user?.role}
        />
      )}
    </>
  );
};

export default Navbar;