"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, SunMedium, Clock } from "lucide-react";

export function MonsoonTimeline() {
  const phases = [
    {
      name: "PRE-MONSOON",
      dates: "May 20 – Jun 10",
      desc: "Convective pre-monsoon activity",
      status: "completed",
      dotColor: "bg-[#7A9B7A]",
    },
    {
      name: "ONSET",
      dates: "Jun 11 – 20",
      desc: "Initial monsoon surge arrival",
      status: "completed",
      dotColor: "bg-[#176B4D]",
    },
    {
      name: "ACTIVE",
      dates: "Jun 21 – Jul 10",
      desc: "Widespread precipitation surge",
      status: "current",
      isCurrent: true,
      dotColor: "bg-[#176B4D]",
    },
    {
      name: "BREAK",
      dates: "Jul 11 – 15",
      desc: "Trough shift & temporary rain lull",
      status: "upcoming",
      dotColor: "bg-[#D99A32]",
    },
    {
      name: "REVIVAL",
      dates: "Jul 16+",
      desc: "Renewed monsoon low pressure",
      status: "upcoming",
      dotColor: "bg-[#A0ABA6]",
    },
  ];

  return (
    <section className="w-full space-y-8">
      {/* SECTION HEADING */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-3 border-b border-[#DED9CB]/70">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#18342C] font-sans tracking-tight">
            Monsoon Evolution
          </h2>
          <p className="text-xs sm:text-sm text-[#63736D] font-medium pt-0.5">
            Monsoon progression & expected synoptic cycle transitions
          </p>
        </div>

        <Link
          href="/forecast"
          className="text-xs sm:text-sm font-bold text-[#176B4D] hover:text-[#173B2E] inline-flex items-center gap-1.5 self-start sm:self-auto hover:underline"
        >
          <span>Detailed Timeline Report</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* FULL-WIDTH OPEN TIMELINE ON THE CANVAS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-2">
        
        {/* Horizontal Timeline (Spanning 9 Columns) */}
        <div className="lg:col-span-9 px-2 py-4">
          <div className="relative flex items-center justify-between">
            {/* Horizontal Axis Line */}
            <div className="absolute top-4 left-6 right-6 h-0.5 bg-[#DED9CB]" />
            
            {phases.map((phase, idx) => {
              const isCurrent = phase.isCurrent;

              return (
                <div key={idx} className="relative z-10 flex flex-col items-center text-center space-y-3 flex-1">
                  
                  {/* Current Phase Floating Badge */}
                  {isCurrent && (
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#176B4D] text-white text-[10px] font-black tracking-wider whitespace-nowrap shadow-xs">
                      CURRENT PHASE
                    </div>
                  )}

                  {/* Large Elegant Node Marker */}
                  <div
                    className={`rounded-full flex items-center justify-center transition-all ${
                      isCurrent
                        ? "w-8 h-8 bg-[#F5F1E7] border-4 border-[#176B4D] ring-4 ring-[#176B4D]/20 shadow-sm"
                        : `${phase.dotColor} w-6 h-6 border-2 border-white shadow-2xs`
                    }`}
                  >
                    {isCurrent && (
                      <div className="w-3 h-3 rounded-full bg-[#176B4D]" />
                    )}
                  </div>

                  {/* Phase Label, Dates, & Description */}
                  <div className="space-y-1 max-w-[130px]">
                    <span
                      className={`block text-xs sm:text-sm font-black font-sans tracking-wide ${
                        isCurrent ? "text-[#176B4D]" : "text-[#18342C]"
                      }`}
                    >
                      {phase.name}
                    </span>
                    <span className="block text-[11px] font-bold text-[#176B4D]">
                      {phase.dates}
                    </span>
                    <p className="text-[10.5px] text-[#63736D] leading-tight hidden md:block pt-0.5">
                      {phase.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Small Understated Expected Next Phase Annotation (3 Columns) */}
        <div className="lg:col-span-3 p-4 rounded-xl bg-[#FFFDF8]/85 border border-[#DED9CB] shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black text-[#63736D] uppercase tracking-wider">
              Expected Next Phase
            </span>
            <span className="flex items-center gap-1 text-[11px] font-bold text-[#D99A32]">
              <Clock className="w-3 h-3 text-[#D99A32]" />
              In 4–7 days
            </span>
          </div>

          <div className="flex items-center gap-2 text-base font-black text-[#D99A32] uppercase">
            <SunMedium className="w-4 h-4 text-[#D99A32]" />
            <span>BREAK PHASE</span>
          </div>

          <p className="text-xs text-[#63736D] leading-snug pt-1 border-t border-[#DED9CB]/60">
            A short 4–7 day precipitation lull is anticipated following the current active pulse.
          </p>
        </div>

      </div>
    </section>
  );
}

export default MonsoonTimeline;
