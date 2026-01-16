import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const PrincipalInterestChart = () => {
  const [loanAmount, setLoanAmount] = useState(200000);
  const [interestRate, setInterestRate] = useState(5);
  const [years, setYears] = useState(10);

  // Calculate amortization schedule
  const calculateAmortization = () => {
    const principal = loanAmount;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = years * 12;
    const monthlyPayment = 
      principal * 
      (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    const data = [];
    let remainingBalance = principal;

    for (let year = 1; year <= years; year++) {
      let yearlyPrincipal = 0;
      let yearlyInterest = 0;

      for (let month = 0; month < 12; month++) {
        const interestPayment = remainingBalance * monthlyRate;
        const principalPayment = monthlyPayment - interestPayment;
        
        yearlyInterest += interestPayment;
        yearlyPrincipal += principalPayment;
        remainingBalance -= principalPayment;
      }

      data.push({
        year: `Year ${year}`,
        'Interest Payment': Math.round(yearlyInterest),
        'Principal Payment': Math.round(yearlyPrincipal),
      });
    }

    return data;
  };

  const data = calculateAmortization();

  // Find maximum value for Y-axis scaling
  const maxValue = Math.max(...data.map(item => item['Interest Payment'] + item['Principal Payment']));
  
  // Format Y-axis ticks in lakhs
  const formatYAxis = (tickItem) => {
    const lakhValue = tickItem / 100000;
    return `₹${lakhValue.toFixed(1)}L`;
  };

  // Custom tick values for Y-axis - fixed to show 0.0L, 0.3L, 0.5L, 0.8L, 1.0L pattern
  const yAxisTicks = [0, 30000, 50000, 80000, 100000];

  return (
    <div className="w-full bg-white mt-4 md:mt-6 lg:mt-10">
      <div className="shadow-md rounded-md p-3 md:p-4 lg:p-6 text-center">
        {/* Title and Subtitle */}
        <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800 mb-1">
          Principal vs Interest Payments Over Time
        </h1>
        <p className="text-xs md:text-sm text-gray-600 mb-4 md:mb-5 lg:mb-6">
          See how your EMI composition changes - more principal, less interest over time
        </p>

        {/* Chart - Stacked Area Chart */}
        <div className="bg-white rounded-lg p-3 md:p-4 lg:p-6">
          <ResponsiveContainer width="100%" height={250} className="md:h-[300px] lg:h-[350px]">
            <AreaChart 
              data={data} 
              margin={{ 
                top: 10, 
                right: window.innerWidth < 768 ? 15 : 30, 
                left: 0, 
                bottom: 0 
              }}
            >
              <XAxis 
                dataKey="year" 
                stroke="#6b7280"
                style={{ fontSize: window.innerWidth < 768 ? '10px' : '12px' }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="#6b7280"
                style={{ fontSize: window.innerWidth < 768 ? '10px' : '12px' }}
                tickLine={false}
                axisLine={false}
                tickFormatter={formatYAxis}
                ticks={yAxisTicks}
                domain={[0, 100000]}
              />
              <Tooltip 
                formatter={(value) => `₹${value.toLocaleString()}`}
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e7eb', 
                  borderRadius: '8px',
                  fontSize: window.innerWidth < 768 ? '11px' : '12px',
                  padding: window.innerWidth < 768 ? '5px' : '8px'
                }}
                labelStyle={{ 
                  color: '#1f2937',
                  fontSize: window.innerWidth < 768 ? '11px' : '12px'
                }}
              />
              <Legend 
                wrapperStyle={{ 
                  paddingTop: '10px',
                  fontSize: window.innerWidth < 768 ? '11px' : '12px'
                }}
                iconType="square"
              />
              <Area 
                type="monotone" 
                dataKey="Interest Payment" 
                stackId="1" 
                stroke="#C73834"
                strokeWidth={window.innerWidth < 768 ? 1.5 : 2}
                fill="#C73834"
              />
              <Area 
                type="monotone" 
                dataKey="Principal Payment" 
                stackId="1" 
                stroke="#26BFCC"
                strokeWidth={window.innerWidth < 768 ? 1.5 : 2}
                fill="#26BFCC"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default PrincipalInterestChart;