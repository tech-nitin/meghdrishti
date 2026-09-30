"use client";

import React from "react";

export type RiskLayerType = "rainfall" | "onset" | "dryspell" | "heavyrain";

export interface MapLegendProps {
  activeLayer: RiskLayerType;
  className?: string;
}

export function MapLegend({ activeLayer, className = "" }: MapLegendProps) {
  const getLegendItems = () => {
    switch (activeLayer) {
      case "onset":
        return [
          { label: "Low (<75%)", color: "#A2B59F" },
          { label: "Mod (75–80%)", color: "#7A9B7A" },
          { label: "Favorable (80–85%)", color: "#4ADE80" },
          { label: "High (>85%)", color: "#22C55E" },
        ];
      case "dryspell":
        return [
          { label: "Low (<15%)", color: "#4ADE80" },
          { label: "Moderate (15–25%)", color: "#FACC15" },
          { label: "Elevated (>25%)", color: "#FB923C" },
        ];
      case "heavyrain":
        return [
          { label: "Low (<10%)", color: "#38BDF8" },
          { label: "Moderate (10–15%)", color: "#0EA5E9" },
          { label: "Surge (>15%)", color: "#F87171" },
        ];
      case "rainfall":
      default:
        return [
          { label: "Low", color: "#4ADE80" },
          { label: "Moderate", color: "#FACC15" },
          { label: "High", color: "#FB923C" },
          { label: "Very High", color: "#F87171" },
        ];
    }
  };

  const items = getLegendItems();

  return (
    <div
      className={`bg-[#0C201A]/90 border border-[#34D399]/40 rounded-xl px-3 py-1.5 shadow-lg flex items-center gap-2.5 text-[10.5px] backdrop-blur-md text-white ${className}`}
    >
      <span className="font-black uppercase text-[#34D399] tracking-wider text-[9.5px] pr-1.5 border-r border-white/10">
        RISK LEVEL
      </span>
      {items.map((item, idx) => (
        <div key={idx} className="flex items-center gap-1.5">
          <span
            className="w-2 h-2 rounded-full shrink-0 shadow-xs"
            style={{ backgroundColor: item.color }}
          />
          <span className="text-white font-bold whitespace-nowrap">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}

export default MapLegend;
