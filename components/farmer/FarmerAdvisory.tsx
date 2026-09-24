import React from "react";

export interface FarmerAdvisoryProps {
  className?: string;
}

export function FarmerAdvisory({ className }: FarmerAdvisoryProps) {
  return <div className={className} />;
}

export default FarmerAdvisory;
