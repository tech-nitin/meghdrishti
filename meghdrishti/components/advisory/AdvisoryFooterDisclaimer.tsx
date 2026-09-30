"use client";

import React from "react";
import { Info, ShieldCheck } from "lucide-react";
import { useApp } from "@/lib/context/AppContext";

export function AdvisoryFooterDisclaimer({ className = "" }: { className?: string }) {
  const { language } = useApp();

  return (
    <footer
      className={`p-5 rounded-2xl bg-[#F4F1E8]/70 border border-[#DED9CB] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#687A73] ${className}`}
    >
      <div className="flex items-start sm:items-center gap-2.5">
        <Info className="w-4 h-4 text-[#126B4F] shrink-0 mt-0.5 sm:mt-0" />
        <p className="leading-relaxed">
          {language === "hi"
            ? "प्रोटोटाइप निर्णय-समर्थन ढांचा • वाणिज्यिक संस्करण में आईसीएआर और राज्य कृषि विश्वविद्यालय के वास्तविक समीक्षा-प्राप्त परामर्श एकीकृत किए जाएंगे।"
            : "Prototype advisory framework • Production version would integrate validated agricultural advisory guidelines and expert-reviewed recommendations."}
        </p>
      </div>

      <div className="flex items-center gap-2 shrink-0 font-bold text-[#19362F] text-[11px]">
        <ShieldCheck className="w-3.5 h-3.5 text-[#126B4F]" />
        <span>MEGHDRISHTI Agro-Met Engine</span>
      </div>
    </footer>
  );
}

export default AdvisoryFooterDisclaimer;
