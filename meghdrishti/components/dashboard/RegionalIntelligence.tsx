"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Map,
  ArrowRight,
  Plus,
  Minus,
  Crosshair,
  Compass,
  X,
  MapPin,
  BarChart3,
  CloudRain,
  Sprout,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react";
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { mockBlockRiskData } from "@/data/locations";

export function RegionalIntelligence() {
  const [selectedBlockId, setSelectedBlockId] = useState<string>("block-shajapur");
  const [activeLayer, setActiveLayer] = useState<
    "rainfall" | "onset" | "dryspell" | "heavyrain"
  >("rainfall");
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [showFloatingCard, setShowFloatingCard] = useState<boolean>(true);
  const [forecastTab, setForecastTab] = useState<"7" | "14" | "30">("7");
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 12 Jun - 24 Jun exact dataset + extended 30-day projection
  const fullChartData = [
    { date: "12 Jun", forecastRainfall: 14, historicalAverage: 20, confidenceMin: 8, confidenceMax: 26 },
    { date: "13 Jun", forecastRainfall: 28, historicalAverage: 22, confidenceMin: 18, confidenceMax: 42 },
    { date: "14 Jun", forecastRainfall: 22, historicalAverage: 25, confidenceMin: 14, confidenceMax: 35 },
    { date: "15 Jun", forecastRainfall: 42, historicalAverage: 30, confidenceMin: 28, confidenceMax: 60 },
    { date: "16 Jun", forecastRainfall: 48, historicalAverage: 34, confidenceMin: 32, confidenceMax: 70 },
    { date: "17 Jun", forecastRainfall: 36, historicalAverage: 32, confidenceMin: 24, confidenceMax: 54 },
    { date: "18 Jun", forecastRainfall: 25, historicalAverage: 28, confidenceMin: 16, confidenceMax: 40 },
    { date: "19 Jun", forecastRainfall: 18, historicalAverage: 26, confidenceMin: 10, confidenceMax: 30 },
    { date: "20 Jun", forecastRainfall: 23, historicalAverage: 27, confidenceMin: 14, confidenceMax: 36 },
    { date: "21 Jun", forecastRainfall: 17, historicalAverage: 25, confidenceMin: 10, confidenceMax: 28 },
    { date: "22 Jun", forecastRainfall: 20, historicalAverage: 26, confidenceMin: 12, confidenceMax: 32 },
    { date: "23 Jun", forecastRainfall: 25, historicalAverage: 28, confidenceMin: 16, confidenceMax: 38 },
    { date: "24 Jun", forecastRainfall: 28, historicalAverage: 30, confidenceMin: 18, confidenceMax: 44 },
    { date: "26 Jun", forecastRainfall: 16, historicalAverage: 32, confidenceMin: 8, confidenceMax: 32 },
    { date: "28 Jun", forecastRainfall: 12, historicalAverage: 35, confidenceMin: 6, confidenceMax: 28 },
    { date: "30 Jun", forecastRainfall: 24, historicalAverage: 38, confidenceMin: 12, confidenceMax: 42 },
  ];

  const chartData = forecastTab === "7" ? fullChartData.slice(0, 7) : forecastTab === "14" ? fullChartData.slice(0, 13) : fullChartData;

  // Geographic block coordinates
  const blockSvgPaths = [
    {
      id: "block-agar",
      name: "Agar",
      d: "M 65,50 L 165,35 L 205,110 L 130,160 L 55,125 Z",
      center: { x: 125, y: 95 },
      color: "#4E8D56",
      risk: "Low",
    },
    {
      id: "block-sarangpur",
      name: "Sarangpur",
      d: "M 165,35 L 285,25 L 345,105 L 270,155 L 205,110 Z",
      center: { x: 260, y: 90 },
      color: "#8FA336",
      risk: "Moderate-Low",
    },
    {
      id: "block-maksi",
      name: "Maksi",
      d: "M 25,135 L 105,130 L 130,215 L 55,255 L 18,190 Z",
      center: { x: 68, y: 190 },
      color: "#4E8D56",
      risk: "Low",
    },
    {
      id: "block-shajapur",
      name: "Shajapur",
      d: "M 130,160 L 270,155 L 315,245 L 235,310 L 150,265 L 130,215 Z",
      center: { x: 215, y: 225 },
      color: "#D96A32",
      risk: "High Risk Active",
    },
    {
      id: "block-kalapipal",
      name: "Kalapipal",
      d: "M 130,215 L 150,265 L 140,355 L 70,330 L 55,255 Z",
      center: { x: 105, y: 290 },
      color: "#4E8D56",
      risk: "Low",
    },
    {
      id: "block-susner",
      name: "Susner",
      d: "M 270,155 L 345,105 L 425,175 L 390,270 L 315,245 Z",
      center: { x: 350, y: 195 },
      color: "#CCA836",
      risk: "Moderate",
    },
    {
      id: "block-mohana",
      name: "Mohana",
      d: "M 150,265 L 235,310 L 215,400 L 125,390 L 140,355 Z",
      center: { x: 175, y: 350 },
      color: "#CCA836",
      risk: "Moderate",
    },
    {
      id: "block-dewas",
      name: "Dewas Border",
      d: "M 235,310 L 315,245 L 390,270 L 365,380 L 280,410 L 215,400 Z",
      center: { x: 300, y: 345 },
      color: "#8FA336",
      risk: "Moderate",
    },
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-[#FFFDF8] border border-[#DED9CB] rounded-xl p-3 shadow-md text-xs space-y-1.5 z-30">
          <div className="font-extrabold text-[#18342C] border-b border-[#DED9CB]/60 pb-1">
            {label} 2026
          </div>
          <div className="space-y-1 text-[11px]">
            <div className="flex items-center justify-between gap-4 text-[#18342C]">
              <span className="text-[#5B91A8] font-bold">Forecast:</span>
              <strong className="font-extrabold">{data.forecastRainfall} mm</strong>
            </div>
            <div className="flex items-center justify-between gap-4 text-[#18342C]">
              <span className="text-[#63736D]">Historical Avg:</span>
              <span className="font-semibold">{data.historicalAverage} mm</span>
            </div>
            <div className="flex items-center justify-between gap-4 text-[#63736D]">
              <span>Uncertainty Range:</span>
              <span className="font-semibold">{data.confidenceMin} – {data.confidenceMax} mm</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <section className="w-full space-y-6">
      {/* SECTION EDITORIAL HEADING */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-3 border-b border-[#DED9CB]/70">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#18342C] font-sans tracking-tight">
            Regional Intelligence
          </h2>
          <p className="text-xs sm:text-sm text-[#63736D] font-medium pt-0.5">
            Block-level rainfall outlook & geospatial risk analytics
          </p>
        </div>

        <Link
          href="/map"
          className="text-xs sm:text-sm font-bold text-[#176B4D] hover:text-[#173B2E] inline-flex items-center gap-1.5 self-start sm:self-auto hover:underline"
        >
          <span>Open Full-Screen GIS Map</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* SHARED ANALYTICAL COMPOSITION: 58% MAP / 42% FORECAST */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* LEFT (Col 7 / ~58%): DOMINANT HYPERLOCAL RISK MAP */}
        <div className="lg:col-span-7 bg-[#FFFDF8]/90 border border-[#DED9CB] rounded-2xl p-5 sm:p-6 shadow-2xs flex flex-col justify-between space-y-4 min-h-[540px] lg:min-h-[580px]">
          
          {/* Map Header with Layer Selector */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#DED9CB]/60">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#E8EFE7] flex items-center justify-center text-[#176B4D]">
                <Map className="w-4 h-4" />
              </div>
              <h3 className="text-base sm:text-lg font-black text-[#18342C] font-sans">
                Hyperlocal Risk Map
              </h3>
            </div>

            {/* Layer selector pills */}
            <div className="flex flex-wrap items-center gap-1 p-0.5 bg-[#F5F1E7] border border-[#DED9CB] rounded-xl text-xs">
              <button
                onClick={() => setActiveLayer("rainfall")}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                  activeLayer === "rainfall"
                    ? "bg-[#176B4D] text-white shadow-2xs"
                    : "text-[#63736D] hover:text-[#18342C]"
                }`}
              >
                Rainfall
              </button>
              <button
                onClick={() => setActiveLayer("onset")}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                  activeLayer === "onset"
                    ? "bg-[#176B4D] text-white shadow-2xs"
                    : "text-[#63736D] hover:text-[#18342C]"
                }`}
              >
                Onset
              </button>
              <button
                onClick={() => setActiveLayer("dryspell")}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                  activeLayer === "dryspell"
                    ? "bg-[#176B4D] text-white shadow-2xs"
                    : "text-[#63736D] hover:text-[#18342C]"
                }`}
              >
                Dry Spell
              </button>
              <button
                onClick={() => setActiveLayer("heavyrain")}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                  activeLayer === "heavyrain"
                    ? "bg-[#176B4D] text-white shadow-2xs"
                    : "text-[#63736D] hover:text-[#18342C]"
                }`}
              >
                Heavy Rain
              </button>
            </div>
          </div>

          {/* Map Geographic Canvas: Light Terrain + Roads + Rivers + Nodes */}
          <div className="relative w-full flex-1 min-h-[420px] bg-[#EFECE2] rounded-xl border border-[#DED9CB] overflow-hidden">
            
            {/* Top-Left: Compass */}
            <div className="absolute top-3 left-3 z-10">
              <div className="w-8 h-8 rounded-full bg-[#FFFDF8]/95 border border-[#DED9CB] backdrop-blur-xs flex flex-col items-center justify-center text-[#18342C] shadow-sm">
                <span className="text-[9px] font-black -mb-1 text-[#176B4D]">N</span>
                <Compass className="w-3.5 h-3.5 text-[#18342C]" />
              </div>
            </div>

            {/* Bottom-Left: Zoom & Controls */}
            <div className="absolute bottom-3 left-3 z-10 flex flex-col gap-2">
              <div className="flex flex-col bg-[#FFFDF8] border border-[#DED9CB] rounded-lg shadow-sm overflow-hidden w-7">
                <button
                  onClick={() => setZoomLevel((z) => Math.min(z + 0.15, 1.4))}
                  className="p-1.5 text-[#18342C] hover:bg-[#F5F1E7] flex items-center justify-center transition-colors cursor-pointer"
                  title="Zoom In"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
                <div className="h-px bg-[#DED9CB]" />
                <button
                  onClick={() => setZoomLevel((z) => Math.max(z - 0.15, 0.85))}
                  className="p-1.5 text-[#18342C] hover:bg-[#F5F1E7] flex items-center justify-center transition-colors cursor-pointer"
                  title="Zoom Out"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                onClick={() => setZoomLevel(1)}
                className="w-7 h-7 rounded-lg bg-[#FFFDF8] border border-[#DED9CB] text-[#18342C] hover:bg-[#F5F1E7] shadow-sm flex items-center justify-center transition-colors cursor-pointer"
                title="Reset View"
              >
                <Crosshair className="w-3.5 h-3.5" />
              </button>

              <div className="bg-[#FFFDF8]/95 backdrop-blur-xs border border-[#DED9CB] rounded px-2 py-0.5 text-[9.5px] text-[#18342C] font-semibold flex items-center gap-2 shadow-2xs">
                <span>0</span>
                <div className="w-6 h-0.5 bg-[#18342C]/60" />
                <span>10</span>
                <div className="w-6 h-0.5 bg-[#18342C]/60" />
                <span>20 km</span>
              </div>
            </div>

            {/* SVG Terrain Map */}
            <div
              style={{ transform: `scale(${zoomLevel})`, transformOrigin: "center center" }}
              className="w-full h-full flex items-center justify-center transition-transform duration-200"
            >
              <svg viewBox="0 0 460 440" className="w-full h-full select-none">
                <rect x="0" y="0" width="460" height="440" fill="#EAE5D9" />
                
                {/* Cropland & Terrain Patches */}
                <path d="M 40,40 Q 120,10 200,60 T 360,30 L 440,80 L 410,210 L 300,160 L 180,180 L 80,120 Z" fill="#E2EAD8" opacity="0.8" />
                <path d="M 120,180 Q 250,140 380,220 T 430,380 L 300,430 L 180,390 L 80,350 L 50,220 Z" fill="#DFE8D4" opacity="0.85" />
                <path d="M 140,210 Q 230,190 300,240 T 260,330 L 160,290 Z" fill="#D6E2C9" opacity="0.9" />

                {/* Contours */}
                <g stroke="#C6BCA8" strokeWidth="0.75" fill="none" opacity="0.6">
                  <path d="M 0,90 Q 140,70 230,120 T 460,90" />
                  <path d="M 0,160 Q 150,210 280,170 T 460,230" strokeDasharray="3,2" />
                  <path d="M 0,280 Q 140,240 270,310 T 460,290" />
                  <ellipse cx="225" cy="220" rx="160" ry="110" />
                </g>

                {/* Rivers (Kalisindh & Lakhundar) */}
                <path d="M 30,440 Q 90,360 145,280 T 215,200 T 270,120 T 380,10" fill="none" stroke="#689FA8" strokeWidth="3.5" strokeLinecap="round" opacity="0.85" />
                <path d="M 320,440 Q 305,340 260,260 T 215,200" fill="none" stroke="#689FA8" strokeWidth="2.2" strokeLinecap="round" opacity="0.75" />
                <text x="310" y="70" fill="#4D7F88" fontSize="8" fontStyle="italic" fontWeight="600">Kalisindh River</text>
                <text x="80" y="340" fill="#4D7F88" fontSize="7.5" fontStyle="italic" fontWeight="600">Lakhundar River</text>

                {/* Roads & NH-52 */}
                <path d="M 10,130 L 450,270" stroke="#FFFFFF" strokeWidth="2.5" fill="none" opacity="0.9" />
                <path d="M 10,130 L 450,270" stroke="#D1B896" strokeWidth="1.5" fill="none" />
                <path d="M 40,30 Q 180,160 220,230 T 410,420" stroke="#FFFFFF" strokeWidth="4" fill="none" opacity="0.95" />
                <path d="M 40,30 Q 180,160 220,230 T 410,420" stroke="#E2924F" strokeWidth="2.5" fill="none" />
                <rect x="135" y="145" width="28" height="11" rx="2" fill="#E2924F" />
                <text x="149" y="153.5" textAnchor="middle" fill="#FFFFFF" fontSize="6.5" fontWeight="800">NH 52</text>

                {/* Translucent Block Overlays */}
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
                        className="transition-all duration-200 hover:fill-opacity-55"
                      />
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
                        className="pointer-events-none select-none font-sans"
                      >
                        {block.name}
                      </text>
                    </g>
                  );
                })}

                {/* Village Nodes */}
                <g className="pointer-events-none select-none">
                  <circle cx="218" cy="225" r="4.5" fill="#C85B4F" stroke="#FFFFFF" strokeWidth="2" />
                  <circle cx="218" cy="225" r="8" fill="none" stroke="#C85B4F" strokeWidth="1" strokeDasharray="2,2" opacity="0.7" />
                  <circle cx="280" cy="235" r="2.5" fill="#18342C" stroke="#FFFFFF" strokeWidth="1" />
                  <text x="286" y="238" fill="#18342C" fontSize="7" fontWeight="700">Berchha</text>
                  <circle cx="70" cy="205" r="3" fill="#18342C" stroke="#FFFFFF" strokeWidth="1.2" />
                  <text x="76" y="208" fill="#18342C" fontSize="7" fontWeight="700">Maksi Jn</text>
                  <circle cx="105" cy="305" r="3" fill="#18342C" stroke="#FFFFFF" strokeWidth="1.2" />
                  <text x="111" y="308" fill="#18342C" fontSize="7" fontWeight="700">Kalapipal</text>
                </g>
              </svg>
            </div>

            {/* Floating Block Popup Card */}
            {showFloatingCard && (
              <div className="absolute top-3 right-3 w-52 bg-[#FFFDF8]/98 border border-[#DED9CB] rounded-xl p-3.5 shadow-md backdrop-blur-md z-20 space-y-2">
                <div className="flex items-center justify-between border-b border-[#DED9CB]/60 pb-1">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#176B4D]" />
                    <h4 className="font-black text-xs text-[#18342C]">Shajapur Block</h4>
                  </div>
                  <button
                    onClick={() => setShowFloatingCard(false)}
                    className="text-[#63736D] hover:text-[#18342C] p-0.5 rounded cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-1 text-[11px]">
                  <div className="flex items-center justify-between">
                    <span className="text-[#63736D]">Rainfall Risk</span>
                    <span className="font-bold text-[#D99A32]">Moderate</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#63736D]">Dry Spell Risk</span>
                    <span className="font-bold text-[#176B4D]">Low</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#63736D]">Heavy Rain Risk</span>
                    <span className="font-bold text-[#D99A32]">Moderate</span>
                  </div>
                  <div className="flex items-center justify-between pt-0.5 border-t border-[#DED9CB]/40">
                    <span className="text-[#63736D]">Onset Prob.</span>
                    <span className="font-black text-[#D99A32]">84%</span>
                  </div>
                </div>

                <Link
                  href="/advisory"
                  className="w-full inline-flex items-center justify-center gap-1 py-1.5 text-xs font-bold text-white bg-[#C86F4A] hover:bg-[#B75D3A] rounded-lg shadow-2xs transition-colors cursor-pointer"
                >
                  <span>View Advisory</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            )}

            {/* Bottom Legend */}
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
            </div>
          </div>
        </div>

        {/* RIGHT (Col 5 / ~42%): INTEGRATED FORECAST VISUALIZATION */}
        <div className="lg:col-span-5 bg-[#FFFDF8]/90 border border-[#DED9CB] rounded-2xl p-5 sm:p-6 shadow-2xs flex flex-col justify-between space-y-4 min-h-[540px] lg:min-h-[580px]">
          
          {/* Forecast Header with Tabs */}
          <div className="flex items-center justify-between pb-3 border-b border-[#DED9CB]/60">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#E8EFE7] flex items-center justify-center text-[#176B4D]">
                <BarChart3 className="w-4 h-4" />
              </div>
              <h3 className="text-base sm:text-lg font-black text-[#18342C] font-sans">
                Rainfall Outlook
              </h3>
            </div>

            {/* Tabs: 7 Days | 14 Days | 30 Days */}
            <div className="flex items-center p-0.5 bg-[#F5F1E7] border border-[#DED9CB] rounded-xl text-xs">
              {(["7", "14", "30"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setForecastTab(tab)}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                    forecastTab === tab
                      ? "bg-[#176B4D] text-white shadow-2xs"
                      : "text-[#63736D] hover:text-[#18342C]"
                  }`}
                >
                  {tab}D
                </button>
              ))}
            </div>
          </div>

          {/* Recharts Canvas */}
          <div className="relative w-full flex-1 min-h-[300px] bg-[#FFFDF8] rounded-xl pt-1">
            {/* Custom Legend */}
            <div className="absolute top-0 right-1 z-10 flex flex-wrap items-center gap-2.5 text-[10px] text-[#63736D] bg-[#FFFDF8]/95 px-2 py-0.5 rounded-md border border-[#DED9CB]/60">
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#5B91A8]" />
                <span className="font-semibold text-[#18342C]">Forecast</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-3 h-0.5 bg-[#18342C] border-b border-dashed border-[#18342C]" />
                <span className="font-semibold text-[#18342C]">Hist. Avg</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#5B91A8]/20 border border-[#5B91A8]/40" />
                <span className="font-semibold text-[#18342C]">Uncertainty</span>
              </div>
            </div>

            {/* Y Axis Title */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -rotate-90 text-[10px] text-[#63736D] font-bold origin-center -translate-x-3 pointer-events-none">
              Rainfall (mm)
            </div>

            {mounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={chartData} margin={{ top: 28, right: 10, left: 10, bottom: 0 }}>
                  <CartesianGrid stroke="#E8EFE7" strokeDasharray="2 2" vertical={false} />
                  <XAxis
                    dataKey="date"
                    stroke="#63736D"
                    fontSize={10}
                    fontWeight={600}
                    tickLine={false}
                    axisLine={{ stroke: "#DED9CB" }}
                  />
                  <YAxis
                    stroke="#63736D"
                    fontSize={10}
                    fontWeight={600}
                    tickLine={false}
                    axisLine={{ stroke: "#DED9CB" }}
                    domain={[0, 80]}
                    ticks={[0, 20, 40, 60, 80]}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="confidenceMax"
                    stroke="none"
                    fill="#5B91A8"
                    fillOpacity={0.18}
                    name="Uncertainty Range"
                  />
                  <Line
                    type="monotone"
                    dataKey="historicalAverage"
                    stroke="#18342C"
                    strokeWidth={1.8}
                    strokeDasharray="4 4"
                    dot={false}
                    name="Historical Average"
                  />
                  <Bar
                    dataKey="forecastRainfall"
                    fill="#5B91A8"
                    radius={[4, 4, 0, 0]}
                    maxBarSize={22}
                    name="Forecast Rainfall"
                  />
                </ComposedChart>
              </ResponsiveContainer>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-xs text-[#63736D]">
                Loading Forecast Data...
              </div>
            )}
          </div>

          {/* Compact Metric Row Below Chart */}
          <div className="pt-3 border-t border-[#DED9CB]/70">
            <div className="grid grid-cols-4 divide-x divide-[#DED9CB]/60 text-center">
              <div className="px-1 space-y-0.5">
                <div className="text-xs sm:text-sm font-black text-[#18342C]">68–92 mm</div>
                <div className="text-[9.5px] text-[#63736D] font-medium">Total Rain</div>
              </div>
              <div className="px-1 space-y-0.5">
                <div className="text-xs sm:text-sm font-black text-[#176B4D]">LOW</div>
                <div className="text-[9.5px] text-[#63736D] font-medium">Dry Spell</div>
              </div>
              <div className="px-1 space-y-0.5">
                <div className="text-xs sm:text-sm font-black text-[#D99A32]">MODERATE</div>
                <div className="text-[9.5px] text-[#63736D] font-medium">Heavy Rain</div>
              </div>
              <div className="px-1 space-y-0.5">
                <div className="text-xs sm:text-sm font-black text-[#176B4D]">82%</div>
                <div className="text-[9.5px] text-[#63736D] font-medium">Confidence</div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

export default RegionalIntelligence;
