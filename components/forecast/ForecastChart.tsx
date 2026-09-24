import React from "react";

export interface ForecastChartProps {
  className?: string;
}

export function ForecastChart({ className }: ForecastChartProps) {
  return <div className={className} />;
}

export default ForecastChart;
