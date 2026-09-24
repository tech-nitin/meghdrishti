export type MonsoonPhase =
  | "pre-monsoon"
  | "onset"
  | "active"
  | "break"
  | "withdrawal";

export interface ForecastMetric {
  date: string;
  rainfallMm: number;
  confidence: number;
  temperatureMax?: number;
  temperatureMin?: number;
}

export interface MonsoonOnsetForecast {
  predictedOnsetDate: string;
  historicalAverageDate: string;
  falseOnsetProbability: number;
  confidenceScore: number;
  phase: MonsoonPhase;
}
