import React from 'react';

const Facilities = () => {
    return (
        <div className="font-montserrat mt-10">
            <h2 className="text-[#EE2529] font-bold text-xl mb-2">Facilities & Features</h2>
            <p className="text-[#767676] text-sm mb-6">Amenities & specifications</p>
            
            <div className="overflow-x-auto">
                <table className="min-w-full table-fixed">
                    <thead>
                        <tr className="bg-[#F2F2F2]">
                            <th className="p-4 text-left text-[#262626] font-semibold border-r border-[#EDECEC] w-1/4">
                                Parking Spaces
                            </th>
                            <th className="p-4 text-[#262626] font-semibold text-lg text-center w-1/4">
                                10 slots
                            </th>
                            <th className="p-4 text-[#262626] font-semibold text-lg text-center w-1/4">
                                12 slots
                            </th>
                            <th className="p-4 text-[#262626] font-semibold text-lg text-center w-1/4">
                                15 slots
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Row 1 - Normal bg with Parking per sq ft Carpet Area highlighted in SECOND column */}
                        <tr>
                            <td className="p-4 text-[#262626] font-semibold border-r border-[#EDECEC] w-1/4">
                                Parking per sq ft Carpet Area
                            </td>
                            <td className="p-4 text-[#EE2529] text-lg text-center bg-[#FFFCF4] border-l-4 border-l-[#EE2529] w-1/4">
                                42 sq.ft/Parking
                            </td>
                            <td className="p-4 text-lg text-center w-1/4">
                                38 sq.ft/Parking
                            </td>
                            <td className="p-4 text-lg text-center w-1/4">
                                35 sq.ft/Parking
                            </td>
                        </tr>
                        {/* Row 2 - #F2F2F2 bg with Additional Income highlighted in FOURTH column */}
                        <tr className="bg-[#F2F2F2]">
                            <td className="p-4 text-[#262626] font-semibold  w-1/4">
                                Additional Income
                            </td>
                            <td className="p-4 text-lg text-center w-1/4">
                                Nil
                            </td>
                            <td className="p-4 text-lg text-center w-1/4">
                                Nil
                            </td>
                            <td className="p-4 text-[#EE2529] text-lg text-center bg-[#FFFCF4] border-l-4 border-l-[#EE2529] w-1/4">
                                715,000/month
                            </td>
                        </tr>
                        {/* Row 3 - Normal bg with Furniture Status highlighted in FOURTH column */}
                        <tr>
                            <td className="p-4 text-[#262626] font-semibold  w-1/4">
                                Furniture Status
                            </td>
                            <td className="p-4 text-lg text-center w-1/4">
                                Unfurnished
                            </td>
                            <td className="p-4 text-lg text-center w-1/4">
                                Semi-furnished
                            </td>
                            <td className="p-4 text-[#EE2529] text-lg text-center bg-[#FFFCF4] border-l-4 border-l-[#EE2529] w-1/4">
                                Furnished
                            </td>
                        </tr>
                        {/* Row 4 - #F2F2F2 bg */}
                        <tr className="bg-[#F2F2F2]">
                              <td className="p-4 text-[#262626] font-semibold  w-1/4">
                              Key Amenities
                            </td>
                            <td className="p-4 border-r border-[#EDECEC] w-1/4 align-top">
                                <div className="space-y-1 text-lg text-center">
                                    <div>High-speed Wi-Fi Enabled</div>
                                    <div>24/7 Power Backup</div>
                                    <div>Modern Conference Rooms</div>
                                    <div>Cafeteria</div>
                                    <div>Gym & Recreation Area</div>
                                </div>
                            </td>
                            <td className="p-4  w-1/4 align-top">
                                <div className="space-y-1 text-lg text-center">
                                    <div>Biometric Access Control</div>
                                    <div>Central Air Conditioning</div>
                                    <div>Dedicated Server Room</div>
                                    <div>Food Court</div>
                                    <div>Shopping Complex</div>
                                </div>
                            </td>
                            <td className="p-4  w-1/4 align-top">
                                <div className="space-y-1 text-lg text-center">
                                    <div>Prime Street Frontage</div>
                                    <div>Escalators & Elevators</div>
                                    <div>Fire Safety Systems</div>
                                    <div>Ample Parking Space</div>
                                    <div>Security Surveillance</div>
                                </div>
                            </td>
                            <td className="p-4 w-1/4 align-top"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Facilities;