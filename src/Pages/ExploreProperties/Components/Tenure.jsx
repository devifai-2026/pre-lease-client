import React, { useState, useEffect, useRef } from 'react';

// Tenure Component
const Tenure = ({ onTenureChange, initialTenure }) => {
  const [tenureRange, setTenureRange] = useState([1, 20]); // Years range
  const [maxTenure, setMaxTenure] = useState(initialTenure || 20); // Only max value needed
  const [activeThumb, setActiveThumb] = useState(null); 
  const sliderRef = useRef(null);

  useEffect(() => {
    if (initialTenure) {
      setMaxTenure(initialTenure);
      setTenureRange([1, initialTenure]);
    }
  }, [initialTenure]);

  // Convert value to percentage (1-20 years range)
  const valueToPercent = (value) => {
    return ((value - 1) / (20 - 1)) * 100;
  };

  // Handle slider click or drag - ONLY FOR MAX THUMB
  const handleSliderClick = (e) => {
    if (!sliderRef.current || activeThumb !== 'max') return;
    
    const rect = sliderRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = Math.min(Math.max((x / rect.width) * 100, 0), 100);
    const value = Math.round(1 + (percent / 100) * (20 - 1)); // Scale to 1-20
    
    updateSliderValue(value);
  };

  const handleSliderTouch = (e) => {
    if (!sliderRef.current || activeThumb !== 'max') return;
    
    const rect = sliderRef.current.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const percent = Math.min(Math.max((x / rect.width) * 100, 0), 100);
    const value = Math.round(1 + (percent / 100) * (20 - 1)); // Scale to 1-20
    
    updateSliderValue(value);
  };

  const updateSliderValue = (value) => {
    // Only update max value, min stays fixed at 1
    if (activeThumb === 'max') {
      if (value >= tenureRange[0] + 1) { // Keep at least 1 year gap between min and max
        setTenureRange([1, value]);
        setMaxTenure(value);
        onTenureChange?.(value);
      }
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
  }, [activeThumb, tenureRange]);

  const minPercent = valueToPercent(1);
  const maxPercent = valueToPercent(maxTenure);

  return (
    <div className="w-full py-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Tenure Left</h3>
      
      {/* Slider */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-gray-600">1 Year</span>
          <span className="text-sm text-gray-600">{maxTenure} Years</span>
        </div>
        
        <div 
          ref={sliderRef}
          className="relative h-2 bg-gray-200 rounded-lg"
        >
          {/* Background track */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gray-200 rounded-lg"></div>
          
          {/* Selected range - always starts from left (min is fixed at 1 year) */}
          <div 
            className="absolute top-0 h-2 bg-red-600 rounded-lg"
            style={{
              left: `0%`,
              width: `${maxPercent}%`,
            }}
          ></div>
          
          {/* Min thumb - FIXED at 1 year, non-draggable */}
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

      <h2 className='bg-gray-100 rounded-3xl py-2 px-3 text-sm text-gray-500 '>Remaning duration of lease agreement.Longer tenure provides more stability and predictable income.</h2>
    </div>
  );
};

export default Tenure;