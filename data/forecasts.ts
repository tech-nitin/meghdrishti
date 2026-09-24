import type { MonsoonOnsetForecast, ForecastMetric } from "@/types/forecast";

export const mockMonsoonForecast: MonsoonOnsetForecast = {
  predictedOnsetDate: "2026-06-12",
  historicalAverageDate: "2026-06-10",
  falseOnsetProbability: 18,
  confidenceScore: 86,
  phase: "pre-monsoon",
};

export const mockForecastMetrics: ForecastMetric[] = [];
