"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { mockCrops } from "@/data/crops";
import type { CropInfo } from "@/types/crop";
import { useApp } from "@/lib/context/AppContext";
import { AdvisoryHeader } from "@/components/advisory/AdvisoryHeader";
import { CropWorkspace } from "@/components/advisory/CropWorkspace";
import { PrimaryDecisionHero } from "@/components/advisory/PrimaryDecisionHero";
import { MonsoonContextStrip } from "@/components/advisory/MonsoonContextStrip";
import { RecommendationReason } from "@/components/advisory/RecommendationReason";
import { SowingWindowTimeline } from "@/components/advisory/SowingWindowTimeline";
import { FieldActionPlan } from "@/components/advisory/FieldActionPlan";
import { CropRequirements } from "@/components/advisory/CropRequirements";
import { ForecastContext } from "@/components/advisory/ForecastContext";
import { CropStageLifecycle } from "@/components/advisory/CropStageLifecycle";
import { AdvisoryFooterDisclaimer } from "@/components/advisory/AdvisoryFooterDisclaimer";

export default function AdvisoryPage() {
  const { farmerMode, setFarmerMode } = useApp();
  const [selectedCropId, setSelectedCropId] = useState<string>("crop-soybean");
  const [farmerView, setFarmerView] = useState<boolean>(farmerMode);

  // Sync internal view mode with global farmerMode
  const handleToggleView = (isFarmer: boolean) => {
    setFarmerView(isFarmer);
    setFarmerMode(isFarmer);
  };

  const selectedCrop: CropInfo =
    mockCrops.find((c) => c.id === selectedCropId) || mockCrops[0];

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
        
        {/* 1. EDITORIAL HEADER & DECISION CENTER TITLE */}
        <AdvisoryHeader
          farmerView={farmerView}
          onToggleView={handleToggleView}
        />

        {/* 2. CROP SELECTOR WORKSPACE */}
        <CropWorkspace
          selectedCropId={selectedCropId}
          onSelectCrop={(crop) => setSelectedCropId(crop.id)}
        />

        {/* 3. PRIMARY DECISION HERO (Crop Visual + Recommendation + Sowing Window) */}
        <PrimaryDecisionHero
          crop={selectedCrop}
          farmerView={farmerView}
        />

        {/* 4. MONSOON CONTEXT STRIP (Rainfall / Onset / Dry Spell / Heavy Rain / Confidence) */}
        <MonsoonContextStrip />

        {/* 5. WHY THIS RECOMMENDATION? (Climatic Logic & Flow) */}
        <RecommendationReason
          cropName={selectedCrop.name}
        />

        {/* 6. SOWING WINDOW TIMELINE (16 Jun ... 18-22 Jun ... 24 Jun) */}
        <SowingWindowTimeline
          crop={selectedCrop}
        />

        {/* 7. FIELD ACTION PLAN (Numbered 01, 02, 03, 04 Directives) */}
        <FieldActionPlan
          crop={selectedCrop}
          farmerView={farmerView}
        />

        {/* 8. CROP AT A GLANCE (Requirements & Varietal Specifications) */}
        <CropRequirements
          crop={selectedCrop}
          farmerView={farmerView}
        />

        {/* 9. 7-DAY WEATHER CONTEXT (Connecting to /forecast) */}
        <ForecastContext />

        {/* 10. CROP LIFECYCLE & STAGE-SPECIFIC GUIDANCE */}
        <CropStageLifecycle
          crop={selectedCrop}
          farmerView={farmerView}
        />

        {/* 11. ADVISORY DISCLAIMER */}
        <AdvisoryFooterDisclaimer />

      </div>
    </AppShell>
  );
}
