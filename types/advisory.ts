export type AdvisorySeverity = "low" | "medium" | "high" | "critical";

export interface AdvisoryItem {
  id: string;
  locationId: string;
  cropId?: string;
  severity: AdvisorySeverity;
  title: string;
  recommendation: string;
  issueDate: string;
  validUntil: string;
}
