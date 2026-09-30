"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Globe, Sprout, Leaf, MapPin, ChevronDown } from "lucide-react";
import { LocationModal } from "./LocationModal";
import { NotificationsModal } from "./NotificationsModal";
import { useApp } from "@/lib/context/AppContext";

export interface HeaderProps {
  className?: string;
  transparentOverHero?: boolean;
}

export function Header({ className = "", transparentOverHero = false }: HeaderProps) {
  const pathname = usePathname();
  const {
    language,
    setLanguage,
    farmerMode,
    toggleFarmerMode,
    setNotificationsOpen,
    setLocationModalOpen,
    currentLocation,
  } = useApp();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: language === "hi" ? "अवलोकन" : "Overview", href: "/" },
    { label: language === "hi" ? "जोखिम मानचित्र" : "Risk Map", href: "/map" },
    { label: language === "hi" ? "पूर्वानुमान" : "Forecast", href: "/forecast" },
    { label: language === "hi" ? "कृषि सलाह" : "Advisory", href: "/advisory" },
    { label: language === "hi" ? "डैशबोर्ड" : "Dashboard", href: "/dashboard" },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 bg-[#0C201A]/80 border-b border-[#2D6652]/40 backdrop-blur-xl shadow-lg ${className}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18 gap-3">
            
            {/* LEFT: MEGHDRISHTI Logo with Cloud + Rain + Leaf Icon */}
            <div className="flex items-center gap-3 shrink-0">
              <Link href="/" className="flex items-center gap-2.5 group">
                <div className="relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#176B4D] to-[#0E4230] text-white shadow-md border border-[#34D399]/30 group-hover:scale-105 transition-all">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5 text-white"
                  >
                    <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
                    <path d="M11 20v2" strokeWidth="2.5" />
                    <path d="M15 20v2" strokeWidth="2.5" />
                  </svg>
                  <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#34D399] border-2 border-[#0C201A] flex items-center justify-center shadow-xs">
                    <Leaf className="w-2 h-2 text-[#0C201A] fill-current" />
                  </span>
                </div>

                <div className="flex flex-col">
                  <span className="text-base sm:text-lg font-black tracking-tight text-white font-sans leading-none flex items-center gap-1.5">
                    MEGHDRISHTI
                    <span className="text-[10px] font-extrabold text-[#34D399] bg-[#34D399]/15 px-1.5 py-0.5 rounded-full border border-[#34D399]/30">
                      मेघदृष्टि
                    </span>
                  </span>
                  <span className="text-[9px] sm:text-[9.5px] font-bold tracking-wider uppercase text-[#94A3B8] mt-0.5">
                    HYPERLOCAL MONSOON INTELLIGENCE
                  </span>
                </div>
              </Link>
            </div>

            {/* CENTER: Clean Horizontal Navigation */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-1.5">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-full transition-all ${
                      isActive
                        ? "text-white font-bold bg-[#176B4D] shadow-sm border border-[#34D399]/40"
                        : "text-[#D1E0DA] hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[#34D399] rounded-full shadow-[0_0_8px_#34D399]" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* RIGHT: Location Pill, Language, Notifications, Farmer Mode */}
            <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
              
              {/* Location Selector Pill */}
              <button
                type="button"
                onClick={() => setLocationModalOpen(true)}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#133228]/80 hover:bg-[#1A4235] border border-[#2D6652]/60 rounded-full transition-colors cursor-pointer shadow-xs backdrop-blur-md"
                title="Change Location"
              >
                <MapPin className="w-3.5 h-3.5 text-[#34D399]" />
                <span className="truncate max-w-[190px] text-gray-200">
                  {currentLocation.state ? `${currentLocation.state} / ${currentLocation.district} / ${currentLocation.name}` : "Madhya Pradesh / Shajapur / Shajapur Block"}
                </span>
                <ChevronDown className="w-3 h-3 text-gray-400" />
              </button>

              {/* Language Selector */}
              <button
                type="button"
                onClick={() => setLanguage(language === "en" ? "hi" : "en")}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-white bg-[#133228]/80 hover:bg-[#1A4235] border border-[#2D6652]/60 rounded-full transition-colors cursor-pointer shadow-xs backdrop-blur-md"
                title="Switch Language"
              >
                <Globe className="w-3.5 h-3.5 text-[#34D399]" />
                <span>{language === "en" ? "EN" : "हिंदी"}</span>
                <ChevronDown className="w-3 h-3 text-gray-400" />
              </button>

              {/* Notifications with Badge Count '3' */}
              <button
                type="button"
                onClick={() => setNotificationsOpen(true)}
                className="relative p-2 text-white bg-[#133228]/80 hover:bg-[#1A4235] border border-[#2D6652]/60 rounded-full transition-colors cursor-pointer shadow-xs backdrop-blur-md"
                title="View Climate Alerts"
              >
                <Bell className="w-3.5 h-3.5" />
                <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 bg-[#EA580C] text-white text-[9.5px] font-extrabold rounded-full flex items-center justify-center border-2 border-[#0C201A] shadow-xs">
                  3
                </span>
              </button>

              {/* Farmer Mode Button */}
              <button
                type="button"
                onClick={toggleFarmerMode}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-full border transition-all cursor-pointer shadow-md ${
                  farmerMode
                    ? "bg-[#34D399] text-[#0C201A] border-[#34D399] hover:bg-[#2BB882]"
                    : "bg-[#176B4D] text-white border-[#2F855A] hover:bg-[#1F7A53]"
                }`}
                title="Toggle Farmer Mode"
              >
                <Sprout className="w-3.5 h-3.5" />
                <span>
                  {farmerMode
                    ? (language === "hi" ? "किसान मोड: चालू" : "Farmer Mode: On")
                    : (language === "hi" ? "किसान मोड" : "Farmer Mode")}
                </span>
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="md:hidden flex items-center justify-around px-2 py-2 border-t border-[#2D6652]/40 bg-[#0C201A]/95 overflow-x-auto gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1 text-xs font-semibold whitespace-nowrap rounded-full transition-all ${
                  isActive
                    ? "text-white font-bold bg-[#176B4D] border border-[#34D399]/40"
                    : "text-[#D1E0DA] hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </header>

      {/* Global Modals */}
      <LocationModal />
      <NotificationsModal />
    </>
  );
}

export default Header;
