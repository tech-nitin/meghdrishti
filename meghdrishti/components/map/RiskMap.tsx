"use client";

import React, { useState } from "react";
import { MockRiskMap } from "./MockRiskMap";
import { MapControls } from "./MapControls";
import { MapLegend, type RiskLayerType } from "./MapLegend";
import { LocationDetails } from "./LocationDetails";
import { RiskLayerSwitcher } from "./RiskLayerSwitcher";
import { indoreBlocksData, type IndoreBlockRisk } from "@/data/map-risk";

export interface RiskMapProps {
  initialBlockId?: string;
  onBlockChange?: (block: IndoreBlockRisk) => void;
  className?: string;
}

export function RiskMap({
  initialBlockId = "block-indore",
  onBlockChange,
  className = "",
}: RiskMapProps) {
  const [selectedBlockId, setSelectedBlockId] = useState<string>(initialBlockId);
  const [activeLayer, setActiveLayer] = useState<RiskLayerType>("rainfall");
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [showFloatingCard, setShowFloatingCard] = useState<boolean>(true);

  // Sync with prop if initialBlockId changes externally (e.g. from table click)
  React.useEffect(() => {
    if (initialBlockId && initialBlockId !== selectedBlockId) {
      setSelectedBlockId(initialBlockId);
      setShowFloatingCard(true);
    }
  }, [initialBlockId, selectedBlockId]);

  const selectedBlock =
    indoreBlocksData.find((b) => b.id === selectedBlockId) || indoreBlocksData[0];

  const handleSelectBlock = (block: IndoreBlockRisk) => {
    setSelectedBlockId(block.id);
    setShowFloatingCard(true);
    if (onBlockChange) {
      onBlockChange(block);
    }
  };

  const handleZoomIn = () => {
    setZoomLevel((z) => Math.min(Number((z + 0.15).toFixed(2)), 1.5));
  };

  const handleZoomOut = () => {
    setZoomLevel((z) => Math.max(Number((z - 0.15).toFixed(2)), 0.85));
  };

  const handleReset = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  };

  const handleLocateIndore = () => {
    setSelectedBlockId("block-indore");
    setZoomLevel(1.05);
    setPanOffset({ x: 0, y: 0 });
    setShowFloatingCard(true);
    const indoreBlock = indoreBlocksData.find((b) => b.id === "block-indore") || indoreBlocksData[0];
    if (onBlockChange) {
      onBlockChange(indoreBlock);
    }
  };

  return (
    <div className={`w-full space-y-3 ${className}`}>
      {/* Dominant GIS Map Container (560–620px Desktop Height) */}
      <div className="relative w-full h-[540px] sm:h-[580px] lg:h-[620px] bg-[#EAE6D8] rounded-3xl border border-[#34D399]/40 shadow-2xl overflow-hidden">
        
        {/* IN-MAP TOP GIS STATUS CHROME */}
        <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
          {/* Subtle Metadata bar: INDORE DISTRICT • 8 MONITORED BLOCKS • PROTOTYPE DATA */}
          <div className="pointer-events-auto flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#0C201A]/90 border border-[#34D399]/40 text-xs shadow-lg backdrop-blur-md text-white">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#34D399] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#34D399]" />
            </span>
            <span className="font-black text-white tracking-wider uppercase text-[10.5px]">
              INDORE DISTRICT
            </span>
            <span className="text-gray-400">•</span>
            <span className="font-extrabold text-gray-300 text-[10.5px]">
              8 MONITORED BLOCKS
            </span>
            <span className="text-gray-400">•</span>
            <span className="font-black text-[#34D399] text-[10.5px] uppercase">
              PROTOTYPE DATA
            </span>
          </div>

          {/* Floating In-Map Layer Switcher (RAIN, ONSET, DRY SPELL, HEAVY RAIN) */}
          <div className="pointer-events-auto hidden md:block">
            <RiskLayerSwitcher
              activeLayer={activeLayer}
              onLayerChange={setActiveLayer}
            />
          </div>
        </div>

        {/* Mobile Layer Switcher (Top Below Bar on Mobile) */}
        <div className="md:hidden absolute top-14 left-4 z-20">
          <RiskLayerSwitcher
            activeLayer={activeLayer}
            onLayerChange={setActiveLayer}
          />
        </div>

        {/* The GIS Map Engine */}
        <MockRiskMap
          selectedBlockId={selectedBlockId}
          onSelectBlock={handleSelectBlock}
          activeLayer={activeLayer}
          zoomLevel={zoomLevel}
          panOffset={panOffset}
          onPanChange={setPanOffset}
        />

        {/* Floating Top-Right: Selected Block GIS Inspector Panel (Desktop) */}
        {showFloatingCard && (
          <div className="hidden sm:block absolute top-14 right-4 w-72 lg:w-80 z-20">
            <LocationDetails
              selectedBlock={selectedBlock}
              onClose={() => setShowFloatingCard(false)}
            />
          </div>
        )}

        {/* Floating Bottom-Left: Map Navigation Controls & Scale Bar */}
        <div className="absolute bottom-4 left-4 z-20">
          <MapControls
            zoomLevel={zoomLevel}
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
            onReset={handleReset}
            onLocateIndore={handleLocateIndore}
          />
        </div>

        {/* Floating Bottom-Right: Dynamic Minimalist Legend */}
        <div className="absolute bottom-4 right-4 z-20">
          <MapLegend activeLayer={activeLayer} />
        </div>
      </div>

      {/* Mobile Floating Bottom Sheet for Selected Block Inspector */}
      {showFloatingCard && (
        <div className="sm:hidden pt-2">
          <LocationDetails
            selectedBlock={selectedBlock}
            onClose={() => setShowFloatingCard(false)}
          />
        </div>
      )}
    </div>
  );
}

export default RiskMap;
