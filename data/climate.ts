export interface ClimateDriver {
  id: string;
  name: string;
  value: string;
  status: "neutral" | "positive" | "negative";
  impact: string;
}

export const mockClimateDrivers: ClimateDriver[] = [
  {
    id: "enso",
    name: "ENSO (El Niño/La Niña)",
    value: "Neutral-Cool",
    status: "positive",
    impact: "Favorable for monsoon precipitation",
  },
];
