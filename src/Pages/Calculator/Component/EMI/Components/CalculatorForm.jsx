import { useState } from 'react';
import { FaInfoCircle, FaAngleDown } from 'react-icons/fa';

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
  
  // Enhanced validation function to ensure positive numbers
  const validatePositiveNumber = (value, setter) => {
    // Remove any non-numeric characters except decimal point
    let cleaned = value.replace(/[^0-9.]/g, '');
    
    // Remove leading zeros except for decimal numbers
    cleaned = cleaned.replace(/^0+(\d)/, '$1');
    
    // Ensure it doesn't start with a decimal point
    if (cleaned.startsWith('.')) {
      cleaned = '0' + cleaned;
    }
    
    // Remove multiple decimal points
    const parts = cleaned.split('.');
    if (parts.length > 2) {
      cleaned = parts[0] + '.' + parts.slice(1).join('');
    }
    
    // Don't allow empty string if there's input
    if (value === '' || cleaned === '') {
      setter('');
      return;
    }
    
    // Convert to number and ensure it's not negative
    const num = parseFloat(cleaned);
    if (isNaN(num)) {
      setter('');
      return;
    }
    
    // Return the cleaned value (as string to maintain input format)
    setter(cleaned);
  };

  // Handle percentage fields (0-100)
  const validatePercentage = (value, setter) => {
    let cleaned = value.replace(/[^0-9.]/g, '');
    
    // Remove leading zeros except for decimal numbers
    cleaned = cleaned.replace(/^0+(\d)/, '$1');
    
    if (cleaned.startsWith('.')) {
      cleaned = '0' + cleaned;
    }
    
    const parts = cleaned.split('.');
    if (parts.length > 2) {
      cleaned = parts[0] + '.' + parts.slice(1).join('');
    }
    
    const num = parseFloat(cleaned);
    if (isNaN(num)) {
      setter('');
      return;
    }
    
    // Cap at 100 if it's a percentage field
    if (num > 100) {
      setter('100');
      return;
    }
    
    setter(cleaned);
  };

  // Validation for loan tenure (years, typically 1-30)
  const validateLoanTenure = (value, setter) => {
    let cleaned = value.replace(/[^0-9]/g, '');
    
    // Remove leading zeros
    cleaned = cleaned.replace(/^0+/, '');
    
    const num = parseInt(cleaned);
    if (isNaN(num)) {
      setter('');
      return;
    }
    
    // Typical loan tenure range (1-30 years)
    if (num > 30) {
      setter('30');
      return;
    }
    if (num < 1) {
      setter('1');
      return;
    }
    
    setter(cleaned);
  };

  // Validation for lease term (years)
  const validateLeaseTerm = (value, setter) => {
    let cleaned = value.replace(/[^0-9]/g, '');
    
    // Remove leading zeros
    cleaned = cleaned.replace(/^0+/, '');
    
    const num = parseInt(cleaned);
    if (isNaN(num)) {
      setter('');
      return;
    }
    
    if (num < 1) {
      setter('1');
      return;
    }
    
    setter(cleaned);
  };

  // Validation for days calculation (1-30)
  const validateDaysCalculation = (value, setter) => {
    let cleaned = value.replace(/[^0-9]/g, '');
    
    // Remove leading zeros
    cleaned = cleaned.replace(/^0+/, '');
    
    const num = parseInt(cleaned);
    if (isNaN(num)) {
      setter('');
      return;
    }
    
    if (num > 31) {
      setter('31');
      return;
    }
    if (num < 1) {
      setter('1');
      return;
    }
    
    setter(cleaned);
  };

  // Validation for date format (dd/mm/yyyy)
  const validateDate = (value, setter) => {
    // Allow date format with slashes and numbers
    const cleaned = value.replace(/[^0-9/]/g, '');
    setter(cleaned);
  };

  // Handler for positive number inputs
  const handlePositiveNumber = (value, setter) => {
    validatePositiveNumber(value, setter);
  };

  // Handler for percentage inputs
  const handlePercentage = (value, setter) => {
    validatePercentage(value, setter);
  };

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
        <p className="text-[#767676] text-xs md:text-sm hidden md:block">
          Estimate your monthly loan repayment instantly based on loan amount, interest rate, and other key factors.{" "}
          <br /> and other key factors
        </p>
        <p className="text-[#767676] text-xs md:text-sm block md:hidden">
          Estimate your monthly loan repayment instantly based on loan amount, interest rate, and other key factors.
        </p>
      </div>

    {/* Info Cards */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mb-6 lg:mb-8 max-w-[88%] mx-auto hidden lg:grid">
  <div className="border-b-2 border-[#EE2529] p-2 md:p-2 text-center shadow-md rounded-md flex items-center justify-center">
    <p className="text-[#767676] text-lg font-semibold">
      Understand your <br /> monthly EMI with ease
    </p>
  </div>
  <div className="border-b-2 border-[#EE2529] p-2 md:p-2 text-center shadow-md rounded-md flex items-center justify-center">
    <p className="text-[#767676] text-lg font-semibold">
      Compare EMIs across different <br /> loan structures or interest rates
    </p>
  </div>
  <div className="border-b-2 border-[#EE2529] p-2 md:p-1 text-center shadow-md rounded-md flex items-center justify-center">
    <p className="text-[#767676] text-lg font-semibold">
      Adjust variables like loan <br /> amount, tenure, and more to see <br /> impacts in real time
    </p>
  </div>
</div>

      {/* Form Content */}
      <div className="space-y-4 md:space-y-6">
        {/* Property Details */}
        <div className="shadow-md rounded-md p-3 md:p-4 lg:p-5">
          <h3 className="text-[#EE2529] font-semibold text-base md:text-xl lg:text-2xl mb-3 lg:mb-4">
            Property Details
          </h3>
          <div className="space-y-3 md:space-y-4">
            {/* Row 1: Property Type and Carpet Area */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
              <div>
                <div className="flex items-center gap-2 sm:gap-4 mb-1 md:mb-2">
                  <label className="text-[#767676] text-base lg:text-lg font-normal whitespace-nowrap w-1/3">
                    Property Type *
                  </label>
                  <div className="relative w-2/3">
                    <select 
                      value={propertyType}
                      onChange={(e) => setPropertyType(e.target.value)}
                      className="w-full bg-[#F5F5F5] border border-[#E0E0E0] rounded px-3 py-2 text-base lg:text-lg text-[#262626] font-bold appearance-none pr-8 cursor-pointer hover:border-[#EE2529] transition-colors"
                    >
                      <option>Residential Space</option>
                      <option>Commercial Space</option>
                    </select>
                    <FaAngleDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#767676] pointer-events-none" />
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 sm:gap-4 mb-1 md:mb-2">
                  <label className="text-[#767676] text-base lg:text-lg font-normal whitespace-nowrap w-1/3">
                    Carpet Area (sq ft) *
                  </label>
                  <input 
                    type="number"
                    min="0"
                    step="1"
                    value={carpetArea}
                    onChange={(e) => handlePositiveNumber(e.target.value, setCarpetArea)}
                    className="w-full bg-[#F5F5F5] border border-[#E0E0E0] rounded px-3 py-2 text-base lg:text-lg text-[#262626] font-bold hover:border-[#EE2529] transition-colors"
                    placeholder="Enter area"
                  />
                </div>
              </div>
            </div>
            {/* Row 2: Purchase Price - takes half width */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
              <div>
                <div className="flex items-center gap-2 sm:gap-4 mb-1 md:mb-2">
                  <label className="text-[#767676] text-base lg:text-lg font-normal whitespace-nowrap w-1/3">
                    Purchase Price (₹) *
                  </label>
                  <input 
                    type="number"
                    min="0"
                    step="1"
                    value={purchasePrice}
                    onChange={(e) => handlePositiveNumber(e.target.value, setPurchasePrice)}
                    className="w-full bg-[#F5F5F5] border border-[#E0E0E0] rounded px-3 py-2 text-base lg:text-lg text-[#262626] font-bold hover:border-[#EE2529] transition-colors"
                    placeholder="Enter amount"
                  />
                </div>
              </div>
              <div className="hidden lg:block"></div>
            </div>
          </div>
        </div>

        {/* EMI Options */}
        <div className="shadow-md rounded-md p-3 md:p-4 lg:p-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 lg:mb-4 gap-2 sm:gap-0">
            <h3 className="text-[#EE2529] font-semibold text-base md:text-xl lg:text-2xl">
              EMI Options
            </h3>
            <div className="flex items-center gap-3">
              <span className={`text-xs md:text-sm font-semibold ${includeDevelopment ? 'text-[#262626]' : 'text-[#767676]'}`}>
                Include Downpayment
              </span>
              <button
                type="button"
                className={`relative inline-flex h-6 w-10 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#EE2529] focus:ring-offset-2 ${
                  includeDevelopment ? 'bg-[#EE2529]' : 'bg-gray-300'
                }`}
                onClick={() => setIncludeDevelopment(!includeDevelopment)}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    includeDevelopment ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
          <div className="text-[#767676] text-xs md:text-sm font-semibold mb-2 md:mb-3">
            Note: EMI amount is current property purchase price.
          </div>
          <div className="space-y-3 md:space-y-4">
            {/* Row 1: Loan Amount and Down Payment */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
              <div>
                <div className="flex items-center gap-6 md:gap-10 lg:gap-16 mb-1 md:mb-2">
                  <label className="text-[#767676] text-base lg:text-lg font-normal whitespace-nowrap w-1/3">
                    Loan Amount (₹) *
                  </label>
                  <input 
                    type="number"
                    min="0"
                    step="1"
                    value={loanAmount}
                    onChange={(e) => handlePositiveNumber(e.target.value, setLoanAmount)}
                    disabled={!includeDevelopment}
                    className={`w-full bg-[#F5F5F5] border border-[#E0E0E0] rounded px-3 py-2 text-base lg:text-lg font-bold hover:border-[#EE2529] transition-colors ${
                      !includeDevelopment ? 'opacity-50 cursor-not-allowed' : 'text-[#262626]'
                    }`}
                    placeholder="Enter loan amount"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-6 md:gap-10 lg:gap-20 mb-1 md:mb-2">
                  <label className="text-[#767676] text-base lg:text-lg font-normal whitespace-nowrap w-1/3">
                    Down Payment (₹) *
                  </label>
                  <input 
                    type="number"
                    min="0"
                    step="1"
                    value={downPayment}
                    onChange={(e) => handlePositiveNumber(e.target.value, setDownPayment)}
                    disabled={!includeDevelopment}
                    className={`w-full bg-[#F5F5F5] border border-[#E0E0E0] rounded px-3 py-2 text-base lg:text-lg font-bold hover:border-[#EE2529] transition-colors ${
                      !includeDevelopment ? 'opacity-50 cursor-not-allowed' : 'text-[#262626]'
                    }`}
                    placeholder="Enter down payment"
                  />
                </div>
              </div>
            </div>
            {/* Row 2: Interest Rate and Loan Tenure */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
              <div>
                <div className="flex items-center gap-6 md:gap-10 lg:gap-14 mb-1 md:mb-2">
                  <label className="text-[#767676] text-base lg:text-lg font-normal whitespace-nowrap w-1/3">
                    Interest (% per annum) *
                  </label>
                  <input 
                    type="number"
                    min="0"
                    max="100"
                    step="0.01"
                    value={interestRate}
                    onChange={(e) => handlePercentage(e.target.value, setInterestRate)}
                    disabled={!includeDevelopment}
                    className={`w-full bg-[#F5F5F5] border border-[#E0E0E0] rounded px-3 py-2 text-base lg:text-lg font-bold hover:border-[#EE2529] transition-colors ${
                      !includeDevelopment ? 'opacity-50 cursor-not-allowed' : 'text-[#262626]'
                    }`}
                    placeholder="Enter interest rate"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-6 md:gap-10 lg:gap-20 mb-1 md:mb-2">
                  <label className="text-[#767676] text-base lg:text-lg font-normal whitespace-nowrap w-1/3">
                    Loan Tenure (Years) *
                  </label>
                  <input 
                    type="number"
                    min="1"
                    max="30"
                    step="1"
                    value={loanTenure}
                    onChange={(e) => validateLoanTenure(e.target.value, setLoanTenure)}
                    disabled={!includeDevelopment}
                    className={`w-full bg-[#F5F5F5] border border-[#E0E0E0] rounded px-3 py-2 text-base lg:text-lg font-bold hover:border-[#EE2529] transition-colors ${
                      !includeDevelopment ? 'opacity-50 cursor-not-allowed' : 'text-[#262626]'
                    }`}
                    placeholder="1-30 years"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Rental Details */}
        <div className="shadow-md rounded-md p-3 md:p-4 lg:p-5">
          <h3 className="text-[#EE2529] font-semibold text-base md:text-xl lg:text-2xl mb-3 lg:mb-4">
            Rental Details
          </h3>
          <div className="space-y-3 md:space-y-4">
            {/* Row 1: Monthly Rent and Security Deposit */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
              <div>
                <div className="flex items-center gap-6 md:gap-10 lg:gap-24 mb-1 md:mb-2">
                  <label className="text-[#767676] text-base lg:text-lg font-normal whitespace-nowrap w-1/3">
                    Monthly Rent (₹) *
                  </label>
                  <input 
                    type="number"
                    min="0"
                    step="1"
                    value={monthlyRent}
                    onChange={(e) => handlePositiveNumber(e.target.value, setMonthlyRent)}
                    className="w-full bg-[#F5F5F5] border border-[#E0E0E0] rounded px-3 py-2 text-base lg:text-lg text-[#262626] font-bold hover:border-[#EE2529] transition-colors"
                    placeholder="Enter monthly rent"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-6 md:gap-10 lg:gap-20 mb-1 md:mb-2">
                  <label className="text-[#767676] text-base lg:text-lg font-normal whitespace-nowrap w-1/3">
                    Security Deposit (₹) *
                  </label>
                  <input 
                    type="number"
                    min="0"
                    step="1"
                    value={securityDeposit}
                    onChange={(e) => handlePositiveNumber(e.target.value, setSecurityDeposit)}
                    className="w-full bg-[#F5F5F5] border border-[#E0E0E0] rounded px-3 py-2 text-base lg:text-lg text-[#262626] font-bold hover:border-[#EE2529] transition-colors"
                    placeholder="Enter security deposit"
                  />
                </div>
              </div>
            </div>
            {/* Row 2: Days Calculation and Rent Escalation */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
              <div>
                <div className="flex items-center gap-6 md:gap-10 lg:gap-20 mb-1 md:mb-2">
                  <label className="text-[#767676] text-base lg:text-lg font-normal whitespace-nowrap w-1/3">
                    Days Calculation Gregorian
                  </label>
                  <input 
                    type="number"
                    min="1"
                    max="31"
                    step="1"
                    value={daysCalculation}
                    onChange={(e) => validateDaysCalculation(e.target.value, setDaysCalculation)}
                    className="w-full bg-[#F5F5F5] border border-[#E0E0E0] rounded px-3 py-2 text-base lg:text-lg text-[#262626] font-bold hover:border-[#EE2529] transition-colors"
                    placeholder="1-31 days"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-6 md:gap-10 lg:gap-20 mb-1 md:mb-2">
                  <label className="text-[#767676] text-base lg:text-lg font-normal whitespace-nowrap w-1/3">
                    Rent Escalation (% per year)
                  </label>
                  <input 
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    value={rentEscalation}
                    onChange={(e) => handlePercentage(e.target.value, setRentEscalation)}
                    className="w-full bg-[#F5F5F5] border border-[#E0E0E0] rounded px-3 py-2 text-base lg:text-lg text-[#262626] font-bold hover:border-[#EE2529] transition-colors"
                    placeholder="Enter percentage"
                  />
                </div>
              </div>
            </div>
            {/* Row 3: Lease Start Date and Lease Term */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
              <div>
                <div className="flex items-center gap-6 md:gap-10 lg:gap-24 mb-1 md:mb-2">
                  <label className="text-[#767676] text-base lg:text-lg font-normal whitespace-nowrap w-1/3">
                    Lease Start Date *
                  </label>
                  <input 
                    type="date"
                    value={leaseStartDate}
                    onChange={(e) => setLeaseStartDate(e.target.value)}
                    className="w-full bg-[#F5F5F5] border border-[#E0E0E0] rounded px-3 py-2 text-base lg:text-lg text-[#262626] font-bold hover:border-[#EE2529] transition-colors"
                    placeholder="DD/MM/YYYY"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-6 md:gap-10 lg:gap-24 mb-1 md:mb-2">
                  <label className="text-[#767676] text-base lg:text-lg font-normal whitespace-nowrap w-1/3">
                    Lease Term (Yrs) *
                  </label>
                  <input 
                    type="number"
                    min="1"
                    step="1"
                    value={leaseTerm}
                    onChange={(e) => validateLeaseTerm(e.target.value, setLeaseTerm)}
                    className="w-full bg-[#F5F5F5] border border-[#E0E0E0] rounded px-3 py-2 text-base lg:text-lg text-[#262626] font-bold hover:border-[#EE2529] transition-colors"
                    placeholder="Enter years"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Balance Lease Tenure Alert */}
          <div className="mt-3 md:mt-4 bg-[#FFFCF4] border border-[#EE2529] p-2 md:p-3 rounded">
            <p className="text-xs text-[#767676]">
              <span className="font-semibold text-lg md:text-xl">Balance Lease Tenure:</span>
              <span className="text-[#EE2529] font-semibold text-xl md:text-2xl ml-2">
                10 years 9 months 2 days
              </span>
            </p>
            <p className="text-sm text-[#767676] mt-1">
            Typically defined as the period from the expiry of the initial lease term to the end of the lease agreement, or the lease period or expiry date, whichever comes first.
            </p>
          </div>
        </div>

        {/* Recurring Expenses */}
        <div className="shadow-md rounded-md p-3 md:p-4 lg:p-5">
          <h3 className="text-[#EE2529] font-semibold text-base md:text-xl lg:text-2xl mb-3 lg:mb-4">
            Recurring Expenses (Annual)
          </h3>
          <div className="space-y-3 md:space-y-4">
            {/* Row 1: Property Tax and Maintenance per sq ft */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
              <div>
                <div className="flex items-center gap-6 md:gap-10 lg:gap-20 mb-1 md:mb-2">
                  <label className="text-[#767676] text-base lg:text-lg font-normal whitespace-nowrap w-1/3">
                    Property Tax (₹) *
                  </label>
                  <input 
                    type="number"
                    min="0"
                    step="1"
                    value={propertyTax}
                    onChange={(e) => handlePositiveNumber(e.target.value, setPropertyTax)}
                    className="w-full bg-[#F5F5F5] border border-[#E0E0E0] rounded px-3 py-2 text-base lg:text-lg text-[#262626] font-bold hover:border-[#EE2529] transition-colors"
                    placeholder="Enter property tax"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-6 md:gap-10 lg:gap-20 mb-1 md:mb-2">
                  <label className="text-[#767676] text-base lg:text-lg font-normal whitespace-nowrap w-1/3">
                    Maintenance per sq ft (₹)
                  </label>
                  <input 
                    type="number"
                    min="0"
                    step="0.01"
                    value={maintenance}
                    onChange={(e) => handlePositiveNumber(e.target.value, setMaintenance)}
                    className="w-full bg-[#F5F5F5] border border-[#E0E0E0] rounded px-3 py-2 text-base lg:text-lg text-[#262626] font-bold hover:border-[#EE2529] transition-colors"
                    placeholder="Enter maintenance cost"
                  />
                </div>
              </div>
            </div>
            {/* Row 2: Insurance and Maintenance Lump sum */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
              <div>
                <div className="flex items-center gap-6 md:gap-10 lg:gap-24 mb-1 md:mb-2">
                  <label className="text-[#767676] text-base lg:text-lg font-normal whitespace-nowrap w-1/3">
                    Insurance (₹) *
                  </label>
                  <input 
                    type="number"
                    min="0"
                    step="1"
                    value={insurance}
                    onChange={(e) => handlePositiveNumber(e.target.value, setInsurance)}
                    className="w-full bg-[#F5F5F5] border border-[#E0E0E0] rounded px-3 py-2 text-base lg:text-lg text-[#262626] font-bold hover:border-[#EE2529] transition-colors"
                    placeholder="Enter insurance cost"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-6 md:gap-10 lg:gap-20 mb-1 md:mb-2">
                  <label className="text-[#767676] text-base lg:text-lg font-normal whitespace-nowrap w-1/3">
                    Maintenance Lump sum (₹)
                  </label>
                  <input 
                    type="number"
                    min="0"
                    step="1"
                    value={maintenanceLumpsum}
                    onChange={(e) => handlePositiveNumber(e.target.value, setMaintenanceLumpsum)}
                    className="w-full bg-[#F5F5F5] border border-[#E0E0E0] rounded px-3 py-2 text-base lg:text-lg text-[#262626] font-bold hover:border-[#EE2529] transition-colors"
                    placeholder="Enter lump sum amount"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* One-time Costs */}
        <div className="shadow-md rounded-md p-3 md:p-4 lg:p-5">
          <h3 className="text-[#EE2529] font-semibold text-base md:text-xl lg:text-2xl mb-3 lg:mb-4">
            One-time Costs
          </h3>
          <div className="space-y-3 md:space-y-4">
            {/* Row 1: Stamp Duty and Legal Fees */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
              <div>
                <div className="flex items-center gap-6 md:gap-10 lg:gap-20 mb-1 md:mb-2">
                  <label className="text-[#767676] text-base lg:text-lg font-normal whitespace-nowrap w-1/3">
                    Stamp Duty (%) *
                  </label>
                  <input 
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    value={stampDuty}
                    onChange={(e) => handlePercentage(e.target.value, setStampDuty)}
                    className="w-full bg-[#F5F5F5] border border-[#E0E0E0] rounded px-3 py-2 text-base lg:text-lg text-[#262626] font-bold hover:border-[#EE2529] transition-colors"
                    placeholder="Enter percentage"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-6 md:gap-10 lg:gap-28 mb-1 md:mb-2">
                  <label className="text-[#767676] text-base lg:text-lg font-normal whitespace-nowrap w-1/3">
                    Legal Fees (₹) *
                  </label>
                  <input 
                    type="number"
                    min="0"
                    step="1"
                    value={legalFees}
                    onChange={(e) => handlePositiveNumber(e.target.value, setLegalFees)}
                    className="w-full bg-[#F5F5F5] border border-[#E0E0E0] rounded px-3 py-2 text-base lg:text-lg text-[#262626] font-bold hover:border-[#EE2529] transition-colors"
                    placeholder="Enter legal fees"
                  />
                </div>
              </div>
            </div>
            {/* Row 2: Brokerage and Other Costs */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
              <div>
                <div className="flex items-center gap-6 md:gap-10 lg:gap-24 mb-1 md:mb-2">
                  <label className="text-[#767676] text-base lg:text-lg font-normal whitespace-nowrap w-1/3">
                    Brokerage (₹) *
                  </label>
                  <input 
                    type="number"
                    min="0"
                    step="1"
                    value={brokerage}
                    onChange={(e) => handlePositiveNumber(e.target.value, setBrokerage)}
                    className="w-full bg-[#F5F5F5] border border-[#E0E0E0] rounded px-3 py-2 text-base lg:text-lg text-[#262626] font-bold hover:border-[#EE2529] transition-colors"
                    placeholder="Enter brokerage"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-6 md:gap-10 lg:gap-20 mb-1 md:mb-2">
                  <label className="text-[#767676] text-base lg:text-lg font-normal whitespace-nowrap w-1/3">
                    Other One-time Costs (₹) *
                  </label>
                  <input 
                    type="number"
                    min="0"
                    step="1"
                    value={otherCosts}
                    onChange={(e) => handlePositiveNumber(e.target.value, setOtherCosts)}
                    className="w-full bg-[#F5F5F5] border border-[#E0E0E0] rounded px-3 py-2 text-base lg:text-lg text-[#262626] font-bold hover:border-[#EE2529] transition-colors"
                    placeholder="Enter other costs"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Calculate and Reset Buttons */}
        <div className="mt-6 md:mt-8 lg:mt-14 flex flex-col sm:flex-row gap-4 mx-auto justify-center">
          <button className="bg-gradient-to-r from-[#EE2529] to-[#C73834] text-white px-6 md:px-8 py-2 rounded font-semibold text-base md:text-lg hover:opacity-90 transition-opacity mx-auto">
            Calculate ROI & Rental Yield
          </button>
        </div>
      </div>
    </div>
  );
};

export default CalculatorForm;