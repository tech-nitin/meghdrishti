import React from "react";

export interface MonsoonStatusProps {
  className?: string;
}

export function MonsoonStatus({ className }: MonsoonStatusProps) {
  return <div className={className} />;
}

export default MonsoonStatus;
