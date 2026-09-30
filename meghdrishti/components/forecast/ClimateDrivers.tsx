"use client";

import React from "react";
import { Globe2, Wind, Waves, Activity } from "lucide-react";
import { useApp } from "@/lib/context/AppContext";

export interface ClimateDriversProps {
  className?: string;
}

export function ClimateDrivers({ className = "" }: ClimateDriversProps) {
  const { language } = useApp();

  const drivers = [
    {
      code: "ENSO",
      name: "El Niño-Southern Oscillation",
      value: "Neutral (0.0°C anomaly)",
      status: "Favorable",
      icon: Globe2,
    },
    {
      code: "IOD",
      name: "Indian Ocean Dipole",
      value: "Positive (+0.42°C)",
      status: "Moisture Enhancing",
      icon: Waves,
    },
    {
      code: "MJO",
      name: "Madden-Julian Oscillation",
      value: "Phase 3 (Active over Indian Ocean)",
      status: "Surge Supporting",
      icon: Wind,
    },
  ];

  return (
    <section className={`w-full space-y-4 ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-3 border-b border-[#DED9CB]/70">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-[#19362F] font-sans tracking-tight uppercase">
            {language === "hi" ? "जलवायु संकेतक संदर्भ" : "CLIMATE SIGNAL CONTEXT"}
          </h2>
          <p className="text-xs sm:text-sm text-[#687A73] font-medium pt-0.5">
            {language === "hi"
              ? "वैश्विक महासागरीय एवं वायुमंडलीय चालक (ENSO, IOD, MJO)"
              : "Synoptic-scale oceanic and atmospheric drivers informing the S2S ensemble"}
          </p>
        </div>

        <span className="text-[11px] font-black uppercase text-[#126B4F] bg-[#E8EFE7] px-3 py-1 rounded-full self-start sm:self-auto">
          PROPOSED MODEL INPUTS
        </span>
      </div>

      {/* 3 Driver Cards Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {drivers.map((d, idx) => {
          const Icon = d.icon;
          return (
            <div
              key={idx}
              className="p-5 rounded-3xl bg-[#FFFDF8]/95 border border-[#DED9CB] shadow-2xs space-y-2 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-[#126B4F]">
                  {d.code}
                </span>
                <Icon className="w-4 h-4 text-[#687A73]" />
              </div>

              <div className="space-y-0.5">
                <div className="text-base font-black text-[#19362F] font-sans">
                  {d.value}
                </div>
                <div className="text-[11px] text-[#687A73] font-medium">
                  {d.name}
                </div>
              </div>

              <div className="pt-2 border-t border-[#DED9CB]/60 flex items-center justify-between text-[11px]">
                <span className="text-[#687A73]">Influence:</span>
                <strong className="text-[#126B4F] font-black">{d.status}</strong>
              </div>
            </div>
          );
        })}
      </div>

      {/* Honest Scientific Note */}
      <div className="p-4 rounded-2xl bg-[#F4F1E8]/70 border border-[#DED9CB] text-xs text-[#687A73] leading-relaxed">
        &ldquo;These large-scale climate signals would be used as physical inputs in the production numerical forecasting system to bound long-range uncertainty.&rdquo;
      </div>
    </section>
  );
}

export default ClimateDrivers;
