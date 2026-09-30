"use client";

import React from "react";
import { CloudRain, Calendar, Sprout, AlertTriangle, ShieldCheck } from "lucide-react";
import { useApp } from "@/lib/context/AppContext";

export interface ForecastSignalStripProps {
  className?: string;
}

export function ForecastSignalStrip({ className = "" }: ForecastSignalStripProps) {
  const { language } = useApp();

  const signals = [
    {
      label: language === "hi" ? "संचयी वर्षा" : "RAIN",
      value: "68–92 mm",
      desc: language === "hi" ? "आगामी 7 दिन" : "Next 7-day total",
      icon: CloudRain,
      color: "text-[#2B7A8C]",
      iconColor: "text-[#2B7A8C]",
    },
    {
      label: language === "hi" ? "मानसून आगमन" : "ONSET",
      value: "18 JUN",
      desc: language === "hi" ? "स्थिरता खिड़की" : "Stabilization window",
      icon: Calendar,
      color: "text-[#126B4F]",
      iconColor: "text-[#126B4F]",
    },
    {
      label: language === "hi" ? "शुष्क दौर (ब्रेक)" : "DRY SPELL",
      value: "22–25 JUN",
      desc: language === "hi" ? "3-4 दिन का अंतराल" : "3–4 day transition",
      icon: Sprout,
      color: "text-[#D56F43]",
      iconColor: "text-[#D56F43]",
    },
    {
      label: language === "hi" ? "भारी वर्षा जोखिम" : "HEAVY RAIN",
      value: "MODERATE",
      desc: language === "hi" ? "14% उछाल संभावना" : "14% surge hazard",
      icon: AlertTriangle,
      color: "text-[#D99A2B]",
      iconColor: "text-[#D99A2B]",
    },
    {
      label: language === "hi" ? "पूर्वानुमान विश्वास" : "CONFIDENCE",
      value: "82%",
      desc: language === "hi" ? "बहु-मॉडल सहमति" : "Ensemble consensus",
      icon: ShieldCheck,
      color: "text-[#19362F]",
      iconColor: "text-[#126B4F]",
    },
  ];

  return (
    <section className={`w-full space-y-2 ${className}`}>
      {/* Continuous Analytical Rail with Vertical Separators */}
      <div className="py-5 border-y border-[#DED9CB]/80 bg-[#F4F1E8]/60">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x divide-[#DED9CB]/70">
          {signals.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="py-2.5 sm:py-1 px-4 sm:px-6 first:pl-2 last:pr-2 flex flex-col justify-center space-y-1"
              >
                <div className="flex items-center gap-1.5 text-[10.5px] font-black text-white/80 uppercase tracking-wider">
                  <Icon className={`w-3.5 h-3.5 ${item.iconColor} shrink-0`} />
                  <span className="truncate">{item.label}</span>
                </div>
                <div className={`text-2xl sm:text-3xl font-black font-sans tracking-tight leading-none ${item.color}`}>
                  {item.value}
                </div>
                <p className="text-[11px] text-white/75 font-medium pt-0.5">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ForecastSignalStrip;
