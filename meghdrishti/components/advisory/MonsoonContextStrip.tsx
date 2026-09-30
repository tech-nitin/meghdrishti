"use client";

import React from "react";
import { CloudRain, Zap, Sprout, AlertTriangle, ShieldCheck } from "lucide-react";
import { useApp } from "@/lib/context/AppContext";

export interface MonsoonContextStripProps {
  className?: string;
}

export function MonsoonContextStrip({ className = "" }: MonsoonContextStripProps) {
  const { currentLocation, language } = useApp();

  const metrics = [
    {
      label: language === "hi" ? "वर्षा संभावना" : "RAINFALL PROBABILITY",
      value: `${currentLocation.rainfallProbability || 78}%`,
      sub: language === "hi" ? "7-दिवसीय संचयी" : "7-day cumulative",
      icon: CloudRain,
      color: "text-[#19362F]",
      iconColor: "text-[#126B4F]",
    },
    {
      label: language === "hi" ? "मानसून आगमन" : "ONSET PROBABILITY",
      value: `${currentLocation.onsetProbability || 82}%`,
      sub: language === "hi" ? "स्थानीय सक्रियता" : "Hyperlocal surge",
      icon: Zap,
      color: "text-[#126B4F]",
      iconColor: "text-[#126B4F]",
    },
    {
      label: language === "hi" ? "शुष्क दौर जोखिम" : "DRY SPELL RISK",
      value: currentLocation.breakRisk ? (currentLocation.breakRisk < 20 ? "LOW" : "MODERATE") : "LOW",
      sub: language === "hi" ? "22-25 जून ब्रेक" : "16% deficit hazard",
      icon: Sprout,
      color: "text-[#126B4F]",
      iconColor: "text-[#4E8D56]",
    },
    {
      label: language === "hi" ? "भारी वर्षा जोखिम" : "HEAVY RAIN RISK",
      value: currentLocation.heavyRainRisk ? (currentLocation.heavyRainRisk > 15 ? "HIGH" : "MODERATE") : "MODERATE",
      sub: language === "hi" ? "जलभराव संभावना" : "14% surge risk",
      icon: AlertTriangle,
      color: "text-[#D99A2B]",
      iconColor: "text-[#D99A2B]",
    },
    {
      label: language === "hi" ? "पूर्वानुमान सटीकता" : "FORECAST CONFIDENCE",
      value: "82%",
      sub: language === "hi" ? "बहु-मॉडल सहमति" : "Ensemble consensus",
      icon: ShieldCheck,
      color: "text-[#19362F]",
      iconColor: "text-[#126B4F]",
    },
  ];

  return (
    <section className={`w-full space-y-2 ${className}`}>
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-black uppercase tracking-wider text-[#126B4F]">
            {language === "hi" ? "जलवायु एवं मौसम संदर्भ" : "MONSOON CLIMATE CONTEXT"}
          </span>
          <span className="text-[#687A73]">•</span>
          <span className="text-xs font-bold text-[#687A73]">
            {currentLocation.district} District ({currentLocation.block || "Indore Block"})
          </span>
        </div>
      </div>

      {/* Continuous Analytical Strip with Vertical Separators */}
      <div className="py-5 border-y border-[#DED9CB]/80 bg-[#F4F1E8]/60">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x divide-[#DED9CB]/70">
          {metrics.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="py-2.5 sm:py-1 px-4 sm:px-6 first:pl-2 last:pr-2 flex flex-col justify-center space-y-1"
              >
                <div className="flex items-center gap-1.5 text-[10.5px] font-black text-[#687A73] uppercase tracking-wider">
                  <Icon className={`w-3.5 h-3.5 ${item.iconColor} shrink-0`} />
                  <span className="truncate">{item.label}</span>
                </div>
                <div className={`text-2xl sm:text-3xl font-black font-sans tracking-tight leading-none ${item.color}`}>
                  {item.value}
                </div>
                <p className="text-[11px] text-[#687A73] font-medium pt-0.5">
                  {item.sub}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default MonsoonContextStrip;
