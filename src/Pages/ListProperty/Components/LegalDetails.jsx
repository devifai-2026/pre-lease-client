// LegalDetails.js
import { useState, useRef, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { FaAngleDown } from "react-icons/fa";

const LegalDetails = ({ onNext, onFormValid }) => {
  const [formData, setFormData] = useState({
    titleStatus: "",
    occupancyCertificate: "",
    leaseRegistration: "",
    pendingLitigations: "no",
    litigationNote: "",
    certifications: {
      rera: false,
      leed: false,
      igbc: false,
    },
    otherCertifications: [""],
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const formRef = useRef(null);

  // Validate form whenever formData changes
  useEffect(() => {
    validateFormForButton();
  }, [formData]);

  // Handle field blur for validation
  const handleBlur = (fieldName) => {
    setTouched(prev => ({ ...prev, [fieldName]: true }));
    validateField(fieldName);
  };

  // Validate individual field
  const validateField = (fieldName) => {
    let error = "";
    
    switch(fieldName) {
      case 'titleStatus':
        if (!formData.titleStatus.trim()) {
          error = "Title Status is required";
        }
        break;
        
      case 'occupancyCertificate':
        if (!formData.occupancyCertificate.trim()) {
          error = "Occupancy Certificate is required";
        }
        break;
        
      case 'leaseRegistration':
        if (!formData.leaseRegistration.trim()) {
          error = "Lease Registration is required";
        }
        break;
        
      case 'pendingLitigations':
        if (!formData.pendingLitigations) {
          error = "Please select litigation status";
        }
        break;
        
      case 'litigationNote':
        if (formData.pendingLitigations === 'yes' && !formData.litigationNote.trim()) {
          error = "Litigation note is required when pending litigations is 'Yes'";
        }
        break;
        
      case 'otherCertifications':
        // Check if any other certification is partially filled
        const invalidOtherCerts = formData.otherCertifications.filter(
          (cert, index) => 
            index < formData.otherCertifications.length - 1 && 
            !cert.trim()
        );
        if (invalidOtherCerts.length > 0) {
          error = "Please fill or remove empty certification fields";
        }
        break;
    }
    
    setErrors(prev => ({
      ...prev,
      [fieldName]: error
    }));
    
    return !error;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
    
    // Validate litigation note immediately when pendingLitigations changes
    if (name === 'pendingLitigations') {
      if (value === 'yes') {
        if (!formData.litigationNote.trim()) {
          setErrors(prev => ({ 
            ...prev, 
            litigationNote: "Litigation note is required when pending litigations is 'Yes'" 
          }));
        }
      } else {
        setErrors(prev => ({ ...prev, litigationNote: "" }));
      }
    }
  };

  const handleRadioChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      pendingLitigations: value,
    }));
    
    // Clear litigation note error if switching to "no"
    if (value === 'no' && errors.litigationNote) {
      setErrors(prev => ({ ...prev, litigationNote: "" }));
    }
  };

  const handleCertificationChange = (cert) => {
    setFormData((prev) => ({
      ...prev,
      certifications: {
        ...prev.certifications,
        [cert]: !prev.certifications[cert],
      },
    }));
  };

  const handleOtherCertificationChange = (index, value) => {
    const newCertifications = [...formData.otherCertifications];
    newCertifications[index] = value;
    setFormData((prev) => ({
      ...prev,
      otherCertifications: newCertifications,
    }));
    
    // Clear otherCertifications error if user is typing in the last field
    if (errors.otherCertifications && index === formData.otherCertifications.length - 1) {
      setErrors(prev => ({ ...prev, otherCertifications: "" }));
    }
  };

  const addOtherCertification = () => {
    // Validate last field before adding new one
    const lastCert = formData.otherCertifications[formData.otherCertifications.length - 1];
    if (!lastCert.trim()) {
      setErrors(prev => ({ 
        ...prev, 
        otherCertifications: "Please fill the current field before adding a new one" 
      }));
      return;
    }
    
    setFormData((prev) => ({
      ...prev,
      otherCertifications: [...prev.otherCertifications, ""],
    }));
    setErrors(prev => ({ ...prev, otherCertifications: "" }));
  };

  const removeOtherCertification = (index) => {
    const newCertifications = formData.otherCertifications.filter(
      (_, i) => i !== index
    );
    setFormData((prev) => ({
      ...prev,
      otherCertifications: newCertifications,
    }));
    
    // Clear error if removing an invalid field
    if (errors.otherCertifications) {
      setErrors(prev => ({ ...prev, otherCertifications: "" }));
    }
  };

  // Main validation for form submission
  const validateForm = () => {
    const newErrors = {};

    // Required fields validation
    if (!formData.titleStatus.trim()) 
      newErrors.titleStatus = "Title Status is required";
    if (!formData.occupancyCertificate.trim()) 
      newErrors.occupancyCertificate = "Occupancy Certificate is required";
    if (!formData.leaseRegistration.trim()) 
      newErrors.leaseRegistration = "Lease Registration is required";
    if (!formData.pendingLitigations) 
      newErrors.pendingLitigations = "Please select litigation status";

    // Conditional validation for litigation note
    if (formData.pendingLitigations === 'yes' && !formData.litigationNote.trim()) {
      newErrors.litigationNote = "Litigation note is required when pending litigations is 'Yes'";
    }

    // Validate other certifications (ensure no empty fields except the last one)
    const invalidOtherCerts = formData.otherCertifications.filter(
      (cert, index) => index < formData.otherCertifications.length - 1 && !cert.trim()
    );
    if (invalidOtherCerts.length > 0) {
      newErrors.otherCertifications = "Please fill or remove empty certification fields";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validation for Next button enable/disable
  const validateFormForButton = () => {
    const isValid =
      formData.titleStatus.trim() !== "" &&
      formData.occupancyCertificate.trim() !== "" &&
      formData.leaseRegistration.trim() !== "" &&
      formData.pendingLitigations !== "" &&
      (formData.pendingLitigations !== 'yes' || formData.litigationNote.trim() !== "");

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
        titleStatus: true,
        occupancyCertificate: true,
        leaseRegistration: true,
        pendingLitigations: true,
        litigationNote: true,
        otherCertifications: true,
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
          Legal & Title Details
        </h3>
      </div>

      {/* Title & Ownership Status Section */}
      <div>
        <h4 className="text-sm font-bold text-[#EE2529] mb-4">
          Title & Ownership Status
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Title Status - Updated dropdown with FaAngleDown icon */}
          <div>
            <label className="block text-xs font-semibold mb-2">
              Title Status <span className="text-[#EE2529]">*</span>
            </label>
            <div className="relative">
              <select
                name="titleStatus"
                value={formData.titleStatus}
                onChange={handleInputChange}
                onBlur={() => handleBlur('titleStatus')}
                className={`w-full px-3 py-2 border rounded-md text-sm bg-gray-100 focus:outline-none focus:bg-white transition appearance-none pr-10 ${
                  showError('titleStatus') ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select Status</option>
                <option value="no-litigation">No Litigation</option>
                <option value="pending-litigation">Pending Litigation</option>
              </select>
              <FaAngleDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
            {showError('titleStatus') && (
              <p className="text-xs text-red-500 mt-1">{errors.titleStatus}</p>
            )}
          </div>

          {/* Occupancy Certificate - Updated options with FaAngleDown icon */}
          <div>
            <label className="block text-xs font-semibold mb-2">
              Occupancy Certificate (OC) <span className="text-[#EE2529]">*</span>
            </label>
            <div className="relative">
              <select
                name="occupancyCertificate"
                value={formData.occupancyCertificate}
                onChange={handleInputChange}
                onBlur={() => handleBlur('occupancyCertificate')}
                className={`w-full px-3 py-2 border rounded-md text-sm bg-gray-100 focus:outline-none focus:bg-white transition appearance-none pr-10 ${
                  showError('occupancyCertificate') ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select Status</option>
                <option value="available">Yes, available</option>
                <option value="in-process">In Process</option>
                <option value="not-available">Not available</option>
              </select>
              <FaAngleDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
            {showError('occupancyCertificate') && (
              <p className="text-xs text-red-500 mt-1">
                {errors.occupancyCertificate}
              </p>
            )}
          </div>

          {/* Lease Registration - Updated options with FaAngleDown icon */}
          <div>
            <label className="block text-xs font-semibold mb-2">
              Lease Registration <span className="text-[#EE2529">*</span>
            </label>
            <div className="relative">
              <select
                name="leaseRegistration"
                value={formData.leaseRegistration}
                onChange={handleInputChange}
                onBlur={() => handleBlur('leaseRegistration')}
                className={`w-full px-3 py-2 border rounded-md text-sm bg-gray-100 focus:outline-none focus:bg-white transition appearance-none pr-10 ${
                  showError('leaseRegistration') ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select Status</option>
                <option value="registered">Registered Lease</option>
                <option value="notorized">Notorized Lease</option>
                <option value="no-document">No lease document</option>
              </select>
              <FaAngleDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
            {showError('leaseRegistration') && (
              <p className="text-xs text-red-500 mt-1">
                {errors.leaseRegistration}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Litigation Status Section */}
      <div>
        <h4 className="text-sm font-bold text-[#EE2529] mb-4">
          Litigation Status
        </h4>

        {/* Any Pending Litigations */}
        <div>
          <label className="block text-xs font-semibold mb-3">
            Any Pending Litigations <span className="text-[#EE2529">*</span>
          </label>

          {/* Radio Buttons */}
          <div className="flex gap-6 mb-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="pendingLitigations"
                value="yes"
                checked={formData.pendingLitigations === "yes"}
                onChange={(e) => handleRadioChange(e.target.value)}
                onBlur={() => handleBlur('pendingLitigations')}
                className="w-4 h-4 accent-[#EE2529]"
              />
              <span className="text-sm">Yes</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="pendingLitigations"
                value="no"
                checked={formData.pendingLitigations === "no"}
                onChange={(e) => handleRadioChange(e.target.value)}
                onBlur={() => handleBlur('pendingLitigations')}
                className="w-4 h-4 accent-[#EE2529]"
              />
              <span className="text-sm">No</span>
            </label>
          </div>

          {showError('pendingLitigations') && (
            <p className="text-xs text-red-500 mb-3">{errors.pendingLitigations}</p>
          )}

          {/* Litigation Note */}
          <div>
            <textarea
              name="litigationNote"
              value={formData.litigationNote}
              onChange={handleInputChange}
              onBlur={() => handleBlur('litigationNote')}
              placeholder="Enter Brief note on Litigation"
              rows="3"
              className={`w-full px-3 py-2 border rounded-md text-sm bg-gray-100 focus:outline-none focus:bg-white transition resize-none ${
                showError('litigationNote') ? "border-red-500" : "border-gray-300"
              }`}
            />
            {showError('litigationNote') && (
              <p className="text-xs text-red-500 mt-1">{errors.litigationNote}</p>
            )}
          </div>
        </div>
      </div>

      {/* Licenses & Certifications Section */}
      <div>
        <h4 className="text-sm font-bold text-[#EE2529] mb-4">
          Licenses & Certifications
        </h4>

        {/* Available Certifications */}
        <div>
          <label className="block text-xs font-semibold mb-3">
            Available Certifications
          </label>
          <p className="text-xs text-gray-500 mb-3">
            Select all applicable licenses and certifications for the property
          </p>
          <div className="space-y-2">
            {/* RERA Checkbox */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="rera"
                checked={formData.certifications.rera}
                onChange={() => handleCertificationChange("rera")}
                className="w-4 h-4 accent-[#EE2529] cursor-pointer"
              />
              <label htmlFor="rera" className="text-sm cursor-pointer">
                RERA
              </label>
            </div>

            {/* LEED Checkbox */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="leed"
                checked={formData.certifications.leed}
                onChange={() => handleCertificationChange("leed")}
                className="w-4 h-4 accent-[#EE2529] cursor-pointer"
              />
              <label htmlFor="leed" className="text-sm cursor-pointer">
                LEED
              </label>
            </div>

            {/* IGBC Checkbox */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="igbc"
                checked={formData.certifications.igbc}
                onChange={() => handleCertificationChange("igbc")}
                className="w-4 h-4 accent-[#EE2529] cursor-pointer"
              />
              <label htmlFor="igbc" className="text-sm cursor-pointer">
                IGBC
              </label>
            </div>

            {/* Other Certifications */}
            <div className="mt-3">
              <p className="text-xs font-semibold text-gray-700 mb-2">
                Add Others (if Any)
              </p>
              <div className="space-y-2">
                {formData.otherCertifications.map((cert, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={cert}
                      onChange={(e) =>
                        handleOtherCertificationChange(index, e.target.value)
                      }
                      onBlur={() => handleBlur('otherCertifications')}
                      placeholder="Enter certification"
                      className={`flex-1 px-3 py-2 border rounded-md text-sm bg-gray-100 focus:outline-none focus:bg-white transition ${
                        showError('otherCertifications') && index < formData.otherCertifications.length - 1 && !cert.trim()
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    {index === formData.otherCertifications.length - 1 ? (
                      <button
                        type="button"
                        onClick={addOtherCertification}
                        className="px-3 py-2 bg-[#EE2529] text-white rounded-md hover:bg-[#C73834] transition flex items-center justify-center min-w-[40px]"
                      >
                        <AiOutlinePlus className="text-lg" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => removeOtherCertification(index)}
                        className="px-3 py-2 bg-gray-300 text-gray-600 rounded-md hover:bg-gray-400 transition min-w-[40px]"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
              </div>
              {showError('otherCertifications') && (
                <p className="text-xs text-red-500 mt-1">{errors.otherCertifications}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default LegalDetails;