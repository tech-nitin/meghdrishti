"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sprout,
  Volume2,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  CloudRain,
  Droplets,
  SunMedium,
  Check,
  ArrowRight,
  ShieldCheck,
  ChevronDown,
  VolumeX,
} from "lucide-react";
import { useApp } from "@/lib/context/AppContext";
import { mockCrops } from "@/data/crops";

export function FarmerDashboard() {
  const { language, setLanguage, currentLocation } = useApp();
  const [selectedCrop, setSelectedCrop] = useState<string>("crop-soybean");
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const crop = mockCrops.find((c) => c.id === selectedCrop) || mockCrops[0];

  const handlePlayVoice = () => {
    setIsPlayingAudio(true);
    // Simulate speech readout
    setTimeout(() => {
      setIsPlayingAudio(false);
    }, 4500);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
      
      {/* Top Welcome & Voice Assistant Bar */}
      <div className="p-6 sm:p-7 bg-[#FAF8F2] border border-[#DCCDB5] rounded-3xl shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8EEE5] text-[#315C3F] text-xs font-bold">
              <Sprout className="w-3.5 h-3.5" />
              <span>{language === "hi" ? "मेघदृष्टि किसान सेवा" : "MEGHDRISHTI Farmer Mode"}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#20312C] font-sans">
              {language === "hi"
                ? `नमस्ते किसान भाई, ${currentLocation.name}`
                : `Farmer Agro-Advisory: ${currentLocation.name}`}
            </h1>
            <p className="text-sm text-[#60716B]">
              {currentLocation.district}, {currentLocation.state} • {language === "hi" ? "आज की सटीक कृषि सलाह" : "Simple daily field advisory"}
            </p>
          </div>

          {/* Voice Readout Button & Language Toggle */}
          <div className="flex items-center gap-2.5 self-start sm:self-auto">
            <button
              type="button"
              onClick={handlePlayVoice}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold transition-all shadow-xs ${
                isPlayingAudio
                  ? "bg-[#C66E49] text-white animate-pulse"
                  : "bg-[#315C3F] text-white hover:bg-[#18372A]"
              }`}
            >
              {isPlayingAudio ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <span>
                {isPlayingAudio
                  ? (language === "hi" ? "सलाह सुनाई जा रही है..." : "Playing Advisory...")
                  : (language === "hi" ? "बोलकर बताएं (Audio)" : "Listen to Advice")}
              </span>
            </button>

            <button
              onClick={() => setLanguage(language === "en" ? "hi" : "en")}
              className="px-3.5 py-2.5 rounded-full bg-white border border-[#DCCDB5] text-xs font-bold text-[#20312C] hover:border-[#315C3F] transition-colors"
            >
              {language === "hi" ? "English" : "हिंदी"}
            </button>
          </div>
        </div>

        {/* Audio Banner Indicator */}
        {isPlayingAudio && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="p-3 bg-[#E8EEE5] border border-[#789B7C] rounded-2xl text-xs text-[#18372A] flex items-center gap-3"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-[#C66E49] animate-ping" />
            <span>
              {language === "hi"
                ? `आवाज में बताया जा रहा है: शाजापुर ब्लॉक में 17 और 18 जून को अच्छी बारिश होने वाली है। 65 से 75 मिलीमीटर बारिश के बाद ही 18 से 22 जून के बीच सोयाबीन की बुवाई करें।`
                : `Voice summary playing: Good rainfall expected in Shajapur Block on 17-18 June. Sow soybean between 18-22 June after 70mm rainfall.`}
            </span>
          </motion.div>
        )}
      </div>

      {/* Main Question Answered: Should You Sow Today? (क्या आज बुवाई करें?) */}
      <div className="p-6 sm:p-8 bg-white border-2 border-[#315C3F] rounded-3xl shadow-md space-y-5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-[#60716B] uppercase tracking-wider">
            {language === "hi" ? "आज का मुख्य निर्णय" : "TODAY'S SOWING DECISION"}
          </span>
          <span className="text-xs font-bold text-white bg-[#315C3F] px-3.5 py-1 rounded-full">
            {language === "hi" ? "सकारात्मक (Window Open)" : "Sowing Window Open"}
          </span>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-[#20312C] font-sans">
            {language === "hi"
              ? "हाँ, 18 से 22 जून के बीच बारिश स्थिर होने पर बुवाई करें।"
              : "Yes, proceed with sowing between 18–22 June after soil saturation."}
          </h2>

          <p className="text-sm sm:text-base text-[#60716B] leading-relaxed">
            {language === "hi"
              ? "खेत में कम से कम 65 से 75 मिलीमीटर बारिश होने और 3-4 इंच तक नमी पहुंचने के बाद ही बीज डालें। 22 से 25 जून के बीच बारिश में हल्का विराम रहेगा, इसलिए जल निकासी नाली अवश्य बनाएं।"
              : "Ensure soil has absorbed at least 65-75 mm rainfall. Prepare broad-bed furrows as a short break is expected around 22-25 June."}
          </p>
        </div>

        {/* 3 Large Visual Status Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          {/* Card 1: 7 Day Rain */}
          <div className="p-4 rounded-2xl bg-[#FAF8F2] border border-[#DCCDB5] space-y-1">
            <div className="flex items-center justify-between text-[#60716B]">
              <span className="text-xs font-bold">{language === "hi" ? "अगले 7 दिन की बारिश" : "Next 7 Days Rain"}</span>
              <CloudRain className="w-4 h-4 text-[#5B91A8]" />
            </div>
            <div className="text-2xl font-bold text-[#20312C]">84.5 mm</div>
            <div className="text-xs text-[#315C3F] font-semibold">{language === "hi" ? "अच्छी बारिश की संभावना (78%)" : "High Rain Probability (78%)"}</div>
          </div>

          {/* Card 2: Sowing Window */}
          <div className="p-4 rounded-2xl bg-[#FAF8F2] border border-[#DCCDB5] space-y-1">
            <div className="flex items-center justify-between text-[#60716B]">
              <span className="text-xs font-bold">{language === "hi" ? "उत्तम बुवाई अवधि" : "Best Sowing Window"}</span>
              <Calendar className="w-4 h-4 text-[#315C3F]" />
            </div>
            <div className="text-2xl font-bold text-[#315C3F]">18 – 22 June</div>
            <div className="text-xs text-[#60716B]">{language === "hi" ? "सोयाबीन JS 95-60 / JS 20-34" : "Soybean & Maize"}</div>
          </div>

          {/* Card 3: Break Spell Warning */}
          <div className="p-4 rounded-2xl bg-[#FAF8F2] border border-[#DCCDB5] space-y-1">
            <div className="flex items-center justify-between text-[#60716B]">
              <span className="text-xs font-bold">{language === "hi" ? "बारिश में विराम (Break)" : "Dry Break Hazard"}</span>
              <SunMedium className="w-4 h-4 text-[#D39A3D]" />
            </div>
            <div className="text-2xl font-bold text-[#D39A3D]">22 – 25 June</div>
            <div className="text-xs text-[#60716B]">{language === "hi" ? "3-4 दिन का अल्प शुष्क दौर" : "Short 3-4 day dry spell"}</div>
          </div>
        </div>
      </div>

      {/* Crop Switcher */}
      <div className="p-6 bg-[#FAF8F2] border border-[#DCCDB5] rounded-3xl space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-[#DCCDB5]">
          <h3 className="text-lg font-bold text-[#20312C]">
            {language === "hi" ? "फसल चुनें" : "Select Your Crop"}
          </h3>
          <span className="text-xs text-[#60716B]">Kharif 2026</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {mockCrops.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCrop(c.id)}
              className={`p-4 rounded-2xl border text-left transition-all ${
                selectedCrop === c.id
                  ? "bg-[#E8EEE5] border-[#315C3F] ring-1 ring-[#315C3F]"
                  : "bg-white border-[#DCCDB5] hover:border-[#789B7C]"
              }`}
            >
              <div className="text-base font-bold text-[#20312C]">{language === "hi" ? c.hindiName : c.name}</div>
              <div className="text-xs text-[#60716B] mt-1">{c.optimalSowingWindow.formatted}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Farmer Checklist (खेत तैयारी चेकलिस्ट) */}
      <div className="p-6 sm:p-7 bg-[#FAF8F2] border border-[#DCCDB5] rounded-3xl space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-[#DCCDB5]">
          <h3 className="text-lg font-bold text-[#20312C]">
            {language === "hi" ? "बुवाई से पहले 4 जरूरी काम (चेकलिस्ट)" : "4 Mandatory Pre-Sowing Steps"}
          </h3>
          <span className="text-xs text-[#315C3F] font-bold">KVK Certified</span>
        </div>

        <div className="space-y-3">
          {[
            {
              step: "1",
              titleHi: "बीज अंकुरण परीक्षण (Germination Test)",
              titleEn: "Check Seed Germination Rate",
              descHi: "बुवाई से पहले 100 बीजों को गीले बोरे पर रखकर देखें। 70 से अधिक बीज उगने पर ही बोएं।",
              descEn: "Verify that germination rate is greater than 70% before field sowing.",
            },
            {
              step: "2",
              titleHi: "बीजोपचार (Seed Treatment)",
              titleEn: "Fungicide & Bio-Fertilizer Treatment",
              descHi: "कार्बाक्सिन + थीरम (2 ग्राम/किग्रा) एवं ट्राइकोडर्मा से फफूंदनाशी उपचार करें, फिर राइजोबियम कल्चर लगाएं।",
              descEn: "Treat seed with fungicide (Carboxin+Thiram) followed by Rhizobium & PSB culture.",
            },
            {
              step: "3",
              titleHi: "जल निकासी नाली (Drainage Trenches)",
              titleEn: "Clear Field Drainage Channels",
              descHi: "काली मिट्टी में भारी बारिश से पानी न रुके, इसके लिए ढलान के विपरीत चौड़ी क्यारी नाली बनाएं।",
              descEn: "Prepare broad bed furrows (BBF) to prevent waterlogging during heavy downpours.",
            },
            {
              step: "4",
              titleHi: "उर्वरक प्रबंधन (Fertilizer Application)",
              titleEn: "Balanced Basal Fertilizer Dose",
              descHi: "बुवाई के समय ही फास्फोरस और पोटाश की अनुशंसित मात्रा दें। यूरिया को बाद में दें।",
              descEn: "Apply complete dose of SSP and Potash at sowing time; delay top-dressing urea.",
            },
          ].map((item) => (
            <div key={item.step} className="p-4 rounded-2xl bg-white border border-[#DCCDB5]/70 flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-[#315C3F] text-white flex items-center justify-center font-bold text-sm shrink-0">
                {item.step}
              </div>
              <div className="space-y-0.5">
                <h4 className="text-sm font-bold text-[#20312C]">
                  {language === "hi" ? item.titleHi : item.titleEn}
                </h4>
                <p className="text-xs text-[#60716B] leading-relaxed">
                  {language === "hi" ? item.descHi : item.descEn}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA to Full Advisory */}
        <div className="pt-3 flex items-center justify-between">
          <span className="text-xs text-[#60716B]">
            {language === "hi" ? "शाजापुर कृषि विज्ञान केंद्र द्वारा सत्यापित" : "Verified by KVK Shajapur"}
          </span>
          <Link
            href="/advisory"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold text-white bg-[#C66E49] hover:bg-[#B75D3A] rounded-xl shadow-xs transition-colors"
          >
            <span>{language === "hi" ? "विस्तृत सलाह देखें" : "View Full Advisory"}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

    </div>
  );
}

export default FarmerDashboard;
