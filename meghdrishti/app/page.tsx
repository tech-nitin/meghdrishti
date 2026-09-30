"use client";

import React from "react";
import { AppShell } from "@/components/layout/AppShell";
import { HeroOverview } from "@/components/overview/HeroOverview";
import { FeatureCards } from "@/components/overview/FeatureCards";
import { QuickIntelligenceSnapshot } from "@/components/overview/QuickIntelligenceSnapshot";

export default function HomePage() {
  return (
    <AppShell transparentHeader={true}>
      <HeroOverview />
      <FeatureCards />
      <QuickIntelligenceSnapshot />
    </AppShell>
  );
}
