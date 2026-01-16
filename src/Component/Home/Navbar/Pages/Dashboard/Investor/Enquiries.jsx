import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import boxes from "../../../../../../assets/Dashboard/boxes.png"
import dateArrow from "../../../../../../assets/Dashboard/dateArrow.svg"
import show from "../../../../../../assets/Dashboard/show.svg"

const Enquiries = () => {
  const [data] = useState([
    {
      id: 1,
      date: '15/12/2025',
      property: 'Residential Space',
      location: 'Pune',
      tenant: 'AP Realtors',
      cost: '₹2.6 Crore'
    },
    {
      id: 2,
      date: '20/12/2025',
      property: 'Commercial Space',
      location: 'Mumbai',
      tenant: 'Global Innovations',
      cost: '₹3.6 Crore'
    },
    {
      id: 3,
      date: '15/12/2025',
      property: 'Residential Space',
      location: 'Pune',
      tenant: 'AP Realtors',
      cost: '₹2.6 Crore'
    },
    {
      id: 4,
      date: '20/12/2025',
      property: 'Commercial Space',
      location: 'Mumbai',
      tenant: 'Global Innovations',
      cost: '₹3.6 Crore'
    }
  ]);

  return (
    <div className="bg-white ">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-3 sm:gap-0">
        <h1 className="text-base md:text-lg lg:text-xl font-bold text-[#EE2529] text-center sm:text-left w-full sm:w-auto">
          Properties Under Enquiry
        </h1>
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-1 w-full sm:w-auto">
          <button className="flex items-center justify-between gap-2 px-3 py-1 w-full sm:w-[180px] lg:w-[200px] text-xs sm:text-sm border border-gray-300 rounded bg-[#F2F2F2] text-[#767676] hover:bg-gray-100 transition-colors">
            Last 30 Days
            <FaChevronDown size={10} />
          </button>
          <button className="flex items-center gap-2 border-r-2 pr-2 text-xs sm:text-sm hover:bg-gray-50 whitespace-nowrap">
            Sort by: <span className='text-[#EE2529]'> Date</span>
            <img className='text-[#EE2529]' src={dateArrow} alt="" />
          </button>
          <button className="text-xs sm:text-sm hover:bg-gray-50 flex items-center gap-2 whitespace-nowrap">
            Show as: <img className='h-3 w-3' src={show} alt="" />
            <img className='text-[#EE2529]' src={dateArrow} alt="" />
          </button>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto shadow-md rounded-lg">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300">
              <th className="text-left py-4 px-4 font-bold text-gray-800 w-24">Date</th>
              <th className="text-left py-4 px-4 font-bold text-gray-800">Property</th>
              <th className="text-left py-4 px-4 font-bold text-gray-800">Location</th>
              <th className="text-left py-4 px-4 font-bold text-gray-800">Tenant</th>
              <th className="text-left py-4 px-4 font-bold text-gray-800">Cost</th>
              <th className="text-left py-4 px-4 font-bold text-gray-800">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id} className={`border-b border-gray-200 hover:bg-gray-50`}>
                <td className="py-4 px-4 text-gray-700">{row.date}</td>
                <td className="py-4 px-4 text-gray-700">{row.property}</td>
                <td className="py-4 px-4 text-gray-700">{row.location}</td>
                <td className="py-4 px-4 text-gray-700">{row.tenant}</td>
                <td className="py-4 px-4 text-gray-700 font-medium">{row.cost}</td>
                <td className="py-4 px-4">
                  <button className="px-4 py-2 border border-gray-400 rounded text-gray-700 hover:bg-gray-100 transition text-sm">
                    view
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile/Tablet Cards */}
      <div className="block lg:hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {data.map((row) => (
            <div key={row.id} className="bg-white shadow-md rounded-lg p-4 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <p className="text-xs text-gray-500 font-medium">Date</p>
                  <p className="text-gray-700 font-medium">{row.date}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Location</p>
                  <p className="text-gray-700 font-medium">{row.location}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-xs text-gray-500 font-medium">Property</p>
                  <p className="text-gray-700 font-medium">{row.property}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-xs text-gray-500 font-medium">Tenant</p>
                  <p className="text-gray-700 font-medium">{row.tenant}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-xs text-gray-500 font-medium">Cost</p>
                  <p className="text-gray-700 font-medium text-lg">{row.cost}</p>
                </div>
              </div>
              <div className="flex justify-center">
                <button className="w-full sm:w-auto px-4 py-2 border border-gray-400 rounded text-gray-700 hover:bg-gray-100 transition text-sm">
                  view
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Enquiries;