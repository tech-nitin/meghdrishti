"use client";

import React from "react";
import type { CropInfo } from "@/types/crop";
import { useApp } from "@/lib/context/AppContext";
import { Calendar, CheckCircle, Clock, AlertTriangle } from "lucide-react";

export interface SowingWindowTimelineProps {
  crop: CropInfo;
  className?: string;
}

export function SowingWindowTimeline({
  crop,
  className = "",
}: SowingWindowTimelineProps) {
  const { language } = useApp();

  const days = [
    { date: "16 JUN", label: "Pre-Onset Surge", status: "wait", rainfall: "18mm", wetness: "52%" },
    { date: "17 JUN", label: "Soil Wetting", status: "wait", rainfall: "24mm", wetness: "64%" },
    { date: "18 JUN", label: "Window Opens", status: "recommended", rainfall: "12mm", wetness: "72%" },
    { date: "19 JUN", label: "Optimal Moisture", status: "recommended", rainfall: "8mm", wetness: "76%" },
    { date: "20 JUN", label: "Peak Sowing", status: "recommended", rainfall: "6mm", wetness: "74%" },
    { date: "21 JUN", label: "Favorable", status: "recommended", rainfall: "4mm", wetness: "70%" },
    { date: "22 JUN", label: "Window Closes", status: "recommended", rainfall: "2mm", wetness: "66%" },
    { date: "23 JUN", label: "Break Spell Starts", status: "caution", rainfall: "0mm", wetness: "58%" },
    { date: "24 JUN", label: "Dry Spell Risk", status: "caution", rainfall: "0mm", wetness: "51%" },
  ];

  return (
    <section className={`w-full space-y-4 ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-3 border-b border-[#DED9CB]/70">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-[#19362F] font-sans tracking-tight uppercase">
            {language === "hi" ? "बुवाई खिड़की समयरेखा" : "SOWING WINDOW TIMELINE"}
          </h2>
          <p className="text-xs sm:text-sm text-[#687A73] font-medium pt-0.5">
            {language === "hi"
              ? "वर्षा स्थिरीकरण और मृदा नमी के अनुसार अनुशंसित बुवाई अवधि"
              : `Dynamic planting window calibrated for ${crop.name} across Indore District`}
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5 font-bold text-[#D56F43]">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#D56F43]" />
            <span>{language === "hi" ? "अनुशंसित बुवाई" : "Recommended Window"}</span>
          </div>
          <div className="flex items-center gap-1.5 font-bold text-[#D99A2B]">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#D99A2B]" />
            <span>{language === "hi" ? "शुष्क विराम जोखिम" : "Break Spell"}</span>
          </div>
        </div>
      </div>

      {/* Sowing Timeline Chart Canvas */}
      <div className="p-5 sm:p-6 rounded-3xl bg-[#FFFDF8]/95 border border-[#DED9CB] shadow-2xs space-y-5">
        
        {/* Recommended Range Banner */}
        <div className="p-4 rounded-2xl bg-[#D56F43]/10 border border-[#D56F43]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#D56F43] text-white flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] font-black uppercase text-[#D56F43] tracking-wider">
                {language === "hi" ? "लक्ष्य बुवाई खिड़की" : "OPTIMAL KHARIF SOWING WINDOW"}
              </div>
              <div className="text-xl font-black text-[#19362F] font-sans">
                {crop.optimalSowingWindow.formatted}
              </div>
            </div>
          </div>

          <div className="text-xs font-semibold text-[#19362F] max-w-md">
            {language === "hi"
              ? "65-75 मिमी वर्षा संचय के बाद बुवाई करें ताकि 23 जून से संभावित ड्राई स्पेल में बीज सुरक्षित रहे।"
              : "Sow after 65-75 mm cumulative rain to ensure root establishment prior to the 23-25 June break phase."}
          </div>
        </div>

        {/* Timeline Day Grid (Horizontal Scroll on Mobile) */}
        <div className="overflow-x-auto pb-2">
          <div className="min-w-[640px] grid grid-cols-9 gap-2 text-center">
            {days.map((day, idx) => {
              const isRec = day.status === "recommended";
              const isCaution = day.status === "caution";

              return (
                <div
                  key={idx}
                  className={`p-3 rounded-2xl border transition-all flex flex-col justify-between gap-2.5 ${
                    isRec
                      ? "bg-[#D56F43]/15 border-[#D56F43] shadow-2xs ring-1 ring-[#D56F43]/20"
                      : isCaution
                      ? "bg-[#D99A2B]/10 border-[#D99A2B]/40"
                      : "bg-[#F4F1E8]/70 border-[#DED9CB]/70"
                  }`}
                >
                  <div className="space-y-0.5">
                    <span
                      className={`text-xs font-black block font-sans ${
                        isRec
                          ? "text-[#D56F43]"
                          : isCaution
                          ? "text-[#D99A2B]"
                          : "text-[#19362F]"
                      }`}
                    >
                      {day.date}
                    </span>
                    <span className="text-[9.5px] font-bold text-[#687A73] block leading-tight">
                      {day.label}
                    </span>
                  </div>

                  {/* Micro Metrics */}
                  <div className="pt-2 border-t border-[#DED9CB]/60 space-y-0.5 text-[10px]">
                    <div className="flex justify-between text-[#687A73]">
                      <span>Rain:</span>
                      <span className="font-bold text-[#19362F]">{day.rainfall}</span>
                    </div>
                    <div className="flex justify-between text-[#687A73]">
                      <span>Moist:</span>
                      <span className="font-bold text-[#126B4F]">{day.wetness}</span>
                    </div>
                  </div>

                  {/* Status Indicator Bar */}
                  <div
                    className={`h-1.5 w-full rounded-full ${
                      isRec
                        ? "bg-[#D56F43]"
                        : isCaution
                        ? "bg-[#D99A2B]"
                        : "bg-[#DED9CB]"
                    }`}
                  />
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}

export default SowingWindowTimeline;
