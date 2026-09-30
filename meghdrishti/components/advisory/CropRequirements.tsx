"use client";

import React from "react";
import type { CropInfo } from "@/types/crop";
import { useApp } from "@/lib/context/AppContext";
import { Droplets, ArrowDown, Award, ShieldCheck } from "lucide-react";

export interface CropRequirementsProps {
  crop: CropInfo;
  farmerView?: boolean;
  className?: string;
}

export function CropRequirements({
  crop,
  farmerView = false,
  className = "",
}: CropRequirementsProps) {
  const { language } = useApp();

  const items = [
    {
      label: language === "hi" ? "संचयी वर्षा आवश्यकता" : "CUMULATIVE RAIN",
      value: `${crop.rainfallThresholdMm} mm`,
      desc: language === "hi" ? "कम से कम 3-4 इंच गीली मिट्टी" : "Min 3–4 inch soil wetness profile",
      icon: Droplets,
      color: "text-[#126B4F]",
    },
    {
      label: language === "hi" ? "बुवाई की गहराई" : "SOWING DEPTH",
      value: crop.sowingDepth || "3.0–4.5 cm",
      desc: language === "hi" ? "अधिक गहराई पर न दबाएं" : "Avoid deep seed burial in vertisols",
      icon: ArrowDown,
      color: "text-[#19362F]",
    },
    {
      label: language === "hi" ? "अनुशंसित किस्में" : "RECOMMENDED VARIETIES",
      value: crop.varieties.slice(0, 2).join(", "),
      subValue: crop.varieties.length > 2 ? `+ ${crop.varieties.slice(2).join(", ")}` : "",
      desc: language === "hi" ? "प्रमाणित आईसीएआर बीज" : "Certified ICAR-IISR seed lots",
      icon: Award,
      color: "text-[#19362F]",
    },
    {
      label: language === "hi" ? "बीजोपचार प्रोटोकॉल" : "SEED TREATMENT",
      value: language === "hi" || farmerView ? "फफूंदनाशक + जैव कल्चर" : "Fungicide + Bio-Culture",
      desc: language === "hi" || farmerView ? crop.seedTreatmentHindi || "कार्बाक्सिन + राइजोबियम" : crop.seedTreatment || "Trichoderma + Rhizobium",
      icon: ShieldCheck,
      color: "text-[#126B4F]",
    },
  ];

  return (
    <section className={`w-full space-y-4 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#DED9CB]/70">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-[#19362F] font-sans tracking-tight uppercase">
            {language === "hi" ? "फसल मानक संक्षेप" : "CROP AT A GLANCE"}
          </h2>
          <p className="text-xs sm:text-sm text-[#687A73] font-medium pt-0.5">
            {language === "hi"
              ? `${crop.name} की वैज्ञानिक बुवाई आवश्यकताएं एवं पैरामीटर`
              : `Key agronomic thresholds and planting specifications for ${crop.name}`}
          </p>
        </div>
      </div>

      {/* 4 Compact Analytical Blocks */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-[#FFFDF8]/95 border border-[#DED9CB] shadow-2xs space-y-2 flex flex-col justify-between"
            >
              <div className="flex items-center gap-1.5 text-[10.5px] font-black text-[#687A73] uppercase tracking-wider">
                <Icon className="w-3.5 h-3.5 text-[#126B4F]" />
                <span className="truncate">{item.label}</span>
              </div>

              <div className="space-y-0.5">
                <div className={`text-xl sm:text-2xl font-black font-sans tracking-tight ${item.color}`}>
                  {item.value}
                </div>
                {item.subValue && (
                  <div className="text-[11px] font-bold text-[#687A73]">
                    {item.subValue}
                  </div>
                )}
              </div>

              <div className="pt-2 border-t border-[#DED9CB]/60 text-[11px] text-[#687A73] font-medium">
                {item.desc}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default CropRequirements;
