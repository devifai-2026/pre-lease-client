// BasicDetails.js
import { useState, useRef, useEffect } from "react";
import { AiOutlinePlus, AiOutlineInfoCircle, AiOutlineClose } from "react-icons/ai";
import { LuFolder, LuUpload, LuX } from "react-icons/lu";

const BasicDetails = ({ onNext, onFormValid }) => {
  // Generate years array: current year to 30 years in the past
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 31 }, (_, i) => currentYear - i);

  // Key amenities options
  const keyAmenitiesOptions = [
    "Swimming Pool",
    "Gymnasium",
    "Club House",
    "Children's Play Area",
    "Jogging Track",
    "Garden/Park",
    "Security 24/7",
    "CCTV Surveillance",
    "Intercom Facility",
    "Fire Safety System",
    "Power Backup",
    "Water Storage",
    "Lift Services",
    "Parking Facility",
    "Visitor Parking",
    "Pet Friendly",
    "Concierge Service",
    "Housekeeping",
    "Maintenance Staff",
    "Waste Management",
    "Rainwater Harvesting",
    "Solar Panels",
    "EV Charging Station",
    "Conference Room",
    "Business Center",
    "Cafeteria",
    "Restaurant",
    "Laundry Service",
    "Dry Cleaning",
    "Car Wash",
    "ATM Facility",
    "Medical Center",
    "Yoga/Meditation Room",
    "Sports Complex",
    "Tennis Court",
    "Basketball Court",
    "Squash Court",
    "Badminton Court"
  ];

  // Building maintenance operators
  const buildingMaintenanceOptions = [
    "CBRE",
    "JLL (Jones Lang LaSalle)",
    "Colliers International",
    "Cushman & Wakefield",
    "Knight Frank",
    "Savills",
    "Godrej Properties",
    "Prestige Group",
    "DLF Limited",
    "Sobha Limited",
    "Brigade Group",
    "Puravankara Limited",
    "Mahindra Lifespace",
    "Tata Housing",
    "Lodha Group",
    "Runwal Group",
    "Hiranandani Group",
    "Shapoorji Pallonji",
    "Oberoi Realty",
    "Sunteck Realty",
    "In-house Maintenance Team",
    "Resident Welfare Association",
    "Third-party Facility Management",
    "Self-maintained by Owner"
  ];

  const [formData, setFormData] = useState({
    propertyType: "",
    builtYear: "",
    buildingGrade: "",
    carpetArea: "",
    carpetAreaUnit: "sqft",
    lastRefurbished: "",
    ownership: "",
    fourWheelerParkings: "",
    twoWheelerParkings: "",
    powerBackup: "",
    numLifts: "",
    hvacType: "",
    furnishingStatus: "",
    buildingMaintained: "",
    keyAmenities: [], // Changed from otherAmenities to keyAmenities
    propertyDescription: "",
  });

  const [errors, setErrors] = useState({});
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [showAreaInfo, setShowAreaInfo] = useState(false);
  const [showGradeInfo, setShowGradeInfo] = useState(false);
  const [showAmenitiesDropdown, setShowAmenitiesDropdown] = useState(false);
  const [amenitiesSearch, setAmenitiesSearch] = useState("");
  const areaInfoButtonRef = useRef(null);
  const gradeInfoButtonRef = useRef(null);
  const amenitiesRef = useRef(null);
  const areaModalRef = useRef(null);
  const gradeModalRef = useRef(null);
  const fileInputRef = useRef(null);
  const formRef = useRef(null);

  // Filter amenities based on search
  const filteredAmenities = keyAmenitiesOptions.filter(amenity =>
    amenity.toLowerCase().includes(amenitiesSearch.toLowerCase())
  );

  // Add useEffect to validate form whenever formData changes
  useEffect(() => {
    validateFormForButton();
  }, [formData]);

  // Close amenities dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close area info modal
      if (
        showAreaInfo &&
        areaModalRef.current &&
        !areaModalRef.current.contains(event.target) &&
        areaInfoButtonRef.current &&
        !areaInfoButtonRef.current.contains(event.target)
      ) {
        setShowAreaInfo(false);
      }

      // Close grade info modal
      if (
        showGradeInfo &&
        gradeModalRef.current &&
        !gradeModalRef.current.contains(event.target) &&
        gradeInfoButtonRef.current &&
        !gradeInfoButtonRef.current.contains(event.target)
      ) {
        setShowGradeInfo(false);
      }
      
      // Close amenities dropdown
      if (showAmenitiesDropdown && 
          amenitiesRef.current && 
          !amenitiesRef.current.contains(event.target)) {
        setShowAmenitiesDropdown(false);
        setAmenitiesSearch("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showAreaInfo, showGradeInfo, showAmenitiesDropdown]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUnitChange = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      carpetAreaUnit: value,
    }));
  };

  // Handle adding key amenities
  const handleAddAmenity = (amenity) => {
    if (!formData.keyAmenities.includes(amenity)) {
      setFormData((prev) => ({
        ...prev,
        keyAmenities: [...prev.keyAmenities, amenity],
      }));
    }
    setAmenitiesSearch("");
  };

  // Handle removing key amenities
  const handleRemoveAmenity = (amenityToRemove) => {
    setFormData((prev) => ({
      ...prev,
      keyAmenities: prev.keyAmenities.filter(amenity => amenity !== amenityToRemove),
    }));
  };

  // Drag and drop handlers
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files) => {
    const fileArray = Array.from(files);

    // Filter for image and video files
    const validFiles = fileArray.filter((file) => {
      const fileType = file.type;
      const isValidImage = fileType.startsWith("image/");
      const isValidVideo = fileType.startsWith("video/");
      const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB limit

      return (isValidImage || isValidVideo) && isValidSize;
    });

    // Create preview objects
    const newFiles = validFiles.map((file) => ({
      file,
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      type: file.type,
      size: file.size,
      preview: file.type.startsWith("image/")
        ? URL.createObjectURL(file)
        : null,
    }));

    setUploadedFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (id) => {
    setUploadedFiles((prev) => {
      const fileToRemove = prev.find((file) => file.id === id);
      if (fileToRemove && fileToRemove.preview) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return prev.filter((file) => file.id !== id);
    });
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getFileIcon = (fileType) => {
    if (fileType.startsWith("image/")) {
      return "🖼️";
    } else if (fileType.startsWith("video/")) {
      return "🎥";
    }
    return "📄";
  };

  // Validation for form submission
  const validateForm = () => {
    const newErrors = {};

    if (!formData.propertyType)
      newErrors.propertyType = "Property Type is required";
    if (!formData.builtYear) newErrors.builtYear = "Built Year is required";
    if (!formData.buildingGrade)
      newErrors.buildingGrade = "Building Grade is required";
    if (!formData.carpetArea) newErrors.carpetArea = "Carpet Area is required";
    if (!formData.ownership) newErrors.ownership = "Ownership is required";
    if (!formData.fourWheelerParkings)
      newErrors.fourWheelerParkings =
        "Number of 4 Wheeler Parkings is required";
    if (!formData.twoWheelerParkings)
      newErrors.twoWheelerParkings = "Number of 2 Wheeler Parkings is required";
    if (!formData.furnishingStatus)
      newErrors.furnishingStatus = "Furnishing Status is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validation for Next button enable/disable
  const validateFormForButton = () => {
    const isValid =
      formData.propertyType !== "" &&
      formData.builtYear !== "" &&
      formData.buildingGrade !== "" &&
      formData.carpetArea !== "" &&
      formData.ownership !== "" &&
      formData.fourWheelerParkings !== "" &&
      formData.twoWheelerParkings !== "" &&
      formData.furnishingStatus !== "";

    onFormValid(isValid);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      onNext({
        ...formData,
        uploadedFiles: uploadedFiles.map((f) => f.file), // Send actual File objects
      });
    }
  };

  // Cleanup preview URLs on unmount
  useEffect(() => {
    return () => {
      uploadedFiles.forEach((file) => {
        if (file.preview) {
          URL.revokeObjectURL(file.preview);
        }
      });
    };
  }, []);

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="space-y-6 font-montserrat relative"
    >
      {/* Header */}
      <div>
        <h3 className="text-lg sm:text-xl font-bold text-[#EE2529] mb-2 text-center">
          Property Overview and Basic Details
        </h3>
      </div>

      {/* Basic Property Details Section */}
      <div>
        <h4 className="text-sm font-bold text-[#EE2529] mb-4">
          Basic Property Details
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Property Type */}
          <div>
            <label className="block text-xs font-semibold mb-2">
              Property Type <span className="text-[#EE2529]">*</span>
            </label>
            <select
              name="propertyType"
              value={formData.propertyType}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md text-sm bg-gray-100 focus:outline-none focus:bg-white transition ${
                errors.propertyType ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select Property Type</option>
              <option value="residential">Residential</option>
              <option value="retail">Retail</option>
              <option value="commercial">Offices</option>
              <option value="industrial">Industrial</option>
              <option value="others">Others</option>
            </select>
            {errors.propertyType && (
              <p className="text-xs text-red-500 mt-1">{errors.propertyType}</p>
            )}
          </div>

          {/* Carpet Area */}
          <div className="relative">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-semibold">
                Carpet Area <span className="text-[#EE2529]">*</span>
              </label>
              <button
                ref={areaInfoButtonRef}
                type="button"
                onClick={() => setShowAreaInfo(!showAreaInfo)}
                className="text-gray-400 hover:text-gray-600 transition relative"
                title="Learn about area units"
              >
                <AiOutlineInfoCircle className="text-lg" />
              </button>
            </div>
            <div className="flex gap-2">
              <input
                type="number"
                name="carpetArea"
                value={formData.carpetArea}
                onChange={handleInputChange}
                placeholder="Carpet Area Official/RERA Figure"
                className={`flex-1 px-3 py-2 border rounded-md text-sm bg-gray-100 focus:outline-none focus:bg-white transition ${
                  errors.carpetArea ? "border-red-500" : "border-gray-300"
                }`}
              />
              <select
                name="carpetAreaUnit"
                value={formData.carpetAreaUnit}
                onChange={handleUnitChange}
                className="w-32 px-3 py-2 border border-gray-300 rounded-md text-sm bg-gray-100 focus:outline-none focus:bg-white transition"
              >
                <option value="sqft">Sq. Feet</option>
                <option value="sqm">Sq. Meters</option>
              </select>
            </div>
            {errors.carpetArea && (
              <p className="text-xs text-red-500 mt-1">{errors.carpetArea}</p>
            )}

            {/* Area Units Modal */}
            {showAreaInfo && (
              <div
                ref={areaModalRef}
                className="absolute z-50 bg-white rounded-lg shadow-xl border border-gray-200 p-4 w-64"
                style={{
                  top: "100%",
                  right: "0",
                  marginTop: "8px",
                }}
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-sm font-bold text-[#EE2529]">
                    Area Units Information
                  </h4>
                  <button
                    type="button"
                    onClick={() => setShowAreaInfo(false)}
                    className="text-gray-400 hover:text-gray-600 text-sm ml-2"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-3">
                  <div>
                    <h5 className="text-xs font-semibold text-gray-700 mb-1">
                      Square Feet (Sq. Ft.)
                    </h5>
                    <p className="text-xs text-gray-600 mb-2">
                      Used in US, Canada, India. 1 sq. ft. = area of 1ft × 1ft
                      square.
                    </p>
                  </div>

                  <div>
                    <h5 className="text-xs font-semibold text-gray-700 mb-1">
                      Square Meters (Sq. M.)
                    </h5>
                    <p className="text-xs text-gray-600 mb-2">
                      SI unit used worldwide. 1 sq. m. = 10.764 sq. ft.
                    </p>
                  </div>

                  <div className="pt-2 border-t border-gray-100">
                    <p className="text-xs font-medium text-gray-700 mb-1">
                      Conversion Formula:
                    </p>
                    <div className="text-xs text-gray-600 space-y-1">
                      <p>• Sq. Ft. → Sq. M.: ÷ 10.764</p>
                      <p>• Sq. M. → Sq. Ft.: × 10.764</p>
                      <p className="text-gray-500 text-xs mt-1">
                        Example: 1000 sq. ft. ≈ 92.9 sq. m.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setShowAreaInfo(false)}
                    className="w-full px-3 py-1.5 bg-[#EE2529] text-white rounded text-xs hover:bg-[#C73834] transition"
                  >
                    Got it
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Built Year */}
          <div>
            <label className="block text-xs font-semibold mb-2">
              Completion Year <span className="text-[#EE2529]">*</span>
            </label>
            <input
              type="number"
              name="builtYear"
              value={formData.builtYear}
              onChange={handleInputChange}
              placeholder="Enter the Built Year"
              className={`w-full px-3 py-2 border rounded-md text-sm bg-gray-100 focus:outline-none focus:bg-white transition ${
                errors.builtYear ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.builtYear && (
              <p className="text-xs text-red-500 mt-1">{errors.builtYear}</p>
            )}
          </div>

          {/* Last Refurbished */}
          <div>
            <label className="block text-xs font-semibold mb-2">
              Last Refurbished
            </label>
            <select
              name="lastRefurbished"
              value={formData.lastRefurbished}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-gray-100 focus:outline-none focus:bg-white transition"
            >
              <option value="">Select Year</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          {/* Building Grade */}
          <div className="relative">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-semibold">
                Building Grade <span className="text-[#EE2529]">*</span>
              </label>
              <button
                ref={gradeInfoButtonRef}
                type="button"
                onClick={() => setShowGradeInfo(!showGradeInfo)}
                className="text-gray-400 hover:text-gray-600 transition relative"
                title="Learn about building grades"
              >
                <AiOutlineInfoCircle className="text-lg" />
              </button>
            </div>
            <select
              name="buildingGrade"
              value={formData.buildingGrade}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md text-sm bg-gray-100 focus:outline-none focus:bg-white transition ${
                errors.buildingGrade ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select Grade</option>
              <option value="A++">A++</option>
              <option value="A+">A+</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
            </select>
            {errors.buildingGrade && (
              <p className="text-xs text-red-500 mt-1">
                {errors.buildingGrade}
              </p>
            )}

            {/* Building Grade Modal */}
            {showGradeInfo && (
              <div
                ref={gradeModalRef}
                className="absolute z-50 bg-white rounded-lg shadow-xl border border-gray-200 p-4 w-64"
                style={{
                  top: "100%",
                  right: "0",
                  marginTop: "8px",
                }}
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-sm font-bold text-[#EE2529]">
                    Building Grade Information
                  </h4>
                  <button
                    type="button"
                    onClick={() => setShowGradeInfo(false)}
                    className="text-gray-400 hover:text-gray-600 text-sm ml-2"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-3">
                  <div>
                    <h5 className="text-xs font-semibold text-gray-700 mb-1">
                      A++ Grade
                    </h5>
                    <p className="text-xs text-gray-600 mb-2">
                      Premium quality buildings with advanced features, highest
                      construction standards, and premium amenities.
                    </p>
                  </div>

                  <div>
                    <h5 className="text-xs font-semibold text-gray-700 mb-1">
                      A+ Grade
                    </h5>
                    <p className="text-xs text-gray-600 mb-2">
                      High-quality buildings with excellent construction, modern
                      amenities, and good maintenance.
                    </p>
                  </div>

                  <div>
                    <h5 className="text-xs font-semibold text-gray-700 mb-1">
                      B+ Grade
                    </h5>
                    <p className="text-xs text-gray-600 mb-2">
                      Good quality buildings with standard construction, basic
                      amenities, and average maintenance.
                    </p>
                  </div>

                  <div>
                    <h5 className="text-xs font-semibold text-gray-700 mb-1">
                      B- Grade
                    </h5>
                    <p className="text-xs text-gray-600 mb-2">
                      Average quality buildings with functional amenities and
                      basic maintenance.
                    </p>
                  </div>

                  <div className="pt-2 border-t border-gray-100">
                    <p className="text-xs font-medium text-gray-700 mb-1">
                      Key Factors:
                    </p>
                    <div className="text-xs text-gray-600 space-y-1">
                      <p>• Construction Quality</p>
                      <p>• Amenities & Facilities</p>
                      <p>• Maintenance Standards</p>
                      <p>• Age & Condition</p>
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setShowGradeInfo(false)}
                    className="w-full px-3 py-1.5 bg-[#EE2529] text-white rounded text-xs hover:bg-[#C73834] transition"
                  >
                    Got it
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Ownership */}
          <div>
            <label className="block text-xs font-semibold mb-2">
              Ownership <span className="text-[#EE2529]">*</span>
            </label>
            <select
              name="ownership"
              value={formData.ownership}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md text-sm bg-gray-100 focus:outline-none focus:bg-white transition ${
                errors.ownership ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select Ownership</option>
              <option value="freehold">Freehold</option>
              <option value="leasehold">Leasehold</option>
              <option value="shared">Jointly-hold</option>
              <option value="shared">Government Owned</option>
            </select>
            {errors.ownership && (
              <p className="text-xs text-red-500 mt-1">{errors.ownership}</p>
            )}
          </div>
        </div>
      </div>

      {/* Parking Details Section */}
      <div>
        <h4 className="text-sm font-bold text-[#EE2529] mb-4">
          Parking Details
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Number of 4 Wheeler Parkings */}
          <div>
            <label className="block text-xs font-semibold mb-2">
              Number of 4 Wheeler Parkings{" "}
              <span className="text-[#EE2529]">*</span>
            </label>
            <input
              type="number"
              name="fourWheelerParkings"
              value={formData.fourWheelerParkings}
              onChange={handleInputChange}
              placeholder="Enter 4 Wheeler Parking Slots"
              className={`w-full px-3 py-2 border rounded-md text-sm bg-gray-100 focus:outline-none focus:bg-white transition ${
                errors.fourWheelerParkings
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {errors.fourWheelerParkings && (
              <p className="text-xs text-red-500 mt-1">
                {errors.fourWheelerParkings}
              </p>
            )}
          </div>

          {/* Number of 2 Wheeler Parkings */}
          <div>
            <label className="block text-xs font-semibold mb-2">
              Number of 2 Wheeler Parkings{" "}
              <span className="text-[#EE2529]">*</span>
            </label>
            <input
              type="number"
              name="twoWheelerParkings"
              value={formData.twoWheelerParkings}
              onChange={handleInputChange}
              placeholder="Enter 2 Wheeler Parking Slots"
              className={`w-full px-3 py-2 border rounded-md text-sm bg-gray-100 focus:outline-none focus:bg-white transition ${
                errors.twoWheelerParkings ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.twoWheelerParkings && (
              <p className="text-xs text-red-500 mt-1">
                {errors.twoWheelerParkings}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Building Amenities & Infrastructure Section */}
      <div>
        <h4 className="text-sm font-bold text-[#EE2529] mb-4">
          Building Amenities & Infrastructure
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Power Backup - Changed to Yes/No dropdown */}
          <div>
            <label className="block text-xs font-semibold mb-2">
              Power Backup
            </label>
            <select
              name="powerBackup"
              value={formData.powerBackup}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-gray-100 focus:outline-none focus:bg-white transition"
            >
              <option value="">Select Power Backup</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          {/* Number of Lifts */}
          <div>
            <label className="block text-xs font-semibold mb-2">
              Number of Lifts
            </label>
            <input
              type="number"
              name="numLifts"
              value={formData.numLifts}
              onChange={handleInputChange}
              placeholder="Enter No of Lifts"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-gray-100 focus:outline-none focus:bg-white transition"
            />
          </div>

          {/* HVAC Type */}
          <div>
            <label className="block text-xs font-semibold mb-2">
              HVAC Type
            </label>
            <select
              name="hvacType"
              value={formData.hvacType}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-gray-100 focus:outline-none focus:bg-white transition"
            >
              <option value="">Select HVAC Type</option>
              <option value="central">Central AC</option>
              <option value="split">Split AC</option>
              <option value="vrf">VRF System</option>
            </select>
          </div>

          {/* Furnishing Status */}
          <div>
            <label className="block text-xs font-semibold mb-2">
              Furnishing Status <span className="text-[#EE2529]">*</span>
            </label>
            <select
              name="furnishingStatus"
              value={formData.furnishingStatus}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md text-sm bg-gray-100 focus:outline-none focus:bg-white transition ${
                errors.furnishingStatus ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select Furnishing Status</option>
              <option value="furnished">Fully Furnished by landowner</option>
              <option value="semi-furnished">
                Semi-Furnished by landowner
              </option>
              <option value="unfurnished">Not Furnished by landowner</option>
            </select>
            {errors.furnishingStatus && (
              <p className="text-xs text-red-500 mt-1">
                {errors.furnishingStatus}
              </p>
            )}
          </div>

          {/* Building Maintained By - Updated with detailed list */}
          <div>
            <label className="block text-xs font-semibold mb-2">
              Building Maintained By
            </label>
            <select
              name="buildingMaintained"
              value={formData.buildingMaintained}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-gray-100 focus:outline-none focus:bg-white transition"
            >
              <option value="">Select Building Maintenance</option>
              {buildingMaintenanceOptions.map((operator, index) => (
                <option key={index} value={operator}>
                  {operator}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Key Amenities Section - Updated with dropdown and chips */}
      <div>
        <h4 className="text-sm font-bold text-[#EE2529] mb-4">Key Amenities</h4>
        <div ref={amenitiesRef} className="relative">
          <label className="block text-xs font-semibold mb-2">
            Select Key Amenities
          </label>
          
          {/* Selected Amenities as Chips - Same design */}
          <div className="space-y-2">
          
            
            {/* Add Amenity Button - Same design */}
            <div className="flex gap-2">
              <input
                type="text"
                value={amenitiesSearch}
                onChange={(e) => setAmenitiesSearch(e.target.value)}
                onFocus={() => setShowAmenitiesDropdown(true)}
                placeholder="Search amenities..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm bg-gray-100 focus:outline-none focus:bg-white transition"
              />
              <button
                type="button"
                onClick={() => setShowAmenitiesDropdown(!showAmenitiesDropdown)}
                className="px-3 py-2 bg-[#EE2529] text-white rounded-md hover:bg-[#C73834] transition"
              >
                <AiOutlinePlus className="text-lg" />
              </button>
            </div>
              <div className="flex flex-wrap gap-2 mb-2">
              {formData.keyAmenities.map((amenity, index) => (
                <div
                  key={index}
                  className="inline-flex items-center gap-1 px-3 py-2 bg-gray-300 text-gray-600 rounded-md hover:bg-gray-400 transition"
                >
                  <span className="text-sm">{amenity}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveAmenity(amenity)}
                    className="ml-1 hover:text-gray-800 transition"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Amenities Dropdown */}
          {showAmenitiesDropdown && (
            <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-xl border border-gray-200 max-h-60 overflow-y-auto">
              {/* Amenities List */}
              <div className="max-h-48 overflow-y-auto">
                {filteredAmenities.length === 0 ? (
                  <div className="px-3 py-2 text-gray-500 text-sm">
                    No amenities found matching "{amenitiesSearch}"
                  </div>
                ) : (
                  filteredAmenities.map((amenity, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleAddAmenity(amenity)}
                      disabled={formData.keyAmenities.includes(amenity)}
                      className={`w-full text-left px-3 py-2 text-sm rounded hover:bg-gray-100 transition ${
                        formData.keyAmenities.includes(amenity)
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'text-gray-700'
                      }`}
                    >
                      {amenity}
                    </button>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Property Description Section */}
      <div>
        <h4 className="text-sm font-bold text-[#EE2529] mb-4">
          Description Of The Property
        </h4>
        <div className="space-y-3">
          {/* Drag & Drop Area */}
          <div
            className={`border-2 border-dashed rounded-md p-8 text-center transition-all duration-300 cursor-pointer ${
              dragActive
                ? "border-[#EE2529] bg-red-50"
                : "border-gray-300 hover:border-gray-400"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileInput}
              multiple
              accept="image/*,video/*"
              className="hidden"
            />

            <div className="flex flex-col items-center gap-3">
              <div className="text-gray-400">
                <LuUpload className="text-3xl mx-auto mb-2" />
                <LuFolder className="text-2xl mx-auto" />
              </div>
              <p className="text-gray-600 text-sm font-medium">
                Drag & Drop Photos / Videos here
              </p>
              <p className="text-gray-500 text-xs">
                or{" "}
                <span className="text-[#EE2529] cursor-pointer">
                  click to browse
                </span>
              </p>
              <p className="text-gray-400 text-xs mt-1">
                Supports JPG, PNG, GIF, MP4, MOV • Max 10MB each
              </p>
            </div>
          </div>

          {/* Uploaded Files Preview */}
          {uploadedFiles.length > 0 && (
            <div className="mt-4">
              <h5 className="text-xs font-semibold text-gray-700 mb-3">
                Uploaded Files ({uploadedFiles.length})
              </h5>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {uploadedFiles.map((file) => (
                  <div
                    key={file.id}
                    className="relative border border-gray-200 rounded-md p-2 hover:border-gray-300 transition"
                  >
                    <button
                      type="button"
                      onClick={() => removeFile(file.id)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600 transition"
                    >
                      <LuX className="text-xs" />
                    </button>

                    {file.preview ? (
                      <div className="aspect-square overflow-hidden rounded bg-gray-100 mb-2">
                        <img
                          src={file.preview}
                          alt={file.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="aspect-square flex items-center justify-center bg-gray-100 rounded mb-2">
                        <span className="text-2xl">
                          {getFileIcon(file.type)}
                        </span>
                      </div>
                    )}

                    <div className="text-xs">
                      <p className="font-medium truncate">{file.name}</p>
                      <p className="text-gray-500">
                        {formatFileSize(file.size)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Additional Description */}
          <textarea
            name="propertyDescription"
            value={formData.propertyDescription}
            onChange={handleInputChange}
            placeholder="Additional Description"
            rows="4"
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-gray-100 focus:outline-none focus:bg-white transition resize-none"
          />
        </div>
      </div>
    </form>
  );
};

export default BasicDetails;