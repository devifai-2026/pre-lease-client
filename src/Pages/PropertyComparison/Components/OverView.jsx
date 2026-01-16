import React from 'react';

const OverView = () => {
    return (
        <div className="font-montserrat">
            <h2 className="text-[#EE2529] font-bold  text-lg">Overview</h2>
            <p className="text-[#767676]  mb-6 text-sm">Property details & location</p>
            
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead>
                        <tr className="bg-[#F2F2F2]">
                            <th className="p-4 text-[#262626] font-semibold text-left text-lg">
                                Property Type
                            </th>
                            <th className="p-4  font-normal text-center text-lg">
                                Residential Space
                            </th>
                            <th className="p-4 text-[#262626]  font-normal  text-center text-lg">
                                Commercial Office
                            </th>
                            <th className="p-4 text-[#262626] text-center font-normal text-lg">
                                Retail Commercial
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Row 1 - Normal bg */}
                        <tr>
                            <td className="p-4 text-[#262626] font-semibold  text-left text-lg">
                                Carpet Area
                            </td>
                            <td className="p-4  text-center text-lg">
                                4,202 sq.ft
                            </td>
                            <td className="p-4  text-center text-lg">
                                3,400 sq.ft
                            </td>
                            <td className="p-4 text-center text-lg">
                                5,200 sq.ft
                            </td>
                        </tr>
                        {/* Row 2 - #F2F2F2 bg */}
                        <tr className="bg-[#F2F2F2]">
                            <td className="p-4 text-[#262626] font-semibold  text-left text-lg">
                                Location
                            </td>
                            <td className="p-4  text-center text-lg">
                                Bandra Kurla Complex, Mumbai
                            </td>
                            <td className="p-4  text-center text-lg">
                                Cyber City, Gurgaon
                            </td>
                            <td className="p-4 text-center text-lg">
                                Koramangala, Bangalore
                            </td>
                        </tr>
                        {/* Row 3 - Normal bg */}
                        <tr>
                            <td className="p-4 text-[#262626] font-semibold text-nowrap text-left text-lg">
                                Building Details
                            </td>
                            <td className="p-4  text-center text-lg">
                                Grade A building, 12 floors, Built in 2018
                            </td>
                            <td className="p-4  text-center text-lg">
                                Grade B+ building, 8 floors, Built in 2020
                            </td>
                            <td className="p-4 text-center text-lg">
                                Grade A building, 15 floors, Built in 2019
                            </td>
                        </tr>
                        {/* Row 4 - #F2F2F2 bg */}
                        <tr className="bg-[#F2F2F2]">
                            <td className="p-4 text-[#262626] font-semibold text-left text-lg">
                                Tenant Type
                            </td>
                            <td className="p-4  text-center text-lg">
                                MNC Client
                            </td>
                            <td className="p-4  text-center text-lg">
                                Banking
                            </td>
                            <td className="p-4 text-center text-lg">
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