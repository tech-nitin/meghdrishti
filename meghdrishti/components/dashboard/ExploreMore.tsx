"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { LayoutGrid, Map, BarChart3, Sprout, Users, ArrowRight } from "lucide-react";

export function ExploreMore() {
  const exploreCards = [
    {
      title: "Hyperlocal Risk Map",
      desc: "Block-scale geospatial rainfall & risk analytics",
      href: "/map",
      image: "/images/risk-card.jpg",
      icon: Map,
    },
    {
      title: "Detailed Forecast",
      desc: "7–30 day rainfall outlook with uncertainty envelope",
      href: "/forecast",
      image: "/images/outlook-card.jpg",
      icon: BarChart3,
    },
    {
      title: "Crop Advisory",
      desc: "Location-specific crop phenology guidance",
      href: "/advisory",
      image: "/images/advisory-card.jpg",
      icon: Sprout,
    },
    {
      title: "Farmer Mode",
      desc: "Simplified high-contrast advisory for growers",
      href: "/farmer",
      image: "/images/tractor-farmland.jpg",
      icon: Users,
    },
  ];

  return (
    <section className="w-full space-y-6 pt-4 pb-12">
      {/* SECTION HEADING */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-3 border-b border-[#DED9CB]/70">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#18342C] font-sans tracking-tight">
            Explore Intelligence
          </h2>
          <p className="text-xs sm:text-sm text-[#63736D] font-medium pt-0.5">
            Dive deeper into regional monsoon data and agricultural decision tools
          </p>
        </div>
      </div>

      {/* 4 LARGE IMMERSIVE PHOTOGRAPHIC TILES */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {exploreCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <Link
              key={i}
              href={card.href}
              className="group relative flex flex-col justify-between h-56 sm:h-60 rounded-3xl overflow-hidden border border-[#DED9CB] bg-[#18342C] hover:border-[#176B4D] transition-all duration-500 hover:-translate-y-1.5 shadow-xs hover:shadow-lg cursor-pointer"
            >
              {/* Full-Bleed Photographic Background */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out opacity-85"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#18342C]/95 via-[#18342C]/45 to-black/20" />
              </div>

              {/* Top Left Floating Icon */}
              <div className="relative z-10 p-5">
                <div className="w-9 h-9 rounded-2xl bg-white/15 text-white flex items-center justify-center backdrop-blur-md border border-white/25 shadow-2xs">
                  <Icon className="w-4.5 h-4.5" />
                </div>
              </div>

              {/* Bottom Info & Arrow */}
              <div className="relative z-10 p-5 flex items-end justify-between gap-3 text-white">
                <div className="space-y-1">
                  <h3 className="text-base sm:text-lg font-black tracking-tight font-sans">
                    {card.title}
                  </h3>
                  <p className="text-xs text-white/85 leading-snug line-clamp-2 font-medium">
                    {card.desc}
                  </p>
                </div>

                <div className="w-8 h-8 rounded-full bg-white/20 group-hover:bg-[#176B4D] border border-white/30 flex items-center justify-center text-white shrink-0 transition-all group-hover:translate-x-1 shadow-2xs">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default ExploreMore;
