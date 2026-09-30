import type {
  MonsoonOnsetForecast,
  ForecastMetric,
  MonsoonPhaseTimelineItem,
  MonsoonPhase,
} from "@/types/forecast";

export interface PhaseSignalData {
  phase: MonsoonPhase;
  phaseLabel: string;
  statusBadge: string;
  rainfallProbability: number;
  next7DaysMm: number;
  onsetProbability: number;
  breakRisk: number;
  heavyRainRisk: number;
  soilMoistureTrend: string;
  shortSummary: string;
  fieldAdvice: string;
}

export const phaseSignals: Record<"active" | "break" | "revival", PhaseSignalData> = {
  active: {
    phase: "active",
    phaseLabel: "Active Phase",
    statusBadge: "ACTIVE",
    rainfallProbability: 78,
    next7DaysMm: 84.5,
    onsetProbability: 84,
    breakRisk: 18,
    heavyRainRisk: 11,
    soilMoistureTrend: "+14% increasing",
    shortSummary: "Strong moisture incursion from the Arabian Sea branch over Malwa plateau.",
    fieldAdvice: "Optimal sowing window open for Soybean and Maize. Ensure field drainage channels are cleared.",
  },
  break: {
    phase: "break",
    phaseLabel: "Break Phase Alert",
    statusBadge: "BREAK RISK",
    rainfallProbability: 32,
    next7DaysMm: 12.0,
    onsetProbability: 45,
    breakRisk: 72,
    heavyRainRisk: 4,
    soilMoistureTrend: "-8% declining",
    shortSummary: "Monsoon trough shifted towards Himalayan foothills; suppressed convective rain across Central India.",
    fieldAdvice: "Hold vegetative chemical sprays and top-dressing. Conserve topsoil moisture with light inter-cultivation.",
  },
  revival: {
    phase: "revival",
    phaseLabel: "Revival Phase Emerging",
    statusBadge: "REVIVAL",
    rainfallProbability: 64,
    next7DaysMm: 58.0,
    onsetProbability: 76,
    breakRisk: 28,
    heavyRainRisk: 22,
    soilMoistureTrend: "+9% recharging",
    shortSummary: "Bay of Bengal low pressure system moving west-northwestward restoring monsoon trough to normal position.",
    fieldAdvice: "Prepare for renewed moisture surge. Good window for foliar sprays 48 hours before peak revival.",
  },
};

export const mockMonsoonForecast: MonsoonOnsetForecast = {
  predictedOnsetDate: "18 June 2026",
  historicalAverageDate: "16 June",
  falseOnsetProbability: 14,
  confidenceScore: 89,
  phase: "active",
  phaseDescription: "Active monsoon surge established over Central India with steady Arabian Sea moisture feeding Malwa and Nimar agro-climatic zones.",
  next7DaysRainfallMm: 84.5,
  rainfallProbability: 78,
  onsetProbability: 84,
  breakRisk: 18,
  heavyRainRisk: 11,
};

