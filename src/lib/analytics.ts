type EventName = "site_helper_open" | "site_helper_direction" | "site_helper_complete" | "whatsapp_click";
export function trackSiteEvent(name: EventName, fields: Record<string, string> = {}) {
  try {
    if (window.localStorage.getItem("nexora_analytics_consent") !== "granted") return;
    window.gtag?.("event", name, { page_path: window.location.pathname, ...fields });
  } catch { /* Analytics must never interrupt navigation. */ }
}
