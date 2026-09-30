"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Calendar,
  CloudSun,
  ShieldAlert,
  Sprout,
  ArrowRight,
  Droplets,
  Layers,
  ThermometerSun,
  Compass,
  CheckCircle2,
} from "lucide-react";
import { useApp } from "@/lib/context/AppContext";

export function QuickIntelligenceSnapshot() {
  const { language, currentLocation } = useApp();

  return (
    <section className="w-full pb-16 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 bg-[#0C201A]/80 border border-[#34D399]/30 rounded-3xl shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl text-white">
          
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#34D399] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#34D399]" />
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  {language === "hi" ? "दैनिक क्षेत्रीय सारांश" : "Regional Agrometeorological Briefing"}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-gray-300">
                {currentLocation.name} ({currentLocation.district}, {currentLocation.state}) • Forecast Period: 16–22 June
              </p>
            </div>

            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#EA580C] to-[#C2410C] hover:from-[#F97316] hover:to-[#EA580C] px-5 py-2.5 rounded-full shadow-[0_4px_15px_rgba(234,88,12,0.4)] transition-all self-start sm:self-auto hover:-translate-y-0.5"
            >
              <span>{language === "hi" ? "विस्तृत डैशबोर्ड खोलें" : "Open Full Analytical Dashboard"}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6">
            {/* Stat 1: Sowing Window */}
            <div className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#34D399]/40 transition-all space-y-2 backdrop-blur-md">
              <div className="flex items-center justify-between text-gray-300">
                <span className="text-xs font-semibold">{language === "hi" ? "सोयाबीन बुवाई विंडो" : "Soybean Window"}</span>
                <Calendar className="w-4 h-4 text-[#34D399]" />
              </div>
              <div className="text-xl sm:text-2xl font-black text-white">18–22 June</div>
              <div className="text-[11px] text-[#34D399] font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Favorable (After 70mm rain)
              </div>
            </div>

            {/* Stat 2: Soil Moisture */}
            <div className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#38BDF8]/40 transition-all space-y-2 backdrop-blur-md">
              <div className="flex items-center justify-between text-gray-300">
                <span className="text-xs font-semibold">{language === "hi" ? "मृदा नमी स्तर" : "Soil Moisture"}</span>
                <Droplets className="w-4 h-4 text-[#38BDF8]" />
              </div>
              <div className="text-xl sm:text-2xl font-black text-white">68% Capacity</div>
              <div className="text-[11px] text-gray-300">Recharging (+14% this week)</div>
            </div>

            {/* Stat 3: Break Spell Warning */}
            <div className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#FBBF24]/40 transition-all space-y-2 backdrop-blur-md">
              <div className="flex items-center justify-between text-gray-300">
                <span className="text-xs font-semibold">{language === "hi" ? "शुष्क दौर जोखिम" : "Break Spell Hazard"}</span>
                <ShieldAlert className="w-4 h-4 text-[#FBBF24]" />
              </div>
              <div className="text-xl sm:text-2xl font-black text-[#FBBF24]">18% Moderate</div>
              <div className="text-[11px] text-gray-300">Projected 22-25 June</div>
            </div>

            {/* Stat 4: Climate Driver Status */}
            <div className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#34D399]/40 transition-all space-y-2 backdrop-blur-md">
              <div className="flex items-center justify-between text-gray-300">
                <span className="text-xs font-semibold">{language === "hi" ? "MJO / IOD प्रभाव" : "MJO & IOD Mode"}</span>
                <Compass className="w-4 h-4 text-[#34D399]" />
              </div>
              <div className="text-xl sm:text-2xl font-black text-[#34D399]">Active / +0.32</div>
              <div className="text-[11px] text-gray-300">Arabian moisture surge</div>
            </div>
          </div>

          {/* Sowing Advice Snippet */}
          <div className="p-4 rounded-2xl bg-[#176B4D]/40 border border-[#34D399]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#34D399] text-[#0C201A] flex items-center justify-center shrink-0 shadow-md">
                <Sprout className="w-5 h-5 font-bold" />
              </div>
              <div>
                <div className="text-xs font-extrabold text-[#34D399] uppercase tracking-wider">
                  {language === "hi" ? "विशेषज्ञ बुवाई मार्गदर्शन" : "Expert Agro-Advisory Note"}
                </div>
                <div className="text-xs text-gray-200 mt-0.5">
                  {language === "hi"
                    ? "शाजापुर जिले में 17-18 जून को 25-35 मिमी बारिश के बाद बुवाई करें। बीज को कवकनाशी व राइजोबियम से उपचारित करना अनिवार्य है।"
                    : "Wait for rainfall stabilization across Shajapur Block. Ensure broad-bed furrowing to hedge against transient breaks."}
                </div>
              </div>
            </div>

            <Link
              href="/advisory"
              className="text-xs font-bold text-[#34D399] hover:text-white underline whitespace-nowrap transition-colors"
            >
              {language === "hi" ? "पूरी सलाह पढ़ें →" : "Read Full Protocol →"}
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}

export default QuickIntelligenceSnapshot;
