import React from "react";

export interface RiskOverviewProps {
  className?: string;
}

export function RiskOverview({ className }: RiskOverviewProps) {
  return <div className={className} />;
}

export default RiskOverview;
