import type { ReactNode } from "react";
import { CurrencyProvider } from "./CurrencyControl";
import "./currency.css";

export default function PreviewLayout({ children }: { children: ReactNode }) {
  return <CurrencyProvider>{children}</CurrencyProvider>;
}
