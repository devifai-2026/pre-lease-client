// FinancialDetails.js
import { useState, useEffect, useRef } from "react";

const FinancialDetails = ({ onNext, onFormValid }) => {
  const [formData, setFormData] = useState({
    acquisitionPrice: "",
    propertyTax: "",
    camCharges: "",
    insurance: "",
    otherCosts: "",
    additionalIncome: "",
  });

  const [metrics, setMetrics] = useState({
    annualGrossRent: 0,
    grossRentalYield: 0,
    annualOperatingCosts: 0,
    netRentalYield: 0,
    netOperatingIncome: 0,
    paybackPeriod: 0,
    recurringCostsPerSqFt: 0,
    recurringCostsAsPercentageOfRent: 0,
  });

  const [errors, setErrors] = useState({});
  const formRef = useRef(null);

  // Get carpet area and total monthly rent from previous steps (you might need to pass these as props)
  const carpetArea = 5000; // This should come from BasicDetails
  const totalMonthlyRent = 150000; // This should come from LeaseDetails

  // Calculate metrics and validate whenever formData changes
  useEffect(() => {
    calculateMetrics();
    validateFormForButton();
  }, [formData]);

  const calculateMetrics = () => {
    const acquisitionPrice = parseFloat(formData.acquisitionPrice) || 0;
    const propertyTax = parseFloat(formData.propertyTax) || 0;
    const camCharges = parseFloat(formData.camCharges) || 0;
    const insurance = parseFloat(formData.insurance) || 0;
    const otherCosts = parseFloat(formData.otherCosts) || 0;
    const additionalIncome = parseFloat(formData.additionalIncome) || 0;

    // Annual calculations
    const annualGrossRent = totalMonthlyRent * 12;
    const totalOperatingCosts = propertyTax + camCharges + insurance + otherCosts;
    const annualOperatingCosts = totalOperatingCosts;
    const netOperatingIncome = annualGrossRent - annualOperatingCosts + additionalIncome;

    // Yields
    const grossRentalYield = acquisitionPrice > 0 ? ((annualGrossRent / acquisitionPrice) * 100).toFixed(2) : 0;
    const netRentalYield = acquisitionPrice > 0 ? ((netOperatingIncome / acquisitionPrice) * 100).toFixed(2) : 0;

    // Payback period
    const paybackPeriod = netOperatingIncome > 0 ? (acquisitionPrice / netOperatingIncome).toFixed(2) : 0;

    // Per sq ft calculations
    const recurringCostsPerSqFt = carpetArea > 0 ? (annualOperatingCosts / carpetArea).toFixed(2) : 0;
    const recurringCostsAsPercentageOfRent = annualGrossRent > 0 ? ((annualOperatingCosts / annualGrossRent) * 100).toFixed(2) : 0;

    setMetrics({
      annualGrossRent: annualGrossRent.toLocaleString('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0, maximumFractionDigits: 0 }),
      grossRentalYield: `${grossRentalYield}%`,
      annualOperatingCosts: annualOperatingCosts.toLocaleString('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0, maximumFractionDigits: 0 }),
      netRentalYield: `${netRentalYield}%`,
      netOperatingIncome: netOperatingIncome.toLocaleString('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0, maximumFractionDigits: 0 }),
      paybackPeriod: `${paybackPeriod} years`,
      recurringCostsPerSqFt: recurringCostsPerSqFt,
      recurringCostsAsPercentageOfRent: `${recurringCostsAsPercentageOfRent}%`,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Validation for form submission
  const validateForm = () => {
    const newErrors = {};

    if (!formData.acquisitionPrice) newErrors.acquisitionPrice = "Acquisition Price is required";
    if (formData.propertyTax === "") newErrors.propertyTax = "Property Tax is required";
    if (formData.camCharges === "") newErrors.camCharges = "CAM Charges is required";
    if (formData.insurance === "") newErrors.insurance = "Insurance is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validation for Next button enable/disable
  const validateFormForButton = () => {
    const isValid = 
      formData.acquisitionPrice !== "" &&
      formData.propertyTax !== "" &&
      formData.camCharges !== "" &&
      formData.insurance !== "";

    onFormValid(isValid);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      onNext(formData);
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 font-montserrat">
      {/* Header */}
      <div>
        <h3 className="text-lg sm:text-xl font-bold text-[#EE2529] mb-2 text-center">
          Financial Analytics
        </h3>
      </div>

      {/* Acquisition Details Section */}
      <div>
        <h4 className="text-sm font-bold text-[#EE2529] mb-4">Acquisition Details</h4>
        <div className="grid grid-cols-1 gap-4">
          {/* Acquisition Price */}
          <div>
            <label className="block text-xs font-semibold mb-2">
              Acquisition Price <span className="text-[#EE2529]">*</span>
            </label>
            <input
              type="number"
              name="acquisitionPrice"
              value={formData.acquisitionPrice}
              onChange={handleInputChange}
              placeholder="Enter Property Price"
              className={`w-full px-3 py-2 border rounded-md text-sm bg-gray-100 focus:outline-none focus:bg-white transition ${
                errors.acquisitionPrice ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.acquisitionPrice && (
              <p className="text-xs text-red-500 mt-1">{errors.acquisitionPrice}</p>
            )}
          </div>
        </div>
      </div>

      {/* Annual Operating Costs Section */}
      <div>
        <h4 className="text-sm font-bold text-[#EE2529] mb-4">Annual Operating Costs</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Property Tax */}
          <div>
            <label className="block text-xs font-semibold mb-2">
              Property Tax (Annual) <span className="text-[#EE2529]">*</span>
            </label>
            <input
              type="number"
              name="propertyTax"
              value={formData.propertyTax}
              onChange={handleInputChange}
              placeholder="0"
              min="0"
              className={`w-full px-3 py-2 border rounded-md text-sm bg-gray-100 focus:outline-none focus:bg-white transition ${
                errors.propertyTax ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.propertyTax && (
              <p className="text-xs text-red-500 mt-1">{errors.propertyTax}</p>
            )}
          </div>

          {/* CAM Charges */}
          <div>
            <label className="block text-xs font-semibold mb-2">
              CAM Charges (Annual) <span className="text-[#EE2529]">*</span>
            </label>
            <input
              type="number"
              name="camCharges"
              value={formData.camCharges}
              onChange={handleInputChange}
              placeholder="0"
              min="0"
              className={`w-full px-3 py-2 border rounded-md text-sm bg-gray-100 focus:outline-none focus:bg-white transition ${
                errors.camCharges ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.camCharges && (
              <p className="text-xs text-red-500 mt-1">{errors.camCharges}</p>
            )}
          </div>

          {/* Insurance */}
          <div>
            <label className="block text-xs font-semibold mb-2">
              Insurance (Annual) <span className="text-[#EE2529]">*</span>
            </label>
            <input
              type="number"
              name="insurance"
              value={formData.insurance}
              onChange={handleInputChange}
              placeholder="0"
              min="0"
              className={`w-full px-3 py-2 border rounded-md text-sm bg-gray-100 focus:outline-none focus:bg-white transition ${
                errors.insurance ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.insurance && (
              <p className="text-xs text-red-500 mt-1">{errors.insurance}</p>
            )}
          </div>

          {/* Other Costs */}
          <div>
            <label className="block text-xs font-semibold mb-2">Other Costs (Annual)</label>
            <input
              type="number"
              name="otherCosts"
              value={formData.otherCosts}
              onChange={handleInputChange}
              placeholder="0"
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-gray-100 focus:outline-none focus:bg-white transition"
            />
          </div>
        </div>

        {/* Total Operating Annual Costs */}
        <div className="bg-gray-200 rounded-md p-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold text-gray-700">Total Operating Annual Costs</span>
            <span className="text-sm font-bold text-gray-900">
              ₹{(
                (parseFloat(formData.propertyTax) || 0) +
                (parseFloat(formData.camCharges) || 0) +
                (parseFloat(formData.insurance) || 0) +
                (parseFloat(formData.otherCosts) || 0)
              ).toLocaleString('en-IN')}
            </span>
          </div>
        </div>
      </div>

      {/* Additional Income Details Section */}
      <div>
        <h4 className="text-sm font-bold text-[#EE2529] mb-4">Additional Income Details</h4>
        <div className="grid grid-cols-1 gap-4">
          {/* Additional Income */}
          <div>
            <label className="block text-xs font-semibold mb-2">Additional Income (Annual)</label>
            <input
              type="number"
              name="additionalIncome"
              value={formData.additionalIncome}
              onChange={handleInputChange}
              placeholder="Enter Additional Income"
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-gray-100 focus:outline-none focus:bg-white transition"
            />
          </div>
        </div>
      </div>

      {/* Calculated Metrics Section */}
      <div>
        <h4 className="text-sm font-bold text-[#EE2529] mb-4">Calculated Metrics</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Annual Gross Rent */}
          <div className="bg-white border border-gray-300 rounded-md p-3 flex items-center justify-between h-12">
            <div className="text-xs text-gray-600">Annual Gross Rent:</div>
            <div className="text-sm font-semibold text-gray-600">{metrics.annualGrossRent}</div>
          </div>

          {/* Gross Rental Yield */}
          <div className="bg-white border border-gray-300 rounded-md p-3 flex items-center justify-between h-12">
            <div className="text-xs text-gray-600">Gross Rental Yield:</div>
            <div className="text-sm font-semibold text-gray-600">{metrics.grossRentalYield}</div>
          </div>

          {/* Annual Operating Costs */}
          <div className="bg-white border border-gray-300 rounded-md p-3 flex items-center justify-between h-12">
            <div className="text-xs text-gray-600">Annual Operating Costs:</div>
            <div className="text-sm font-semibold text-gray-600">{metrics.annualOperatingCosts}</div>
          </div>

          {/* Net Rental Yield */}
          <div className="bg-white border border-gray-300 rounded-md p-3 flex items-center justify-between h-12">
            <div className="text-xs text-gray-600">Net Rental Yield:</div>
            <div className="text-sm font-semibold text-gray-600">{metrics.netRentalYield}</div>
          </div>

          {/* Net Operating Income */}
          <div className="bg-white border border-gray-300 rounded-md p-3 flex items-center justify-between h-12">
            <div className="text-xs text-gray-600">Net Operating Income (NOI):</div>
            <div className="text-sm font-semibold text-gray-600">{metrics.netOperatingIncome}</div>
          </div>

          {/* Payback Period */}
          <div className="bg-white border border-gray-300 rounded-md p-3 flex items-center justify-between h-12">
            <div className="text-xs text-gray-600">Payback Period:</div>
            <div className="text-sm font-semibold text-gray-600">{metrics.paybackPeriod}</div>
          </div>

          {/* Recurring Costs per sq ft */}
          <div className="bg-white border border-gray-300 rounded-md p-3 flex items-center justify-between h-12">
            <div className="text-xs text-gray-600">Recurring Costs per sq ft:</div>
            <div className="text-sm font-semibold text-gray-600">₹{metrics.recurringCostsPerSqFt}</div>
          </div>

          {/* Recurring Costs as % of Rent */}
          <div className="bg-white border border-gray-300 rounded-md p-3 flex items-center justify-between h-12">
            <div className="text-xs text-gray-600">Recurring Costs as % of Rent:</div>
            <div className="text-sm font-semibold text-gray-600">{metrics.recurringCostsAsPercentageOfRent}</div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default FinancialDetails;