import React, { useState, useEffect, useRef } from 'react';

// ROI Component
const ROI = ({ onROIChange, initialROI }) => {
  const [roiRange, setRoiRange] = useState([0, 100]); // Percentage range
  const [maxROI, setMaxROI] = useState(initialROI || 100); // Only max value needed
  const [activeThumb, setActiveThumb] = useState(null); 
  const sliderRef = useRef(null);

  useEffect(() => {
    if (initialROI) {
      setMaxROI(initialROI);
      setRoiRange([0, initialROI]);
    }
  }, [initialROI]);

  // Convert value to percentage (0-100% range)
  const valueToPercent = (value) => {
    return ((value - 0) / (100 - 0)) * 100;
  };

  // Handle slider click or drag - ONLY FOR MAX THUMB
  const handleSliderClick = (e) => {
    if (!sliderRef.current || activeThumb !== 'max') return;
    
    const rect = sliderRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = Math.min(Math.max((x / rect.width) * 100, 0), 100);
    const value = Math.round((percent / 100) * 100);
    
    updateSliderValue(value);
  };

  const handleSliderTouch = (e) => {
    if (!sliderRef.current || activeThumb !== 'max') return;
    
    const rect = sliderRef.current.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const percent = Math.min(Math.max((x / rect.width) * 100, 0), 100);
    const value = Math.round((percent / 100) * 100);
    
    updateSliderValue(value);
  };

  const updateSliderValue = (value) => {
    // Only update max value, min stays fixed at 0
    if (activeThumb === 'max') {
      if (value >= roiRange[0] + 1) { // Keep at least 1% gap between min and max
        setRoiRange([0, value]);
        setMaxROI(value);
        onROIChange?.(value);
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
  }, [activeThumb, roiRange]);

  const maxPercent = valueToPercent(maxROI);

  return (
    <div className="w-full py-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Return on Investment (ROI)</h3>
      
      {/* Slider */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-gray-600">0%</span>
          <span className="text-sm text-gray-600">{maxROI}%</span>
        </div>
        
        <div 
          ref={sliderRef}
          className="relative h-2 bg-gray-200 rounded-lg"
        >
          {/* Background track */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gray-200 rounded-lg"></div>
          
          {/* Selected range - always starts from left (min is fixed at 0) */}
          <div 
            className="absolute top-0 h-2 bg-red-600 rounded-lg"
            style={{
              left: `0%`,
              width: `${maxPercent}%`,
            }}
          ></div>
          
          {/* Min thumb - FIXED at 0%, non-draggable */}
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

     <h2 className='bg-gray-100 rounded-3xl py-2 px-3 text-sm text-gray-500 '>Filled Properties based on their expected return or Investment.Higher ROI indicates better potential returns</h2>
    </div>
  );
};

export default ROI;