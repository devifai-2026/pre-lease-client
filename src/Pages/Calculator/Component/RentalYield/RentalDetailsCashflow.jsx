import React from 'react';
import { FaDownload, FaShareAlt } from 'react-icons/fa';

const RentalDetailsCashflow = () => {
  const cashFlowDetails = [
    {
      year: '1',
      annualRent: '₹6,00,000',
      annualExpenses: '₹65,000',
      netCashFlow: '₹5,35,000',
      cumulativeCashFlow: '₹-4,37,500',
      roi: '-88.97%'
    },
    {
      year: '2',
      annualRent: '₹6,48,000',
      annualExpenses: '₹66,950',
      netCashFlow: '₹5,81,050',
      cumulativeCashFlow: '₹-37,36,450',
      roi: '-77.00%'
    },
    {
      year: '3',
      annualRent: '₹6,99,840',
      annualExpenses: '₹68,958.5',
      netCashFlow: '₹6,30,881.5',
      cumulativeCashFlow: '₹-31,05,568.5',
      roi: '-64.00%'
    },
    {
      year: '4',
      annualRent: '₹7,55,827.2',
      annualExpenses: '₹71,027.255',
      netCashFlow: '₹6,84,799.945',
      cumulativeCashFlow: '₹-24,20,768.555',
      roi: '-49.89%'
    },
    {
      year: '5',
      annualRent: '₹8,16,293.376',
      annualExpenses: '₹73,158.073',
      netCashFlow: '₹7,43,135.303',
      cumulativeCashFlow: '₹-16,77,633.252',
      roi: '-34.57%'
    },
    {
      year: '6',
      annualRent: '₹8,81,597.846',
      annualExpenses: '₹75,352.815',
      netCashFlow: '₹8,06,244.031',
      cumulativeCashFlow: '₹-8,71,389.22',
      roi: '-17.96%'
    },
    {
      year: '7',
      annualRent: '₹9,52,124.594',
      annualExpenses: '₹77,613.399',
      netCashFlow: '₹8,74,511.194',
      cumulativeCashFlow: '₹3,121,974',
      roi: '0.06%'
    },
    {
      year: '8',
      annualRent: '₹10,28,294.561',
      annualExpenses: '₹79,941.801',
      netCashFlow: '₹9,48,352.76',
      cumulativeCashFlow: '₹95,14,474.734',
      roi: '19.61%'
    },
    {
      year: '9',
      annualRent: '₹11,10,558.126',
      annualExpenses: '₹82,340.055',
      netCashFlow: '₹10,28,218.071',
      cumulativeCashFlow: '₹1,97,99,692.805',
      roi: '40.80%'
    },
    {
      year: '10',
      annualRent: '₹11,99,402.776',
      annualExpenses: '₹84,810.257',
      netCashFlow: '₹11,14,592.519',
      cumulativeCashFlow: '₹3,09,42,85.324',
      roi: '63.77%'
    }
  ];

  return (
    <div className="font-montserrat bg-white rounded-lg mt-4 md:mt-6">
      {/* Heading */}
      <h2 className="text-[#EE2529] font-bold text-base md:text-lg mb-4 md:mb-6 text-center">
        Detailed Cashflow Projections
      </h2>
      
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs md:text-sm">
          <thead>
            <tr className="border-b">
              <th className="py-2 md:py-3 px-2 md:px-4 text-left font-medium text-[#767676]">Year</th>
              <th className="py-2 md:py-3 px-2 md:px-4 text-left font-medium text-[#767676]">Annual Rent</th>
              <th className="py-2 md:py-3 px-2 md:px-4 text-left font-medium text-[#767676]">Annual Expenses</th>
              <th className="py-2 md:py-3 px-2 md:px-4 text-left font-medium text-[#767676]">Net Cash Flow</th>
              <th className="py-2 md:py-3 px-2 md:px-4 text-left font-medium text-[#767676]">Cumulative Cash Flow</th>
              <th className="py-2 md:py-3 px-2 md:px-4 text-left font-medium text-[#767676]">ROI %</th>
            </tr>
          </thead>
          <tbody>
            {cashFlowDetails.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="py-2 md:py-3 px-2 md:px-4">{item.year}</td>
                <td className="py-2 md:py-3 px-2 md:px-4">{item.annualRent}</td>
                <td className="py-2 md:py-3 px-2 md:px-4">{item.annualExpenses}</td>
                <td className="py-2 md:py-3 px-2 md:px-4">{item.netCashFlow}</td>
                <td className="py-2 md:py-3 px-2 md:px-4">{item.cumulativeCashFlow}</td>
                <td className={`py-2 md:py-3 px-2 md:px-4 font-medium ${item.roi.startsWith('-') ? 'text-[#C73834]' : 'text-[#429482]'}`}>
                  {item.roi}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Buttons - Centered with Icons */}
      <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 mt-4 md:mt-6">
        <button className="flex items-center justify-center gap-2 border border-[#767676] text-[#767676] px-4 md:px-6 py-2 rounded font-bold text-xs md:text-sm hover:opacity-90 transition-opacity">
          <FaDownload />
          Download Report
        </button>
        <button className="flex items-center justify-center gap-2 border border-[#767676] text-[#767676] px-4 md:px-6 py-2 rounded font-bold text-xs md:text-sm hover:bg-gray-50 transition-colors">
          <FaShareAlt />
          Share Report
        </button>
      </div>
    </div>
  );
};

export default RentalDetailsCashflow;