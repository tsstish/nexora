import type { ReactNode } from "react";
import { CurrencyProvider } from "./CurrencyControl";
import { StudioFooter } from "./StudioFooter";
import "./currency.css";
import "./StudioSystem.css";

export default function PreviewLayout({ children }: { children: ReactNode }) {
  return (
    <CurrencyProvider>
      {children}
      <StudioFooter />
    </CurrencyProvider>
  );
}
