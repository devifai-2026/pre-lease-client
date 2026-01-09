import React from "react";
import { CiCalendar } from "react-icons/ci";
import { FaArrowTrendUp } from "react-icons/fa6";

const SummaryCards = () => {
  return (
    <div>
      <div className="mt-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {/* 1 */}
          <div className="p-3 space-y-2 border border-[#C73834] rounded-md bg-[#FDEDEE]">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Monthly EMI</h2>
              <p className="text-xl text-[#C73834] font-bold">₹40,760.231</p>
            </div>
            <p className="text-[#6B7280] text-sm">Fixed monthly payment</p>
            <div className="space-y-2">
              <p className="text-[#6B7280] text-sm">Fixed loan payment.</p>
              <p className="text-[#6B7280] text-sm">
                Tracks monthly liability.
              </p>
            </div>
          </div>
          {/* 2 */}
          <div className="p-3 space-y-2 border border-[#26BFCC] rounded-md bg-[#D7EFF7]">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Rent Coverage</h2>
              <p className="text-xl text-[#26BFCC] font-bold">122.7%</p>
            </div>
            <p className="text-[#6B7280] text-sm">% Rent vs EMI ratio</p>
            <div className="space-y-2">
              <p className="text-[#6B7280] text-sm">Rent ÷ EMI.</p>
              <p className="text-[#6B7280] text-sm">Higher = safer cash flow</p>
            </div>
          </div>
          {/* 3 */}
          <div className="p-3 space-y-2 border border-[#26BFCC] rounded-md bg-[#D7EFF7]">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Monthly Cash Flow</h2>
              <FaArrowTrendUp className="text-[#429482] w-6 h-6" />
            </div>
            <p className="text-xl text-[#429482] font-bold">₹9,239.769</p>
            <p className="text-[#6B7280] text-sm">$ Rent minus EMI</p>
            <div className="space-y-2">
              <p className="text-[#6B7280] text-sm">Net income after EMI.</p>
              <p className="text-[#6B7280] text-sm">Shows monthly profit</p>
            </div>
          </div>
          {/* 4 */}
          <div className="p-3 space-y-2 border border-[#F7C952CC] rounded-md bg-[#FFFCF4]">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Payback Period</h2>
              <CiCalendar className="text-[#F7C952] h-6 w-6" />
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
      <div className="mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* 1 */}
          <div className="p-3 shadow-md rounded-md">
            <h2 className="text-[#EE2529] text-lg md:text-xl mb-3 font-semibold">
              Loan Summery
            </h2>
            <div className="space-y-5">
              <div className="flex justify-between items-center">
                <p className="text-[#767676] text-sm">Loan Amount (₹)</p>
                <p className="font-semibold">31,50,000</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-[#767676] text-sm">Monthly EMI (₹)</p>
                <p className="font-semibold">40,760.231</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-[#767676] text-sm">
                  Total Interest Payable (₹)
                </p>
                <p className="font-semibold">17,41,227.676</p>
              </div>
            </div>
            <div className="mt-5">
              <hr />
            </div>
            <div className="flex justify-between items-center mt-5">
              <p className="text-black font-semibold text-sm">
                Total Repayment (₹)
              </p>
              <p className="font-semibold text-[#429482]">48,91,227.676</p>
            </div>
          </div>
          {/* 2 */}
          <div className="p-3 shadow-md rounded-md">
            <h2 className="text-[#EE2529] text-lg md:text-xl mb-3 font-semibold">
              Investment Summary
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <p className="text-[#767676] text-sm">Total Initial Cost (₹)</p>
                <p className="font-semibold ">17,25,000</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-[#767676] text-sm">
                  Monthly Rental Income (₹)
                </p>
                <p className="font-semibold ">50,000</p>
              </div>
              <div className="mt-5">
                <hr />
              </div>
              <div className="flex justify-between items-center mt-5">
                <p className="text-black font-semibold text-sm">
                  Net Monthly Cash Flow (₹)
                </p>
                <p className="font-semibold text-[#429482]">9,239.769</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCards;
