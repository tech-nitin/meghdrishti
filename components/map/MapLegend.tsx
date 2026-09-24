import React from "react";

export interface MapLegendProps {
  className?: string;
}

export function MapLegend({ className }: MapLegendProps) {
  return <div className={className} />;
}

export default MapLegend;
