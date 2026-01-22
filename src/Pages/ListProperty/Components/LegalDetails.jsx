// LegalDetails.js
import { useState, useRef, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";

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

  const handleRadioChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      pendingLitigations: value,
    }));
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
  };

  const addOtherCertification = () => {
    setFormData((prev) => ({
      ...prev,
      otherCertifications: [...prev.otherCertifications, ""],
    }));
  };

  const removeOtherCertification = (index) => {
    const newCertifications = formData.otherCertifications.filter(
      (_, i) => i !== index
    );
    setFormData((prev) => ({
      ...prev,
      otherCertifications: newCertifications,
    }));
  };

  // Validation for form submission
  const validateForm = () => {
    const newErrors = {};

    if (!formData.titleStatus) newErrors.titleStatus = "Title Status is required";
    if (!formData.occupancyCertificate)
      newErrors.occupancyCertificate = "Occupancy Certificate is required";
    if (!formData.leaseRegistration)
      newErrors.leaseRegistration = "Lease Registration is required";
    if (!formData.pendingLitigations)
      newErrors.pendingLitigations = "Please select litigation status";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validation for Next button enable/disable
  const validateFormForButton = () => {
    const isValid =
      formData.titleStatus !== "" &&
      formData.occupancyCertificate !== "" &&
      formData.leaseRegistration !== "" &&
      formData.pendingLitigations !== "";

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
          Legal & Title Details
        </h3>
      </div>

      {/* Title & Ownership Status Section */}
      <div>
        <h4 className="text-sm font-bold text-[#EE2529] mb-4">
          Title & Ownership Status
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Title Status - Updated dropdown */}
          <div>
            <label className="block text-xs font-semibold mb-2">
              Title Status <span className="text-[#EE2529]">*</span>
            </label>
            <select
              name="titleStatus"
              value={formData.titleStatus}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md text-sm bg-gray-100 focus:outline-none focus:bg-white transition ${
                errors.titleStatus ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select Status</option>
              <option value="no-litigation">No Litigation</option>
              <option value="pending-litigation">Pending Litigation</option>
            </select>
            {errors.titleStatus && (
              <p className="text-xs text-red-500 mt-1">{errors.titleStatus}</p>
            )}
          </div>

          {/* Occupancy Certificate - Updated options */}
          <div>
            <label className="block text-xs font-semibold mb-2">
              Occupancy Certificate (OC) <span className="text-[#EE2529]">*</span>
            </label>
            <select
              name="occupancyCertificate"
              value={formData.occupancyCertificate}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md text-sm bg-gray-100 focus:outline-none focus:bg-white transition ${
                errors.occupancyCertificate ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select Status</option>
              <option value="available">Yes, available</option>
              <option value="in-process">In Process</option>
              <option value="not-available">Not available</option>
            </select>
            {errors.occupancyCertificate && (
              <p className="text-xs text-red-500 mt-1">
                {errors.occupancyCertificate}
              </p>
            )}
          </div>

          {/* Lease Registration - Updated options */}
          <div>
            <label className="block text-xs font-semibold mb-2">
              Lease Registration <span className="text-[#EE2529]">*</span>
            </label>
            <select
              name="leaseRegistration"
              value={formData.leaseRegistration}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md text-sm bg-gray-100 focus:outline-none focus:bg-white transition ${
                errors.leaseRegistration ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select Status</option>
              <option value="registered">Registered Lease</option>
              <option value="notorized">Notorized Lease</option>
              <option value="no-document">No lease document</option>
            </select>
            {errors.leaseRegistration && (
              <p className="text-xs text-red-500 mt-1">
                {errors.leaseRegistration}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Litigation Status Section - Moved here from Title Status */}
      <div>
        <h4 className="text-sm font-bold text-[#EE2529] mb-4">
          Litigation Status
        </h4>

        {/* Any Pending Litigations */}
        <div>
          <label className="block text-xs font-semibold mb-3">
            Any Pending Litigations <span className="text-[#EE2529]">*</span>
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
                className="w-4 h-4 accent-[#EE2529]"
              />
              <span className="text-sm">No</span>
            </label>
          </div>

          {errors.pendingLitigations && (
            <p className="text-xs text-red-500 mb-3">{errors.pendingLitigations}</p>
          )}

          {/* Litigation Note */}
          <textarea
            name="litigationNote"
            value={formData.litigationNote}
            onChange={handleInputChange}
            placeholder="Enter Brief note on Litigation"
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-gray-100 focus:outline-none focus:bg-white transition resize-none"
          />
        </div>
      </div>

      {/* Licenses & Certifications Section - Fixed layout */}
      <div>
        <h4 className="text-sm font-bold text-[#EE2529] mb-4">
          Licenses & Certifications
        </h4>

        {/* Available Certifications - Full width without empty left side */}
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
                      placeholder="Enter certification"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm bg-gray-100 focus:outline-none focus:bg-white transition"
                    />
                    {index === formData.otherCertifications.length - 1 ? (
                      <button
                        type="button"
                        onClick={addOtherCertification}
                        className="px-3 py-2 bg-[#EE2529] text-white rounded-md hover:bg-[#C73834] transition flex items-center justify-center"
                      >
                        <AiOutlinePlus className="text-lg" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => removeOtherCertification(index)}
                        className="px-3 py-2 bg-gray-300 text-gray-600 rounded-md hover:bg-gray-400 transition"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default LegalDetails;