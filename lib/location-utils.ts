import type { GeoLocation } from "@/types/location";

export function findLocationById(
  locations: GeoLocation[],
  id: string
): GeoLocation | undefined {
  return locations.find((loc) => loc.id === id);
}
