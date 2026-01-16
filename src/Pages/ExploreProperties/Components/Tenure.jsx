import React, { useState, useEffect, useRef } from 'react';

// Tenure Component
const Tenure = ({ onTenureChange, initialTenure }) => {
  const [tenureRange, setTenureRange] = useState([1, 20]); // Years range
  const [minTenure, setMinTenure] = useState(1); // Min value
  const [maxTenure, setMaxTenure] = useState(initialTenure || 20); // Max value
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
    const value = Math.round(1 + (percent / 100) * (20 - 1)); // Scale to 1-20
    
    updateSliderValue(value, thumbType);
  };

  const updateSliderValue = (value, thumbType) => {
    if (thumbType === 'min') {
      if (value <= tenureRange[1] - 1) { // Keep at least 1 year gap between min and max
        setTenureRange([value, tenureRange[1]]);
        setMinTenure(value);
        onTenureChange?.(tenureRange[1]); // Still pass max tenure for backward compatibility
      }
    } else if (thumbType === 'max') {
      if (value >= tenureRange[0] + 1) { // Keep at least 1 year gap between min and max
        setTenureRange([tenureRange[0], value]);
        setMaxTenure(value);
        onTenureChange?.(value);
      }
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
  }, [activeThumb, tenureRange]);

  const minPercent = valueToPercent(tenureRange[0]);
  const maxPercent = valueToPercent(tenureRange[1]);

  return (
    <div className="w-full py-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Tenure Left</h3>
      
      {/* Slider */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-gray-600">{tenureRange[0]} Year{tenureRange[0] !== 1 ? 's' : ''}</span>
          <span className="text-sm text-gray-600">{tenureRange[1]} Years</span>
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

      <div className='bg-gray-100 rounded-3xl py-2 px-3 text-sm text-gray-500'>
        Remaining duration of lease agreement. Longer tenure provides more stability and predictable income.
      </div>
    </div>
  );
};

export default Tenure;