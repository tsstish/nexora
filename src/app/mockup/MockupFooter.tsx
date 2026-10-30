import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import styles from "./mockup.module.css";

export function MockupFooter() {
  return <footer className={styles.footer}>
    <div className={styles.container}>
      <div className={styles.footerTop}>
        <Link href="/mockup" aria-label="NeXora"><Image src="/brand/nexora-wordmark.png" alt="NeXora" width={188} height={66} /></Link>
        <p>Готовые концепции и сайты под ваш бизнес.</p>
        <a href={siteConfig.whatsapp} target="_blank" rel="noreferrer">Написать в WhatsApp ↗</a>
      </div>
      <nav className={styles.footerLinks} aria-label="Ссылки в подвале">
        <Link href="/mockup#catalog">Готовые сайты</Link><Link href="/mockup#options">Ready Monthly</Link><Link href="/mockup#custom">Индивидуальная разработка</Link><Link href="/terms">Условия</Link><Link href="/privacy">Конфиденциальность</Link>
      </nav>
      <small>© {new Date().getFullYear()} NeXora · Хайфа, Израиль</small>
    </div>
  </footer>;
}
