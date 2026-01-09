import React from 'react';

const Document = () => {
    return (
        <div className="font-montserrat mt-10">
            <h2 className="text-[#EE2529] font-bold text-xl mb-2"> Documents & Compliance</h2>
            <p className="text-[#767676] text-sm  mb-6">Legal documents & certificates</p>
            
            <div className="overflow-x-auto">
                <table className="min-w-full table-fixed">
                    <thead>
                        <tr className="bg-[#F2F2F2]">
                            <th className="p-4 text-left text-[#262626] font-semibold border-r border-[#EDECEC] w-1/4">
                                Ownership Proof
                            </th>
                            <th className="p-4 text-left text-[#262626] border-r border-[#EDECEC] w-1/4">
                                ✓ Available
                            </th>
                            <th className="p-4 text-left text-[#262626] border-r border-[#EDECEC] w-1/4">
                                ✓ Available
                            </th>
                            <th className="p-4 text-left text-[#262626] w-1/4">
                                ✓ Available
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Row 1 - Normal bg */}
                        <tr>
                            <td className="p-4 text-[#262626] font-semibold border-r border-[#EDECEC] w-1/4">
                                Lease Agreement
                            </td>
                            <td className="p-4 text-[#262626] border-r border-[#EDECEC] w-1/4">
                                ✓ Available
                            </td>
                            <td className="p-4 text-[#262626] border-r border-[#EDECEC] w-1/4">
                                ✓ Available
                            </td>
                            <td className="p-4 text-[#262626] w-1/4">
                                ✓ Available
                            </td>
                        </tr>
                        {/* Row 2 - #F2F2F2 bg */}
                        <tr className="bg-[#F2F2F2]">
                            <td className="p-4 text-[#262626] font-semibold border-r border-[#EDECEC] w-1/4">
                                Legal Status - OC
                            </td>
                            <td className="p-4 text-[#262626] border-r border-[#EDECEC] w-1/4">
                                ✓ Available
                            </td>
                            <td className="p-4 text-[#262626] border-r border-[#EDECEC] w-1/4">
                                ✓ Available
                            </td>
                            <td className="p-4 text-[#262626] w-1/4">
                                ✓ Available
                            </td>
                        </tr>
                        {/* Row 3 - Normal bg */}
                        <tr>
                            <td className="p-4 text-[#262626] font-semibold border-r border-[#EDECEC] w-1/4">
                                Building Certifications
                            </td>
                            <td className="p-4 text-[#262626] border-r border-[#EDECEC] w-1/4">
                                ✓ Up to date LEED Certified
                            </td>
                            <td className="p-4 text-[#262626] border-r border-[#EDECEC] w-1/4">
                                ✓ Up to date IGBC Certified
                            </td>
                            <td className="p-4 text-[#262626] w-1/4">
                                ✓ Up to date IGBC Certified
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Document;