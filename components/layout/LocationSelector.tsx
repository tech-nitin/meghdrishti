import React from "react";
import { MapPin } from "lucide-react";

export interface LocationSelectorProps {
  currentLocation?: string;
  className?: string;
  onLocationChange?: (locationId: string) => void;
}

export function LocationSelector({
  currentLocation = "Nagpur, MH",
  className = "",
}: LocationSelectorProps) {
  return (
    <div
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#17211C] bg-[#FFFFFF] border border-[#DDE4DE] rounded-md shadow-xs hover:border-[#176B4D] hover:text-[#176B4D] transition-colors cursor-pointer ${className}`}
    >
      <MapPin className="size-3.5 text-[#176B4D]" />
      <span>{currentLocation}</span>
    </div>
  );
}

export default LocationSelector;
