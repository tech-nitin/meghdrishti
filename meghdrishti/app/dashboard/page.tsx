"use client";

import React from "react";
import { AppShell } from "@/components/layout/AppShell";
import { MonsoonAtmosphere } from "@/components/dashboard/MonsoonAtmosphere";
import { DashboardHero } from "@/components/dashboard/DashboardHero";
import { QuickIntelligenceStrip } from "@/components/dashboard/QuickIntelligenceStrip";
import { RegionalIntelligence } from "@/components/dashboard/RegionalIntelligence";
import { MonsoonTimeline } from "@/components/dashboard/MonsoonTimeline";
import { ClimateDrivers } from "@/components/dashboard/ClimateDrivers";
import { ActionRecommendation } from "@/components/dashboard/ActionRecommendation";
import { DashboardAlerts } from "@/components/dashboard/DashboardAlerts";
import { ExploreMore } from "@/components/dashboard/ExploreMore";

export default function DashboardPage() {
  return (
    <AppShell>
      {/* Living Monsoon Atmospheric Background (Multi-layer Gradients & Canvas Rain) */}
      <MonsoonAtmosphere />

      {/* Main Continuous Editorial Canvas */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16 sm:space-y-24">
        
        {/* 1. GLOBAL MONSOON ENVIRONMENT (HERO WITH FLOATING GLASS INSTRUMENT) */}
        <DashboardHero />

        {/* 2. MONSOON SNAPSHOT (EDITORIAL INTELLIGENCE BAND) */}
        <QuickIntelligenceStrip />

        {/* 3. REGIONAL INTELLIGENCE (SHARED COMPOSITION: DOMINANT MAP + INTEGRATED FORECAST) */}
        <RegionalIntelligence />

        {/* 4. MONSOON EVOLUTION (OPEN FULL-WIDTH TIMELINE) */}
        <MonsoonTimeline />

        {/* 5. MONSOON SIGNALS (OPEN EDITORIAL: FALSE ONSET & CLIMATE DRIVERS) */}
        <ClimateDrivers />

        {/* 6. AGRICULTURAL DECISION (HERO DECISION REPORT FEATURE) */}
        <ActionRecommendation />

        {/* 7. FARMER COMMUNICATION & ALERTS (OPEN FEED + DISPATCH PANEL) */}
        <DashboardAlerts />

        {/* 8. EXPLORE INTELLIGENCE (PHOTOGRAPHIC TILES) */}
        <ExploreMore />

      </div>
    </AppShell>
  );
}
