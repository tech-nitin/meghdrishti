"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  CloudRain,
  Droplets,
  Sprout,
  ShieldCheck,
  TrendingUp,
  AlertCircle,
  Calendar,
} from "lucide-react";
import { useApp } from "@/lib/context/AppContext";
import { phaseSignals, mockMonsoonForecast } from "@/data/forecasts";

export function MonsoonStatus() {
  const { selectedPhase, setSelectedPhase, currentLocation, language } = useApp();
  const signal = phaseSignals[selectedPhase] || phaseSignals.active;

  return (
    <div className="p-6 sm:p-7 bg-[#FAF8F2] border border-[#DCCDB5] rounded-3xl shadow-sm space-y-6">
      {/* Top Title & Location header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#DCCDB5]">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#315C3F]" />
            <h2 className="text-lg sm:text-xl font-bold text-[#20312C] font-sans">
              {language === "hi" ? "वर्तमान मानसून स्थिति एवं संकेत" : "CURRENT MONSOON STATUS"}
            </h2>
          </div>
          <p className="text-xs text-[#60716B]">
            {currentLocation.name} ({currentLocation.district}, {currentLocation.state}) • Updated: Today, 08:30 IST
          </p>
        </div>

        {/* Phase Pill Buttons */}
        <div className="flex items-center gap-1 p-1 bg-white border border-[#DCCDB5] rounded-full self-start sm:self-auto shadow-xs">
          <span className="text-[10px] font-bold text-[#60716B] uppercase tracking-wider px-2.5">
            Phase:
          </span>
          {(["active", "break", "revival"] as const).map((phaseKey) => (
            <button
              key={phaseKey}
              onClick={() => setSelectedPhase(phaseKey)}
              className={`px-3 py-1 text-xs font-semibold rounded-full capitalize transition-all cursor-pointer ${
                selectedPhase === phaseKey
                  ? "bg-[#315C3F] text-white shadow-xs"
                  : "text-[#60716B] hover:text-[#20312C] hover:bg-[#E8EEE5]"
              }`}
            >
              {phaseKey}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Key Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Monsoon Signal */}
        <div className="p-4 rounded-2xl bg-white border border-[#DCCDB5]/70 space-y-2">
          <div className="flex items-center justify-between text-[#60716B]">
            <span className="text-xs font-medium">Signal Mode</span>
            <CloudRain className="w-4 h-4 text-[#315C3F]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span
              className={`text-2xl font-black font-sans uppercase ${
                selectedPhase === "active"
                  ? "text-[#315C3F]"
                  : selectedPhase === "break"
                  ? "text-[#D39A3D]"
                  : "text-[#5B91A8]"
              }`}
            >
              {signal.statusBadge}
            </span>
          </div>
          <div className="text-xs text-[#60716B]">
            Rainfall Prob: <strong className="text-[#20312C]">{signal.rainfallProbability}%</strong> (7 Days)
          </div>
        </div>

        {/* Card 2: Cumulative Rainfall */}
        <div className="p-4 rounded-2xl bg-white border border-[#DCCDB5]/70 space-y-2">
          <div className="flex items-center justify-between text-[#60716B]">
            <span className="text-xs font-medium">7-Day Rainfall</span>
            <Droplets className="w-4 h-4 text-[#5B91A8]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[#20312C]">{signal.next7DaysMm} mm</span>
            <span className="text-xs font-semibold text-[#315C3F]">+24% vs LPA</span>
          </div>
          <div className="text-xs text-[#60716B]">
            Historical Average: <strong className="text-[#20312C]">68.0 mm</strong>
          </div>
        </div>

        {/* Card 3: Soil Moisture */}
        <div className="p-4 rounded-2xl bg-white border border-[#DCCDB5]/70 space-y-2">
          <div className="flex items-center justify-between text-[#60716B]">
            <span className="text-xs font-medium">Topsoil Moisture</span>
            <Sprout className="w-4 h-4 text-[#789B7C]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[#20312C]">68%</span>
            <span className="text-xs text-[#315C3F] font-semibold">{signal.soilMoistureTrend}</span>
          </div>
          <div className="text-xs text-[#60716B]">
            Optimal range for sowing: <strong className="text-[#20312C]">65–75%</strong>
          </div>
        </div>

        {/* Card 4: False Onset & Break Risk */}
        <div className="p-4 rounded-2xl bg-white border border-[#DCCDB5]/70 space-y-2">
          <div className="flex items-center justify-between text-[#60716B]">
            <span className="text-xs font-medium">Onset & Break Risk</span>
            <ShieldCheck className="w-4 h-4 text-[#315C3F]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[#315C3F]">{signal.onsetProbability}%</span>
            <span className="text-xs text-[#60716B]">Onset Confirmed</span>
          </div>
          <div className="text-xs text-[#60716B]">
            Break Spell Risk: <strong className="text-[#D39A3D]">{signal.breakRisk}%</strong>
          </div>
        </div>
      </div>

      {/* Analytical Banner Note */}
      <div className="p-3.5 rounded-xl bg-[#E8EEE5]/70 border border-[#789B7C]/40 flex items-center justify-between text-xs text-[#18372A]">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-[#315C3F] shrink-0" />
          <span>
            <strong>Synoptic Assessment:</strong> {signal.shortSummary} {signal.fieldAdvice}
          </span>
        </div>
      </div>
    </div>
  );
}

export default MonsoonStatus;
