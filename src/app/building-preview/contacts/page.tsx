import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig, whatsappUrl } from "@/data/site";
import { StudioHeader } from "../StudioHeader";
import styles from "./contacts.module.css";

export const metadata: Metadata = {
  title: { absolute: "Контакты и документы | NeXora" },
  description: "Связаться с NeXora: WhatsApp, Telegram, телефон. Информация о работе студии и юридические документы.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/building-preview/contacts" },
};

const docs = [
  { number: "01", name: "Условия использования", note: "Порядок работы, предварительные цены и условия", href: "/building-preview/docs/terms" },
  { number: "02", name: "Конфиденциальность", note: "Обработка персональных данных и способы связи", href: "/building-preview/docs/privacy" },
  { number: "03", name: "Доступность сайта", note: "Веб-доступность и обратная связь", href: "/building-preview/docs/accessibility" },
];

export default function ContactsPage() {
  return (
    <main className={styles.page}>
      <div className={styles.sunsetScene}>
        <StudioHeader />
        <section className={styles.hero} aria-labelledby="contacts-title">
          <div className={styles.intro}>
            <span className={styles.eyebrow}>NEXORA / GET IN TOUCH</span>
            <h1 id="contacts-title">Есть идея?<br /><em>Давайте обсудим.</em></h1>
            <p>Расскажите о бизнесе и задаче. Мы поможем выбрать готовую концепцию или определить формат индивидуальной разработки.</p>
            <a className={styles.primary} href={whatsappUrl("Здравствуйте! Хочу обсудить проект NeXora.")} target="_blank" rel="noopener noreferrer">
              Написать в WhatsApp <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div className={styles.contactBoard}>
            <span className={styles.boardEyebrow}>DIRECT CONTACT / ISRAEL</span>
            <a href={siteConfig.phoneHref}><span>01 / ТЕЛЕФОН</span><strong>{siteConfig.phoneDisplay}</strong><b aria-hidden="true">↗</b></a>
            <a href={siteConfig.telegram} target="_blank" rel="noopener noreferrer"><span>02 / TELEGRAM</span><strong>{siteConfig.telegramDisplay}</strong><b aria-hidden="true">↗</b></a>
            <a href={siteConfig.whatsapp} target="_blank" rel="noopener noreferrer"><span>03 / WHATSAPP</span><strong>Начать разговор</strong><b aria-hidden="true">↗</b></a>
            <p>NeXora · {siteConfig.location}</p>
          </div>
        </section>
        <div className={styles.sunsetCaption} aria-hidden="true"><span>AFTER HOURS / SAME CITY, DIFFERENT LIGHT</span><span>HAIFA / NEXORA</span></div>
      </div>

      <section className={styles.documents} id="documents" aria-labelledby="docs-title">
        <div className={styles.documentsInner}>
          <div className={styles.documentsIntro}>
            <span className={styles.eyebrow}>DOCUMENT LIBRARY / NEXORA</span>
            <h2 id="docs-title">Всё важное.<br /><em>Без мелкого шрифта.</em></h2>
            <p>Основные юридические документы студии. Их содержание берём из действующей версии сайта и не переписываем ради нового дизайна.</p>
          </div>
          <div className={styles.documentList}>
            {docs.map((doc) => (
              <Link href={doc.href} key={doc.href} className={styles.doc}>
                <span>{doc.number}</span>
                <span><strong>{doc.name}</strong><small>{doc.note}</small></span>
                <span aria-hidden="true">↗</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <footer className={styles.footer}>
        <Link href="/building-preview">← Готовые сайты</Link>
        <Link href="/building-preview/pricing">Услуги и стоимость ↗</Link>
      </footer>
    </main>
  );
}
