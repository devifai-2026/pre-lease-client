// LeaseDetails.js
import { useState, useRef, useEffect } from "react";

const LeaseDetails = ({ onNext, onFormValid }) => {
  const [formData, setFormData] = useState({
    tenantType: "",
    leaseStartDate: "",
    leaseExpiryDate: "",
    lockInPeriod: "",
    rentPerSqFt: "",
    totalMonthlyRent: "",
    securityDepositMonths: "",
    securityDepositAmount: "",
    escalationPercentage: "",
    escalationFrequency: "",
    maintenanceScope: "",
  });

  const [errors, setErrors] = useState({});
  const formRef = useRef(null);

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
    if (!formData.lockInPeriod) newErrors.lockInPeriod = "Lock In Period is required";
    if (!formData.rentPerSqFt) newErrors.rentPerSqFt = "Rent per Sq Ft is required";
    if (!formData.totalMonthlyRent) newErrors.totalMonthlyRent = "Total Monthly Rent is required";
    if (!formData.securityDepositMonths) newErrors.securityDepositMonths = "Security Deposit (Months) is required";
    if (!formData.securityDepositAmount) newErrors.securityDepositAmount = "Security Deposit Amount is required";
    if (!formData.escalationPercentage) newErrors.escalationPercentage = "Escalation Percentage is required";
    if (!formData.escalationFrequency) newErrors.escalationFrequency = "Escalation Frequency is required";
    if (!formData.maintenanceScope) newErrors.maintenanceScope = "Maintenance Scope is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validation for Next button enable/disable
  const validateFormForButton = () => {
    const isValid = 
      formData.tenantType !== "" &&
      formData.leaseStartDate !== "" &&
      formData.leaseExpiryDate !== "" &&
      formData.lockInPeriod !== "" &&
      formData.rentPerSqFt !== "" &&
      formData.totalMonthlyRent !== "" &&
      formData.securityDepositMonths !== "" &&
      formData.securityDepositAmount !== "" &&
      formData.escalationPercentage !== "" &&
      formData.escalationFrequency !== "" &&
      formData.maintenanceScope !== "";

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
              <option value="corporate">Corporate</option>
              <option value="individual">Individual</option>
              <option value="government">Government</option>
              <option value="ngo">NGO</option>
              <option value="startup">Startup</option>
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
              Lease Expiry Date <span className="text-[#EE2529]">*</span>
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

          {/* Lock In Period */}
          <div>
            <label className="block text-xs font-semibold mb-2">
              Lock In Period (Total Years) <span className="text-[#EE2529]">*</span>
            </label>
            <input
              type="number"
              name="lockInPeriod"
              value={formData.lockInPeriod}
              onChange={handleInputChange}
              placeholder="Enter Lock In Period"
              className={`w-full px-3 py-2 border rounded-md text-sm bg-gray-100 focus:outline-none focus:bg-white transition ${
                errors.lockInPeriod ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.lockInPeriod && (
              <p className="text-xs text-red-500 mt-1">{errors.lockInPeriod}</p>
            )}
          </div>
        </div>
      </div>

      {/* Rental & Deposit Details Section */}
      <div>
        <h4 className="text-sm font-bold text-[#EE2529] mb-4">Rental & Deposit Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Rent per Sq Ft */}
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

          {/* Total Monthly Rent */}
          <div>
            <label className="block text-xs font-semibold mb-2">
              Total Monthly Rent <span className="text-[#EE2529]">*</span>
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

          {/* Security Deposit Months */}
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

          {/* Security Deposit Amount */}
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
        </div>
      </div>

      {/* Escalation Terms & Maintenance Section */}
      <div>
        <h4 className="text-sm font-bold text-[#EE2529] mb-4">
          Escalation Terms & Maintenance
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Escalation Percentage */}
          <div>
            <label className="block text-xs font-semibold mb-2">
              Escalation (%) per year <span className="text-[#EE2529]">*</span>
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

          {/* Escalation Frequency */}
          <div>
            <label className="block text-xs font-semibold mb-2">
              Escalation Frequency <span className="text-[#EE2529]">*</span>
            </label>
            <input
              type="number"
              name="escalationFrequency"
              value={formData.escalationFrequency}
              onChange={handleInputChange}
              placeholder="0"
              min="0"
              className={`w-full px-3 py-2 border rounded-md text-sm bg-gray-100 focus:outline-none focus:bg-white transition ${
                errors.escalationFrequency ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.escalationFrequency && (
              <p className="text-xs text-red-500 mt-1">{errors.escalationFrequency}</p>
            )}
          </div>

          {/* Maintenance Scope */}
          <div>
            <label className="block text-xs font-semibold mb-2">
              Maintenance Scope <span className="text-[#EE2529]">*</span>
            </label>
            <select
              name="maintenanceScope"
              value={formData.maintenanceScope}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md text-sm bg-gray-100 focus:outline-none focus:bg-white transition ${
                errors.maintenanceScope ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select Maintenance Scope</option>
              <option value="landlord">Landlord Maintained</option>
              <option value="tenant">Tenant Maintained</option>
              <option value="shared">Shared Maintenance</option>
              <option value="building-managed">Building Managed</option>
            </select>
            {errors.maintenanceScope && (
              <p className="text-xs text-red-500 mt-1">{errors.maintenanceScope}</p>
            )}
          </div>
        </div>
      </div>
    </form>
  );
};

export default LeaseDetails;