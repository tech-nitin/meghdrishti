"use client";

import React from "react";
import { CloudRain, Compass, Activity, ShieldCheck } from "lucide-react";
import { useApp } from "@/lib/context/AppContext";

export interface ForecastEvolutionProps {
  className?: string;
}

export function ForecastEvolution({ className = "" }: ForecastEvolutionProps) {
  const { language } = useApp();

  const horizons = [
    {
      label: language === "hi" ? "निकट अवधि" : "NEAR TERM",
      range: "1–7 DAYS",
      tendency: language === "hi" ? "सक्रिय वर्षा (Wet)" : "Active / Wet",
      confidence: "82% (High)",
      phase: language === "hi" ? "आगमन एवं सक्रिय फैलाव" : "Onset & Surge",
      desc: "Widespread soaking rainfall of 68–92 mm supporting seedbed moisture stabilization.",
      color: "border-[#126B4F] bg-[#E8EFE7]/50",
      tagColor: "bg-[#126B4F] text-white",
    },
    {
      label: language === "hi" ? "विस्तारित अवधि" : "EXTENDED",
      range: "8–14 DAYS",
      tendency: language === "hi" ? "संक्रमण (Transition)" : "Transition",
      confidence: "68% (Moderate)",
      phase: language === "hi" ? "अल्प शुष्क विराम" : "Short Break Spell",
      desc: "Monsoon trough shift causing transient rainfall hiatus (22–25 June).",
      color: "border-[#D99A2B]/60 bg-[#D99A2B]/10",
      tagColor: "bg-[#D99A2B] text-white",
    },
    {
      label: language === "hi" ? "उप-मौसमी अवधि" : "SUB-SEASONAL",
      range: "15–21 DAYS",
      tendency: language === "hi" ? "पुनर्जीवन एवं अनिश्चितता" : "Break / Uncertainty",
      confidence: "54% (Lower)",
      phase: language === "hi" ? "बंगाल खाड़ी पुनर्जीवन" : "Bay Low Revival",
      desc: "Low pressure system from Bay of Bengal projected to restore widespread showers.",
      color: "border-[#2B7A8C]/50 bg-[#2B7A8C]/10",
      tagColor: "bg-[#2B7A8C] text-white",
    },
    {
      label: language === "hi" ? "दीर्घकालिक सीमा" : "LONG RANGE",
      range: "22–30 DAYS",
      tendency: language === "hi" ? "स्थिर वर्षा चक्र" : "Revival Possibility",
      confidence: "45% (Experimental)",
      phase: language === "hi" ? "जुलाई शिखर मानसून" : "July Active Phase",
      desc: "Sub-seasonal ensemble models indicate climatological normal July precipitation.",
      color: "border-[#DED9CB] bg-[#F4F1E8]/70",
      tagColor: "bg-[#687A73] text-white",
    },
  ];

  const confidenceBars = [
    { label: "Near Term (1–7 Days)", value: 82, level: "High Confidence", color: "bg-[#126B4F]" },
    { label: "Extended (8–14 Days)", value: 68, level: "Moderate Confidence", color: "bg-[#4E8D56]" },
    { label: "Sub-Seasonal (15–30 Days)", value: 54, level: "Lower Confidence", color: "bg-[#D99A2B]" },
  ];

  return (
    <section className={`w-full space-y-6 ${className}`}>
      
      {/* 1. HOW THE MONSOON MAY EVOLVE */}
      <div className="space-y-4">
        <div className="pb-3 border-b border-[#DED9CB]/70">
          <h2 className="text-xl sm:text-2xl font-black text-[#19362F] font-sans tracking-tight uppercase">
            {language === "hi" ? "मानसून विकास क्रम (7–30 दिन)" : "HOW THE MONSOON MAY EVOLVE"}
          </h2>
          <p className="text-xs sm:text-sm text-[#687A73] font-medium pt-0.5">
            {language === "hi"
              ? "विभिन्न समयावधियों में वर्षा प्रवृत्ति, विश्वास स्तर और मौसमी चरण"
              : "Four-horizon meteorological trajectory from immediate onset to sub-seasonal revival"}
          </p>
        </div>

        {/* 4 Horizon Story Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {horizons.map((h, idx) => (
            <div
              key={idx}
              className={`p-5 rounded-3xl border shadow-2xs space-y-3.5 flex flex-col justify-between transition-all ${h.color}`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#687A73]">
                  {h.label}
                </span>
                <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${h.tagColor}`}>
                  {h.range}
                </span>
              </div>

              <div className="space-y-1">
                <div className="text-lg font-black text-[#19362F] font-sans tracking-tight">
                  {h.tendency}
                </div>
                <div className="text-xs font-bold text-[#126B4F]">
                  {h.phase}
                </div>
              </div>

              <p className="text-[11.5px] text-[#687A73] leading-relaxed font-medium pt-2 border-t border-[#DED9CB]/60">
                {h.desc}
              </p>

              <div className="text-[10.5px] font-bold text-[#19362F] flex items-center justify-between">
                <span className="text-[#687A73]">Confidence:</span>
                <span>{h.confidence}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. UNCERTAINTY & FORECAST CONFIDENCE VISUALIZATION */}
      <div className="p-6 rounded-3xl bg-[#FFFDF8]/95 border border-[#DED9CB] shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#DED9CB]/70">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#E8EFE7] flex items-center justify-center text-[#126B4F]">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
            <h3 className="text-base font-black text-[#19362F] font-sans uppercase tracking-tight">
              {language === "hi" ? "पूर्वानुमान विश्वसनीयता एवं अनिश्चितता वक्र" : "FORECAST CONFIDENCE DECAY CURVE"}
            </h3>
          </div>

          <span className="text-xs font-bold text-[#687A73]">
            S2S Ensemble Dispersion Index
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Progress Bars (Col 8) */}
          <div className="lg:col-span-8 space-y-3.5">
            {confidenceBars.map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#19362F]">{item.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-[#687A73] font-medium">{item.level}</span>
                    <strong className="font-black text-sm text-[#19362F] font-sans">
                      {item.value}%
                    </strong>
                  </div>
                </div>

                <div className="w-full h-2 rounded-full bg-[#F4F1E8] border border-[#DED9CB]/60 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${item.color} transition-all duration-500`}
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Explanatory Scientific Note (Col 4) */}
          <div className="lg:col-span-4 p-4 rounded-2xl bg-[#F4F1E8]/70 border border-[#DED9CB] space-y-1 text-xs text-[#687A73]">
            <span className="text-[10.5px] font-black uppercase text-[#126B4F] tracking-wider block">
              {language === "hi" ? "वैज्ञानिक सिद्धांत" : "SCIENTIFIC RATIONALE"}
            </span>
            <p className="leading-relaxed font-medium">
              &ldquo;Confidence generally decreases as the forecast horizon extends due to non-linear atmospheric chaos in sub-seasonal scales.&rdquo;
            </p>
          </div>

        </div>
      </div>

    </section>
  );
}

export default ForecastEvolution;
