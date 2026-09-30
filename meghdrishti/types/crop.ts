export type WaterRequirement = "low" | "medium" | "high" | "critical";

export type CropCategory = "kharif" | "rabi" | "zaid";

export interface FieldActionItem {
  id: string;
  stepNumber: string;
  title: string;
  titleHindi: string;
  description: string;
  descriptionHindi: string;
  iconName?: "seedling" | "cloud-rain" | "droplets" | "calendar" | "shield-check" | "check-circle";
}

export interface CropStage {
  id: string;
  name: string;
  nameHindi?: string;
  durationDays: number;
  waterRequirement: WaterRequirement;
  sensitivityToDeficit: "critical" | "high" | "medium" | "low";
  advisoryNote: string;
  advisoryNoteHindi?: string;
  keyConcern?: string;
  keyConcernHindi?: string;
  actionGuidance?: string;
  actionGuidanceHindi?: string;
}

export interface CropInfo {
  id: string;
  name: string;
  hindiName: string;
  category: CropCategory;
  season?: string;
  image?: string;
  varieties: string[];
  optimalSowingWindow: {
    startMonth: number;
    startDay: number;
    endMonth: number;
    endDay: number;
    formatted: string;
    formattedHindi?: string;
  };
  rainfallThresholdMm: number;
  sowingDepth?: string;
  seedTreatment?: string;
  seedTreatmentHindi?: string;
  priority?: "actionable" | "monitor" | "wait";
  currentStatus: "sow_ready" | "wait_for_rain" | "high_risk";
  statusText?: string;
  statusTextHindi?: string;
  recommendation: string;
  recommendationHindi: string;
  reason: string;
  reasonHindi: string;
  fieldActions?: FieldActionItem[];
  stages: CropStage[];
}
