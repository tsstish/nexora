import Link from "next/link";
import { siteConfig, whatsappUrl } from "@/data/site";
import styles from "./StudioFooter.module.css";

const links = [
  { href: "/building-preview#collection", text: "Готовые сайты" },
  { href: "/building-preview/pricing", text: "Услуги и стоимость" },
  { href: "/building-preview/contacts", text: "Контакты" },
];
const legal = [
  { href: "/building-preview/docs/terms", text: "Условия использования" },
  { href: "/building-preview/docs/privacy", text: "Конфиденциальность" },
  { href: "/building-preview/docs/accessibility", text: "Доступность" },
];

export function StudioFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.intro}>
          <span className={styles.eyebrow}>NEXORA / DIGITAL PRESENCE DESIGN</span>
          <h2>Ваш следующий проект начинается здесь</h2>
          <p>Готовые сайты и индивидуальная разработка для бизнеса</p>
          <a className={styles.cta}
             href={whatsappUrl("Здравствуйте! Хочу обсудить разработку сайта NeXora.")}
             target="_blank" rel="noopener noreferrer">
            Обсудить разработку сайта <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className={styles.navigation}>
          <div>
            <span className={styles.columnLabel}>РАЗДЕЛЫ</span>
            <nav aria-label="Навигация внизу сайта">
              {links.map((x) => <Link key={x.href} href={x.href}>{x.text}</Link>)}
            </nav>
          </div>
          <div>
            <span className={styles.columnLabel}>СВЯЗЬ</span>
            <a href={siteConfig.phoneHref}>{siteConfig.phoneDisplay}</a>
            <a href={siteConfig.telegram} target="_blank" rel="noopener noreferrer">Telegram ↗</a>
            <a href={siteConfig.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp ↗</a>
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <span>© {new Date().getFullYear()} NeXora · {siteConfig.location}</span>
        <nav aria-label="Документы">
          {legal.map(x => <Link key={x.href} href={x.href}>{x.text}</Link>)}
        </nav>
      </div>
    </footer>
  );
}
