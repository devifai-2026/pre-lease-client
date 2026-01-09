import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const PerformanceAnalytics = () => {
  const expenseData = [
    { name: "Annual Loan EMI", value: 84 },
    { name: "Maintenance", value: 7 },
    { name: "Property Tax", value: 3 },
    { name: "Insurance", value: 2 },
    { name: "Other Expenses", value: 4 },
  ];

  const yieldData = [
    { name: "Gross Yield", value: 12 },
    { name: "Net Yield", value: 10 },
  ];

  const COLORS = ['#4A4A4A', '#FFA500', '#20B2AA', '#FF6B6B', '#87CEEB'];
  const COLORS_BAR = ['#EE2529', '#20B2AA'];

  return (
    <div className="font-montserrat bg-white mt-6">
      {/* Heading */}
      <h2 className="text-[#EE2529] text-base md:text-lg font-bold mb-4 md:mb-6">
        Performance Analytics
      </h2>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Left - Pie Chart */}
        <div className="bg-white rounded-lg p-3 md:p-4 lg:p-6 shadow-md">
          <h3 className="text-center text-sm md:text-base font-semibold text-[#262626] mb-4 md:mb-6">
            Annual Expense Breakdown
          </h3>
          <ResponsiveContainer width="100%" height={280} className="md:h-[320px]">
            <PieChart>
              <Pie
                data={expenseData}
                cx="50%"
                cy="50%"
                labelLine={true}
                label={({
                  cx,
                  cy,
                  midAngle,
                  innerRadius,
                  outerRadius,
                  value,
                  name,
                }) => {
                  const RADIAN = Math.PI / 180;
                  const radius = outerRadius + (window.innerWidth < 768 ? 30 : 50);
                  const x = cx + radius * Math.cos(-midAngle * RADIAN);
                  const y = cy + radius * Math.sin(-midAngle * RADIAN);
                  
                  return (
                    <text
                      x={x}
                      y={y}
                      fill="#262626"
                      textAnchor={x > cx ? 'start' : 'end'}
                      dominantBaseline="central"
                      fontSize={window.innerWidth < 768 ? 10 : 12}
                      fontWeight="700"
                    >
                      {`${value}%`}
                    </text>
                  );
                }}
                outerRadius={window.innerWidth < 768 ? 50 : 70}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
              >
                {expenseData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [`${value}%`, 'Percentage']}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  padding: '5px',
                  fontSize: window.innerWidth < 768 ? '11px' : '12px'
                }}
              />
              <Legend 
                layout="vertical"
                verticalAlign="middle"
                align="right"
                iconType="circle"
                wrapperStyle={{ 
                  paddingLeft: '4px',
                  fontSize: window.innerWidth < 768 ? '11px' : '12px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Right - Bar Chart */}
        <div className="bg-white rounded-lg p-3 md:p-4 lg:p-6 shadow-md">
          <h3 className="text-center text-sm md:text-base font-semibold text-[#262626] mb-4 md:mb-6">
            Rental Yield Comparison
          </h3>
          <ResponsiveContainer width="100%" height={250} className="md:h-[300px]">
            <BarChart
              data={yieldData}
              margin={{ 
                top: 15, 
                right: window.innerWidth < 768 ? 10 : 30, 
                left: 0, 
                bottom: 15 
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#ddd" vertical={true} />
              <XAxis 
                dataKey="name"
                tick={{ fontSize: window.innerWidth < 768 ? 10 : 12 }}
              />
              <YAxis 
                domain={[0, 16]}
                tick={{ fontSize: window.innerWidth < 768 ? 10 : 12 }}
              />
              <Tooltip 
                formatter={(value) => [`${value}%`, 'Yield']}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  padding: '8px',
                  fontSize: window.innerWidth < 768 ? '11px' : '12px'
                }}
              />
              <Bar 
                dataKey="value" 
                fill="#8884d8" 
                radius={[8, 8, 0, 0]}
                barSize={window.innerWidth < 768 ? 40 : 50}
              >
                {yieldData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS_BAR[index % COLORS_BAR.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          
          {/* Legend */}
          <div className="flex justify-center gap-3 md:gap-6 mt-3 md:mt-4">
            {yieldData.map((entry, index) => (
              <div key={index} className="flex items-center gap-1 md:gap-2">
                <div 
                  className="w-3 h-3 md:w-4 md:h-4 rounded-sm" 
                  style={{ backgroundColor: COLORS_BAR[index] }}
                ></div>
                <span className="text-xs md:text-sm text-[#767676]">{entry.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceAnalytics;