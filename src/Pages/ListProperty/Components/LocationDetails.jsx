// LocationDetails.js
import { useState, useRef, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";

const LocationDetails = ({ onNext, onFormValid }) => {
  const [formData, setFormData] = useState({
    microMarket: "",
    city: "",
    state: "",
    connectivity: [
      {
        type: "",
        name: "",
        distance: "",
      },
    ],
    demandDrivers: "",
    futureInfrastructure: "",
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

  const handleConnectivityChange = (index, field, value) => {
    const newConnectivity = [...formData.connectivity];
    newConnectivity[index][field] = value;
    setFormData((prev) => ({
      ...prev,
      connectivity: newConnectivity,
    }));
  };

  const addConnectivity = () => {
    setFormData((prev) => ({
      ...prev,
      connectivity: [
        ...prev.connectivity,
        {
          type: "",
          name: "",
          distance: "",
        },
      ],
    }));
  };

  const removeConnectivity = (index) => {
    const newConnectivity = formData.connectivity.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      connectivity: newConnectivity.length > 0 ? newConnectivity : [{ type: "", name: "", distance: "" }],
    }));
  };

  // Validation for form submission
  const validateForm = () => {
    const newErrors = {};

    if (!formData.microMarket) newErrors.microMarket = "Micro Market is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.state) newErrors.state = "State is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validation for Next button enable/disable
  const validateFormForButton = () => {
    const isValid =
      formData.microMarket !== "" &&
      formData.city !== "" &&
      formData.state !== "";

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
          Location & Market Details
        </h3>
      </div>

      {/* Location Details Section */}
      <div>
        <h4 className="text-sm font-bold text-[#EE2529] mb-4">Location Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Micro Market */}
          <div>
            <label className="block text-xs font-semibold mb-2">
              Micro Market <span className="text-[#EE2529]">*</span>
            </label>
            <input
              type="text"
              name="microMarket"
              value={formData.microMarket}
              onChange={handleInputChange}
              placeholder="Enter Micro Market"
              className={`w-full px-3 py-2 border rounded-md text-sm bg-gray-100 focus:outline-none focus:bg-white transition ${
                errors.microMarket ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.microMarket && (
              <p className="text-xs text-red-500 mt-1">{errors.microMarket}</p>
            )}
          </div>

          {/* City */}
          <div>
            <label className="block text-xs font-semibold mb-2">
              City <span className="text-[#EE2529]">*</span>
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              placeholder="Enter City Name"
              className={`w-full px-3 py-2 border rounded-md text-sm bg-gray-100 focus:outline-none focus:bg-white transition ${
                errors.city ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.city && (
              <p className="text-xs text-red-500 mt-1">{errors.city}</p>
            )}
          </div>

          {/* State */}
          <div>
            <label className="block text-xs font-semibold mb-2">
              State <span className="text-[#EE2529]">*</span>
            </label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              placeholder="Enter State Name"
              className={`w-full px-3 py-2 border rounded-md text-sm bg-gray-100 focus:outline-none focus:bg-white transition ${
                errors.state ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.state && (
              <p className="text-xs text-red-500 mt-1">{errors.state}</p>
            )}
          </div>
        </div>
      </div>

      {/* Connectivity Details Section */}
      <div>
        <h4 className="text-sm font-bold text-[#EE2529] mb-4">Connectivity Details</h4>
        
        {/* Connectivity Headers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
          <div className="text-xs font-semibold text-gray-700">Type</div>
          <div className="text-xs font-semibold text-gray-700">Name</div>
          <div className="text-xs font-semibold text-gray-700">Distance</div>
        </div>

        {/* Connectivity Items */}
        <div className="space-y-3 mb-4">
          {formData.connectivity.map((conn, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Type */}
              <select
                value={conn.type}
                onChange={(e) => handleConnectivityChange(index, "type", e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-gray-100 focus:outline-none focus:bg-white transition"
              >
                <option value="">Select Type of Connectivity</option>
                <option value="airport">Airport</option>
                <option value="railway">Railway Station</option>
                <option value="metro">Metro Station</option>
                <option value="highway">Highway</option>
                <option value="bus-station">Bus Station</option>
                <option value="hospital">Hospital</option>
                <option value="school">School</option>
                <option value="shopping">Shopping Mall</option>
                <option value="office-park">Office Park</option>
              </select>

              {/* Name */}
              <input
                type="text"
                value={conn.name}
                onChange={(e) => handleConnectivityChange(index, "name", e.target.value)}
                placeholder="Enter the Name of connectivity"
                className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-gray-100 focus:outline-none focus:bg-white transition"
              />

              {/* Distance */}
              <input
                type="number"
                value={conn.distance}
                onChange={(e) => handleConnectivityChange(index, "distance", e.target.value)}
                placeholder="Enter the Distance in KMs"
                min="0"
                className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-gray-100 focus:outline-none focus:bg-white transition"
              />
            </div>
          ))}
        </div>

        {/* Add Connectivity Button */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={addConnectivity}
            className="px-6 py-2 bg-[#EE2529] text-white rounded-md hover:bg-[#C73834] transition font-medium text-sm flex items-center gap-2"
          >
            <AiOutlinePlus className="text-lg" />
            Add Connectivity
          </button>
        </div>
      </div>

      {/* Demand Drivers Section */}
      <div>
        <h4 className="text-sm font-bold text-[#EE2529] mb-4">Demand Drivers</h4>
        <div>
          <label className="block text-xs font-semibold mb-2">
            Key factors driving property demand
          </label>
          <textarea
            name="demandDrivers"
            value={formData.demandDrivers}
            onChange={handleInputChange}
            placeholder="e.g., Proximity to Infosys/Wipro campuses"
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-gray-100 focus:outline-none focus:bg-white transition resize-none"
          />
        </div>
      </div>

      {/* Future Infrastructure Section */}
      <div>
        <h4 className="text-sm font-bold text-[#EE2529] mb-4">Future Infrastructure</h4>
        <div>
          <label className="block text-xs font-semibold mb-2">
            Upcoming developments and projects
          </label>
          <textarea
            name="futureInfrastructure"
            value={formData.futureInfrastructure}
            onChange={handleInputChange}
            placeholder="e.g., Upcoming Ring Road - ETA 2028"
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-gray-100 focus:outline-none focus:bg-white transition resize-none"
          />
        </div>
      </div>
    </form>
  );
};

export default LocationDetails;