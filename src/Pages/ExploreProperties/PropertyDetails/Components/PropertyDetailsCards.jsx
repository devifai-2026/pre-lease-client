// PropertyDetailsCards.js
import React from 'react';

const PropertyDetailsCards = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
      {/* Left side cards */}
      <div className="space-y-4 sm:space-y-6">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="pt-3 sm:pt-4 md:pt-5">
            <p className="text-base sm:text-lg font-medium pl-3 sm:pl-4 text-[#EE2529]">
              Basic Information
            </p>
          </div>
          <div className="p-3 sm:p-4 pt-1 sm:pt-2">
            <div className="space-y-1 sm:space-y-2">
              <div className="flex items-start justify-between">
                <div className="flex flex-col w-1/2 pr-1 sm:pr-2">
                  <p className="text-[#767676] text-xs sm:text-sm">
                    Property Type
                  </p>
                  <p className="font-semibold text-xs sm:text-sm">
                    Residential
                  </p>
                </div>
                <div className="flex flex-col w-1/2 pl-1 sm:pl-2">
                  <p className="text-[#767676] text-xs sm:text-sm">
                    Carpet Area
                  </p>
                  <p className="font-semibold text-xs sm:text-sm">
                    4,202 sq.ft
                  </p>
                </div>
              </div>
              <div className="flex items-start justify-between pt-2 sm:pt-3">
                <div className="flex flex-col w-1/2 pr-1 sm:pr-2">
                  <p className="text-[#767676] text-xs sm:text-sm">
                    Built Year
                  </p>
                  <p className="font-semibold text-xs sm:text-sm">
                    2018
                  </p>
                </div>
                <div className="flex flex-col w-1/2 pl-1 sm:pl-2">
                  <p className="text-[#767676] text-xs sm:text-sm">
                    Last Refurbished
                  </p>
                  <p className="font-semibold text-xs sm:text-sm">
                    2022
                  </p>
                </div>
              </div>
              <div className="flex items-start justify-between pt-2 sm:pt-3">
                <div className="flex flex-col w-1/2 pr-1 sm:pr-2">
                  <p className="text-[#767676] text-xs sm:text-sm">
                    Building Grade
                  </p>
                  <p className="font-semibold text-xs sm:text-sm">
                    Grade A
                  </p>
                </div>
                <div className="flex flex-col w-1/2 pl-1 sm:pl-2">
                  <p className="text-[#767676] text-xs sm:text-sm">
                    Ownership
                  </p>
                  <p className="font-semibold text-xs sm:text-sm">
                    Freehold
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="pt-3 sm:pt-4 md:pt-5">
            <p className="text-base sm:text-lg font-medium pl-3 sm:pl-4 text-[#EE2529]">
              Legal & Title Status
            </p>
          </div>
          <div className="p-3 sm:p-4 pt-1 sm:pt-2">
            <div className="space-y-1 sm:space-y-2">
              <div className="flex flex-col">
                <p className="text-[#767676] text-xs sm:text-sm">
                  Lease Registration
                </p>
                <p className="font-semibold text-xs sm:text-sm">
                  Registered
                </p>
              </div>
              <div className="flex flex-col pt-2 sm:pt-3">
                <p className="text-[#767676] text-xs sm:text-sm">
                  Occupancy Certificate (OC)
                </p>
                <p className="font-semibold text-xs sm:text-sm">
                  Yes - Available
                </p>
              </div>
              <div className="flex flex-col pt-2 sm:pt-3">
                <p className="text-[#767676] text-xs sm:text-sm">
                  Litigation Status
                </p>
                <p className="font-semibold text-xs sm:text-sm">
                  No Pending Litigation
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="pt-3 sm:pt-4 md:pt-5">
            <p className="text-base sm:text-lg font-medium pl-3 sm:pl-4 text-[#EE2529]">
              Building Amenities
            </p>
          </div>
          <div className="p-3 sm:p-4 pt-1 sm:pt-2">
            <div className="space-y-1 sm:space-y-2">
              <div className="flex items-start justify-between">
                <div className="flex flex-col w-1/2 pr-1 sm:pr-2">
                  <p className="text-[#767676] text-xs sm:text-sm">
                    Number of lifts
                  </p>
                  <p className="font-semibold text-xs sm:text-sm">
                    4 lifts
                  </p>
                </div>
                <div className="flex flex-col w-1/2 pl-1 sm:pl-2">
                  <p className="text-[#767676] text-xs sm:text-sm">
                    Security Cameras
                  </p>
                  <p className="font-semibold text-xs sm:text-sm">
                    Yes
                  </p>
                </div>
              </div>
              <div className="flex items-start justify-between pt-2 sm:pt-3">
                <div className="flex flex-col w-1/2 pr-1 sm:pr-2">
                  <p className="text-[#767676] text-xs sm:text-sm">
                    Conference Rooms
                  </p>
                  <p className="font-semibold text-xs sm:text-sm">
                    3 rooms
                  </p>
                </div>
                <div className="flex flex-col w-1/2 pl-1 sm:pl-2">
                  <p className="text-[#767676] text-xs sm:text-sm">
                    Furnishing Status
                  </p>
                  <p className="font-semibold text-xs sm:text-sm">
                    Semi-Furnished
                  </p>
                </div>
              </div>
              <div className="flex items-start justify-between pt-2 sm:pt-3">
                <div className="flex flex-col w-1/2 pr-1 sm:pr-2">
                  <p className="text-[#767676] text-xs sm:text-sm">
                    Fire Safety Systems
                  </p>
                  <p className="font-semibold text-xs sm:text-sm">
                    Yes
                  </p>
                </div>
                <div className="flex flex-col w-1/2 pl-1 sm:pl-2">
                  <p className="text-[#767676] text-xs sm:text-sm">
                    Backup Generators
                  </p>
                  <p className="font-semibold text-xs sm:text-sm">
                    2 units
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side cards */}
      <div className="space-y-4 sm:space-y-6">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="pt-3 sm:pt-4 md:pt-5">
            <p className="text-base sm:text-lg font-medium pl-3 sm:pl-4 text-[#EE2529]">
              Parking Details
            </p>
          </div>
          <div className="p-3 sm:p-4 pt-1 sm:pt-2">
            <div className="space-y-1 sm:space-y-2">
              <div className="flex flex-col">
                <p className="text-[#767676] text-xs sm:text-sm">
                  Parking Slots
                </p>
                <p className="font-semibold text-xs sm:text-sm">
                  10 slots
                </p>
              </div>
              <div className="flex flex-col pt-2 sm:pt-3">
                <p className="text-[#767676] text-xs sm:text-sm">
                  Parking Ratio
                </p>
                <p className="font-semibold text-xs sm:text-sm">
                  420 sq.ft per parking
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="pt-3 sm:pt-4 md:pt-5">
            <p className="text-base sm:text-lg font-medium pl-3 sm:pl-4 text-[#EE2529]">
              Building Infrastructure
            </p>
          </div>
          <div className="p-3 sm:p-4 pt-1 sm:pt-2">
            <div className="space-y-1 sm:space-y-2">
              <div className="flex flex-col">
                <p className="text-[#767676] text-xs sm:text-sm">
                  Power Backup
                </p>
                <p className="font-semibold text-xs sm:text-sm">
                  500 kVA
                </p>
              </div>
              <div className="flex flex-col pt-2 sm:pt-3">
                <p className="text-[#767676] text-xs sm:text-sm">
                  Building Maintained By
                </p>
                <p className="font-semibold text-xs sm:text-sm">
                  Professional Facility
                </p>
              </div>
              <div className="flex flex-col pt-2 sm:pt-3">
                <p className="text-[#767676] text-xs sm:text-sm">
                  HVAC Type
                </p>
                <p className="font-semibold text-xs sm:text-sm">
                  Central Air Conditioning
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsCards;