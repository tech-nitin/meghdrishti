"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Map,
  ArrowRight,
  Plus,
  Minus,
  Crosshair,
  Compass,
  X,
  Layers,
  MapPin,
} from "lucide-react";
import { mockBlockRiskData } from "@/data/locations";
import { useApp } from "@/lib/context/AppContext";

export function RiskOverview() {
  const { language } = useApp();
  const [selectedBlockId, setSelectedBlockId] = useState<string>("block-shajapur");
  const [activeLayer, setActiveLayer] = useState<
    "rainfall" | "onset" | "dryspell" | "heavyrain"
  >("rainfall");
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [showFloatingCard, setShowFloatingCard] = useState<boolean>(true);

  const selectedBlock =
    mockBlockRiskData.find((b) => b.id === selectedBlockId) || mockBlockRiskData[0];

  // Block polygons positioned over authentic regional geography
  const blockSvgPaths = [
    {
      id: "block-agar",
      name: "Agar",
      d: "M 65,50 L 165,35 L 205,110 L 130,160 L 55,125 Z",
      center: { x: 125, y: 95 },
      color: "#4E8D56", // Low Risk
      risk: "Low",
    },
    {
      id: "block-sarangpur",
      name: "Sarangpur",
      d: "M 165,35 L 285,25 L 345,105 L 270,155 L 205,110 Z",
      center: { x: 260, y: 90 },
      color: "#8FA336", // Moderate-Low
      risk: "Moderate-Low",
    },
    {
      id: "block-maksi",
      name: "Maksi",
      d: "M 25,135 L 105,130 L 130,215 L 55,255 L 18,190 Z",
      center: { x: 68, y: 190 },
      color: "#4E8D56", // Low Risk
      risk: "Low",
    },
    {
      id: "block-shajapur",
      name: "Shajapur",
      d: "M 130,160 L 270,155 L 315,245 L 235,310 L 150,265 L 130,215 Z",
      center: { x: 215, y: 225 },
      color: "#D96A32", // High Risk / Primary Active
      risk: "High Risk Active",
    },
    {
      id: "block-kalapipal",
      name: "Kalapipal",
      d: "M 130,215 L 150,265 L 140,355 L 70,330 L 55,255 Z",
      center: { x: 105, y: 290 },
      color: "#4E8D56", // Low Risk
      risk: "Low",
    },
    {
      id: "block-susner",
      name: "Susner",
      d: "M 270,155 L 345,105 L 425,175 L 390,270 L 315,245 Z",
      center: { x: 350, y: 195 },
      color: "#CCA836", // Moderate Risk
      risk: "Moderate",
    },
    {
      id: "block-mohana",
      name: "Mohana",
      d: "M 150,265 L 235,310 L 215,400 L 125,390 L 140,355 Z",
      center: { x: 175, y: 350 },
      color: "#CCA836", // Moderate Risk
      risk: "Moderate",
    },
    {
      id: "block-dewas",
      name: "Dewas Border",
      d: "M 235,310 L 315,245 L 390,270 L 365,380 L 280,410 L 215,400 Z",
      center: { x: 300, y: 345 },
      color: "#8FA336", // Moderate
      risk: "Moderate",
    },
  ];

  return (
    <div className="bg-[#FFFDF8] border border-[#DED9CB] rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col justify-between h-full space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#DED9CB]/70">
        <div className="flex items-start gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#E8EFE7] flex items-center justify-center text-[#176B4D] shrink-0 mt-0.5">
            <Map className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-[#18342C] font-sans">
              Hyperlocal Risk Map
            </h3>
            <p className="text-xs text-[#63736D]">
              Geographic intelligence & block-level monsoon risk
            </p>
          </div>
        </div>

        <Link
          href="/map"
          className="text-xs font-bold text-[#176B4D] hover:text-[#173B2E] inline-flex items-center gap-1 self-start sm:self-auto hover:underline"
        >
          <span>View Full Map</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Layer selector pills */}
      <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#F6F3EA] border border-[#DED9CB] rounded-xl text-xs">
        <button
          onClick={() => setActiveLayer("rainfall")}
          className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
            activeLayer === "rainfall"
              ? "bg-[#176B4D] text-white shadow-2xs"
              : "text-[#63736D] hover:text-[#18342C]"
          }`}
        >
          Rainfall Risk
        </button>
        <button
          onClick={() => setActiveLayer("onset")}
          className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
            activeLayer === "onset"
              ? "bg-[#176B4D] text-white shadow-2xs"
              : "text-[#63736D] hover:text-[#18342C]"
          }`}
        >
          Onset Probability
        </button>
        <button
          onClick={() => setActiveLayer("dryspell")}
          className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
            activeLayer === "dryspell"
              ? "bg-[#176B4D] text-white shadow-2xs"
              : "text-[#63736D] hover:text-[#18342C]"
          }`}
        >
          Dry Spell Risk
        </button>
        <button
          onClick={() => setActiveLayer("heavyrain")}
          className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
            activeLayer === "heavyrain"
              ? "bg-[#176B4D] text-white shadow-2xs"
              : "text-[#63736D] hover:text-[#18342C]"
          }`}
        >
          Heavy Rain Risk
        </button>
      </div>

      {/* Map Body Canvas — Light Terrain & Satellite Topography */}
      <div className="relative w-full aspect-[4/3] min-h-[350px] bg-[#EFECE2] rounded-xl border border-[#DED9CB] overflow-hidden">
        
        {/* Top-Left: Compass / North Indicator */}
        <div className="absolute top-3 left-3 z-10">
          <div className="w-8 h-8 rounded-full bg-[#FFFDF8]/95 border border-[#DED9CB] backdrop-blur-xs flex flex-col items-center justify-center text-[#18342C] shadow-sm">
            <span className="text-[9px] font-black -mb-1 text-[#176B4D]">N</span>
            <Compass className="w-3.5 h-3.5 text-[#18342C]" />
          </div>
        </div>

        {/* Bottom-Left: Zoom & Location Controls + Scale bar */}
        <div className="absolute bottom-3 left-3 z-10 flex flex-col gap-2">
          {/* Zoom Buttons */}
          <div className="flex flex-col bg-[#FFFDF8] border border-[#DED9CB] rounded-lg shadow-sm overflow-hidden w-7">
            <button
              onClick={() => setZoomLevel((z) => Math.min(z + 0.15, 1.4))}
              className="p-1.5 text-[#18342C] hover:bg-[#F6F3EA] flex items-center justify-center transition-colors cursor-pointer"
              title="Zoom In"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
            <div className="h-px bg-[#DED9CB]" />
            <button
              onClick={() => setZoomLevel((z) => Math.max(z - 0.15, 0.85))}
              className="p-1.5 text-[#18342C] hover:bg-[#F6F3EA] flex items-center justify-center transition-colors cursor-pointer"
              title="Zoom Out"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Location Center Button */}
          <button
            onClick={() => setZoomLevel(1)}
            className="w-7 h-7 rounded-lg bg-[#FFFDF8] border border-[#DED9CB] text-[#18342C] hover:bg-[#F6F3EA] shadow-sm flex items-center justify-center transition-colors cursor-pointer"
            title="Reset View"
          >
            <Crosshair className="w-3.5 h-3.5" />
          </button>

          {/* Scale Indicator */}
          <div className="bg-[#FFFDF8]/95 backdrop-blur-xs border border-[#DED9CB] rounded px-2 py-0.5 text-[9.5px] text-[#18342C] font-semibold flex items-center gap-2 shadow-2xs">
            <span>0</span>
            <div className="w-6 h-0.5 bg-[#18342C]/60" />
            <span>10</span>
            <div className="w-6 h-0.5 bg-[#18342C]/60" />
            <span>20 km</span>
          </div>
        </div>

        {/* SVG Geographic Canvas: Light Terrain + Road Network + Rivers + Village Nodes + Risk Overlays */}
        <div
          style={{ transform: `scale(${zoomLevel})`, transformOrigin: "center center" }}
          className="w-full h-full flex items-center justify-center transition-transform duration-200"
        >
          <svg
            viewBox="0 0 460 440"
            className="w-full h-full select-none"
          >
            {/* 1. Base Terrain Shading & Agricultural Patches */}
            <rect x="0" y="0" width="460" height="440" fill="#EAE5D9" />
            
            {/* Cropland Green & Silt Farmland Field Patches */}
            <path d="M 40,40 Q 120,10 200,60 T 360,30 L 440,80 L 410,210 L 300,160 L 180,180 L 80,120 Z" fill="#E2EAD8" opacity="0.8" />
            <path d="M 120,180 Q 250,140 380,220 T 430,380 L 300,430 L 180,390 L 80,350 L 50,220 Z" fill="#DFE8D4" opacity="0.85" />
            <path d="M 140,210 Q 230,190 300,240 T 260,330 L 160,290 Z" fill="#D6E2C9" opacity="0.9" />

            {/* Topographic Contour Lines */}
            <g stroke="#C6BCA8" strokeWidth="0.75" fill="none" opacity="0.6">
              <path d="M 0,90 Q 140,70 230,120 T 460,90" />
              <path d="M 0,160 Q 150,210 280,170 T 460,230" strokeDasharray="3,2" />
              <path d="M 0,280 Q 140,240 270,310 T 460,290" />
              <path d="M 30,380 Q 200,340 360,400" strokeDasharray="3,2" />
              <ellipse cx="225" cy="220" rx="160" ry="110" />
            </g>

            {/* 2. Hydrology / Rivers (Kalisindh & Lakhundar Rivers) */}
            <g>
              <path
                d="M 30,440 Q 90,360 145,280 T 215,200 T 270,120 T 380,10"
                fill="none"
                stroke="#689FA8"
                strokeWidth="3.5"
                strokeLinecap="round"
                opacity="0.85"
              />
              <path
                d="M 320,440 Q 305,340 260,260 T 215,200"
                fill="none"
                stroke="#689FA8"
                strokeWidth="2.2"
                strokeLinecap="round"
                opacity="0.75"
              />
              <text x="310" y="70" fill="#4D7F88" fontSize="8" fontStyle="italic" fontWeight="600">
                Kalisindh River
              </text>
              <text x="80" y="340" fill="#4D7F88" fontSize="7.5" fontStyle="italic" fontWeight="600">
                Lakhundar River
              </text>
            </g>

            {/* 3. Major Road Network (NH-52, State Highways) & Railway */}
            <g>
              {/* Secondary roads / SH */}
              <path d="M 10,130 L 450,270" stroke="#FFFFFF" strokeWidth="2.5" fill="none" opacity="0.9" />
              <path d="M 10,130 L 450,270" stroke="#D1B896" strokeWidth="1.5" fill="none" />
              
              <path d="M 70,440 L 380,10" stroke="#FFFFFF" strokeWidth="2.5" fill="none" opacity="0.9" />
              <path d="M 70,440 L 380,10" stroke="#D1B896" strokeWidth="1.5" fill="none" />

              {/* National Highway 52 (Cased Orange Highway) */}
              <path d="M 40,30 Q 180,160 220,230 T 410,420" stroke="#FFFFFF" strokeWidth="4" fill="none" opacity="0.95" />
              <path d="M 40,30 Q 180,160 220,230 T 410,420" stroke="#E2924F" strokeWidth="2.5" fill="none" />
              
              {/* Railway line (Dashed track) */}
              <path d="M 15,190 Q 120,210 220,235 T 450,330" stroke="#68625B" strokeWidth="1.2" strokeDasharray="4,3" fill="none" />

              {/* Highway Label */}
              <rect x="135" y="145" width="28" height="11" rx="2" fill="#E2924F" />
              <text x="149" y="153.5" textAnchor="middle" fill="#FFFFFF" fontSize="6.5" fontWeight="800">
                NH 52
              </text>
            </g>

            {/* 4. Translucent Block Risk Overlays */}
            {blockSvgPaths.map((block) => {
              const isSelected = selectedBlockId === block.id || (block.id === "block-shajapur" && selectedBlockId.includes("shajapur"));

              return (
                <g
                  key={block.id}
                  className="cursor-pointer group"
                  onClick={() => {
                    setSelectedBlockId(block.id);
                    setShowFloatingCard(true);
                  }}
                >
                  <path
                    d={block.d}
                    fill={block.color}
                    fillOpacity={isSelected ? "0.60" : "0.38"}
                    stroke={isSelected ? "#18342C" : "#FFFFFF"}
                    strokeWidth={isSelected ? "2.5" : "1.5"}
                    strokeLinejoin="round"
                    strokeDasharray={isSelected ? "none" : "4,2"}
                    className="transition-all duration-200 hover:fill-opacity-55"
                  />
                  
                  {/* Block Label Badge */}
                  <rect
                    x={block.center.x - 30}
                    y={block.center.y - 8}
                    width="60"
                    height="16"
                    rx="4"
                    fill={isSelected ? "#18342C" : "#FFFDF8"}
                    fillOpacity={isSelected ? "0.92" : "0.88"}
                    stroke={isSelected ? "#FFFFFF" : "#DED9CB"}
                    strokeWidth="0.8"
                  />
                  <text
                    x={block.center.x}
                    y={block.center.y + 3.5}
                    textAnchor="middle"
                    fill={isSelected ? "#FFFFFF" : "#18342C"}
                    fontSize={isSelected ? "9.5" : "8.5"}
                    fontWeight="800"
                    className="pointer-events-none select-none font-sans tracking-tight"
                  >
                    {block.name}
                  </text>
                </g>
              );
            })}

            {/* 5. Village / Mandi Node Settlements */}
            <g className="pointer-events-none select-none">
              {/* Shajapur HQ (Prominent Marker) */}
              <circle cx="218" cy="225" r="4.5" fill="#C85B4F" stroke="#FFFFFF" strokeWidth="2" />
              <circle cx="218" cy="225" r="8" fill="none" stroke="#C85B4F" strokeWidth="1" strokeDasharray="2,2" opacity="0.7" />

              {/* Berchha */}
              <circle cx="280" cy="235" r="2.5" fill="#18342C" stroke="#FFFFFF" strokeWidth="1" />
              <text x="286" y="238" fill="#18342C" fontSize="7" fontWeight="700">Berchha</text>

              {/* Dupada */}
              <circle cx="205" cy="180" r="2.5" fill="#18342C" stroke="#FFFFFF" strokeWidth="1" />
              <text x="211" y="183" fill="#18342C" fontSize="7" fontWeight="700">Dupada</text>

              {/* Maksi Mandi */}
              <circle cx="70" cy="205" r="3" fill="#18342C" stroke="#FFFFFF" strokeWidth="1.2" />
              <text x="76" y="208" fill="#18342C" fontSize="7" fontWeight="700">Maksi Jn</text>

              {/* Kalapipal */}
              <circle cx="105" cy="305" r="3" fill="#18342C" stroke="#FFFFFF" strokeWidth="1.2" />
              <text x="111" y="308" fill="#18342C" fontSize="7" fontWeight="700">Kalapipal</text>

              {/* Polay Kalan */}
              <circle cx="170" cy="370" r="2.5" fill="#18342C" stroke="#FFFFFF" strokeWidth="1" />
              <text x="176" y="373" fill="#18342C" fontSize="7" fontWeight="700">Polay Kalan</text>

              {/* Sarangpur */}
              <circle cx="265" cy="75" r="3" fill="#18342C" stroke="#FFFFFF" strokeWidth="1.2" />
              <text x="271" y="78" fill="#18342C" fontSize="7" fontWeight="700">Sarangpur</text>
            </g>

          </svg>
        </div>

        {/* FLOATING BLOCK INFORMATION PANEL (Active Location Intelligence) */}
        {showFloatingCard && (
          <div className="absolute top-4 right-4 w-52 sm:w-56 bg-[#FFFDF8]/98 border border-[#DED9CB] rounded-xl p-3.5 shadow-lg backdrop-blur-md z-20 space-y-2.5">
            {/* Title Row with Close Button */}
            <div className="flex items-center justify-between border-b border-[#DED9CB]/60 pb-1.5">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#176B4D]" />
                <h4 className="font-extrabold text-xs sm:text-sm text-[#18342C]">
                  Shajapur Block
                </h4>
              </div>
              <button
                onClick={() => setShowFloatingCard(false)}
                className="text-[#63736D] hover:text-[#18342C] p-0.5 rounded cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Risk Attributes List */}
            <div className="space-y-1.5 text-[11px]">
              <div className="flex items-center justify-between">
                <span className="text-[#63736D]">Rainfall Risk</span>
                <span className="flex items-center gap-1 font-bold text-[#D99A32]">
                  <span className="w-2 h-2 rounded-full bg-[#D99A32]" />
                  Moderate
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[#63736D]">Dry Spell Risk</span>
                <span className="flex items-center gap-1 font-bold text-[#176B4D]">
                  <span className="w-2 h-2 rounded-full bg-[#176B4D]" />
                  Low
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[#63736D]">Heavy Rain Risk</span>
                <span className="flex items-center gap-1 font-bold text-[#D99A32]">
                  <span className="w-2 h-2 rounded-full bg-[#D99A32]" />
                  Moderate
                </span>
              </div>

              <div className="flex items-center justify-between pt-0.5 border-t border-[#DED9CB]/40">
                <span className="text-[#63736D]">Onset Probability</span>
                <span className="font-black text-[#D99A32]">
                  84%
                </span>
              </div>
            </div>

            {/* View Advisory CTA Button */}
            <Link
              href="/advisory"
              className="w-full inline-flex items-center justify-center gap-1.5 py-1.5 text-xs font-bold text-white bg-[#C86F4A] hover:bg-[#B75D3A] rounded-lg shadow-2xs transition-colors cursor-pointer"
            >
              <span>View Advisory</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        )}

        {/* Bottom Centered Floating Legend */}
        <div className="absolute bottom-3 right-3 z-10 bg-[#FFFDF8]/95 border border-[#DED9CB] rounded-full px-3 py-1 shadow-sm flex items-center gap-2.5 text-[10.5px]">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#4E8D56]" />
            <span className="text-[#18342C] font-semibold">Low</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#CCA836]" />
            <span className="text-[#18342C] font-semibold">Moderate</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#D96A32]" />
            <span className="text-[#18342C] font-semibold">High</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#C85B4F]" />
            <span className="text-[#18342C] font-semibold">Very High</span>
          </div>
        </div>

      </div>
    </div>
  );
}

export default RiskOverview;
