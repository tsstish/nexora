"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { whatsappUrl } from "@/data/site";
import { CurrencySelector } from "./CurrencyControl";
import styles from "./StudioHeader.module.css";

const menu = [
  { label: "Готовые сайты", href: "/building-preview", section: "ready" },
  { label: "Услуги и стоимость", href: "/building-preview/pricing", section: "pricing" },
  { label: "Контакты", href: "/building-preview/contacts", section: "contacts" },
] as const;

export function StudioHeader() {
  const pathname = usePathname();
  const section = pathname.startsWith("/building-preview/pricing") ? "pricing"
    : (pathname.startsWith("/building-preview/contacts") || pathname.startsWith("/building-preview/docs/")) ? "contacts"
    : "ready";

  return (
    <header className={styles.header}>
      <Link href="/building-preview" className={styles.logo} aria-label="NeXora — главная">
        <Image src="/brand/nexora-wordmark.png" width={1254} height={439} alt="NeXora" priority />
        <span>DIGITAL PRESENCE DESIGN</span>
      </Link>
      <nav className={styles.nav} aria-label="Основное меню">
        {menu.map((item) => (
          <Link
            key={item.section}
            href={item.href}
            aria-current={section === item.section ? "page" : undefined}
          >{item.label}</Link>
        ))}
      </nav>
      <div className={styles.actions}>
        <CurrencySelector />
        <a className={`${styles.contact} nx-action nx-action--outline`}
           href={whatsappUrl("Здравствуйте! Хочу обсудить проект NeXora.")}
           target="_blank" rel="noopener noreferrer"
           aria-label="Написать NeXora в WhatsApp" title="Написать в WhatsApp">
          <span className={styles.contactLabel}>Обсудить проект</span>
          <svg className={styles.whatsappIcon} xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
            <path d="M12 2.25A9.7 9.7 0 0 0 3.55 16.7L2.5 21.5l4.92-1.25A9.74 9.74 0 1 0 12 2.25Z"
              fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8.3 7.5c-.3-.32-.75-.28-1.03.06-.47.58-.57 1.34-.25 2.23.76 2.08 3.25 4.77 5.54 5.76 1.36.6 2.8.67 3.63.23.53-.28.88-.86 1.05-1.45.08-.29-.02-.5-.31-.65l-1.76-.78c-.27-.12-.47-.07-.66.19l-.78.94a8.4 8.4 0 0 1-3.57-3.43l.81-.8c.17-.17.22-.38.11-.61l-.88-1.79c-.12-.23-.32-.38-.55-.42-.47-.08-.87.05-1.35.52Z"
              fill="currentColor"/>
          </svg>
        </a>
      </div>
    </header>
  );
}
