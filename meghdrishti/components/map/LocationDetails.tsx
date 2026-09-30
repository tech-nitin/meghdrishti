"use client";

import React from "react";
import Link from "next/link";
import { X, ArrowRight } from "lucide-react";
import type { IndoreBlockRisk } from "@/data/map-risk";

export interface LocationDetailsProps {
  selectedBlock: IndoreBlockRisk;
  onClose?: () => void;
  className?: string;
}

export function LocationDetails({
  selectedBlock,
  onClose,
  className = "",
}: LocationDetailsProps) {
  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case "low":
        return "text-[#4ADE80]";
      case "high":
      case "very-high":
        return "text-[#FB923C]";
      case "moderate":
      default:
        return "text-[#FACC15]";
    }
  };

  return (
    <div
      className={`bg-[#0C201A]/92 border border-[#34D399]/40 rounded-3xl p-5 shadow-2xl backdrop-blur-xl space-y-3.5 z-20 text-white ${className}`}
    >
      {/* 1. Header: Block Name & District/Panchayat Count */}
      <div className="flex items-start justify-between border-b border-white/10 pb-3">
        <div className="space-y-0.5">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#34D399] animate-pulse" />
            <h3 className="font-black text-base text-white font-sans tracking-tight uppercase">
              {selectedBlock.name}
            </h3>
          </div>
          <p className="text-[11px] text-gray-300 font-medium pl-4">
            {selectedBlock.district} District • {selectedBlock.panchayatsCount} Panchayats
          </p>
        </div>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close inspector"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* 2. RAINFALL RISK + Status */}
      <div className="space-y-0.5">
        <span className="text-[10px] font-black uppercase text-gray-400 tracking-wider block">
          RAINFALL RISK
        </span>
        <div className={`text-xl font-black font-sans uppercase tracking-tight ${getRiskColor(selectedBlock.riskLevel)}`}>
          {selectedBlock.riskLevel}
        </div>
      </div>

      {/* 3. 4 Metrics with 1px Separators */}
      <div className="pt-2.5 pb-2 border-y border-white/10 space-y-2 text-xs">
        <div className="flex items-center justify-between">
          <span className="text-gray-300 font-bold text-[11px]">ONSET PROBABILITY</span>
          <span className="font-black text-white font-sans text-sm">
            {selectedBlock.onsetProbability}%
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-300 font-bold text-[11px]">SOIL MOISTURE</span>
          <span className="font-black text-white font-sans text-sm">
            {selectedBlock.soilMoisture}%
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-300 font-bold text-[11px]">DRY SPELL</span>
          <span className="font-black text-[#4ADE80] font-sans text-sm">
            {selectedBlock.drySpellRisk}%
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-300 font-bold text-[11px]">HEAVY RAIN</span>
          <span className="font-black text-[#FACC15] font-sans text-sm">
            {selectedBlock.heavyRainRisk}%
          </span>
        </div>
      </div>

      {/* 4. SOWING WINDOW */}
      <div className="space-y-0.5">
        <span className="text-[10px] font-black uppercase text-gray-400 tracking-wider block">
          SOWING WINDOW
        </span>
        <div className="text-base font-black text-[#FB923C] font-sans">
          {selectedBlock.sowingWindow.replace("–", " — ")}
        </div>
      </div>

      {/* 5. Agronomic Advisory Note */}
      <div className="pt-2 border-t border-white/10 space-y-1">
        <span className="text-[10px] font-black uppercase text-[#34D399] tracking-wider block">
          AGRONOMIC ADVISORY
        </span>
        <p className="text-[11.5px] text-gray-200 leading-snug font-medium">
          {selectedBlock.recommendedAction}
        </p>
      </div>

      {/* 6. CTA Button */}
      <Link
        href="/advisory"
        className="w-full inline-flex items-center justify-center gap-2 py-2.5 text-xs font-black text-white bg-gradient-to-r from-[#EA580C] to-[#C2410C] hover:from-[#F97316] rounded-xl shadow-lg transition-all cursor-pointer"
      >
        <span>View Full Advisory</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </div>
  );
}

export default LocationDetails;
