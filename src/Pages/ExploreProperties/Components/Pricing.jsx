import React, { useState, useEffect, useRef } from 'react';

// Pricing Component
const Pricing = ({ onPricingChange, initialPricing }) => {
  const [priceRange, setPriceRange] = useState([0, 50]);
  const [minPrice, setMinPrice] = useState(initialPricing?.min || 0);
  const [maxPrice, setMaxPrice] = useState(initialPricing?.max || 50000000);
  const [activeThumb, setActiveThumb] = useState(null); 
  const sliderRef = useRef(null);

  useEffect(() => {
    if (initialPricing) {
      setMinPrice(Math.max(initialPricing.min, 0));
      setMaxPrice(Math.max(initialPricing.max, 1000000));
      setPriceRange([
        Math.max(Math.floor(initialPricing.min / 1000000), 0),
        Math.min(Math.max(Math.floor(initialPricing.max / 1000000), 1), 50)
      ]);
    }
  }, [initialPricing]);

  // Convert value to percentage
  const valueToPercent = (value) => {
    return ((Math.min(Math.max(value, 0), 50) - 0) / (50 - 0)) * 100;
  };

  // Handle slider click or drag for both thumbs
  const handleSliderClick = (e) => {
    if (!sliderRef.current || !activeThumb) return;
    
    const rect = sliderRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = Math.min(Math.max((x / rect.width) * 100, 0), 100);
    const value = Math.round((percent / 100) * 50);
    
    updateSliderValue(value);
  };

  const handleSliderTouch = (e) => {
    if (!sliderRef.current || !activeThumb) return;
    
    const rect = sliderRef.current.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const percent = Math.min(Math.max((x / rect.width) * 100, 0), 100);
    const value = Math.round((percent / 100) * 50);
    
    updateSliderValue(value);
  };

  const updateSliderValue = (value) => {
    value = Math.min(Math.max(value, 0), 50); // Clamp between 0-50
    
    if (activeThumb === 'min') {
      if (value <= priceRange[1] - 1) { // Keep at least 1 gap between min and max
        const newMinPrice = Math.max(value * 1000000, 0);
        setPriceRange([value, priceRange[1]]);
        setMinPrice(newMinPrice);
        onPricingChange?.({ min: newMinPrice, max: maxPrice });
      }
    } else if (activeThumb === 'max') {
      if (value >= priceRange[0] + 1) { // Keep at least 1 gap between min and max
        const newMaxPrice = value * 1000000;
        setPriceRange([priceRange[0], value]);
        setMaxPrice(newMaxPrice);
        onPricingChange?.({ min: minPrice, max: newMaxPrice });
      }
    }
  };

  // Handle input field changes
  const handleInputChange = (e, type) => {
    let value = e.target.value;
    
    // Allow empty string for typing - just update the displayed value
    if (value === '') {
      if (type === 'min') {
        setMinPrice('');
      } else {
        setMaxPrice('');
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
      const cappedValue = Math.min(numValue, 49000000); // Max 49 lakhs to keep 1 lakh gap
      
      // Calculate lakh value for slider (max 49 to keep gap)
      const lakhValue = Math.min(Math.floor(cappedValue / 1000000), 49);
      
      setMinPrice(cappedValue);
      setPriceRange([lakhValue, priceRange[1]]);
      onPricingChange?.({ min: cappedValue, max: maxPrice });
    } else {
      // For max input, allow any value while typing
      // We'll validate on blur
      setMaxPrice(numValue);
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
        setMinPrice(defaultMin);
        onPricingChange?.({ min: defaultMin, max: maxPrice });
      } else {
        const defaultMax = 50000000;
        setMaxPrice(defaultMax);
        setPriceRange([priceRange[0], 50]); // Reset slider to max
        onPricingChange?.({ min: minPrice, max: defaultMax });
      }
      return;
    }
    
    const numValue = parseInt(value, 10);
    
    // If invalid, reset to default
    if (isNaN(numValue) || numValue < 0) {
      if (type === 'min') {
        setMinPrice(0);
        onPricingChange?.({ min: 0, max: maxPrice });
      } else {
        setMaxPrice(50000000);
        setPriceRange([priceRange[0], 50]);
        onPricingChange?.({ min: minPrice, max: 50000000 });
      }
      return;
    }
    
    // Final validation for max input
    if (type === 'max') {
      // Ensure max is at least 1 lakh and cap at 50 lakhs
      const cappedValue = Math.max(Math.min(numValue, 50000000), 1000000);
      
      // Calculate lakh value for slider (min 1, max 50)
      const lakhValue = Math.min(Math.max(Math.floor(cappedValue / 1000000), 1), 50);
      
      setMaxPrice(cappedValue);
      setPriceRange([priceRange[0], lakhValue]);
      onPricingChange?.({ min: minPrice, max: cappedValue });
    } else if (type === 'min') {
      // Ensure min doesn't exceed max - 1 lakh
      const maxAllowed = maxPrice - 1000000;
      const finalValue = Math.min(Math.max(numValue, 0), maxAllowed);
      
      const lakhValue = Math.min(Math.floor(finalValue / 1000000), 49);
      setMinPrice(finalValue);
      setPriceRange([lakhValue, priceRange[1]]);
      onPricingChange?.({ min: finalValue, max: maxPrice });
    }
  };

  // Setup mouse move and touch move listeners when dragging
  useEffect(() => {
    const handleMouseMove = (e) => handleSliderClick(e);
    const handleTouchMove = (e) => handleSliderTouch(e);
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
  }, [activeThumb, priceRange]);

  const minPercent = valueToPercent(priceRange[0]);
  const maxPercent = valueToPercent(priceRange[1]);

  return (
    <div className="w-full py-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Purchase Price</h3>
      
      {/* Slider */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-gray-600">₹{priceRange[0]} Lakhs</span>
          <span className="text-sm text-gray-600">₹{priceRange[1]} Lakhs</span>
        </div>
        
        <div 
          ref={sliderRef}
          className="relative h-2 bg-gray-200 rounded-lg cursor-pointer"
          onClick={(e) => {
            if (activeThumb) return;
            handleSliderClick(e);
          }}
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
            Minimum Price (₹)
          </label>
          <input
            type="number"
            value={minPrice}
            onChange={(e) => handleInputChange(e, 'min')}
            onBlur={(e) => handleInputBlur(e, 'min')}
            className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm sm:text-base"
            placeholder="0"
            min="0"
            max="49000000"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">
            Maximum Price (₹)
          </label>
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => handleInputChange(e, 'max')}
            onBlur={(e) => handleInputBlur(e, 'max')}
            className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm sm:text-base"
            placeholder="50000000"
            min="1000000"
            max="50000000"
          />
        </div>
      </div>
    </div>
  );
};

export default Pricing;