import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const PerformanceAnalytics = () => {
  const expenseData = [
    { name: "Annual Loan EMI", value: 84 },
    { name: "Maintenance", value: 7 },
    { name: "Property Tax", value: 3 },
    { name: "Insurance", value: 2 },
    { name: "Other Expenses", value: 4 },
  ];

  const yieldData = [
    { name: "Gross Yield", value: 13.33, color: "#C73834" },
    { name: "Net Yield", value: 12.11, color: "#26BFCC" },
  ];

  const COLORS = ['#4A4A4A', '#FFA500', '#20B2AA', '#FF6B6B', '#87CEEB'];
  const COLORS_BAR = ["#C73834", "#26BFCC"];

  return (
    <div className="font-montserrat bg-white mt-6 p-4">
      {/* Heading */}
      <h2 className="text-[#EE2529] text-base md:text-lg font-bold mb-4 md:mb-6">
        Performance Analytics
      </h2>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
{/* Left - Pie Chart - Fixed for mobile */}
<div className="bg-white rounded-lg p-4 md:p-6 shadow-md">
  <h3 className="text-center text-sm md:text-base font-semibold text-[#262626] mb-4 md:mb-6">
    Annual Expense Breakdown
  </h3>
  <div className="w-full h-[300px]">
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={expenseData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ cx, cy, midAngle, innerRadius, outerRadius, name, value, index }) => {
            const RADIAN = Math.PI / 180;
            // Check if mobile (screen width less than 768px)
            const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
            
            if (isMobile) {
              // Mobile: Show value inside the pie with better positioning
              const radius = innerRadius + (outerRadius - innerRadius) * 0.7;
              const x = cx + radius * Math.cos(-midAngle * RADIAN);
              const y = cy + radius * Math.sin(-midAngle * RADIAN);
              
              // Make text color black for all except Annual Loan EMI
              const textColor = name === "Annual Loan EMI" ? "white" : "black";
              
              return (
                <text
                  x={x}
                  y={y}
                  fill={textColor}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize={10}
                  fontWeight="bold"
                  stroke={textColor === "white" ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.5)"}
                  strokeWidth={0.5}
                >
                  {`${value}%`}
                </text>
              );
            } else {
              // Desktop: Original labels outside
              const radius = outerRadius + 50;
              const x = cx + radius * Math.cos(-midAngle * RADIAN);
              const y = cy + radius * Math.sin(-midAngle * RADIAN);

              // Make text color black for all except Annual Loan EMI
              const textColor = name === "Annual Loan EMI" ? COLORS[index % COLORS.length] : "#000000";
              
              return (
                <text
                  x={x}
                  y={y}
                  fill={textColor}
                  textAnchor={x > cx ? 'start' : 'end'}
                  dominantBaseline="central"
                  fontSize={12}
                  fontWeight="600"
                >
                  {`${name} ${value}%`}
                </text>
              );
            }
          }}
          outerRadius="80%"
          innerRadius="40%"
          fill="#8884d8"
          dataKey="value"
        >
          {expenseData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
        <Tooltip 
          formatter={(value, name, props) => {
            const entry = expenseData.find(item => item.value === value);
            const entryName = entry ? entry.name : name;
            return [`${value}%`, entryName];
          }}
          contentStyle={{
            backgroundColor: 'white',
            border: '1px solid #ddd',
            borderRadius: '6px',
            padding: '8px',
            fontSize: '12px'
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  </div>
  
  {/* Legend for mobile - shows all labels clearly */}
  <div className="mt-4 md:hidden">
    <div className="grid grid-cols-2 gap-2">
      {expenseData.map((entry, index) => (
        <div key={index} className="flex items-center gap-2">
          <div 
            className="w-3 h-3 rounded-sm flex-shrink-0"
            style={{ backgroundColor: COLORS[index % COLORS.length] }}
          ></div>
          <span className="text-xs font-medium truncate">
            {entry.name} ({entry.value}%)
          </span>
        </div>
      ))}
    </div>
  </div>
</div>
       {/* Right - Bar Chart - UPDATED to match reference */}
<div className="bg-white shadow-lg rounded-lg py-3 md:p-6 w-full">
  <h3 className="text-center text-base md:text-lg font-semibold mb-4 text-[#333]">
    Rental Yield Comparison
  </h3>
  <div className="w-full h-[300px]">
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={yieldData}
        margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
        <XAxis 
          dataKey="name" 
          tick={(props) => {
            const { x, y, payload } = props;
            const yieldItem = yieldData.find(item => item.name === payload.value);
            const color = yieldItem ? yieldItem.color : '#333';
            
            return (
              <text
                x={x}
                y={y}
                dy={16}
                textAnchor="middle"
                fill={color}
                fontSize={12}
                fontWeight="bold"
              >
                {payload.value}
              </text>
            );
          }}
        />
        <YAxis domain={[0, 16]} />
        <Tooltip 
          formatter={(value) => [`${value}%`, 'Yield']}
          contentStyle={{
            backgroundColor: 'white',
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '10px'
          }}
          labelFormatter={(label) => {
            const yieldItem = yieldData.find(item => item.name === label);
            const color = yieldItem ? yieldItem.color : '#333';
            return <span style={{ color: color, fontWeight: 'bold' }}>{label}</span>;
          }}
        />
        <Bar dataKey="value" fill="#8884d8" radius={[8, 8, 0, 0]}>
          {yieldData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS_BAR[index % COLORS_BAR.length]}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  </div>
  <div className="flex justify-center gap-6 mt-4">
    {yieldData.map((entry, index) => (
      <div key={index} className="flex items-center gap-2">
        <div 
          className="w-4 h-4 rounded-sm" 
          style={{ backgroundColor: COLORS_BAR[index] }}
        ></div>
        <span 
          className="text-sm font-medium"
          style={{ color: COLORS_BAR[index] }}
        >
          {entry.name}
        </span>
      </div>
    ))}
  </div>
</div>
      </div>
    </div>
  );
};

export default PerformanceAnalytics;