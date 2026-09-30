"use client";

import React, { useState, useRef } from "react";
import { indoreBlocksData, type IndoreBlockRisk } from "@/data/map-risk";
import type { RiskLayerType } from "./MapLegend";
import { Compass, ShieldCheck } from "lucide-react";

export interface MockRiskMapProps {
  selectedBlockId: string;
  onSelectBlock: (block: IndoreBlockRisk) => void;
  activeLayer: RiskLayerType;
  zoomLevel: number;
  panOffset: { x: number; y: number };
  onPanChange?: (newOffset: { x: number; y: number }) => void;
  className?: string;
}

export function MockRiskMap({
  selectedBlockId,
  onSelectBlock,
  activeLayer,
  zoomLevel,
  panOffset,
  onPanChange,
  className = "",
}: MockRiskMapProps) {
  const [hoveredBlock, setHoveredBlock] = useState<IndoreBlockRisk | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Dynamic color calculation per active risk layer
  const getBlockColor = (block: IndoreBlockRisk) => {
    switch (activeLayer) {
      case "onset":
        if (block.onsetProbability >= 85) return "#126B4F";
        if (block.onsetProbability >= 80) return "#4E8D56";
        if (block.onsetProbability >= 75) return "#7A9B7A";
        return "#A2B59F";

      case "dryspell":
        if (block.drySpellRisk <= 12) return "#4E8D56";
        if (block.drySpellRisk <= 20) return "#D99A2B";
        return "#D56F43";

      case "heavyrain":
        if (block.heavyRainRisk <= 10) return "#6F9EAB";
        if (block.heavyRainRisk <= 15) return "#4D7F88";
        return "#D56F43";

      case "rainfall":
      default:
        switch (block.riskLevel) {
          case "low":
            return "#4E8D56";
          case "high":
            return "#D56F43";
          case "very-high":
            return "#C85B4F";
          case "moderate":
          default:
            return "#D99A2B";
        }
    }
  };

  const getHoverValueText = (block: IndoreBlockRisk) => {
    switch (activeLayer) {
      case "onset":
        return `Onset Prob: ${block.onsetProbability}%`;
      case "dryspell":
        return `Dry Spell Risk: ${block.drySpellRisk}%`;
      case "heavyrain":
        return `Heavy Rain Risk: ${block.heavyRainRisk}%`;
      case "rainfall":
      default:
        return `Rainfall Risk: ${block.riskLevel.toUpperCase()}`;
    }
  };

  // Mouse pan drag handling
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // Left click only
    setIsDragging(true);
    setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
    if (isDragging && onPanChange) {
      onPanChange({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={() => {
        setIsDragging(false);
        setHoveredBlock(null);
      }}
      className={`relative w-full h-full bg-[#EFECE2] overflow-hidden select-none cursor-grab active:cursor-grabbing ${className}`}
    >
      {/* Top-Left: Compass Indicator */}
      <div className="absolute top-4 left-4 z-10 pointer-events-none">
        <div className="w-8 h-8 rounded-full bg-[#FFFDF8]/95 border border-[#DED9CB] backdrop-blur-xs flex flex-col items-center justify-center text-[#19362F] shadow-2xs">
          <span className="text-[8.5px] font-black -mb-1 text-[#126B4F]">N</span>
          <Compass className="w-3.5 h-3.5 text-[#19362F]" />
        </div>
      </div>

      {/* Main SVG Geographic Viewport */}
      <div
        style={{
          transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomLevel})`,
          transformOrigin: "center center",
          transition: isDragging ? "none" : "transform 250ms ease-out",
        }}
        className="w-full h-full flex items-center justify-center pointer-events-auto"
      >
        <svg viewBox="0 0 460 450" className="w-full h-full select-none">
          {/* 1. Base Geography & Soil Shading */}
          <rect x="0" y="0" width="460" height="450" fill="#EAE5D9" />

          {/* Farmland & Vegetation Patches (Malwa Plateau & Chambal Basin) */}
          <path
            d="M 30,30 Q 120,10 210,50 T 400,30 L 440,120 L 390,240 L 300,180 L 160,190 L 60,130 Z"
            fill="#E2EAD8"
            opacity="0.85"
          />
          <path
            d="M 100,170 Q 240,130 380,210 T 440,390 L 320,440 L 180,410 L 70,360 L 40,210 Z"
            fill="#DFE8D4"
            opacity="0.9"
          />
          <path
            d="M 140,190 Q 230,170 310,230 T 270,340 L 150,300 Z"
            fill="#D5E2C8"
            opacity="0.95"
          />

          {/* Topographic Contour Lines */}
          <g stroke="#C6BCA8" strokeWidth="0.75" fill="none" opacity="0.6">
            <path d="M 0,80 Q 140,60 230,110 T 460,80" />
            <path d="M 0,150 Q 150,200 280,160 T 460,220" strokeDasharray="3,2" />
            <path d="M 0,270 Q 140,230 270,300 T 460,280" />
            <path d="M 20,390 Q 190,350 380,410" strokeDasharray="3,2" />
            <ellipse cx="235" cy="225" rx="165" ry="115" />
          </g>

          {/* 2. Water Bodies & Hydrology (Khan, Gambhir, Yashwant Sagar, Kshipra) */}
          <g>
            {/* Yashwant Sagar Lake Reservoir */}
            <path
              d="M 115,140 Q 135,130 150,150 Q 145,170 125,165 Q 110,155 115,140 Z"
              fill="#6F9EAB"
              stroke="#4D7F88"
              strokeWidth="1.5"
              opacity="0.9"
            />
            <text x="75" y="152" fill="#4D7F88" fontSize="6.5" fontStyle="italic" fontWeight="700">
              Yashwant Sagar
            </text>

            {/* Khan / Saraswati River flowing through Indore City northward */}
            <path
              d="M 220,430 Q 230,340 235,230 T 260,110 T 275,10"
              fill="none"
              stroke="#689FA8"
              strokeWidth="3.2"
              strokeLinecap="round"
              opacity="0.85"
            />
            <text x="245" y="60" fill="#4D7F88" fontSize="7.5" fontStyle="italic" fontWeight="700">
              Khan River
            </text>

            {/* Gambhir River */}
            <path
              d="M 40,430 Q 90,320 125,230 T 135,130 T 170,10"
              fill="none"
              stroke="#689FA8"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.75"
            />
            <text x="65" y="360" fill="#4D7F88" fontSize="7.5" fontStyle="italic" fontWeight="700">
              Gambhir River
            </text>

            {/* Kshipra Basin Stream */}
            <path
              d="M 330,10 Q 340,90 380,140 T 450,210"
              fill="none"
              stroke="#689FA8"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.7"
            />
            <text x="350" y="85" fill="#4D7F88" fontSize="6.5" fontStyle="italic" fontWeight="700">
              Kshipra Tributary
            </text>
          </g>

          {/* 3. Major Road Network (NH-52, AB Road, Super Corridor, Ring Road) */}
          <g>
            {/* Secondary Arterials */}
            <path d="M 15,150 L 445,290" stroke="#FFFFFF" strokeWidth="2.5" fill="none" opacity="0.9" />
            <path d="M 15,150 L 445,290" stroke="#D1B896" strokeWidth="1.5" fill="none" />
            
            <path d="M 75,440 L 375,10" stroke="#FFFFFF" strokeWidth="2.5" fill="none" opacity="0.9" />
            <path d="M 75,440 L 375,10" stroke="#D1B896" strokeWidth="1.5" fill="none" />

            {/* National Highway 52 (Cased Highway) */}
            <path d="M 40,25 Q 185,155 235,225 T 415,425" stroke="#FFFFFF" strokeWidth="4.2" fill="none" opacity="0.95" />
            <path d="M 40,25 Q 185,155 235,225 T 415,425" stroke="#D56F43" strokeWidth="2.6" fill="none" />

            {/* AB Road (Agra-Bombay NH-47) */}
            <path d="M 235,15 L 235,435" stroke="#FFFFFF" strokeWidth="3.5" fill="none" opacity="0.95" />
            <path d="M 235,15 L 235,435" stroke="#D56F43" strokeWidth="2" fill="none" strokeDasharray="6,2" />

            {/* Indore Ring Road Outer Loop */}
            <circle cx="235" cy="225" r="52" fill="none" stroke="#FFFFFF" strokeWidth="3" opacity="0.9" />
            <circle cx="235" cy="225" r="52" fill="none" stroke="#D1B896" strokeWidth="1.8" />

            {/* Highway Badge */}
            <rect x="145" y="140" width="28" height="11" rx="2.5" fill="#D56F43" />
            <text x="159" y="148.5" textAnchor="middle" fill="#FFFFFF" fontSize="6.5" fontWeight="800">
              NH 52
            </text>
            <rect x="245" y="270" width="30" height="11" rx="2.5" fill="#126B4F" />
            <text x="260" y="278.5" textAnchor="middle" fill="#FFFFFF" fontSize="6" fontWeight="800">
              AB ROAD
            </text>
          </g>

          {/* 4. Interactive Block Risk Polygons with Focus/Fade Effect */}
          {indoreBlocksData.map((block) => {
            const isSelected = selectedBlockId === block.id;
            const isHovered = hoveredBlock?.id === block.id;
            const color = getBlockColor(block);

            return (
              <g
                key={block.id}
                className="cursor-pointer group"
                onClick={() => onSelectBlock(block)}
                onMouseEnter={() => setHoveredBlock(block)}
                onMouseLeave={() => setHoveredBlock(null)}
              >
                {/* Block Polygon */}
                <path
                  d={block.svgPath}
                  fill={color}
                  fillOpacity={isSelected ? "0.72" : isHovered ? "0.58" : "0.38"}
                  stroke={isSelected ? "#126B4F" : isHovered ? "#19362F" : "#FFFFFF"}
                  strokeWidth={isSelected ? "3.2" : isHovered ? "2.2" : "1.4"}
                  strokeLinejoin="round"
                  strokeDasharray={isSelected ? "none" : "4,2"}
                  className="transition-all duration-200"
                />

                {/* Center Pulse Ring for Selected Focus Block */}
                {isSelected && (
                  <g className="pointer-events-none">
                    <circle
                      cx={block.center.x}
                      cy={block.center.y}
                      r="16"
                      fill="none"
                      stroke="#126B4F"
                      strokeWidth="2"
                      opacity="0.7"
                      className="animate-ping"
                    />
                    <circle
                      cx={block.center.x}
                      cy={block.center.y}
                      r="6.5"
                      fill="#126B4F"
                      stroke="#FFFFFF"
                      strokeWidth="2"
                    />
                  </g>
                )}

                {/* Block Label Badge */}
                <rect
                  x={block.center.x - 36}
                  y={block.center.y - 9}
                  width="72"
                  height="18"
                  rx="4.5"
                  fill={isSelected ? "#126B4F" : "#FFFDF8"}
                  fillOpacity={isSelected ? "0.98" : "0.90"}
                  stroke={isSelected ? "#FFFFFF" : "#DED9CB"}
                  strokeWidth="1"
                  className="shadow-2xs transition-all"
                />
                <text
                  x={block.center.x}
                  y={block.center.y + 4}
                  textAnchor="middle"
                  fill={isSelected ? "#FFFFFF" : "#19362F"}
                  fontSize={isSelected ? "9.5" : "8.5"}
                  fontWeight="900"
                  className="pointer-events-none select-none font-sans tracking-tight"
                >
                  {block.name.replace(" Block", "").replace(" & Gautampura", "").replace(" (Dr. Ambedkar Nagar)", "")}
                </text>
              </g>
            );
          })}

          {/* 5. Village / Mandi Settlements & City Nodes */}
          <g className="pointer-events-none select-none">
            {/* Indore City Center (District HQ) */}
            <circle cx="235" cy="225" r="5" fill="#C85B4F" stroke="#FFFFFF" strokeWidth="2" />
            <circle cx="235" cy="225" r="9" fill="none" stroke="#C85B4F" strokeWidth="1.2" strokeDasharray="2,2" opacity="0.8" />
            <text x="246" y="228" fill="#19362F" fontSize="8.5" fontWeight="900">
              INDORE HQ
            </text>

            {/* Sanwer Mandi */}
            <circle cx="265" cy="95" r="3" fill="#19362F" stroke="#FFFFFF" strokeWidth="1.2" />
            <text x="272" y="98" fill="#19362F" fontSize="7.5" fontWeight="700">Sanwer Mandi</text>

            {/* Depalpur Mandi */}
            <circle cx="95" cy="185" r="3" fill="#19362F" stroke="#FFFFFF" strokeWidth="1.2" />
            <text x="102" y="188" fill="#19362F" fontSize="7.5" fontWeight="700">Depalpur</text>

            {/* Mhow / Dr. Ambedkar Nagar */}
            <circle cx="215" cy="335" r="3" fill="#19362F" stroke="#FFFFFF" strokeWidth="1.2" />
            <text x="222" y="338" fill="#19362F" fontSize="7.5" fontWeight="700">Mhow (Ambedkar Nagar)</text>

            {/* Betma */}
            <circle cx="65" cy="295" r="2.5" fill="#19362F" stroke="#FFFFFF" strokeWidth="1" />
            <text x="72" y="298" fill="#19362F" fontSize="7" fontWeight="700">Betma</text>

            {/* Hatod */}
            <circle cx="130" cy="125" r="2.5" fill="#19362F" stroke="#FFFFFF" strokeWidth="1" />
            <text x="136" y="128" fill="#19362F" fontSize="7" fontWeight="700">Hatod</text>

            {/* Rau */}
            <circle cx="295" cy="295" r="2.5" fill="#19362F" stroke="#FFFFFF" strokeWidth="1" />
            <text x="301" y="298" fill="#19362F" fontSize="7" fontWeight="700">Rau</text>

            {/* Manglia Junction */}
            <circle cx="340" cy="175" r="2.5" fill="#19362F" stroke="#FFFFFF" strokeWidth="1" />
            <text x="346" y="178" fill="#19362F" fontSize="7" fontWeight="700">Manglia</text>
          </g>
        </svg>
      </div>

      {/* Floating Hover Tooltip */}
      {hoveredBlock && (
        <div
          style={{
            left: `${Math.min(Math.max(mousePos.x + 14, 10), 320)}px`,
            top: `${Math.min(Math.max(mousePos.y - 36, 10), 440)}px`,
          }}
          className="absolute z-30 pointer-events-none bg-[#19362F] text-white px-3 py-1.5 rounded-lg shadow-md text-xs space-y-0.5 border border-white/20 backdrop-blur-xs"
        >
          <div className="font-extrabold text-[11px] text-[#DDE7D7]">{hoveredBlock.name}</div>
          <div className="text-[10px] text-white/90 font-medium">{getHoverValueText(hoveredBlock)}</div>
        </div>
      )}
    </div>
  );
}

export default MockRiskMap;
