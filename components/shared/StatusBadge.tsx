import React from "react";

export type StatusVariant = "success" | "warning" | "danger" | "rainfall" | "neutral";

export interface StatusBadgeProps {
  status: string;
  variant?: StatusVariant;
  className?: string;
  dot?: boolean;
}

export function StatusBadge({
  status,
  variant = "neutral",
  className = "",
  dot = true,
}: StatusBadgeProps) {
  const styles: Record<StatusVariant, { bg: string; text: string; dotColor: string }> = {
    success: {
      bg: "bg-[#E8F3EC]",
      text: "text-[#176B4D]",
      dotColor: "bg-[#176B4D]",
    },
    warning: {
      bg: "bg-[#FFF4D6]",
      text: "text-[#D99A18]",
      dotColor: "bg-[#D99A18]",
    },
    danger: {
      bg: "bg-[#FDE8E7]",
      text: "text-[#D9574A]",
      dotColor: "bg-[#D9574A]",
    },
    rainfall: {
      bg: "bg-[#E8F2FA]",
      text: "text-[#4A90C2]",
      dotColor: "bg-[#4A90C2]",
    },
    neutral: {
      bg: "bg-[#F3EFE5]",
      text: "text-[#65736B]",
      dotColor: "bg-[#65736B]",
    },
  };

  const current = styles[variant];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${current.bg} ${current.text} ${className}`}
    >
      {dot && <span className={`size-1.5 rounded-full ${current.dotColor}`} />}
      {status}
    </span>
  );
}

export default StatusBadge;
