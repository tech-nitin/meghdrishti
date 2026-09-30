"use client";

import React from "react";
import { AppShell } from "@/components/layout/AppShell";
import { FarmerDashboard } from "@/components/farmer/FarmerDashboard";

export default function FarmerPage() {
  return (
    <AppShell>
      <FarmerDashboard />
    </AppShell>
  );
}
