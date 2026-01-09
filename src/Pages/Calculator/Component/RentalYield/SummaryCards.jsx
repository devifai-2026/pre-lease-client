import React from 'react';

const SummaryCards = () => {
    return (
        <div className="mt-10">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* 1 */}
                      <div className="p-3 shadow-md rounded-md">
                        <h2 className="text-[#EE2529] text-lg md:text-xl mb-3 font-semibold">
                          Investment Summery
                        </h2>
                        <div className="space-y-5">
                          <div className="flex justify-between items-center">
                            <p className="text-[#767676] text-sm">
                              Total Initial Investment (₹)
                            </p>
                            <p className="font-semibold">48,52,500</p>
                          </div>
                          <div className="flex justify-between items-center">
                            <p className="text-[#767676] text-sm">Gross Annual Rent (₹)</p>
                            <p className="font-semibold">6,00,000</p>
                          </div>
                          <div className="flex justify-between items-center">
                            <p className="text-[#767676] text-sm">
                              Total Annual Expenses (₹)
                            </p>
                            <p className="font-semibold">65,000</p>
                          </div>
                        </div>
                        <div className="mt-5">
                          <hr />
                        </div>
                        <div className="flex justify-between items-center mt-5">
                          <p className="text-black font-semibold text-sm">
                            Net Annual Income (₹)
                          </p>
                          <p className="font-semibold text-[#429482]">5,35,000</p>
                        </div>
                      </div>
                      {/* 2 */}
                      <div className="p-3 shadow-md rounded-md">
                        <h2 className="text-[#EE2529] text-lg md:text-xl mb-3 font-semibold">
                          Additional Income
                        </h2>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <p className="text-[#767676] text-sm">
                              Annual Interest on <br /> Security Deposit (₹)
                            </p>
                            <p className="font-semibold text-[#429482]">25,500</p>
                          </div>
                          <div className="flex justify-between items-center">
                            <p className="text-[#000000] text-sm">
                              Total Annual Return (₹)
                            </p>
                            <p className="font-semibold text-[#429482]">5,60,500</p>
                          </div>
                        </div>
                      </div>
                    </div>
        </div>
    );
};

export default SummaryCards;