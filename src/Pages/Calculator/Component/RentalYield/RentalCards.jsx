import React from 'react';
import { CiCalendar } from 'react-icons/ci';
import { FaArrowTrendUp } from 'react-icons/fa6';

const RentalCards = () => {
    return (
        <div className='mt-10'>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                {/* 1 - Mobile square design, Desktop original */}
                <div className="p-3 space-y-2 border-2 border-[#C73834] rounded-2xl bg-[#FDEDEE] lg:rounded-md h-full flex flex-col aspect-square lg:aspect-auto lg:flex-none">
                    {/* Mobile layout */}
                    <div className="flex-1 lg:flex-none">
                        <div className="flex flex-col  items-start  justify-between gap-1 lg:gap-0">
                            <h2 className="text-sm sm:text-base md:text-lg lg:text-lg font-semibold leading-tight lg:leading-normal">Gross Rental Yield</h2>
                            <p className="text-lg sm:text-xl lg:text-xl text-[#C73834] font-bold lg:text-left lg:text-center">13.33%</p>
                        </div>
                        <p className="text-xs sm:text-sm lg:text-sm text-[#6B7280] mt-1">% Before expenses</p>
                    </div>
                    <div className="space-y-1 lg:space-y-2 mt-auto pt-1 lg:mt-0 lg:pt-3 mb-3">
                        <p className="text-xs sm:text-sm lg:text-sm text-[#6B7280] leading-tight lg:leading-normal text-nowrap">Return before expenses.</p>
                        <p className="text-xs sm:text-sm lg:text-sm text-[#6B7280] leading-tight lg:leading-normal">
                            Higher %=stronger rental income.
                        </p>
                    </div>
                </div>

                {/* 2 - Mobile square design, Desktop original */}
                <div className="p-3 space-y-2 border-2 border-[#26BFCC] rounded-2xl bg-[#D7EFF7] lg:rounded-md h-full flex flex-col aspect-square lg:aspect-auto lg:flex-none">
                    <div className="flex-1 lg:flex-none">
                        <div className="flex flex-col items-start  justify-between ">
                            <h2 className="text-sm sm:text-base md:text-lg lg:text-lg font-semibold leading-tight lg:leading-normal">Net Rental Yield</h2>
                            <p className="text-lg sm:text-xl lg:text-xl text-[#26BFCC] font-bold lg:text-left lg:text-center">12.11%</p>
                        </div>
                        <p className="text-xs sm:text-sm lg:text-sm text-[#6B7280] mt-1">% After expenses</p>
                    </div>
                    <div className="space-y-1 lg:space-y-2 mt-auto pt-2 lg:mt-0 lg:pt-3">
                        <p className="text-xs sm:text-sm lg:text-sm text-[#6B7280] leading-tight lg:leading-normal text-nowrap">
                            Return after all expenses.
                        </p>
                        <p className="text-xs sm:text-sm lg:text-sm text-[#6B7280] leading-tight lg:leading-normal">Shows your real profit.</p>
                    </div>
                </div>

                {/* 3 - Mobile square design, Desktop original */}
                <div className="p-3 space-y-2 border-2 border-[#26BFCC] rounded-2xl bg-[#D7EFF7] lg:rounded-md h-full flex flex-col aspect-square lg:aspect-auto lg:flex-none">
                    <div className="flex-1 lg:flex-none">
                        <div className="flex items-center justify-between lg:flex-row">
                            <h2 className="text-sm sm:text-base md:text-lg lg:text-lg font-semibold leading-tight lg:leading-normal">Annual Cash Flow</h2>
                            <FaArrowTrendUp className='text-[#429482] w-5 h-5 sm:w-6 sm:h-6 lg:w-6 lg:h-6 hidden lg:block'/>
                        </div>
                        <p className="text-lg sm:text-xl lg:text-xl text-[#429482] font-bold mt-1 lg:mt-0">₹5.35 Lakhs</p>
                        <p className="text-xs sm:text-sm lg:text-sm text-[#6B7280] mt-1">$ Net annual income</p>
                    </div>
                    <div className="space-y-1 lg:space-y-2 mt-auto pt-2 lg:mt-0 lg:pt-3">
                        <p className="text-xs sm:text-sm lg:text-sm text-[#6B7280] leading-tight lg:leading-normal">Net yearly income.</p>
                        <p className="text-xs sm:text-sm lg:text-sm text-[#6B7280] leading-tight lg:leading-normal">
                            Money you can use or reinvest.
                        </p>
                    </div>
                </div>

                {/* 4 - Mobile square design, Desktop original */}
                <div className="p-3 space-y-2 border-2 border-[#F7C952CC] rounded-2xl bg-[#FFFCF4] lg:rounded-md h-full flex flex-col aspect-square lg:aspect-auto lg:flex-none">
                    <div className="flex-1 lg:flex-none">
                        <div className="flex items-center justify-between lg:flex-row">
                            <h2 className="text-sm sm:text-base md:text-lg lg:text-lg font-semibold leading-tight lg:leading-normal">Payback Period</h2>
                            <CiCalendar className='text-[#F7C952] h-5 w-5 sm:h-6 sm:w-6 lg:h-6 lg:w-6 hidden lg:block' />
                        </div>
                        <p className="text-lg sm:text-xl lg:text-xl text-[#F7C952] font-bold mt-1 lg:mt-0">9.1 years</p>
                        <p className="text-xs sm:text-sm lg:text-sm text-[#6B7280] mt-1">Time to break even</p>
                    </div>
                    <div className="space-y-1 lg:space-y-2 mt-auto pt-2 lg:mt-0 lg:pt-3">
                        <p className="text-xs sm:text-sm lg:text-sm text-[#6B7280] leading-tight lg:leading-normal">Years to recover cost.</p>
                        <p className="text-xs sm:text-sm lg:text-sm text-[#6B7280] leading-tight lg:leading-normal">
                            Shorter = quicker returns.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RentalCards;