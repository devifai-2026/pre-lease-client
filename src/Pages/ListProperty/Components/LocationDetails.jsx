// LocationDetails.js
import { useState, useRef, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { MdClose } from "react-icons/md";

const INDIAN_STATES = [
  "Andaman and Nicobar Islands",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chandigarh",
  "Chhattisgarh",
  "Dadra and Nagar Haveli",
  "Daman and Diu",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Ladakh",
  "Lakshadweep",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Puducherry",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

const CITY_BY_STATE = {
  "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Amaravati", "Tirupati"],
  "Arunachal Pradesh": ["Itanagar", "Naharlagun"],
  Assam: ["Guwahati", "Dibrugarh", "Silchar"],
  Bihar: ["Patna", "Gaya", "Bhagalpur"],
  Chandigarh: ["Chandigarh"],
  Chhattisgarh: ["Raipur", "Durg", "Bilaspur"],
  Delhi: ["New Delhi", "Delhi"],
  Goa: ["Panaji", "Margao"],
  Gujarat: ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Gandhinagar"],
  Haryana: ["Gurgaon", "Faridabad", "Hisar", "Panipat"],
  "Himachal Pradesh": ["Shimla", "Manali", "Kangra"],
  Jharkhand: ["Ranchi", "Jamshedpur", "Dhanbad"],
  Karnataka: ["Bangalore", "Mysore", "Pune", "Mangalore", "Belgaum"],
  Kerala: ["Kochi", "Thiruvananthapuram", "Kozhikode"],
  "Madhya Pradesh": ["Indore", "Bhopal", "Jabalpur"],
  Maharashtra: ["Mumbai", "Pune", "Nagpur", "Thane", "Aurangabad"],
  Manipur: ["Imphal"],
  Meghalaya: ["Shillong"],
  Mizoram: ["Aizawl"],
  Nagaland: ["Kohima"],
  Odisha: ["Bhubaneswar", "Cuttack", "Rourkela"],
  Puducherry: ["Puducherry", "Yanam"],
  Punjab: ["Chandigarh", "Ludhiana", "Amritsar", "Jalandhar"],
  Rajasthan: ["Jaipur", "Jodhpur", "Udaipur", "Kota"],
  Sikkim: ["Gangtok"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Salem"],
  Telangana: ["Hyderabad", "Secundrabad", "Warangal"],
  Tripura: ["Agartala"],
  "Uttar Pradesh": ["Lucknow", "Noida", "Ghaziabad", "Kanpur", "Varanasi"],
  Uttarakhand: ["Dehradun", "Haridwar", "Nainital"],
  "West Bengal": ["Kolkata", "Darjeeling", "Siliguri"],
};

const DEFAULT_CONNECTIVITY = [
  { type: "railway", name: "", distance: "" },
  { type: "airport", name: "", distance: "" },
  { type: "metro", name: "", distance: "" },
];

const LocationDetails = ({ onNext, onFormValid }) => {
  const [formData, setFormData] = useState({
    microMarket: "",
    city: "",
    state: "",
    connectivity: DEFAULT_CONNECTIVITY,
    demandDrivers: "",
    futureInfrastructure: "",
    faqs: [],
  });

  const [errors, setErrors] = useState({});
  const formRef = useRef(null);
  const [showConnectivityInfo, setShowConnectivityInfo] = useState(false);
  const [showDemandDriversInfo, setShowDemandDriversInfo] = useState(false);
  const [showFutureInfrastructureInfo, setShowFutureInfrastructureInfo] = useState(false);

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
    if (formData.connectivity.length < 6) {
      setFormData((prev) => ({
        ...prev,
        connectivity: [
          ...prev.connectivity,
          { type: "", name: "", distance: "" },
        ],
      }));
    }
  };

  const removeConnectivity = (index) => {
    if (formData.connectivity.length > 3) {
      const newConnectivity = formData.connectivity.filter((_, i) => i !== index);
      setFormData((prev) => ({
        ...prev,
        connectivity: newConnectivity,
      }));
    }
  };

  const addFaq = () => {
    setFormData((prev) => ({
      ...prev,
      faqs: [...prev.faqs, { id: Date.now(), question: "", answer: "" }],
    }));
  };

  const handleFaqChange = (id, field, value) => {
    setFormData((prev) => ({
      ...prev,
      faqs: prev.faqs.map((faq) =>
        faq.id === id ? { ...faq, [field]: value } : faq
      ),
    }));
  };

  const removeFaq = (id) => {
    setFormData((prev) => ({
      ...prev,
      faqs: prev.faqs.filter((faq) => faq.id !== id),
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.microMarket) newErrors.microMarket = "Micro Market is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.state) newErrors.state = "State is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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

  const availableCities = formData.state ? (CITY_BY_STATE[formData.state] || []) : [];

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

          {/* State */}
          <div>
            <label className="block text-xs font-semibold mb-2">
              State <span className="text-[#EE2529]">*</span>
            </label>
            <select
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md text-sm bg-gray-100 focus:outline-none focus:bg-white transition ${
                errors.state ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select State</option>
              {INDIAN_STATES.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
            {errors.state && (
              <p className="text-xs text-red-500 mt-1">{errors.state}</p>
            )}
          </div>

          {/* City */}
          <div>
            <label className="block text-xs font-semibold mb-2">
              City <span className="text-[#EE2529]">*</span>
            </label>
            <select
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              disabled={!formData.state}
              className={`w-full px-3 py-2 border rounded-md text-sm bg-gray-100 focus:outline-none focus:bg-white transition ${
                errors.city ? "border-red-500" : "border-gray-300"
              } ${!formData.state ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <option value="">Select City</option>
              {availableCities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            {errors.city && (
              <p className="text-xs text-red-500 mt-1">{errors.city}</p>
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
          <div className="flex items-center gap-2">
            <div className="text-xs font-semibold text-gray-700">Distance</div>
            <div className="relative">
              <button
                type="button"
                className="w-4 h-4 rounded-full bg-gray-300 flex items-center justify-center text-xs hover:bg-gray-400 transition"
                onClick={() => setShowConnectivityInfo(!showConnectivityInfo)}
                onMouseEnter={() => setShowConnectivityInfo(true)}
                onMouseLeave={() => setShowConnectivityInfo(false)}
              >
                i
              </button>
              {showConnectivityInfo && (
                <div className="absolute left-0 bottom-full mb-2 w-64 p-3 bg-gray-800 text-white text-xs rounded-md shadow-lg z-10">
                  Add nearby connectivity details such as railway stations, airports, metro stations, highways, and other important locations with their distances in kilometers.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Connectivity Items */}
        <div className="space-y-3 mb-4">
          {formData.connectivity.map((conn, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
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

              {/* Distance and Delete Button */}
              <div className="flex gap-2">
                <input
                  type="number"
                  value={conn.distance}
                  onChange={(e) => handleConnectivityChange(index, "distance", e.target.value)}
                  placeholder="Enter the Distance in KMs"
                  min="0"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm bg-gray-100 focus:outline-none focus:bg-white transition"
                />
                {index >= 3 && (
                  <button
                    type="button"
                    onClick={() => removeConnectivity(index)}
                    className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition flex items-center justify-center"
                    title="Delete connectivity"
                  >
                    <MdClose className="text-lg" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Add Connectivity Button */}
        {formData.connectivity.length < 6 && (
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
        )}
      </div>

      {/* Demand Drivers Section */}
      <div>
        <h4 className="text-sm font-bold text-[#EE2529] mb-4">Demand Drivers</h4>
        <div>
          <div className="flex items-center gap-2 mb-2">
            <label className="block text-xs font-semibold">
              Key factors driving property demand
            </label>
            <div className="relative">
              <button
                type="button"
                className="w-4 h-4 rounded-full bg-gray-300 flex items-center justify-center text-xs hover:bg-gray-400 transition"
                onClick={() => setShowDemandDriversInfo(!showDemandDriversInfo)}
                onMouseEnter={() => setShowDemandDriversInfo(true)}
                onMouseLeave={() => setShowDemandDriversInfo(false)}
              >
                i
              </button>
              {showDemandDriversInfo && (
                <div className="absolute left-0 bottom-full mb-2 w-64 p-3 bg-gray-800 text-white text-xs rounded-md shadow-lg z-10">
                  Describe the key factors driving demand for properties in this location, such as proximity to major employment centers, educational institutions, or commercial hubs.
                </div>
              )}
            </div>
          </div>
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
          <div className="flex items-center gap-2 mb-2">
            <label className="block text-xs font-semibold">
              Upcoming developments and projects
            </label>
            <div className="relative">
              <button
                type="button"
                className="w-4 h-4 rounded-full bg-gray-300 flex items-center justify-center text-xs hover:bg-gray-400 transition"
                onClick={() => setShowFutureInfrastructureInfo(!showFutureInfrastructureInfo)}
                onMouseEnter={() => setShowFutureInfrastructureInfo(true)}
                onMouseLeave={() => setShowFutureInfrastructureInfo(false)}
              >
                i
              </button>
              {showFutureInfrastructureInfo && (
                <div className="absolute left-0 bottom-full mb-2 w-64 p-3 bg-gray-800 text-white text-xs rounded-md shadow-lg z-10">
                  List any upcoming infrastructure projects, developments, or improvements planned for the area, such as new roads, metro lines, or commercial complexes.
                </div>
              )}
            </div>
          </div>
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

      {/* FAQ Section */}
      <div>
        <h4 className="text-sm font-bold text-[#EE2529] mb-4">Frequently Asked Questions</h4>
        <div className="space-y-4 mb-4">
          {formData.faqs.map((faq) => (
            <div key={faq.id} className="border border-gray-300 rounded-lg p-4 bg-gray-50">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-2">Question</label>
                  <input
                    type="text"
                    value={faq.question}
                    onChange={(e) => handleFaqChange(faq.id, "question", e.target.value)}
                    placeholder="Enter FAQ question"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:bg-white transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-2">Answer</label>
                  <textarea
                    value={faq.answer}
                    onChange={(e) => handleFaqChange(faq.id, "answer", e.target.value)}
                    placeholder="Enter FAQ answer"
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:bg-white transition resize-none"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => removeFaq(faq.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition text-sm font-medium"
                  >
                    Remove FAQ
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add FAQ Button */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={addFaq}
            className="px-6 py-2 bg-[#EE2529] text-white rounded-md hover:bg-[#C73834] transition font-medium text-sm flex items-center gap-2"
          >
            <AiOutlinePlus className="text-lg" />
            Add FAQ
          </button>
        </div>
      </div>
    </form>
  );
};

export default LocationDetails;