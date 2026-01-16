import React from 'react';

const Productivity = () => {
    return (
        <div className="font-montserrat mt-10">
            <h2 className="text-[#EE2529] font-bold text-lg ">Productivity (Financials)</h2>
            <p className="text-[#767676] mb-6 text-sm ">Rent, yield, ROI analysis</p>
            
            <div className="overflow-x-auto">
                <table className="min-w-full table-fixed">
                    <thead>
                        <tr className="bg-[#F2F2F2]">
                            <th className="p-4 text-[#262626] font-semibold text-lg text-left w-1/4">
                                Property Value
                            </th>
                            <th className="p-4 text-[#262626] font-normal text-lg text-center w-1/4">
                                ₹8.5Cr
                            </th>
                            <th className="p-4 text-[#262626] font-normal text-lg text-center w-1/4">
                                ₹7.2Cr
                            </th>
                            <th className="p-4 text-[#262626] font-normal text-lg text-center w-1/4">
                                ₹6.5Cr
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Row 1 - Normal bg */}
                        <tr>
                            <td className="p-4 text-[#262626] font-semibold text-lg text-left w-1/4">
                                Rent per sq ft
                            </td>
                            <td className="p-4 text-lg text-center w-1/4">
                                ₹57
                            </td>
                            <td className="p-4 text-lg text-center w-1/4">
                                ₹62
                            </td>
                            <td className="p-4 text-lg text-center w-1/4">
                                ₹65
                            </td>
                        </tr>
                        {/* Row 2 - #F2F2F2 bg with Monthly Rent highlighted in SECOND column */}
                        <tr className="bg-[#F2F2F2]">
                            <td className="p-4 text-[#262626] font-semibold text-lg text-left w-1/4">
                                Monthly Rent
                            </td>
                            <td className="p-4 text-[#EE2529] text-lg text-center bg-[#FFFCF4] border-l-4 border-l-[#EE2529] w-1/4">
                                ₹6.5L
                            </td>
                            <td className="p-4 text-lg text-center w-1/4">
                                ₹5.8L
                            </td>
                            <td className="p-4 text-lg text-center w-1/4">
                                ₹5.2L
                            </td>
                        </tr>
                        {/* Row 3 - Normal bg */}
                        <tr>
                            <td className="p-4 text-[#262626] font-semibold text-lg text-left w-1/4">
                                Maintenance & Recurring Costs/Year
                            </td>
                            <td className="p-4 text-lg text-center w-1/4">
                                ₹44,099
                            </td>
                            <td className="p-4 text-lg text-center bg-[#FFFCF4] border-l-4 border-l-[#EE2529] w-1/4">
                                ₹34,850
                            </td>
                            <td className="p-4 text-lg text-center w-1/4">
                                ₹46,200
                            </td>
                        </tr>
                        {/* Row 4 - #F2F2F2 bg */}
                        <tr className="bg-[#F2F2F2]">
                            <td className="p-4 text-[#262626] font-semibold text-lg text-left w-1/4">
                                Recurring Costs per sq ft of Carpet Area
                            </td>
                            <td className="p-4 text-lg text-center w-1/4">
                                ₹10.5
                            </td>
                            <td className="p-4 text-lg text-center w-1/4">
                                ₹10.25
                            </td>
                            <td className="p-4 text-lg text-center bg-[#FFFCF4] border-l-4 border-l-[#EE2529] w-1/4">
                                ₹8.88
                            </td>
                        </tr>
                        {/* Row 5 - Normal bg */}
                        <tr>
                            <td className="p-4 text-[#262626] font-semibold text-lg text-left w-1/4">
                                Recurring Costs as % of Rent per Year
                            </td>
                            <td className="p-4 text-lg text-center w-1/4">
                                18.4%
                            </td>
                            <td className="p-4 text-lg text-center w-1/4">
                                16.5%
                            </td>
                            <td className="p-4 text-lg text-center w-1/4">
                                13.7%
                            </td>
                        </tr>
                        {/* Row 6 - #F2F2F2 bg with Gross Rental Yield highlighted in THIRD column */}
                        <tr className="bg-[#F2F2F2]">
                            <td className="p-4 text-[#262626] font-semibold text-lg text-left w-1/4">
                                Gross Rental Yield
                            </td>
                            <td className="p-4 text-lg text-center w-1/4">
                                8.7%
                            </td>
                            <td className="p-4 text-[#EE2529] text-lg text-center bg-[#FFFCF4] border-l-4 border-l-[#EE2529] w-1/4">
                                9.7%
                            </td>
                            <td className="p-4 text-lg text-center w-1/4">
                                9.6%
                            </td>
                        </tr>
                        {/* Row 7 - Normal bg with Net Rental Yield highlighted in FOURTH column */}
                        <tr>
                            <td className="p-4 text-[#262626] font-semibold text-lg text-left w-1/4">
                                Net Rental Yield
                            </td>
                            <td className="p-4 text-lg text-center w-1/4">
                                7.1%
                            </td>
                            <td className="p-4 text-lg text-center w-1/4">
                                8.1%
                            </td>
                            <td className="p-4 text-[#EE2529] text-lg text-center bg-[#FFFCF4] border-l-4 border-l-[#EE2529] w-1/4">
                                8.3%
                            </td>
                        </tr>
                        {/* Row 8 - #F2F2F2 bg with Payback Period highlighted in THIRD column */}
                        <tr className="bg-[#F2F2F2]">
                            <td className="p-4 text-[#262626] font-semibold text-lg text-left w-1/4">
                                Payback Period
                            </td>
                            <td className="p-4 text-lg text-center w-1/4">
                                8 years
                            </td>
                            <td className="p-4 text-[#EE2529] text-lg text-center bg-[#FFFCF4] border-l-4 border-l-[#EE2529] w-1/4">
                                7 years
                            </td>
                            <td className="p-4 text-lg text-center w-1/4">
                                9 years
                            </td>
                        </tr>
                        {/* Row 9 - Normal bg with ROI % highlighted in THIRD column */}
                        <tr>
                            <td className="p-4 text-[#262626] font-semibold text-lg text-left w-1/4">
                                ROI %
                            </td>
                            <td className="p-4 text-lg text-center w-1/4">
                                8.7%
                            </td>
                            <td className="p-4 text-[#EE2529] text-lg text-center bg-[#FFFCF4] border-l-4 border-l-[#EE2529] w-1/4">
                                9.7%
                            </td>
                            <td className="p-4 text-lg text-center w-1/4">
                                9.6%
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Productivity;