"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { type Currency, type PriceGroup, formatCurrency, localizedPrice } from "./marketPrices";

type CurrencyState = { currency: Currency; setCurrency: (next: Currency) => void };
const Context = createContext<CurrencyState | null>(null);
const options: Currency[] = ["ILS", "USD", "RUB"];
const symbols: Record<Currency, string> = { ILS: "₪", USD: "$", RUB: "₽" };

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<Currency>("ILS");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("nexora-preview-currency");
      if (saved && options.includes(saved as Currency)) setCurrency(saved as Currency);
    } catch { /* localStorage may be unavailable */ }
  }, []);

  const value = useMemo(() => ({
    currency,
    setCurrency: (next: Currency) => {
      setCurrency(next);
      try { window.localStorage.setItem("nexora-preview-currency", next); } catch { /* optional */ }
    },
  }), [currency]);

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

function useCurrency() {
  const context = useContext(Context);
  if (!context) throw new Error("Use currency UI under CurrencyProvider");
  return context;
}

export function CurrencySelector() {
  const { currency, setCurrency } = useCurrency();
  return (
    <div className="loft-currency-control" role="group" aria-label="Выбор валюты цен">
      {options.map((item) => (
        <button
          type="button" key={item}
          className={currency === item ? "is-active" : ""}
          aria-pressed={currency === item}
          title={item === "ILS" ? "Шекели — действующий прайс" : "Предварительные цены — на согласовании"}
          onClick={() => setCurrency(item)}
        >
          {symbols[item]}
        </button>
      ))}
    </div>
  );
}

export function CurrencyPrice({
  group, priceId, ils, prefix = "", perMonth = false, className = "",
}: {
  group: PriceGroup; priceId: string; ils: number; prefix?: string; perMonth?: boolean; className?: string;
}) {
  const { currency } = useCurrency();
  const value = localizedPrice(group, priceId, ils, currency);
  return (
    <span className={className}>
      {prefix}{value === null ? "Цена уточняется" : formatCurrency(value, currency)}
      {perMonth && <small className="loft-price-unit"> / мес.</small>}
      {currency !== "ILS" && <small className="loft-draft-price" title="Предварительный прайс, не утвержден">проект цены</small>}
    </span>
  );
}
