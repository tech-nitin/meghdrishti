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
import { CloudRain, Sprout, ShieldAlert, ShieldCheck, Calendar, Sparkles } from "lucide-react";
import { mock30DayForecastMetrics } from "@/data/forecasts";
import { useApp } from "@/lib/context/AppContext";

export type ForecastHorizon = 7 | 14 | 21 | 30;

export interface ForecastHeroProps {
  horizon: ForecastHorizon;
  onHorizonChange: (h: ForecastHorizon) => void;
  className?: string;
}

export function ForecastHero({
  horizon,
  onHorizonChange,
  className = "",
}: ForecastHeroProps) {
  const { language, currentLocation } = useApp();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const chartData = mock30DayForecastMetrics.slice(0, horizon);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-[#FFFDF8] border border-[#DED9CB] rounded-2xl p-3.5 shadow-md text-xs space-y-2 z-30 min-w-[200px] backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-[#DED9CB]/70 pb-1.5">
            <span className="font-black text-sm text-[#19362F] font-sans">
              {data.date} 2026
            </span>
            <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-[#E8EFE7] text-[#126B4F]">
              {data.condition}
            </span>
          </div>

          <div className="space-y-1.5 text-[11px]">
            <div className="flex items-center justify-between text-[#19362F]">
              <span className="text-[#2B7A8C] font-bold">Forecast Rainfall:</span>
              <strong className="font-black text-sm text-[#2B7A8C]">
                {data.forecastRainfall} mm
              </strong>
            </div>
            <div className="flex items-center justify-between text-[#687A73]">
              <span>Historical Avg:</span>
              <span className="font-bold text-[#19362F]">{data.historicalAverage} mm</span>
            </div>
            <div className="flex items-center justify-between text-[#687A73]">
              <span>Uncertainty Range:</span>
              <span className="font-bold text-[#19362F]">
                {data.confidenceMin} – {data.confidenceMax} mm
              </span>
            </div>
            <div className="flex items-center justify-between text-[#687A73] pt-1 border-t border-[#DED9CB]/60">
              <span>Rainfall Probability:</span>
              <span className="font-black text-[#126B4F]">{data.rainfallProbability}%</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <section
      className={`w-full bg-[#FFFDF8]/95 border border-[#DED9CB] rounded-3xl overflow-hidden shadow-sm p-6 sm:p-8 lg:p-10 ${className}`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* LEFT COLUMN (Col 5 / 42%): Narrative & Near-Term Synthesis */}
        <div className="lg:col-span-5 space-y-6 flex flex-col justify-between h-full">
          
          {/* Section Tag */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-black uppercase tracking-wider text-[#126B4F]">
                {language === "hi" ? "मानसून परिदृश्य" : "MONSOON OUTLOOK"}
              </span>
              <span className="text-[#687A73]">•</span>
              <span className="text-xs font-bold text-[#687A73]">
                {currentLocation.district} District
              </span>
            </div>

            <blockquote className="text-xl sm:text-2xl font-black text-[#19362F] font-sans tracking-tight leading-snug">
              &ldquo;
              {language === "hi"
                ? "निकट अवधि में सक्रिय वर्षा दौर जारी रहने की संभावना है, जिसके बाद अल्प शुष्क विराम (22-25 जून) संभावित है।"
                : "Active rainfall conditions are expected to continue through the near term, followed by a possible short dry spell."}
              &rdquo;
            </blockquote>
          </div>

          {/* Near-Term Synthesis Metrics Grid */}
          <div className="space-y-2.5">
            <div className="text-[10px] font-black uppercase tracking-wider text-[#687A73]">
              {language === "hi" ? "आगामी 7-दिवसीय सारांश" : "NEXT 7 DAYS METRICS"}
            </div>

            <div className="grid grid-cols-2 gap-3">
              {/* Expected Rainfall */}
              <div className="p-3.5 rounded-2xl bg-[#F4F1E8]/70 border border-[#DED9CB] space-y-0.5">
                <div className="text-[10.5px] font-bold text-[#687A73]">Expected rainfall</div>
                <div className="text-2xl font-black text-[#2B7A8C] font-sans tracking-tight">
                  68–92 mm
                </div>
                <div className="text-[10px] text-[#687A73]">Near-term accumulation</div>
              </div>

              {/* Rainfall Probability */}
              <div className="p-3.5 rounded-2xl bg-[#F4F1E8]/70 border border-[#DED9CB] space-y-0.5">
                <div className="text-[10.5px] font-bold text-[#687A73]">Rainfall probability</div>
                <div className="text-2xl font-black text-[#126B4F] font-sans tracking-tight">
                  78%
                </div>
                <div className="text-[10px] text-[#687A73]">Sustained moisture profile</div>
              </div>

              {/* Dry Spell Risk */}
              <div className="p-3.5 rounded-2xl bg-[#F4F1E8]/70 border border-[#DED9CB] space-y-0.5">
                <div className="text-[10.5px] font-bold text-[#687A73]">Dry spell risk</div>
                <div className="text-2xl font-black text-[#126B4F] font-sans tracking-tight">
                  LOW
                </div>
                <div className="text-[10px] text-[#687A73]">16% deficit index</div>
              </div>

              {/* Heavy Rain Risk */}
              <div className="p-3.5 rounded-2xl bg-[#F4F1E8]/70 border border-[#DED9CB] space-y-0.5">
                <div className="text-[10.5px] font-bold text-[#687A73]">Heavy rain risk</div>
                <div className="text-2xl font-black text-[#D99A2B] font-sans tracking-tight">
                  MODERATE
                </div>
                <div className="text-[10px] text-[#687A73]">14% surge hazard</div>
              </div>
            </div>
          </div>

          {/* Forecast Range Controller */}
          <div className="pt-2">
            <div className="text-[10px] font-black uppercase tracking-wider text-[#687A73] mb-2">
              {language === "hi" ? "पूर्वानुमान सीमा चुनें:" : "SELECT FORECAST HORIZON:"}
            </div>
            <div className="inline-flex items-center p-1 bg-[#F4F1E8] border border-[#DED9CB] rounded-2xl text-xs font-black">
              {[7, 14, 21, 30].map((h) => {
                const isSelected = horizon === h;
                return (
                  <button
                    key={h}
                    type="button"
                    onClick={() => onHorizonChange(h as ForecastHorizon)}
                    className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#126B4F] text-white shadow-2xs"
                        : "text-[#687A73] hover:text-[#19362F] hover:bg-white/50"
                    }`}
                  >
                    {h} DAYS
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN (Col 7 / 58%): Atmospheric Recharts Visualization */}
        <div className="lg:col-span-7 bg-[#FAF8F2] border border-[#DED9CB] rounded-2xl p-5 sm:p-6 space-y-4 shadow-2xs">
          
          {/* Top Title & Legend Strip */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#DED9CB]/70">
            <div>
              <h3 className="font-black text-sm text-[#19362F] uppercase tracking-wider">
                {horizon}-Day S2S Rainfall Trajectory
              </h3>
              <p className="text-[11px] text-[#687A73]">
                Daily simulated forecast vs. historical LPA average with uncertainty
              </p>
            </div>

            {/* Custom Legend */}
            <div className="flex flex-wrap items-center gap-2.5 text-[10px] text-[#687A73] bg-[#FFFDF8] px-2.5 py-1 rounded-xl border border-[#DED9CB]/70">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#2B7A8C]" />
                <span className="font-bold text-[#19362F]">Forecast Rain</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 bg-[#19362F]" />
                <span className="font-bold text-[#19362F]">Hist. Avg</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#6F9EAB]/30" />
                <span className="font-bold text-[#19362F]">Spread</span>
              </div>
            </div>
          </div>

          {/* Chart Canvas */}
          <div className="relative w-full h-72 sm:h-80 bg-white/80 rounded-xl pt-2">
            {mounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                  data={chartData}
                  margin={{ top: 20, right: 12, left: 0, bottom: 0 }}
                >
                  <CartesianGrid stroke="#E8EFE7" strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="date"
                    stroke="#687A73"
                    fontSize={10}
                    fontWeight={700}
                    tickLine={false}
                    axisLine={{ stroke: "#DED9CB" }}
                  />
                  <YAxis
                    stroke="#687A73"
                    fontSize={10}
                    fontWeight={700}
                    tickLine={false}
                    axisLine={{ stroke: "#DED9CB" }}
                    domain={[0, 40]}
                    ticks={[0, 10, 20, 30, 40]}
                  />
                  <Tooltip content={<CustomTooltip />} />

                  {/* Uncertainty Range Band */}
                  <Area
                    type="monotone"
                    dataKey="confidenceMax"
                    stroke="none"
                    fill="#6F9EAB"
                    fillOpacity={0.2}
                    name="Uncertainty Range"
                  />

                  {/* Historical Average Line */}
                  <Line
                    type="monotone"
                    dataKey="historicalAverage"
                    stroke="#19362F"
                    strokeWidth={2}
                    strokeDasharray="4 4"
                    dot={false}
                    name="Historical Average"
                  />

                  {/* Forecast Rainfall Bars */}
                  <Bar
                    dataKey="forecastRainfall"
                    fill="#2B7A8C"
                    radius={[4, 4, 0, 0]}
                    maxBarSize={28}
                    name="Forecast Rainfall"
                  />
                </ComposedChart>
              </ResponsiveContainer>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-xs text-[#687A73]">
                Loading Forecast Trajectory...
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}

export default ForecastHero;
