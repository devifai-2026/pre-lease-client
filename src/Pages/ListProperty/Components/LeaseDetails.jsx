// LeaseDetails.js
import { useState, useRef, useEffect } from "react";

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
    maintenanceScope: "", // Added: "included" or "excluded"
    maintenanceType: "", // Added: "perSqFt" or "lumpSum"
    maintenanceAmount: "", // Added
  });

  const [errors, setErrors] = useState({});
  const formRef = useRef(null);
  const [showLeaseDurationInfo, setShowLeaseDurationInfo] = useState(false);

  // Validate form whenever formData changes
  useEffect(() => {
    validateFormForButton();
  }, [formData]);

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

    if (!formData.tenantType) newErrors.tenantType = "Tenant Type is required";
    if (!formData.leaseStartDate) newErrors.leaseStartDate = "Lease Start Date is required";
    if (!formData.leaseExpiryDate) newErrors.leaseExpiryDate = "Lease Expiry Date is required";
    if (!formData.leaseDuration) newErrors.leaseDuration = "Lease Duration is required";
    
    // Rent validation based on type
    if (formData.rentType === "perSqFt") {
      if (!formData.rentPerSqFt) newErrors.rentPerSqFt = "Rent per Sq Ft is required";
    } else {
      if (!formData.totalMonthlyRent) newErrors.totalMonthlyRent = "Total Monthly Rent is required";
    }
    
    // Security deposit validation based on type
    if (formData.securityDepositType === "months") {
      if (!formData.securityDepositMonths) newErrors.securityDepositMonths = "Security Deposit (Months) is required";
    } else {
      if (!formData.securityDepositAmount) newErrors.securityDepositAmount = "Security Deposit Amount is required";
    }
    
    if (!formData.escalationPercentage) newErrors.escalationPercentage = "Escalation Percentage is required";
    if (!formData.escalationFrequency) newErrors.escalationFrequency = "Escalation Frequency is required";
    if (!formData.maintenanceScope) newErrors.maintenanceScope = "Maintenance Scope is required";
    
    // Maintenance validation if included
    if (formData.maintenanceScope === "included") {
      if (!formData.maintenanceType) newErrors.maintenanceType = "Maintenance Type is required";
      if (!formData.maintenanceAmount) newErrors.maintenanceAmount = "Maintenance Amount is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validation for Next button enable/disable
  const validateFormForButton = () => {
    const isValid = 
      formData.tenantType !== "" &&
      formData.leaseStartDate !== "" &&
      formData.leaseExpiryDate !== "" &&
      formData.leaseDuration !== "" &&
      (formData.rentType === "perSqFt" ? formData.rentPerSqFt !== "" : formData.totalMonthlyRent !== "") &&
      (formData.securityDepositType === "months" ? formData.securityDepositMonths !== "" : formData.securityDepositAmount !== "") &&
      formData.escalationPercentage !== "" &&
      formData.escalationFrequency !== "" &&
      formData.maintenanceScope !== "" &&
      (formData.maintenanceScope === "excluded" || (formData.maintenanceType !== "" && formData.maintenanceAmount !== ""));

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
            <select
              name="tenantType"
              value={formData.tenantType}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md text-sm bg-gray-100 focus:outline-none focus:bg-white transition ${
                errors.tenantType ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select Tenant Type</option>
              <option value="government">Government</option>
              <option value="startup">Startup</option>
              <option value="mnc">MNC</option>
              <option value="corporate">Corporate</option>
              <option value="others">Others</option>
            </select>
            {errors.tenantType && (
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
              className={`w-full px-3 py-2 border rounded-md text-sm bg-gray-100 focus:outline-none focus:bg-white transition ${
                errors.leaseStartDate ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.leaseStartDate && (
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
              className={`w-full px-3 py-2 border rounded-md text-sm bg-gray-100 focus:outline-none focus:bg-white transition ${
                errors.leaseExpiryDate ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.leaseExpiryDate && (
              <p className="text-xs text-red-500 mt-1">{errors.leaseExpiryDate}</p>
            )}
          </div>

          {/* Lock In Period - Split into Years and Months */}
          <div>
            <label className="block text-xs font-semibold mb-2">
              Lock In Period <span className="text-[#EE2529]">*</span>
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                name="lockInYears"
                value={formData.lockInYears}
                onChange={handleInputChange}
                placeholder="Years"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm bg-gray-100 focus:outline-none focus:bg-white transition"
              />
              <input
                type="number"
                name="lockInMonths"
                value={formData.lockInMonths}
                onChange={handleInputChange}
                placeholder="Months"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm bg-gray-100 focus:outline-none focus:bg-white transition"
              />
            </div>
          </div>

          {/* Lease Duration - NEW FIELD */}
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
              placeholder="Enter lease duration"
              className={`w-full px-3 py-2 border rounded-md text-sm bg-gray-100 focus:outline-none focus:bg-white transition ${
                errors.leaseDuration ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.leaseDuration && (
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
                placeholder="Enter Rent per Sq ft"
                className={`w-full px-3 py-2 border rounded-md text-sm bg-gray-100 focus:outline-none focus:bg-white transition ${
                  errors.rentPerSqFt ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.rentPerSqFt && (
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
                placeholder="Enter Monthly Rent"
                className={`w-full px-3 py-2 border rounded-md text-sm bg-gray-100 focus:outline-none focus:bg-white transition ${
                  errors.totalMonthlyRent ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.totalMonthlyRent && (
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
                placeholder="0"
                min="0"
                className={`w-full px-3 py-2 border rounded-md text-sm bg-gray-100 focus:outline-none focus:bg-white transition ${
                  errors.securityDepositMonths ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.securityDepositMonths && (
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
                placeholder="0"
                min="0"
                className={`w-full px-3 py-2 border rounded-md text-sm bg-gray-100 focus:outline-none focus:bg-white transition ${
                  errors.securityDepositAmount ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.securityDepositAmount && (
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
          {/* Escalation Frequency - Moved first */}
          <div>
            <label className="block text-xs font-semibold mb-2">
              Escalation Frequency (Years) <span className="text-[#EE2529]">*</span>
            </label>
            <input
              type="number"
              name="escalationFrequency"
              value={formData.escalationFrequency}
              onChange={handleInputChange}
              placeholder="Every X years"
              min="0"
              className={`w-full px-3 py-2 border rounded-md text-sm bg-gray-100 focus:outline-none focus:bg-white transition ${
                errors.escalationFrequency ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.escalationFrequency && (
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
              placeholder="0"
              min="0"
              step="0.01"
              className={`w-full px-3 py-2 border rounded-md text-sm bg-gray-100 focus:outline-none focus:bg-white transition ${
                errors.escalationPercentage ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.escalationPercentage && (
              <p className="text-xs text-red-500 mt-1">{errors.escalationPercentage}</p>
            )}
          </div>

          {/* Maintenance Scope - Updated */}
          <div>
            <label className="block text-xs font-semibold mb-2">
              Maintenance Costs <span className="text-[#EE2529]">*</span>
            </label>
            <select
              name="maintenanceScope"
              value={formData.maintenanceScope}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md text-sm bg-gray-100 focus:outline-none focus:bg-white transition ${
                errors.maintenanceScope ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Are maintenance costs included?</option>
              <option value="included">Yes, included in rent</option>
              <option value="excluded">No, excluded from rent</option>
            </select>
            {errors.maintenanceScope && (
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
                {errors.maintenanceType && (
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
                    placeholder={formData.maintenanceType === "perSqFt" ? "Amount per Sq Ft" : "Total Amount"}
                    min="0"
                    className={`w-full px-3 py-2 border rounded-md text-sm bg-gray-100 focus:outline-none focus:bg-white transition ${
                      errors.maintenanceAmount ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.maintenanceAmount && (
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