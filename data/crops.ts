import type { CropInfo } from "@/types/crop";

export const mockCrops: CropInfo[] = [
  {
    id: "crop-cotton",
    name: "Cotton",
    category: "kharif",
    optimalSowingWindow: {
      startMonth: 6,
      endMonth: 7,
    },
    stages: [],
  },
];
