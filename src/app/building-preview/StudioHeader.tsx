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
        <a className={`${styles.contact} nx-action nx-action--outline`} href={whatsappUrl("Здравствуйте! Хочу обсудить проект NeXora.")}
           target="_blank" rel="noopener noreferrer">
          <span>Обсудить проект</span><span aria-hidden="true">↗</span>
        </a>
      </div>
    </header>
  );
}
