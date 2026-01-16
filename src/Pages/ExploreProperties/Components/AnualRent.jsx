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
      setMinRent(initialRent.min);
      setMaxRent(initialRent.max);
      setRentRange([
        Math.floor(initialRent.min / 100000),
        Math.floor(initialRent.max / 100000)
      ]);
    }
  }, [initialRent]);

  // Convert value to percentage (0-50 Lakhs range)
  const valueToPercent = (value) => {
    return ((value - 0) / (50 - 0)) * 100;
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
    if (thumbType === 'min') {
      if (value <= rentRange[1] - 1) { // Keep at least 1 gap between min and max
        const newMinRent = value * 100000; // Convert to actual rupees
        setRentRange([value, rentRange[1]]);
        setMinRent(newMinRent);
        onRentChange?.({ min: newMinRent, max: maxRent });
      }
    } else if (thumbType === 'max') {
      if (value >= rentRange[0] + 1) { // Keep at least 1 gap between min and max
        const newMaxRent = value * 100000; // Convert to actual rupees
        setRentRange([rentRange[0], value]);
        setMaxRent(newMaxRent);
        onRentChange?.({ min: minRent, max: newMaxRent });
      }
    }
  };

  // Handle input field changes
  const handleInputChange = (e, type) => {
    const value = parseInt(e.target.value) || 0;
    const lakhValue = Math.floor(value / 100000);
    
    if (type === 'min') {
      const constrainedLakhValue = Math.min(Math.max(lakhValue, 0), rentRange[1] - 1);
      setMinRent(value);
      setRentRange([constrainedLakhValue, rentRange[1]]);
      onRentChange?.({ min: value, max: maxRent });
    } else {
      const constrainedLakhValue = Math.min(Math.max(lakhValue, rentRange[0] + 1), 50);
      setMaxRent(value);
      setRentRange([rentRange[0], constrainedLakhValue]);
      onRentChange?.({ min: minRent, max: value });
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
            className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm sm:text-base"
            placeholder="0"
            min="0"
            max={maxRent - 100000}
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
            className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm sm:text-base"
            placeholder="5000000"
            min={minRent + 100000}
            max="5000000"
          />
        </div>
      </div>
    </div>
  );
};

export default AnnualRent;