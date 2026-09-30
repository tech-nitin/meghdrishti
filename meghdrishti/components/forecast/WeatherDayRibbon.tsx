"use client";

import React from "react";
import { CloudRain, Sun, Cloud, CloudSun, CloudDrizzle, Droplets } from "lucide-react";
import { mock30DayForecastMetrics } from "@/data/forecasts";
import type { ForecastMetric } from "@/types/forecast";
import { useApp } from "@/lib/context/AppContext";

export interface WeatherDayRibbonProps {
  selectedDay?: ForecastMetric | null;
  onSelectDay?: (day: ForecastMetric) => void;
  className?: string;
}

export function WeatherDayRibbon({
  selectedDay,
  onSelectDay,
  className = "",
}: WeatherDayRibbonProps) {
  const { language } = useApp();
  const ribbonDays = mock30DayForecastMetrics.slice(0, 14);

  const getWeatherIcon = (condition: string) => {
    const c = condition.toLowerCase();
    if (c.includes("heavy") || c.includes("downpour")) return CloudRain;
    if (c.includes("showers") || c.includes("rain")) return CloudDrizzle;
    if (c.includes("cloudy") || c.includes("spell")) return Cloud;
    return CloudSun;
  };

  return (
    <section className={`w-full space-y-3 ${className}`}>
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-black uppercase text-[#126B4F] tracking-wider">
          {language === "hi" ? "दैनिक मौसम रिबन" : "DAILY WEATHER RIBBON (14-DAY OUTLOOK)"}
        </span>
        <span className="text-[11px] text-[#687A73] font-medium hidden sm:inline">
          {language === "hi" ? "विस्तृत विवरण के लिए दिन चुनें" : "Click any day to inspect details"}
        </span>
      </div>

      {/* Horizontal Scroll Ribbon */}
      <div className="overflow-x-auto pb-2">
        <div className="flex items-center gap-2.5 min-w-max">
          {ribbonDays.map((d, idx) => {
            const Icon = getWeatherIcon(d.condition);
            const isSelected = selectedDay?.date === d.date;

            return (
              <button
                key={idx}
                type="button"
                onClick={() => onSelectDay && onSelectDay(d)}
                className={`p-3 rounded-2xl border text-center transition-all duration-200 cursor-pointer flex flex-col justify-between items-center w-28 shrink-0 space-y-2 ${
                  isSelected
                    ? "bg-[#126B4F] text-white border-[#126B4F] shadow-sm ring-2 ring-[#126B4F]/20"
                    : "bg-[#FFFDF8]/95 hover:bg-white text-[#19362F] border-[#DED9CB] hover:border-[#789B7C] shadow-2xs"
                }`}
              >
                {/* Date */}
                <div className="space-y-0.5">
                  <span className="text-xs font-black font-sans uppercase block">
                    {d.date}
                  </span>
                  <span
                    className={`text-[9.5px] font-bold block ${
                      isSelected ? "text-[#DDE7D7]" : "text-[#687A73]"
                    }`}
                  >
                    {d.dayLabel}
                  </span>
                </div>

                {/* Weather Icon */}
                <div
                  className={`w-7 h-7 rounded-xl flex items-center justify-center ${
                    isSelected ? "bg-white/20 text-white" : "bg-[#E8EFE7] text-[#126B4F]"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </div>

                {/* Rain mm */}
                <div className="space-y-0.5 w-full pt-1 border-t border-current/15">
                  <div
                    className={`text-xs font-black font-sans ${
                      isSelected ? "text-white" : "text-[#2B7A8C]"
                    }`}
                  >
                    {d.forecastRainfall} mm
                  </div>
                  <div
                    className={`text-[9.5px] font-bold ${
                      isSelected ? "text-[#DDE7D7]" : "text-[#687A73]"
                    }`}
                  >
                    {d.rainfallProbability}% Prob
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default WeatherDayRibbon;
