import React from 'react';

const DetailsCashflow = () => {
  // Data for the detailed cashflow table
  const cashFlowDetails = [
    {
      year: "Year 1",
      annualRent: "₹6,00,000",
      annualExpenses: "₹65,000",
      netCashFlow: "₹5,35,000",
      cumulativeCashFlow: "₹-4,37,500",
      roi: "-88.97%"
    },
    {
      year: "Year 2",
      annualRent: "₹6,48,000",
      annualExpenses: "₹66,950",
      netCashFlow: "₹5,81,050",
      cumulativeCashFlow: "₹-37,36,450",
      roi: "-77.00%"
    },
    {
      year: "Year 3",
      annualRent: "₹6,99,840",
      annualExpenses: "₹68,958.5",
      netCashFlow: "₹6,30,881.5",
      cumulativeCashFlow: "₹-31,05,568.5",
      roi: "-64.00%"
    },
    {
      year: "Year 4",
      annualRent: "₹7,55,827.2",
      annualExpenses: "₹71,027.255",
      netCashFlow: "₹6,84,799.945",
      cumulativeCashFlow: "₹-24,20,768.555",
      roi: "-49.89%"
    },
    {
      year: "Year 5",
      annualRent: "₹8,16,293.376",
      annualExpenses: "₹73,158.073",
      netCashFlow: "₹7,43,135.303",
      cumulativeCashFlow: "₹-16,77,633.252",
      roi: "-34.57%"
    },
    {
      year: "Year 6",
      annualRent: "₹8,81,597.846",
      annualExpenses: "₹75,352.815",
      netCashFlow: "₹8,06,244.031",
      cumulativeCashFlow: "₹-8,71,389.22",
      roi: "-17.96%"
    },
    {
      year: "Year 7",
      annualRent: "₹9,52,124.594",
      annualExpenses: "₹77,613.399",
      netCashFlow: "₹8,74,511.194",
      cumulativeCashFlow: "₹3,121.974",
      roi: "0.06%"
    },
    {
      year: "Year 8",
      annualRent: "₹10,28,294.561",
      annualExpenses: "₹79,941.801",
      netCashFlow: "₹9,48,352.76",
      cumulativeCashFlow: "₹95,14,474.734",
      roi: "19.61%"
    },
    {
      year: "Year 9",
      annualRent: "₹11,10,558.126",
      annualExpenses: "₹82,340.055",
      netCashFlow: "₹10,28,218.071",
      cumulativeCashFlow: "₹1,97,99,692.805",
      roi: "40.80%"
    },
    {
      year: "Year 10",
      annualRent: "₹11,99,402.776",
      annualExpenses: "₹84,810.257",
      netCashFlow: "₹11,14,592.519",
      cumulativeCashFlow: "₹3,09,42,85.324",
      roi: "63.77%"
    }
  ];

  return (
    <div className="col-span-1 lg:col-span-2 mt-6">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-4 sm:p-6">
          <h2 className="text-center text-lg md:text-xl mb-6 font-semibold">
            Detailed Cashflow Projections
          </h2>
          
          {/* Desktop/Tablet View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="py-3 px-4 text-left font-medium text-gray-600 border-b">Year</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-600 border-b">Annual Rent</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-600 border-b">Annual Expenses</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-600 border-b">Net Cash Flow</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-600 border-b">Cumulative Cash Flow</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-600 border-b">ROI %</th>
                </tr>
              </thead>
              <tbody>
                {cashFlowDetails.map((item, index) => (
                  <tr 
                    key={index} 
                    className={`border-b `}
                  >
                    <td className="py-3 px-4 font-medium">{item.year}</td>
                    <td className="py-3 px-4">{item.annualRent}</td>
                    <td className="py-3 px-4">{item.annualExpenses}</td>
                    <td className="py-3 px-4 font-medium text-green-600">{item.netCashFlow}</td>
                    <td className={`py-3 px-4 font-medium ${item.cumulativeCashFlow.startsWith('₹-') ? 'text-red-600' : 'text-green-600'}`}>
                      {item.cumulativeCashFlow}
                    </td>
                    <td className={`py-3 px-4 font-medium ${item.roi.startsWith('-') ? 'text-red-600' : 'text-green-600'}`}>
                      {item.roi}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile View */}
          <div className="md:hidden space-y-4">
            {cashFlowDetails.map((item, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-700">{item.year}</span>
                  <span className={`font-semibold ${item.roi.startsWith('-') ? 'text-red-600' : 'text-green-600'}`}>
                    {item.roi}
                  </span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Annual Rent:</span>
                    <span className="font-medium">{item.annualRent}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Annual Expenses:</span>
                    <span className="font-medium">{item.annualExpenses}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Net Cash Flow:</span>
                    <span className="font-medium text-green-600">{item.netCashFlow}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cumulative Cash Flow:</span>
                    <span className={`font-medium ${item.cumulativeCashFlow.startsWith('₹-') ? 'text-red-600' : 'text-green-600'}`}>
                      {item.cumulativeCashFlow}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsCashflow;