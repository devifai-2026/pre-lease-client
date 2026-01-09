import React from 'react';

const OverView = () => {
    return (
        <div className="font-montserrat">
            <h2 className="text-[#EE2529] font-bold text-xl mb-6">Overview</h2>
            <p className="text-[#262626] text-lg font-medium mb-6">Property details & location</p>
            
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead>
                        <tr className="bg-[#F2F2F2]">
                            <th className="p-4 text-left text-[#262626] font-semibold border-r border-[#EDECEC]">
                                Property Type
                            </th>
                            <th className="p-4 text-left text-[#262626] font-semibold border-r border-[#EDECEC]">
                                Residensial Space
                            </th>
                            <th className="p-4 text-left text-[#262626] font-semibold border-r border-[#EDECEC]">
                                Commercial Office
                            </th>
                            <th className="p-4 text-left text-[#262626] font-semibold">
                                Retail Commercial
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Row 1 - Normal bg */}
                        <tr>
                            <td className="p-4 text-[#262626] font-semibold border-r border-[#EDECEC]">
                                Carpet Area
                            </td>
                            <td className="p-4 border-r border-[#EDECEC]">
                                4,202 sq.ft
                            </td>
                            <td className="p-4 border-r border-[#EDECEC]">
                                3,400 sq.ft
                            </td>
                            <td className="p-4">
                                5,200 sq.ft
                            </td>
                        </tr>
                        {/* Row 2 - #F2F2F2 bg */}
                        <tr className="bg-[#F2F2F2]">
                            <td className="p-4 text-[#262626] font-semibold border-r border-[#EDECEC]">
                                Location
                            </td>
                            <td className="p-4 border-r border-[#EDECEC]">
                                Bandra Kurla Complex, Mumbai
                            </td>
                            <td className="p-4 border-r border-[#EDECEC]">
                                Cyber City, Gurgaon
                            </td>
                            <td className="p-4">
                                Koramangala, Bangalore
                            </td>
                        </tr>
                        {/* Row 3 - Normal bg */}
                        <tr>
                            <td className="p-4 text-[#262626] font-semibold border-r border-[#EDECEC]">
                                Building Details
                            </td>
                            <td className="p-4 border-r border-[#EDECEC]">
                                Grade A building, 12 floors, Built in 2018
                            </td>
                            <td className="p-4 border-r border-[#EDECEC]">
                                Grade B+ building, 8 floors, Built in 2020
                            </td>
                            <td className="p-4">
                                Grade A building, 15 floors, Built in 2019
                            </td>
                        </tr>
                        {/* Row 4 - #F2F2F2 bg */}
                        <tr className="bg-[#F2F2F2]">
                            <td className="p-4 text-[#262626] font-semibold border-r border-[#EDECEC]">
                                Tenant Type
                            </td>
                            <td className="p-4 border-r border-[#EDECEC]">
                                MNC Client
                            </td>
                            <td className="p-4 border-r border-[#EDECEC]">
                                Banking
                            </td>
                            <td className="p-4">
                                Retail Chain
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OverView;