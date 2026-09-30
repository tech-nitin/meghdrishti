"use client";

import React from "react";
import { Calendar, Sprout, ShieldAlert, CloudRain } from "lucide-react";

export function QuickIntelligenceStrip() {
  const items = [
    {
      title: "WEEKLY OUTLOOK",
      value: "68–92 mm",
      desc: "Expected rainfall (next 7 days)",
      icon: CloudRain,
      valueColor: "text-[#18342C]",
      iconColor: "text-[#176B4D]",
    },
    {
      title: "DRY SPELL RISK",
      value: "LOW",
      desc: "Limited moisture deficit risk",
      icon: Sprout,
      valueColor: "text-[#176B4D]",
      iconColor: "text-[#176B4D]",
    },
    {
      title: "HEAVY RAIN RISK",
      value: "MODERATE",
      desc: "Isolated heavy rain (18–20 Jun)",
      icon: ShieldAlert,
      valueColor: "text-[#D99A32]",
      iconColor: "text-[#D99A32]",
    },
    {
      title: "BEST FOR SOWING",
      value: "18–22 June",
      desc: "Optimal window (Soybean)",
      icon: Calendar,
      valueColor: "text-[#176B4D]",
      iconColor: "text-[#176B4D]",
    },
  ];

  return (
    <section className="w-full">
      {/* Editorial publication-style horizontal intelligence band: No cards, no boxes, no shadows */}
      <div className="py-6 border-y border-[#DED9CB]/80 bg-[#F5F1E7]/40">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#DED9CB]/70">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="py-3 sm:py-1 px-4 sm:px-8 first:pl-2 last:pr-2 flex flex-col justify-center space-y-1.5"
              >
                <div className="flex items-center gap-2 text-[10.5px] font-black tracking-wider uppercase text-[#63736D]">
                  <Icon className={`w-3.5 h-3.5 ${item.iconColor} shrink-0`} />
                  <span>{item.title}</span>
                </div>
                <div className={`text-2xl sm:text-3xl font-black font-sans tracking-tight leading-none ${item.valueColor}`}>
                  {item.value}
                </div>
                <p className="text-xs text-[#63736D] font-medium pt-0.5">
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

export default QuickIntelligenceStrip;
