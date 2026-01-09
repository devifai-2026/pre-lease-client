import React, { useState } from 'react';

const TypeOfUnit = () => {
    const [selectedTypes, setSelectedTypes] = useState([]);
    
    const propertyTypes = [
        { id: 'residential', label: 'Residential' },
        { id: 'commercial', label: 'Commercial' },
        { id: 'industrial', label: 'Industrial' },
        { id: 'retail', label: 'Retail' },
        { id: 'office', label: 'Office Space' },
        { id: 'warehouse', label: 'Warehouse' },
        { id: 'mixed-use', label: 'Mixed-Use' },
        { id: 'hospitality', label: 'Hospitality' }
    ];

    const handleTypeChange = (id) => {
        setSelectedTypes(prev => 
            prev.includes(id) 
                ? prev.filter(type => type !== id)
                : [...prev, id]
        );
    };

    return (
        <div className="w-full py-4">
            <h3 className="text-base sm:text-lg font-semibold text-[#262626] mb-4">
                Select Property Types
            </h3>
            
            {/* Property Type Grid - 3 columns like in image */}
            <div className="grid grid-cols-3 gap-1 mb-2">
                {/* Row 1 */}
                <div className="space-y-1">
                    <label className="flex items-center gap-2 cursor-pointer p-1 hover:bg-gray-50 rounded">
                        <input
                            type="checkbox"
                            checked={selectedTypes.includes('residential')}
                            onChange={() => handleTypeChange('residential')}
                            className="w-4 h-4 border border-gray-300 rounded cursor-pointer accent-red-600"
                        />
                        <span className="text-sm">Residential</span>
                    </label>
                </div>
                
                <div className="space-y-1">
                    <label className="flex items-center gap-2 cursor-pointer p-1 hover:bg-gray-50 rounded">
                        <input
                            type="checkbox"
                            checked={selectedTypes.includes('commercial')}
                            onChange={() => handleTypeChange('commercial')}
                            className="w-4 h-4 border border-gray-300 rounded cursor-pointer accent-red-600"
                        />
                        <span className="text-sm">Commercial</span>
                    </label>
                </div>
                
                <div className="space-y-1">
                    <label className="flex items-center gap-2 cursor-pointer p-1 hover:bg-gray-50 rounded">
                        <input
                            type="checkbox"
                            checked={selectedTypes.includes('industrial')}
                            onChange={() => handleTypeChange('industrial')}
                            className="w-4 h-4 border border-gray-300 rounded cursor-pointer accent-red-600"
                        />
                        <span className="text-sm">Industrial</span>
                    </label>
                </div>
                
                {/* Row 2 */}
                <div className="space-y-1">
                    <label className="flex items-center gap-2 cursor-pointer p-1 hover:bg-gray-50 rounded">
                        <input
                            type="checkbox"
                            checked={selectedTypes.includes('retail')}
                            onChange={() => handleTypeChange('retail')}
                            className="w-4 h-4 border border-gray-300 rounded cursor-pointer accent-red-600"
                        />
                        <span className="text-sm">Retail</span>
                    </label>
                </div>
                
                <div className="space-y-1">
                    <label className="flex items-center gap-2 cursor-pointer p-1 hover:bg-gray-50 rounded">
                        <input
                            type="checkbox"
                            checked={selectedTypes.includes('office')}
                            onChange={() => handleTypeChange('office')}
                            className="w-4 h-4 border border-gray-300 rounded cursor-pointer accent-red-600"
                        />
                        <span className="text-sm">Office Space</span>
                    </label>
                </div>
                
                <div className="space-y-1">
                    <label className="flex items-center gap-2 cursor-pointer p-1 hover:bg-gray-50 rounded">
                        <input
                            type="checkbox"
                            checked={selectedTypes.includes('warehouse')}
                            onChange={() => handleTypeChange('warehouse')}
                            className="w-4 h-4 border border-gray-300 rounded cursor-pointer accent-red-600"
                        />
                        <span className="text-sm">Warehouse</span>
                    </label>
                </div>
                
                {/* Row 3 - Mixed-Use and Hospitality centered */}
                <div className="space-y-1">
                    <label className="flex items-center gap-2 cursor-pointer p-1 hover:bg-gray-50 rounded">
                        <input
                            type="checkbox"
                            checked={selectedTypes.includes('mixed-use')}
                            onChange={() => handleTypeChange('mixed-use')}
                            className="w-4 h-4 border border-gray-300 rounded cursor-pointer accent-red-600"
                        />
                        <span className="text-sm">Mixed-Use</span>
                    </label>
                </div>
                
                <div className="space-y-1">
                    <label className="flex items-center gap-2 cursor-pointer p-1 hover:bg-gray-50 rounded">
                        <input
                            type="checkbox"
                            checked={selectedTypes.includes('hospitality')}
                            onChange={() => handleTypeChange('hospitality')}
                            className="w-4 h-4 border border-gray-300 rounded cursor-pointer accent-red-600"
                        />
                        <span className="text-sm">Hospitality</span>
                    </label>
                </div>
                
                {/* Empty cell to maintain 3-column layout */}
                <div className="space-y-2"></div>
            </div>
        </div>
    );
};

export default TypeOfUnit;