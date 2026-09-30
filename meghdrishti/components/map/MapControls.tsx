"use client";

import React from "react";
import { Plus, Minus, Crosshair, MapPin } from "lucide-react";

export interface MapControlsProps {
  zoomLevel: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
  onLocateIndore: () => void;
  className?: string;
}

export function MapControls({
  zoomLevel,
  onZoomIn,
  onZoomOut,
  onReset,
  onLocateIndore,
  className = "",
}: MapControlsProps) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {/* Zoom and Recenter Toolbar */}
      <div className="flex flex-col bg-[#0C201A]/90 border border-[#34D399]/40 rounded-xl shadow-lg overflow-hidden w-8 backdrop-blur-md">
        <button
          type="button"
          onClick={onZoomIn}
          className="p-2 text-white hover:bg-white/10 flex items-center justify-center transition-colors cursor-pointer"
          title="Zoom In"
          aria-label="Zoom In"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
        <div className="h-px bg-white/10" />
        <button
          type="button"
          onClick={onZoomOut}
          className="p-2 text-white hover:bg-white/10 flex items-center justify-center transition-colors cursor-pointer"
          title="Zoom Out"
          aria-label="Zoom Out"
        >
          <Minus className="w-3.5 h-3.5" />
        </button>
        <div className="h-px bg-white/10" />
        <button
          type="button"
          onClick={onReset}
          className="p-2 text-white hover:bg-white/10 flex items-center justify-center transition-colors cursor-pointer"
          title="Recenter Map"
          aria-label="Recenter Map"
        >
          <Crosshair className="w-3.5 h-3.5" />
        </button>
        <div className="h-px bg-white/10" />
        <button
          type="button"
          onClick={onLocateIndore}
          className="p-2 text-[#34D399] hover:bg-[#176B4D] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          title="Focus on Indore Block"
          aria-label="Focus on Indore Block"
        >
          <MapPin className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Scale Bar Indicator */}
      <div className="bg-[#0C201A]/90 backdrop-blur-md border border-[#34D399]/40 rounded-lg px-2 py-0.5 text-[9.5px] text-white font-black flex items-center gap-1.5 shadow-md w-fit">
        <span>0</span>
        <div className="w-5 h-0.5 bg-white/50" />
        <span>10</span>
        <div className="w-5 h-0.5 bg-white/50" />
        <span>20 km</span>
      </div>
    </div>
  );
}

export default MapControls;
