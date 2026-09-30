"use client";

import React, { useState } from "react";
import type { CropInfo, CropStage } from "@/types/crop";
import { useApp } from "@/lib/context/AppContext";
import {
  ChevronRight,
  Droplets,
  AlertTriangle,
  Clock,
  ShieldAlert,
  CheckCircle2,
} from "lucide-react";

export interface CropStageLifecycleProps {
  crop: CropInfo;
  farmerView?: boolean;
  className?: string;
}

export function CropStageLifecycle({
  crop,
  farmerView = false,
  className = "",
}: CropStageLifecycleProps) {
  const { language } = useApp();
  const [selectedStageId, setSelectedStageId] = useState<string>(
    crop.stages[0]?.id || "stage-sowing"
  );

  // Sync if crop changes
  React.useEffect(() => {
    if (crop.stages[0]) {
      setSelectedStageId(crop.stages[0].id);
    }
  }, [crop.id, crop.stages]);

  const activeStage: CropStage =
    crop.stages.find((s) => s.id === selectedStageId) || crop.stages[0];

  return (
    <section className={`w-full space-y-5 ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-3 border-b border-[#DED9CB]/70">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-[#19362F] font-sans tracking-tight uppercase">
            {language === "hi" ? "फसल जीवनचक्र एवं अवस्था परामर्श" : "CROP LIFECYCLE & STAGE-SPECIFIC GUIDANCE"}
          </h2>
          <p className="text-xs sm:text-sm text-[#687A73] font-medium pt-0.5">
            {language === "hi"
              ? "प्रत्येक अवस्था पर जल आवश्यकता और मौसमी जोखिम प्रबंधन निर्देश"
              : `Lifecycle stages, water stress thresholds and critical interventions for ${crop.name}`}
          </p>
        </div>

        <span className="text-xs font-bold text-[#687A73]">
          {language === "hi" ? "अवस्था चुनें विस्तार देखने के लिए" : "Click stage to inspect directives"}
        </span>
      </div>

      {/* Horizontal Lifecycle Stepper */}
      <div className="overflow-x-auto pb-2">
        <div className="min-w-[680px] grid grid-cols-4 gap-3">
          {crop.stages.map((stage, idx) => {
            const isSelected = activeStage?.id === stage.id;
            const isCritical = stage.waterRequirement === "critical";

            return (
              <button
                key={stage.id}
                type="button"
                onClick={() => setSelectedStageId(stage.id)}
                className={`p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between gap-3 ${
                  isSelected
                    ? "bg-[#126B4F] text-white border-[#126B4F] shadow-sm ring-2 ring-[#126B4F]/20"
                    : "bg-[#FFFDF8]/95 hover:bg-white text-[#19362F] border-[#DED9CB] hover:border-[#789B7C] shadow-2xs"
                }`}
              >
                {/* Top Badge: Stage # & Water Status */}
                <div className="flex items-center justify-between w-full">
                  <span
                    className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${
                      isSelected
                        ? "bg-white/20 text-white"
                        : "bg-[#F4F1E8] text-[#687A73]"
                    }`}
                  >
                    Stage {idx + 1}
                  </span>

                  <span
                    className={`text-[9.5px] font-black uppercase px-2 py-0.5 rounded-md ${
                      isSelected
                        ? "bg-white/20 text-white"
                        : isCritical
                        ? "bg-[#D56F43]/15 text-[#D56F43]"
                        : "bg-[#126B4F]/10 text-[#126B4F]"
                    }`}
                  >
                    {stage.waterRequirement} water
                  </span>
                </div>

                {/* Stage Title */}
                <div className="space-y-0.5">
                  <h3 className="font-black text-sm font-sans tracking-tight leading-snug">
                    {language === "hi" || farmerView ? stage.nameHindi || stage.name : stage.name}
                  </h3>
                  <div
                    className={`text-[11px] font-medium flex items-center gap-1 ${
                      isSelected ? "text-[#DDE7D7]" : "text-[#687A73]"
                    }`}
                  >
                    <Clock className="w-3 h-3" />
                    <span>~{stage.durationDays} Days</span>
                  </div>
                </div>

                {/* Bottom Active Indicator */}
                <div
                  className={`h-1.5 w-full rounded-full ${
                    isSelected
                      ? "bg-white"
                      : isCritical
                      ? "bg-[#D56F43]"
                      : "bg-[#126B4F]/40"
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Expanded Stage Advisory Details Panel */}
      {activeStage && (
        <div className="p-6 sm:p-7 rounded-3xl bg-[#FFFDF8]/95 border border-[#DED9CB] shadow-2xs space-y-5 transition-all">
          
          {/* Header of Active Stage */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#DED9CB]/70">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#126B4F]" />
                <span className="text-[11px] font-black uppercase text-[#126B4F] tracking-wider">
                  {language === "hi" ? "सक्रिय अवस्था विश्लेषण" : "ACTIVE STAGE INSPECTION"}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-[#19362F] font-sans">
                {language === "hi" || farmerView ? activeStage.nameHindi || activeStage.name : activeStage.name}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#687A73]">
                {language === "hi" ? "संवेदनशीलता:" : "Deficit Sensitivity:"}
              </span>
              <span
                className={`text-xs font-black uppercase px-3 py-1 rounded-xl ${
                  activeStage.sensitivityToDeficit === "critical"
                    ? "bg-[#D56F43]/15 text-[#D56F43] border border-[#D56F43]/30"
                    : activeStage.sensitivityToDeficit === "high"
                    ? "bg-[#D99A2B]/15 text-[#D99A2B] border border-[#D99A2B]/30"
                    : "bg-[#E8EFE7] text-[#126B4F] border border-[#126B4F]/30"
                }`}
              >
                {activeStage.sensitivityToDeficit}
              </span>
            </div>
          </div>

          {/* 3 Key Parameters Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* 1. Water Requirement */}
            <div className="p-4 rounded-2xl bg-[#F4F1E8]/70 border border-[#DED9CB]/70 space-y-1">
              <div className="flex items-center gap-1.5 text-[10.5px] font-black text-[#687A73] uppercase tracking-wider">
                <Droplets className="w-3.5 h-3.5 text-[#126B4F]" />
                <span>{language === "hi" ? "जल आवश्यकता" : "WATER REQUIREMENT"}</span>
              </div>
              <div className="text-lg font-black text-[#19362F] font-sans capitalize">
                {activeStage.waterRequirement} Requirement
              </div>
              <p className="text-[11px] text-[#687A73] font-medium">
                {language === "hi"
                  ? "इस अवस्था में नमी की कमी फसल उपज को सीधे प्रभावित करती है।"
                  : "Critical moisture threshold during root/vegetative development."}
              </p>
            </div>

            {/* 2. Key Agro-Meteorological Concern */}
            <div className="p-4 rounded-2xl bg-[#F4F1E8]/70 border border-[#DED9CB]/70 space-y-1">
              <div className="flex items-center gap-1.5 text-[10.5px] font-black text-[#D99A2B] uppercase tracking-wider">
                <AlertTriangle className="w-3.5 h-3.5 text-[#D99A2B]" />
                <span>{language === "hi" ? "मुख्य मौसमी जोखिम" : "KEY CONCERN"}</span>
              </div>
              <div className="text-sm font-black text-[#19362F] font-sans">
                {language === "hi" || farmerView
                  ? activeStage.keyConcernHindi || "सूखे का प्रकोप"
                  : activeStage.keyConcern || "Moisture deficit or standing water"}
              </div>
              <p className="text-[11px] text-[#687A73] font-medium">
                {language === "hi"
                  ? "निगरानी रखें और जल निकासी नालियां खुली रखें।"
                  : "Monitor soil drainage and vector pest incidence."}
              </p>
            </div>

            {/* 3. Recommended Agronomic Action */}
            <div className="p-4 rounded-2xl bg-[#E8EFE7]/80 border border-[#126B4F]/30 space-y-1">
              <div className="flex items-center gap-1.5 text-[10.5px] font-black text-[#126B4F] uppercase tracking-wider">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#126B4F]" />
                <span>{language === "hi" ? "अनुशंसित कार्रवाई" : "RECOMMENDED ACTION"}</span>
              </div>
              <p className="text-xs font-bold text-[#19362F] leading-snug">
                {language === "hi" || farmerView
                  ? activeStage.actionGuidanceHindi || activeStage.advisoryNoteHindi || activeStage.advisoryNote
                  : activeStage.actionGuidance || activeStage.advisoryNote}
              </p>
            </div>

          </div>

        </div>
      )}
    </section>
  );
}

export default CropStageLifecycle;
