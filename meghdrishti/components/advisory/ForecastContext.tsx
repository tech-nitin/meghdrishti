"use client";

import React from "react";
import Link from "next/link";
import { useApp } from "@/lib/context/AppContext";
import { CloudRain, ArrowRight, Sun, Droplets, AlertTriangle } from "lucide-react";

export interface ForecastContextProps {
  className?: string;
}

export function ForecastContext({ className = "" }: ForecastContextProps) {
  const { currentLocation, language } = useApp();

  const daysOutlook = [
    { day: "Day 1", date: "16 Jun", rainProb: 88, rainMm: "18-24mm", condition: "Surge Rain", risk: "heavy" },
    { day: "Day 2", date: "17 Jun", rainProb: 82, rainMm: "20-28mm", condition: "Active Rain", risk: "favorable" },
    { day: "Day 3", date: "18 Jun", rainProb: 74, rainMm: "8-14mm", condition: "Stabilizing", risk: "favorable" },
    { day: "Day 4", date: "19 Jun", rainProb: 68, rainMm: "5-10mm", condition: "Optimal Moisture", risk: "favorable" },
    { day: "Day 5", date: "20 Jun", rainProb: 55, rainMm: "2-6mm", condition: "Light Showers", risk: "favorable" },
    { day: "Day 6", date: "21 Jun", rainProb: 38, rainMm: "0-3mm", condition: "Scattered", risk: "caution" },
    { day: "Day 7", date: "22 Jun", rainProb: 24, rainMm: "0mm", condition: "Break Phase", risk: "dry" },
  ];

  return (
    <section className={`w-full space-y-4 ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-3 border-b border-[#DED9CB]/70">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-[#19362F] font-sans tracking-tight uppercase">
            {language === "hi" ? "आगामी 7-दिवसीय मौसम पूर्वानुमान" : "NEXT 7 DAYS WEATHER CONTEXT"}
          </h2>
          <p className="text-xs sm:text-sm text-[#687A73] font-medium pt-0.5">
            {language === "hi"
              ? "वर्षा संभावना, अनुमानित मात्रा एवं फसल जोखिम अवलोकन"
              : `Precipitation probability and agro-climatic hazard trajectory for ${currentLocation.district} District`}
          </p>
        </div>

        <Link
          href="/forecast"
          className="inline-flex items-center gap-1.5 text-xs font-black text-[#126B4F] hover:text-[#173B32] hover:underline cursor-pointer self-start sm:self-auto"
        >
          <span>{language === "hi" ? "विस्तृत 14-दिवसीय पूर्वानुमान देखें" : "View detailed 14-day forecast"}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* 7-Day Horizontal Outlook Canvas */}
      <div className="p-5 rounded-3xl bg-[#FFFDF8]/95 border border-[#DED9CB] shadow-2xs overflow-x-auto">
        <div className="min-w-[700px] grid grid-cols-7 gap-3">
          {daysOutlook.map((d, idx) => {
            const isHeavy = d.risk === "heavy";
            const isDry = d.risk === "dry";

            return (
              <div
                key={idx}
                className={`p-3.5 rounded-2xl border text-center space-y-2.5 transition-all ${
                  isHeavy
                    ? "bg-[#6F9EAB]/10 border-[#6F9EAB]/40"
                    : isDry
                    ? "bg-[#D99A2B]/10 border-[#D99A2B]/40"
                    : "bg-[#E8EFE7]/60 border-[#126B4F]/30"
                }`}
              >
                {/* Date & Day */}
                <div>
                  <span className="text-[10px] font-black uppercase text-[#687A73] block">
                    {d.day}
                  </span>
                  <span className="text-xs font-black text-[#19362F] font-sans">
                    {d.date}
                  </span>
                </div>

                {/* Rain Prob Meter */}
                <div className="space-y-0.5">
                  <div className="text-base font-black font-sans text-[#126B4F]">
                    {d.rainProb}%
                  </div>
                  <span className="text-[9.5px] font-bold text-[#687A73] block">
                    {d.rainMm}
                  </span>
                </div>

                {/* Condition Tag */}
                <div className="pt-1.5 border-t border-[#DED9CB]/60">
                  <span
                    className={`inline-block text-[9.5px] font-black uppercase px-2 py-0.5 rounded-md ${
                      isHeavy
                        ? "bg-[#6F9EAB]/20 text-[#2D5A64]"
                        : isDry
                        ? "bg-[#D99A2B]/20 text-[#8F6114]"
                        : "bg-[#126B4F]/15 text-[#126B4F]"
                    }`}
                  >
                    {d.condition}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ForecastContext;
