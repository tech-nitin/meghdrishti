"use client";

import React, { useState } from "react";
import { CloudRain, CloudDrizzle, Cloud, CloudSun, Sun, Droplets, ThermometerSun, Sparkles } from "lucide-react";
import { mock30DayForecastMetrics } from "@/data/forecasts";
import type { ForecastMetric } from "@/types/forecast";
import { useApp } from "@/lib/context/AppContext";

export interface DailyForecastTableProps {
  selectedDay?: ForecastMetric | null;
  onSelectDay?: (day: ForecastMetric) => void;
  className?: string;
}

export function DailyForecastTable({
  selectedDay,
  onSelectDay,
  className = "",
}: DailyForecastTableProps) {
  const { language } = useApp();
  const [filterHorizon, setFilterHorizon] = useState<7 | 14 | 30>(14);

  const forecastData = mock30DayForecastMetrics.slice(0, filterHorizon);

  const getWeatherIcon = (condition: string) => {
    const c = condition.toLowerCase();
    if (c.includes("heavy") || c.includes("downpour"))
      return <CloudRain className="w-3.5 h-3.5 text-[#2B7A8C]" />;
    if (c.includes("showers") || c.includes("rain") || c.includes("drizzle"))
      return <CloudDrizzle className="w-3.5 h-3.5 text-[#2B7A8C]" />;
    if (c.includes("cloudy") || c.includes("spell"))
      return <Cloud className="w-3.5 h-3.5 text-[#687A73]" />;
    return <CloudSun className="w-3.5 h-3.5 text-[#D99A2B]" />;
  };

  return (
    <section className={`w-full space-y-4 ${className}`}>
      {/* Header & Range Filter Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 pb-3 border-b border-[#DED9CB]/70">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-[#19362F] font-sans tracking-tight uppercase">
            {language === "hi" ? "दैनिक मौसम मैट्रिक्स" : "DAILY MONSOON FEED"}
          </h2>
          <p className="text-xs sm:text-sm text-[#687A73] font-medium pt-0.5">
            {language === "hi"
              ? "दैनिक अनुमानित वर्षा, ऐतिहासिक औसत, वर्षा संभावना और तापमान प्रोफ़ाइल"
              : "Sub-seasonal daily meteorological parameters and rainfall probability"}
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1 p-0.5 bg-[#F4F1E8] border border-[#DED9CB] rounded-xl text-xs self-start sm:self-auto">
          {[7, 14, 30].map((h) => (
            <button
              key={h}
              type="button"
              onClick={() => setFilterHorizon(h as 7 | 14 | 30)}
              className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                filterHorizon === h
                  ? "bg-[#126B4F] text-white shadow-2xs"
                  : "text-[#687A73] hover:text-[#19362F]"
              }`}
            >
              {h} Days
            </button>
          ))}
        </div>
      </div>

      {/* Clean Table Surface */}
      <div className="overflow-x-auto rounded-3xl border border-[#DED9CB] bg-[#FFFDF8]/95 shadow-2xs">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-[#DED9CB] bg-[#F4F1E8]/70 text-[10.5px] font-black text-[#687A73] uppercase tracking-wider">
              <th className="py-3.5 px-4 sm:px-5">DATE</th>
              <th className="py-3.5 px-3">CONDITION</th>
              <th className="py-3.5 px-3">RAIN (MM)</th>
              <th className="py-3.5 px-3">NORMAL (LPA)</th>
              <th className="py-3.5 px-4">RAIN PROBABILITY</th>
              <th className="py-3.5 px-3">TEMP (MAX/MIN)</th>
              <th className="py-3.5 px-4 text-right">HUMIDITY</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#DED9CB]/60">
            {forecastData.map((row, idx) => {
              const isSelected = selectedDay?.date === row.date;
              const isHeavy = row.forecastRainfall > 20;
              const isDry = row.forecastRainfall < 3;

              return (
                <tr
                  key={idx}
                  onClick={() => onSelectDay && onSelectDay(row)}
                  className={`transition-colors cursor-pointer group ${
                    isSelected
                      ? "bg-[#E8EFE7]/80 border-l-3 border-[#126B4F] font-bold"
                      : isHeavy
                      ? "bg-[#2B7A8C]/5 hover:bg-[#2B7A8C]/10"
                      : isDry
                      ? "bg-[#D99A2B]/5 hover:bg-[#D99A2B]/10"
                      : "hover:bg-[#F4F1E8]/50"
                  }`}
                >
                  {/* Date Column */}
                  <td className="py-3.5 px-4 sm:px-5">
                    <div className="flex items-center gap-2">
                      {isSelected && (
                        <span className="w-2 h-2 rounded-full bg-[#126B4F] shrink-0" />
                      )}
                      <div>
                        <span className="font-black text-sm text-[#19362F] font-sans">
                          {row.date}
                        </span>
                        <span className="block text-[10.5px] text-[#687A73] font-normal">
                          {row.dayLabel} 2026
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Condition Column with Icon */}
                  <td className="py-3.5 px-3">
                    <div className="flex items-center gap-2">
                      {getWeatherIcon(row.condition)}
                      <span className="font-medium text-[#19362F]">{row.condition}</span>
                    </div>
                  </td>

                  {/* Forecast Rain Column (Rainfall Blue) */}
                  <td className="py-3.5 px-3">
                    <span className="font-black text-[#2B7A8C] font-sans text-sm">
                      {row.forecastRainfall} mm
                    </span>
                  </td>

                  {/* Historical LPA Average */}
                  <td className="py-3.5 px-3">
                    <span className="font-medium text-[#687A73]">
                      {row.historicalAverage} mm
                    </span>
                  </td>

                  {/* Inline Rainfall Probability Bar */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2.5 max-w-[120px]">
                      <span className="font-black text-xs text-[#19362F] w-7">
                        {row.rainfallProbability}%
                      </span>
                      <div className="w-16 h-1.5 rounded-full bg-[#F4F1E8] overflow-hidden border border-[#DED9CB]/60">
                        <div
                          className={`h-full rounded-full ${
                            row.rainfallProbability >= 75
                              ? "bg-[#126B4F]"
                              : row.rainfallProbability >= 50
                              ? "bg-[#4E8D56]"
                              : "bg-[#D99A2B]"
                          }`}
                          style={{ width: `${row.rainfallProbability}%` }}
                        />
                      </div>
                    </div>
                  </td>

                  {/* Temperature */}
                  <td className="py-3.5 px-3 font-semibold text-[#19362F]">
                    {row.temperatureMax}° / {row.temperatureMin}° C
                  </td>

                  {/* Humidity */}
                  <td className="py-3.5 px-4 text-right font-medium text-[#687A73]">
                    {row.humidity}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default DailyForecastTable;
