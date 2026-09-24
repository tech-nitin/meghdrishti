import React from "react";
import { Loader2 } from "lucide-react";

export interface LoadingStateProps {
  message?: string;
  className?: string;
}

export function LoadingState({
  message = "Loading climate intelligence...",
  className = "",
}: LoadingStateProps) {
  return (
    <div
      className={`p-8 text-center flex flex-col items-center justify-center gap-3 ${className}`}
    >
      <Loader2 className="size-6 text-[#176B4D] animate-spin" />
      <p className="text-xs font-medium text-[#65736B]">{message}</p>
    </div>
  );
}

export default LoadingState;
