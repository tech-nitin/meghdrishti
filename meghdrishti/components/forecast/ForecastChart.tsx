"use client";

import React, { useState, useEffect } from "react";
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
import { BarChart3, CloudRain, Sprout, ShieldAlert, ShieldCheck } from "lucide-react";

export function ForecastChart() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<"7" | "14">("7");

  useEffect(() => {
    setMounted(true);
  }, []);

  // Exact mock dataset requested in the specification (12 Jun to 24 Jun)
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
  ];

  const chartData = activeTab === "7" ? fullChartData.slice(0, 7) : fullChartData;

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
    <div className="bg-[#FFFDF8] border border-[#DED9CB] rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col justify-between h-full space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#DED9CB]/70">
        <div className="flex items-start gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#E8EFE7] flex items-center justify-center text-[#176B4D] shrink-0 mt-0.5">
            <BarChart3 className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-[#18342C] font-sans">
              7–14 Day Rainfall Outlook
            </h3>
            <p className="text-xs text-[#63736D]">
              Forecasted rainfall (mm) with historical average and uncertainty
            </p>
          </div>
        </div>

        {/* Tabs: 7 Days / 14 Days */}
        <div className="flex items-center p-1 bg-[#F6F3EA] border border-[#DED9CB] rounded-xl self-start sm:self-auto text-xs">
          <button
            onClick={() => setActiveTab("7")}
            className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
              activeTab === "7"
                ? "bg-[#176B4D] text-white shadow-2xs"
                : "text-[#63736D] hover:text-[#18342C]"
            }`}
          >
            7 Days
          </button>
          <button
            onClick={() => setActiveTab("14")}
            className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
              activeTab === "14"
                ? "bg-[#176B4D] text-white shadow-2xs"
                : "text-[#63736D] hover:text-[#18342C]"
            }`}
          >
            14 Days
          </button>
        </div>
      </div>

      {/* Chart Canvas with Vertical Y-Axis Label and Top Right Legend */}
      <div className="relative w-full h-64 sm:h-72 bg-[#FFFDF8] rounded-xl pt-2">
        {/* Top-Right Custom Legend */}
        <div className="absolute top-0 right-1 z-10 flex flex-wrap items-center gap-3 text-[10.5px] text-[#63736D] bg-[#FFFDF8]/95 px-2 py-0.5 rounded-md border border-[#DED9CB]/60">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-xs bg-[#5B91A8]" />
            <span className="font-semibold text-[#18342C]">Forecast Rainfall</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-0.5 bg-[#18342C] border-b border-dashed border-[#18342C]" />
            <span className="font-semibold text-[#18342C]">Historical Avg</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-xs bg-[#5B91A8]/20 border border-[#5B91A8]/40" />
            <span className="font-semibold text-[#18342C]">Uncertainty Range</span>
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
                fontSize={10.5}
                fontWeight={600}
                tickLine={false}
                axisLine={{ stroke: "#DED9CB" }}
              />
              <YAxis
                stroke="#63736D"
                fontSize={10.5}
                fontWeight={600}
                tickLine={false}
                axisLine={{ stroke: "#DED9CB" }}
                domain={[0, 80]}
                ticks={[0, 20, 40, 60, 80]}
              />
              <Tooltip content={<CustomTooltip />} />

              {/* Uncertainty Range (Soft Blue Area) */}
              <Area
                type="monotone"
                dataKey="confidenceMax"
                stroke="none"
                fill="#5B91A8"
                fillOpacity={0.18}
                name="Uncertainty Range"
              />

              {/* Historical Average (Dashed Dark Line) */}
              <Line
                type="monotone"
                dataKey="historicalAverage"
                stroke="#18342C"
                strokeWidth={1.8}
                strokeDasharray="4 4"
                dot={false}
                name="Historical Average"
              />

              {/* Forecast Rainfall (Rainfall Blue Bars) */}
              <Bar
                dataKey="forecastRainfall"
                fill="#5B91A8"
                radius={[4, 4, 0, 0]}
                maxBarSize={24}
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

      {/* FORECAST SUMMARY (NEXT 7 DAYS) */}
      <div className="pt-2.5 border-t border-[#DED9CB]/70 space-y-2">
        <div className="text-[10.5px] font-extrabold text-[#18342C] tracking-wide uppercase">
          Forecast Summary (Next 7 Days)
        </div>

        <div className="grid grid-cols-4 gap-2 text-center">
          {/* Total Rainfall */}
          <div className="p-2.5 rounded-xl bg-[#F6F3EA]/70 border border-[#DED9CB]/60 flex flex-col items-center justify-center space-y-0.5">
            <CloudRain className="w-4 h-4 text-[#18342C]" />
            <div className="text-xs sm:text-sm font-black text-[#18342C]">68–92 mm</div>
            <div className="text-[9.5px] text-[#63736D] font-medium">Total Rainfall</div>
          </div>

          {/* Dry Spell Risk */}
          <div className="p-2.5 rounded-xl bg-[#F6F3EA]/70 border border-[#DED9CB]/60 flex flex-col items-center justify-center space-y-0.5">
            <Sprout className="w-4 h-4 text-[#176B4D]" />
            <div className="text-xs sm:text-sm font-black text-[#176B4D]">LOW</div>
            <div className="text-[9.5px] text-[#63736D] font-medium">Dry Spell Risk</div>
          </div>

          {/* Heavy Rain Risk */}
          <div className="p-2.5 rounded-xl bg-[#F6F3EA]/70 border border-[#DED9CB]/60 flex flex-col items-center justify-center space-y-0.5">
            <ShieldAlert className="w-4 h-4 text-[#D99A32]" />
            <div className="text-xs sm:text-sm font-black text-[#D99A32]">MODERATE</div>
            <div className="text-[9.5px] text-[#63736D] font-medium">Heavy Rain Risk</div>
          </div>

          {/* Forecast Confidence */}
          <div className="p-2.5 rounded-xl bg-[#F6F3EA]/70 border border-[#DED9CB]/60 flex flex-col items-center justify-center space-y-0.5">
            <ShieldCheck className="w-4 h-4 text-[#176B4D]" />
            <div className="text-xs sm:text-sm font-black text-[#176B4D]">82%</div>
            <div className="text-[9.5px] text-[#63736D] font-medium">Confidence</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForecastChart;
