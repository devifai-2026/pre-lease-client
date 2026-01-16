import React from 'react';

const LeaseTerms = () => {
    return (
        <div className="font-montserrat mt-10">
            <h2 className="text-[#EE2529] font-bold text-lg">Lease Terms</h2>
            <p className="text-[#767676] mb-6 text-sm">Lease agreement details</p>
            
            <div className="overflow-x-auto">
                <table className="min-w-full table-fixed">
                    <thead>
                        <tr className="bg-[#F2F2F2]">
                            <th className="p-4 text-[#262626] font-semibold text-lg text-left w-1/4">
                                Balance Lease Tenure
                            </th>
                            <th className="p-4 text-[#262626] text-lg font-normal text-center w-1/4">
                                4 years
                            </th>
                            <th className="p-4 text-[#262626] text-lg font-normal text-center w-1/4">
                                5 years
                            </th>
                            <th className="p-4 text-[#EE2529] text-lg font-normal text-center bg-[#FFFCF4] border-l-4 border-l-[#EE2529] w-1/4">
                                6 years
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Row 1 - Normal bg with Security Deposit highlighted in FOURTH column */}
                        <tr>
                            <td className="p-4 text-[#262626] font-semibold text-lg text-left w-1/4">
                                Security Deposit by Tenant
                            </td>
                            <td className="p-4 text-lg text-center w-1/4">
                                ₹7.2 L
                            </td>
                            <td className="p-4 text-lg text-center w-1/4">
                                ₹6.3 L
                            </td>
                            <td className="p-4 text-[#EE2529] text-lg text-center bg-[#FFFCF4] border-l-4 border-l-[#EE2529] w-1/4">
                                ₹10.1 L
                            </td>
                        </tr>
                        {/* Row 2 - #F2F2F2 bg with Lock-in Period highlighted in THIRD column */}
                        <tr className="bg-[#F2F2F2]">
                            <td className="p-4 text-[#262626] font-semibold text-lg text-left w-1/4">
                                Lock-in Period
                            </td>
                            <td className="p-4 text-lg text-center w-1/4">
                                3 years
                            </td>
                            <td className="p-4 text-[#EE2529] text-lg text-center bg-[#FFFCF4] border-l-4 border-l-[#EE2529] w-1/4">
                                7 years
                            </td>
                            <td className="p-4 text-lg text-center w-1/4">
                                5 years
                            </td>
                        </tr>
                        {/* Row 3 - Normal bg */}
                        <tr>
                            <td className="p-4 text-[#262626] font-semibold text-lg text-left w-1/4">
                                Annual Escalation of Lease
                            </td>
                            <td className="p-4 text-lg text-center w-1/4">
                                5%
                            </td>
                            <td className="p-4 text-lg text-center w-1/4">
                                4%
                            </td>
                            <td className="p-4 text-lg text-center w-1/4">
                                6%
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LeaseTerms;