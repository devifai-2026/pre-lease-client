import React from 'react';
import { CiCalendar } from 'react-icons/ci';
import { FaArrowTrendUp } from 'react-icons/fa6';

const RentalCards = () => {
    return (
        <div className='mt-10'>
             <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {/* 1 */}
          <div className="p-3 space-y-2 border border-[#C73834] rounded-md bg-[#FDEDEE]">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Gross Rental Yield</h2>
              <p className="text-xl text-[#C73834] font-bold">13.33%</p>
            </div>
            <p className="text-[#6B7280] text-sm">% Before expenses</p>
            <div className="space-y-2">
              <p className="text-[#6B7280] text-sm">Return before expenses.</p>
              <p className="text-[#6B7280] text-sm">
                Higher %=stronger rental income.
              </p>
            </div>
          </div>
          {/* 2 */}
          <div className="p-3 space-y-2 border border-[#26BFCC] rounded-md bg-[#D7EFF7]">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Net Rental Yield</h2>
              <p className="text-xl text-[#26BFCC] font-bold">12.11%</p>
            </div>
            <p className="text-[#6B7280] text-sm">% After expenses</p>
            <div className="space-y-2">
              <p className="text-[#6B7280] text-sm">
                Return after all expenses.
              </p>
              <p className="text-[#6B7280] text-sm">Shows your real profit.</p>
            </div>
          </div>
          {/* 3 */}
          <div className="p-3 space-y-2 border border-[#26BFCC] rounded-md bg-[#D7EFF7]">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Annual Cash Flow</h2>
              <FaArrowTrendUp className='text-[#429482] w-6 h-6'/>
            </div>
              <p className="text-xl text-[#429482] font-bold">₹5.35 Lakhs</p>
            <p className="text-[#6B7280] text-sm">$ Net annual income</p>
            <div className="space-y-2">
              <p className="text-[#6B7280] text-sm">Net yearly income.</p>
              <p className="text-[#6B7280] text-sm">
                Money you can use or reinvest.
              </p>
            </div>
          </div>
          {/* 4 */}
          <div className="p-3 space-y-2 border border-[#F7C952CC] rounded-md bg-[#FFFCF4]">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Payback Period</h2>
              <CiCalendar className='text-[#F7C952] h-6 w-6' />
            </div>
              <p className="text-xl text-[#F7C952] font-bold">9.1 years</p>
            <p className="text-[#6B7280] text-sm">Time to break even</p>
            <div className="space-y-2 ">
              <p className="text-[#6B7280] text-sm">Years to recover cost.</p>
              <p className="text-[#6B7280] text-sm">
                Shorter = quicker returns.
              </p>
            </div>
          </div>
        </div>
        </div>
    );
};

export default RentalCards;