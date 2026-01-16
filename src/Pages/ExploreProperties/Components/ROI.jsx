import React, { useState, useEffect, useRef } from 'react';

// ROI Component
const ROI = ({ onROIChange, initialROI }) => {
  const [roiRange, setRoiRange] = useState([0, 100]); // Percentage range
  const [minROI, setMinROI] = useState(0); // Min value
  const [maxROI, setMaxROI] = useState(initialROI || 100); // Max value
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
    const value = Math.round((percent / 100) * 100);
    
    updateSliderValue(value, thumbType);
  };

  const updateSliderValue = (value, thumbType) => {
    if (thumbType === 'min') {
      if (value <= roiRange[1] - 1) { // Keep at least 1% gap between min and max
        setRoiRange([value, roiRange[1]]);
        setMinROI(value);
        onROIChange?.(roiRange[1]); // Still pass max ROI for backward compatibility
      }
    } else if (thumbType === 'max') {
      if (value >= roiRange[0] + 1) { // Keep at least 1% gap between min and max
        setRoiRange([roiRange[0], value]);
        setMaxROI(value);
        onROIChange?.(value);
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
  }, [activeThumb, roiRange]);

  const minPercent = valueToPercent(roiRange[0]);
  const maxPercent = valueToPercent(roiRange[1]);

  return (
    <div className="w-full py-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Return on Investment (ROI)</h3>
      
      {/* Slider */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-gray-600">{roiRange[0]}%</span>
          <span className="text-sm text-gray-600">{roiRange[1]}%</span>
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
       Filter Properties based on their expected return on Investment. Higher ROI indicates better potential returns
     </div>
    </div>
  );
};

export default ROI;