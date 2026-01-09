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
      setMinPrice(initialPricing.min);
      setMaxPrice(initialPricing.max);
      setPriceRange([
        Math.floor(initialPricing.min / 1000000),
        Math.floor(initialPricing.max / 1000000)
      ]);
    }
  }, [initialPricing]);

  // Convert value to percentage
  const valueToPercent = (value) => {
    return ((value - 0) / (50 - 0)) * 100;
  };

  // Handle slider click or drag - ONLY FOR MAX THUMB
  const handleSliderClick = (e) => {
    if (!sliderRef.current || activeThumb !== 'max') return;
    
    const rect = sliderRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = Math.min(Math.max((x / rect.width) * 100, 0), 100);
    const value = Math.round((percent / 100) * 50);
    
    updateSliderValue(value);
  };

  const handleSliderTouch = (e) => {
    if (!sliderRef.current || activeThumb !== 'max') return;
    
    const rect = sliderRef.current.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const percent = Math.min(Math.max((x / rect.width) * 100, 0), 100);
    const value = Math.round((percent / 100) * 50);
    
    updateSliderValue(value);
  };

  const updateSliderValue = (value) => {
    // Only update max value, min stays fixed
    if (activeThumb === 'max') {
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
    const value = parseInt(e.target.value) || 0;
    if (type === 'min') {
      const lakhValue = Math.min(Math.max(Math.floor(value / 1000000), 0), 49); // Max 49 to leave room for max
      setMinPrice(value);
      setPriceRange([lakhValue, priceRange[1]]);
      onPricingChange?.({ min: value, max: maxPrice });
    } else {
      const lakhValue = Math.min(Math.max(Math.floor(value / 1000000), 1), 50); // Min 1 to leave room for min
      setMaxPrice(value);
      setPriceRange([priceRange[0], lakhValue]);
      onPricingChange?.({ min: minPrice, max: value });
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
          className="relative h-2 bg-gray-200 rounded-lg"
        >
          {/* Background track */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gray-200 rounded-lg"></div>
          
          {/* Selected range - always starts from left (min is fixed) */}
          <div 
            className="absolute top-0 h-2 bg-red-600 rounded-lg"
            style={{
              left: `0%`,
              width: `${maxPercent}%`,
            }}
          ></div>
          
          {/* Min thumb - FIXED, non-draggable */}
          <div
            className="absolute top-1/2 w-6 h-6 bg-white border-2 border-red-600 rounded-full transform -translate-y-1/2 cursor-default shadow-md"
            style={{ left: `0%` }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2 h-2 bg-red-600 rounded-full"></div>
            </div>
          </div>
          
          {/* Max thumb - ONLY DRAGGABLE */}
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
            className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm sm:text-base"
            placeholder="0"
            min="0"
            max={maxPrice - 1000000}
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
            className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm sm:text-base"
            placeholder="50000000"
            min={minPrice + 1000000}
            max="500000000"
          />
        </div>
      </div>
    </div>
  );
};

export default Pricing;