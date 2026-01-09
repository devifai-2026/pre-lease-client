// BasicDetails.js
import { useState, useRef, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { LuFolder, LuUpload, LuX } from "react-icons/lu";

const BasicDetails = ({ onNext, onFormValid }) => {
  const [formData, setFormData] = useState({
    propertyType: "",
    builtYear: "",
    buildingGrade: "",
    carpetArea: "",
    lastRefurbished: "",
    ownership: "",
    parkingSlots: "",
    parkingRatio: "",
    powerBackup: "",
    numLifts: "",
    hvacType: "",
    furnishingStatus: "",
    buildingMaintained: "",
    otherAmenities: [""],
    propertyDescription: "",
  });

  const [errors, setErrors] = useState({});
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const fileInputRef = useRef(null);
  const formRef = useRef(null);

  // Add useEffect to validate form whenever formData changes
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

  const handleAmenityChange = (index, value) => {
    const newAmenities = [...formData.otherAmenities];
    newAmenities[index] = value;
    setFormData((prev) => ({
      ...prev,
      otherAmenities: newAmenities,
    }));
  };

  const addAmenity = () => {
    setFormData((prev) => ({
      ...prev,
      otherAmenities: [...prev.otherAmenities, ""],
    }));
  };

  const removeAmenity = (index) => {
    const newAmenities = formData.otherAmenities.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      otherAmenities: newAmenities,
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
    const validFiles = fileArray.filter(file => {
      const fileType = file.type;
      const isValidImage = fileType.startsWith('image/');
      const isValidVideo = fileType.startsWith('video/');
      const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB limit
      
      return (isValidImage || isValidVideo) && isValidSize;
    });

    // Create preview objects
    const newFiles = validFiles.map(file => ({
      file,
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      type: file.type,
      size: file.size,
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null,
    }));

    setUploadedFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (id) => {
    setUploadedFiles(prev => {
      const fileToRemove = prev.find(file => file.id === id);
      if (fileToRemove && fileToRemove.preview) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return prev.filter(file => file.id !== id);
    });
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileType) => {
    if (fileType.startsWith('image/')) {
      return '🖼️';
    } else if (fileType.startsWith('video/')) {
      return '🎥';
    }
    return '📄';
  };

  // Validation for form submission
  const validateForm = () => {
    const newErrors = {};

    if (!formData.propertyType) newErrors.propertyType = "Property Type is required";
    if (!formData.builtYear) newErrors.builtYear = "Built Year is required";
    if (!formData.buildingGrade) newErrors.buildingGrade = "Building Grade is required";
    if (!formData.carpetArea) newErrors.carpetArea = "Carpet Area is required";
    if (!formData.ownership) newErrors.ownership = "Ownership is required";
    if (!formData.parkingSlots) newErrors.parkingSlots = "Number of Parking Slots is required";
    if (!formData.furnishingStatus) newErrors.furnishingStatus = "Furnishing Status is required";

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
      formData.parkingSlots !== "" &&
      formData.furnishingStatus !== "";
    
    onFormValid(isValid);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onNext({
        ...formData,
        uploadedFiles: uploadedFiles.map(f => f.file) // Send actual File objects
      });
    }
  };

  // Cleanup preview URLs on unmount
  useEffect(() => {
    return () => {
      uploadedFiles.forEach(file => {
        if (file.preview) {
          URL.revokeObjectURL(file.preview);
        }
      });
    };
  }, []);

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 font-montserrat">
      {/* Header */}
      <div>
        <h3 className="text-lg sm:text-xl font-bold text-[#EE2529] mb-2 text-center">
          Property Overview and Basic Details
        </h3>
      </div>

      {/* Basic Property Details Section */}
      <div>
        <h4 className="text-sm font-bold text-[#EE2529] mb-4">Basic Property Details</h4>
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
              <option value="commercial">Commercial</option>
              <option value="residential">Residential</option>
              <option value="retail">Retail</option>
              <option value="industrial">Industrial</option>
            </select>
            {errors.propertyType && (
              <p className="text-xs text-red-500 mt-1">{errors.propertyType}</p>
            )}
          </div>

          {/* Carpet Area */}
          <div>
            <label className="block text-xs font-semibold mb-2">
              Carpet Area (sq ft) <span className="text-[#EE2529]">*</span>
            </label>
            <input
              type="number"
              name="carpetArea"
              value={formData.carpetArea}
              onChange={handleInputChange}
              placeholder="Carpet Area Official/RERA Figure"
              className={`w-full px-3 py-2 border rounded-md text-sm bg-gray-100 focus:outline-none focus:bg-white transition ${
                errors.carpetArea ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.carpetArea && (
              <p className="text-xs text-red-500 mt-1">{errors.carpetArea}</p>
            )}
          </div>

          {/* Built Year */}
          <div>
            <label className="block text-xs font-semibold mb-2">
              Built Year <span className="text-[#EE2529]">*</span>
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
            <label className="block text-xs font-semibold mb-2">Last Refurbished</label>
            <input
              type="number"
              name="lastRefurbished"
              value={formData.lastRefurbished}
              onChange={handleInputChange}
              placeholder="Enter Last Refurbished year"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-gray-100 focus:outline-none focus:bg-white transition"
            />
          </div>

          {/* Building Grade */}
          <div>
            <label className="block text-xs font-semibold mb-2">
              Building Grade <span className="text-[#EE2529]">*</span>
            </label>
            <select
              name="buildingGrade"
              value={formData.buildingGrade}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md text-sm bg-gray-100 focus:outline-none focus:bg-white transition ${
                errors.buildingGrade ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select Grade</option>
              <option value="A">Grade A</option>
              <option value="B">Grade B</option>
              <option value="C">Grade C</option>
            </select>
            {errors.buildingGrade && (
              <p className="text-xs text-red-500 mt-1">{errors.buildingGrade}</p>
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
              <option value="shared">Shared</option>
            </select>
            {errors.ownership && (
              <p className="text-xs text-red-500 mt-1">{errors.ownership}</p>
            )}
          </div>
        </div>
      </div>

      {/* Parking Details Section */}
      <div>
        <h4 className="text-sm font-bold text-[#EE2529] mb-4">Parking Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Number of Parking Slots */}
          <div>
            <label className="block text-xs font-semibold mb-2">
              Number of Parking Slots <span className="text-[#EE2529]">*</span>
            </label>
            <input
              type="number"
              name="parkingSlots"
              value={formData.parkingSlots}
              onChange={handleInputChange}
              placeholder="Enter Parking Slots"
              className={`w-full px-3 py-2 border rounded-md text-sm bg-gray-100 focus:outline-none focus:bg-white transition ${
                errors.parkingSlots ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.parkingSlots && (
              <p className="text-xs text-red-500 mt-1">{errors.parkingSlots}</p>
            )}
          </div>

          {/* Parking Ratio */}
          <div>
            <label className="block text-xs font-semibold mb-2">Parking Ratio</label>
            <input
              type="text"
              name="parkingRatio"
              value={formData.parkingRatio}
              onChange={handleInputChange}
              placeholder="Enter Parking per sq ft Carpet Area"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-gray-100 focus:outline-none focus:bg-white transition"
            />
          </div>
        </div>
      </div>

      {/* Building Amenities & Infrastructure Section */}
      <div>
        <h4 className="text-sm font-bold text-[#EE2529] mb-4">
          Building Amenities & Infrastructure
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Power Backup */}
          <div>
            <label className="block text-xs font-semibold mb-2">Power Backup (kVA)</label>
            <input
              type="text"
              name="powerBackup"
              value={formData.powerBackup}
              onChange={handleInputChange}
              placeholder="Enter in kVA"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-gray-100 focus:outline-none focus:bg-white transition"
            />
          </div>

          {/* Number of Lifts */}
          <div>
            <label className="block text-xs font-semibold mb-2">Number of Lifts</label>
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
            <label className="block text-xs font-semibold mb-2">HVAC Type</label>
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
              <option value="furnished">Furnished</option>
              <option value="semi-furnished">Semi-Furnished</option>
              <option value="unfurnished">Unfurnished</option>
            </select>
            {errors.furnishingStatus && (
              <p className="text-xs text-red-500 mt-1">{errors.furnishingStatus}</p>
            )}
          </div>

          {/* Building Maintained By */}
          <div>
            <label className="block text-xs font-semibold mb-2">Building Maintained By</label>
            <select
              name="buildingMaintained"
              value={formData.buildingMaintained}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-gray-100 focus:outline-none focus:bg-white transition"
            >
              <option value="">Select Building Maintenance</option>
              <option value="owner">Owner</option>
              <option value="management">Management Company</option>
              <option value="association">Association</option>
            </select>
          </div>
        </div>
      </div>

      {/* Key Amenities Section */}
      <div>
        <h4 className="text-sm font-bold text-[#EE2529] mb-4">Key Amenities</h4>
        <div>
          <label className="block text-xs font-semibold mb-2">Other Amenities</label>
          <div className="space-y-2">
            {formData.otherAmenities.map((amenity, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={amenity}
                  onChange={(e) => handleAmenityChange(index, e.target.value)}
                  placeholder="Add other Amenities"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm bg-gray-100 focus:outline-none focus:bg-white transition"
                />
                {index === formData.otherAmenities.length - 1 ? (
                  <button
                    type="button"
                    onClick={addAmenity}
                    className="px-3 py-2 bg-[#EE2529] text-white rounded-md hover:bg-[#C73834] transition"
                  >
                    <AiOutlinePlus className="text-lg" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => removeAmenity(index)}
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

      {/* Property Description Section */}
      <div>
        <h4 className="text-sm font-bold text-[#EE2529] mb-4">Description Of The Property</h4>
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
                or <span className="text-[#EE2529] cursor-pointer">click to browse</span>
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
                        <span className="text-2xl">{getFileIcon(file.type)}</span>
                      </div>
                    )}
                    
                    <div className="text-xs">
                      <p className="font-medium truncate">{file.name}</p>
                      <p className="text-gray-500">{formatFileSize(file.size)}</p>
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