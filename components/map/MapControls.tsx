import React from "react";

export interface MapControlsProps {
  className?: string;
}

export function MapControls({ className }: MapControlsProps) {
  return <div className={className} />;
}

export default MapControls;
