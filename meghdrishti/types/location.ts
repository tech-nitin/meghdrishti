export interface GeoLocation {
  id: string;
  name: string;
  district: string;
  state: string;
  block?: string;
  panchayat?: string;
  latitude: number;
  longitude: number;
  elevationMeters?: number;
  riskLevel?: "low" | "moderate" | "high" | "very-high";
  rainfallProbability?: number;
  onsetProbability?: number;
  breakRisk?: number;
  heavyRainRisk?: number;
  soilMoistureIndex?: number;
  sowingSuitability?: "favorable" | "caution" | "unfavorable";
}

export interface BlockRiskData {
  id: string;
  name: string;
  district: string;
  state: string;
  riskLevel: "low" | "moderate" | "high" | "very-high";
  rainfallProbability: number;
  onsetProbability: number;
  drySpellRisk: number;
  heavyRainRisk: number;
  soilMoisture: number; // percentage (e.g. 68%)
  sowingWindow: string;
  recommendedAction: string;
  panchayatsCount: number;
}
