"use client";

import React from "react";
import { MapPin, Printer, Languages, Sparkles } from "lucide-react";
import { useApp } from "@/lib/context/AppContext";

export interface AdvisoryHeaderProps {
  farmerView: boolean;
  onToggleView: (farmer: boolean) => void;
  className?: string;
}

export function AdvisoryHeader({
  farmerView,
  onToggleView,
  className = "",
}: AdvisoryHeaderProps) {
  const { currentLocation, language, setLanguage, setLocationModalOpen } = useApp();

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className={`space-y-4 pb-4 border-b border-white/10 ${className}`}>
      {/* Top Meta Bar: Breadcrumb + Mode & Print Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Breadcrumb Location Hierarchy */}
        <button
          type="button"
          onClick={() => setLocationModalOpen(true)}
          className="group inline-flex items-center gap-1.5 text-gray-300 hover:text-white font-bold transition-colors cursor-pointer"
        >
          <MapPin className="w-3.5 h-3.5 text-[#34D399]" />
          <span>{currentLocation.state}</span>
          <span className="text-white/30">/</span>
          <span>{currentLocation.district}</span>
          <span className="text-white/30">/</span>
          <span>{currentLocation.district} District</span>
          <span className="text-white/30">/</span>
          <span className="text-white font-black group-hover:underline">
            {currentLocation.block || currentLocation.name}
          </span>
        </button>

        {/* View Mode & Actions Toolbar */}
        <div className="flex items-center gap-2">
          {/* Technical View vs Farmer View Segmented Toggle */}
          <div className="inline-flex items-center p-0.5 bg-[#0C201A]/90 border border-[#34D399]/40 rounded-xl text-[11px] font-black tracking-wide backdrop-blur-md">
            <button
              type="button"
              onClick={() => onToggleView(false)}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                !farmerView
                  ? "bg-[#176B4D] text-white shadow-xs border border-[#34D399]/40"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              TECHNICAL VIEW
            </button>
            <button
              type="button"
              onClick={() => onToggleView(true)}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                farmerView
                  ? "bg-[#176B4D] text-white shadow-xs border border-[#34D399]/40"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              FARMER VIEW
            </button>
          </div>

          {/* Quick Language Toggle */}
          <button
            type="button"
            onClick={() => setLanguage(language === "en" ? "hi" : "en")}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-black text-white bg-[#0C201A]/90 hover:bg-[#1A4235] border border-[#34D399]/40 rounded-xl shadow-xs transition-colors cursor-pointer backdrop-blur-md"
            title="Toggle English / Hindi"
          >
            <Languages className="w-3.5 h-3.5 text-[#34D399]" />
            <span>{language === "en" ? "हिन्दी" : "EN"}</span>
          </button>

          {/* Print Advisory CTA */}
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-black text-white bg-[#0C201A]/90 hover:bg-[#1A4235] border border-[#34D399]/40 rounded-xl shadow-xs transition-colors cursor-pointer backdrop-blur-md"
          >
            <Printer className="w-3.5 h-3.5 text-[#34D399]" />
            <span className="hidden sm:inline">Print Advisory</span>
          </button>
        </div>
      </div>

      {/* Editorial Title & Prototype Status */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pt-1">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-black tracking-widest text-[#34D399] uppercase">
              {farmerView ? "कृषि निर्णय केंद्र" : "AGRICULTURAL DECISION CENTER"}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-sans tracking-tight leading-[1.08] drop-shadow-sm">
            {language === "hi"
              ? "फसल-विशिष्ट कृषि मौसम परामर्श"
              : "Hyperlocal Agrometeorological Advisory"}
          </h1>
          <p className="text-sm sm:text-base text-gray-200 font-medium max-w-2xl leading-relaxed">
            {language === "hi"
              ? `${currentLocation.district} जिले के लिए स्थानीय वर्षा अनुमान और बुवाई दिशा-निर्देश।`
              : `Crop-specific guidance derived from local monsoon intelligence for ${currentLocation.name}, ${currentLocation.district} District.`}
          </p>
        </div>

        {/* Live Status Badge */}
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#0C201A]/85 border border-[#34D399]/40 shadow-lg backdrop-blur-md self-start lg:self-auto text-white">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#34D399] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#34D399]" />
          </span>
          <span className="text-[11px] font-black uppercase text-white tracking-wide">
            PROTOTYPE ADVISORY
          </span>
          <span className="text-gray-400">•</span>
          <span className="text-[11px] font-extrabold text-[#34D399]">
            SIMULATED DATA
          </span>
        </div>
      </div>
    </div>
  );
}

export default AdvisoryHeader;
