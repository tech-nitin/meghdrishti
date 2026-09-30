"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { RiskMap } from "@/components/map/RiskMap";
import { DistrictRiskProfile } from "@/components/map/DistrictRiskProfile";
import { MapInsight } from "@/components/map/MapInsight";
import { BlockComparison } from "@/components/map/BlockComparison";
import { indoreBlocksData, type IndoreBlockRisk } from "@/data/map-risk";
import { MapPin } from "lucide-react";

export default function MapPage() {
  const [selectedBlock, setSelectedBlock] = useState<IndoreBlockRisk>(
    indoreBlocksData[0]
  );

  return (
    <AppShell>
      {/* Main Continuous Canvas Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12 sm:space-y-16">
        
        {/* 1. EDITORIAL INTRO HEADER */}
        <div className="space-y-4 pb-4 border-b border-white/10">
          {/* Breadcrumb Hierarchy */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <div className="inline-flex items-center gap-1.5 text-gray-300 font-bold">
              <MapPin className="w-3.5 h-3.5 text-[#34D399]" />
              <span>Madhya Pradesh</span>
              <span className="text-white/30">/</span>
              <span>Indore</span>
              <span className="text-white/30">/</span>
              <span className="text-white font-black">Indore District</span>
            </div>
          </div>

          {/* Large Editorial Heading + Live Status Tag */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pt-1">
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-sans tracking-tight leading-[1.08] drop-shadow-sm">
                Hyperlocal Climate Risk Map
              </h1>
              <p className="text-sm sm:text-base text-gray-200 font-medium max-w-2xl leading-relaxed">
                Block &amp; Panchayat-scale rainfall, dry-spell and soil-moisture intelligence for agricultural decision-making.
              </p>
            </div>

            {/* Live Prototype Status on the Right */}
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#0C201A]/85 border border-[#34D399]/40 shadow-lg backdrop-blur-md self-start lg:self-auto text-white">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#34D399] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#34D399]" />
              </span>
              <span className="text-[11px] font-black uppercase text-white tracking-wide">
                LIVE PROTOTYPE
              </span>
              <span className="text-gray-400">•</span>
              <span className="text-[11px] font-extrabold text-[#34D399]">
                INDORE DISTRICT
              </span>
            </div>
          </div>
        </div>

        {/* 2. HERO GIS RISK MAP — Dominates the Page (640-680px Height) */}
        <RiskMap
          initialBlockId={selectedBlock.id}
          onBlockChange={(block) => setSelectedBlock(block)}
        />

        {/* 3. MONSOON ANALYTICAL SUMMARY STRIP (DISTRICT RISK PROFILE) */}
        <DistrictRiskProfile />

        {/* 4. DECISION INSIGHT FEATURE */}
        <MapInsight selectedBlock={selectedBlock} />

        {/* 5. BLOCK COMPARISON TABLE & RISK DISTRIBUTION VISUALIZATION */}
        <BlockComparison
          selectedBlockId={selectedBlock.id}
          onSelectBlock={(block) => setSelectedBlock(block)}
        />

      </div>
    </AppShell>
  );
}
