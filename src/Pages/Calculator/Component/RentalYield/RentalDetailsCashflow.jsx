import React from 'react';
import { FaDownload, FaShareAlt } from 'react-icons/fa';
import share from "../../../../assets/propertyDetails/share.svg"
import download from "../../../../assets/propertyDetails/download.svg"

const RentalDetailsCashflow = () => {
  const cashFlowDetails = [
    {
      year: '1',
      annualRent: '₹6,00,000',
      emiPaid: '29,362.132',
      principal: '₹5,35,000',
      interest: '₹65,000',
      balance: '₹5,35,000',
      annualExpenses: '₹65,000',
      netCashFlow: '₹5,35,000'
    },
    {
      year: '2',
      annualRent: '₹6,48,000',
      emiPaid: '29,362.132',
      principal: '₹5,81,050',
      interest: '₹66,950',
      balance: '₹5,81,050',
      annualExpenses: '₹66,950',
      netCashFlow: '₹5,81,050'
    },
    {
      year: '3',
      annualRent: '₹6,99,840',
      emiPaid: '29,362.132',
      principal: '₹6,30,881.5',
      interest: '₹68,958.5',
      balance: '₹6,30,881.5',
      annualExpenses: '₹68,958.5',
      netCashFlow: '₹6,30,881'
    },
    {
      year: '4',
      annualRent: '₹7,55,827.2',
      emiPaid: '29,362.132',
      principal: '₹6,84,799.945',
      interest: '₹71,027.255',
      balance: '₹6,84,799.945',
      annualExpenses: '₹71,027.255',
      netCashFlow: '₹6.84,799.94'
    },
    {
      year: '5',
      annualRent: '₹8,16,293.376',
      emiPaid: '29,362.132',
      principal: '₹7,43,135.303',
      interest: '₹73,158.073',
      balance: '₹7,43,135.303',
      annualExpenses: '₹73,158.073',
      netCashFlow: '₹7.43,135.33'
    },
    {
      year: '6',
      annualRent: '₹8,81,597.846',
      emiPaid: '29,362.132',
      principal: '₹8,06,244.031',
      interest: '₹75,352.815',
      balance: '₹8,06,244.031',
      annualExpenses: '₹75,352.815',
      netCashFlow: '₹8.06,244.0'
    },
    {
      year: '7',
      annualRent: '₹9,52,124.594',
      emiPaid: '29,362.132',
      principal: '₹8,74,511.194',
      interest: '₹77,613.399',
      balance: '₹8,74,511.194',
      annualExpenses: '₹77,613.399',
      netCashFlow: '₹8.74,511.19'
    },
    {
      year: '8',
      annualRent: '₹10,28,294.561',
      emiPaid: '29,362.132',
      principal: '₹9,48,352.76',
      interest: '₹79,941.801',
      balance: '₹9,48,352.76',
      annualExpenses: '₹79,941.801',
      netCashFlow: '₹9.48,352.7'
    },
    {
      year: '9',
      annualRent: '₹11,10,558.126',
      emiPaid: '29,362.132',
      principal: '₹10,28,218.071',
      interest: '₹82,340.055',
      balance: '₹10,28,218.071',
      annualExpenses: '₹82,340.055',
      netCashFlow: '₹10.28,218.0'
    },
    {
      year: '10',
      annualRent: '₹11,99,402.776',
      emiPaid: '29,362.132',
      principal: '₹11,14,592.519',
      interest: '₹84,810.257',
      balance: '₹11,14,592.519',
      annualExpenses: '₹84,810.257',
      netCashFlow: '₹11.14,592.5'
    }
  ];

  return (
    <div className="font-montserrat bg-white rounded-lg mt-4 md:mt-8">
      {/* Heading */}
      <h2 className="text-[#262626] font-semibold text-lg md:text-xl lg:text-2xl mb-4 md:mb-6 text-center">
        Detailed Cashflow Projections
      </h2>
      
      {/* Table */}
      <div className="overflow-x-auto shadow-lg rounded-lg p-5">
        <table className="w-full text-xs md:text-sm">
          <thead>
            <tr className="border-b-2 border-[#262626]">
              <th className="py-2 md:py-3 px-2 md:px-4 text-left font-bold text-lg">Year</th>
              <th className="py-2 md:py-3 px-2 md:px-4 text-left font-bold text-lg">Annual Rent</th>
              <th className="py-2 md:py-3 px-2 md:px-4 text-left font-bold text-lg">EMI Paid</th>
              <th className="py-2 md:py-3 px-2 md:px-4 text-left font-bold text-lg">Principal</th>
              <th className="py-2 md:py-3 px-2 md:px-4 text-left font-bold text-lg">Interest</th>
              <th className="py-2 md:py-3 px-2 md:px-4 text-left font-bold text-lg">Balance</th>
              <th className="py-2 md:py-3 px-2 md:px-4 text-left font-bold text-lg">Annual Expenses</th>
              <th className="py-2 md:py-3 px-2 md:px-4 text-left font-bold text-lg">Net Cash Flow</th>
            </tr>
          </thead>
          <tbody>
            {cashFlowDetails.map((item, index) => (
              <tr key={index} className="border-b-2">
                <td className="py-2 md:py-3 px-2 md:px-4 text-lg">{item.year}</td>
                <td className="py-2 md:py-3 px-2 md:px-4 text-lg">{item.annualRent}</td>
                <td className="py-2 md:py-3 px-2 md:px-4 text-[#C73834] text-lg">{item.emiPaid}</td>
                <td className="py-2 md:py-3 px-2 md:px-4 text-lg">{item.principal}</td>
                <td className="py-2 md:py-3 px-2 md:px-4 text-lg">{item.interest}</td>
                <td className="py-2 md:py-3 px-2 md:px-4 text-[#429482] text-lg">{item.balance}</td>
                <td className="py-2 md:py-3 px-2 md:px-4 text-lg">{item.annualExpenses}</td>
                <td className="py-2 md:py-3 px-2 md:px-4 text-[#429482] text-lg">{item.netCashFlow}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Buttons - Centered with Icons */}
      <div className="flex  justify-center gap-3 md:gap-4 mt-4 md:mt-6">
        <button className="flex items-center justify-center gap-2 border border-[#767676] text-[#767676] px-4 md:px-6 py-2 rounded font-bold text-xs md:text-sm hover:opacity-90 transition-opacity">
          <img src={download} alt="" />
          Download Report
        </button>
        <button className="flex items-center justify-center gap-2 border border-[#767676] text-[#767676] px-4 md:px-6 py-2 rounded font-bold text-xs md:text-sm hover:bg-gray-50 transition-colors">
          <img src={share} alt="" />
          Share Report
        </button>
      </div>
    </div>
  );
};

export default RentalDetailsCashflow;