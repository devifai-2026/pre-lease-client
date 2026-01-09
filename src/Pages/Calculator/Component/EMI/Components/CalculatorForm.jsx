import { useState } from 'react';
import { FaInfoCircle } from 'react-icons/fa';

const CalculatorForm = () => {
  const [propertyType, setPropertyType] = useState('Residential Space');
  const [carpetArea, setCarpetArea] = useState('5600');
  const [purchasePrice, setPurchasePrice] = useState('400000');
  const [loanAmount, setLoanAmount] = useState('310000');
  const [downPayment, setDownPayment] = useState('130000');
  const [interestRate, setInterestRate] = useState('9.5');
  const [loanTenure, setLoanTenure] = useState('20');
  const [monthlyRent, setMonthlyRent] = useState('30000');
  const [securityDeposit, setSecurityDeposit] = useState('300000');
  const [daysCalculation, setDaysCalculation] = useState('3');
  const [rentEscalation, setRentEscalation] = useState('8');
  const [leaseStartDate, setLeaseStartDate] = useState('29/06/2025');
  const [leaseTerm, setLeaseTerm] = useState('10');
  const [propertyTax, setPropertyTax] = useState('12000');
  const [maintenance, setMaintenance] = useState('30000');
  const [insurance, setInsurance] = useState('8000');
  const [maintenanceLumpsum, setMaintenanceLumpsum] = useState('58000');
  const [stampDuty, setStampDuty] = useState('12');
  const [legalFees, setLegalFees] = useState('38000');
  const [brokerage, setBrokerage] = useState('67500');
  const [otherCosts, setOtherCosts] = useState('25000');
  const [includeDevelopment, setIncludeDevelopment] = useState(true);

  return (
    <div className="font-montserrat bg-white p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="text-center mb-6 lg:mb-8">
        <div className="inline-block bg-[#EE2529] text-white p-2 md:p-3 rounded-lg mb-3 lg:mb-4">
          <svg className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
          </svg>
        </div>
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#262626] mb-1 lg:mb-2">Property EMI Calculator</h1>
        <p className="text-[#767676] text-xs md:text-sm">
          Estimate your monthly loan repayment instantly based on loan amount, interest rate, and other key factors.
        </p>
      </div>

      {/* Info Cards - Same design as ROI */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mb-6 lg:mb-8 max-w-[95%] mx-auto">
        <div className="border-b-2 border-[#EE2529] p-2 md:p-3 text-center shadow-md rounded-md">
          <p className="text-[#767676] text-xs font-semibold">
            Understand your monthly EMI with ease
          </p>
        </div>
        <div className="border-b-2 border-[#EE2529] p-2 md:p-3 text-center shadow-md rounded-md">
          <p className="text-[#767676] text-xs font-semibold">
            Compare EMIs across different loan structures or interest rates
          </p>
        </div>
        <div className="border-b-2 border-[#EE2529] p-2 md:p-3 text-center shadow-md rounded-md">
          <p className="text-[#767676] text-xs font-semibold">
            Adjust variables like loan amount, tenure, and more to see impacts in real time
          </p>
        </div>
      </div>

      {/* Form Content - Now in ROI style containers */}
      <div className="space-y-4 md:space-y-6">
        {/* Property Details - ROI style container */}
        <div className="shadow-md rounded-md p-3 md:p-4 lg:p-5">
          <h3 className="text-[#EE2529] font-bold text-sm md:text-base mb-3 lg:mb-4">
            Property Details
          </h3>
          <div className="space-y-3 md:space-y-4">
            {/* Property Type and Carpet Area - flex row layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
              <div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mb-1 md:mb-2">
                  <label className="text-[#767676] text-xs font-semibold w-full sm:w-1/3 flex items-center gap-1">
                    Property Type <FaInfoCircle className="text-gray-400" size={12} />
                  </label>
                  <select 
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full sm:w-2/3 bg-[#F5F5F5] border border-[#E0E0E0] rounded px-3 py-2 text-xs text-[#767676]"
                  >
                    <option>Residential Space</option>
                    <option>Commercial Space</option>
                  </select>
                </div>
              </div>
              <div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mb-1 md:mb-2">
                  <label className="text-[#767676] text-xs font-semibold w-full sm:w-1/3 flex items-center gap-1">
                    Purchase Price (₹) <FaInfoCircle className="text-gray-400" size={12} />
                  </label>
                  <input 
                    type="text"
                    value={purchasePrice}
                    onChange={(e) => setPurchasePrice(e.target.value)}
                    className="w-full sm:w-2/3 bg-[#F5F5F5] border border-[#E0E0E0] rounded px-3 py-2 text-xs text-[#767676]"
                  />
                </div>
              </div>
            </div>
            {/* Carpet Area - flex row layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
              <div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mb-1 md:mb-2">
                  <label className="text-[#767676] text-xs font-semibold w-full sm:w-1/3 flex items-center gap-1">
                    Carpet Area (sq ft) <FaInfoCircle className="text-gray-400" size={12} />
                  </label>
                  <input 
                    type="text"
                    value={carpetArea}
                    onChange={(e) => setCarpetArea(e.target.value)}
                    className="w-full sm:w-2/3 bg-[#F5F5F5] border border-[#E0E0E0] rounded px-3 py-2 text-xs text-[#767676]"
                  />
                </div>
              </div>
              <div className="hidden lg:block"></div>
            </div>
          </div>
        </div>

        {/* EMI Options - ROI style container */}
        <div className="shadow-md rounded-md p-3 md:p-4 lg:p-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 lg:mb-4 gap-2 sm:gap-0">
            <h3 className="text-[#EE2529] font-bold text-sm md:text-base">
              EMI Options
            </h3>
            <label className="flex flex-row items-center gap-2 text-xs font-semibold text-[#262626]">
              <span>Include Downpayment</span>
              <div className="relative inline-block w-8 h-4 md:w-10 md:h-5">
                <input 
                  type="checkbox"
                  checked={includeDevelopment}
                  onChange={(e) => setIncludeDevelopment(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-8 h-4 md:w-10 md:h-5 bg-[#EE2529] rounded-full peer peer-focus:ring-2 peer-focus:ring-[#EE2529]/30 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-3 after:w-3 md:after:h-4 md:after:w-4 after:transition-all peer-checked:after:translate-x-4 md:peer-checked:after:translate-x-5"></div>
              </div>
            </label>
          </div>
          <div className="text-[#767676] text-xs font-semibold mb-2 md:mb-3">
            Note: EMI amount is current property purchase price.
          </div>
          <div className="space-y-3 md:space-y-4">
            {/* Loan Amount and Down Payment - flex row layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
              <div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mb-1 md:mb-2">
                  <label className="text-[#767676] text-xs font-semibold w-full sm:w-1/3 flex items-center gap-1">
                    Loan Amount (₹) <FaInfoCircle className="text-gray-400" size={12} />
                  </label>
                  <input 
                    type="text"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value)}
                    className="w-full sm:w-2/3 bg-[#F5F5F5] border border-[#E0E0E0] rounded px-3 py-2 text-xs text-[#767676]"
                  />
                </div>
              </div>
              <div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mb-1 md:mb-2">
                  <label className="text-[#767676] text-xs font-semibold w-full sm:w-1/3 flex items-center gap-1">
                    Down Payment (₹) <FaInfoCircle className="text-gray-400" size={12} />
                  </label>
                  <input 
                    type="text"
                    value={downPayment}
                    onChange={(e) => setDownPayment(e.target.value)}
                    className="w-full sm:w-2/3 bg-[#F5F5F5] border border-[#E0E0E0] rounded px-3 py-2 text-xs text-[#767676]"
                  />
                </div>
              </div>
            </div>
            {/* Interest Rate and Loan Tenure - flex row layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
              <div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mb-1 md:mb-2">
                  <label className="text-[#767676] text-xs font-semibold w-full sm:w-1/3 flex items-center gap-1">
                    Interest (% per annum) <FaInfoCircle className="text-gray-400" size={12} />
                  </label>
                  <input 
                    type="text"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    className="w-full sm:w-2/3 bg-[#F5F5F5] border border-[#E0E0E0] rounded px-3 py-2 text-xs text-[#767676]"
                  />
                </div>
              </div>
              <div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mb-1 md:mb-2">
                  <label className="text-[#767676] text-xs font-semibold w-full sm:w-1/3 flex items-center gap-1">
                    Loan Tenure (Years) <FaInfoCircle className="text-gray-400" size={12} />
                  </label>
                  <input 
                    type="text"
                    value={loanTenure}
                    onChange={(e) => setLoanTenure(e.target.value)}
                    className="w-full sm:w-2/3 bg-[#F5F5F5] border border-[#E0E0E0] rounded px-3 py-2 text-xs text-[#767676]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Rental Details - ROI style container */}
        <div className="shadow-md rounded-md p-3 md:p-4 lg:p-5">
          <h3 className="text-[#EE2529] font-bold text-sm md:text-base mb-3 lg:mb-4">
            Rental Details
          </h3>
          <div className="space-y-3 md:space-y-4">
            {/* Monthly Rent and Security Deposit - flex row layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
              <div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mb-1 md:mb-2">
                  <label className="text-[#767676] text-xs font-semibold w-full sm:w-1/3 flex items-center gap-1">
                    Monthly Rent (₹) <FaInfoCircle className="text-gray-400" size={12} />
                  </label>
                  <input 
                    type="text"
                    value={monthlyRent}
                    onChange={(e) => setMonthlyRent(e.target.value)}
                    className="w-full sm:w-2/3 bg-[#F5F5F5] border border-[#E0E0E0] rounded px-3 py-2 text-xs text-[#767676]"
                  />
                </div>
              </div>
              <div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mb-1 md:mb-2">
                  <label className="text-[#767676] text-xs font-semibold w-full sm:w-1/3 flex items-center gap-1">
                    Security Deposit (₹) <FaInfoCircle className="text-gray-400" size={12} />
                  </label>
                  <input 
                    type="text"
                    value={securityDeposit}
                    onChange={(e) => setSecurityDeposit(e.target.value)}
                    className="w-full sm:w-2/3 bg-[#F5F5F5] border border-[#E0E0E0] rounded px-3 py-2 text-xs text-[#767676]"
                  />
                </div>
              </div>
            </div>
            {/* Days Calculation and Rent Escalation - flex row layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
              <div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mb-1 md:mb-2">
                  <label className="text-[#767676] text-xs font-semibold w-full sm:w-1/3 flex items-center gap-1">
                    Days Calculation Gregorian <FaInfoCircle className="text-gray-400" size={12} />
                  </label>
                  <input 
                    type="text"
                    value={daysCalculation}
                    onChange={(e) => setDaysCalculation(e.target.value)}
                    className="w-full sm:w-2/3 bg-[#F5F5F5] border border-[#E0E0E0] rounded px-3 py-2 text-xs text-[#767676]"
                  />
                </div>
              </div>
              <div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mb-1 md:mb-2">
                  <label className="text-[#767676] text-xs font-semibold w-full sm:w-1/3 flex items-center gap-1">
                    Rent Escalation (% per year) <FaInfoCircle className="text-gray-400" size={12} />
                  </label>
                  <input 
                    type="text"
                    value={rentEscalation}
                    onChange={(e) => setRentEscalation(e.target.value)}
                    className="w-full sm:w-2/3 bg-[#F5F5F5] border border-[#E0E0E0] rounded px-3 py-2 text-xs text-[#767676]"
                  />
                </div>
              </div>
            </div>
            {/* Lease Start Date and Lease Term - flex row layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
              <div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mb-1 md:mb-2">
                  <label className="text-[#767676] text-xs font-semibold w-full sm:w-1/3 flex items-center gap-1">
                    Lease Start Date <FaInfoCircle className="text-gray-400" size={12} />
                  </label>
                  <input 
                    type="text"
                    value={leaseStartDate}
                    onChange={(e) => setLeaseStartDate(e.target.value)}
                    className="w-full sm:w-2/3 bg-[#F5F5F5] border border-[#E0E0E0] rounded px-3 py-2 text-xs text-[#767676]"
                  />
                </div>
              </div>
              <div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mb-1 md:mb-2">
                  <label className="text-[#767676] text-xs font-semibold w-full sm:w-1/3 flex items-center gap-1">
                    Lease Term (Yrs) <FaInfoCircle className="text-gray-400" size={12} />
                  </label>
                  <input 
                    type="text"
                    value={leaseTerm}
                    onChange={(e) => setLeaseTerm(e.target.value)}
                    className="w-full sm:w-2/3 bg-[#F5F5F5] border border-[#E0E0E0] rounded px-3 py-2 text-xs text-[#767676]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Balance Lease Tenure Alert - ROI style */}
          <div className="mt-3 md:mt-4 bg-[#FFFCF4] border border-[#EE2529] p-2 md:p-3 rounded">
            <p className="text-xs text-[#767676]">
              <span className="font-semibold">Balance Lease Tenure:</span>
              <span className="text-[#EE2529] font-semibold ml-2">
                10 years 9 months 2 days
              </span>
            </p>
            <p className="text-xs text-[#767676] mt-1">
              Typically defined as the period from the expiry of the initial lease term until the end of the lease agreement or the specified end of expiry date, whichever comes first.
            </p>
          </div>
        </div>

        {/* Recurring Expenses - ROI style container */}
        <div className="shadow-md rounded-md p-3 md:p-4 lg:p-5">
          <h3 className="text-[#EE2529] font-bold text-sm md:text-base mb-3 lg:mb-4">
            Recurring Expenses (Annual)
          </h3>
          <div className="space-y-3 md:space-y-4">
            {/* Property Tax and Maintenance - flex row layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
              <div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mb-1 md:mb-2">
                  <label className="text-[#767676] text-xs font-semibold w-full sm:w-1/3 flex items-center gap-1">
                    Property Tax (₹) <FaInfoCircle className="text-gray-400" size={12} />
                  </label>
                  <input 
                    type="text"
                    value={propertyTax}
                    onChange={(e) => setPropertyTax(e.target.value)}
                    className="w-full sm:w-2/3 bg-[#F5F5F5] border border-[#E0E0E0] rounded px-3 py-2 text-xs text-[#767676]"
                  />
                </div>
              </div>
              <div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mb-1 md:mb-2">
                  <label className="text-[#767676] text-xs font-semibold w-full sm:w-1/3 flex items-center gap-1">
                    Maintenance per sq ft (₹) <FaInfoCircle className="text-gray-400" size={12} />
                  </label>
                  <input 
                    type="text"
                    value={maintenance}
                    onChange={(e) => setMaintenance(e.target.value)}
                    className="w-full sm:w-2/3 bg-[#F5F5F5] border border-[#E0E0E0] rounded px-3 py-2 text-xs text-[#767676]"
                  />
                </div>
              </div>
            </div>
            {/* Insurance and Maintenance Lump sum - flex row layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
              <div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mb-1 md:mb-2">
                  <label className="text-[#767676] text-xs font-semibold w-full sm:w-1/3 flex items-center gap-1">
                    Insurance (₹) <FaInfoCircle className="text-gray-400" size={12} />
                  </label>
                  <input 
                    type="text"
                    value={insurance}
                    onChange={(e) => setInsurance(e.target.value)}
                    className="w-full sm:w-2/3 bg-[#F5F5F5] border border-[#E0E0E0] rounded px-3 py-2 text-xs text-[#767676]"
                  />
                </div>
              </div>
              <div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mb-1 md:mb-2">
                  <label className="text-[#767676] text-xs font-semibold w-full sm:w-1/3 flex items-center gap-1">
                    Maintenance Lump sum (₹) <FaInfoCircle className="text-gray-400" size={12} />
                  </label>
                  <input 
                    type="text"
                    value={maintenanceLumpsum}
                    onChange={(e) => setMaintenanceLumpsum(e.target.value)}
                    className="w-full sm:w-2/3 bg-[#F5F5F5] border border-[#E0E0E0] rounded px-3 py-2 text-xs text-[#767676]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* One-time Costs - ROI style container */}
        <div className="shadow-md rounded-md p-3 md:p-4 lg:p-5">
          <h3 className="text-[#EE2529] font-bold text-sm md:text-base mb-3 lg:mb-4">
            One-time Costs
          </h3>
          <div className="space-y-3 md:space-y-4">
            {/* Stamp Duty and Legal Fees - flex row layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
              <div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mb-1 md:mb-2">
                  <label className="text-[#767676] text-xs font-semibold w-full sm:w-1/3 flex items-center gap-1">
                    Stamp Duty (% of Price) <FaInfoCircle className="text-gray-400" size={12} />
                  </label>
                  <input 
                    type="text"
                    value={stampDuty}
                    onChange={(e) => setStampDuty(e.target.value)}
                    className="w-full sm:w-2/3 bg-[#F5F5F5] border border-[#E0E0E0] rounded px-3 py-2 text-xs text-[#767676]"
                  />
                </div>
              </div>
              <div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mb-1 md:mb-2">
                  <label className="text-[#767676] text-xs font-semibold w-full sm:w-1/3 flex items-center gap-1">
                    Legal Fees (₹) <FaInfoCircle className="text-gray-400" size={12} />
                  </label>
                  <input 
                    type="text"
                    value={legalFees}
                    onChange={(e) => setLegalFees(e.target.value)}
                    className="w-full sm:w-2/3 bg-[#F5F5F5] border border-[#E0E0E0] rounded px-3 py-2 text-xs text-[#767676]"
                  />
                </div>
              </div>
            </div>
            {/* Brokerage and Other Costs - flex row layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
              <div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mb-1 md:mb-2">
                  <label className="text-[#767676] text-xs font-semibold w-full sm:w-1/3 flex items-center gap-1">
                    Brokerage (₹) <FaInfoCircle className="text-gray-400" size={12} />
                  </label>
                  <input 
                    type="text"
                    value={brokerage}
                    onChange={(e) => setBrokerage(e.target.value)}
                    className="w-full sm:w-2/3 bg-[#F5F5F5] border border-[#E0E0E0] rounded px-3 py-2 text-xs text-[#767676]"
                  />
                </div>
              </div>
              <div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mb-1 md:mb-2">
                  <label className="text-[#767676] text-xs font-semibold w-full sm:w-1/3 flex items-center gap-1">
                    Other One-time Cash (₹) <FaInfoCircle className="text-gray-400" size={12} />
                  </label>
                  <input 
                    type="text"
                    value={otherCosts}
                    onChange={(e) => setOtherCosts(e.target.value)}
                    className="w-full sm:w-2/3 bg-[#F5F5F5] border border-[#E0E0E0] rounded px-3 py-2 text-xs text-[#767676]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Calculate Button - Centered like ROI */}
        <div className="mt-6 md:mt-8 flex gap-4 mx-auto">
          <button className="bg-gradient-to-r from-[#EE2529] to-[#C73834] text-white px-6 md:px-8 py-2 rounded font-bold text-xs md:text-sm hover:opacity-90 transition-opacity mx-auto">
            Calculate ROI & Rental Yield
          </button>
        </div>
      </div>
    </div>
  );
};

export default CalculatorForm;