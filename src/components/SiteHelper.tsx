"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { whatsappUrl } from "@/data/site";
import { trackSiteEvent } from "@/lib/analytics";
import styles from "./SiteHelper.module.css";

type Direction = "ready" | "custom" | "help";
const labels = { ready: "Готовый сайт Ready", custom: "Индивидуальная разработка", help: "Помощь с выбором" };
export function SiteHelper() {
  const [open, setOpen] = useState(false);
  const [direction, setDirection] = useState<Direction | null>(null);
  const [goal, setGoal] = useState("");
  const [scope, setScope] = useState("");
  const panel = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  useEffect(() => { setOpen(false); setDirection(null); setGoal(""); setScope(""); }, [pathname]);
  useEffect(() => {
    if (!open) return;
    panel.current?.focus();
    function key(event: KeyboardEvent) {
      if (event.key === "Escape") { setOpen(false); trigger.current?.focus(); }
    }
    function outside(event: PointerEvent) {
      if (!panel.current?.contains(event.target as Node) && !trigger.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("keydown", key);
    document.addEventListener("pointerdown", outside);
    return () => { document.removeEventListener("keydown", key); document.removeEventListener("pointerdown", outside); };
  }, [open]);
  // Count all WhatsApp links, not only this panel. Never send message text or phone numbers.
  useEffect(() => {
    function click(event: MouseEvent) {
      const anchor = (event.target as Element)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!anchor) return;
      const url = new URL(anchor.href, window.location.href);
      if (!["wa.me", "api.whatsapp.com"].includes(url.hostname)) return;
      trackSiteEvent("whatsapp_click", { placement: anchor.closest("[data-site-helper]") ? "helper" : anchor.closest("header") ? "header" : anchor.closest("footer") ? "footer" : "content", direction: anchor.dataset.direction || "unspecified" });
    }
    document.addEventListener("click", click);
    return () => document.removeEventListener("click", click);
  }, []);
  if (pathname.startsWith("/brief")) return null;
  const message = `Здравствуйте! Пишу с сайта Nexora. ${direction ? `Интересует: ${labels[direction]}.` : "Хочу обсудить сайт для моего бизнеса."}${goal ? ` Задача: ${goal}.` : ""}${scope ? ` Объём: ${scope}.` : ""}`;
  const store = goal === "Продавать товары онлайн";
  const ready = !store && scope !== "Особые функции";
  return <div className={styles.root} data-site-helper>
    {open && <div className={styles.panel} id="nexora-site-helper" role="dialog" aria-modal="false" aria-labelledby="helper-title" tabIndex={-1} ref={panel}>
      <div className={styles.top}><span>NEXORA · ДАВАЙТЕ ОБСУДИМ</span><button aria-label="Закрыть помощь" onClick={() => { setOpen(false); trigger.current?.focus(); }}>×</button></div>
      <h2 id="helper-title">С чего начнём ваш сайт?</h2>
      <p>Поможем выбрать формат и понять бюджет</p>
      {!direction ? <div className={styles.options}>{(["ready", "custom", "help"] as Direction[]).map((key) => <button key={key} onClick={() => { setDirection(key); trackSiteEvent("site_helper_direction", { direction: key }); }}>{key === "ready" ? "Выбрать готовую основу" : key === "custom" ? "Заказать индивидуальный сайт" : "Помогите определиться"}<span>↗</span></button>)}</div> : <>
        <button className={styles.back} onClick={() => { setDirection(null); setGoal(""); setScope(""); }}>← Все варианты</button>
        {direction === "ready" && <div className={styles.result}><p>Посмотрите живые концепции. Выбранный сайт адаптируем под ваш бизнес — с покупкой или по подписке.</p><Link href="/ready">Выбрать концепцию →</Link><Link href="/ready/monthly">Условия подписки →</Link></div>}
        {direction === "custom" && <div className={styles.result}><p>Продумываем структуру, дизайн и функции под вашу задачу. Начнём с того, что сайт должен делать для бизнеса.</p><Link href="/services">Форматы и стоимость →</Link></div>}
        {direction === "help" && <div className={styles.options}>
          {!goal ? <><p>Что сайт должен помочь сделать?</p>{["Представить услуги", "Получать заявки", "Продавать товары онлайн"].map(value => <button key={value} onClick={() => setGoal(value)}>{value}<span>→</span></button>)}</> : !scope ? <><p>Какой объём вы представляете?</p>{["Одна страница", "Несколько разделов", "Особые функции", "Пока не знаю"].map(value => <button key={value} onClick={() => { setScope(value); trackSiteEvent("site_helper_complete", { direction: "help", goal: value === "Особые функции" ? "custom_features" : store ? "commerce" : "services", scope: ["Одна страница", "Несколько разделов", "Особые функции", "Пока не знаю"].indexOf(value).toString() }); }}>{value}<span>→</span></button>)}</> : <div className={styles.result}><p>{ready ? "Начните с коллекции Ready: возможно, там уже есть подходящая структура. Если потребуется другое решение, обсудим индивидуальную разработку." : "Стоит обсудить индивидуальную разработку: состав функций и стоимость определим по вашей задаче."}</p><Link href={ready ? "/ready" : "/services"}>{ready ? "Посмотреть Ready" : "Посмотреть решения"} →</Link></div>}
        </div>}
      </>}
      <a className={styles.whatsapp} href={whatsappUrl(message)} target="_blank" rel="noreferrer" data-direction={direction || "general"}>Обсудить в WhatsApp <span>↗</span></a>
      <small>Вы перейдёте в WhatsApp и сможете дополнить сообщение</small>
    </div>}
    <button ref={trigger} className={styles.trigger} aria-expanded={open} aria-controls="nexora-site-helper" onClick={() => { if (!open) trackSiteEvent("site_helper_open"); setOpen(!open); }}><span aria-hidden="true">✧</span><span className={styles.desktop}>Обсудим ваш сайт?</span><span className={styles.mobile}>О сайте</span></button>
  </div>;
}
