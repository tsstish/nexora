import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { readySites } from "@/data/readySites";
import { readyStories } from "@/data/readyStories";
import { monthlyPlans, monthlySupport } from "@/data/readyMonthly";
import { readyAdaptation, readyRights, monthlyStart, monthlyCancel, monthlyBuyout } from "@/data/readyConditions";
import { whatsappUrl } from "@/data/site";
import { CurrencyPrice } from "../../../CurrencyControl";
import { StudioHeader } from "../../../StudioHeader";
import { CityBackdrop } from "../../../CityBackdrop";
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
    title: `${story.headline} | Ready by NeXora`,
    description: story.lead,
    robots: { index: false, follow: false },
  };
}

export default async function ProductStoryPreview({ params }: Props) {
  const { slug } = await params;
  const site = readySites.find((item) => item.slug === slug);
  const story = readyStories[slug];
  if (!site || !story) notFound();
  const monthly = monthlyPlans[site.monthlyPlan];

  return (
    <main className={styles.page}>
      <div className={`${styles.cityScene} nx-city-stage`}>
        <CityBackdrop time="morning" />
        <StudioHeader />
        <div className={styles.sceneNote}>
          <span>NEXORA / READY COLLECTION</span>
          <span>ГОТОВЫЙ САЙТ № {String(readySites.findIndex(item => item.slug === slug) + 1).padStart(2, "0")}</span>
        </div>
      </div>

      <section className={styles.product} aria-labelledby="product-title">
        <div className={styles.content}>
          <div className={styles.productIntro}>
            <Link className={styles.back} href="/building-preview#collection">← Все готовые сайты</Link>
            <span className={styles.eyebrow}>ГОТОВЫЙ ПРОДУКТ / {site.formatLabel}</span>
            <h1 id="product-title">{story.headline}</h1>
            <p className={styles.lead}>{story.lead}</p>
            <div className={styles.quickProof}>
              <span>Уже разработан на кодовой базе</span>
              <span>Адаптируем под ваш бренд</span>
            </div>
          </div>

          <div className={styles.demo} aria-label={`Демонстрация сайта ${site.name}`}>
            <div className={styles.demoToolbar}>
              <span><i aria-hidden="true" /> ЖИВОЙ ПРИМЕР / {site.name}</span>
              <span>Ваш бренд будет вместо демонстрационного</span>
            </div>
            <div className={styles.demoViewport}>
              <iframe
                src={site.demoUrl}
                title={`Работающий демо-сайт ${site.name}`}
                loading="lazy"
                tabIndex={-1}
                scrolling="no"
              />
            </div>
            <div className={styles.demoBottom}>
              <span>Реальный сайт, не макет</span>
              <a href={site.demoUrl} target="_blank" rel="noopener noreferrer">Открыть демо на весь экран ↗</a>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.benefits} aria-labelledby="benefits-title">
        <div className={styles.content}>
          <div className={styles.benefitsHeading}>
            <div>
              <span className={styles.eyebrow}>ПОЧЕМУ ЭТОТ READY</span>
              <h2 id="benefits-title">Не просто красивый сайт</h2>
            </div>
            <p>{story.tension}</p>
          </div>
          <div className={styles.benefitGrid}>
            {story.advantages.map((benefit, index) => (
              <article key={benefit.label}>
                <span className={styles.benefitNumber}>0{index + 1}</span>
                <h3>{benefit.heading}</h3>
                <p>{benefit.explanation}</p>
                <small>{benefit.proof}</small>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.conversion} aria-labelledby="conversion-title">
        <div className={styles.content}>
          <div className={styles.convertIntro}>
            <div>
              <span className={styles.eyebrow}>АДАПТАЦИЯ ПОД ВАШ БИЗНЕС</span>
              <h2 id="conversion-title">Этот дизайн.<br/><em>Ваше имя</em></h2>
            </div>
            <div className={styles.convertInfo}>
              <p>Вместо {site.name} — ваш логотип, цвета, фотографии, тексты и контакты. Основа уже готова, а содержание будет вашим</p>
              <details>
                <summary>Что входит в адаптацию <span aria-hidden="true">+</span></summary>
                <ul>{site.adaptationIncludes.map(item => <li key={item}>{item}</li>)}</ul>
                <p>{readyAdaptation}</p>
                <p>{story.boundaries}</p>
              </details>
            </div>
          </div>

          <div className={styles.priceHeading}>
            <span className={styles.eyebrow}>ВАРИАНТЫ ПРИОБРЕТЕНИЯ</span>
            <h2>Как получить этот сайт</h2>
          </div>
          <div className={styles.priceGrid}>
            <article>
              <span>01 / ПОДПИСКА</span>
              <h3>Сайт по подписке</h3>
              <div className={styles.price}><CurrencyPrice group="monthly" priceId={site.monthlyPlan} ils={monthly.price} perMonth /></div>
              <p>Без стартового взноса. Хостинг и поддержка включены</p>
              <a href={whatsappUrl(`Здравствуйте! Хочу сайт ${site.name} по подписке.`)}
                target="_blank" rel="noopener noreferrer">Обсудить подписку ↗</a>
            </article>
            <article>
              <span>02 / ПОКУПКА</span>
              <h3>Купить с адаптацией</h3>
              <div className={styles.price}><CurrencyPrice group="ready" priceId={site.slug} ils={site.priceFrom} prefix="от " /></div>
              <p>Разовая покупка готовой концепции с адаптацией под ваш бизнес</p>
              <a href={whatsappUrl(`Здравствуйте! Хочу купить сайт ${site.name} с адаптацией.`)}
                target="_blank" rel="noopener noreferrer">Обсудить покупку ↗</a>
            </article>
          </div>
          <details className={styles.legal}>
            <summary>Подробные условия оплаты, поддержки и выкупа <span aria-hidden="true">+</span></summary>
            <div>
              <p>{monthlyStart}</p>
              <p>{monthlySupport.editsDescription}</p>
              <p>{monthlySupport.checksDescription}</p>
              <p>{monthlyCancel}</p>
              <p>{monthlyBuyout}</p>
              <p>{readyRights}</p>
            </div>
          </details>
          <p className={styles.demoNote}>В демонстрации используются примерные бренды и материалы. Конечный состав работ согласовываем до запуска</p>
        </div>
      </section>
    </main>
  );
}
