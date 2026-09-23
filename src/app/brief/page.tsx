import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BriefForm } from "./BriefForm";
import styles from "./brief.module.css";

export const metadata: Metadata = {
  title: "Бриф для запуска сайта",
  description: "Клиентский бриф NeXora для подготовки сайта к запуску.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/brief" },
};

export default function BriefPage() {
  return (
    <>
      <a className="skip-link" href="#brief-main">Перейти к содержимому</a>
      <header className={styles.header}>
        <Link href="/" className="brand-lockup" aria-label="NeXora — главная">
          <Image
            src="/brand/nexora-wordmark.png"
            alt="NeXora"
            width={190}
            height={68}
            className="brand-wordmark"
            priority
          />
          <span className="brand-rule" />
          <span className="brand-tag">DIGITAL<br />PRESENCE<br />DESIGN</span>
        </Link>
        <Link className={styles.back} href="/">Вернуться на сайт →</Link>
      </header>

      <main id="brief-main" className={styles.page}>
        <section className={styles.intro}>
          <div>
            <div className={styles.eyebrow}>NEXORA · НАЧАЛО ПРОЕКТА</div>
            <h1>Бриф для запуска сайта</h1>
            <p>Соберём информацию, которая нужна для оценки, договора и подготовки сайта. Черновик сохраняется на этом устройстве автоматически.</p>
          </div>
          <div className={styles.introGlass} aria-hidden="true"><span>01</span><span>→</span><span>BRIEF</span></div>
        </section>
        <BriefForm />
      </main>
    </>
  );
}
