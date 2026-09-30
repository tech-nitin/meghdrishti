"use client";

import React from "react";
import { ForecastChart } from "./ForecastChart";

export interface ForecastSummaryProps {
  className?: string;
}

export function ForecastSummary({ className = "" }: ForecastSummaryProps) {
  return (
    <div className={className}>
      <ForecastChart />
    </div>
  );
}

export default ForecastSummary;
