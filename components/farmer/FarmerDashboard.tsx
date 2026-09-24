import React from "react";

export interface FarmerDashboardProps {
  className?: string;
}

export function FarmerDashboard({ className }: FarmerDashboardProps) {
  return <div className={className} />;
}

export default FarmerDashboard;
