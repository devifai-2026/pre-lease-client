import React, { useState } from 'react';
import { MdOutlineMail } from 'react-icons/md';
import { FaMobileAlt } from 'react-icons/fa';
import arrow from "../../../../../../assets/Dashboard/arrow.png";
import img from "../../../../../../assets/Dashboard/img.jpg";
import EnquiredProperties from "./EnquiredProperties";
import MyPortfolio from "./MyPortfolio";
import MyProperties from "./MyProperties";
import squarebg from "../../../../../../assets/propertyDetails/squaresbg.png";

const Owner = () => {
    const [activeTab, setActiveTab] = useState("portfolio");

    // Summary Cards Data for Owner
    const summaryData = [
        { label: 'Total Property Value', value: '₹8.7 Crore', color: '#EE2529' },
        { label: 'Properties Owned', value: '4', color: '#EE2529' },
        { label: 'Average Occupancy', value: '90%', color: '#EE2529' }
    ];

    return (
        <div 
            className="w-full px-3 sm:px-4 md:px-6 mx-auto mt-4 sm:mt-5 md:mt-6"
            style={{
                backgroundImage: `url(${squarebg})`,
                backgroundSize: '80% auto',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'top right',
                backgroundOpacity: '0.05'
            }}
        >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
                {/* left side - Mobile: full width, Desktop: 4 columns */}
                <div className="lg:col-span-4">
                    {/* first card */}
                    <div className="shadow-md rounded-md p-4 sm:p-5">
                        {/* Profile Section */}
                        <div className="flex items-center gap-4 sm:gap-5">
                            <div>
                                <img 
                                    className="h-16 w-16 sm:h-18 sm:w-18 md:h-20 md:w-20 rounded-md" 
                                    src={img} 
                                    alt="Profile" 
                                />
                            </div>
                            <div className="space-y-1">
                                <h2 className="text-[#EE2529] font-bold text-base sm:text-lg">
                                    Rohit Sharma
                                </h2>
                                <p className="bg-[#FFF3CA] rounded-3xl py-1 px-2 text-[#EE2529] flex items-center justify-center gap-2 text-xs sm:text-sm">
                                    <img src={arrow} alt="arrow" className="h-3 w-3" />
                                    Owner
                                </p>
                            </div>
                        </div>
                        
                        {/* Stats Section */}
                        <div className="border-t border-b border-[#7676761A] flex items-center justify-between py-3 mt-3 sm:mt-4">
                            <div className="border-r border-[#7676761A] text-center flex-1">
                                <h2 className="text-[#767676] text-sm sm:text-base md:text-xl leading-5">
                                    Properties Listed
                                </h2>
                                <p className="text-[#EE2529] font-bold mt-1 sm:mt-2 text-base sm:text-lg">4</p>
                            </div>
                            <div className="text-center flex-1">
                                <h2 className="text-[#767676] text-sm sm:text-base md:text-xl leading-5">
                                    VACANT PROPERTIES
                                </h2>
                                <p className="text-[#EE2529] font-bold mt-1 sm:mt-2 text-base sm:text-lg">1</p>
                            </div>
                        </div>
                        
                        {/* Contact Section */}
                        <div className="mt-3 sm:mt-4 space-y-2 sm:space-y-3">
                            <div className="space-y-1 sm:space-y-2">
                                <p className="flex items-center gap-1 uppercase text-xs sm:text-sm">
                                    <MdOutlineMail className="text-[#EE2529] font-bold h-4 w-4 sm:h-5 sm:w-5" />
                                    <span className="text-[#767676]">EMAIL</span>
                                </p>
                                <p className="text-sm sm:text-base md:text-xl">rohit.sharma@example.com</p>
                            </div>
                            <div className="space-y-1 sm:space-y-2">
                                <p className="flex items-center gap-1 uppercase text-xs sm:text-sm">
                                    <FaMobileAlt className="text-[#EE2529] font-bold h-4 w-4 sm:h-5 sm:w-5" />
                                    <span className="text-[#767676]">MOBILE NO.</span>
                                </p>
                                <p className="text-sm sm:text-base md:text-xl">+91.987654-43210</p>
                            </div>
                            <div className="pt-2">
                                <button className="border border-[#767676] py-1 px-4 sm:px-5 rounded-md text-[#767676] flex justify-center mx-auto text-sm sm:text-base md:text-lg hover:bg-gray-50 transition-colors">
                                    Edit
                                </button>
                            </div>
                            <p className="text-[#76767680] text-center mt-3 text-xs sm:text-sm">
                                Joined on: 26 Aug 2025<br className="sm:hidden" /> Last log in: 13 Aug 2025
                            </p>
                        </div>
                    </div>
                    
                    {/* Switch Accounts Section */}
                    <div className="mt-4 sm:mt-5 space-y-3">
                        <h2 className="font-semibold text-base sm:text-lg mb-3">Switch accounts</h2>
                        
                        {/* Investor Account */}
                        <div className="flex items-center justify-between shadow-md rounded-md p-4 sm:p-5">
                            <div className="flex items-center gap-4 sm:gap-5">
                                <div>
                                    <img 
                                        className="h-12 w-12 sm:h-14 sm:w-14 rounded-md" 
                                        src={img} 
                                        alt="Investor Profile" 
                                    />
                                </div>
                                <div className="space-y-1">
                                    <h2 className="text-[#EE2529] font-bold text-sm sm:text-base">Rohit S</h2>
                                    <p className="bg-[#FFF3CA] rounded-3xl py-1 px-2 text-[#EE2529] flex items-center justify-center gap-2 text-xs sm:text-sm">
                                        <img src={arrow} alt="arrow" className="h-3 w-3" />
                                        Investor
                                    </p>
                                </div>
                            </div>
                            <div>
                                <button className="border border-[#767676] py-1 px-3 sm:px-4 rounded-md text-[#767676] text-xs sm:text-sm md:text-base hover:bg-gray-50 transition-colors">
                                    Switch
                                </button>
                            </div>
                        </div>
                        
                        {/* Broker Account */}
                        <div className="flex items-center justify-between shadow-md rounded-md p-4 sm:p-5">
                            <div className="flex items-center gap-4 sm:gap-5">
                                <div>
                                    <img 
                                        className="h-12 w-12 sm:h-14 sm:w-14 rounded-md" 
                                        src={img} 
                                        alt="Broker Profile" 
                                    />
                                </div>
                                <div className="space-y-1">
                                    <h2 className="text-[#EE2529] font-bold text-sm sm:text-base">Rohit S</h2>
                                    <p className="bg-[#FFF3CA] rounded-3xl py-1 px-2 text-[#EE2529] flex items-center justify-center gap-2 text-xs sm:text-sm">
                                        <img src={arrow} alt="arrow" className="h-3 w-3" />
                                        Broker
                                    </p>
                                </div>
                            </div>
                            <div>
                                <button className="border border-[#767676] py-1 px-3 sm:px-4 rounded-md text-[#767676] text-xs sm:text-sm md:text-base hover:bg-gray-50 transition-colors">
                                    Create
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Support Section */}
                    <div className="mt-6 sm:mt-8 space-y-3 sm:space-y-4 text-center">
                        <h2 className="text-[#EE2529] text-lg sm:text-xl font-semibold">
                            Need Assistance?
                        </h2>
                        <p className="text-xs sm:text-sm md:text-base px-2 sm:px-0">
                            Have questions about returns, tenants, or documents? Our team is
                            here to guide you each step. Get clear answers on rental yields,
                            ROI, and compliance directly from our property advisors.
                        </p>
                        <button className="border border-[#767676] py-1 px-4 sm:px-5 rounded-md text-[#767676] text-sm sm:text-base md:text-lg hover:bg-gray-50 transition-colors">
                            Get Support
                        </button>
                    </div>
                </div>
                
                {/* right side - Mobile: full width, Desktop: 8 columns */}
                <div className="lg:col-span-8 mt-6 lg:mt-0">
                    {/* Tabs Section */}
                    <div className="shadow-md rounded-lg p-3 flex items-center justify-between sm:justify-around space-x-1 sm:space-x-0">
                        {/* My Portfolio Tab */}
                        <div
                            className="cursor-pointer relative flex-1 sm:flex-none text-center"
                            onClick={() => setActiveTab("portfolio")}
                        >
                            <p
                                className={`text-sm sm:text-base md:text-lg ${
                                    activeTab === "portfolio"
                                        ? "text-[#EE2529] font-bold"
                                        : "text-[#767676] font-normal"
                                }`}
                            >
                                My Portfolio
                            </p>
                            {/* Bottom border for active tab */}
                            {activeTab === "portfolio" && (
                                <div className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-4/5 sm:w-full h-1 bg-[#EE2529]"></div>
                            )}
                        </div>

                        {/* My Properties Tab */}
                        <div
                            className="cursor-pointer relative flex-1 sm:flex-none text-center"
                            onClick={() => setActiveTab("properties")}
                        >
                            <p
                                className={`text-sm sm:text-base md:text-lg ${
                                    activeTab === "properties"
                                        ? "text-[#EE2529] font-bold"
                                        : "text-[#767676] font-normal"
                                }`}
                            >
                                My Properties
                            </p>
                            {/* Bottom border for active tab */}
                            {activeTab === "properties" && (
                                <div className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-4/5 sm:w-full h-1 bg-[#EE2529]"></div>
                            )}
                        </div>

                        {/* Enquired Properties Tab */}
                        <div
                            className="cursor-pointer relative flex-1 sm:flex-none text-center"
                            onClick={() => setActiveTab("enquired")}
                        >
                            <p
                                className={`text-sm sm:text-base md:text-lg ${
                                    activeTab === "enquired"
                                        ? "text-[#EE2529] font-bold"
                                        : "text-[#767676] font-normal"
                                }`}
                            >
                                Enquired Properties
                            </p>
                            {/* Bottom border for active tab */}
                            {activeTab === "enquired" && (
                                <div className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-4/5 sm:w-full h-1 bg-[#EE2529]"></div>
                            )}
                        </div>
                    </div>
                    
                    {/* Content based on active tab */}
                    <div className="mt-4 sm:mt-6">
                        {/* Summary Cards - Responsive */}
                        <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                            {summaryData.map((item, index) => (
                                <div 
                                    key={index} 
                                    className="bg-white shadow-lg rounded-lg p-3 sm:p-4 flex-1 min-w-[calc(50%-6px)] sm:min-w-0"
                                >
                                    <p className="text-xs sm:text-sm md:text-base lg:text-xl text-[#767676] mb-1 sm:mb-2">
                                        {item.label}
                                    </p>
                                    <p 
                                        style={{ color: item.color }} 
                                        className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold"
                                    >
                                        {item.value}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Tab Content */}
                        <div className="p-3 sm:p-4 md:p-5">
                            {activeTab === "portfolio" && (
                                <MyPortfolio />
                            )}
                            
                            {activeTab === "properties" && (
                                <MyProperties />
                            )}
                            
                            {activeTab === "enquired" && (
                                <EnquiredProperties />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Owner;