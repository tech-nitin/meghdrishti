export type WaterRequirement = "low" | "medium" | "high" | "critical";

export type CropCategory = "kharif" | "rabi" | "zaid";

export interface CropStage {
  id: string;
  name: string;
  durationDays: number;
  waterRequirement: WaterRequirement;
}

export interface CropInfo {
  id: string;
  name: string;
  category: CropCategory;
  optimalSowingWindow: {
    startMonth: number;
    endMonth: number;
  };
  stages: CropStage[];
}
