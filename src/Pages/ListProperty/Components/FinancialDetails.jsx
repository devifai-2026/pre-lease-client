// FinancialDetails.js
import { useState, useEffect, useRef } from "react";
import { FaAngleDown } from "react-icons/fa";

const FinancialDetails = ({ onNext, onFormValid, basicDetails, leaseDetails }) => {
  const [formData, setFormData] = useState({
    sellingPrice: "",
    propertyTax: "",
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

  const [showSellingPriceInfo, setShowSellingPriceInfo] = useState(false);
  const [showPropertyTaxInfo, setShowPropertyTaxInfo] = useState(false);
  const [showInsuranceInfo, setShowInsuranceInfo] = useState(false);
  const [showAdditionalIncomeInfo, setShowAdditionalIncomeInfo] = useState(false);

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const formRef = useRef(null);

  // Get carpet area and total monthly rent from props
  const carpetArea = basicDetails?.carpetArea || 0;
  const totalMonthlyRent = leaseDetails?.totalMonthlyRent || 
    (leaseDetails?.rentType === "perSqFt" && carpetArea > 0 ? 
      (leaseDetails.rentPerSqFt * carpetArea) : 
      (leaseDetails?.totalMonthlyRent || 0));

  // Calculate metrics and validate whenever formData changes
  useEffect(() => {
    calculateMetrics();
    validateFormForButton();
  }, [formData, carpetArea, totalMonthlyRent]);

  // Handle field blur for validation
  const handleBlur = (fieldName) => {
    setTouched(prev => ({ ...prev, [fieldName]: true }));
    validateField(fieldName);
  };

  // Validate individual field
  const validateField = (fieldName) => {
    let error = "";
    
    switch(fieldName) {
      case 'sellingPrice':
        if (!formData.sellingPrice.trim()) {
          error = "Selling Price is required";
        } else if (parseFloat(formData.sellingPrice) <= 0) {
          error = "Selling Price must be greater than 0";
        } else if (parseFloat(formData.sellingPrice) < 0) {
          error = "Selling Price cannot be negative";
        }
        break;
        
      case 'propertyTax':
        if (formData.propertyTax === "") {
          error = "Property Tax is required";
        } else if (parseFloat(formData.propertyTax) < 0) {
          error = "Property Tax cannot be negative";
        }
        break;
        
      case 'insurance':
        if (formData.insurance === "") {
          error = "Insurance is required";
        } else if (parseFloat(formData.insurance) < 0) {
          error = "Insurance cannot be negative";
        }
        break;
        
      case 'otherCosts':
        if (formData.otherCosts !== "" && parseFloat(formData.otherCosts) < 0) {
          error = "Other Costs cannot be negative";
        }
        break;
        
      case 'additionalIncome':
        if (formData.additionalIncome !== "" && parseFloat(formData.additionalIncome) < 0) {
          error = "Additional Income cannot be negative";
        }
        break;
    }
    
    setErrors(prev => ({
      ...prev,
      [fieldName]: error
    }));
    
    return !error;
  };

  const calculateMetrics = () => {
    const sellingPrice = parseFloat(formData.sellingPrice) || 0;
    const propertyTax = parseFloat(formData.propertyTax) || 0;
    const insurance = parseFloat(formData.insurance) || 0;
    const otherCosts = parseFloat(formData.otherCosts) || 0;
    const additionalIncome = parseFloat(formData.additionalIncome) || 0;

    // Annual calculations
    const annualGrossRent = totalMonthlyRent * 12;
    const totalOperatingCosts = propertyTax + insurance + otherCosts;
    const annualOperatingCosts = totalOperatingCosts;
    const netOperatingIncome = annualGrossRent - annualOperatingCosts + additionalIncome;

    // Yields
    const grossRentalYield = sellingPrice > 0 ? ((annualGrossRent / sellingPrice) * 100).toFixed(2) : 0;
    const netRentalYield = sellingPrice > 0 ? ((netOperatingIncome / sellingPrice) * 100).toFixed(2) : 0;

    // Payback period
    const paybackPeriod = netOperatingIncome > 0 ? (sellingPrice / netOperatingIncome).toFixed(2) : 0;

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
    const { name, value, type } = e.target;
    
    // Prevent negative numbers for numeric inputs
    if (type === 'number' && value !== '' && parseFloat(value) < 0) {
      return; // Don't update if negative
    }
    
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  // Main validation for form submission
  const validateForm = () => {
    const newErrors = {};

    // Selling Price validation
    if (!formData.sellingPrice.trim()) {
      newErrors.sellingPrice = "Selling Price is required";
    } else if (parseFloat(formData.sellingPrice) <= 0) {
      newErrors.sellingPrice = "Selling Price must be greater than 0";
    } else if (parseFloat(formData.sellingPrice) < 0) {
      newErrors.sellingPrice = "Selling Price cannot be negative";
    }

    // Property Tax validation
    if (formData.propertyTax === "") {
      newErrors.propertyTax = "Property Tax is required";
    } else if (parseFloat(formData.propertyTax) < 0) {
      newErrors.propertyTax = "Property Tax cannot be negative";
    }

    // Insurance validation
    if (formData.insurance === "") {
      newErrors.insurance = "Insurance is required";
    } else if (parseFloat(formData.insurance) < 0) {
      newErrors.insurance = "Insurance cannot be negative";
    }

    // Other Costs validation
    if (formData.otherCosts !== "" && parseFloat(formData.otherCosts) < 0) {
      newErrors.otherCosts = "Other Costs cannot be negative";
    }

    // Additional Income validation
    if (formData.additionalIncome !== "" && parseFloat(formData.additionalIncome) < 0) {
      newErrors.additionalIncome = "Additional Income cannot be negative";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validation for Next button enable/disable
  const validateFormForButton = () => {
    const sellingPrice = parseFloat(formData.sellingPrice) || 0;
    const propertyTax = parseFloat(formData.propertyTax) || 0;
    const insurance = parseFloat(formData.insurance) || 0;
    
    const isValid = 
      formData.sellingPrice.trim() !== "" &&
      formData.propertyTax !== "" &&
      formData.insurance !== "" &&
      sellingPrice > 0 &&
      propertyTax >= 0 &&
      insurance >= 0 &&
      (formData.otherCosts === "" || parseFloat(formData.otherCosts) >= 0) &&
      (formData.additionalIncome === "" || parseFloat(formData.additionalIncome) >= 0);

    onFormValid(isValid);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      onNext(formData);
    } else {
      // Mark all fields as touched to show errors
      setTouched({
        sellingPrice: true,
        propertyTax: true,
        insurance: true,
        otherCosts: true,
        additionalIncome: true,
      });
    }
  };

  // Helper to show error only when field is touched
  const showError = (fieldName) => {
    return touched[fieldName] && errors[fieldName];
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 font-montserrat">
      {/* Header */}
      <div>
        <h3 className="text-lg sm:text-xl font-bold text-[#EE2529] mb-2 text-center">
          Financial Analytics
        </h3>
      </div>

      {/* Property Details Section */}
      <div>
        <h4 className="text-sm font-bold text-[#EE2529] mb-4">Property Details</h4>
        <div className="grid grid-cols-1 gap-4">
          {/* Selling Price */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <label className="block text-xs font-semibold">
                Selling Price <span className="text-[#EE2529]">*</span>
              </label>
              <div className="relative">
                <button
                  type="button"
                  className="w-4 h-4 rounded-full bg-gray-300 flex items-center justify-center text-xs hover:bg-gray-400 transition"
                  onClick={() => setShowSellingPriceInfo(!showSellingPriceInfo)}
                  onMouseEnter={() => setShowSellingPriceInfo(true)}
                  onMouseLeave={() => setShowSellingPriceInfo(false)}
                >
                  i
                </button>
                {showSellingPriceInfo && (
                  <div className="absolute left-0 bottom-full mb-2 w-64 p-3 bg-gray-800 text-white text-xs rounded-md shadow-lg z-10">
                    Enter the total selling price of the property. This is used to calculate rental yields and return metrics.
                  </div>
                )}
              </div>
            </div>
            <input
              type="number"
              name="sellingPrice"
              value={formData.sellingPrice}
              onChange={handleInputChange}
              onBlur={() => handleBlur('sellingPrice')}
              placeholder="Enter Property Selling Price"
              min="0"
              step="0.01"
              className={`w-full px-3 py-2 border rounded-md text-sm bg-gray-100 focus:outline-none focus:bg-white transition ${
                showError('sellingPrice') ? "border-red-500" : "border-gray-300"
              }`}
            />
            {showError('sellingPrice') && (
              <p className="text-xs text-red-500 mt-1">{errors.sellingPrice}</p>
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
            <div className="flex items-center gap-2 mb-2">
              <label className="block text-xs font-semibold">
                Property Tax (Annual) <span className="text-[#EE2529]">*</span>
              </label>
              <div className="relative">
                <button
                  type="button"
                  className="w-4 h-4 rounded-full bg-gray-300 flex items-center justify-center text-xs hover:bg-gray-400 transition"
                  onClick={() => setShowPropertyTaxInfo(!showPropertyTaxInfo)}
                  onMouseEnter={() => setShowPropertyTaxInfo(true)}
                  onMouseLeave={() => setShowPropertyTaxInfo(false)}
                >
                  i
                </button>
                {showPropertyTaxInfo && (
                  <div className="absolute left-0 bottom-full mb-2 w-64 p-3 bg-gray-800 text-white text-xs rounded-md shadow-lg z-10">
                    Annual property tax paid to the municipal corporation or local authority for the property.
                  </div>
                )}
              </div>
            </div>
            <input
              type="number"
              name="propertyTax"
              value={formData.propertyTax}
              onChange={handleInputChange}
              onBlur={() => handleBlur('propertyTax')}
              placeholder="0"
              min="0"
              step="0.01"
              className={`w-full px-3 py-2 border rounded-md text-sm bg-gray-100 focus:outline-none focus:bg-white transition ${
                showError('propertyTax') ? "border-red-500" : "border-gray-300"
              }`}
            />
            {showError('propertyTax') && (
              <p className="text-xs text-red-500 mt-1">{errors.propertyTax}</p>
            )}
          </div>

          {/* Insurance */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <label className="block text-xs font-semibold">
                Insurance (Annual) <span className="text-[#EE2529]">*</span>
              </label>
              <div className="relative">
                <button
                  type="button"
                  className="w-4 h-4 rounded-full bg-gray-300 flex items-center justify-center text-xs hover:bg-gray-400 transition"
                  onClick={() => setShowInsuranceInfo(!showInsuranceInfo)}
                  onMouseEnter={() => setShowInsuranceInfo(true)}
                  onMouseLeave={() => setShowInsuranceInfo(false)}
                >
                  i
                </button>
                {showInsuranceInfo && (
                  <div className="absolute left-0 bottom-full mb-2 w-64 p-3 bg-gray-800 text-white text-xs rounded-md shadow-lg z-10">
                    Annual insurance premium for property insurance covering fire, theft, and other risks.
                  </div>
                )}
              </div>
            </div>
            <input
              type="number"
              name="insurance"
              value={formData.insurance}
              onChange={handleInputChange}
              onBlur={() => handleBlur('insurance')}
              placeholder="0"
              min="0"
              step="0.01"
              className={`w-full px-3 py-2 border rounded-md text-sm bg-gray-100 focus:outline-none focus:bg-white transition ${
                showError('insurance') ? "border-red-500" : "border-gray-300"
              }`}
            />
            {showError('insurance') && (
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
              onBlur={() => handleBlur('otherCosts')}
              placeholder="0"
              min="0"
              step="0.01"
              className={`w-full px-3 py-2 border rounded-md text-sm bg-gray-100 focus:outline-none focus:bg-white transition ${
                showError('otherCosts') ? "border-red-500" : "border-gray-300"
              }`}
            />
            {showError('otherCosts') && (
              <p className="text-xs text-red-500 mt-1">{errors.otherCosts}</p>
            )}
          </div>
        </div>

        {/* Total Operating Annual Costs */}
        <div className="bg-gray-200 rounded-md p-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold text-gray-700">Total Operating Annual Costs</span>
            <span className="text-sm font-bold text-gray-900">
              ₹{(
                (parseFloat(formData.propertyTax) || 0) +
                (parseFloat(formData.insurance) || 0) +
                (parseFloat(formData.otherCosts) || 0)
              ).toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
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
            <div className="flex items-center gap-2 mb-2">
              <label className="block text-xs font-semibold">Additional Income (Annual)</label>
              <div className="relative">
                <button
                  type="button"
                  className="w-4 h-4 rounded-full bg-gray-300 flex items-center justify-center text-xs hover:bg-gray-400 transition"
                  onClick={() => setShowAdditionalIncomeInfo(!showAdditionalIncomeInfo)}
                  onMouseEnter={() => setShowAdditionalIncomeInfo(true)}
                  onMouseLeave={() => setShowAdditionalIncomeInfo(false)}
                >
                  i
                </button>
                {showAdditionalIncomeInfo && (
                  <div className="absolute left-0 bottom-full mb-2 w-64 p-3 bg-gray-800 text-white text-xs rounded-md shadow-lg z-10">
                    Any additional annual income from the property, such as parking fees, advertisement revenue, or other ancillary income.
                  </div>
                )}
              </div>
            </div>
            <input
              type="number"
              name="additionalIncome"
              value={formData.additionalIncome}
              onChange={handleInputChange}
              onBlur={() => handleBlur('additionalIncome')}
              placeholder="Enter Additional Income"
              min="0"
              step="0.01"
              className={`w-full px-3 py-2 border rounded-md text-sm bg-gray-100 focus:outline-none focus:bg-white transition ${
                showError('additionalIncome') ? "border-red-500" : "border-gray-300"
              }`}
            />
            {showError('additionalIncome') && (
              <p className="text-xs text-red-500 mt-1">{errors.additionalIncome}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">Any additional income from parking, advertisements, etc.</p>
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