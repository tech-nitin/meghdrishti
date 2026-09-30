"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { AlertTriangle, Activity, ArrowRight, Globe } from "lucide-react";

export function ClimateDrivers() {
  return (
    <section className="w-full space-y-6">
      {/* SECTION HEADING */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-3 border-b border-[#DED9CB]/70">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#18342C] font-sans tracking-tight">
            Monsoon Signals
          </h2>
          <p className="text-xs sm:text-sm text-[#63736D] font-medium pt-0.5">
            Early-season onset stability & macro climate drivers
          </p>
        </div>

        <span className="text-[11px] font-bold text-[#63736D] bg-[#FFFDF8] border border-[#DED9CB] px-3 py-1 rounded-full self-start sm:self-auto shadow-2xs">
          Proposed Model Inputs
        </span>
      </div>

      {/* MERGED OPEN EDITORIAL SECTION: LEFT = FALSE ONSET RISK / RIGHT = CLIMATE DRIVERS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-2">
        
        {/* LEFT (Col 6): FALSE ONSET RISK & SEEDLING PHOTO BLEED */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-5 pb-6 lg:pb-0 border-b lg:border-b-0 lg:border-r border-[#DED9CB]/80 lg:pr-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-[#D99A32]/15 flex items-center justify-center text-[#D99A32]">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <h3 className="text-lg sm:text-xl font-black text-[#18342C] font-sans">
              False Onset Risk
            </h3>
            <span className="text-[10px] font-extrabold uppercase text-[#D99A32] bg-[#D99A32]/10 px-2.5 py-0.5 rounded-full ml-auto">
              Low Risk Phase
            </span>
          </div>

          <div className="grid grid-cols-12 gap-5 items-center">
            {/* Metric & Bar */}
            <div className="col-span-7 space-y-3">
              <div className="flex items-baseline gap-2">
                <div className="text-4xl sm:text-5xl font-black text-[#D96A32] font-sans tracking-tight leading-none">
                  18%
                </div>
                <span className="text-xs font-bold text-[#63736D]">
                  Probability of premature retreat
                </span>
              </div>

              {/* Progress indicator gradient bar */}
              <div className="w-full h-2.5 rounded-full bg-[#E8EFE7] border border-[#DED9CB]/60 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#176B4D] via-[#D99A32] to-[#D96A32] rounded-full"
                  style={{ width: "18%" }}
                />
              </div>

              <p className="text-xs sm:text-sm text-[#63736D] leading-relaxed pt-1">
                Early rainfall shows strong equatorial moisture flux, indicating minimal risk of sudden dry spell stalling after germination.
              </p>
            </div>

            {/* Seedling Sprout Photo with Bleed */}
            <div className="col-span-5 flex justify-end">
              <div className="relative h-32 w-full max-w-[180px] rounded-2xl overflow-hidden border border-[#DED9CB] shadow-xs group">
                <Image
                  src="/images/seedling-soil.jpg"
                  alt="Young crop seedling sprouting in rich moist soil"
                  fill
                  sizes="(max-width: 768px) 140px, 180px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <span className="absolute bottom-2 left-2 text-[10px] text-white font-bold">
                  Moisture Index
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT (Col 6): CLIMATE DRIVERS — EDITORIAL DATA & GLOBE */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-[#E8EFE7] flex items-center justify-center text-[#176B4D]">
                <Activity className="w-4 h-4" />
              </div>
              <h3 className="text-lg sm:text-xl font-black text-[#18342C] font-sans">
                Climate Drivers
              </h3>
            </div>
            <span className="text-xs text-[#63736D] font-medium">
              Indian Ocean & Pacific
            </span>
          </div>

          <div className="grid grid-cols-12 gap-5 items-center">
            {/* 3 Driver metrics separated by vertical dividers */}
            <div className="col-span-8 space-y-3.5">
              <div className="grid grid-cols-3 divide-x divide-[#DED9CB] py-2 border-y border-[#DED9CB]/70 text-center">
                <div className="px-2 space-y-0.5">
                  <div className="text-[11px] font-black text-[#63736D]">ENSO</div>
                  <div className="text-base sm:text-lg font-black text-[#18342C]">Neutral</div>
                </div>

                <div className="px-2 space-y-0.5">
                  <div className="text-[11px] font-black text-[#63736D]">IOD</div>
                  <div className="text-base sm:text-lg font-black text-[#176B4D]">Positive</div>
                </div>

                <div className="px-2 space-y-0.5">
                  <div className="text-[11px] font-black text-[#63736D]">MJO</div>
                  <div className="text-base sm:text-lg font-black text-[#176B4D]">Active</div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#63736D] leading-relaxed">
                Positive Indian Ocean Dipole and active MJO phase enhance cross-equatorial monsoon moisture flux into central India.
              </p>
            </div>

            {/* Earth Atmospheric Globe */}
            <div className="col-span-4 flex flex-col items-center justify-center space-y-1.5">
              <div className="relative w-20 h-20 rounded-full overflow-hidden border border-[#DED9CB] shadow-xs">
                <Image
                  src="/images/climate-earth.jpg"
                  alt="Earth climate circulation over Indian Ocean"
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>
              <Link
                href="/forecast"
                className="text-[11px] font-bold text-[#176B4D] hover:underline inline-flex items-center gap-0.5"
              >
                <span>Drivers Guide</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default ClimateDrivers;
