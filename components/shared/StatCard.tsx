import React from "react";

export interface StatCardProps {
  label: string;
  value: string | number;
  unit?: string;
  change?: string;
  changeType?: "positive" | "negative" | "neutral" | "warning";
  caption?: string;
  icon?: React.ReactNode;
  className?: string;
}

export function StatCard({
  label,
  value,
  unit,
  change,
  changeType = "neutral",
  caption,
  icon,
  className = "",
}: StatCardProps) {
  const changeColorClass = {
    positive: "text-[#176B4D] bg-[#E8F3EC]",
    negative: "text-[#D9574A] bg-[#FDE8E7]",
    warning: "text-[#D99A18] bg-[#FFF4D6]",
    neutral: "text-[#65736B] bg-[#F3EFE5]",
  }[changeType];

  return (
    <div
      className={`p-5 bg-[#FFFFFF] border border-[#DDE4DE] rounded-lg shadow-xs flex flex-col justify-between ${className}`}
    >
      <div className="flex items-center justify-between text-xs font-medium text-[#65736B]">
        <span>{label}</span>
        {icon && <span className="text-[#65736B]">{icon}</span>}
      </div>

      <div className="mt-3 flex items-baseline gap-1.5">
        <span className="text-2xl font-bold tracking-tight text-[#17211C]">
          {value}
        </span>
        {unit && <span className="text-xs font-medium text-[#65736B]">{unit}</span>}
      </div>

      {(change || caption) && (
        <div className="mt-2.5 flex items-center gap-2 text-xs">
          {change && (
            <span
              className={`px-1.5 py-0.5 rounded text-[11px] font-semibold ${changeColorClass}`}
            >
              {change}
            </span>
          )}
          {caption && <span className="text-[#65736B] text-[11px]">{caption}</span>}
        </div>
      )}
    </div>
  );
}

export default StatCard;
