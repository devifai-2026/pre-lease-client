import React, { useState } from "react";
import { FaCalculator } from "react-icons/fa6";
import RentalCards from "./RentalCards";
import SummaryCards from "./SummaryCards";
import FinancialDetails from "./FinancialDetails";
import PerformanceAnalytics from "./PerformanceAnalytics";
import CashflowProjections from "./CashflowProjections";
import RentalDetailsCashflow from "./RentalDetailsCashflow";

const RentalYield = () => {
  const [formData, setFormData] = useState({
    propertyType: "Residential Space",
    carpetArea: "",
    purchasePrice: "",
    loanAmount: "",
    interestRate: "",
    loanTenure: "",
    downPayment: "",
    monthlyRent: "",
    securityDeposit: "",
    rentEscalationEvery: "",
    rentEscalationPercent: "",
    leaseStartDate: "",
    leaseTerm: "",
    propertyTax: "",
    insurance: "",
    maintenancePerSqft: "",
    maintenanceLumpSum: "",
    stampDuty: "",
    brokerage: "",
    legalFees: "",
    otherCosts: "",
  });

  const [includeLoan, setIncludeLoan] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleReset = () => {
    setFormData({
      propertyType: "Residential Space",
      carpetArea: "",
      purchasePrice: "",
      loanAmount: "",
      interestRate: "",
      loanTenure: "",
      downPayment: "",
      monthlyRent: "",
      securityDeposit: "",
      rentEscalationEvery: "",
      rentEscalationPercent: "",
      leaseStartDate: "",
      leaseTerm: "",
      propertyTax: "",
      insurance: "",
      maintenancePerSqft: "",
      maintenanceLumpSum: "",
      stampDuty: "",
      brokerage: "",
      legalFees: "",
      otherCosts: "",
    });
  };

  return (
    <div className="font-montserrat bg-white p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="text-center mb-6 lg:mb-8">
        <FaCalculator className="bg-[#EE2529] rounded-lg p-2 w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 text-white mx-auto mb-3 lg:mb-4" />
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#262626] mb-1 lg:mb-2">
          Property Investment ROI Calculator
        </h1>
        <p className="text-[#767676] text-xs md:text-sm hidden md:block">
          Estimate your investment returns based on property value, rents,{" "}
          <br /> and other key factors
        </p>
        <p className="text-[#767676] text-xs md:text-sm block md:hidden">
          Estimate your investment returns based on property value, rents, and other key factors
        </p>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mb-6 lg:mb-8 max-w-[80%] mx-auto hidden lg:grid">
        <div className="border-b-2 border-[#EE2529] p-2 md:p-3 text-center shadow-md rounded-md">
          <p className="text-[#767676] text-xs font-semibold">
            Get clarity on your <br /> monthly or annual yield.
          </p>
        </div>
        <div className="border-b-2 border-[#EE2529] p-2 md:p-3 text-center shadow-md rounded-md">
          <p className="text-[#767676] text-xs font-semibold">
            Compare ROI across different <br /> properties or investments.
          </p>
        </div>
        <div className="border-b-2 border-[#EE2529] p-2 md:p-3 text-center shadow-md rounded-md">
          <p className="text-[#767676] text-xs font-semibold">
            Adjust variables like rent, <br /> purchase price, and taxes to see <br /> impact in real time
          </p>
        </div>
      </div>

      {/* Form Content */}
<div className="space-y-4 md:space-y-6">
  {/* Property Details */}
  <div className="shadow-md rounded-md p-3 md:p-4 lg:p-5">
    <h3 className="text-[#EE2529] font-bold text-sm md:text-base mb-3 lg:mb-4">
      Property Details
    </h3>
    <div className="space-y-3 md:space-y-4">
      {/* Row 1: Property Type and Carpet Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
        <div>
          <div className="flex items-center gap-2 sm:gap-4 mb-1 md:mb-2">
            <label className="text-[#767676] text-xs font-semibold w-1/3">
              Property Type *
            </label>
            <select
              name="propertyType"
              value={formData.propertyType}
              onChange={handleInputChange}
              className="w-2/3 bg-[#F5F5F5] border border-[#E0E0E0] rounded px-3 py-2 text-xs text-[#262626] font-bold"
            >
              <option>Residential Space</option>
              <option>Commercial Space</option>
              <option>Mixed Use</option>
            </select>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2 sm:gap-4 mb-1 md:mb-2">
            <label className="text-[#767676] text-xs font-semibold w-1/3">
              Carpet Area (sq ft) *
            </label>
            <input
              type="number"
              name="carpetArea"
              value={formData.carpetArea}
              onChange={handleInputChange}
              placeholder="5000"
              className="w-2/3 bg-[#F5F5F5] border border-[#E0E0E0] rounded px-3 py-2 text-xs text-[#262626] font-bold"
            />
          </div>
        </div>
      </div>
      {/* Row 2: Purchase Price - takes half width */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
        <div>
          <div className="flex items-center gap-2 sm:gap-4 mb-1 md:mb-2">
            <label className="text-[#767676] text-xs font-semibold w-1/3">
              Purchase Price (₹) *
            </label>
            <input
              type="number"
              name="purchasePrice"
              value={formData.purchasePrice}
              onChange={handleInputChange}
              placeholder="4500000"
              className="w-2/3 bg-[#F5F5F5] border border-[#E0E0E0] rounded px-3 py-2 text-xs text-[#262626] font-bold"
            />
          </div>
        </div>
        <div className="hidden lg:block"></div>
      </div>
    </div>
  </div>

  {/* Financing Options */}
  <div className="shadow-md rounded-md p-3 md:p-4 lg:p-5">
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 lg:mb-4 gap-2 sm:gap-0">
      <h3 className="text-[#EE2529] font-bold text-sm md:text-base">
        Financing Options
      </h3>
      <div className="flex items-center gap-3">
        <span className={`text-xs font-semibold ${includeLoan ? 'text-[#262626]' : 'text-[#767676]'}`}>
          Include loan financing
        </span>
        <button
          type="button"
          className={`relative inline-flex h-6 w-10 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#EE2529] focus:ring-offset-2 ${
            includeLoan ? 'bg-[#EE2529]' : 'bg-gray-300'
          }`}
          onClick={() => setIncludeLoan(!includeLoan)}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              includeLoan ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>
    </div>
    <div className="text-[#767676] text-xs font-semibold mb-2 md:mb-3">
      Note: Loan amount should be less than or equal to property value
    </div>
    <div className="space-y-3 md:space-y-4">
      {/* Row 1: Loan Amount and Down Payment */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
        <div>
          <div className="flex items-center gap-2 sm:gap-4 mb-1 md:mb-2">
            <label className="text-[#767676] text-xs font-semibold w-1/3">
              Loan Amount (₹) *
            </label>
            <input
              type="number"
              name="loanAmount"
              value={formData.loanAmount}
              onChange={handleInputChange}
              placeholder="3150000"
              className="w-2/3 bg-[#F5F5F5] border border-[#E0E0E0] rounded px-3 py-2 text-xs text-[#262626] font-bold"
            />
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2 sm:gap-4 mb-1 md:mb-2">
            <label className="text-[#767676] text-xs font-semibold w-1/3">
              Down Payment (₹) *
            </label>
            <input
              type="number"
              name="downPayment"
              value={formData.downPayment}
              onChange={handleInputChange}
              placeholder="1350000"
              className="w-2/3 bg-[#F5F5F5] border border-[#E0E0E0] rounded px-3 py-2 text-xs text-[#262626] font-bold"
            />
          </div>
        </div>
      </div>
      {/* Row 2: Interest Rate and Loan Tenure */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
        <div>
          <div className="flex items-center gap-2 sm:gap-4 mb-1 md:mb-2">
            <label className="text-[#767676] text-xs font-semibold w-1/3">
              Interest (% per annum) *
            </label>
            <input
              type="number"
              name="interestRate"
              value={formData.interestRate}
              onChange={handleInputChange}
              placeholder="8.5"
              step="0.1"
              className="w-2/3 bg-[#F5F5F5] border border-[#E0E0E0] rounded px-3 py-2 text-xs text-[#262626] font-bold"
            />
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2 sm:gap-4 mb-1 md:mb-2">
            <label className="text-[#767676] text-xs font-semibold w-1/3">
              Loan Tenure (Years) *
            </label>
            <input
              type="number"
              name="loanTenure"
              value={formData.loanTenure}
              onChange={handleInputChange}
              placeholder="20"
              className="w-2/3 bg-[#F5F5F5] border border-[#E0E0E0] rounded px-3 py-2 text-xs text-[#262626] font-bold"
            />
          </div>
        </div>
      </div>
    </div>
  </div>

  {/* Rental Details */}
  <div className="shadow-md rounded-md p-3 md:p-4 lg:p-5">
    <h3 className="text-[#EE2529] font-bold text-sm md:text-base mb-3 lg:mb-4">
      Rental Details
    </h3>
    <div className="space-y-3 md:space-y-4">
      {/* Row 1: Monthly Rent and Security Deposit */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
        <div>
          <div className="flex items-center gap-2 sm:gap-4 mb-1 md:mb-2">
            <label className="text-[#767676] text-xs font-semibold w-1/3">
              Monthly Rent (₹) *
            </label>
            <input
              type="number"
              name="monthlyRent"
              value={formData.monthlyRent}
              onChange={handleInputChange}
              placeholder="50000"
              className="w-2/3 bg-[#F5F5F5] border border-[#E0E0E0] rounded px-3 py-2 text-xs text-[#262626] font-bold"
            />
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2 sm:gap-4 mb-1 md:mb-2">
            <label className="text-[#767676] text-xs font-semibold w-1/3">
              Security Deposit (₹) *
            </label>
            <input
              type="number"
              name="securityDeposit"
              value={formData.securityDeposit}
              onChange={handleInputChange}
              placeholder="300000"
              className="w-2/3 bg-[#F5F5F5] border border-[#E0E0E0] rounded px-3 py-2 text-xs text-[#262626] font-bold"
            />
          </div>
        </div>
      </div>
      {/* Row 2: Rent Escalation every(yrs) and Rent Escalation(% per year) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
        <div>
          <div className="flex items-center gap-2 sm:gap-4 mb-1 md:mb-2">
            <label className="text-[#767676] text-xs font-semibold w-1/3">
              Rent Escalation every(yrs)
            </label>
            <input
              type="number"
              name="rentEscalationEvery"
              value={formData.rentEscalationEvery}
              onChange={handleInputChange}
              placeholder="3"
              className="w-2/3 bg-[#F5F5F5] border border-[#E0E0E0] rounded px-3 py-2 text-xs text-[#262626] font-bold"
            />
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2 sm:gap-4 mb-1 md:mb-2">
            <label className="text-[#767676] text-xs font-semibold w-1/3">
              Rent Escalation(% per year)
            </label>
            <input
              type="number"
              name="rentEscalationPercent"
              value={formData.rentEscalationPercent}
              onChange={handleInputChange}
              placeholder="8"
              className="w-2/3 bg-[#F5F5F5] border border-[#E0E0E0] rounded px-3 py-2 text-xs text-[#262626] font-bold"
            />
          </div>
        </div>
      </div>
      {/* Row 3: Lease Start Date and Lease Term */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
        <div>
          <div className="flex items-center gap-2 sm:gap-4 mb-1 md:mb-2">
            <label className="text-[#767676] text-xs font-semibold w-1/3">
              Lease Start Date *
            </label>
            <input
              type="date"
              name="leaseStartDate"
              value={formData.leaseStartDate}
              onChange={handleInputChange}
              className="w-2/3 bg-[#F5F5F5] border border-[#E0E0E0] rounded px-3 py-2 text-xs text-[#262626] font-bold"
            />
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2 sm:gap-4 mb-1 md:mb-2">
            <label className="text-[#767676] text-xs font-semibold w-1/3">
              Lease Term (Months) *
            </label>
            <input
              type="number"
              name="leaseTerm"
              value={formData.leaseTerm}
              onChange={handleInputChange}
              placeholder="10"
              className="w-2/3 bg-[#F5F5F5] border border-[#E0E0E0] rounded px-3 py-2 text-xs text-[#262626] font-bold"
            />
          </div>
        </div>
      </div>
    </div>

    {/* Balance Lease Tenure Alert */}
    <div className="mt-3 md:mt-4 bg-[#FFFCF4] border border-[#EE2529] p-2 md:p-3 rounded">
      <p className="text-xs text-[#767676]">
        <span className="font-semibold">Balance Lease Tenure:</span>
        <span className="text-[#EE2529] font-semibold ml-2">
          10 years 9 months 2 days
        </span>
      </p>
      <p className="text-xs text-[#767676] mt-1">
        Typically, lenders are open to have 60% of the total lease term in
        the lease period. In the event when the lease period is less than
        30 years (or maybe less), you'll have to contact the bank for more
        information.
      </p>
    </div>
  </div>

  {/* Recurring Expenses */}
  <div className="shadow-md rounded-md p-3 md:p-4 lg:p-5">
    <h3 className="text-[#EE2529] font-bold text-sm md:text-base mb-3 lg:mb-4">
      Recurring Expenses (Annual)
    </h3>
    <div className="space-y-3 md:space-y-4">
      {/* Row 1: Property Tax and Maintenance per sq.ft */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
        <div>
          <div className="flex items-center gap-2 sm:gap-4 mb-1 md:mb-2">
            <label className="text-[#767676] text-xs font-semibold w-1/3">
              Property Tax (₹) *
            </label>
            <input
              type="number"
              name="propertyTax"
              value={formData.propertyTax}
              onChange={handleInputChange}
              placeholder="15000"
              className="w-2/3 bg-[#F5F5F5] border border-[#E0E0E0] rounded px-3 py-2 text-xs text-[#262626] font-bold"
            />
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2 sm:gap-4 mb-1 md:mb-2">
            <label className="text-[#767676] text-xs font-semibold w-1/3">
              Maintenance per sq.ft(₹)
            </label>
            <input
              type="number"
              name="maintenancePerSqft"
              value={formData.maintenancePerSqft}
              onChange={handleInputChange}
              placeholder="30000"
              className="w-2/3 bg-[#F5F5F5] border border-[#E0E0E0] rounded px-3 py-2 text-xs text-[#262626] font-bold"
            />
          </div>
        </div>
      </div>
      {/* Row 2: Insurance and Maintenance Lump sum */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
        <div>
          <div className="flex items-center gap-2 sm:gap-4 mb-1 md:mb-2">
            <label className="text-[#767676] text-xs font-semibold w-1/3">
              Insurance (₹) *
            </label>
            <input
              type="number"
              name="insurance"
              value={formData.insurance}
              onChange={handleInputChange}
              placeholder="8000"
              className="w-2/3 bg-[#F5F5F5] border border-[#E0E0E0] rounded px-3 py-2 text-xs text-[#262626] font-bold"
            />
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2 sm:gap-4 mb-1 md:mb-2">
            <label className="text-[#767676] text-xs font-semibold w-1/3">
              Maintenance Lump sum(₹)
            </label>
            <input
              type="number"
              name="maintenanceLumpSum"
              value={formData.maintenanceLumpSum}
              onChange={handleInputChange}
              placeholder="15000"
              className="w-2/3 bg-[#F5F5F5] border border-[#E0E0E0] rounded px-3 py-2 text-xs text-[#262626] font-bold"
            />
          </div>
        </div>
      </div>
    </div>
  </div>

  {/* One-time Costs */}
  <div className="shadow-md rounded-md p-3 md:p-4 lg:p-5">
    <h3 className="text-[#EE2529] font-bold text-sm md:text-base mb-3 lg:mb-4">
      One-time Costs
    </h3>
    <div className="space-y-3 md:space-y-4">
      {/* Row 1: Stamp Duty and Legal Fees */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
        <div>
          <div className="flex items-center gap-2 sm:gap-4 mb-1 md:mb-2">
            <label className="text-[#767676] text-xs font-semibold w-1/3">
              Stamp Duty (%) *
            </label>
            <input
              type="number"
              name="stampDuty"
              value={formData.stampDuty}
              onChange={handleInputChange}
              placeholder="12"
              className="w-2/3 bg-[#F5F5F5] border border-[#E0E0E0] rounded px-3 py-2 text-xs text-[#262626] font-bold"
            />
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2 sm:gap-4 mb-1 md:mb-2">
            <label className="text-[#767676] text-xs font-semibold w-1/3">
              Legal Fees (₹) *
            </label>
            <input
              type="number"
              name="legalFees"
              value={formData.legalFees}
              onChange={handleInputChange}
              placeholder="30000"
              className="w-2/3 bg-[#F5F5F5] border border-[#E0E0E0] rounded px-3 py-2 text-xs text-[#262626] font-bold"
            />
          </div>
        </div>
      </div>
      {/* Row 2: Brokerage and Other Costs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
        <div>
          <div className="flex items-center gap-2 sm:gap-4 mb-1 md:mb-2">
            <label className="text-[#767676] text-xs font-semibold w-1/3">
              Brokerage (₹) *
            </label>
            <input
              type="number"
              name="brokerage"
              value={formData.brokerage}
              onChange={handleInputChange}
              placeholder="67500"
              className="w-2/3 bg-[#F5F5F5] border border-[#E0E0E0] rounded px-3 py-2 text-xs text-[#262626] font-bold"
            />
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2 sm:gap-4 mb-1 md:mb-2">
            <label className="text-[#767676] text-xs font-semibold w-1/3">
              Other One-time Costs (₹) *
            </label>
            <input
              type="number"
              name="otherCosts"
              value={formData.otherCosts}
              onChange={handleInputChange}
              placeholder="25000"
              className="w-2/3 bg-[#F5F5F5] border border-[#E0E0E0] rounded px-3 py-2 text-xs text-[#262626] font-bold"
            />
          </div>
        </div>
      </div>
    </div>
  </div>

  {/* Calculate and Reset Buttons */}
  <div className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-4 mx-auto justify-center">
    <button className="bg-gradient-to-r from-[#EE2529] to-[#C73834] text-white px-6 md:px-8 py-2 rounded font-bold text-xs md:text-sm hover:opacity-90 transition-opacity">
      Calculate ROI & Rental Yield
    </button>
    
  </div>
</div>
      <RentalCards></RentalCards>
      <SummaryCards></SummaryCards>
      <FinancialDetails></FinancialDetails>
      <PerformanceAnalytics></PerformanceAnalytics>
      <CashflowProjections></CashflowProjections>
      <RentalDetailsCashflow></RentalDetailsCashflow>
    </div>
  );
};

export default RentalYield;