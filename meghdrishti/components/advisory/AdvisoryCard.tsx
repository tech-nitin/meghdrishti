"use client";

import React from "react";
import { AdvisoryItem } from "@/types/advisory";
import { Clock, CheckCircle2 } from "lucide-react";

export interface AdvisoryCardProps {
  advisory: AdvisoryItem;
  className?: string;
  isHindi?: boolean;
}

export function AdvisoryCard({
  advisory,
  className = "",
  isHindi = false,
}: AdvisoryCardProps) {
  return (
    <div
      className={`p-5 rounded-2xl bg-white border border-[#DCCDB5] shadow-xs space-y-4 ${className}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <span
            className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full ${
              advisory.severity === "medium"
                ? "bg-[#D39A3D]/15 text-[#D39A3D]"
                : advisory.severity === "high"
                ? "bg-[#C85B4F]/15 text-[#C85B4F]"
                : "bg-[#E8EEE5] text-[#315C3F]"
            }`}
          >
            {advisory.severity} Priority
          </span>
          <h4 className="text-base font-bold text-[#20312C]">
            {isHindi ? advisory.titleHindi : advisory.title}
          </h4>
        </div>

        <span className="text-[11px] text-[#60716B] flex items-center gap-1">
          <Clock className="w-3 h-3" />
          Valid: {advisory.validUntil}
        </span>
      </div>

      <p className="text-xs text-[#60716B] leading-relaxed">
        {isHindi ? advisory.reasonHindi : advisory.reason}
      </p>

      {/* Action Items */}
      <div className="p-4 rounded-xl bg-[#FAF8F2] border border-[#DCCDB5]/60 space-y-2">
        <div className="text-[11px] font-bold text-[#315C3F] uppercase tracking-wider">
          {isHindi ? "खेत में किए जाने वाले मुख्य कार्य" : "Actionable Steps on the Field"}
        </div>
        <div className="space-y-2">
          {(isHindi ? advisory.actionItemsHindi : advisory.actionItems).map((step, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-xs text-[#20312C]">
              <CheckCircle2 className="w-4 h-4 text-[#315C3F] shrink-0 mt-0.5" />
              <span>{step}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdvisoryCard;
