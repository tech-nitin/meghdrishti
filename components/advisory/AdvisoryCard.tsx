import React from "react";

export interface AdvisoryCardProps {
  className?: string;
}

export function AdvisoryCard({ className }: AdvisoryCardProps) {
  return <div className={className} />;
}

export default AdvisoryCard;
