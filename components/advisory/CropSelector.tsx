import React from "react";

export interface CropSelectorProps {
  className?: string;
}

export function CropSelector({ className }: CropSelectorProps) {
  return <div className={className} />;
}

export default CropSelector;
