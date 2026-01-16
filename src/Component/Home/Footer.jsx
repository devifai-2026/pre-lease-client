import { CiLinkedin } from "react-icons/ci";
import logo from "../../assets/Footer/logo.png";
import { useState } from "react";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import fb from "../../assets/Footer/facebook.svg"
import li from "../../assets/Footer/linkedin.svg"
import yt from "../../assets/Footer/yt.svg"

const Footer = () => {
    const [isErrorPagesOpen, setIsErrorPagesOpen] = useState(false);

    return (
        <div className="footer bg-black text-white mt-16">
            {/* Main Footer Content */}
            <div className="footer-main p-6 md:p-10 max-w-[95%] mx-auto">
                {/* Links Grid */}
                <div className="links-grid grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6 lg:gap-12">
                  {/* Logo Section - Mobile: Left aligned and full width, Desktop: Original */}
<div className="logo-section flex flex-col justify-start items-start my-auto col-span-2 md:col-span-1">
    <img 
        src={logo} 
        alt="Prelease grid logo" 
        className="h-12 md:h-24 md:w-36  w-1/2 lg:w-auto mb-4"
    />
</div>
                    
                    {/* Quick Links Column - Mobile: Column 1, Row 1 */}
                    <div className="links-column">
                        <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Explore Properties</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Calculators</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Explore Brokers</a></li>
                        </ul>
                    </div>
                    
                    {/* Resources Column - Mobile: Column 1, Row 2 */}
                    <div className="links-column">
                        <h3 className="text-white font-semibold text-lg mb-4">Resources</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blogs</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">How it Works</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
                        </ul>
                    </div>
                    
                    {/* Legal Column - Mobile: Column 2, Row 1 */}
                    <div className="links-column relative">
                        {/* Desktop: Original Legal content */}
                        <div className="hidden md:block">
                            <h3 className="text-white font-semibold text-lg mb-4">Legal</h3>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
                                <li className="relative">
                                    {/* Error Pages Dropdown */}
                                    <div 
                                        className="flex items-center text-nowrap justify-between text-gray-400 transition-colors cursor-pointer bg-white rounded-md p-2 hidden lg:flex"
                                        onClick={() => setIsErrorPagesOpen(!isErrorPagesOpen)}
                                    >
                                        <span className="text-gray-800">Error Pages</span>
                                        <svg 
                                            className={`w-4 h-4 transition-transform ${isErrorPagesOpen ? 'rotate-180' : ''}`}
                                            fill="none" 
                                            stroke="currentColor" 
                                            viewBox="0 0 24 24" 
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                        </svg>
                                    </div>
                                    
                                    {/* Dropdown Menu */}
                                    {isErrorPagesOpen && (
                                        <div className="absolute left-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg z-10 overflow-hidden ">
                                            <ul className="py-1">
                                                <li>
                                                    <a 
                                                        href="#" 
                                                        className="block px-4 py-2 text-sm hover:bg-gray-100 transition-colors"
                                                    >
                                                        404 Page
                                                    </a>
                                                </li>
                                                <li>
                                                    <a 
                                                        href="#" 
                                                        className="block px-4 py-2 text-sm hover:bg-gray-100 transition-colors"
                                                    >
                                                        500 Page
                                                    </a>
                                                </li>
                                                <li>
                                                    <a 
                                                        href="#" 
                                                        className="block px-4 py-2 text-sm hover:bg-gray-100 transition-colors"
                                                    >
                                                        Maintenance Page
                                                    </a>
                                                </li>
                                                <li>
                                                    <a 
                                                        href="#" 
                                                        className="block px-4 py-2 text-sm hover:bg-gray-100 transition-colors"
                                                    >
                                                        Coming Soon
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </li>
                            </ul>
                        </div>
                        
                        {/* Mobile: Legal content */}
                        <div className="md:hidden">
                            <h3 className="text-white font-semibold text-lg mb-4">Legal</h3>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
                            </ul>
                        </div>
                    </div>
                    
                    {/* Social Icons Column - Mobile: Column 2, Row 2 */}
                    <div className="social-column md:hidden my-auto">
                       
                        <div className="social-links flex  space-x-4">
                           <FaFacebook  className="w-6 h-6 hover:text-white text-white cursor-pointer hover:scale-110 transition-all duration-300" src={fb} alt="Facebook" />
                           <img className="w-6 h-6 hover:text-white text-gray-500 cursor-pointer hover:scale-110 transition-all duration-300" src={li} alt="LinkedIn" />
                           <img className="w-6 h-6 hover:text-white text-gray-500 cursor-pointer hover:scale-110 transition-all duration-300" src={yt} alt="YouTube" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Copyright Section */}
            <div className="copyright-section border-t border-gray-800 py-6 max-w-[95%] mx-auto">
                <div className="px-4 md:px-8">
                    <p className="mb-5 text-gray-400 text-sm md:text-base leading-relaxed">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.
                    </p>
                    
                    <div className="flex flex-col md:flex-row justify-between items-center pt-4">
                        <p className="text-gray-500 text-sm mb-4 md:mb-0 order-2 md:order-1">
                            © 2025 PreLeaseGrid | All Rights Reserved
                        </p>
                        <div className="social-links hidden md:flex space-x-4 mb-4 md:mb-0 order-1 md:order-2">
                           <CiLinkedin className="w-7 h-7 hover:text-white text-gray-500 cursor-pointer hover:scale-110 transition-all duration-300" />
                           <FaInstagram className="w-7 h-7 hover:text-white text-gray-500 cursor-pointer hover:scale-110 transition-all duration-300" />
                           <FaYoutube className="w-7 h-7 hover:text-white text-gray-500 cursor-pointer hover:scale-110 transition-all duration-300" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;