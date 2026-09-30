"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Bell,
  CloudRain,
  SunMedium,
  ShieldAlert,
  Smartphone,
  Send,
  MessageSquare,
  Eye,
  Check,
  ArrowRight,
} from "lucide-react";

export function DashboardAlerts() {
  const [alertLang, setAlertLang] = useState<"en" | "hi">("en");
  const [simulatedAction, setSimulatedAction] = useState<string | null>(null);

  const handleAction = (type: string) => {
    setSimulatedAction(type);
    setTimeout(() => {
      setSimulatedAction(null);
    }, 3000);
  };

  const alerts = [
    {
      title: "Rainfall Likely",
      desc: "Moderate to widespread rainfall is likely over the next 7 days across Shajapur Block.",
      date: "26 Jun",
      isNew: true,
      icon: CloudRain,
      iconColor: "text-[#18342C] bg-[#E8EFE7]",
    },
    {
      title: "Possible Dry Spell",
      desc: "Short break in precipitation expected after 22 June based on regional pressure trends.",
      date: "25 Jun",
      isNew: false,
      icon: SunMedium,
      iconColor: "text-[#D99A32] bg-[#D99A32]/15",
    },
    {
      title: "Heavy Rainfall Alert",
      desc: "Isolated heavy downpours (35–50 mm/day) may occur between 18–20 June.",
      date: "24 Jun",
      isNew: false,
      icon: ShieldAlert,
      iconColor: "text-[#18342C] bg-[#E8EFE7]",
    },
  ];

  const alertMessageEn =
    "Rainfall probability is high over the next 7 days. The 18–22 June window may be suitable for soybean sowing.";
  const alertMessageHi =
    "अगले 7 दिनों में वर्षा की संभावना अधिक है। सोयाबीन की बुवाई के लिए 18–22 जून का समय उपयुक्त हो सकता है।";

  return (
    <section className="w-full space-y-6">
      {/* SECTION HEADING */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-3 border-b border-[#DED9CB]/70">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#18342C] font-sans tracking-tight">
            Farmer Communication & Alerts
          </h2>
          <p className="text-xs sm:text-sm text-[#63736D] font-medium pt-0.5">
            Operational bulletins & direct broadcast dispatch
          </p>
        </div>

        <Link
          href="/farmer"
          className="text-xs sm:text-sm font-bold text-[#176B4D] hover:text-[#173B2E] inline-flex items-center gap-1.5 self-start sm:self-auto hover:underline"
        >
          <span>Farmer Broadcast Center</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-2">
        
        {/* LEFT (Col 6): RECENT ALERTS — OPEN EDITORIAL NOTIFICATION FEED */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-4 pb-6 lg:pb-0 border-b lg:border-b-0 lg:border-r border-[#DED9CB]/80 lg:pr-8">
          <div className="flex items-center justify-between pb-2 border-b border-[#DED9CB]/60">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-[#D99A32]/15 flex items-center justify-center text-[#D99A32]">
                <Bell className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-black text-[#18342C] font-sans">
                Recent Alerts Feed
              </h3>
            </div>

            <Link
              href="/advisory"
              className="text-xs font-bold text-[#176B4D] hover:underline inline-flex items-center gap-1"
            >
              <span>View History</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Clean Editorial Notification Rows */}
          <div className="divide-y divide-[#DED9CB]/60">
            {alerts.map((a, i) => {
              const Icon = a.icon;
              return (
                <div
                  key={i}
                  className="py-3.5 first:pt-1 last:pb-1 flex items-start gap-4 group"
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${a.iconColor}`}>
                    <Icon className="w-4 h-4" />
                  </div>

                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 truncate">
                        <h4 className="text-sm font-black text-[#18342C] truncate">
                          {a.title}
                        </h4>
                        {a.isNew && (
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-black uppercase bg-[#C85B4F] text-white">
                            New
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-bold text-[#63736D] whitespace-nowrap shrink-0">
                        {a.date}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#63736D] leading-snug">
                      {a.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT (Col 6): FARMER ALERT ACTION PANEL */}
        <div className="lg:col-span-6 bg-[#FFFDF8]/90 border border-[#DED9CB] rounded-3xl p-6 sm:p-7 shadow-2xs flex flex-col justify-between space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#DED9CB]/70">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#E8EFE7] flex items-center justify-center text-[#176B4D]">
                <Smartphone className="w-4 h-4" />
              </div>
              <h3 className="text-base sm:text-lg font-black text-[#18342C] font-sans">
                Farmer Broadcast Dispatch
              </h3>
            </div>

            {/* Language Switcher Tabs */}
            <div className="flex items-center gap-1 p-0.5 bg-[#F5F1E7] border border-[#DED9CB] rounded-xl text-xs">
              <button
                onClick={() => setAlertLang("en")}
                className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                  alertLang === "en" ? "bg-[#18342C] text-white shadow-2xs" : "text-[#63736D] hover:text-[#18342C]"
                }`}
              >
                English
              </button>
              <button
                onClick={() => setAlertLang("hi")}
                className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                  alertLang === "hi" ? "bg-[#18342C] text-white shadow-2xs" : "text-[#63736D] hover:text-[#18342C]"
                }`}
              >
                हिंदी
              </button>
            </div>
          </div>

          {/* Message Preview Bubble */}
          <div className="relative p-4 rounded-2xl bg-[#F5F1E7]/80 border border-[#DED9CB] flex items-center justify-between gap-4">
            <p className="text-xs sm:text-sm text-[#18342C] leading-relaxed font-sans font-medium flex-1">
              {alertLang === "en" ? alertMessageEn : alertMessageHi}
            </p>

            {/* Smartphone Graphic Inset */}
            <div className="w-12 h-16 rounded-xl bg-[#18342C] border-2 border-[#DED9CB] shadow-xs flex flex-col justify-between p-1 shrink-0">
              <div className="w-3 h-0.5 bg-white/40 rounded-full mx-auto" />
              <div className="w-full bg-[#176B4D]/50 rounded p-0.5 text-[6.5px] text-white/90 truncate">
                SMS...
              </div>
              <div className="w-1.5 h-1.5 rounded-full border border-white/40 mx-auto" />
            </div>
          </div>

          {/* Simulation Feedback Alert */}
          {simulatedAction && (
            <div className="p-2.5 bg-[#E8EFE7] border border-[#7A9B7A] rounded-xl text-xs text-[#173B2E] flex items-center gap-2 animate-in fade-in duration-200">
              <Check className="w-4 h-4 text-[#176B4D]" />
              <span>
                Simulation: <strong>{simulatedAction}</strong> queued for 12,450 registered farmers in Shajapur block.
              </span>
            </div>
          )}

          {/* Action Buttons: Preview, Send SMS, Send WhatsApp */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-[#DED9CB]/70">
            <span className="text-xs text-[#63736D] font-bold">
              Prototype Simulation
            </span>

            <div className="flex items-center gap-2 ml-auto">
              <button
                type="button"
                onClick={() => handleAction("Message Preview")}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl bg-[#FFFDF8] border border-[#DED9CB] hover:bg-[#F5F1E7] text-[#18342C] transition-colors cursor-pointer shadow-2xs"
              >
                <Eye className="w-3.5 h-3.5 text-[#63736D]" />
                <span>Preview</span>
              </button>
              
              <button
                type="button"
                onClick={() => handleAction("Direct SMS")}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl bg-[#FFFDF8] border border-[#176B4D] hover:bg-[#E8EFE7] text-[#176B4D] transition-colors cursor-pointer shadow-2xs"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#176B4D]" />
                <span>Send SMS</span>
              </button>
              
              <button
                type="button"
                onClick={() => handleAction("WhatsApp Broadcast")}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-[#176B4D] hover:bg-[#173B2E] text-white transition-colors cursor-pointer shadow-2xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send WhatsApp</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

export default DashboardAlerts;
