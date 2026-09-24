import React from "react";
import { Info } from "lucide-react";

export interface EmptyStateProps {
  title?: string;
  message?: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  title = "No data available",
  message = "There is currently no information recorded for this selection.",
  action,
  className = "",
}: EmptyStateProps) {
  return (
    <div
      className={`p-8 text-center bg-[#FFFFFF] border border-[#DDE4DE] rounded-lg flex flex-col items-center justify-center ${className}`}
    >
      <div className="size-10 rounded-full bg-[#E8F3EC] flex items-center justify-center text-[#176B4D] mb-3">
        <Info className="size-5" />
      </div>
      <h3 className="text-sm font-semibold text-[#17211C]">{title}</h3>
      <p className="mt-1 text-xs text-[#65736B] max-w-sm">{message}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export default EmptyState;
