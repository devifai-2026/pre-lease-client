import React from 'react';

const FinancialDetails = () => {
  const financialData = [
    {
      label: 'Property Price',
      value: '₹45,00,000',
      subtext: '',
      color: '#C73834'
    },
    {
      label: 'Down Payment',
      value: '₹13,50,000',
      subtext: '30.0% of price',
      color: '#767676'
    },
    {
      label: 'Loan Amount',
      value: '₹31,50,000',
      subtext: '70.0% financed',
      color: '#26BFCC'
    },
    {
      label: 'Monthly EMI',
      value: '₹29,362.132',
      subtext: '@9.5% for 20 years',
      color: '#429482'
    },
    {
      label: 'Total Interest',
      value: '₹38,96,911.78',
      subtext: 'Over 20 years',
      color: '#F7C952'
    }
  ];

  return (
    <div className="font-montserrat bg-white rounded-lg mt-8">
      {/* Heading */}
      <h2 className="text-[#EE2529] font-semibold text-lg md:text-xl lg:text-2xl mb-4 md:mb-6 ">
        Financing Details Breakdown
      </h2>

      {/* Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
        {financialData.map((item, index) => (
          <div 
            key={index}
            className="bg-white  rounded-lg p-3 md:p-4 text-left shadow-lg hover:shadow-md transition-shadow"
          >
            {/* Label */}
            <p className="text-[#767676] text-sm md:text-base lg:text-lg font-bold mb-1 md:mb-2">
              {item.label}
            </p>
            
            {/* Value with dynamic color */}
            <p className="font-bold text-xl md:text-2xl lg:text-3xl mb-1" style={{ color: item.color }}>
              {item.value}
            </p>
            
            {/* Subtext */}
            {item.subtext && (
              <p className="text-[#767676] text-base font-normal">
                {item.subtext}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FinancialDetails;