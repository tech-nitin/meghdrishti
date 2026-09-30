export type AdvisorySeverity = "low" | "medium" | "high" | "critical";

export interface AdvisoryItem {
  id: string;
  locationId: string;
  cropId?: string;
  cropName?: string;
  severity: AdvisorySeverity;
  category: "sowing" | "irrigation" | "protection" | "weather_warning";
  title: string;
  titleHindi: string;
  recommendation: string;
  recommendationHindi: string;
  reason: string;
  reasonHindi: string;
  actionItems: string[];
  actionItemsHindi: string[];
  issueDate: string;
  validUntil: string;
  source: string;
}
