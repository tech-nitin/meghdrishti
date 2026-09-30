"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { useApp } from "@/lib/context/AppContext";
import { ForecastHeader } from "@/components/forecast/ForecastHeader";
import { ForecastHero, type ForecastHorizon } from "@/components/forecast/ForecastHero";
import { ForecastSignalStrip } from "@/components/forecast/ForecastSignalStrip";
import { MonsoonPhaseTimeline } from "@/components/forecast/MonsoonPhaseTimeline";
import { KeyForecastSignals } from "@/components/forecast/KeyForecastSignals";
import { ForecastEvolution } from "@/components/forecast/ForecastEvolution";
import { AgriculturalImpact } from "@/components/forecast/AgriculturalImpact";
import { WeatherDayRibbon } from "@/components/forecast/WeatherDayRibbon";
import { DailyForecastTable } from "@/components/forecast/DailyForecastTable";
import { ClimateDrivers } from "@/components/forecast/ClimateDrivers";
import { ForecastAdvisoryCTA } from "@/components/forecast/ForecastAdvisoryCTA";
import { ForecastDisclaimer } from "@/components/forecast/ForecastDisclaimer";
import type { ForecastMetric } from "@/types/forecast";

export default function ForecastPage() {
  const [horizon, setHorizon] = useState<ForecastHorizon>(14);
  const [selectedDay, setSelectedDay] = useState<ForecastMetric | null>(null);

  return (
    <AppShell>
      {/* Background Topographic Ambience Texture Layer */}
      <div
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none opacity-40"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-[radial-gradient(#126b4f_0.5px,transparent_0.5px)] [background-size:24px_24px] opacity-15" />
      </div>

      {/* Main Continuous Canvas Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12 sm:space-y-16">
        
        {/* 1. EDITORIAL HEADER & TITLE */}
        <ForecastHeader />

        {/* 2. FORECAST HERO (Narrative Synthesis + Non-Empty Recharts Trajectory + Range Switcher) */}
        <ForecastHero
          horizon={horizon}
          onHorizonChange={setHorizon}
        />

        {/* 3. FORECAST SIGNAL STRIP (Rain / Onset / Dry Spell / Heavy Rain / Confidence) */}
        <ForecastSignalStrip />

        {/* 4. MONSOON PHASE OUTLOOK (Horizontal Flowing Timeline) */}
        <MonsoonPhaseTimeline />

        {/* 5. KEY FORECAST SIGNALS (Onset Signal / False Onset Risk / Break Hazard) */}
        <KeyForecastSignals />

        {/* 6. 7–30 DAY RAINFALL STORY & UNCERTAINTY DECAY VISUALIZATION */}
        <ForecastEvolution />

        {/* 7. AGRICULTURAL IMPACT (What This Means For Farming) */}
        <AgriculturalImpact />

        {/* 8. WEATHER DAY RIBBON (14-Day Horizontal Ribbon) */}
        <WeatherDayRibbon
          selectedDay={selectedDay}
          onSelectDay={setSelectedDay}
        />

        {/* 9. DAILY MONSOON FEED (Daily Meteorological Table) */}
        <DailyForecastTable
          selectedDay={selectedDay}
          onSelectDay={setSelectedDay}
        />

        {/* 10. CLIMATE SIGNAL CONTEXT (ENSO, IOD, MJO Drivers) */}
        <ClimateDrivers />

        {/* 11. FORECAST TO FIELD DECISION (Transition to /advisory) */}
        <ForecastAdvisoryCTA />

        {/* 12. PROTOTYPE DISCLAIMER */}
        <ForecastDisclaimer />

      </div>
    </AppShell>
  );
}
