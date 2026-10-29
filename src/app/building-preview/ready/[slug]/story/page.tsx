import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { readySites } from "@/data/readySites";
import { readyStories } from "@/data/readyStories";
import { monthlyPlans, monthlySupport } from "@/data/readyMonthly";
import { monthlyStart, monthlyCancel, monthlyBuyout, readyAdaptation, readyRights } from "@/data/readyConditions";
import { whatsappUrl } from "@/data/site";
import { CurrencyPrice } from "../../../CurrencyControl";
import { StudioHeader } from "../../../StudioHeader";
import { CityBackdrop } from "../../../CityBackdrop";
import { ReadyDemo } from "./ReadyDemo";
import styles from "./story.module.css";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return readySites.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const story = readyStories[slug];
  if (!story) return { title: "Концепция не найдена", robots: { index: false } };
  return {
    title: `${story.headline} | Готовый сайт NeXora`,
    description: story.lead,
    robots: { index: false, follow: false },
  };
}

export default async function ReadyStoryPage({ params }: Props) {
  const { slug } = await params;
  const site = readySites.find(item => item.slug === slug);
  const story = readyStories[slug];
  if (!site || !story) notFound();
  const monthly = monthlyPlans[site.monthlyPlan];

  return (
    <main className={styles.page}>
      <div className={`${styles.cityHero} nx-city-stage`}>
        <CityBackdrop time="morning" />
        <StudioHeader />
        <div className={`${styles.heroContent} nx-hero-copy`}>
          <Link href="/building-preview#collection" className={`${styles.back} ${styles.backDesktop}`}>← Вернуться к коллекции</Link>
          <Link href="/building-preview#mobile-collection" className={`${styles.back} ${styles.backMobile}`}>← Вернуться к коллекции</Link>
          <div className={styles.heroEyebrow}>NEXORA / READY COLLECTION · {site.formatLabel}</div>
          <h1>{story.headline}</h1>
          <p>{story.lead}</p>
        </div>
      </div>

      <section className={styles.productStage} aria-label={`Готовый сайт ${site.name}`}>
        <div className={styles.productGrid}>
          <div className={styles.previewArea}>
            <div className={styles.previewTop}>
              <span>01 / СМОТРИТЕ САМИ</span>
              <span>Демо: {site.name}</span>
            </div>
            <ReadyDemo name={site.name} url={site.demoUrl} />
          </div>

          <aside className={styles.purchase} aria-labelledby="purchase-title">
            <span className={styles.eyebrow}>УЖЕ РАЗРАБОТАН · ГОТОВ К АДАПТАЦИИ</span>
            <h2 id="purchase-title">Этот сайт может стать вашим</h2>
            <p className={styles.purchaseLead}>Не придётся собирать страницы с нуля. Заменим демонстрационный бренд, цвета, фотографии, тексты и контакты на ваши</p>

            <div className={styles.keyPoints}>
              <span className={styles.keyPointLabel}>ГЛАВНАЯ ИДЕЯ КОНЦЕПЦИИ</span>
              <p className={styles.keyPointThesis}>{story.thesis}</p>
              <span className={styles.keyPointMeta}>{site.formatLabel} · {site.languages.join(" · ")}</span>
            </div>

            <div className={styles.prices} id="ready-prices">
              <div className={styles.priceRow}>
                <div><span>По подписке</span><small>Хостинг и поддержка включены</small></div>
                <strong><CurrencyPrice group="monthly" priceId={site.monthlyPlan} ils={monthly.price} perMonth /></strong>
              </div>
              <div className={styles.priceRow}>
                <div><span>Купить с адаптацией</span><small>Разовая стоимость от</small></div>
                <strong><CurrencyPrice group="ready" priceId={site.slug} ils={site.priceFrom} prefix="от " /></strong>
              </div>
            </div>
            <a className={styles.primaryAction}
               href={whatsappUrl(`Здравствуйте! Интересует готовый сайт ${site.name}. Хочу выбрать формат: подписка или покупка с адаптацией.`)}
               target="_blank" rel="noopener noreferrer">Хочу такой сайт <span aria-hidden="true">↗</span></a>
            <div className={styles.purchaseNote}>Сроки и стоимость дополнительных изменений согласовываются до начала работы</div>
          </aside>
        </div>
      </section>

      <section className={styles.detailsSection} aria-labelledby="details-title">
        <div className={styles.detailsIntro}>
          <span className={styles.eyebrow}>02 / ЧТО ВНУТРИ</span>
          <h2 id="details-title">Продумано под конкретную задачу</h2>
          <p>{story.resolution}</p>
        </div>
        <div className={styles.benefitCards} aria-label="Возможности этого Ready">
          {story.advantages.map((item, index) => (
            <article key={item.label}>
              <span>0{index + 1} / {item.label.split("/").slice(-1)[0].trim()}</span>
              <h3>{item.heading}</h3>
              <p>{item.explanation}</p>
              <small>{item.proof}</small>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.adaptation} aria-labelledby="adaptation-title">
        <div className={styles.adaptationMain}>
          <span className={styles.eyebrow}>03 / АДАПТАЦИЯ ПОД БРЕНД</span>
          <h2 id="adaptation-title"><span>{site.name}</span><b aria-hidden="true">→</b><em>Ваш бренд</em></h2>
          <p>Сохраняем продуманную структуру концепции и адаптируем оформление под ваш бизнес</p>
        </div>
        <div className={styles.extraDetails}>
          <details>
            <summary>Что входит в адаптацию <span aria-hidden="true">+</span></summary>
            <ul>{site.adaptationIncludes.map(item => <li key={item}>{item}</li>)}</ul>
            <p>{readyAdaptation}</p>
          </details>
          <details>
            <summary>Для каких задач подходит этот сайт <span aria-hidden="true">+</span></summary>
            <p>{story.audience}</p>
            <p>{story.boundaries}</p>
          </details>
          <details>
            <summary>Условия подписки, покупки и поддержки <span aria-hidden="true">+</span></summary>
            <p>{monthlyStart}</p><p>{monthlySupport.editsDescription}</p>
            <p>{monthlySupport.checksDescription}</p><p>{monthlyCancel}</p>
            <p>{monthlyBuyout}</p><p>{readyRights}</p>
          </details>
          <p className={styles.disclaimer}>Название {site.name}, изображения и примеры в демо — демонстрационные материалы. Реальные данные предоставляет заказчик</p>
        </div>
      </section>
    </main>
  );
}
