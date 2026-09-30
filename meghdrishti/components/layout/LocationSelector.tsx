"use client";

import React from "react";
import { MapPin, ChevronDown } from "lucide-react";
import { useApp } from "@/lib/context/AppContext";

export interface LocationSelectorProps {
  className?: string;
}

export function LocationSelector({ className = "" }: LocationSelectorProps) {
  const { currentLocation, setLocationModalOpen } = useApp();

  return (
    <button
      type="button"
      onClick={() => setLocationModalOpen(true)}
      className={`inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-[#20312C] bg-[#FAF8F2]/90 hover:bg-white border border-[#DCCDB5] rounded-full shadow-xs hover:border-[#789B7C] transition-all cursor-pointer ${className}`}
      title="Change Location"
    >
      <MapPin className="w-3.5 h-3.5 text-[#315C3F]" />
      <span className="truncate max-w-[170px] font-medium">
        {currentLocation.district ? `${currentLocation.district}, MP` : currentLocation.name}
      </span>
      <ChevronDown className="w-3 h-3 text-[#60716B]" />
    </button>
  );
}

export default LocationSelector;
