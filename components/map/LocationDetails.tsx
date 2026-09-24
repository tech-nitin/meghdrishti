import React from "react";

export interface LocationDetailsProps {
  className?: string;
}

export function LocationDetails({ className }: LocationDetailsProps) {
  return <div className={className} />;
}

export default LocationDetails;
