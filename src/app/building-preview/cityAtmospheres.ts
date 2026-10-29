/* Prototype asset manifest for NeXora City Atmospheres.
   Two city identities and two GENUINELY DIFFERENT daylight/night photos each.
   Morning/late afternoon are intentional colour grades of the daylight photo.
   Production quality still requires viewpoint-matched captures or licensed time-lapse.
*/
export const CITY_OPTIONS = ["new-york", "tokyo"] as const;
export type CityId = typeof CITY_OPTIONS[number];
export type DayPhase = "morning" | "day" | "sunset" | "night";

export const CITY_ASSETS: Record<CityId, {
  label: string;
  day: string;
  night: string;
  daySource: string;
  nightSource: string;
  focalDesktop: string;
  focalMobile: string;
}> = {
  "new-york": {
    label: "Нью-Йорк",
    day: "https://images.unsplash.com/photo-1767749505538-23e71d1af2c5?auto=format&fit=crop&w=2400&q=85",
    night: "https://images.unsplash.com/photo-1554313553-41415c102e98?auto=format&fit=crop&w=2400&q=85",
    daySource: "https://images.unsplash.com/photo-1767749505538-23e71d1af2c5",
    nightSource: "https://unsplash.com/photos/cityscape-photo-at-night-6d0AJwfpD1Y",
    focalDesktop: "50% 43%",
    focalMobile: "50% 43%",
  },
  "tokyo": {
    label: "Токио",
    day: "https://images.unsplash.com/photo-1591194233688-dca69d406068?auto=format&fit=crop&w=2400&q=85",
    night: "https://images.unsplash.com/photo-1575669103814-1df2dab97b79?auto=format&fit=crop&w=2400&q=85",
    daySource: "https://unsplash.com/photos/a-view-of-a-large-city-with-tall-buildings-dyF1Q8kc0Fw",
    nightSource: "https://unsplash.com/photos/photography-of-high-rise-buildings-during-nighttime-tawcVvhXDjE",
    focalDesktop: "50% 44%",
    focalMobile: "72% 45%",
  },
};

export const DAY_PHASE_LABELS: Record<DayPhase, string> = {
  morning: "Утро", day: "День", sunset: "Закат", night: "Ночь",
};

/** Viewer-device clock, NOT the selected city's clock or astronomical sunrise. */
export function phaseForLocalHour(hour: number): DayPhase {
  if (hour >= 5 && hour < 10) return "morning";
  if (hour >= 10 && hour < 17) return "day";
  if (hour >= 17 && hour < 20) return "sunset";
  return "night";
}
