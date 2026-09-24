import React from "react";

export interface ConfidenceCardProps {
  className?: string;
}

export function ConfidenceCard({ className }: ConfidenceCardProps) {
  return <div className={className} />;
}

export default ConfidenceCard;
