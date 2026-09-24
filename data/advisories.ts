import type { AdvisoryItem } from "@/types/advisory";

export const mockAdvisories: AdvisoryItem[] = [
  {
    id: "adv-1",
    locationId: "loc-nagpur",
    severity: "medium",
    title: "Sowing Preparation",
    recommendation:
      "Delay deep sowing until soil moisture stabilizes after initial onset showers.",
    issueDate: "2026-06-01",
    validUntil: "2026-06-15",
  },
];
