"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CloudRain, MapPin, Sprout, ArrowRight } from "lucide-react";
import { useApp } from "@/lib/context/AppContext";

export function FeatureCards() {
  const { language } = useApp();

  const cards = [
    {
      id: "outlook",
      icon: CloudRain,
      title: language === "hi" ? "मानसून आउटलुक" : "Monsoon Outlook",
      description:
        language === "hi"
          ? "स्थानीय वर्षा संभावना, आगमन संकेत और आगामी मानसून चरणों की निगरानी करें।"
          : "Track localized rainfall probability, onset signals and upcoming monsoon phases.",
      cta: language === "hi" ? "पूर्वानुमान देखें" : "Explore Outlook",
      href: "/forecast",
      image: "/images/outlook-card.jpg",
      tag: "7–30 Days S2S",
    },
    {
      id: "risk",
      icon: MapPin,
      title: language === "hi" ? "अति-स्थानीय जोखिम" : "Hyperlocal Risk",
      description:
        language === "hi"
          ? "ब्लॉक और ग्राम स्तर पर वर्षा की कमी, सूखा और भारी बारिश के जोखिम को समझें।"
          : "Understand rainfall, dry-spell and heavy-rain risk across blocks and village clusters.",
      cta: language === "hi" ? "जोखिम देखें" : "View Risk Map",
      href: "/map",
      image: "/images/risk-card.jpg",
      tag: "Panchayat Scale",
    },
    {
      id: "advisory",
      icon: Sprout,
      title: language === "hi" ? "किसान कृषि सलाह" : "Farmer Advisory",
      description:
        language === "hi"
          ? "जलवायु संकेतों को सरल, प्रभावी फसल और खेत प्रबंधन सलाह में परिवर्तित करें।"
          : "Convert climate signals into simple, actionable crop and field guidance.",
      cta: language === "hi" ? "सलाह खोलें" : "Open Advisory",
      href: "/advisory",
      image: "/images/advisory-card.jpg",
      tag: "Soybean / Cotton",
    },
  ];

  return (
    <section className="w-full py-6 sm:py-12 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="group relative flex flex-col justify-between h-[370px] sm:h-[410px] rounded-3xl overflow-hidden border border-[#34D399]/20 bg-[#0C201A]/80 shadow-[0_10px_35px_rgba(0,0,0,0.4)] backdrop-blur-xl hover:border-[#34D399]/50 hover:shadow-[0_15px_45px_rgba(52,211,153,0.15)] transition-all duration-300"
              >
                {/* Subtle card ambient highlight */}
                <div className="absolute top-0 right-0 w-36 h-36 bg-[#34D399]/10 rounded-full blur-2xl pointer-events-none group-hover:bg-[#34D399]/20 transition-all" />

                {/* TOP HALF: Text & Meta info */}
                <div className="relative z-10 p-6 sm:p-7 flex flex-col justify-between h-[52%]">
                  <div className="space-y-3">
                    {/* Icon + Tag */}
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-2xl bg-[#176B4D]/60 border border-[#34D399]/30 flex items-center justify-center text-[#34D399] group-hover:bg-[#34D399] group-hover:text-[#0C201A] transition-all shadow-md">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-extrabold tracking-wider uppercase text-gray-300 bg-white/10 px-2.5 py-1 rounded-full border border-white/15 backdrop-blur-xs">
                        {card.tag}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl font-bold text-white font-sans group-hover:text-[#34D399] transition-colors">
                      {card.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed line-clamp-2 font-normal">
                      {card.description}
                    </p>
                  </div>
                </div>

                {/* BOTTOM HALF: High-res Agricultural Photography */}
                <div className="relative h-[48%] w-full overflow-hidden">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out opacity-85"
                  />
                  {/* Atmospheric gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C201A] via-[#0C201A]/50 to-transparent" />

                  {/* CTA Text Link on the bottom */}
                  <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between">
                    <Link
                      href={card.href}
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-white bg-[#176B4D]/90 hover:bg-[#EA580C] px-4 py-2 rounded-full backdrop-blur-md border border-white/20 transition-all group-hover:px-5 shadow-md"
                    >
                      <span>{card.cta}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FeatureCards;
