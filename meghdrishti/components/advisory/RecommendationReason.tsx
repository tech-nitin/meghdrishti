"use client";

import React from "react";
import { ArrowRight, CloudRain, Droplets, Sprout, Activity } from "lucide-react";
import { useApp } from "@/lib/context/AppContext";

export interface RecommendationReasonProps {
  cropName?: string;
  className?: string;
}

export function RecommendationReason({
  cropName = "Soybean",
  className = "",
}: RecommendationReasonProps) {
  const { language } = useApp();

  const workflowSteps = [
    {
      step: "01",
      title: language === "hi" ? "मानसून संकेत" : "MONSOON SIGNAL",
      desc: language === "hi" ? "सक्रिय पूर्व-मानसून प्रवाह" : "Active pre-monsoon surge",
      icon: Activity,
    },
    {
      step: "02",
      title: language === "hi" ? "वर्षा दृष्टिकोण" : "RAINFALL OUTLOOK",
      desc: language === "hi" ? "78% वर्षा + अल्प विराम" : "78% rain + 22-25 Jun break",
      icon: CloudRain,
    },
    {
      step: "03",
      title: language === "hi" ? "मृदा नमी प्रोफ़ाइल" : "SOIL MOISTURE",
      desc: language === "hi" ? "69% संचित शीर्ष नमी" : "69% profile stabilization",
      icon: Droplets,
    },
    {
      step: "04",
      title: language === "hi" ? "फसल निर्णय" : "CROP DECISION",
      desc: language === "hi" ? "18–22 जून सुरक्षित बुवाई" : "18–22 Jun sowing window",
      icon: Sprout,
    },
  ];

  return (
    <section className={`w-full py-2 ${className}`}>
      <div className="relative pl-6 sm:pl-8 border-l-3 border-[#126B4F] space-y-5 py-1">
        
        {/* Title and Badge */}
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="text-xs font-black uppercase tracking-wider text-[#126B4F]">
            {language === "hi" ? "यह सलाह क्यों?" : "WHY THIS RECOMMENDATION"}
          </span>
          <span className="text-[#687A73]">•</span>
          <span className="text-[10.5px] font-black uppercase text-[#687A73] bg-[#F4F1E8] border border-[#DED9CB] px-2.5 py-0.5 rounded-full shadow-2xs">
            {language === "hi" ? "जलवायु तर्क" : "CLIMATIC BASIS"}
          </span>
        </div>

        {/* Editorial Text */}
        <p className="text-base sm:text-lg text-[#19362F] font-sans font-medium leading-relaxed max-w-4xl">
          {language === "hi"
            ? `वर्तमान वर्षा स्थितियां 16-18 जून के दौरान सक्रिय वर्षा और उसके बाद 22-25 जून के बीच अल्प शुष्क विराम का संकेत देती हैं। इसलिए ${cropName} की बुवाई पहली छिटपुट बारिश के बजाय वर्षा के स्थिर होने (65-75 मिमी संचयी बारिश) के साथ संरेखित की गई है।`
            : `Current rainfall conditions indicate a probable active phase (16–18 June) followed by a short dry spell break (22–25 June). The recommended sowing window for ${cropName} is therefore aligned with cumulative rainfall stabilization (65–75 mm) rather than the initial scattered rainfall event, preventing seed mortality and false onset losses.`}
        </p>

        {/* Visual Intelligence Flow */}
        <div className="pt-2">
          <div className="text-[10px] font-black uppercase tracking-wider text-[#687A73] mb-3">
            {language === "hi" ? "मेघदृष्टि निर्णय प्रवाह:" : "MEGHDRISHTI DECISION FLOW:"}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {workflowSteps.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-[#FFFDF8]/90 border border-[#DED9CB] shadow-2xs space-y-2 relative"
                >
                  <div className="flex items-center justify-between text-[#126B4F]">
                    <div className="w-7 h-7 rounded-lg bg-[#E8EFE7] flex items-center justify-center">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[10px] font-black text-[#687A73]">
                      {item.step}
                    </span>
                  </div>

                  <div className="space-y-0.5">
                    <div className="text-[11px] font-black uppercase tracking-wider text-[#19362F]">
                      {item.title}
                    </div>
                    <div className="text-[11px] text-[#687A73] font-medium leading-tight">
                      {item.desc}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}

export default RecommendationReason;
