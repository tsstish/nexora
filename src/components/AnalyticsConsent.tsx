"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type Consent = "granted" | "denied" | null;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

const STORAGE_KEY = "nexora_analytics_consent";

export function AnalyticsConsent() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const pathname = usePathname();
  const [consent, setConsent] = useState<Consent>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY) as Consent;
    if (saved === "granted" || saved === "denied") setConsent(saved);
    setReady(true);
  }, []);

  useEffect(() => {
    if (consent !== "granted") return;
    if (gaId && typeof window.gtag === "function") {
      window.gtag("event", "page_view", { page_path: pathname });
    }
    if (metaPixelId && typeof window.fbq === "function") {
      window.fbq("track", "PageView");
    }
  }, [pathname, consent, gaId, metaPixelId]);

  if (!gaId && !metaPixelId) return null;

  const choose = (value: Exclude<Consent, null>) => {
    window.localStorage.setItem(STORAGE_KEY, value);
    setConsent(value);
  };

  return <>
    {consent === "granted" && gaId && <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
      <Script id="nexora-ga4" strategy="afterInteractive" dangerouslySetInnerHTML={{__html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        window.gtag = gtag;
        gtag('js', new Date());
        gtag('config', '${gaId}', { send_page_view: true, anonymize_ip: true });
      `}} />
    </>}

    {consent === "granted" && metaPixelId && <Script id="nexora-meta-pixel" strategy="afterInteractive" dangerouslySetInnerHTML={{__html: `
      !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
      n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
      (window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${metaPixelId}');
      fbq('track', 'PageView');
    `}} />}

    {ready && consent === null && <aside className="consent-banner" aria-label="Настройки аналитики">
      <div><b>Аналитика сайта</b><p>Мы можем использовать Google Analytics и Meta Pixel, чтобы понимать, какие страницы и кнопки полезны посетителям. Необязательные счётчики включаются только после вашего согласия.</p></div>
      <div className="consent-actions"><button className="consent-secondary" onClick={() => choose("denied")}>Только необходимое</button><button className="consent-primary" onClick={() => choose("granted")}>Разрешить аналитику</button></div>
    </aside>}
  </>;
}
