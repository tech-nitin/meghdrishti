"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sprout, Calendar, Sparkles } from "lucide-react";
import { useApp } from "@/lib/context/AppContext";

export function ForecastAdvisoryCTA({ className = "" }: { className?: string }) {
  const { language } = useApp();

  return (
    <section
      className={`w-full p-6 sm:p-8 rounded-3xl bg-[#19362F] text-white space-y-6 shadow-md ${className}`}
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-white/15 text-[#DDE7D7] border border-white/20">
              {language === "hi" ? "पूर्वानुमान से कृषि निर्णय" : "FORECAST TO FIELD DECISION"}
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-black font-sans tracking-tight leading-snug">
            {language === "hi"
              ? "वर्षा स्थिरीकरण के आधार पर बुवाई खिड़की निर्धारित है।"
              : "Rainfall stabilization is expected before the next favorable sowing window."}
          </h3>

          <p className="text-xs sm:text-sm text-[#DDE7D7] leading-relaxed font-medium">
            {language === "hi"
              ? "सोयाबीन, मक्का और कपास के लिए अनुशंसित 18–22 जून बुवाई खिड़की, बीजोपचार और खेत तैयारी प्रोटोकॉल देखें।"
              : "Access calibrated sowing parameters, seedbed moisture criteria, and disease protection protocols for Indore District."}
          </p>
        </div>

        {/* Action Button & Window Pill */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 shrink-0">
          <div className="p-3.5 rounded-2xl bg-white/10 border border-white/20 space-y-0.5 text-center sm:text-left">
            <span className="text-[10px] font-black uppercase text-[#DDE7D7] tracking-wider block">
              TARGET SOWING WINDOW
            </span>
            <div className="text-lg font-black text-white font-sans">
              18–22 JUN 2026
            </div>
          </div>

          <Link
            href="/advisory"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-[#D56F43] hover:bg-[#B75D3A] text-white font-black text-xs uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
          >
            <span>{language === "hi" ? "फसल सलाह देखें" : "View Crop Advisory"}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}

export default ForecastAdvisoryCTA;
