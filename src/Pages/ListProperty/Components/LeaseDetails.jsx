// LeaseDetails.js
import { useState, useRef, useEffect } from "react";
import { FaAngleDown } from "react-icons/fa";

const LeaseDetails = ({ onNext, onFormValid }) => {
  const [formData, setFormData] = useState({
    tenantType: "",
    leaseStartDate: "",
    leaseExpiryDate: "",
    lockInYears: "",
    lockInMonths: "",
    leaseDuration: "",
    rentType: "perSqFt",
    rentPerSqFt: "",
    totalMonthlyRent: "",
    securityDepositType: "months",
    securityDepositMonths: "",
    securityDepositAmount: "",
    escalationPercentage: "",
    escalationFrequency: "",
    maintenanceScope: "",
    maintenanceType: "",
    maintenanceAmount: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const formRef = useRef(null);
  const [showLeaseDurationInfo, setShowLeaseDurationInfo] = useState(false);

  // Validate form whenever formData changes
  useEffect(() => {
    validateFormForButton();
  }, [formData]);

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

  // Handle field blur for validation
  const handleBlur = (fieldName) => {
    setTouched(prev => ({ ...prev, [fieldName]: true }));
    validateField(fieldName);
  };

  // Validate individual field
  const validateField = (fieldName) => {
    let error = "";
    
    switch(fieldName) {
      case 'tenantType':
        if (!formData.tenantType.trim()) {
          error = "Tenant Type is required";
        }
        break;
        
      case 'leaseStartDate':
        if (!formData.leaseStartDate.trim()) {
          error = "Lease Start Date is required";
        } else if (formData.leaseExpiryDate && new Date(formData.leaseStartDate) >= new Date(formData.leaseExpiryDate)) {
          error = "Start date must be before end date";
        }
        break;
        
      case 'leaseExpiryDate':
        if (!formData.leaseExpiryDate.trim()) {
          error = "Lease Expiry Date is required";
        } else if (formData.leaseStartDate && new Date(formData.leaseExpiryDate) <= new Date(formData.leaseStartDate)) {
          error = "End date must be after start date";
        }
        break;
        
      case 'lockInYears':
        if (formData.lockInYears !== "" && parseFloat(formData.lockInYears) < 0) {
          error = "Cannot be negative";
        }
        break;
        
      case 'lockInMonths':
        if (formData.lockInMonths !== "" && parseFloat(formData.lockInMonths) < 0) {
          error = "Cannot be negative";
        }
        break;
        
      case 'leaseDuration':
        if (!formData.leaseDuration.trim()) {
          error = "Lease Duration is required";
        } else if (parseFloat(formData.leaseDuration) < 0) {
          error = "Cannot be negative";
        }
        break;
        
      case 'rentPerSqFt':
        if (formData.rentType === "perSqFt" && !formData.rentPerSqFt.trim()) {
          error = "Rent per Sq Ft is required";
        } else if (formData.rentPerSqFt !== "" && parseFloat(formData.rentPerSqFt) < 0) {
          error = "Cannot be negative";
        }
        break;
        
      case 'totalMonthlyRent':
        if (formData.rentType === "lumpSum" && !formData.totalMonthlyRent.trim()) {
          error = "Total Monthly Rent is required";
        } else if (formData.totalMonthlyRent !== "" && parseFloat(formData.totalMonthlyRent) < 0) {
          error = "Cannot be negative";
        }
        break;
        
      case 'securityDepositMonths':
        if (formData.securityDepositType === "months" && !formData.securityDepositMonths.trim()) {
          error = "Security Deposit (Months) is required";
        } else if (formData.securityDepositMonths !== "" && parseFloat(formData.securityDepositMonths) < 0) {
          error = "Cannot be negative";
        }
        break;
        
      case 'securityDepositAmount':
        if (formData.securityDepositType === "lumpSum" && !formData.securityDepositAmount.trim()) {
          error = "Security Deposit Amount is required";
        } else if (formData.securityDepositAmount !== "" && parseFloat(formData.securityDepositAmount) < 0) {
          error = "Cannot be negative";
        }
        break;
        
      case 'escalationPercentage':
        if (!formData.escalationPercentage.trim()) {
          error = "Escalation Percentage is required";
        } else if (parseFloat(formData.escalationPercentage) < 0) {
          error = "Cannot be negative";
        }
        break;
        
      case 'escalationFrequency':
        if (!formData.escalationFrequency.trim()) {
          error = "Escalation Frequency is required";
        } else if (parseFloat(formData.escalationFrequency) < 0) {
          error = "Cannot be negative";
        }
        break;
        
      case 'maintenanceScope':
        if (!formData.maintenanceScope.trim()) {
          error = "Maintenance Scope is required";
        }
        break;
        
      case 'maintenanceType':
        if (formData.maintenanceScope === "included" && !formData.maintenanceType.trim()) {
          error = "Maintenance Type is required";
        }
        break;
        
      case 'maintenanceAmount':
        if (formData.maintenanceScope === "included" && !formData.maintenanceAmount.trim()) {
          error = "Maintenance Amount is required";
        } else if (formData.maintenanceAmount !== "" && parseFloat(formData.maintenanceAmount) < 0) {
          error = "Cannot be negative";
        }
        break;
    }
    
    setErrors(prev => ({
      ...prev,
      [fieldName]: error
    }));
    
    return !error;
  };

  // Main validation for form submission
  const validateForm = () => {
    const newErrors = {};

    if (!formData.tenantType.trim()) newErrors.tenantType = "Tenant Type is required";
    if (!formData.leaseStartDate.trim()) newErrors.leaseStartDate = "Lease Start Date is required";
    if (!formData.leaseExpiryDate.trim()) newErrors.leaseExpiryDate = "Lease Expiry Date is required";
    if (!formData.leaseDuration.trim()) newErrors.leaseDuration = "Lease Duration is required";
    
    // Date validation
    if (formData.leaseStartDate && formData.leaseExpiryDate && new Date(formData.leaseStartDate) >= new Date(formData.leaseExpiryDate)) {
      newErrors.leaseExpiryDate = "End date must be after start date";
    }
    
    // Rent validation
    if (formData.rentType === "perSqFt") {
      if (!formData.rentPerSqFt.trim()) newErrors.rentPerSqFt = "Rent per Sq Ft is required";
      else if (parseFloat(formData.rentPerSqFt) < 0) newErrors.rentPerSqFt = "Cannot be negative";
    } else {
      if (!formData.totalMonthlyRent.trim()) newErrors.totalMonthlyRent = "Total Monthly Rent is required";
      else if (parseFloat(formData.totalMonthlyRent) < 0) newErrors.totalMonthlyRent = "Cannot be negative";
    }
    
    // Security deposit validation
    if (formData.securityDepositType === "months") {
      if (!formData.securityDepositMonths.trim()) newErrors.securityDepositMonths = "Security Deposit (Months) is required";
      else if (parseFloat(formData.securityDepositMonths) < 0) newErrors.securityDepositMonths = "Cannot be negative";
    } else {
      if (!formData.securityDepositAmount.trim()) newErrors.securityDepositAmount = "Security Deposit Amount is required";
      else if (parseFloat(formData.securityDepositAmount) < 0) newErrors.securityDepositAmount = "Cannot be negative";
    }
    
    if (!formData.escalationPercentage.trim()) newErrors.escalationPercentage = "Escalation Percentage is required";
    else if (parseFloat(formData.escalationPercentage) < 0) newErrors.escalationPercentage = "Cannot be negative";
    
    if (!formData.escalationFrequency.trim()) newErrors.escalationFrequency = "Escalation Frequency is required";
    else if (parseFloat(formData.escalationFrequency) < 0) newErrors.escalationFrequency = "Cannot be negative";
    
    if (!formData.maintenanceScope.trim()) newErrors.maintenanceScope = "Maintenance Scope is required";
    
    if (formData.maintenanceScope === "included") {
      if (!formData.maintenanceType.trim()) newErrors.maintenanceType = "Maintenance Type is required";
      if (!formData.maintenanceAmount.trim()) newErrors.maintenanceAmount = "Maintenance Amount is required";
      else if (parseFloat(formData.maintenanceAmount) < 0) newErrors.maintenanceAmount = "Cannot be negative";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validation for Next button enable/disable
  const validateFormForButton = () => {
    const isValid = 
      formData.tenantType.trim() !== "" &&
      formData.leaseStartDate.trim() !== "" &&
      formData.leaseExpiryDate.trim() !== "" &&
      formData.leaseDuration.trim() !== "" &&
      (formData.rentType === "perSqFt" ? formData.rentPerSqFt.trim() !== "" : formData.totalMonthlyRent.trim() !== "") &&
      (formData.securityDepositType === "months" ? formData.securityDepositMonths.trim() !== "" : formData.securityDepositAmount.trim() !== "") &&
      formData.escalationPercentage.trim() !== "" &&
      formData.escalationFrequency.trim() !== "" &&
      formData.maintenanceScope.trim() !== "" &&
      (formData.maintenanceScope === "excluded" || (formData.maintenanceType.trim() !== "" && formData.maintenanceAmount.trim() !== "")) &&
      // Additional checks for negative numbers
      parseFloat(formData.leaseDuration) >= 0 &&
      (formData.rentType === "perSqFt" ? parseFloat(formData.rentPerSqFt) >= 0 : parseFloat(formData.totalMonthlyRent) >= 0) &&
      (formData.securityDepositType === "months" ? parseFloat(formData.securityDepositMonths) >= 0 : parseFloat(formData.securityDepositAmount) >= 0) &&
      parseFloat(formData.escalationPercentage) >= 0 &&
      parseFloat(formData.escalationFrequency) >= 0 &&
      (formData.maintenanceScope === "excluded" || parseFloat(formData.maintenanceAmount) >= 0);

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
        tenantType: true,
        leaseStartDate: true,
        leaseExpiryDate: true,
        lockInYears: true,
        lockInMonths: true,
        leaseDuration: true,
        rentPerSqFt: true,
        totalMonthlyRent: true,
        securityDepositMonths: true,
        securityDepositAmount: true,
        escalationPercentage: true,
        escalationFrequency: true,
        maintenanceScope: true,
        maintenanceType: true,
        maintenanceAmount: true,
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
          Lease & Tenant
        </h3>
      </div>

      {/* Tenant Information Section */}
      <div>
        <h4 className="text-sm font-bold text-[#EE2529] mb-4">Tenant Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Tenant Type */}
          <div>
            <label className="block text-xs font-semibold mb-2">
              Tenant Type <span className="text-[#EE2529]">*</span>
            </label>
            <div className="relative">
              <select
                name="tenantType"
                value={formData.tenantType}
                onChange={handleInputChange}
                onBlur={() => handleBlur('tenantType')}
                className={`w-full px-3 py-2 border rounded-md text-sm bg-gray-100 focus:outline-none focus:bg-white transition appearance-none pr-10 ${
                  showError('tenantType') ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select Tenant Type</option>
                <option value="government">Government</option>
                <option value="startup">Startup</option>
                <option value="mnc">MNC</option>
                <option value="corporate">Corporate</option>
                <option value="others">Others</option>
              </select>
              <FaAngleDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
            {showError('tenantType') && (
              <p className="text-xs text-red-500 mt-1">{errors.tenantType}</p>
            )}
          </div>
        </div>
      </div>

      {/* Lease Duration & Terms Section */}
      <div>
        <h4 className="text-sm font-bold text-[#EE2529] mb-4">Lease Duration & Terms</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Lease Start Date */}
          <div>
            <label className="block text-xs font-semibold mb-2">
              Lease Start Date <span className="text-[#EE2529]">*</span>
            </label>
            <input
              type="date"
              name="leaseStartDate"
              value={formData.leaseStartDate}
              onChange={handleInputChange}
              onBlur={() => handleBlur('leaseStartDate')}
              className={`w-full px-3 py-2 border rounded-md text-sm bg-gray-100 focus:outline-none focus:bg-white transition ${
                showError('leaseStartDate') ? "border-red-500" : "border-gray-300"
              }`}
            />
            {showError('leaseStartDate') && (
              <p className="text-xs text-red-500 mt-1">{errors.leaseStartDate}</p>
            )}
          </div>

          {/* Lease Expiry Date */}
          <div>
            <label className="block text-xs font-semibold mb-2">
              Lease End Date <span className="text-[#EE2529]">*</span>
            </label>
            <input
              type="date"
              name="leaseExpiryDate"
              value={formData.leaseExpiryDate}
              onChange={handleInputChange}
              onBlur={() => handleBlur('leaseExpiryDate')}
              className={`w-full px-3 py-2 border rounded-md text-sm bg-gray-100 focus:outline-none focus:bg-white transition ${
                showError('leaseExpiryDate') ? "border-red-500" : "border-gray-300"
              }`}
            />
            {showError('leaseExpiryDate') && (
              <p className="text-xs text-red-500 mt-1">{errors.leaseExpiryDate}</p>
            )}
          </div>

          {/* Lock In Period - Split into Years and Months */}
          <div>
            <label className="block text-xs font-semibold mb-2">
              Lock In Period <span className="text-gray-500">(Optional)</span>
            </label>
            <div className="flex gap-2">
              <div className="flex-1">
                <input
                  type="number"
                  name="lockInYears"
                  value={formData.lockInYears}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur('lockInYears')}
                  placeholder="Years"
                  min="0"
                  className={`w-full px-3 py-2 border rounded-md text-sm bg-gray-100 focus:outline-none focus:bg-white transition ${
                    showError('lockInYears') ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {showError('lockInYears') && (
                  <p className="text-xs text-red-500 mt-1">{errors.lockInYears}</p>
                )}
              </div>
              <div className="flex-1">
                <input
                  type="number"
                  name="lockInMonths"
                  value={formData.lockInMonths}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur('lockInMonths')}
                  placeholder="Months"
                  min="0"
                  className={`w-full px-3 py-2 border rounded-md text-sm bg-gray-100 focus:outline-none focus:bg-white transition ${
                    showError('lockInMonths') ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {showError('lockInMonths') && (
                  <p className="text-xs text-red-500 mt-1">{errors.lockInMonths}</p>
                )}
              </div>
            </div>
          </div>

          {/* Lease Duration */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <label className="block text-xs font-semibold">
                Lease Duration (Years) <span className="text-[#EE2529]">*</span>
              </label>
              <div className="relative">
                <button
                  type="button"
                  className="w-4 h-4 rounded-full bg-gray-300 flex items-center justify-center text-xs hover:bg-gray-400 transition"
                  onClick={() => setShowLeaseDurationInfo(!showLeaseDurationInfo)}
                  onMouseEnter={() => setShowLeaseDurationInfo(true)}
                  onMouseLeave={() => setShowLeaseDurationInfo(false)}
                >
                  i
                </button>
                {showLeaseDurationInfo && (
                  <div className="absolute left-0 bottom-full mb-2 w-64 p-3 bg-gray-800 text-white text-xs rounded-md shadow-lg z-10">
                    Total duration of the lease agreement in years. This represents the complete lease term from start to end date.
                  </div>
                )}
              </div>
            </div>
            <input
              type="number"
              name="leaseDuration"
              value={formData.leaseDuration}
              onChange={handleInputChange}
              onBlur={() => handleBlur('leaseDuration')}
              placeholder="Enter lease duration"
              min="0"
              step="0.5"
              className={`w-full px-3 py-2 border rounded-md text-sm bg-gray-100 focus:outline-none focus:bg-white transition ${
                showError('leaseDuration') ? "border-red-500" : "border-gray-300"
              }`}
            />
            {showError('leaseDuration') && (
              <p className="text-xs text-red-500 mt-1">{errors.leaseDuration}</p>
            )}
          </div>
        </div>
      </div>

      {/* Rental & Deposit Details Section */}
      <div>
        <h4 className="text-sm font-bold text-[#EE2529] mb-4">Rental & Deposit Details</h4>
        
        {/* Rent Type and Security Deposit Type - Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          {/* Rent Type Toggle */}
          <div>
            <label className="block text-xs font-semibold mb-2">Rent Type</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="rentType"
                  value="perSqFt"
                  checked={formData.rentType === "perSqFt"}
                  onChange={(e) => setFormData(prev => ({...prev, rentType: e.target.value}))}
                  className="w-4 h-4 accent-[#EE2529]"
                />
                <span className="text-sm">Per Sq Ft</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="rentType"
                  value="lumpSum"
                  checked={formData.rentType === "lumpSum"}
                  onChange={(e) => setFormData(prev => ({...prev, rentType: e.target.value}))}
                  className="w-4 h-4 accent-[#EE2529]"
                />
                <span className="text-sm">Lump Sum</span>
              </label>
            </div>
          </div>

          {/* Security Deposit Type Toggle */}
          <div>
            <label className="block text-xs font-semibold mb-2">Security Deposit Type</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="securityDepositType"
                  value="months"
                  checked={formData.securityDepositType === "months"}
                  onChange={(e) => setFormData(prev => ({...prev, securityDepositType: e.target.value}))}
                  className="w-4 h-4 accent-[#EE2529]"
                />
                <span className="text-sm">Months of Rent</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="securityDepositType"
                  value="lumpSum"
                  checked={formData.securityDepositType === "lumpSum"}
                  onChange={(e) => setFormData(prev => ({...prev, securityDepositType: e.target.value}))}
                  className="w-4 h-4 accent-[#EE2529]"
                />
                <span className="text-sm">Lump Sum</span>
              </label>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Rent per Sq Ft - Shows only when perSqFt is selected */}
          {formData.rentType === "perSqFt" ? (
            <div>
              <label className="block text-xs font-semibold mb-2">
                Rent per Sq ft (Carpet)-Monthly <span className="text-[#EE2529]">*</span>
              </label>
              <input
                type="number"
                name="rentPerSqFt"
                value={formData.rentPerSqFt}
                onChange={handleInputChange}
                onBlur={() => handleBlur('rentPerSqFt')}
                placeholder="Enter Rent per Sq ft"
                min="0"
                step="0.01"
                className={`w-full px-3 py-2 border rounded-md text-sm bg-gray-100 focus:outline-none focus:bg-white transition ${
                  showError('rentPerSqFt') ? "border-red-500" : "border-gray-300"
                }`}
              />
              {showError('rentPerSqFt') && (
                <p className="text-xs text-red-500 mt-1">{errors.rentPerSqFt}</p>
              )}
            </div>
          ) : (
            <div>
              <label className="block text-xs font-semibold mb-2">
                Total Monthly Rent (Lump Sum) <span className="text-[#EE2529]">*</span>
              </label>
              <input
                type="number"
                name="totalMonthlyRent"
                value={formData.totalMonthlyRent}
                onChange={handleInputChange}
                onBlur={() => handleBlur('totalMonthlyRent')}
                placeholder="Enter Monthly Rent"
                min="0"
                step="0.01"
                className={`w-full px-3 py-2 border rounded-md text-sm bg-gray-100 focus:outline-none focus:bg-white transition ${
                  showError('totalMonthlyRent') ? "border-red-500" : "border-gray-300"
                }`}
              />
              {showError('totalMonthlyRent') && (
                <p className="text-xs text-red-500 mt-1">{errors.totalMonthlyRent}</p>
              )}
            </div>
          )}

          {/* Security Deposit based on type */}
          {formData.securityDepositType === "months" ? (
            <div>
              <label className="block text-xs font-semibold mb-2">
                Security Deposit (No of Months) <span className="text-[#EE2529]">*</span>
              </label>
              <input
                type="number"
                name="securityDepositMonths"
                value={formData.securityDepositMonths}
                onChange={handleInputChange}
                onBlur={() => handleBlur('securityDepositMonths')}
                placeholder="0"
                min="0"
                className={`w-full px-3 py-2 border rounded-md text-sm bg-gray-100 focus:outline-none focus:bg-white transition ${
                  showError('securityDepositMonths') ? "border-red-500" : "border-gray-300"
                }`}
              />
              {showError('securityDepositMonths') && (
                <p className="text-xs text-red-500 mt-1">{errors.securityDepositMonths}</p>
              )}
            </div>
          ) : (
            <div>
              <label className="block text-xs font-semibold mb-2">
                Security Deposit Amount <span className="text-[#EE2529]">*</span>
              </label>
              <input
                type="number"
                name="securityDepositAmount"
                value={formData.securityDepositAmount}
                onChange={handleInputChange}
                onBlur={() => handleBlur('securityDepositAmount')}
                placeholder="0"
                min="0"
                step="0.01"
                className={`w-full px-3 py-2 border rounded-md text-sm bg-gray-100 focus:outline-none focus:bg-white transition ${
                  showError('securityDepositAmount') ? "border-red-500" : "border-gray-300"
                }`}
              />
              {showError('securityDepositAmount') && (
                <p className="text-xs text-red-500 mt-1">{errors.securityDepositAmount}</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Escalation Terms & Maintenance Section */}
      <div>
        <h4 className="text-sm font-bold text-[#EE2529] mb-4">
          Escalation Terms & Maintenance
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Escalation Frequency */}
          <div>
            <label className="block text-xs font-semibold mb-2">
              Escalation Frequency (Years) <span className="text-[#EE2529]">*</span>
            </label>
            <input
              type="number"
              name="escalationFrequency"
              value={formData.escalationFrequency}
              onChange={handleInputChange}
              onBlur={() => handleBlur('escalationFrequency')}
              placeholder="Every X years"
              min="0"
              className={`w-full px-3 py-2 border rounded-md text-sm bg-gray-100 focus:outline-none focus:bg-white transition ${
                showError('escalationFrequency') ? "border-red-500" : "border-gray-300"
              }`}
            />
            {showError('escalationFrequency') && (
              <p className="text-xs text-red-500 mt-1">{errors.escalationFrequency}</p>
            )}
          </div>

          {/* Escalation Percentage */}
          <div>
            <label className="block text-xs font-semibold mb-2">
              Annual Escalation (%) <span className="text-[#EE2529]">*</span>
            </label>
            <input
              type="number"
              name="escalationPercentage"
              value={formData.escalationPercentage}
              onChange={handleInputChange}
              onBlur={() => handleBlur('escalationPercentage')}
              placeholder="0"
              min="0"
              step="0.01"
              className={`w-full px-3 py-2 border rounded-md text-sm bg-gray-100 focus:outline-none focus:bg-white transition ${
                showError('escalationPercentage') ? "border-red-500" : "border-gray-300"
              }`}
            />
            {showError('escalationPercentage') && (
              <p className="text-xs text-red-500 mt-1">{errors.escalationPercentage}</p>
            )}
          </div>

          {/* Maintenance Scope - Updated */}
          <div>
            <label className="block text-xs font-semibold mb-2">
              Maintenance Costs <span className="text-[#EE2529]">*</span>
            </label>
            <div className="relative">
              <select
                name="maintenanceScope"
                value={formData.maintenanceScope}
                onChange={handleInputChange}
                onBlur={() => handleBlur('maintenanceScope')}
                className={`w-full px-3 py-2 border rounded-md text-sm bg-gray-100 focus:outline-none focus:bg-white transition appearance-none pr-10 ${
                  showError('maintenanceScope') ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Are maintenance costs included?</option>
                <option value="included">Yes, included in rent</option>
                <option value="excluded">No, excluded from rent</option>
              </select>
              <FaAngleDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
            {showError('maintenanceScope') && (
              <p className="text-xs text-red-500 mt-1">{errors.maintenanceScope}</p>
            )}

            {/* Maintenance Type if included */}
            {formData.maintenanceScope === "included" && (
              <div className="mt-3">
                <label className="block text-xs font-semibold mb-2">Maintenance Type</label>
                <div className="flex gap-4 mb-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="maintenanceType"
                      value="perSqFt"
                      checked={formData.maintenanceType === "perSqFt"}
                      onChange={(e) => setFormData(prev => ({...prev, maintenanceType: e.target.value}))}
                      className="w-4 h-4 accent-[#EE2529]"
                    />
                    <span className="text-sm">Per Sq Ft</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="maintenanceType"
                      value="lumpSum"
                      checked={formData.maintenanceType === "lumpSum"}
                      onChange={(e) => setFormData(prev => ({...prev, maintenanceType: e.target.value}))}
                      className="w-4 h-4 accent-[#EE2529]"
                    />
                    <span className="text-sm">Lump Sum</span>
                  </label>
                </div>
                {showError('maintenanceType') && (
                  <p className="text-xs text-red-500 mb-2">{errors.maintenanceType}</p>
                )}

                {/* Maintenance Amount */}
                <div>
                  <label className="block text-xs font-semibold mb-2">
                    Maintenance Amount <span className="text-[#EE2529]">*</span>
                  </label>
                  <input
                    type="number"
                    name="maintenanceAmount"
                    value={formData.maintenanceAmount}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur('maintenanceAmount')}
                    placeholder={formData.maintenanceType === "perSqFt" ? "Amount per Sq Ft" : "Total Amount"}
                    min="0"
                    step="0.01"
                    className={`w-full px-3 py-2 border rounded-md text-sm bg-gray-100 focus:outline-none focus:bg-white transition ${
                      showError('maintenanceAmount') ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {showError('maintenanceAmount') && (
                    <p className="text-xs text-red-500 mt-1">{errors.maintenanceAmount}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </form>
  );
};

export default LeaseDetails;