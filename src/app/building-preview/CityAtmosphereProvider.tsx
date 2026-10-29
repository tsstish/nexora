"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { CITY_ASSETS, phaseForVisitorClock, type CityId, type DayPhase } from "./cityAtmospheres";

const STORAGE_KEY = "nexora:city:v2";
type CityAtmosphere = {
  city: CityId;
  phase: DayPhase;
  hydrated: boolean;
  manualPhase: DayPhase | null;
  chooseCity: (city: CityId) => void;
  previewPhase: (phase: DayPhase | null) => void;
};

const CityAtmosphereContext = createContext<CityAtmosphere | null>(null);

function safeCity(value: string | null): CityId | null {
  return value && Object.prototype.hasOwnProperty.call(CITY_ASSETS, value) ? value as CityId : null;
}

export function CityAtmosphereProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [city, setCity] = useState<CityId>("new-york");
  const [localPhase, setLocalPhase] = useState<DayPhase>("day");
  const [manualPhase, setManualPhase] = useState<DayPhase | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Browser-only values are never read during SSR, preventing hydration mismatches.
    let chosen: CityId | null = null;
    try { chosen = safeCity(window.sessionStorage.getItem(STORAGE_KEY)); } catch { /* private mode */ }
    if (!chosen) {
      chosen = "new-york";
      try { window.sessionStorage.setItem(STORAGE_KEY, chosen); } catch { /* storage disabled */ }
    }
    setCity(chosen);
    setLocalPhase(phaseForVisitorClock(new Date()));
    setHydrated(true);

    const refresh = () => setLocalPhase(phaseForVisitorClock(new Date()));
    const interval = window.setInterval(refresh, 60_000);
    document.addEventListener("visibilitychange", refresh);
    return () => {
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", refresh);
    };
  }, []);

  // The manual clock is strictly a debug feature on /atmospheres.
  useEffect(() => {
    if (pathname !== "/building-preview/atmospheres") setManualPhase(null);
  }, [pathname]);

  const chooseCity = (next: CityId) => {
    setCity(next);
    try { window.sessionStorage.setItem(STORAGE_KEY, next); } catch { /* storage disabled */ }
  };

  const value = useMemo<CityAtmosphere>(() => ({
    city, phase: manualPhase ?? localPhase, hydrated,
    manualPhase, chooseCity, previewPhase: setManualPhase,
  }), [city, manualPhase, localPhase, hydrated]);

  return <CityAtmosphereContext.Provider value={value}>{children}</CityAtmosphereContext.Provider>;
}

export function useCityAtmosphere() {
  const value = useContext(CityAtmosphereContext);
  if (!value) throw new Error("useCityAtmosphere must be inside CityAtmosphereProvider");
  return value;
}
