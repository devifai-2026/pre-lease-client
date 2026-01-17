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

  // State for dropdowns
  const [timeRangeOpen, setTimeRangeOpen] = useState(false);
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [showAsOpen, setShowAsOpen] = useState(false);
  const [selectedTimeRange, setSelectedTimeRange] = useState('Last 30 Days');
  const [selectedView, setSelectedView] = useState('list');

  // Time range options
  const timeRangeOptions = ['Last 7 Days', 'Last 30 Days', 'Last 90 Days', 'Last Year', 'Custom Range'];

  return (
    <div className="bg-white ">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-3 sm:gap-0">
        <h1 className="text-base md:text-lg lg:text-xl font-bold text-[#EE2529] text-center sm:text-left w-full sm:w-auto">
          Properties Under Enquiry
        </h1>
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-1 w-full sm:w-auto relative">
          
          {/* Last 30 Days Dropdown */}
          <div className="relative w-full sm:w-[180px] lg:w-[200px]">
            <button 
              className="flex items-center justify-between gap-2 px-3 py-1 w-full text-xs sm:text-sm border border-gray-300 rounded bg-[#F2F2F2] text-[#767676] hover:bg-gray-100 transition-colors"
              onClick={() => setTimeRangeOpen(!timeRangeOpen)}
            >
              {selectedTimeRange}
              <FaChevronDown size={10} className={`transition-transform ${timeRangeOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {timeRangeOpen && (
              <div className="absolute top-full left-0 mt-1 w-full bg-white shadow-lg rounded-md z-10">
                <ul className="py-1">
                  {timeRangeOptions.map((option) => (
                    <li key={option}>
                      <button
                        className="w-full px-3 py-2 text-left text-xs sm:text-sm text-[#767676] hover:bg-[#F2F2F2] transition-colors"
                        onClick={() => {
                          setSelectedTimeRange(option);
                          setTimeRangeOpen(false);
                        }}
                      >
                        {option}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sort by: Date with Calendar */}
          <div className="relative">
            <button 
              className="flex items-center gap-2 border-r-2 pr-2 text-xs sm:text-sm hover:bg-gray-50 whitespace-nowrap"
              onClick={() => setDatePickerOpen(!datePickerOpen)}
            >
              Sort by: <span className='text-[#EE2529]'>Date</span>
              <img className='text-[#EE2529]' src={dateArrow} alt="" />
            </button>
            
            {datePickerOpen && (
              <div className="absolute top-full right-0 mt-1 bg-white shadow-lg rounded-md z-10 p-3 min-w-[200px]">
                <div className="mb-2">
                  <label className="block text-xs text-[#767676] mb-1">Select Date</label>
                  <input
                    type="date"
                    className="w-full px-3 py-1 border border-gray-300 rounded text-sm text-[#767676] bg-[#F2F2F2]"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    className="flex-1 px-3 py-1 bg-[#F2F2F2] text-[#767676] text-xs rounded hover:bg-gray-100"
                    onClick={() => setDatePickerOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="flex-1 px-3 py-1 bg-[#EE2529] text-white text-xs rounded hover:bg-red-600"
                    onClick={() => setDatePickerOpen(false)}
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Show as Dropdown */}
          <div className="relative">
            <button 
              className="text-xs sm:text-sm hover:bg-gray-50 flex items-center gap-2 whitespace-nowrap"
              onClick={() => setShowAsOpen(!showAsOpen)}
            >
              Show as: <img className='h-3 w-3' src={show} alt="" />
              <img className='text-[#EE2529]' src={dateArrow} alt="" />
            </button>
            
            {showAsOpen && (
              <div className="absolute top-full right-0 mt-1 bg-white shadow-lg rounded-md z-10 min-w-[120px]">
                <ul className="py-1">
                  <li>
                    <button
                      className="w-full px-3 py-2 flex items-center gap-2 text-xs sm:text-sm text-[#767676] hover:bg-[#F2F2F2] transition-colors"
                      onClick={() => {
                        setSelectedView('list');
                        setShowAsOpen(false);
                      }}
                    >
                      <img className='h-3 w-3' src={show} alt="" />
                      List View
                    </button>
                  </li>
                  <li>
                    <button
                      className="w-full px-3 py-2 flex items-center gap-2 text-xs sm:text-sm text-[#767676] hover:bg-[#F2F2F2] transition-colors"
                      onClick={() => {
                        setSelectedView('grid');
                        setShowAsOpen(false);
                      }}
                    >
                      <img src={boxes} alt="" className="h-3 w-3" />
                      Grid View
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Desktop Table - Shows when view is 'list' */}
      {selectedView === 'list' && (
        <div className="hidden lg:block overflow-x-auto shadow-md rounded-lg">
          <div className="p-4">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-300">
                  <th className="py-4 px-4 font-bold text-gray-800 w-24 text-center align-middle">Date</th>
                  <th className="py-4 px-4 font-bold text-gray-800 text-center align-middle">Property</th>
                  <th className="py-4 px-4 font-bold text-gray-800 text-center align-middle">Location</th>
                  <th className="py-4 px-4 font-bold text-gray-800 text-center align-middle">Tenant</th>
                  <th className="py-4 px-4 font-bold text-gray-800 text-center align-middle">Cost</th>
                  <th className="py-4 px-4 font-bold text-gray-800 text-center align-middle">Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row) => (
                  <tr key={row.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-4 px-4 text-gray-700 text-center align-middle">{row.date}</td>
                    <td className="py-4 px-4 text-gray-700 text-center align-middle">{row.property}</td>
                    <td className="py-4 px-4 text-gray-700 text-center align-middle">{row.location}</td>
                    <td className="py-4 px-4 text-gray-700 text-center align-middle">{row.tenant}</td>
                    <td className="py-4 px-4 text-gray-700 font-medium text-center align-middle">{row.cost}</td>
                    <td className="py-4 px-4 text-center align-middle">
                      <button className="px-5 py-2 border border-gray-400 rounded text-gray-700 hover:bg-gray-100 transition text-sm">
                        view
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Desktop Grid View - Shows when view is 'grid' */}
      {selectedView === 'grid' && (
        <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.map((row) => (
            <div key={row.id} className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Date</p>
                    <p className="text-gray-700 font-medium">{row.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 font-medium">Location</p>
                    <p className="text-gray-700 font-medium">{row.location}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Property</p>
                  <p className="text-gray-700 font-medium text-lg">{row.property}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Tenant</p>
                  <p className="text-gray-700 font-medium">{row.tenant}</p>
                </div>
                <div className="flex justify-between items-center pt-3">
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Cost</p>
                    <p className="text-gray-700 font-bold text-xl">{row.cost}</p>
                  </div>
                  <button className="px-5 py-2 border border-gray-400 rounded text-gray-700 hover:bg-gray-100 transition text-sm">
                    view
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Mobile/Tablet Cards - Always shows grid view */}
      <div className="block lg:hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {data.map((row) => (
            <div key={row.id} className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow">
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