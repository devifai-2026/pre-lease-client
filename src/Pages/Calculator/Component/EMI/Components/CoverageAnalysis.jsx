import React from 'react';
import { FaDownload, FaShareAlt } from 'react-icons/fa';
import share from "../../../../../assets/propertyDetails/share.svg"
import download from "../../../../../assets/propertyDetails/download.svg"

const CoverageAnalysis = () => {
  const data = [
    {
      year: 1,
      annualRent: '₹6,00,000',
      emiPaid: '₹4,83,122.768',
      coverage: '122.7%',
      principalPaid: '₹1,98,352.247',
      interestPaid: '₹2,90,760.521',
      outstandingBalance: '₹29,51,637.753',
      netCashFlow: '₹45,877.232',
      cumulativeCashFlow: '₹-16,79,122.768'
    },
    {
      year: 2,
      annualRent: '₹6,48,000',
      emiPaid: '₹4,83,122.768',
      coverage: '132.5%',
      principalPaid: '₹2,18,049.221',
      interestPaid: '₹2,71,073.547',
      outstandingBalance: '₹27,33,588.532',
      netCashFlow: '₹93,877.232',
      cumulativeCashFlow: '₹-15,85,245.535'
    },
    {
      year: 3,
      annualRent: '₹6,99,840',
      emiPaid: '₹4,83,122.768',
      coverage: '143.1%',
      principalPaid: '₹2,39,690.079',
      interestPaid: '₹2,49,432.688',
      outstandingBalance: '₹24,93,898.453',
      netCashFlow: '₹1,44,577.232',
      cumulativeCashFlow: '₹-14,39,528.303'
    },
    {
      year: 4,
      annualRent: '₹7,55,827.2',
      emiPaid: '₹4,83,122.768',
      coverage: '154.5%',
      principalPaid: '₹2,63,478.74',
      interestPaid: '₹2,25,644.027',
      outstandingBalance: '₹22,30,419.713',
      netCashFlow: '₹2,01,704.432',
      cumulativeCashFlow: '₹-12,37,823.87'
    },
    {
      year: 5,
      annualRent: '₹8,16,293.376',
      emiPaid: '₹4,83,122.768',
      coverage: '166.9%',
      principalPaid: '₹2,89,628.369',
      interestPaid: '₹1,94,494.399',
      outstandingBalance: '₹19,40,791.344',
      netCashFlow: '₹2,62,170.608',
      cumulativeCashFlow: '₹-9,75,653.262'
    },
    {
      year: 6,
      annualRent: '₹8,81,597.846',
      emiPaid: '₹4,83,122.768',
      coverage: '180.2%',
      principalPaid: '₹3,18,373.285',
      interestPaid: '₹1,70,749.483',
      outstandingBalance: '₹16,22,418.059',
      netCashFlow: '₹3,27,474.079',
      cumulativeCashFlow: '₹-6,48,179.183'
    },
    {
      year: 7,
      annualRent: '₹9,52,124.594',
      emiPaid: '₹4,83,122.768',
      coverage: '194.7%',
      principalPaid: '₹3,49,971.064',
      interestPaid: '₹1,39,151.703',
      outstandingBalance: '₹12,72,446.995',
      netCashFlow: '₹3,98,801.826',
      cumulativeCashFlow: '₹-2,50,177.357'
    },
    {
      year: 8,
      annualRent: '₹10,28,294.561',
      emiPaid: '₹4,83,122.768',
      coverage: '210.2%',
      principalPaid: '₹3,84,704.847',
      interestPaid: '₹1,04,417.921',
      outstandingBalance: '₹8,87,742.148',
      netCashFlow: '₹4,74,171.794',
      cumulativeCashFlow: '₹2,23,994.436'
    },
    {
      year: 9,
      annualRent: '₹11,10,558.176',
      emiPaid: '₹4,83,122.768',
      coverage: '227.1%',
      principalPaid: '₹4,22,885.873',
      interestPaid: '₹66,236.894',
      outstandingBalance: '₹4,64,856.775',
      netCashFlow: '₹5,56,435.359',
      cumulativeCashFlow: '₹7,80,429.795'
    },
    {
      year: 10,
      annualRent: '₹11,99,402.776',
      emiPaid: '₹4,83,122.768',
      coverage: '246.2%',
      principalPaid: '₹4,64,856.775',
      interestPaid: '₹24,266.493',
      outstandingBalance: '₹0',
      netCashFlow: '₹6,45,280.009',
      cumulativeCashFlow: '₹14,25,709.804'
    }
  ];

  return (
    <div className="bg-white ">
      <div className="mb-4 md:mb-5 lg:mb-6 mt-6">
        <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-[#262626] text-center">
          Year-by-Year Loan Coverage Analysis
        </h1>
      </div>

      <div className="overflow-x-auto shadow-lg rounded-lg p-5">
        <table className="w-full text-xs md:text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-2 py-1 md:px-3 md:py-2 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider border-b-2 border-[#000000]">Year</th>
              <th className="px-2 py-1 md:px-3 md:py-2 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider border-b-2 border-[#000000]">Annual <br /> Rent</th>
              <th className="px-2 py-1 md:px-3 md:py-2 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider border-b-2 border-[#000000]">EMI <br /> Paid</th>
              <th className="px-2 py-1 md:px-3 md:py-2 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider border-b-2 border-[#000000]">Coverage <br /> %</th>
              <th className="px-2 py-1 md:px-3 md:py-2 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider border-b-2 border-[#000000]">Principal <br /> Paid</th>
              <th className="px-2 py-1 md:px-3 md:py-2 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider border-b-2 border-[#000000]">Interest <br /> Paid</th>
              <th className="px-2 py-1 md:px-3 md:py-2 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider border-b-2 border-[#000000]">Outstanding <br /> Balance</th>
              <th className="px-2 py-1 md:px-3 md:py-2 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider border-b-2 border-[#000000]">Net Cash <br /> Flow</th>
              <th className="px-2 py-1 md:px-3 md:py-2 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider border-b-2 border-[#000000]">Cumulative Cash <br /> Flow</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {data.map((row, index) => (
              <tr key={row.year} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-2 py-1 md:px-3 md:py-2 whitespace-nowrap text-xs md:text-sm font-semibold text-gray-900 border-b-2 border-gray-300 text-center">{row.year}</td>
                <td className="px-2 py-1 md:px-3 md:py-2 whitespace-nowrap text-xs md:text-sm text-gray-900 border-b-2 border-gray-300 text-center">{row.annualRent}</td>
                <td className="px-2 py-1 md:px-3 md:py-2 whitespace-nowrap text-xs md:text-sm text-gray-900 border-b-2 border-gray-300 text-center">{row.emiPaid}</td>
                <td className="px-2 py-1 md:px-3 md:py-2 whitespace-nowrap text-xs md:text-sm  border-b-2 border-gray-300 text-center text-[#429482]">{row.coverage}</td>
                <td className="px-2 py-1 md:px-3 md:py-2 whitespace-nowrap text-xs md:text-sm text-gray-900 border-b-2 border-gray-300 text-center">{row.principalPaid}</td>
                <td className="px-2 py-1 md:px-3 md:py-2 whitespace-nowrap text-xs md:text-sm text-gray-900 border-b-2 border-gray-300 text-center">{row.interestPaid}</td>
                <td className="px-2 py-1 md:px-3 md:py-2 whitespace-nowrap text-xs md:text-sm text-gray-900 border-b-2 border-gray-300 text-center">{row.outstandingBalance}</td>
                <td className="px-2 py-1 md:px-3 md:py-2 whitespace-nowrap text-xs md:text-sm text-gray-900 border-b-2 border-gray-300 text-center">{row.netCashFlow}</td>
                <td className={`px-2 py-1 md:px-3 md:py-2 whitespace-nowrap text-xs md:text-sm font-semibold border-b-2 border-gray-300 ${
                  index < 7 ? 'text-[#EE2529]' : 'text-[#429482]'
                }`}>
                  {row.cumulativeCashFlow}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
      </div>
        {/* Buttons - Centered with Icons */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 mt-4 md:mt-5 lg:mt-6">
          <button className="flex items-center justify-center gap-1 md:gap-2 border border-[#767676] text-[#767676] px-3 md:px-4 lg:px-6 py-1 md:py-2 rounded font-bold text-xs md:text-sm hover:opacity-90 transition-opacity">
            <img src={download} alt="" />
            Download Report
          </button>
          <button className="flex items-center justify-center gap-1 md:gap-2 border border-[#767676] text-[#767676] px-3 md:px-4 lg:px-6 py-1 md:py-2 rounded font-bold text-xs md:text-sm hover:bg-gray-50 transition-colors">
            <img src={share} alt="" />
            Share Report
          </button>
        </div>
    </div>
  );
};

export default CoverageAnalysis;