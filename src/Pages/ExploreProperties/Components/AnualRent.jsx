import React, { useState, useEffect, useRef } from 'react';

// Annual Rent Component
const AnnualRent = ({ onRentChange, initialRent }) => {
  const [rentRange, setRentRange] = useState([0, 50]); // In Lakhs
  const [minRent, setMinRent] = useState(initialRent?.min || 0);
  const [maxRent, setMaxRent] = useState(initialRent?.max || 5000000); // 50 Lakhs
  const [activeThumb, setActiveThumb] = useState(null); 
  const sliderRef = useRef(null);

  useEffect(() => {
    if (initialRent) {
      setMinRent(Math.max(initialRent.min, 0));
      setMaxRent(Math.max(initialRent.max, 100000));
      setRentRange([
        Math.max(Math.floor(initialRent.min / 100000), 0),
        Math.min(Math.max(Math.floor(initialRent.max / 100000), 1), 50)
      ]);
    }
  }, [initialRent]);

  // Convert value to percentage (0-50 Lakhs range)
  const valueToPercent = (value) => {
    return ((Math.min(Math.max(value, 0), 50) - 0) / (50 - 0)) * 100;
  };

  // Handle slider click or drag for both min and max
  const handleSliderInteraction = (e, thumbType) => {
    if (!sliderRef.current || !thumbType) return;
    
    const rect = sliderRef.current.getBoundingClientRect();
    let x;
    
    if (e.type.includes('touch')) {
      x = e.touches[0].clientX - rect.left;
    } else {
      x = e.clientX - rect.left;
    }
    
    const percent = Math.min(Math.max((x / rect.width) * 100, 0), 100);
    const value = Math.round((percent / 100) * 50);
    
    updateSliderValue(value, thumbType);
  };

  const updateSliderValue = (value, thumbType) => {
    value = Math.min(Math.max(value, 0), 50); // Clamp between 0-50
    
    if (thumbType === 'min') {
      if (value <= rentRange[1] - 1) { // Keep at least 1 gap between min and max
        const newMinRent = Math.max(value * 100000, 0);
        setRentRange([value, rentRange[1]]);
        setMinRent(newMinRent);
        onRentChange?.({ min: newMinRent, max: maxRent });
      }
    } else if (thumbType === 'max') {
      if (value >= rentRange[0] + 1) { // Keep at least 1 gap between min and max
        const newMaxRent = value * 100000;
        setRentRange([rentRange[0], value]);
        setMaxRent(newMaxRent);
        onRentChange?.({ min: minRent, max: newMaxRent });
      }
    }
  };

  // Handle input field changes
  const handleInputChange = (e, type) => {
    let value = e.target.value;
    
    // Allow empty string for typing - just update the displayed value
    if (value === '') {
      if (type === 'min') {
        setMinRent('');
      } else {
        setMaxRent('');
      }
      return;
    }
    
    // Parse the value
    const numValue = parseInt(value, 10);
    
    // Check if it's a valid number
    if (isNaN(numValue)) return;
    
    // Ensure no negative values
    if (numValue < 0) return;
    
    if (type === 'min') {
      // Cap the value to reasonable maximum
      const cappedValue = Math.min(numValue, 4900000); // Max 49 lakhs to keep 1 lakh gap
      
      // Calculate lakh value for slider (max 49 to keep gap)
      const lakhValue = Math.min(Math.floor(cappedValue / 100000), 49);
      
      setMinRent(cappedValue);
      setRentRange([lakhValue, rentRange[1]]);
      onRentChange?.({ min: cappedValue, max: maxRent });
    } else {
      // For max input, allow any value while typing
      // We'll validate on blur
      setMaxRent(numValue);
      // Don't update parent or slider while typing
    }
  };

  // Handle input blur - final validation
  const handleInputBlur = (e, type) => {
    let value = e.target.value;
    
    // If empty, set to default
    if (value === '') {
      if (type === 'min') {
        const defaultMin = 0;
        setMinRent(defaultMin);
        onRentChange?.({ min: defaultMin, max: maxRent });
      } else {
        const defaultMax = 5000000;
        setMaxRent(defaultMax);
        setRentRange([rentRange[0], 50]); // Reset slider to max
        onRentChange?.({ min: minRent, max: defaultMax });
      }
      return;
    }
    
    const numValue = parseInt(value, 10);
    
    // If invalid, reset to default
    if (isNaN(numValue) || numValue < 0) {
      if (type === 'min') {
        setMinRent(0);
        onRentChange?.({ min: 0, max: maxRent });
      } else {
        setMaxRent(5000000);
        setRentRange([rentRange[0], 50]);
        onRentChange?.({ min: minRent, max: 5000000 });
      }
      return;
    }
    
    // Final validation for max input
    if (type === 'max') {
      // Ensure max is at least 1 lakh and cap at 50 lakhs
      const cappedValue = Math.max(Math.min(numValue, 5000000), 100000);
      
      // Calculate lakh value for slider (min 1, max 50)
      const lakhValue = Math.min(Math.max(Math.floor(cappedValue / 100000), 1), 50);
      
      setMaxRent(cappedValue);
      setRentRange([rentRange[0], lakhValue]);
      onRentChange?.({ min: minRent, max: cappedValue });
    } else if (type === 'min') {
      // Ensure min doesn't exceed max - 1 lakh
      const maxAllowed = maxRent - 100000;
      const finalValue = Math.min(Math.max(numValue, 0), maxAllowed);
      
      const lakhValue = Math.min(Math.floor(finalValue / 100000), 49);
      setMinRent(finalValue);
      setRentRange([lakhValue, rentRange[1]]);
      onRentChange?.({ min: finalValue, max: maxRent });
    }
  };

  // Setup mouse move and touch move listeners when dragging
  useEffect(() => {
    const handleMouseMove = (e) => handleSliderInteraction(e, activeThumb);
    const handleTouchMove = (e) => handleSliderInteraction(e, activeThumb);
    const handleMouseUp = () => setActiveThumb(null);
    const handleTouchEnd = () => setActiveThumb(null);

    if (activeThumb) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [activeThumb, rentRange]);

  const minPercent = valueToPercent(rentRange[0]);
  const maxPercent = valueToPercent(rentRange[1]);

  return (
    <div className="w-full py-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Annual Rent Achieved</h3>
      
      {/* Slider */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-gray-600">₹{rentRange[0]} Lakhs</span>
          <span className="text-sm text-gray-600">₹{rentRange[1]} Lakhs</span>
        </div>
        
        <div 
          ref={sliderRef}
          className="relative h-2 bg-gray-200 rounded-lg"
        >
          {/* Background track */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gray-200 rounded-lg"></div>
          
          {/* Selected range */}
          <div 
            className="absolute top-0 h-2 bg-red-600 rounded-lg"
            style={{
              left: `${minPercent}%`,
              width: `${maxPercent - minPercent}%`,
            }}
          ></div>
          
          {/* Min thumb - DRAGGABLE */}
          <button
            type="button"
            className={`absolute top-1/2 w-6 h-6 bg-white border-2 border-red-600 rounded-full transform -translate-y-1/2 cursor-grab active:cursor-grabbing shadow-md hover:scale-110 transition-transform ${activeThumb === 'min' ? 'z-10' : ''}`}
            style={{ left: `${minPercent}%` }}
            onMouseDown={() => setActiveThumb('min')}
            onTouchStart={() => setActiveThumb('min')}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2 h-2 bg-red-600 rounded-full"></div>
            </div>
          </button>
          
          {/* Max thumb - DRAGGABLE */}
          <button
            type="button"
            className={`absolute top-1/2 w-6 h-6 bg-white border-2 border-red-600 rounded-full transform -translate-y-1/2 cursor-grab active:cursor-grabbing shadow-md hover:scale-110 transition-transform ${activeThumb === 'max' ? 'z-10' : ''}`}
            style={{ left: `${maxPercent}%` }}
            onMouseDown={() => setActiveThumb('max')}
            onTouchStart={() => setActiveThumb('max')}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2 h-2 bg-red-600 rounded-full"></div>
            </div>
          </button>
        </div>
      </div>

      <p className="text-gray-600 text-sm mb-6">Or enter specific values:</p>

      {/* Input Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">
            Minimum Rent (₹)
          </label>
          <input
            type="number"
            value={minRent}
            onChange={(e) => handleInputChange(e, 'min')}
            onBlur={(e) => handleInputBlur(e, 'min')}
            className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm sm:text-base"
            placeholder="0"
            min="0"
            max="4900000"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">
            Maximum Rent (₹)
          </label>
          <input
            type="number"
            value={maxRent}
            onChange={(e) => handleInputChange(e, 'max')}
            onBlur={(e) => handleInputBlur(e, 'max')}
            className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm sm:text-base"
            placeholder="5000000"
            min="100000"
            max="5000000"
          />
        </div>
      </div>
    </div>
  );
};

export default AnnualRent;