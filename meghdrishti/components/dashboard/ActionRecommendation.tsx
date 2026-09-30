"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Sprout, Calendar, Check, ArrowRight, Sparkles } from "lucide-react";

export function ActionRecommendation() {
  return (
    <section className="w-full space-y-6">
      {/* SECTION HEADING */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-3 border-b border-[#DED9CB]/70">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl sm:text-3xl font-black text-[#18342C] font-sans tracking-tight">
              Agricultural Decision
            </h2>
            <span className="hidden sm:inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-[#E8EFE7] text-[#176B4D] text-[10.5px] font-extrabold uppercase">
              <Sparkles className="w-3 h-3" /> Primary Advisory
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#63736D] font-medium pt-0.5">
            Crop-specific decision intelligence based on soil moisture and synoptic outlook
          </p>
        </div>

        <Link
          href="/advisory"
          className="text-xs sm:text-sm font-bold text-[#176B4D] hover:text-[#173B2E] inline-flex items-center gap-1.5 self-start sm:self-auto hover:underline"
        >
          <span>All Regional Advisories</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* HERO DECISION REPORT FEATURE SURFACE */}
      <div className="relative rounded-3xl border border-[#DED9CB] bg-[#FFFDF8]/95 p-6 sm:p-8 lg:p-10 shadow-xs overflow-hidden">
        
        {/* Subtle Farmland Background Watermark on Right */}
        <div className="absolute right-0 top-0 bottom-0 w-2/5 opacity-15 pointer-events-none z-0">
          <Image
            src="/images/tractor-farmland.jpg"
            alt="Agricultural soil preparation"
            fill
            sizes="(max-width: 1024px) 50vw, 400px"
            className="object-cover object-right"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#FFFDF8] via-[#FFFDF8]/80 to-transparent" />
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* LEFT (Col 4.5): Large Crop Photo Feature */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full h-64 sm:h-72 lg:h-80 rounded-2xl overflow-hidden border border-[#DED9CB] shadow-sm group">
              <Image
                src="/images/soybean-plant.jpg"
                alt="Lush green soybean crop ready for sowing cycle"
                fill
                sizes="(max-width: 1024px) 100vw, 420px"
                className="object-cover group-hover:scale-104 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              
              <div className="absolute top-4 left-4">
                <span className="inline-block text-xs font-black uppercase tracking-wider px-3.5 py-1 rounded-full bg-[#173B2E] text-white shadow-sm border border-white/25">
                  SOYBEAN
                </span>
              </div>
              
              <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                <span className="text-base font-black block leading-tight">
                  Kharif 2026 Primary Crop Advisory
                </span>
                <span className="text-xs text-white/85 block">
                  Madhya Pradesh Black Cotton Soil Belt
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT (Col 7.5): Agronomic Recommendation & Key Actions */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Recommendation Title & Sowing Window Row */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-start pb-5 border-b border-[#DED9CB]/70">
              <div className="sm:col-span-8 space-y-1.5">
                <span className="text-[11px] font-black uppercase tracking-wider text-[#176B4D]">
                  Primary Sowing Recommendation
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-[#18342C] font-sans leading-tight">
                  Consider sowing after rainfall stabilization.
                </h3>
              </div>

              <div className="sm:col-span-4 bg-[#F5F1E7]/80 border border-[#DED9CB] rounded-2xl p-3.5 shadow-2xs space-y-1 text-left sm:text-right">
                <div className="flex items-center sm:justify-end gap-1.5 text-xs text-[#D96A32] font-black">
                  <Calendar className="w-3.5 h-3.5 text-[#D96A32]" />
                  <span>Recommended window</span>
                </div>
                <div className="text-xl sm:text-2xl font-black text-[#D96A32] font-sans">
                  18 – 22 June
                </div>
              </div>
            </div>

            {/* Rationale & Actions Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6">
              {/* Agronomic Rationale */}
              <div className="sm:col-span-6 space-y-2">
                <span className="text-[11px] font-black text-[#63736D] uppercase tracking-wider block">
                  Agronomic Rationale
                </span>
                <p className="text-sm text-[#18342C] leading-relaxed font-medium">
                  The current synoptic outlook indicates a probable active precipitation pulse followed by a short dry break. Waiting for rainfall stabilization ensures adequate root-zone moisture and reduces seedling mortality.
                </p>
              </div>

              {/* Key Actions */}
              <div className="sm:col-span-6 space-y-2">
                <span className="text-[11px] font-black text-[#63736D] uppercase tracking-wider block">
                  Key Actions
                </span>
                <div className="space-y-2">
                  <div className="flex items-center gap-2.5 text-sm text-[#18342C] font-bold">
                    <div className="w-4.5 h-4.5 rounded-full bg-[#E8EFE7] flex items-center justify-center text-[#176B4D] shrink-0">
                      <Check className="w-3 h-3 text-[#176B4D] stroke-[3]" />
                    </div>
                    <span>Prepare field & seedbed</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm text-[#18342C] font-bold">
                    <div className="w-4.5 h-4.5 rounded-full bg-[#E8EFE7] flex items-center justify-center text-[#176B4D] shrink-0">
                      <Check className="w-3 h-3 text-[#176B4D] stroke-[3]" />
                    </div>
                    <span>Monitor cumulative rainfall (75–100 mm)</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm text-[#18342C] font-bold">
                    <div className="w-4.5 h-4.5 rounded-full bg-[#E8EFE7] flex items-center justify-center text-[#176B4D] shrink-0">
                      <Check className="w-3 h-3 text-[#176B4D] stroke-[3]" />
                    </div>
                    <span>Sow during recommended 18–22 June window</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom CTA Row */}
            <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-[#DED9CB]/70">
              <span className="text-xs text-[#63736D] font-medium">
                Verified with ICAR-IISR Indore agronomic standards
              </span>

              <Link
                href="/advisory"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-black text-white bg-[#C86F4A] hover:bg-[#B75D3A] rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <span>View Full Advisory</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

export default ActionRecommendation;
