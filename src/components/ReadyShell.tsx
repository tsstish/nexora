import Image from "next/image";
import Link from "next/link";
import { siteConfig, whatsappUrl } from "@/data/site";

const message = "Здравствуйте! Интересуют готовые сайты Ready by NeXora. Хочу задать вопрос.";

export function ReadyHeader() {
  return (
    <header className="topbar ready-topbar">
      <Link href="/" className="brand-lockup" aria-label="NeXora — главная">
        <Image src="/brand/nexora-wordmark.png" width={190} height={68} alt="NeXora" className="brand-wordmark" priority />
        <span className="brand-rule" />
        <span className="brand-tag">DIGITAL<br />PRESENCE<br />DESIGN</span>
      </Link>
      <nav aria-label="Навигация">
        <Link href="/">Главная</Link>
        <Link href="/services">Услуги и цены</Link>
        <Link href="/ready" aria-current="page">Готовые сайты</Link>
        <Link href="/ready/monthly">Monthly</Link>
        <a href={siteConfig.telegram} target="_blank" rel="noreferrer">Контакты</a>
      </nav>
      <a className="cta top-cta ready-desktop-cta" href={whatsappUrl(message)} target="_blank" rel="noreferrer" data-direction="ready_question">Задать вопрос <span>↗</span></a>
      <details className="ready-mobile-menu">
        <summary aria-label="Открыть меню"><span /><span /><span /></summary>
        <div className="ready-mobile-menu-panel">
          <Link href="/">Главная</Link>
          <Link href="/services">Услуги и цены</Link>
          <Link href="/ready">Готовые сайты</Link>
          <Link href="/ready/monthly">Monthly</Link>
          <a href={siteConfig.telegram} target="_blank" rel="noreferrer">Telegram</a>
          <a className="cta" href={whatsappUrl(message)} target="_blank" rel="noreferrer" data-direction="ready_question">Задать вопрос ↗</a>
        </div>
      </details>
    </header>
  );
}

export function ReadyFooter() {
  return (
    <footer className="footer footer-v2 ready-footer ready-footer-v2 section-shell">
      <div className="footer-brand footer-brand-v2">
        <Link href="/" aria-label="NeXora — на главную">
          <Image src="/brand/nexora-wordmark.png" alt="NeXora" width={160} height={60} />
        </Link>
        <span className="footer-brand-tag-v2">DIGITAL<br />PRESENCE<br />DESIGN</span>
        <p>Готовые и индивидуальные сайты для бизнеса</p>
      </div>
      <nav className="footer-links footer-links-v2" aria-label="Навигация в футере">
        <Link href="/ready">Готовые сайты</Link>
        <Link href="/ready/monthly">Monthly</Link>
        <Link href="/services">Индивидуальная разработка</Link>
      </nav>
      <div className="footer-contact footer-contact-v2">
        <a href={siteConfig.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a>
        <a href={siteConfig.telegram} target="_blank" rel="noreferrer">Telegram</a>
        <a href={siteConfig.phoneHref}>{siteConfig.phoneDisplay}</a>
      </div>
      <div className="footer-legal footer-legal-v2">
        <Link href="/privacy">Конфиденциальность</Link>
        <Link href="/terms">Условия</Link>
        <Link href="/accessibility">Доступность</Link>
      </div>
    </footer>
  );
}
