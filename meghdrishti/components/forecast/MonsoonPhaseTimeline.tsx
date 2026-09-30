"use client";

import React from "react";
import { ArrowRight, Clock, AlertCircle, Sparkles, Activity } from "lucide-react";
import { useApp } from "@/lib/context/AppContext";

export interface MonsoonPhaseTimelineProps {
  className?: string;
}

export function MonsoonPhaseTimeline({ className = "" }: MonsoonPhaseTimelineProps) {
  const { language } = useApp();

  const phases = [
    {
      id: "pre",
      name: language === "hi" ? "पूर्व-मानसून" : "PRE-MONSOON",
      dates: "12–15 Jun",
      status: "past",
      desc: "Localized thunderstorms",
    },
    {
      id: "onset",
      name: language === "hi" ? "मानसून आगमन" : "ONSET",
      dates: "16–18 Jun",
      status: "current",
      desc: "Arabian Sea branch surge",
    },
    {
      id: "active",
      name: language === "hi" ? "सक्रिय वर्षा दौर" : "ACTIVE SURGE",
      dates: "18–21 Jun",
      status: "active-focus",
      desc: "Widespread soaking rains",
    },
    {
      id: "break",
      name: language === "hi" ? "शुष्क विराम" : "BREAK PHASE",
      dates: "22–25 Jun",
      status: "next",
      desc: "Trough shifts northward",
    },
    {
      id: "revival",
      name: language === "hi" ? "पुनर्जीवन दौर" : "REVIVAL",
      dates: "26 Jun+",
      status: "upcoming",
      desc: "Bay depression replenishment",
    },
  ];

  return (
    <section className={`w-full space-y-4 ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-3 border-b border-[#DED9CB]/70">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-[#19362F] font-sans tracking-tight uppercase">
            {language === "hi" ? "मानसून चरण समयरेखा" : "MONSOON PHASE OUTLOOK"}
          </h2>
          <p className="text-xs sm:text-sm text-[#687A73] font-medium pt-0.5">
            {language === "hi"
              ? "सक्रिय वर्षा, शुष्क विराम और पुनर्जीवन चक्र का गतिशील प्रवाह"
              : "Synoptic monsoon progression across Indore District and Malwa Plateau"}
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-[#687A73] font-bold">Current Cycle:</span>
          <span className="font-black text-[#126B4F] bg-[#E8EFE7] px-2.5 py-0.5 rounded-md">
            Active Phase Established
          </span>
        </div>
      </div>

      {/* Main Flow Canvas with Right Callout Strip */}
      <div className="p-6 rounded-3xl bg-[#FFFDF8]/95 border border-[#DED9CB] shadow-2xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* LEFT (Col 8 / 68%): Flowing Horizontal Phase Sequence */}
          <div className="lg:col-span-8 overflow-x-auto pb-2">
            <div className="min-w-[580px] flex items-center justify-between relative py-3">
              {/* Connecting Background Line */}
              <div className="absolute top-1/2 -translate-y-1/2 left-6 right-6 h-1 bg-[#DED9CB] z-0" />

              {phases.map((p, idx) => {
                const isActive = p.status === "active-focus";
                const isCurrent = p.status === "current";
                const isNext = p.status === "next";

                return (
                  <div key={p.id} className="relative z-10 flex flex-col items-center text-center space-y-2 group">
                    {/* Node Circle */}
                    <div
                      className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-xs transition-all ${
                        isActive
                          ? "bg-[#126B4F] text-white shadow-md ring-4 ring-[#126B4F]/20 scale-110"
                          : isCurrent
                          ? "bg-[#2B7A8C] text-white shadow-2xs"
                          : isNext
                          ? "bg-[#D56F43] text-white shadow-2xs"
                          : "bg-[#FFFDF8] border-2 border-[#DED9CB] text-[#687A73]"
                      }`}
                    >
                      {isActive ? (
                        <span className="relative flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
                        </span>
                      ) : (
                        `0${idx + 1}`
                      )}
                    </div>

                    {/* Phase Info */}
                    <div className="space-y-0.5 max-w-[100px]">
                      <span
                        className={`text-[11px] font-black uppercase block tracking-tight ${
                          isActive
                            ? "text-[#126B4F]"
                            : isNext
                            ? "text-[#D56F43]"
                            : "text-[#19362F]"
                        }`}
                      >
                        {p.name}
                      </span>
                      <span className="text-[10px] font-bold text-[#687A73] block">
                        {p.dates}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT (Col 4 / 32%): Next Expected Phase Callout */}
          <div className="lg:col-span-4 p-4 rounded-2xl bg-[#D56F43]/10 border border-[#D56F43]/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase text-[#D56F43] tracking-wider">
                {language === "hi" ? "आगामी प्रत्याशित चरण" : "NEXT EXPECTED PHASE"}
              </span>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-[#D56F43] text-white">
                3–4 Days
              </span>
            </div>

            <div className="text-lg font-black text-[#19362F] font-sans">
              {language === "hi" ? "शुष्क विराम (ब्रेक फेज़)" : "TRANSIENT BREAK SPELL"}
            </div>

            <p className="text-[11.5px] text-[#687A73] leading-relaxed font-medium">
              {language === "hi"
                ? "मानसून ट्रफ के हिमालय की ओर खिसकने से 22–25 जून के मध्य वर्षा में कमी संभावित है। बीज बुवाई स्थिर बारिश के बाद ही करें।"
                : "Monsoon trough is projected to shift northward between 22–25 June. Plan farm operations and sowing accordingly."}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}

export default MonsoonPhaseTimeline;