export const mock30DayForecastMetrics: ForecastMetric[] = [
  // Days 1-7
  { date: "16 Jun", dayLabel: "Tue", forecastRainfall: 14.2, historicalAverage: 8.5, confidenceMin: 10.0, confidenceMax: 18.5, rainfallProbability: 75, condition: "Moderate Showers", temperatureMax: 32, temperatureMin: 24, humidity: 82 },
  { date: "17 Jun", dayLabel: "Wed", forecastRainfall: 22.8, historicalAverage: 9.1, confidenceMin: 16.2, confidenceMax: 29.4, rainfallProbability: 84, condition: "Steady Rainfall", temperatureMax: 30, temperatureMin: 23, humidity: 88 },
  { date: "18 Jun", dayLabel: "Thu", forecastRainfall: 18.5, historicalAverage: 9.8, confidenceMin: 12.0, confidenceMax: 24.0, rainfallProbability: 78, condition: "Moderate Rain", temperatureMax: 31, temperatureMin: 23, humidity: 85 },
  { date: "19 Jun", dayLabel: "Fri", forecastRainfall: 12.0, historicalAverage: 10.2, confidenceMin: 8.5, confidenceMax: 16.5, rainfallProbability: 72, condition: "Passing Showers", temperatureMax: 32, temperatureMin: 24, humidity: 80 },
  { date: "20 Jun", dayLabel: "Sat", forecastRainfall: 9.4, historicalAverage: 10.5, confidenceMin: 6.0, confidenceMax: 13.8, rainfallProbability: 65, condition: "Light Showers", temperatureMax: 33, temperatureMin: 25, humidity: 76 },
  { date: "21 Jun", dayLabel: "Sun", forecastRainfall: 5.2, historicalAverage: 11.0, confidenceMin: 2.5, confidenceMax: 9.0, rainfallProbability: 48, condition: "Partly Cloudy", temperatureMax: 34, temperatureMin: 25, humidity: 71 },
  { date: "22 Jun", dayLabel: "Mon", forecastRainfall: 2.4, historicalAverage: 11.4, confidenceMin: 0.8, confidenceMax: 6.0, rainfallProbability: 35, condition: "Scattered Clouds", temperatureMax: 35, temperatureMin: 26, humidity: 68 },
  // Days 8-14
  { date: "23 Jun", dayLabel: "Tue", forecastRainfall: 1.8, historicalAverage: 11.8, confidenceMin: 0.5, confidenceMax: 5.2, rainfallProbability: 30, condition: "Dry Spell Risk", temperatureMax: 35, temperatureMin: 26, humidity: 65 },
  { date: "24 Jun", dayLabel: "Wed", forecastRainfall: 3.1, historicalAverage: 12.0, confidenceMin: 1.0, confidenceMax: 7.0, rainfallProbability: 38, condition: "Isolated Drizzle", temperatureMax: 34, temperatureMin: 25, humidity: 68 },
  { date: "25 Jun", dayLabel: "Thu", forecastRainfall: 8.6, historicalAverage: 12.3, confidenceMin: 4.2, confidenceMax: 13.5, rainfallProbability: 58, condition: "Light Rain", temperatureMax: 33, temperatureMin: 24, humidity: 74 },
  { date: "26 Jun", dayLabel: "Fri", forecastRainfall: 16.4, historicalAverage: 12.5, confidenceMin: 11.0, confidenceMax: 22.0, rainfallProbability: 74, condition: "Revival Showers", temperatureMax: 31, temperatureMin: 23, humidity: 82 },
  { date: "27 Jun", dayLabel: "Sat", forecastRainfall: 24.5, historicalAverage: 12.8, confidenceMin: 18.0, confidenceMax: 31.0, rainfallProbability: 86, condition: "Heavy Downpour", temperatureMax: 29, temperatureMin: 22, humidity: 90 },
  { date: "28 Jun", dayLabel: "Sun", forecastRainfall: 19.2, historicalAverage: 13.0, confidenceMin: 13.5, confidenceMax: 26.0, rainfallProbability: 80, condition: "Moderate Rain", temperatureMax: 30, temperatureMin: 23, humidity: 86 },
  { date: "29 Jun", dayLabel: "Mon", forecastRainfall: 11.0, historicalAverage: 13.2, confidenceMin: 7.0, confidenceMax: 16.0, rainfallProbability: 68, condition: "Light Showers", temperatureMax: 32, temperatureMin: 24, humidity: 79 },
  // Days 15-21
  { date: "30 Jun", dayLabel: "Tue", forecastRainfall: 13.5, historicalAverage: 13.5, confidenceMin: 8.5, confidenceMax: 19.0, rainfallProbability: 70, condition: "Monsoon Showers", temperatureMax: 31, temperatureMin: 23, humidity: 83 },
  { date: "01 Jul", dayLabel: "Wed", forecastRainfall: 15.0, historicalAverage: 13.8, confidenceMin: 9.2, confidenceMax: 21.0, rainfallProbability: 73, condition: "Moderate Rain", temperatureMax: 31, temperatureMin: 23, humidity: 84 },
  { date: "02 Jul", dayLabel: "Thu", forecastRainfall: 14.8, historicalAverage: 14.0, confidenceMin: 8.8, confidenceMax: 20.5, rainfallProbability: 72, condition: "Intermittent Rain", temperatureMax: 31, temperatureMin: 23, humidity: 85 },
  { date: "03 Jul", dayLabel: "Fri", forecastRainfall: 12.6, historicalAverage: 14.2, confidenceMin: 7.0, confidenceMax: 18.0, rainfallProbability: 66, condition: "Passing Showers", temperatureMax: 32, temperatureMin: 24, humidity: 81 },
  { date: "04 Jul", dayLabel: "Sat", forecastRainfall: 10.4, historicalAverage: 14.4, confidenceMin: 5.5, confidenceMax: 15.8, rainfallProbability: 60, condition: "Scattered Rain", temperatureMax: 32, temperatureMin: 24, humidity: 78 },
  { date: "05 Jul", dayLabel: "Sun", forecastRainfall: 8.2, historicalAverage: 14.5, confidenceMin: 4.0, confidenceMax: 13.0, rainfallProbability: 54, condition: "Cloudy with Spells", temperatureMax: 33, temperatureMin: 25, humidity: 75 },
  { date: "06 Jul", dayLabel: "Mon", forecastRainfall: 9.0, historicalAverage: 14.6, confidenceMin: 4.8, confidenceMax: 14.0, rainfallProbability: 57, condition: "Light Showers", temperatureMax: 33, temperatureMin: 25, humidity: 76 },
  // Days 22-30
  { date: "07 Jul", dayLabel: "Tue", forecastRainfall: 11.2, historicalAverage: 14.8, confidenceMin: 6.0, confidenceMax: 17.0, rainfallProbability: 64, condition: "Steady Rain", temperatureMax: 32, temperatureMin: 24, humidity: 80 },
  { date: "08 Jul", dayLabel: "Wed", forecastRainfall: 16.5, historicalAverage: 15.0, confidenceMin: 10.5, confidenceMax: 23.5, rainfallProbability: 76, condition: "Monsoon Surge", temperatureMax: 30, temperatureMin: 23, humidity: 87 },
  { date: "09 Jul", dayLabel: "Thu", forecastRainfall: 20.0, historicalAverage: 15.2, confidenceMin: 13.0, confidenceMax: 28.0, rainfallProbability: 82, condition: "Heavy Rain Spells", temperatureMax: 29, temperatureMin: 22, humidity: 91 },
  { date: "10 Jul", dayLabel: "Fri", forecastRainfall: 17.4, historicalAverage: 15.3, confidenceMin: 11.0, confidenceMax: 25.0, rainfallProbability: 79, condition: "Active Rains", temperatureMax: 30, temperatureMin: 23, humidity: 88 },
  { date: "11 Jul", dayLabel: "Sat", forecastRainfall: 13.0, historicalAverage: 15.4, confidenceMin: 7.5, confidenceMax: 19.5, rainfallProbability: 69, condition: "Moderate Rain", temperatureMax: 31, temperatureMin: 23, humidity: 83 },
  { date: "12 Jul", dayLabel: "Sun", forecastRainfall: 10.5, historicalAverage: 15.5, confidenceMin: 5.5, confidenceMax: 16.5, rainfallProbability: 62, condition: "Light Showers", temperatureMax: 32, temperatureMin: 24, humidity: 79 },
  { date: "13 Jul", dayLabel: "Mon", forecastRainfall: 8.8, historicalAverage: 15.5, confidenceMin: 4.2, confidenceMax: 14.5, rainfallProbability: 55, condition: "Cloudy with Spells", temperatureMax: 33, temperatureMin: 25, humidity: 76 },
  { date: "14 Jul", dayLabel: "Tue", forecastRainfall: 9.6, historicalAverage: 15.6, confidenceMin: 5.0, confidenceMax: 15.0, rainfallProbability: 58, condition: "Passing Showers", temperatureMax: 32, temperatureMin: 24, humidity: 78 },
  { date: "15 Jul", dayLabel: "Wed", forecastRainfall: 12.0, historicalAverage: 15.8, confidenceMin: 6.8, confidenceMax: 18.0, rainfallProbability: 67, condition: "Moderate Rains", temperatureMax: 31, temperatureMin: 23, humidity: 82 },
];

