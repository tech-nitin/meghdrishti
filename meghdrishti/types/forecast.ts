export type MonsoonPhase =
  | "active"
  | "break"
  | "revival"
  | "pre-monsoon"
  | "onset"
  | "withdrawal";

export interface ForecastMetric {
  date: string;
  dayLabel: string;
  forecastRainfall: number; // mm
  historicalAverage: number; // mm
  confidenceMin: number; // lower bound
  confidenceMax: number; // upper bound
  rainfallProbability: number; // %
  condition: string;
  temperatureMax?: number;
  temperatureMin?: number;
  humidity?: number;
  windSpeed?: number;
}

export interface MonsoonOnsetForecast {
  predictedOnsetDate: string;
  historicalAverageDate: string;
  falseOnsetProbability: number;
  confidenceScore: number;
  phase: MonsoonPhase;
  phaseDescription: string;
  next7DaysRainfallMm: number;
  rainfallProbability: number;
  onsetProbability: number;
  breakRisk: number;
  heavyRainRisk: number;
}

export interface MonsoonPhaseTimelineItem {
  id: string;
  phase: string;
  status: "completed" | "current" | "upcoming";
  dates: string;
  confidence: number;
  description: string;
  rainfallExpected: string;
}

export interface ClimateDriver {
  id: string;
  name: string;
  abbreviation: string;
  value: string;
  status: "positive" | "neutral" | "caution" | "negative";
  impact: string;
  trend: "strengthening" | "steady" | "weakening";
  updatedAt: string;
}
