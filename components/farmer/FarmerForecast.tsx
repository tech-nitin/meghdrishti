import React from "react";

export interface FarmerForecastProps {
  className?: string;
}

export function FarmerForecast({ className }: FarmerForecastProps) {
  return <div className={className} />;
}

export default FarmerForecast;
