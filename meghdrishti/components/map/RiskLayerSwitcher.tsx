"use client";

import React from "react";
import type { RiskLayerType } from "./MapLegend";
import { Layers } from "lucide-react";

export interface RiskLayerSwitcherProps {
  activeLayer: RiskLayerType;
  onLayerChange: (layer: RiskLayerType) => void;
  className?: string;
}

export function RiskLayerSwitcher({
  activeLayer,
  onLayerChange,
  className = "",
}: RiskLayerSwitcherProps) {
  const layers: Array<{ id: RiskLayerType; label: string }> = [
    { id: "rainfall", label: "RAIN" },
    { id: "onset", label: "ONSET" },
    { id: "dryspell", label: "DRY SPELL" },
    { id: "heavyrain", label: "HEAVY RAIN" },
  ];

  return (
    <div
      className={`inline-flex items-center gap-1 p-1 bg-[#0C201A]/90 border border-[#34D399]/40 rounded-xl shadow-lg backdrop-blur-md text-white ${className}`}
    >
      <div className="hidden sm:flex items-center gap-1 px-2 text-gray-300 text-[10.5px] font-black tracking-wider uppercase border-r border-white/10 mr-0.5">
        <Layers className="w-3 h-3 text-[#34D399]" />
        <span>Layer</span>
      </div>

      {layers.map((layer) => {
        const isActive = activeLayer === layer.id;
        return (
          <button
            key={layer.id}
            type="button"
            onClick={() => onLayerChange(layer.id)}
            className={`px-3 py-1 rounded-lg text-[11px] font-black tracking-wider transition-all duration-150 cursor-pointer ${
              isActive
                ? "bg-[#176B4D] text-white shadow-xs border border-[#34D399]/40"
                : "text-gray-300 hover:text-white hover:bg-white/10"
            }`}
          >
            {layer.label}
          </button>
        );
      })}
    </div>
  );
}

export default RiskLayerSwitcher;
