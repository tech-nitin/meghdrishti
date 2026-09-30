"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  CloudRain,
  Sprout,
  SunMedium,
  Droplets,
  TrendingUp,
  MapPin,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { useApp } from "@/lib/context/AppContext";
import { phaseSignals } from "@/data/forecasts";

export function HeroOverview() {
  const {
    selectedPhase,
    setSelectedPhase,
    currentLocation,
    language,
    setLocationModalOpen,
  } = useApp();

  const currentSignal = phaseSignals[selectedPhase] || phaseSignals.active;

  return (
    <section className="relative w-full overflow-hidden pt-4 pb-12 sm:pb-20">
      {/* Background Photography with Translucent Atmospheric Monsoon Overlay */}
      <div className="absolute inset-0 z-0 w-full h-full pointer-events-none">
        <Image
          src="/images/hero-farmland.jpg"
          alt="Monsoon over lush Indian farmland"
          fill
          sizes="100vw"
          priority
          className="object-cover object-center scale-105 transition-transform duration-1000 opacity-25 mix-blend-luminosity"
        />
        {/* Deep atmospheric gradients letting 3D rain shine through */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0C201A]/60 via-[#0F2820]/40 to-[#10241E]/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(52,211,153,0.12)_0%,rgba(16,36,30,0.4)_50%,rgba(16,36,30,0.85)_100%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[520px] pt-4 sm:pt-8">
          
          {/* LEFT COLUMN: Editorial Headline, Supporting Copy, Action CTAs, Phase Selector */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            {/* Live Monsoon Intelligence Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0D241D]/90 border border-[#34D399]/40 shadow-lg backdrop-blur-md"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#34D399] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#34D399]" />
              </span>
              <span className="text-[11px] font-extrabold tracking-wider uppercase text-white">
                {language === "hi" ? "लाइव मानसून इंटेलिजेंस" : "LIVE MONSOON INTELLIGENCE"}
              </span>
              <span className="text-[#34D399] text-[10px]">•</span>
              <button
                onClick={() => setLocationModalOpen(true)}
                className="text-[11px] text-[#34D399] font-bold hover:underline flex items-center gap-1 cursor-pointer"
              >
                <MapPin className="w-3 h-3" />
                {currentLocation.district ? `${currentLocation.name}` : "Shajapur Block"}
              </button>
            </motion.div>

            {/* Editorial Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-3"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white font-sans leading-[1.08] drop-shadow-sm">
                {language === "hi" ? (
                  <>
                    खेत तक पहुंचने से पहले <br />
                    <span className="text-[#34D399] drop-shadow-[0_0_25px_rgba(52,211,153,0.45)]">
                      मानसून की चाल
                    </span>{" "}
                    को समझें।
                  </>
                ) : (
                  <>
                    Read the monsoon <br />
                    before it reaches the <br />
                    <span className="text-[#34D399] drop-shadow-[0_0_25px_rgba(52,211,153,0.45)]">
                      field.
                    </span>
                  </>
                )}
              </h1>

              {/* Supporting Text */}
              <p className="text-base sm:text-lg text-[#D1E0DA] max-w-xl leading-relaxed font-normal">
                {language === "hi"
                  ? "ब्लॉक और पंचायत स्तर पर सटीक जलवायु पूर्वानुमान और विश्वसनीय फसल निर्णय।"
                  : "Block & Panchayat-scale climate intelligence for smarter agricultural decisions."}
              </p>
            </motion.div>

            {/* Action CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap items-center gap-3.5 pt-1"
            >
              {/* Primary CTA (Vibrant Terracotta Glow) */}
              <Link
                href="/forecast"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm sm:text-base font-bold text-white bg-gradient-to-r from-[#EA580C] to-[#C2410C] hover:from-[#F97316] hover:to-[#EA580C] rounded-full shadow-[0_4px_20px_rgba(234,88,12,0.4)] hover:shadow-[0_6px_25px_rgba(234,88,12,0.6)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>{language === "hi" ? "पूर्वानुमान देखें" : "Explore Outlook"}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              {/* Secondary CTA (Outlined Frosted Glass) */}
              <Link
                href="/map"
                className="inline-flex items-center gap-2 px-5 py-3.5 text-sm sm:text-base font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 hover:border-[#34D399] rounded-full shadow-lg transition-all backdrop-blur-md"
              >
                <span>{language === "hi" ? "जोखिम मानचित्र" : "View Risk Map"}</span>
                <ArrowRight className="w-4 h-4 text-[#34D399]" />
              </Link>
            </motion.div>

            {/* Interactive Phase Control */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="pt-2"
            >
              <div className="inline-flex items-center gap-1.5 p-1.5 bg-[#0C201A]/85 border border-[#2D6652]/60 rounded-full shadow-xl backdrop-blur-xl">
                <span className="text-[11px] font-extrabold text-[#94A3B8] tracking-wider uppercase px-3">
                  PHASE
                </span>
                {(["active", "break", "revival"] as const).map((phaseKey) => {
                  const isActive = selectedPhase === phaseKey;
                  const labels = {
                    active: language === "hi" ? "सक्रिय (Active)" : "Active",
                    break: language === "hi" ? "विराम (Break)" : "Break",
                    revival: language === "hi" ? "पुनर्जीवन (Revival)" : "Revival",
                  };
                  return (
                    <button
                      key={phaseKey}
                      type="button"
                      onClick={() => setSelectedPhase(phaseKey)}
                      className={`relative px-4 py-1.5 text-xs font-bold rounded-full transition-all cursor-pointer ${
                        isActive
                          ? "bg-[#176B4D] text-white shadow-md border border-[#34D399]/40 scale-102"
                          : "text-[#D1E0DA] hover:text-white hover:bg-white/10"
                      }`}
                    >
                      {labels[phaseKey]}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Floating Monsoon Signal Card (Glass Instrument) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="w-full max-w-md bg-[#0C201A]/85 border border-[#34D399]/30 rounded-3xl p-6 shadow-[0_15px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl relative overflow-hidden text-white"
            >
              {/* Card Ambient Glow Accent */}
              <div className="absolute -top-20 -right-20 w-44 h-44 rounded-full bg-[#34D399]/15 blur-3xl pointer-events-none" />

              {/* Card Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#176B4D] flex items-center justify-center text-[#34D399] shadow-xs">
                    <CloudRain className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-black tracking-wider uppercase text-gray-300">
                    CURRENT MONSOON SIGNAL
                  </span>
                </div>
                <span className="text-[11px] font-bold text-[#34D399] bg-[#176B4D]/60 border border-[#34D399]/40 px-2.5 py-0.5 rounded-full">
                  Shajapur Block
                </span>
              </div>

              {/* Main Metric Area with Inset Photo */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedPhase}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="py-5"
                >
                  <div className="grid grid-cols-12 gap-4 items-center">
                    {/* Signal Text */}
                    <div className="col-span-6 space-y-1">
                      <div
                        className={`text-xs font-black tracking-wider uppercase ${
                          selectedPhase === "active"
                            ? "text-[#34D399]"
                            : selectedPhase === "break"
                            ? "text-[#FBBF24]"
                            : "text-[#38BDF8]"
                        }`}
                      >
                        {currentSignal.statusBadge}
                      </div>
                      <div className="text-5xl font-black text-white font-sans tracking-tight">
                        {currentSignal.rainfallProbability}%
                      </div>
                      <div className="text-xs font-bold text-gray-200">
                        Rainfall Probability
                      </div>
                      <div className="text-[11px] text-gray-400">Next 7 Days</div>
                    </div>

                    {/* Inset Photo */}
                    <div className="col-span-6">
                      <div className="relative h-28 w-full rounded-2xl overflow-hidden border border-white/20 shadow-md">
                        <Image
                          src="/images/rain-signal.jpg"
                          alt="Monsoon rain shower over farmland"
                          fill
                          sizes="(max-width: 768px) 140px, 180px"
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                        <div className="absolute bottom-2 left-2.5 text-[10px] text-white font-bold bg-black/60 px-2 py-0.5 rounded-md backdrop-blur-xs border border-white/20">
                          {currentSignal.next7DaysMm} mm est.
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Summary note */}
                  <div className="mt-4 p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-300 leading-snug">
                    <p>{currentSignal.shortSummary}</p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Bottom 3 Indicator Columns */}
              <div className="pt-4 border-t border-white/10 grid grid-cols-3 gap-2 text-center">
                {/* Onset */}
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <div className="flex items-center justify-center gap-1 text-[11px] text-gray-400 font-medium">
                    <Sprout className="w-3 h-3 text-[#34D399]" />
                    <span>Onset</span>
                  </div>
                  <div className="text-base sm:text-lg font-black text-[#34D399]">
                    {currentSignal.onsetProbability}%
                  </div>
                </div>

                {/* Break Risk */}
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <div className="flex items-center justify-center gap-1 text-[11px] text-gray-400 font-medium">
                    <SunMedium className="w-3 h-3 text-[#FBBF24]" />
                    <span>Break Risk</span>
                  </div>
                  <div className="text-base sm:text-lg font-black text-[#FBBF24]">
                    {currentSignal.breakRisk}%
                  </div>
                </div>

                {/* Heavy Rain */}
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <div className="flex items-center justify-center gap-1 text-[11px] text-gray-400 font-medium">
                    <Droplets className="w-3 h-3 text-[#38BDF8]" />
                    <span>Heavy Rain</span>
                  </div>
                  <div className="text-base sm:text-lg font-black text-[#FB923C]">
                    {currentSignal.heavyRainRisk}%
                  </div>
                </div>
              </div>

              {/* Action Link to Full Dashboard */}
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-gray-400 text-[11px]">Agro-met confidence: 89%</span>
                <Link
                  href="/dashboard"
                  className="text-[#34D399] font-bold hover:text-white flex items-center gap-1 transition-colors"
                >
                  Deep Analytics <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default HeroOverview;
