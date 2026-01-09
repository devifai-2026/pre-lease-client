import React from 'react';
import { LineChart, CartesianGrid, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const CashflowProjections = () => {
  // Data for cash flow projection
  const cashFlowData = [
    {
      year: "Year 1",
      annualCashFlow: 5.35,
      annualRent: 6.0,
      cumulativeCashFlow: -44.17,
    },
    {
      year: "Year 2",
      annualCashFlow: 5.35,
      annualRent: 6.0,
      cumulativeCashFlow: -38.82,
    },
    {
      year: "Year 3",
      annualCashFlow: 5.35,
      annualRent: 6.0,
      cumulativeCashFlow: -33.47,
    },
    {
      year: "Year 4",
      annualCashFlow: 5.35,
      annualRent: 6.48,
      cumulativeCashFlow: -28.12,
    },
    {
      year: "Year 5",
      annualCashFlow: 5.83,
      annualRent: 6.48,
      cumulativeCashFlow: -22.29,
    },
    {
      year: "Year 6",
      annualCashFlow: 5.83,
      annualRent: 6.48,
      cumulativeCashFlow: -16.46,
    },
    {
      year: "Year 7",
      annualCashFlow: 5.83,
      annualRent: 6.48,
      cumulativeCashFlow: -10.63,
    },
    {
      year: "Year 8",
      annualCashFlow: 6.31,
      annualRent: 6.99,
      cumulativeCashFlow: -4.32,
    },
    {
      year: "Year 9",
      annualCashFlow: 6.31,
      annualRent: 6.99,
      cumulativeCashFlow: 1.99,
    },
    {
      year: "Year 10",
      annualCashFlow: 6.31,
      annualRent: 6.99,
      cumulativeCashFlow: 8.30,
    },
  ];

  const yAxisTicks = [-50, -25, 0, 25, 50];

  return (
    <div className="font-montserrat bg-white">
      <div className="bg-white shadow-lg rounded-lg p-3 md:p-4 lg:p-6">
        <h2 className="text-center text-base md:text-lg font-semibold text-[#262626] mb-4 md:mb-6">
          Cash Flow Projections
        </h2>
        <ResponsiveContainer width="100%" height={300} className="md:h-[400px]">
          <LineChart
            data={cashFlowData}
            margin={{ 
              top: 15, 
              right: window.innerWidth < 768 ? 15 : 30, 
              left: window.innerWidth < 768 ? 30 : 50, 
              bottom: 15 
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#ddd"
              vertical={true}
              horizontal={true}
            />
            <XAxis
              dataKey="year"
              tick={{ 
                fontSize: window.innerWidth < 768 ? 10 : 12, 
                fill: '#767676' 
              }}
              axisLine={{ stroke: "#ddd" }}
            />
            <YAxis
              tick={{ 
                fontSize: window.innerWidth < 768 ? 10 : 12, 
                fill: '#767676' 
              }}
              axisLine={{ stroke: "#ddd" }}
              ticks={yAxisTicks}
              domain={[-50, 50]}
              tickFormatter={(value) => {
                if (value === 0) return "₹0L";
                return value > 0 ? `₹+${value}L` : `₹${value}L`;
              }}
            />
            <Tooltip
              formatter={(value, name) => {
                const formattedValue = Math.abs(value) >= 1 ? 
                  `₹${value >= 0 ? '+' : ''}${value.toFixed(2)}L` : 
                  `₹${value >= 0 ? '+' : ''}${(value * 100000).toLocaleString()}`;
                
                let labelName = "";
                switch(name) {
                  case "annualCashFlow":
                    labelName = "Annual Cash Flow";
                    break;
                  case "annualRent":
                    labelName = "Annual Rent";
                    break;
                  case "cumulativeCashFlow":
                    labelName = "Cumulative Cash Flow";
                    break;
                  default:
                    labelName = name;
                }
                
                return [formattedValue, labelName];
              }}
              labelFormatter={(label) => label}
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: window.innerWidth < 768 ? "5px" : "10px",
                fontSize: window.innerWidth < 768 ? "11px" : "12px"
              }}
            />
            <Legend
              wrapperStyle={{ 
                paddingTop: "10px",
                fontSize: window.innerWidth < 768 ? "11px" : "12px"
              }}
              iconType="line"
              verticalAlign="bottom"
              height={window.innerWidth < 768 ? 30 : 36}
            />
            <Line
              type="monotone"
              dataKey="annualCashFlow"
              stroke="#20B2AA"
              strokeWidth={window.innerWidth < 768 ? 2 : 2.5}
              dot={{ 
                fill: "#20B2AA", 
                r: window.innerWidth < 768 ? 3 : 4 
              }}
              activeDot={{ 
                r: window.innerWidth < 768 ? 4 : 6 
              }}
              name="Annual Cash Flow"
              isAnimationActive={true}
            />
            <Line
              type="monotone"
              dataKey="annualRent"
              stroke="#C73834"
              strokeWidth={window.innerWidth < 768 ? 2 : 2.5}
              dot={{ 
                fill: "#C73834", 
                r: window.innerWidth < 768 ? 3 : 4 
              }}
              activeDot={{ 
                r: window.innerWidth < 768 ? 4 : 6 
              }}
              name="Annual Rent"
              isAnimationActive={true}
            />
            <Line
              type="monotone"
              dataKey="cumulativeCashFlow"
              stroke="#F7C952"
              strokeWidth={window.innerWidth < 768 ? 2 : 2.5}
              dot={{ 
                fill: "#F7C952", 
                r: window.innerWidth < 768 ? 3 : 4 
              }}
              activeDot={{ 
                r: window.innerWidth < 768 ? 4 : 6 
              }}
              name="Cumulative Cash Flow"
              isAnimationActive={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CashflowProjections;