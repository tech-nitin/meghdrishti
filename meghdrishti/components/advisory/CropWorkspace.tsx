"use client";

import React from "react";
import { mockCrops } from "@/data/crops";
import type { CropInfo } from "@/types/crop";
import { Sprout, CheckCircle2, Sparkles } from "lucide-react";
import { useApp } from "@/lib/context/AppContext";

export interface CropWorkspaceProps {
  selectedCropId: string;
  onSelectCrop: (crop: CropInfo) => void;
  className?: string;
}

export function CropWorkspace({
  selectedCropId,
  onSelectCrop,
  className = "",
}: CropWorkspaceProps) {
  const { language } = useApp();

  return (
    <section className={`w-full space-y-3.5 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-black uppercase text-[#126B4F] tracking-wider">
            {language === "hi" ? "फसल चुनें" : "SELECT CROP"}
          </span>
          <span className="text-[#687A73]">•</span>
          <span className="text-xs font-bold text-[#687A73]">
            {language === "hi" ? "खरीफ 2026 सीजन" : "Kharif 2026 Season"}
          </span>
        </div>
        <span className="text-[11px] text-[#687A73] font-medium hidden sm:inline">
          {language === "hi" ? "फसल के अनुसार परामर्श बदलता है" : "Select to switch agronomic model"}
        </span>
      </div>

      {/* Horizontal Crop Grid / Mobile Scroll */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 overflow-x-auto pb-1">
        {mockCrops.map((crop) => {
          const isSelected = selectedCropId === crop.id;

          return (
            <button
              key={crop.id}
              type="button"
              onClick={() => onSelectCrop(crop)}
              className={`p-4 rounded-2xl text-left border transition-all duration-200 cursor-pointer flex flex-col justify-between gap-3 ${
                isSelected
                  ? "bg-[#126B4F] text-white border-[#126B4F] shadow-sm ring-2 ring-[#126B4F]/20"
                  : "bg-[#FFFDF8]/95 hover:bg-white text-[#19362F] border-[#DED9CB] hover:border-[#789B7C] shadow-2xs"
              }`}
            >
              {/* Top Row: Icon & Status Tag */}
              <div className="flex items-center justify-between w-full">
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                    isSelected
                      ? "bg-white/15 text-white"
                      : "bg-[#E8EFE7] text-[#126B4F]"
                  }`}
                >
                  <Sprout className="w-4 h-4" />
                </div>
                {isSelected ? (
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/20 text-white">
                    ACTIVE
                  </span>
                ) : (
                  <span className="text-[10.5px] font-bold text-[#687A73]">
                    {crop.optimalSowingWindow.formatted}
                  </span>
                )}
              </div>

              {/* Crop Name & Hindi Name */}
              <div className="space-y-0.5">
                <h3 className="text-base sm:text-lg font-black font-sans tracking-tight">
                  {crop.name}
                </h3>
                <p
                  className={`text-xs font-semibold ${
                    isSelected ? "text-[#DDE7D7]" : "text-[#687A73]"
                  }`}
                >
                  {crop.hindiName} • {crop.season || "Kharif"}
                </p>
              </div>

              {/* Sowing Window Footnote */}
              <div
                className={`pt-2 border-t text-[11px] flex items-center justify-between ${
                  isSelected
                    ? "border-white/20 text-[#DDE7D7]"
                    : "border-[#DED9CB]/60 text-[#687A73]"
                }`}
              >
                <span className="font-medium">
                  {language === "hi" ? "बुवाई अवधि:" : "Sowing Window:"}
                </span>
                <span className={`font-black ${isSelected ? "text-white" : "text-[#D56F43]"}`}>
                  {crop.optimalSowingWindow.formatted}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default CropWorkspace;
