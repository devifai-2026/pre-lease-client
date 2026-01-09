import React from "react";

const LeaseDetails = () => {
  return (
    <>
      {/* Left side cards container */}
      <div className="space-y-2">
        {/* Tenant Information Card */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-3 sm:p-4 pt-1 sm:pt-2">
            <div className="space-y-1 sm:space-y-2">
              <div className="flex items-start justify-between flex-col">
                <p className="text-[#EE2529] font-semibold">Tenant Information</p>
                <div className="flex flex-col  pr-1 sm:pr-2">
                  <p className="text-[#767676] text-xs sm:text-sm">Tenant Type</p>
                  <p className="font-semibold text-xs sm:text-sm">MNC (Multi-National Corporation)</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Rental & Deposit Details Card */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="pt-3 sm:pt-4 md:pt-5">
            <p className="  text-[#EE2529] pl-3 sm:pl-4 font-semibold">
              Rental & Deposit Details
            </p>
          </div>
          <div className="p-3 sm:p-4 pt-1 sm:pt-2">
            <div className="space-y-1 sm:space-y-2">
              <div className="flex items-start justify-between">
                <div className="flex flex-col w-1/2 pr-1 sm:pr-2">
                  <p className="text-[#767676] text-xs sm:text-sm">Total Monthly Rent</p>
                  <p className="font-semibold text-xs sm:text-sm">₹2,39,514</p>
                </div>
                <div className="flex flex-col w-1/2 pl-1 sm:pl-2">
                  <p className="text-[#767676] text-xs sm:text-sm">Security Deposit</p>
                  <p className="font-semibold text-xs sm:text-sm">3 months</p>
                </div>
              </div>
              <div className="flex items-start justify-between pt-2 sm:pt-3">
                <div className="flex flex-col w-1/2 pr-1 sm:pr-2">
                  <p className="text-[#767676] text-xs sm:text-sm">Rent per sq ft (Monthly)</p>
                  <p className="font-semibold text-xs sm:text-sm">₹57</p>
                </div>
                <div className="flex flex-col w-1/2 pl-1 sm:pl-2">
                  <p className="text-[#767676] text-xs sm:text-sm">Security Deposit Amount</p>
                  <p className="font-semibold text-xs sm:text-sm">₹7,18,542</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Maintenance Scope Card */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="pt-3 sm:pt-4 md:pt-5">
            <p className="text-[#EE2529] pl-3 sm:pl-4 font-semibold">
              Maintenance Scope
            </p>
          </div>
          <div className="p-3 sm:p-4 pt-1 sm:pt-2">
            <div className="space-y-1 sm:space-y-2">
              <div className="flex items-start justify-between">
                <div className="flex flex-col  pr-1 sm:pr-2">
                  <p className="text-[#767676] text-xs sm:text-sm">Primary Maintenance Responsibility</p>
                  <p className="font-semibold text-xs sm:text-sm">Tenant (Internal maintenance)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side cards container */}
      <div className="space-y-4 sm:space-y-6">
        {/* Lease Duration & Terms Card */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="pt-3 sm:pt-4 md:pt-5">
            <p className="text-[#EE2529] font-semibold pl-3 sm:pl-4">
              Lease Duration & Terms
            </p>
          </div>
          <div className="p-3 sm:p-4 pt-1 sm:pt-2">
            <div className="space-y-1 sm:space-y-2">
              <div className="flex items-start justify-between">
                <div className="flex flex-col w-1/2 pr-1 sm:pr-2">
                  <p className="text-[#767676] text-xs sm:text-sm">Lease Start Date</p>
                  <p className="font-semibold text-xs sm:text-sm">15 January 2023</p>
                </div>
                <div className="flex flex-col w-1/2 pl-1 sm:pl-2">
                  <p className="text-[#767676] text-xs sm:text-sm">Lease Expiry Date</p>
                  <p className="font-semibold text-xs sm:text-sm">14 January 2032</p>
                </div>
              </div>
              <div className="flex items-start justify-between pt-2 sm:pt-3">
                <div className="flex flex-col w-1/2 pr-1 sm:pr-2">
                  <p className="text-[#767676] text-xs sm:text-sm">Lock-in Period</p>
                  <p className="font-semibold text-xs sm:text-sm">5 years</p>
                </div>
                <div className="flex flex-col w-1/2 pl-1 sm:pl-2">
                  <p className="text-[#767676] text-xs sm:text-sm">Lease duration</p>
                  <p className="font-semibold text-xs sm:text-sm">10 years</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Escalation Terms Card */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="pt-3 sm:pt-4 md:pt-5">
            <p className="text-[#EE2529] font-semibold pl-3 sm:pl-4">
              Escalation Terms
            </p>
          </div>
          <div className="p-3 sm:p-4 pt-1 sm:pt-2">
            <div className="space-y-1 sm:space-y-2">
              <div className="flex items-start justify-between">
                <div className="flex flex-col w-1/2 pr-1 sm:pr-2">
                  <p className="text-[#767676] text-xs sm:text-sm">Escalation Rate</p>
                  <p className="font-semibold text-xs sm:text-sm">5%</p>
                </div>
                <div className="flex flex-col w-1/2 pl-1 sm:pl-2">
                  <p className="text-[#767676] text-xs sm:text-sm">Escalation Frequency</p>
                  <p className="font-semibold text-xs sm:text-sm">Every 3 years</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeaseDetails;