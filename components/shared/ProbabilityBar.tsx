import React from "react";

export interface ProbabilityBarProps {
  value: number; // 0-100
  max?: number;
  variant?: "primary" | "rainfall" | "warning" | "danger";
  showLabel?: boolean;
  className?: string;
}

export function ProbabilityBar({
  value,
  max = 100,
  variant = "primary",
  showLabel = false,
  className = "",
}: ProbabilityBarProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  const barColors = {
    primary: "bg-[#176B4D]",
    rainfall: "bg-[#4A90C2]",
    warning: "bg-[#D99A18]",
    danger: "bg-[#D9574A]",
  }[variant];

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center text-xs font-medium text-[#65736B] mb-1">
          <span>Probability</span>
          <span className="text-[#17211C] font-semibold">{Math.round(percentage)}%</span>
        </div>
      )}
      <div className="w-full h-2 bg-[#DDE4DE] rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-300 ${barColors}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export default ProbabilityBar;
