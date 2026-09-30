"use client";

import React, { useState } from "react";
import Link from "next/link";
import { indoreBlocksData, type IndoreBlockRisk } from "@/data/map-risk";
import { ArrowRight, BarChart3 } from "lucide-react";

export interface BlockComparisonProps {
  selectedBlockId: string;
  onSelectBlock: (block: IndoreBlockRisk) => void;
}

export function BlockComparison({
  selectedBlockId,
  onSelectBlock,
}: BlockComparisonProps) {
  const [filter, setFilter] = useState<string>("all");

  const filteredBlocks = indoreBlocksData.filter(
    (b) => filter === "all" || b.riskLevel === filter
  );

  // Dynamic distribution calculation
  const lowCount = indoreBlocksData.filter((b) => b.riskLevel === "low").length;
  const modCount = indoreBlocksData.filter((b) => b.riskLevel === "moderate").length;
  const highCount = indoreBlocksData.filter((b) => b.riskLevel === "high").length;
  const vHighCount = indoreBlocksData.filter((b) => b.riskLevel === "very-high").length;
  const total = indoreBlocksData.length;

  const riskDistribution = [
    { id: "low", level: "LOW", count: lowCount, percentage: Math.round((lowCount / total) * 100), color: "bg-[#4ADE80]" },
    { id: "moderate", level: "MODERATE", count: modCount, percentage: Math.round((modCount / total) * 100), color: "bg-[#FACC15]" },
    { id: "high", level: "HIGH", count: highCount, percentage: Math.round((highCount / total) * 100), color: "bg-[#FB923C]" },
    { id: "very-high", level: "VERY HIGH", count: vHighCount, percentage: Math.round((vHighCount / total) * 100), color: "bg-[#F87171]" },
  ];

  return (
    <section className="w-full space-y-6">
      {/* Section Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 pb-3 border-b border-white/10">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white font-sans tracking-tight uppercase">
            BLOCK-WISE RISK
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 font-medium pt-0.5">
            Comparative agro-meteorological vulnerability index &amp; planting schedule
          </p>
        </div>

        {/* Filter Pill Buttons */}
        <div className="flex flex-wrap items-center gap-1 p-1 bg-[#0C201A]/85 border border-[#34D399]/30 rounded-xl text-xs self-start sm:self-auto backdrop-blur-md">
          {(["all", "low", "moderate", "high", "very-high"] as const).map((lvl) => {
            const isActive = filter === lvl;
            const labels: Record<string, string> = {
              all: "All Blocks",
              low: "Low",
              moderate: "Moderate",
              high: "High",
              "very-high": "Very High",
            };
            return (
              <button
                key={lvl}
                type="button"
                onClick={() => setFilter(lvl)}
                className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#176B4D] text-white shadow-xs border border-[#34D399]/40"
                    : "text-gray-300 hover:text-white hover:bg-white/10"
                }`}
              >
                {labels[lvl]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid: 68% Sophisticated Data Table / 32% Interactive Risk Distribution Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT (Col 8 / 68%): Sophisticated Data Table with ONSET column */}
        <div className="lg:col-span-8 overflow-x-auto rounded-3xl border border-[#34D399]/30 bg-[#0C201A]/85 shadow-2xl backdrop-blur-xl text-white">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/5 text-[10.5px] font-black text-gray-300 uppercase tracking-wider">
                <th className="py-3.5 px-4 sm:px-5">BLOCK</th>
                <th className="py-3.5 px-3">RISK</th>
                <th className="py-3.5 px-3">RAINFALL</th>
                <th className="py-3.5 px-3">ONSET</th>
                <th className="py-3.5 px-3">SOIL MOISTURE</th>
                <th className="py-3.5 px-3">SOWING WINDOW</th>
                <th className="py-3.5 px-4 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {filteredBlocks.map((block) => {
                const isSelected = selectedBlockId === block.id;

                return (
                  <tr
                    key={block.id}
                    onClick={() => onSelectBlock(block)}
                    className={`transition-colors cursor-pointer group ${
                      isSelected
                        ? "bg-[#176B4D]/35 border-l-4 border-[#34D399] font-bold"
                        : "hover:bg-white/5"
                    }`}
                  >
                    {/* Block Name */}
                    <td className="py-3.5 px-4 sm:px-5">
                      <div className="flex items-center gap-2">
                        {isSelected && (
                          <span className="w-2 h-2 rounded-full bg-[#34D399] shrink-0" />
                        )}
                        <div>
                          <span className="font-black text-sm text-white font-sans">
                            {block.name}
                          </span>
                          <span className="block text-[10.5px] text-gray-400 font-normal">
                            {block.panchayatsCount} Panchayats
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Risk Level Badge */}
                    <td className="py-3.5 px-3">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase ${
                          block.riskLevel === "low"
                            ? "bg-[#34D399]/20 text-[#34D399] border border-[#34D399]/30"
                            : block.riskLevel === "very-high"
                            ? "bg-[#F87171]/20 text-[#F87171] border border-[#F87171]/30"
                            : block.riskLevel === "high"
                            ? "bg-[#FB923C]/20 text-[#FB923C] border border-[#FB923C]/30"
                            : "bg-[#FBBF24]/20 text-[#FBBF24] border border-[#FBBF24]/30"
                        }`}
                      >
                        {block.riskLevel}
                      </span>
                    </td>

                    {/* Rainfall Probability */}
                    <td className="py-3.5 px-3">
                      <span className="font-black text-[#38BDF8] font-sans text-sm">
                        {block.rainfallProbability}%
                      </span>
                    </td>

                    {/* ONSET Probability Column */}
                    <td className="py-3.5 px-3">
                      <span className="font-black text-[#34D399] font-sans text-sm">
                        {block.onsetProbability}%
                      </span>
                    </td>

                    {/* Soil Moisture */}
                    <td className="py-3.5 px-3">
                      <span className="font-black text-white font-sans text-sm">
                        {block.soilMoisture}%
                      </span>
                    </td>

                    {/* Sowing Window */}
                    <td className="py-3.5 px-3">
                      <span className="font-bold text-[#FB923C] font-sans">
                        {block.sowingWindow}
                      </span>
                    </td>

                    {/* Action Link */}
                    <td className="py-3.5 px-4 text-right">
                      <Link
                        href="/advisory"
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#34D399] hover:text-white group-hover:translate-x-0.5 transition-all"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span>Inspect</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* RIGHT (Col 4 / 32%): INTERACTIVE RISK DISTRIBUTION PANEL */}
        <div className="lg:col-span-4 rounded-3xl border border-[#34D399]/30 bg-[#0C201A]/85 p-5 sm:p-6 shadow-2xl backdrop-blur-xl text-white space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#176B4D] flex items-center justify-center text-[#34D399] shadow-xs">
                <BarChart3 className="w-4 h-4" />
              </div>
              <h3 className="font-black text-sm text-white font-sans uppercase tracking-tight">
                RISK DISTRIBUTION
              </h3>
            </div>
            <span className="text-[10.5px] font-bold text-gray-400">
              {total} Blocks
            </span>
          </div>

          {/* Horizontal Distribution Bars with Interactive Table Filter Trigger */}
          <div className="space-y-3.5">
            {riskDistribution.map((item) => {
              const isActiveFilter = filter === item.id;

              return (
                <div
                  key={item.id}
                  onClick={() => setFilter(filter === item.id ? "all" : item.id)}
                  className={`p-2.5 rounded-xl transition-all cursor-pointer border ${
                    isActiveFilter
                      ? "bg-[#176B4D]/40 border-[#34D399] shadow-md"
                      : "hover:bg-white/5 border-transparent"
                  }`}
                  title={`Click to filter table by ${item.level}`}
                >
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-black text-white text-[11px] tracking-wide">
                      {item.level}
                    </span>
                    <div className="flex items-center gap-2 text-gray-400">
                      <span className="font-black text-white text-xs">
                        {item.count} {item.count === 1 ? "block" : "blocks"}
                      </span>
                    </div>
                  </div>

                  {/* Distribution Bar */}
                  <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden border border-white/10">
                    <div
                      className={`h-full rounded-full ${item.color} transition-all duration-300`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {filter !== "all" && (
            <button
              type="button"
              onClick={() => setFilter("all")}
              className="w-full py-1.5 text-xs font-bold text-[#34D399] hover:underline text-center cursor-pointer"
            >
              Reset to All Blocks
            </button>
          )}

          <div className="pt-2 border-t border-white/10 text-[11px] text-gray-300 leading-relaxed">
            75% of Indore district acreage currently in favorable (Low / Moderate) planting risk window.
          </div>
        </div>

      </div>
    </section>
  );
}

export default BlockComparison;
