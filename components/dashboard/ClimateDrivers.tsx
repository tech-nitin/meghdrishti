import React from "react";

export interface ClimateDriversProps {
  className?: string;
}

export function ClimateDrivers({ className }: ClimateDriversProps) {
  return <div className={className} />;
}

export default ClimateDrivers;
