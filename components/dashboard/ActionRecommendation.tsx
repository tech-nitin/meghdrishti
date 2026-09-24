import React from "react";

export interface ActionRecommendationProps {
  className?: string;
}

export function ActionRecommendation({ className }: ActionRecommendationProps) {
  return <div className={className} />;
}

export default ActionRecommendation;
