import React from "react";

export interface PhaseTimelineProps {
  className?: string;
}

export function PhaseTimeline({ className }: PhaseTimelineProps) {
  return <div className={className} />;
}

export default PhaseTimeline;
