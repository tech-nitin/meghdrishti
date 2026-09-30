"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sprout, Droplets, AlertTriangle, CheckCircle2 } from "lucide-react";
import { useApp } from "@/lib/context/AppContext";

export interface AgriculturalImpactProps {
  className?: string;
}

export function AgriculturalImpact({ className = "" }: AgriculturalImpactProps) {
  const { language } = useApp();

  const impacts = [
    {
      title: language === "hi" ? "बुवाई खिड़की" : "SOWING WINDOW",
      value: "18–22 JUN",
      status: language === "hi" ? "स्थिर वर्षा की प्रतीक्षा करें" : "Wait for rainfall stabilization",
      desc: language === "hi"
        ? "65-75 मिमी संचयी वर्षा के बाद ही बीज डालें ताकि 22 जून के ब्रेक में अंकुरण न रुके।"
        : "Sow after 65-75 mm cumulative rain to ensure root establishment prior to the expected break.",
      icon: Sprout,
      color: "text-[#D56F43]",
      bg: "bg-[#D56F43]/10 border-[#D56F43]/30",
    },
    {
      title: language === "hi" ? "मृदा नमी प्रोफ़ाइल" : "SOIL MOISTURE",
      value: "FAVORABLE",
      status: language === "hi" ? "सक्रिय संचय जारी" : "Favorable topsoil profile",
      desc: language === "hi"
        ? "काली मिट्टी में 3-4 इंच तक नमी पर्याप्त। शुष्क दौर में नमी संरक्षण हेतु जुताई करें।"
        : "Topsoil moisture is optimal (69%). Monitor moisture retention through the expected break phase.",
      icon: Droplets,
      color: "text-[#126B4F]",
      bg: "bg-[#E8EFE7] border-[#126B4F]/30",
    },
    {
      title: language === "hi" ? "खेत जोखिम प्रबंधन" : "FIELD RISK",
      value: "MODERATE",
      status: language === "hi" ? "प्रारंभिक वर्षा पर अति-निर्भरता से बचें" : "Avoid early rain over-reliance",
      desc: language === "hi"
        ? "पहली छिटपुट बारिश में सूखी बुवाई न करें; जल निकासी नालियां खुली रखें।"
        : "Avoid premature dry sowing ahead of the surge. Ensure dead furrows prevent waterlogging.",
      icon: AlertTriangle,
      color: "text-[#D99A2B]",
      bg: "bg-[#D99A2B]/10 border-[#D99A2B]/30",
    },
  ];

  return (
    <section className={`w-full space-y-4 ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-3 border-b border-[#DED9CB]/70">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white font-sans tracking-tight uppercase">
            {language === "hi" ? "कृषि पर मौसमी प्रभाव" : "WHAT THIS MEANS FOR FARMING"}
          </h2>
          <p className="text-xs sm:text-sm text-white/75 font-medium pt-0.5">
            {language === "hi"
              ? "मौसम पूर्वानुमान का खरीफ फसलों की बुवाई और खेत प्रबंधन पर व्यावहारिक प्रभाव"
              : "Translating meteorological outlooks into actionable field-level agronomic decisions"}
          </p>
        </div>

        <Link
          href="/advisory"
          className="inline-flex items-center gap-1.5 text-xs font-black text-[#126B4F] hover:text-[#173B32] hover:underline cursor-pointer self-start sm:self-auto"
        >
          <span>{language === "hi" ? "विस्तृत फसल सलाह देखें" : "View Agricultural Advisory"}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* 3 Impact Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {impacts.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className={`p-6 rounded-3xl border shadow-2xs space-y-3 flex flex-col justify-between ${item.bg}`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black uppercase tracking-wider text-white/80">
                  {item.title}
                </span>
                <Icon className={`w-4 h-4 ${item.color}`} />
              </div>

              <div className="space-y-0.5">
                <div className={`text-2xl font-black font-sans tracking-tight ${item.color}`}>
                  {item.value}
                </div>
                <div className="text-xs font-bold text-white/90">
                  {item.status}
                </div>
              </div>

              <p className="text-xs text-white/75 leading-relaxed font-medium pt-2 border-t border-[#DED9CB]/60">
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default AgriculturalImpact;
