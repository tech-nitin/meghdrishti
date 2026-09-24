import React from "react";

export interface ForecastSummaryProps {
  className?: string;
}

export function ForecastSummary({ className }: ForecastSummaryProps) {
  return <div className={className} />;
}

export default ForecastSummary;
