"use client";

import React from "react";
import { Calendar, ShieldCheck, AlertTriangle, Zap, CheckCircle2 } from "lucide-react";
import { useApp } from "@/lib/context/AppContext";

export interface KeyForecastSignalsProps {
  className?: string;
}

export function KeyForecastSignals({ className = "" }: KeyForecastSignalsProps) {
  const { language } = useApp();

  return (
    <section className={`w-full space-y-4 ${className}`}>
      {/* Header */}
      <div className="pb-3 border-b border-[#DED9CB]/70">
        <h2 className="text-xl sm:text-2xl font-black text-[#19362F] font-sans tracking-tight uppercase">
          {language === "hi" ? "प्रमुख पूर्वानुमान संकेत" : "KEY FORECAST SIGNALS"}
        </h2>
        <p className="text-xs sm:text-sm text-[#687A73] font-medium pt-0.5">
          {language === "hi"
            ? "आगमन विश्वसनीयता, असत्य आगमन खतरा एवं ब्रेक विश्लेषण"
            : "Synoptic validation of onset confirmation and dry spell hazard indices"}
        </p>
      </div>

      {/* 3 Distinct Editorial Signal Sections in One Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Signal 1: ONSET SIGNAL */}
        <div className="p-6 rounded-3xl bg-[#FFFDF8]/95 border border-[#DED9CB] shadow-2xs space-y-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-black uppercase tracking-wider text-[#126B4F]">
              {language === "hi" ? "मानसून आगमन संकेत" : "ONSET SIGNAL"}
            </span>
            <div className="w-7 h-7 rounded-lg bg-[#E8EFE7] flex items-center justify-center text-[#126B4F]">
              <Calendar className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-black text-[#19362F] font-sans tracking-tight">
              18 JUN 2026
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-black text-[#126B4F] font-sans">84%</span>
              <span className="text-xs text-[#687A73] font-medium">Onset Probability</span>
            </div>
          </div>

          <p className="text-xs text-[#687A73] leading-relaxed pt-2 border-t border-[#DED9CB]/60">
            {language === "hi"
              ? "वर्षा सीमा इस खिड़की में स्थिर होने की पूर्ण संभावना है।"
              : "Rainfall threshold is projected to stabilize consistently around the current window."}
          </p>
        </div>

        {/* Signal 2: FALSE ONSET RISK */}
        <div className="p-6 rounded-3xl bg-[#FFFDF8]/95 border border-[#DED9CB] shadow-2xs space-y-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-black uppercase tracking-wider text-[#126B4F]">
              {language === "hi" ? "असत्य आगमन जोखिम" : "FALSE ONSET RISK"}
            </span>
            <div className="w-7 h-7 rounded-lg bg-[#E8EFE7] flex items-center justify-center text-[#126B4F]">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-black text-[#126B4F] font-sans tracking-tight">
              14% <span className="text-sm font-bold uppercase text-[#126B4F]">(LOW)</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#687A73]">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#126B4F]" />
              <span className="font-semibold text-[#19362F]">Arabian Sea Surge Confirmed</span>
            </div>
          </div>

          <p className="text-xs text-[#687A73] leading-relaxed pt-2 border-t border-[#DED9CB]/60">
            {language === "hi"
              ? "प्रारंभिक वर्षा के बाद लंबा सूखा पड़ने की संभावना अत्यंत कम है।"
              : "Early rainfall is less likely to be followed by a severe or prolonged drought spell."}
          </p>
        </div>

        {/* Signal 3: BREAK HAZARD */}
        <div className="p-6 rounded-3xl bg-[#FFFDF8]/95 border border-[#DED9CB] shadow-2xs space-y-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-black uppercase tracking-wider text-[#D56F43]">
              {language === "hi" ? "शुष्क विराम खतरा" : "BREAK HAZARD"}
            </span>
            <div className="w-7 h-7 rounded-lg bg-[#D56F43]/15 flex items-center justify-center text-[#D56F43]">
              <AlertTriangle className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-black text-[#D56F43] font-sans tracking-tight">
              18% <span className="text-sm font-bold uppercase text-[#D56F43]">(MODERATE)</span>
            </div>
            <div className="text-xs font-bold text-[#19362F]">
              {language === "hi" ? "अनुमानित अवधि: 22–25 जून" : "Expected Window: 22–25 JUN"}
            </div>
          </div>

          <p className="text-xs text-[#687A73] leading-relaxed pt-2 border-t border-[#DED9CB]/60">
            {language === "hi"
              ? "बंगाल की खाड़ी में नए तंत्र के उभरने से पहले 3-4 दिन का अल्प शुष्क दौर।"
              : "3–4 day precipitation hiatus anticipated before Bay of Bengal depression revival."}
          </p>
        </div>

      </div>
    </section>
  );
}

export default KeyForecastSignals;
