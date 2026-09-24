"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Globe, Sprout } from "lucide-react";
import { LocationSelector } from "./LocationSelector";

export interface HeaderProps {
  className?: string;
}

const NAV_LINKS = [
  { label: "Overview", href: "/dashboard" },
  { label: "Risk Map", href: "/map" },
  { label: "Forecast", href: "/forecast" },
  { label: "Advisory", href: "/advisory" },
];

export function Header({ className = "" }: HeaderProps) {
  const pathname = usePathname();

  return (
    <header
      className={`sticky top-0 z-40 w-full bg-[#FFFFFF] border-b border-[#DDE4DE] ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* LEFT: Branding */}
          <div className="flex items-center gap-3 shrink-0">
            <Link href="/" className="group flex flex-col">
              <span className="text-base font-bold tracking-tight text-[#176B4D] group-hover:text-[#2F8F62] transition-colors">
                MEGHDRISHTI
              </span>
              <span className="text-[10px] tracking-wider uppercase text-[#65736B] font-medium -mt-0.5">
                Hyperlocal Monsoon Intelligence
              </span>
            </Link>
          </div>

          {/* CENTER: Navigation Links */}
          <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-1 scrollbar-none">
            {NAV_LINKS.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href === "/dashboard" && pathname === "/");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md whitespace-nowrap transition-colors ${
                    isActive
                      ? "bg-[#E8F3EC] text-[#176B4D]"
                      : "text-[#65736B] hover:text-[#17211C] hover:bg-[#F7F8F5]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* RIGHT: Location, Language, Notifications, Farmer Mode */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Location Selector */}
            <div className="hidden md:block">
              <LocationSelector />
            </div>

            {/* Language */}
            <button
              type="button"
              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-[#65736B] hover:text-[#17211C] hover:bg-[#F7F8F5] rounded-md transition-colors"
              title="Change Language"
            >
              <Globe className="size-3.5" />
              <span className="hidden sm:inline">EN</span>
            </button>

            {/* Notifications */}
            <button
              type="button"
              className="relative p-1.5 text-[#65736B] hover:text-[#17211C] hover:bg-[#F7F8F5] rounded-md transition-colors"
              title="Notifications"
            >
              <Bell className="size-4" />
              <span className="absolute top-1 right-1 size-2 bg-[#D99A18] rounded-full" />
            </button>

            {/* Farmer Mode */}
            <Link
              href="/farmer"
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md border transition-all ${
                pathname === "/farmer"
                  ? "bg-[#176B4D] text-[#FFFFFF] border-[#176B4D]"
                  : "bg-[#E8F3EC] text-[#176B4D] border-[#DDE4DE] hover:bg-[#176B4D] hover:text-[#FFFFFF] hover:border-[#176B4D]"
              }`}
            >
              <Sprout className="size-3.5" />
              <span className="hidden sm:inline">Farmer Mode</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
