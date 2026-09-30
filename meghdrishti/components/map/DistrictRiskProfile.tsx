"use client";

import React from "react";
import { CloudRain, Sprout, Droplets, Calendar } from "lucide-react";

export function DistrictRiskProfile() {
  const profileItems = [
    {
      label: "District rainfall probability",
      value: "78%",
      desc: "7-day precipitation probability",
      icon: CloudRain,
      valueColor: "text-white",
      iconColor: "text-[#34D399]",
    },
    {
      label: "Dry spell risk",
      value: "LOW",
      desc: "Limited moisture deficit hazard",
      icon: Sprout,
      valueColor: "text-[#34D399]",
      iconColor: "text-[#34D399]",
    },
    {
      label: "Soil moisture",
      value: "69%",
      desc: "Black cotton topsoil profile",
      icon: Droplets,
      valueColor: "text-[#38BDF8]",
      iconColor: "text-[#38BDF8]",
    },
    {
      label: "Recommended sowing window",
      value: "18–22 JUN",
      desc: "Optimal Kharif soybean window",
      icon: Calendar,
      valueColor: "text-[#FB923C]",
      iconColor: "text-[#FB923C]",
    },
  ];

  return (
    <section className="w-full space-y-4">
      {/* Section Header */}
      <div className="space-y-0.5">
        <h2 className="text-xl sm:text-2xl font-black text-white font-sans tracking-tight uppercase">
          INDORE DISTRICT RISK PROFILE
        </h2>
        <p className="text-xs sm:text-sm text-gray-300 font-medium">
          Current rainfall outlook and agricultural readiness across monitored blocks
        </p>
      </div>

      {/* Single Continuous Analytical Strip with Subtle Vertical Separators */}
      <div className="py-6 rounded-3xl border border-[#34D399]/30 bg-[#0C201A]/85 backdrop-blur-xl shadow-xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
          {profileItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="py-3 sm:py-1 px-4 sm:px-8 first:pl-6 last:pr-6 flex flex-col justify-center space-y-1.5"
              >
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-gray-300">
                  <Icon className={`w-3.5 h-3.5 ${item.iconColor} shrink-0`} />
                  <span>{item.label}</span>
                </div>
                <div className={`text-2xl sm:text-3xl font-black font-sans tracking-tight leading-none ${item.valueColor}`}>
                  {item.value}
                </div>
                <p className="text-[11.5px] text-gray-400 font-medium pt-0.5">
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

export default DistrictRiskProfile;
