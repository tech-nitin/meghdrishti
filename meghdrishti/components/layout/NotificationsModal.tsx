"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Bell, AlertTriangle, CloudRain, Sprout, CheckCircle2, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useApp } from "@/lib/context/AppContext";

export function NotificationsModal() {
  const { notificationsOpen, setNotificationsOpen, language } = useApp();

  if (!notificationsOpen) return null;

  const notifications = [
    {
      id: "notif-1",
      icon: Sprout,
      iconColor: "text-[#315C3F] bg-[#E8EEE5]",
      title: language === "hi" ? "सोयाबीन बुवाई सलाह अपडेट" : "Soybean Sowing Window Ready",
      description:
        language === "hi"
          ? "शाजापुर ब्लॉक में 18-22 जून के बीच बारिश स्थिर होने पर बुवाई प्रारंभ करें।"
          : "Cumulative precipitation expected to cross 70mm threshold. Recommended window: 18–22 June.",
      time: "25 mins ago",
      type: "advisory",
      href: "/advisory",
    },
    {
      id: "notif-2",
      icon: CloudRain,
      iconColor: "text-[#5B91A8] bg-[#5B91A8]/15",
      title: language === "hi" ? "सक्रिय मानसून बारिश अलर्ट" : "Active Monsoon Surge: 25-35mm",
      description:
        language === "hi"
          ? "17-18 जून को मालवा क्षेत्र में अच्छी बारिश का अनुमान। जल निकासी व्यवस्था तैयार रखें।"
          : "Arabian Sea trough alignment bringing widespread rainfall across Shajapur Block on 17-18 June.",
      time: "2 hours ago",
      type: "forecast",
      href: "/forecast",
    },
    {
      id: "notif-3",
      icon: AlertTriangle,
      iconColor: "text-[#D39A3D] bg-[#D39A3D]/15",
      title: language === "hi" ? "अल्प शुष्क दौर (ब्रेक) चेतावनी" : "Transient Break Spell Warning (22-25 Jun)",
      description:
        language === "hi"
          ? "22 से 25 जून के बीच बारिश में विराम संभव। सूखी बुवाई से बचें।"
          : "Sub-seasonal break risk elevated to 34% in Mohan Badodiya. Delay nitrogen top-dressing.",
      time: "5 hours ago",
      type: "risk",
      href: "/map",
    },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-end p-4 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setNotificationsOpen(false)}
          className="fixed inset-0 bg-[#18372A]/30 backdrop-blur-xs"
        />

        {/* Slide-over panel */}
        <motion.div
          initial={{ opacity: 0, x: 20, scale: 0.98 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 20, scale: 0.98 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="relative w-full max-w-md bg-[#FAF8F2] border border-[#DCCDB5] rounded-2xl shadow-2xl overflow-hidden z-10 mt-14"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#DCCDB5] bg-[#F5F2E9]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#E8EEE5] flex items-center justify-center text-[#315C3F]">
                <Bell className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#20312C]">
                  {language === "hi" ? "जलवायु एवं कृषि सूचनाएं" : "Climate & Agro Alerts"}
                </h3>
                <p className="text-[11px] text-[#60716B]">Live feeds for Shajapur Block</p>
              </div>
            </div>
            <button
              onClick={() => setNotificationsOpen(false)}
              className="p-1.5 text-[#60716B] hover:text-[#20312C] hover:bg-[#E8EEE5] rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* List */}
          <div className="p-3 space-y-2.5 max-h-[70vh] overflow-y-auto">
            {notifications.map((n) => {
              const Icon = n.icon;
              return (
                <Link
                  key={n.id}
                  href={n.href}
                  onClick={() => setNotificationsOpen(false)}
                  className="block p-3.5 bg-white border border-[#DCCDB5]/70 rounded-xl hover:border-[#789B7C] hover:shadow-xs transition-all group"
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${n.iconColor}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-semibold text-[#20312C] group-hover:text-[#315C3F] transition-colors">
                          {n.title}
                        </h4>
                        <span className="text-[10px] text-[#60716B]">{n.time}</span>
                      </div>
                      <p className="text-xs text-[#60716B] leading-relaxed">{n.description}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Footer */}
          <div className="px-5 py-3 bg-[#F5F2E9] border-t border-[#DCCDB5] flex items-center justify-between text-xs">
            <span className="text-[#60716B] text-[11px]">3 Unread Intelligence Alerts</span>
            <Link
              href="/advisory"
              onClick={() => setNotificationsOpen(false)}
              className="text-[#315C3F] font-semibold text-xs hover:underline flex items-center gap-1"
            >
              All Advisories <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
