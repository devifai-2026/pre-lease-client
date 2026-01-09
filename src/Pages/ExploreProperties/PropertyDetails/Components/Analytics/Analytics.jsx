import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import DetailsCashflow from "./DetailsCashflow"; // Import the component

const Analytics = () => {
  // Data for pie chart
  const expenseData = [
    { name: "Maintenance", value: 46 },
    { name: "Property Tax", value: 18 },
    { name: "Insurance", value: 12 },
    { name: "Other Expenses", value: 23 },
  ];

  // Data for bar chart
  const yieldData = [
    { name: "Gross Yield", value: 13.33 },
    { name: "Net Yield", value: 12.11 },
  ];

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

  const COLORS = ["#F7C952", "#26BFCC", "#C73834", "#429482"];
  const COLORS_BAR = ["#C73834", "#26BFCC"];

  // Custom Y-axis tick values for cash flow projection
  const yAxisTicks = [-50, -25, 0, 25, 50];

  return (
    <>
      {/* Left Column */}
      <div className="space-y-2">
        {/* Property Details Card */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="pt-3 sm:pt-4 md:pt-5">
            <p className="text-base sm:text-lg font-medium pl-3 sm:pl-4 text-[#EE2529]">
              Property Details
            </p>
          </div>
          <div className="p-3 sm:p-4 pt-1 sm:pt-2">
            <div className="space-y-1 sm:space-y-2">
              <div className="flex items-start justify-between">
                <div className="flex flex-col w-1/2 pr-1 sm:pr-2">
                  <p className="text-[#767676] text-xs sm:text-sm">
                    Property Type
                  </p>
                  <p className="font-semibold text-xs sm:text-sm">
                    Residential
                  </p>
                </div>
                <div className="flex flex-col w-1/2 pl-1 sm:pl-2">
                  <p className="text-[#767676] text-xs sm:text-sm">
                    Property cost (₹)
                  </p>
                  <p className="font-semibold text-xs sm:text-sm">45 Lakhs</p>
                </div>
              </div>
              <div className="flex items-start justify-between pt-2 sm:pt-3">
                <div className="flex flex-col w-full">
                  <p className="text-[#767676] text-xs sm:text-sm">
                    Carpet Area (sq.ft)
                  </p>
                  <p className="font-semibold text-xs sm:text-sm">5000</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recurring Expenses Card */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="pt-3 sm:pt-4 md:pt-5">
            <p className="text-base sm:text-lg font-medium pl-3 sm:pl-4 text-[#EE2529]">
              Recurring Expenses (Annual)
            </p>
          </div>
          <div className="p-3 sm:p-4 pt-1 sm:pt-2">
            <div className="space-y-1 sm:space-y-2">
              <div className="flex items-start justify-between">
                <div className="flex flex-col w-1/2 pr-1 sm:pr-2">
                  <p className="text-[#767676] text-xs sm:text-sm">
                    Property Tax (₹)
                  </p>
                  <p className="font-semibold text-xs sm:text-sm">12000</p>
                </div>
                <div className="flex flex-col w-1/2 pl-1 sm:pl-2">
                  <p className="text-[#767676] text-xs sm:text-sm">
                    Insurance (₹)
                  </p>
                  <p className="font-semibold text-xs sm:text-sm">8000</p>
                </div>
              </div>

              <div className="flex flex-col  pr-1 sm:pr-2">
                <p className="text-[#767676] text-xs sm:text-sm">
                  Maintenance per sq.ft (₹)
                </p>
                <p className="font-semibold text-xs sm:text-sm">30000</p>
              </div>
              <div className="flex flex-col  ">
                <p className="text-[#767676] text-xs sm:text-sm">
                  Maintenance Lump sum (₹)
                </p>
                <p className="font-semibold text-xs sm:text-sm">15000</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="space-y-4 sm:space-y-6">
        {/* Rental Details Card */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="pt-3 sm:pt-4 md:pt-5">
            <p className="text-base sm:text-lg font-medium pl-3 sm:pl-4 text-[#EE2529]">
              Rental Details
            </p>
          </div>
          <div className="p-3 sm:p-4 pt-1 sm:pt-2">
            <div className="space-y-1 sm:space-y-2">
              <div className="flex items-start justify-between">
                <div className="flex flex-col w-1/2 pr-1 sm:pr-2">
                  <p className="text-[#767676] text-xs sm:text-sm">
                    Monthly Rent (₹)
                  </p>
                  <p className="font-semibold text-xs sm:text-sm">50000</p>
                </div>
                <div className="flex flex-col w-1/2 pl-1 sm:pl-2">
                  <p className="text-[#767676] text-xs sm:text-sm">
                    Security Deposit (₹)
                  </p>
                  <p className="font-semibold text-xs sm:text-sm">3 Lakhs</p>
                </div>
              </div>

              <div className="flex flex-col pr-1 sm:pr-2">
                <p className="text-[#767676] text-xs sm:text-sm">
                  Rent Escalation every(yrs)
                </p>
                <p className="font-semibold text-xs sm:text-sm">3</p>
              </div>
              <div className="flex flex-col  ">
                <p className="text-[#767676] text-xs sm:text-sm">
                  Rent Escalation (% per year)
                </p>
                <p className="font-semibold text-xs sm:text-sm">8</p>
              </div>

              <div className="flex items-start justify-between">
                <div className="flex flex-col w-1/2 pr-1 sm:pr-2">
                  <p className="text-[#767676] text-xs sm:text-sm">
                    Lease Start Date
                  </p>
                  <p className="font-semibold text-xs sm:text-sm">21/08/2015</p>
                </div>
                <div className="flex flex-col w-1/2 pl-1 sm:pl-2">
                  <p className="text-[#767676] text-xs sm:text-sm">
                    Lease term (Yrs)
                  </p>
                  <p className="font-semibold text-xs sm:text-sm">10</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* One-time Costs Card */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="pt-3 sm:pt-4 md:pt-5">
            <p className="text-base sm:text-lg font-medium pl-3 sm:pl-4 text-[#EE2529]">
              One-time Costs
            </p>
          </div>
          <div className="p-3 sm:p-4 pt-1 sm:pt-2">
            <div className="space-y-1 sm:space-y-2">
              <div className="flex items-start justify-between">
                <div className="flex flex-col w-1/2 pr-1 sm:pr-2">
                  <p className="text-[#767676] text-xs sm:text-sm">
                    Legal Fees (₹)
                  </p>
                  <p className="font-semibold text-xs sm:text-sm">35000</p>
                </div>
                <div className="flex flex-col w-1/2 pl-1 sm:pl-2">
                  <p className="text-[#767676] text-xs sm:text-sm">
                    Brokerage (₹)
                  </p>
                  <p className="font-semibold text-xs sm:text-sm">67500</p>
                </div>
              </div>

              <div className="flex flex-col  pr-1 sm:pr-2">
                <p className="text-[#767676] text-xs sm:text-sm">
                  Stamp Duty (% of Price)
                </p>
                <p className="font-semibold text-xs sm:text-sm">12</p>
              </div>
              <div className="flex flex-col  ">
                <p className="text-[#767676] text-xs sm:text-sm">
                  Other One-time Costs (₹)
                </p>
                <p className="font-semibold text-xs sm:text-sm">25000</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full Width Grid Cards */}
      <div className="col-span-1 lg:col-span-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {/* 1 */}
          <div className="p-3 space-y-4 border border-[#C73834] rounded-md bg-[#FDEDEE]">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Gross Rental Yield</h2>
              <p className="text-xl text-[#C73834] font-bold">13.33%</p>
            </div>
            <p className="text-[#6B7280] text-sm">% Before expenses</p>
            <div className="space-y-2">
              <p className="text-[#6B7280] text-sm">Return before expenses.</p>
              <p className="text-[#6B7280] text-sm">
                Higher %=stronger rental income.
              </p>
            </div>
          </div>
          {/* 2 */}
          <div className="p-3 space-y-4 border border-[#26BFCC] rounded-md bg-[#D7EFF7]">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Net Rental Yield</h2>
              <p className="text-xl text-[#26BFCC] font-bold">12.11%</p>
            </div>
            <p className="text-[#6B7280] text-sm">% After expenses</p>
            <div className="space-y-2">
              <p className="text-[#6B7280] text-sm">
                Return after all expenses.
              </p>
              <p className="text-[#6B7280] text-sm">Shows your real profit.</p>
            </div>
          </div>
          {/* 3 */}
          <div className="p-3 space-y-4 border border-[#26BFCC] rounded-md bg-[#D7EFF7]">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Annual Cash Flow</h2>
              <p className="text-xl text-[#429482] font-bold">₹5.35 Lakhs</p>
            </div>
            <p className="text-[#6B7280] text-sm">$ Net annual income</p>
            <div className="space-y-2">
              <p className="text-[#6B7280] text-sm">Net yearly income.</p>
              <p className="text-[#6B7280] text-sm">
                Money you can use or reinvest.
              </p>
            </div>
          </div>
          {/* 4 */}
          <div className="p-3 space-y-4 border border-[#F7C952CC] rounded-md bg-[#FFFCF4]">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Payback Period</h2>
              <p className="text-xl text-[#F7C952] font-bold">9.1 years</p>
            </div>
            <p className="text-[#6B7280] text-sm">Time to break even</p>
            <div className="space-y-2 ">
              <p className="text-[#6B7280] text-sm">Years to recover cost.</p>
              <p className="text-[#6B7280] text-sm">
                Shorter = quicker returns.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Income */}
      <div className="col-span-1 lg:col-span-2  mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* 1 */}
          <div className="p-3 shadow-md rounded-md">
            <h2 className="text-[#EE2529] text-lg md:text-xl mb-3 font-semibold">
              Investment Summery
            </h2>
            <div className="space-y-5">
              <div className="flex justify-between items-center">
                <p className="text-[#767676] text-sm">
                  Total Initial Investment (₹)
                </p>
                <p className="font-semibold">48,52,500</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-[#767676] text-sm">Gross Annual Rent (₹)</p>
                <p className="font-semibold">6,00,000</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-[#767676] text-sm">
                  Total Annual Expenses (₹)
                </p>
                <p className="font-semibold">65,000</p>
              </div>
            </div>
            <div className="mt-5">
              <hr />
            </div>
            <div className="flex justify-between items-center mt-5">
              <p className="text-black font-semibold text-sm">
                Net Annual Income (₹)
              </p>
              <p className="font-semibold text-[#429482]">5,35,000</p>
            </div>
          </div>
          {/* 2 */}
          <div className="p-3 shadow-md rounded-md">
            <h2 className="text-[#EE2529] text-lg md:text-xl mb-3 font-semibold">
              Additional Income
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <p className="text-[#767676] text-sm">
                  Annual Interest on <br /> Security Deposit (₹)
                </p>
                <p className="font-semibold text-[#429482]">25,500</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-[#000000] text-sm">
                  Total Annual Return (₹)
                </p>
                <p className="font-semibold text-[#429482]">5,60,500</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* performance analytics */}
      <div className="col-span-1 lg:col-span-2 mt-6">
        <h2 className="text-[#EE2529] text-lg md:text-xl mb-3 font-semibold">
          Performance Analytics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* left charts - Pie Chart with better label positioning */}
          <div className="bg-white shadow-lg rounded-lg p-3">
            <h3 className="text-center text-lg font-semibold mb-4 text-[#333]">
              Annual Expense Breakdown
            </h3>
            <ResponsiveContainer width="100%" height={300}>
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
                    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                    const x = cx + radius * Math.cos(-midAngle * RADIAN);
                    const y = cy + radius * Math.sin(-midAngle * RADIAN);
                    
                    let textAnchor = x > cx ? 'start' : 'end';
                    let dx = x > cx ? 10 : -10;
                    
                    if (x <= cx) {
                      dx = -15;
                    }
                    
                    return (
                      <text
                        x={x}
                        y={y}
                        fill="#333"
                        textAnchor={textAnchor}
                        dominantBaseline="central"
                        fontSize={12}
                        fontWeight="bold"
                        dx={dx}
                      >
                        {`${name}: ${value}%`}
                      </text>
                    );
                  }}
                  outerRadius={80}
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
                  formatter={(value, name) => [`${value}%`, name]}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    padding: '10px'
                  }}
                />
                <Legend 
                  layout="horizontal"
                  verticalAlign="bottom"
                  align="center"
                  wrapperStyle={{ paddingTop: '20px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* right charts - Bar Chart */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-center text-lg font-semibold mb-4 text-[#333]">
              Rental Yield Comparison
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={yieldData}
                margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 16]} />
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Yield']}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    padding: '10px'
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
            <div className="flex justify-center gap-6 mt-4">
              {yieldData.map((entry, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div 
                    className="w-4 h-4 rounded-sm" 
                    style={{ backgroundColor: COLORS_BAR[index] }}
                  ></div>
                  <span className="text-sm text-gray-600">{entry.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* cashflow projection */}
      <div className="col-span-1 lg:col-span-2 mt-6">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-center text-lg md:text-xl mb-6 font-semibold">
            Cash Flow Projections
          </h2>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={cashFlowData}
              margin={{ top: 20, right: 30, left: 40, bottom: 20 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#ddd"
                vertical={true}
                horizontal={true}
              />
              <XAxis
                dataKey="year"
                tick={{ fontSize: 12 }}
                axisLine={{ stroke: "#ddd" }}
              />
              <YAxis
                tick={{ fontSize: 12 }}
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
                  padding: "10px",
                }}
              />
              <Legend
                wrapperStyle={{ paddingTop: "20px" }}
                iconType="line"
              />
              <Line
                type="monotone"
                dataKey="annualCashFlow"
                stroke="#26BFCC"
                strokeWidth={2}
                dot={{ fill: "#26BFCC", r: 4 }}
                activeDot={{ r: 6 }}
                name="Annual Cash Flow"
                isAnimationActive={true}
              />
              <Line
                type="monotone"
                dataKey="annualRent"
                stroke="#C73834"
                strokeWidth={2}
                dot={{ fill: "#C73834", r: 4 }}
                activeDot={{ r: 6 }}
                name="Annual Rent"
                isAnimationActive={true}
              />
              <Line
                type="monotone"
                dataKey="cumulativeCashFlow"
                stroke="#F7C952"
                strokeWidth={2}
                dot={{ fill: "#F7C952", r: 4 }}
                activeDot={{ r: 6 }}
                name="Cumulative Cash Flow"
                isAnimationActive={true}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Import and render the detailed cashflow table */}
      <DetailsCashflow />
    </>
  );
};

export default Analytics;