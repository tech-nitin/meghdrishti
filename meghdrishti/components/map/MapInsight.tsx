"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import type { IndoreBlockRisk } from "@/data/map-risk";

export interface MapInsightProps {
  selectedBlock?: IndoreBlockRisk;
  className?: string;
}

export function MapInsight({ selectedBlock, className = "" }: MapInsightProps) {
  const insightText = selectedBlock?.insightText ||
    "Most monitored blocks around Indore currently show moderate-to-low rainfall risk. Soil moisture remains favorable, while Betma shows comparatively higher moisture stress and a later sowing window.";

  return (
    <section className={`w-full py-2 ${className}`}>
      <div className="relative pl-6 sm:pl-8 border-l-4 border-[#34D399] space-y-3 py-2 bg-[#0C201A]/60 rounded-r-3xl p-5 border border-white/5 backdrop-blur-md">
        {/* Title and Badge */}
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="text-[11px] font-black uppercase tracking-wider text-[#34D399] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            WHAT THE MAP IS SAYING
          </span>
          <span className="text-gray-500">•</span>
          <span className="text-[10px] font-black uppercase text-gray-300 bg-white/10 border border-white/15 px-2.5 py-0.5 rounded-full shadow-xs">
            PROTOTYPE INSIGHT
          </span>
          {selectedBlock && (
            <span className="text-[10.5px] font-extrabold text-white bg-[#176B4D] border border-[#34D399]/40 px-2.5 py-0.5 rounded-md">
              Focus: {selectedBlock.name}
            </span>
          )}
        </div>

        {/* Editorial Text */}
        <p className="text-base sm:text-lg text-white font-sans font-medium leading-relaxed max-w-4xl drop-shadow-xs">
          &ldquo;{insightText}&rdquo;
        </p>

        {/* Action Link */}
        <div className="pt-0.5">
          <Link
            href="/advisory"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#34D399] hover:text-white hover:underline transition-colors"
          >
            <span>View agricultural implications</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default MapInsight;
