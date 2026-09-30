"use client";

import React from "react";
import { FarmerDashboard } from "./FarmerDashboard";

export interface FarmerAdvisoryProps {
  className?: string;
}

export function FarmerAdvisory({ className = "" }: FarmerAdvisoryProps) {
  return (
    <div className={className}>
      <FarmerDashboard />
    </div>
  );
}

export default FarmerAdvisory;
