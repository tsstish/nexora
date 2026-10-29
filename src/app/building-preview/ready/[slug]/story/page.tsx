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
      <div className={`${styles.sky} nx-city-stage`}>
        <CityBackdrop time="morning" />
        <StudioHeader />
        <div className={styles.heroWrap}>
          <div className={styles.heroContent}>
            <Link className={styles.back} href="/building-preview#collection">← К коллекции готовых сайтов</Link>
            <span className={styles.eyebrow}>{story.eyebrow}</span>
            <h1>{story.headline}</h1>
            <p className={styles.heroLead}>{story.lead}</p>
            <a className={styles.heroAction} href={site.demoUrl} target="_blank" rel="noopener noreferrer">
              Посмотреть работающий сайт <span aria-hidden="true">↗</span>
            </a>
            <div className={styles.heroNote}>
              <span>{site.formatLabel}</span>
              <span>Демонстрация: {site.name}</span>
            </div>
          </div>
          <div className={styles.liveDemo}>
            <div className={styles.demoTop}>
              <span><b aria-hidden="true" /> РАБОТАЮЩАЯ КОНЦЕПЦИЯ / {site.name}</span>
              <a href={site.demoUrl} target="_blank" rel="noopener noreferrer">На весь экран ↗</a>
            </div>
            <div className={styles.iframeBox}>
              <iframe title={`Настоящий демо-сайт ${site.name}`} src={site.demoUrl} loading="lazy" />
            </div>
            <p>Это демонстрационный бренд. Ваш сайт будет с вашими материалами</p>
          </div>
        </div>
      </div>

      <div className={styles.paper}>
        <div className={styles.shell}>
          <section className={styles.why} aria-labelledby="why-title">
            <span className={styles.sectionLabel}>01 / ЗАЧЕМ ТАКОЙ САЙТ</span>
            <div className={styles.whyGrid}>
              <h2 id="why-title">{story.thesis}</h2>
              <div className={styles.whyText}>
                <p className={styles.problem}>{story.tension}</p>
                <p>{story.resolution}</p>
              </div>
            </div>
          </section>

          <section className={styles.advantages} aria-labelledby="value-title">
            <div className={styles.sectionHeading}>
              <span className={styles.sectionLabel}>02 / ПОЧЕМУ ЭТА КОНЦЕПЦИЯ</span>
              <h2 id="value-title">Здесь всё работает на вашу идею</h2>
            </div>
            <div className={styles.advantageGrid}>
              {story.advantages.map((advantage) => (
                <article className={styles.advantage} key={advantage.label}>
                  <span className={styles.advIndex}>{advantage.label}</span>
                  <h3>{advantage.heading}</h3>
                  <p>{advantage.explanation}</p>
                  <div className={styles.proof}>{advantage.proof}</div>
                </article>
              ))}
            </div>
          </section>

          <section className={styles.journey} aria-labelledby="journey-title">
            <div>
              <span className={styles.sectionLabel}>03 / СЦЕНАРИЙ ПОСЕТИТЕЛЯ</span>
              <h2 id="journey-title">Что человек увидит на вашем сайте</h2>
              <p className={styles.journeyNote}>Это логика проектирования, а не обещание гарантированных продаж</p>
            </div>
            <ol className={styles.journeyList}>
              {story.visitorPath.map((item) => (
                <li key={item.step}>
                  <span>{item.step}</span>
                  <div><strong>{item.title}</strong><p>{item.description}</p></div>
                </li>
              ))}
            </ol>
          </section>

          <section className={styles.adapt} aria-labelledby="adapt-title">
            <div>
              <span className={styles.sectionLabel}>04 / ОТ ДЕМО К ВАШЕМУ САЙТУ</span>
              <h2 id="adapt-title">Форма готова.<br /><em>Содержание будет вашим</em></h2>
              <p>Сохраняем характер и продуманную структуру концепции. Адаптируем визуальную систему и информацию под ваш бизнес</p>
            </div>
            <div className={styles.adaptSide}>
              <div className={styles.brandSteps}>
                <div><small>СЕЙЧАС</small><strong>Демо: {site.name}</strong></div>
                <span aria-hidden="true">→</span>
                <div><small>ПОСЛЕ АДАПТАЦИИ</small><strong>Ваш бренд</strong></div>
              </div>
              <ul className={styles.includedList}>
                {site.adaptationIncludes.slice(0, 6).map((item) => <li key={item}>{item}</li>)}
              </ul>
              <p className={styles.boundaries}>{story.audience}</p>
              <details className={styles.disclosure}>
                <summary>Границы адаптации <span aria-hidden="true">+</span></summary>
                <p>{story.boundaries}</p>
                <p>{readyAdaptation}</p>
              </details>
            </div>
          </section>
        </div>
      </div>

      <section className={styles.prices} aria-labelledby="price-title">
        <div className={styles.shell}>
          <div className={styles.pricesHeading}>
            <div>
              <span className={styles.sectionLabel}>05 / КАК ПОЛУЧИТЬ ЭТОТ САЙТ</span>
              <h2 id="price-title">Выберите удобный формат</h2>
            </div>
            <p>Один и тот же готовый продукт — два способа оплаты. Условия отличаются, сама идея сайта остаётся той же</p>
          </div>
          <div className={styles.priceOptions}>
            <article>
              <span>01 / READY MONTHLY</span>
              <h3>По подписке</h3>
              <p>Без стартового платежа. Хостинг и предусмотренная поддержка включены</p>
              <div className={styles.amount}><CurrencyPrice group="monthly" priceId={site.monthlyPlan} ils={monthly.price} perMonth /></div>
              <a href={whatsappUrl(`Здравствуйте! Хочу обсудить подписку на Ready ${site.name}. ${story.invitation}`)}
                target="_blank" rel="noopener noreferrer">Обсудить подписку ↗</a>
            </article>
            <article>
              <span>02 / READY PURCHASE</span>
              <h3>Купить с адаптацией</h3>
              <p>Разовая покупка уже разработанного сайта с согласованной адаптацией</p>
              <div className={styles.amount}><CurrencyPrice group="ready" priceId={site.slug} ils={site.priceFrom} prefix="от " /></div>
              <a href={whatsappUrl(`Здравствуйте! Хочу обсудить покупку Ready ${site.name}. ${story.invitation}`)}
                target="_blank" rel="noopener noreferrer">Обсудить покупку ↗</a>
            </article>
          </div>
          <details className={styles.terms}>
            <summary>Условия подписки, выкупа и технической поддержки <span aria-hidden="true">+</span></summary>
            <div className={styles.termBody}>
              <p>{monthlyStart}</p>
              <p>{monthlySupport.editsDescription}</p>
              <p>{monthlySupport.checksDescription}</p>
              <p>{monthlyCancel}</p>
              <p>{monthlyBuyout}</p>
              <p>{readyRights}</p>
            </div>
          </details>
        </div>
      </section>
    </main>
  );
}
