"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import {
  MapPin,
  ChevronRight,
  CloudRain,
  Sprout,
  SunMedium,
  Activity,
  ShieldCheck,
} from "lucide-react";
import { useApp } from "@/lib/context/AppContext";

export function DashboardHero() {
  const { currentLocation, language, setLocationModalOpen } = useApp();
  const shouldReduceMotion = useReducedMotion();

  // Multi-layered mouse parallax offset
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  // Scroll parallax transforms
  const { scrollY } = useScroll();
  const landscapeScroll = useTransform(scrollY, [0, 600], [0, 45]);
  const mistScroll = useTransform(scrollY, [0, 600], [0, 20]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    const x = ((clientX - left) / width - 0.5) * 16; // -8px to +8px
    const y = ((clientY - top) / height - 0.5) * 16; // -8px to +8px
    setMouseOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-[490px] lg:min-h-[540px] overflow-hidden rounded-3xl border border-[#DED9CB]/70 flex items-center"
    >
      {/* LAYER 1: Far Agricultural Landscape with Parallax */}
      <motion.div
        style={{
          y: shouldReduceMotion ? 0 : landscapeScroll,
          x: shouldReduceMotion ? 0 : mouseOffset.x * 0.7,
        }}
        className="absolute inset-0 z-0 w-full h-[120%] -top-[10%]"
      >
        <Image
          src="/images/hero-farmland.jpg"
          alt="Lush green Indian agricultural fields with monsoon clouds and natural sunlight"
          fill
          sizes="100vw"
          priority
          className="object-cover object-center scale-105"
        />
        {/* Subtle, non-washed-out cream gradient overlay per requested specification */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(245,241,231,0.90) 0%, rgba(245,241,231,0.50) 48%, rgba(245,241,231,0.30) 100%)",
          }}
        />
      </motion.div>

      {/* LAYER 2: Atmospheric Mist & Dissolve into Dashboard Canvas */}
      <motion.div
        style={{
          y: shouldReduceMotion ? 0 : mistScroll,
          x: shouldReduceMotion ? 0 : mouseOffset.x * 0.4,
        }}
        className="absolute inset-0 z-1 pointer-events-none bg-gradient-to-t from-[#F5F1E7] via-[#F5F1E7]/35 to-transparent"
      />

      {/* Hero Foreground Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 py-10 lg:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* LEFT: EDITORIAL HEADING & INSIGHTS */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6">
            
            {/* Live Monsoon Intelligence Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/85 border border-white/60 shadow-2xs backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#176B4D] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#176B4D]" />
              </span>
              <span className="text-[10.5px] font-extrabold tracking-wider uppercase text-[#18342C]">
                LIVE MONSOON INTELLIGENCE
              </span>
              <span className="text-[#63736D] text-[10px]">•</span>
              <button
                onClick={() => setLocationModalOpen(true)}
                className="text-[11px] text-[#176B4D] font-bold hover:underline flex items-center gap-1 cursor-pointer"
              >
                <MapPin className="w-3 h-3 text-[#176B4D]" />
                {currentLocation.name || "Shajapur Block"}
              </button>
            </div>

            {/* Main Editorial Heading */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#18342C] tracking-tight font-sans leading-[1.08]">
                Monsoon Intelligence <br />
                <span className="text-[#176B4D]">for Stronger Harvests</span>
              </h1>

              {/* Supporting text */}
              <p className="text-sm sm:text-base md:text-lg text-[#18342C]/85 max-w-xl leading-relaxed font-sans font-medium">
                Block-level predictive insights converting dynamic monsoon signals into localized agronomic decisions.
              </p>
            </div>

            {/* Location hierarchy pills + Prototype Data indicator */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1 text-xs">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/80 border border-white/60 text-[#18342C] font-bold shadow-2xs backdrop-blur-xs">
                <span>Madhya Pradesh</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#63736D]" />
                <span>Shajapur</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#63736D]" />
                <span className="font-extrabold text-[#176B4D]">{currentLocation.name || "Shajapur Block"}</span>
              </div>

              <span className="px-3 py-1.5 rounded-xl bg-[#E8EFE7]/90 border border-[#7A9B7A]/40 text-[#173B2E] text-[11px] font-black">
                Prototype Data
              </span>
            </div>
          </div>

          {/* RIGHT: FLOATING GLASS MONSOON STATUS INSTRUMENT */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div
              className="w-full max-w-md rounded-2xl p-6 sm:p-7 shadow-sm space-y-4 relative"
              style={{
                background: "rgba(255, 255, 255, 0.72)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid rgba(255, 255, 255, 0.45)",
              }}
            >
              {/* Instrument Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[#18342C]/10">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-md bg-[#E8EFE7] flex items-center justify-center text-[#176B4D]">
                    <Sprout className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[11px] font-black tracking-wider uppercase text-[#18342C]">
                    CURRENT MONSOON STATUS
                  </span>
                </div>
                <span className="text-[11px] font-bold text-[#176B4D] bg-[#E8EFE7] px-2.5 py-0.5 rounded-full">
                  {currentLocation.name || "Shajapur Block"}
                </span>
              </div>

              {/* Main signal section: ACTIVE MONSOON + 78% Probability + Inset Photo */}
              <div className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-7 space-y-1">
                  <div className="flex items-center gap-1.5">
                    <CloudRain className="w-4 h-4 text-[#176B4D]" />
                    <span className="text-xs sm:text-sm font-black text-[#176B4D] tracking-wider uppercase">
                      ACTIVE MONSOON
                    </span>
                  </div>

                  {/* 78% Visually Dominant */}
                  <div className="text-4xl sm:text-5xl font-black text-[#18342C] font-sans tracking-tight leading-none pt-0.5">
                    78%
                  </div>

                  <div className="text-xs font-bold text-[#18342C]">
                    Rainfall Probability
                  </div>
                  <div className="text-[11px] text-[#63736D] font-medium">
                    Next 7 Days (68–92 mm)
                  </div>
                </div>

                {/* Small rainfall photo inset */}
                <div className="col-span-5">
                  <div className="relative h-24 w-full rounded-xl overflow-hidden border border-white/60 shadow-2xs">
                    <Image
                      src="/images/rain-signal.jpg"
                      alt="Monsoon rain clouds over agricultural fields"
                      fill
                      sizes="(max-width: 768px) 140px, 180px"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    <div className="absolute bottom-1.5 left-2 text-[9.5px] text-white font-bold">
                      Active Surge
                    </div>
                  </div>
                </div>
              </div>

              {/* 4 Bottom Metric Columns */}
              <div className="pt-3.5 border-t border-[#18342C]/10 grid grid-cols-4 gap-1.5 text-left">
                {/* 1. Onset Probability */}
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1 text-[10px] text-[#63736D] font-medium truncate">
                    <Sprout className="w-2.5 h-2.5 text-[#176B4D] shrink-0" />
                    <span>Onset Prob.</span>
                  </div>
                  <div className="text-sm sm:text-base font-extrabold text-[#176B4D]">84%</div>
                </div>

                {/* 2. False Onset Risk */}
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1 text-[10px] text-[#63736D] font-medium truncate">
                    <SunMedium className="w-2.5 h-2.5 text-[#D99A32] shrink-0" />
                    <span>False Onset</span>
                  </div>
                  <div className="text-sm sm:text-base font-extrabold text-[#D99A32]">18%</div>
                </div>

                {/* 3. Current Phase */}
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1 text-[10px] text-[#63736D] font-medium truncate">
                    <Activity className="w-2.5 h-2.5 text-[#176B4D] shrink-0" />
                    <span>Phase</span>
                  </div>
                  <div className="text-xs sm:text-sm font-extrabold text-[#176B4D] uppercase">ACTIVE</div>
                </div>

                {/* 4. Forecast Confidence */}
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1 text-[10px] text-[#63736D] font-medium truncate">
                    <ShieldCheck className="w-2.5 h-2.5 text-[#18342C] shrink-0" />
                    <span>Confidence</span>
                  </div>
                  <div className="text-sm sm:text-base font-extrabold text-[#18342C]">82%</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default DashboardHero;
