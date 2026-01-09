import React from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';

const EMIAnalytics = () => {
  // Data for EMI vs Rent Coverage
  const emiRentData = [
    { year: 'Year 1', emi: 9.5, rent: 9.5, coverage: 100 },
    { year: 'Year 2', emi: 9.8, rent: 9.6, coverage: 102 },
    { year: 'Year 3', emi: 10.0, rent: 9.7, coverage: 103 },
    { year: 'Year 4', emi: 10.2, rent: 9.8, coverage: 104 },
    { year: 'Year 5', emi: 10.5, rent: 9.9, coverage: 106 },
    { year: 'Year 6', emi: 10.8, rent: 10.0, coverage: 108 },
    { year: 'Year 7', emi: 11.0, rent: 10.1, coverage: 109 },
    { year: 'Year 8', emi: 11.3, rent: 10.2, coverage: 111 },
    { year: 'Year 9', emi: 11.5, rent: 10.3, coverage: 112 },
    { year: 'Year 10', emi: 11.8, rent: 10.4, coverage: 113 },
  ];

  // Data for Total Loan Cost Breakdown
  const loanCostData = [
    { name: 'Principal Amount', value: 31.5, color: '#22d3ee' },
    { name: 'Total Interest', value: 17.4, color: '#ef4444' },
  ];

  // Data for Loan Balance Reduction
  const loanBalanceData = [
    { year: 'Year 1', outstanding: 2, principal: 98 },
    { year: 'Year 2', outstanding: 5, principal: 95 },
    { year: 'Year 3', outstanding: 10, principal: 90 },
    { year: 'Year 4', outstanding: 18, principal: 82 },
    { year: 'Year 5', outstanding: 28, principal: 72 },
    { year: 'Year 6', outstanding: 40, principal: 60 },
    { year: 'Year 7', outstanding: 54, principal: 46 },
    { year: 'Year 8', outstanding: 70, principal: 30 },
    { year: 'Year 9', outstanding: 85, principal: 15 },
    { year: 'Year 10', outstanding: 100, principal: 0 },
  ];

  // Data for Cash Flow Analysis
  const cashFlowData = [
    { year: 'Year 1', cashFlow: 0.5, cumulative: 0 },
    { year: 'Year 2', cashFlow: 1.2, cumulative: 10 },
    { year: 'Year 3', cashFlow: 2.0, cumulative: 30 },
    { year: 'Year 4', cashFlow: 2.8, cumulative: 50 },
    { year: 'Year 5', cashFlow: 3.5, cumulative: 75 },
    { year: 'Year 6', cashFlow: 4.5, cumulative: 100 },
    { year: 'Year 7', cashFlow: 5.5, cumulative: 125 },
    { year: 'Year 8', cashFlow: 6.8, cumulative: 155 },
    { year: 'Year 9', cashFlow: 8.5, cumulative: 190 },
    { year: 'Year 10', cashFlow: 10.5, cumulative: 230 },
  ];

  return (
    <div className="bg-white p-4 md:p-6 lg:p-8">
      <h1 className="text-xl md:text-2xl font-bold text-red-500 mb-4 md:mb-6 lg:mb-8 text-center">EMI Analytics</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8 mb-4 md:mb-6 lg:mb-8">
        {/* EMI vs Rent Coverage */}
        <div className="bg-white p-3 md:p-4 lg:p-6 rounded-lg shadow">
          <h2 className="text-base md:text-lg font-semibold mb-1 md:mb-2 text-center">EMI vs Rent Coverage</h2>
          <p className="text-xs md:text-sm text-gray-500 mb-3 md:mb-4 text-center">Monthly EMI compared to rental income over time</p>
          
          <ResponsiveContainer width="100%" height={250} className="md:h-[300px]">
            <BarChart data={emiRentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" tick={{ fontSize: window.innerWidth < 768 ? 10 : 11 }} />
              <YAxis 
                tick={{ fontSize: window.innerWidth < 768 ? 10 : 11 }}
                domain={[0, 12]}
                tickFormatter={(value) => `₹${value}L`}
              />
              <YAxis 
                yAxisId="right" 
                orientation="right" 
                tick={{ fontSize: window.innerWidth < 768 ? 10 : 11 }}
              />
              <Tooltip 
                contentStyle={{
                  fontSize: window.innerWidth < 768 ? '11px' : '12px',
                  padding: window.innerWidth < 768 ? '5px' : '8px'
                }}
              />
              <Legend wrapperStyle={{ fontSize: window.innerWidth < 768 ? '11px' : '12px' }} />
              <Bar dataKey="emi" fill="#22d3ee" name="Monthly EMI" />
              <Bar dataKey="rent" fill="#06b6d4" name="Monthly Rent" />
              <Line 
                yAxisId="right" 
                type="monotone" 
                dataKey="coverage" 
                stroke="#ea580c" 
                strokeWidth={window.innerWidth < 768 ? 1.5 : 2} 
                name="Coverage %" 
                dot={{ fill: '#ea580c', r: window.innerWidth < 768 ? 3 : 4 }} 
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Total Loan Cost Breakdown */}
        <div className="bg-white p-3 md:p-4 lg:p-6 rounded-lg shadow">
          <h2 className="text-base md:text-lg font-semibold mb-1 md:mb-2 text-center">Total Loan Cost Breakdown</h2>
          <p className="text-xs md:text-sm text-gray-500 mb-3 md:mb-4 text-center">Principal amount vs total interest payable</p>
          
          <ResponsiveContainer width="100%" height={250} className="md:h-[300px]">
            <PieChart>
              <Pie
                data={loanCostData}
                cx="50%"
                cy="50%"
                innerRadius={window.innerWidth < 768 ? 60 : 80}
                outerRadius={window.innerWidth < 768 ? 90 : 120}
                paddingAngle={2}
                dataKey="value"
              >
                {loanCostData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  fontSize: window.innerWidth < 768 ? '11px' : '12px',
                  padding: window.innerWidth < 768 ? '5px' : '8px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          
          <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-6 lg:gap-8 mt-3 md:mt-4">
            <div className="flex items-center gap-1 md:gap-2 justify-center">
              <div className="w-3 h-3 md:w-4 md:h-4 bg-cyan-400 rounded"></div>
              <span className="text-xs md:text-sm">Principal Amount</span>
              <span className="text-xs md:text-sm font-semibold">₹31.5L</span>
            </div>
            <div className="flex items-center gap-1 md:gap-2 justify-center">
              <div className="w-3 h-3 md:w-4 md:h-4 bg-red-500 rounded"></div>
              <span className="text-xs md:text-sm">Total Interest</span>
              <span className="text-xs md:text-sm font-semibold">₹17.4L</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
        {/* Loan Balance Reduction */}
        <div className="bg-white p-3 md:p-4 lg:p-6 rounded-lg shadow">
          <h2 className="text-base md:text-lg font-semibold mb-1 md:mb-2 text-center">Loan Balance Reduction</h2>
          <p className="text-xs md:text-sm text-gray-500 mb-3 md:mb-4 text-center">Outstanding loan balance and equity building over time</p>
          
          <ResponsiveContainer width="100%" height={250} className="md:h-[300px]">
            <AreaChart data={loanBalanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" tick={{ fontSize: window.innerWidth < 768 ? 10 : 11 }} />
              <YAxis 
                tick={{ fontSize: window.innerWidth < 768 ? 10 : 11 }}
                domain={[0, 100]}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip 
                contentStyle={{
                  fontSize: window.innerWidth < 768 ? '11px' : '12px',
                  padding: window.innerWidth < 768 ? '5px' : '8px'
                }}
              />
              <Legend wrapperStyle={{ fontSize: window.innerWidth < 768 ? '11px' : '12px' }} />
              <Area 
                type="monotone" 
                dataKey="outstanding" 
                stackId="1" 
                stroke="#fbbf24" 
                fill="#fbbf24" 
                name="Outstanding Balance" 
              />
              <Area 
                type="monotone" 
                dataKey="principal" 
                stackId="1" 
                stroke="#22d3ee" 
                fill="#22d3ee" 
                name="Principal Paid" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Cash Flow Analysis */}
        <div className="bg-white p-3 md:p-4 lg:p-6 rounded-lg shadow">
          <h2 className="text-base md:text-lg font-semibold mb-1 md:mb-2 text-center">Cash Flow Analysis</h2>
          <p className="text-xs md:text-sm text-gray-500 mb-3 md:mb-4 text-center">Monthly and cumulative cash flow after EMI payments</p>
          
          <ResponsiveContainer width="100%" height={250} className="md:h-[300px]">
            <BarChart data={cashFlowData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" tick={{ fontSize: window.innerWidth < 768 ? 10 : 11 }} />
              <YAxis 
                tick={{ fontSize: window.innerWidth < 768 ? 10 : 11 }}
                domain={[0, 12]}
                tickFormatter={(value) => `₹${value}L`}
              />
              <YAxis 
                yAxisId="right" 
                orientation="right" 
                tick={{ fontSize: window.innerWidth < 768 ? 10 : 11 }}
              />
              <Tooltip 
                contentStyle={{
                  fontSize: window.innerWidth < 768 ? '11px' : '12px',
                  padding: window.innerWidth < 768 ? '5px' : '8px'
                }}
              />
              <Legend wrapperStyle={{ fontSize: window.innerWidth < 768 ? '11px' : '12px' }} />
              <Bar dataKey="cashFlow" fill="#14b8a6" name="Monthly Cash Flow" />
              <Line 
                yAxisId="right" 
                type="monotone" 
                dataKey="cumulative" 
                stroke="#ef4444" 
                strokeWidth={window.innerWidth < 768 ? 1.5 : 2} 
                name="Cumulative Cash Flow" 
                dot={{ fill: '#ef4444', r: window.innerWidth < 768 ? 3 : 4 }} 
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default EMIAnalytics;