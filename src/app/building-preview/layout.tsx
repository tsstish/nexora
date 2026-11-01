import type { ReactNode } from "react";
import { CurrencyProvider } from "./CurrencyControl";
import { CityAtmosphereProvider } from "./CityAtmosphereProvider";
import { StudioFooter } from "./StudioFooter";
import "./currency.css";
import "./StudioSystem.css";
import "./ConsentMobile.css";

export default function PreviewLayout({ children }: { children: ReactNode }) {
  return (
    <CurrencyProvider>
      <CityAtmosphereProvider>
        {children}
        <StudioFooter />
      </CityAtmosphereProvider>
    </CurrencyProvider>
  );
}
