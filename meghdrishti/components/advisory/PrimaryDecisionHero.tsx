"use client";

import React from "react";
import Image from "next/image";
import type { CropInfo } from "@/types/crop";
import { useApp } from "@/lib/context/AppContext";
import {
  Calendar,
  AlertCircle,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowDown,
} from "lucide-react";

export interface PrimaryDecisionHeroProps {
  crop: CropInfo;
  farmerView?: boolean;
  className?: string;
}

export function PrimaryDecisionHero({
  crop,
  farmerView = false,
  className = "",
}: PrimaryDecisionHeroProps) {
  const { language } = useApp();

  // Priority indicator formatting
  const getPriorityBadge = () => {
    switch (crop.priority) {
      case "wait":
        return {
          label: language === "hi" ? "स्थिरता की प्रतीक्षा करें" : "WAIT FOR RAIN STABILIZATION",
          color: "bg-[#D56F43]/15 text-[#D56F43] border-[#D56F43]/30",
          dot: "bg-[#D56F43]",
        };
      case "monitor":
        return {
          label: language === "hi" ? "सक्रिय निगरानी" : "MONITOR",
          color: "bg-[#D99A2B]/15 text-[#D99A2B] border-[#D99A2B]/30",
          dot: "bg-[#D99A2B]",
        };
      case "actionable":
      default:
        return {
          label: language === "hi" ? "वर्तमान में कार्रवाई योग्य" : "ACTIONABLE NOW",
          color: "bg-[#E8EFE7] text-[#126B4F] border-[#126B4F]/30",
          dot: "bg-[#126B4F]",
        };
    }
  };

  const priority = getPriorityBadge();

  return (
    <section
      className={`w-full bg-[#FFFDF8]/95 border border-[#DED9CB] rounded-3xl overflow-hidden shadow-sm ${className}`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* LEFT (Col 5 / 42%): Agricultural Photography Visual Hero */}
        <div className="lg:col-span-5 relative min-h-[260px] sm:min-h-[320px] lg:min-h-[400px] overflow-hidden bg-[#19362F] flex flex-col justify-between p-6 sm:p-8 text-white">
          {/* Photographic Background */}
          {crop.image && (
            <div className="absolute inset-0 z-0">
              <Image
                src={crop.image}
                alt={crop.name}
                fill
                priority
                className="object-cover object-center opacity-70 scale-105 transition-transform duration-700 hover:scale-100"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#19362F] via-[#19362F]/60 to-[#19362F]/30" />
            </div>
          )}

          {/* Top Overlay Badge */}
          <div className="relative z-10 flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-white">
              {crop.name.toUpperCase()} • {crop.season || "KHARIF 2026"}
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#4E8D56] ring-4 ring-white/20" />
          </div>

          {/* Bottom Overlay Info */}
          <div className="relative z-10 space-y-2">
            <div className="text-xs font-bold text-[#DDE7D7] uppercase tracking-wider">
              {language === "hi" ? "लक्षित बुवाई अवधि" : "Target Agronomic Window"}
            </div>
            <div className="text-2xl sm:text-3xl font-black font-sans tracking-tight text-white">
              {language === "hi"
                ? crop.optimalSowingWindow.formattedHindi || crop.optimalSowingWindow.formatted
                : crop.optimalSowingWindow.formatted}
            </div>
            <div className="inline-flex items-center gap-1.5 text-xs text-[#DDE7D7] font-medium pt-1">
              <Sparkles className="w-3.5 h-3.5 text-[#E8EFE7]" />
              <span>
                {language === "hi"
                  ? "काली मिट्टी एवं मालवा पठार के लिए अनुकूलित"
                  : "Calibrated for Malwa Black Vertisols"}
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT (Col 7 / 58%): Decision & Recommendation Core */}
        <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
          
          {/* Top Row: Recommendation Tag + Priority Status */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#DED9CB]/70">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-black uppercase tracking-wider text-[#126B4F]">
                {language === "hi" ? "मुख्य परामर्श" : "CURRENT RECOMMENDATION"}
              </span>
            </div>

            {/* Decision Priority Pill */}
            <div
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-xl border text-[11px] font-black tracking-wide ${priority.color}`}
            >
              <span className={`w-2 h-2 rounded-full ${priority.dot} animate-pulse`} />
              <span>{priority.label}</span>
            </div>
          </div>

          {/* Main Recommendation Quote */}
          <div className="space-y-3">
            <blockquote className="text-xl sm:text-2xl lg:text-3xl font-black text-[#19362F] font-sans tracking-tight leading-snug">
              &ldquo;
              {language === "hi" || farmerView
                ? crop.recommendationHindi
                : crop.recommendation}
              &rdquo;
            </blockquote>

            {/* Explanatory Rationale */}
            <p className="text-xs sm:text-sm text-[#687A73] leading-relaxed font-medium">
              {language === "hi" || farmerView
                ? crop.reasonHindi
                : crop.reason}
            </p>
          </div>

          {/* Sowing Status Strip */}
          <div className="p-4 rounded-2xl bg-[#F4F1E8]/70 border border-[#DED9CB]/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-0.5">
              <span className="text-[10px] font-black uppercase text-[#687A73] tracking-wider block">
                {language === "hi" ? "बुवाई खिड़की" : "SOWING WINDOW"}
              </span>
              <div className="text-base sm:text-lg font-black text-[#D56F43] font-sans">
                {crop.optimalSowingWindow.formatted}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#687A73]">
                {language === "hi" ? "स्थिति:" : "STATUS:"}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#126B4F] text-white text-xs font-black tracking-wider uppercase shadow-2xs">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>
                  {language === "hi"
                    ? crop.statusTextHindi || "WINDOW OPEN"
                    : crop.statusText || "WINDOW OPEN"}
                </span>
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default PrimaryDecisionHero;
