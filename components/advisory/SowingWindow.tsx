import React from "react";

export interface SowingWindowProps {
  className?: string;
}

export function SowingWindow({ className }: SowingWindowProps) {
  return <div className={className} />;
}

export default SowingWindow;