export const mockPhaseTimeline: MonsoonPhaseTimelineItem[] = [
  {
    id: "phase-onset",
    phase: "Monsoon Onset",
    status: "completed",
    dates: "12 – 16 June",
    confidence: 94,
    description: "Southwest monsoon established over Central Madhya Pradesh with widespread initial rainfall.",
    rainfallExpected: "45–65 mm",
  },
  {
    id: "phase-active-1",
    phase: "First Active Surge",
    status: "current",
    dates: "17 – 21 June",
    confidence: 88,
    description: "Arabian Sea moisture vortex delivering consistent widespread precipitation across Malwa plateau.",
    rainfallExpected: "70–95 mm",
  },
  {
    id: "phase-break-1",
    phase: "Transient Break Spell",
    status: "upcoming",
    dates: "22 – 25 June",
    confidence: 76,
    description: "Sub-seasonal dry spell as monsoon trough shifts northward. 3-4 days of low precipitation.",
    rainfallExpected: "5–15 mm",
  },
  {
    id: "phase-revival-1",
    phase: "Bay Low Pressure Revival",
    status: "upcoming",
    dates: "26 – 30 June",
    confidence: 82,
    description: "Fresh low pressure depression from Bay of Bengal re-energizing rainfall across Shajapur and surrounding districts.",
    rainfallExpected: "60–85 mm",
  },
  {
    id: "phase-peak-july",
    phase: "Peak July Active Monsoon",
    status: "upcoming",
    dates: "01 – 20 July",
    confidence: 79,
    description: "Sustained peak monsoon vegetative phase with steady root-zone moisture saturation.",
    rainfallExpected: "180–240 mm",
  },
];
