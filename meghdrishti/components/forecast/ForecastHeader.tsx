"use client";

import React from "react";
import { MapPin, Sparkles, Activity } from "lucide-react";
import { useApp } from "@/lib/context/AppContext";

export interface ForecastHeaderProps {
  className?: string;
}

export function ForecastHeader({ className = "" }: ForecastHeaderProps) {
  const { currentLocation, language, setLocationModalOpen } = useApp();

  return (
    <div className={`space-y-4 pb-4 border-b border-white/10 ${className}`}>
      {/* Location Breadcrumb */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
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

        {/* Resolution Badge */}
        <div className="hidden sm:flex items-center gap-2 text-[11px] text-gray-300 font-medium">
          <Activity className="w-3.5 h-3.5 text-[#34D399]" />
          <span>Hyperlocal Resolution: 1.5 km² • S2S Ensemble</span>
        </div>
      </div>

      {/* Editorial Title & Prototype Status */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pt-1">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-black tracking-widest text-[#34D399] uppercase">
              {language === "hi" ? "विस्तारित मानसून पूर्वानुमान" : "S2S MONSOON INTELLIGENCE"}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-sans tracking-tight leading-[1.08] drop-shadow-sm">
            {language === "hi"
              ? "7–30 दिवसीय अति-स्थानीय मानसून परिदृश्य"
              : "7–30 Day Monsoon Outlook"}
          </h1>
          <p className="text-sm sm:text-base text-gray-200 font-medium max-w-2xl leading-relaxed">
            {language === "hi"
              ? `${currentLocation.district} जिले के लिए संचयी वर्षा, मानसून आगमन, शुष्क दौर (ब्रेक) और चरणबद्ध मौसम पूर्वानुमान।`
              : `Hyperlocal rainfall, onset, dry-spell and monsoon-phase intelligence for ${currentLocation.district} District.`}
          </p>
        </div>

        {/* Live Status Badge */}
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#0C201A]/85 border border-[#34D399]/40 shadow-lg backdrop-blur-md self-start lg:self-auto text-white">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#34D399] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#34D399]" />
          </span>
          <span className="text-[11px] font-black uppercase text-white tracking-wide">
            LIVE PROTOTYPE
          </span>
          <span className="text-gray-400">•</span>
          <span className="text-[11px] font-extrabold text-[#34D399]">
            PROTOTYPE DATA
          </span>
        </div>
      </div>
    </div>
  );
}

export default ForecastHeader;
