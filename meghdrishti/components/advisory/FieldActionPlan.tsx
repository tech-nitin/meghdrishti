"use client";

import React from "react";
import type { CropInfo } from "@/types/crop";
import { useApp } from "@/lib/context/AppContext";
import {
  Sprout,
  CloudRain,
  ShieldCheck,
  Calendar,
  CheckCircle2,
  Droplets,
  ArrowRight,
} from "lucide-react";

export interface FieldActionPlanProps {
  crop: CropInfo;
  farmerView?: boolean;
  className?: string;
}

export function FieldActionPlan({
  crop,
  farmerView = false,
  className = "",
}: FieldActionPlanProps) {
  const { language } = useApp();

  // Get icon component based on iconName
  const getActionIcon = (iconName?: string) => {
    switch (iconName) {
      case "cloud-rain":
        return CloudRain;
      case "shield-check":
        return ShieldCheck;
      case "calendar":
        return Calendar;
      case "droplets":
        return Droplets;
      case "check-circle":
        return CheckCircle2;
      case "seedling":
      default:
        return Sprout;
    }
  };

  const defaultActions = [
    {
      id: "act-1",
      stepNumber: "01",
      title: "Prepare seedbed",
      titleHindi: "खेत और बीज की तैयारी",
      description: "Ensure seedbed is well-pulverized and leveled; avoid dry clods in black vertisol soil.",
      descriptionHindi: "काली मिट्टी में ढेलों को बारीक कर समतल करें ताकि बीज का अच्छा संपर्क हो सके।",
      iconName: "seedling" as const,
    },
    {
      id: "act-2",
      stepNumber: "02",
      title: "Monitor rainfall stabilization",
      titleHindi: "स्थिर बारिश का अवलोकन",
      description: "Confirm at least 65-75 mm cumulative rainfall before dropping seed to prevent false onset loss.",
      descriptionHindi: "कम से कम 65-75 मिमी संचयी वर्षा होने की पुष्टि करें ताकि झूठे मानसून में बीज नष्ट न हो।",
      iconName: "cloud-rain" as const,
    },
    {
      id: "act-3",
      stepNumber: "03",
      title: "Verify soil moisture & seed treatment",
      titleHindi: "बीजोपचार एवं नमी सत्यापन",
      description: "Verify 3-4 inch wet profile; treat seed with Carboxin + Thiram (2g/kg) and bio-fungicide Trichoderma.",
      descriptionHindi: "3-4 इंच तक नमी जांचें; बीज को कार्बाक्सिन + थीरम (2g/kg) और ट्राइकोडर्मा से उपचारित करें।",
      iconName: "shield-check" as const,
    },
    {
      id: "act-4",
      stepNumber: "04",
      title: "Sow during recommended window",
      titleHindi: "अनुशंसित अवधि में बुवाई",
      description: "Adopt Broad Bed Furrow (BBF) or Ridge-and-Furrow method (18–22 June) for optimal drainage.",
      descriptionHindi: "जल निकासी के लिए चौड़ी क्यारी नाली (BBF) पद्धति से 18-22 जून के मध्य बुवाई करें।",
      iconName: "calendar" as const,
    },
  ];

  const actions = crop.fieldActions || defaultActions;

  return (
    <section className={`w-full space-y-4 ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-3 border-b border-[#DED9CB]/70">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-[#19362F] font-sans tracking-tight uppercase">
            {language === "hi" ? "खेत कार्ययोजना" : "FIELD ACTION PLAN"}
          </h2>
          <p className="text-xs sm:text-sm text-[#687A73] font-medium pt-0.5">
            {language === "hi"
              ? "क्रमबद्ध कृषि निर्देश एवं सुरक्षात्मक उपाय"
              : `Step-by-step agronomic directives for ${crop.name} sowing and stand establishment`}
          </p>
        </div>

        <span className="text-xs font-bold text-[#126B4F] bg-[#E8EFE7] px-3 py-1 rounded-full self-start sm:self-auto">
          {actions.length} {language === "hi" ? "महत्वपूर्ण चरण" : "Sequential Directives"}
        </span>
      </div>

      {/* Numbered Vertical Timeline / Checklist */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {actions.map((act, idx) => {
          const Icon = getActionIcon(act.iconName);

          return (
            <div
              key={act.id || idx}
              className="p-5 rounded-2xl bg-[#FFFDF8]/95 border border-[#DED9CB] shadow-2xs hover:border-[#126B4F]/50 transition-all group flex items-start gap-4"
            >
              {/* Step Number Circle */}
              <div className="w-10 h-10 rounded-xl bg-[#E8EFE7] text-[#126B4F] group-hover:bg-[#126B4F] group-hover:text-white transition-colors flex items-center justify-center shrink-0 font-sans font-black text-sm shadow-2xs">
                {act.stepNumber}
              </div>

              {/* Action Content */}
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Icon className="w-3.5 h-3.5 text-[#126B4F]" />
                  <h3 className="font-black text-base text-[#19362F] font-sans">
                    {language === "hi" || farmerView ? act.titleHindi : act.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-[13px] text-[#687A73] leading-relaxed font-medium">
                  {language === "hi" || farmerView ? act.descriptionHindi : act.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default FieldActionPlan;
