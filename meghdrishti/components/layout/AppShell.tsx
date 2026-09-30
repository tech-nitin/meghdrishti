"use client";

import React from "react";
import { Header } from "./Header";
import { SeasonalBackground3D } from "@/components/background/SeasonalBackground3D";

export interface AppShellProps {
  children?: React.ReactNode;
  className?: string;
  transparentHeader?: boolean;
  show3DRain?: boolean;
}

export function AppShell({
  children,
  className = "",
  transparentHeader = false,
  show3DRain = true,
}: AppShellProps) {
  return (
    <div className="relative min-h-screen flex flex-col text-[#18342C] overflow-x-hidden">
      {/* Global 3D Animated Seasonal Background */}
      {show3DRain && <SeasonalBackground3D />}

      {/* Header */}
      <Header transparentOverHero={transparentHeader} />

      {/* Main Content Canvas */}
      <main className={`relative z-10 flex-1 w-full ${className}`}>{children}</main>
    </div>
  );
}

export default AppShell;

