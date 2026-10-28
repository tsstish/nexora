import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { readySites } from "@/data/readySites";
import { monthlyPlans, monthlySupport } from "@/data/readyMonthly";
import { readyAdaptation, readyRights, monthlyStart, monthlyCancel, monthlyBuyout } from "@/data/readyConditions";
import { whatsappUrl } from "@/data/site";
import { CurrencyPrice } from "../../CurrencyControl";
import { StudioHeader } from "../../StudioHeader";
import { CityBackdrop } from "../../CityBackdrop";
import styles from "./product.module.css";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return readySites.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = readySites.find((x) => x.slug === slug);
  if (!product) return { title: "Концепция не найдена", robots: { index: false } };
  return {
    title: { absolute: `${product.title} — ${product.name} | NeXora` },
    description: product.shortDescription,
    robots: { index: false, follow: false },
    alternates: { canonical: `/building-preview/ready/${slug}` },
  };
}

export default async function ReadyConcept({ params }: Props) {
  const { slug } = await params;
  const site = readySites.find((x) => x.slug === slug);
  if (!site) notFound();
  const monthly = monthlyPlans[site.monthlyPlan];

  return (
    <main className={`${styles.root} nx-city-stage`}>
      <CityBackdrop time="morning" />
      <StudioHeader />
      <div className={styles.shell}>


        <section className={styles.hero}>
          <div className={styles.heading}>
            <span className={styles.kicker}>NEXORA / READY COLLECTION / {site.name}</span>
            <span className={styles.conceptName}>Разработанная концепция: {site.name}</span>
            <h1>{site.title}</h1>
            <p>{site.shortDescription}</p>
            <a className={`${styles.demoLink} nx-action nx-action--outline`} href={site.demoUrl} target="_blank" rel="noopener noreferrer">Открыть оригинальное демо ↗</a>
          </div>
          <div className={`${styles.panel} nx-glass`}>
            <span className={styles.panelLabel}>01 / READY PRODUCT</span>
            <strong>{site.name}</strong>
            <span>{site.formatLabel}</span>
            <div className={styles.detailsBar}><i /> <span>Разработано на кодовой базе — не конструктор</span></div>
          </div>
        </section>

        <section className={styles.purchaseGrid} aria-label="Выберите формат">
          <article id="monthly" className={styles.monthlyCard}>
            <span className={styles.number}>01 / READY MONTHLY</span>
            <h2>Сайт по подписке</h2>
            <p>Адаптируем выбранную концепцию под ваш бизнес. Стартового платежа нет.</p>
            <div className={styles.price}><CurrencyPrice group="monthly" priceId={site.monthlyPlan} ils={monthly.price} perMonth /></div>
            <div className={styles.support}>{monthlySupport.summary}</div>
            <a href={whatsappUrl(`Здравствуйте! Интересует подписка на ${site.name}.`)} target="_blank" rel="noopener noreferrer" className={`${styles.action} nx-action nx-action--primary`}>Обсудить подписку ↗</a>
          </article>
          <article id="purchase" className={styles.buyCard}>
            <span className={styles.number}>02 / READY PURCHASE</span>
            <h2>Покупка с адаптацией</h2>
            <p>Получаете готовый сайт с адаптацией под ваш бренд и материалы.</p>
            <div className={styles.price}><CurrencyPrice group="ready" priceId={site.slug} ils={site.priceFrom} prefix="от " /></div>
            <div className={styles.support}>Условия использования описаны ниже</div>
            <a href={whatsappUrl(`Здравствуйте! Интересует покупка готового сайта ${site.name}.`)} target="_blank" rel="noopener noreferrer" className={styles.action}>Обсудить покупку ↗</a>
          </article>
        </section>

        <section className={styles.editorial}>
          <div><span className={styles.kicker}>03 / THE DETAILS</span><h2>Что уже продумано.</h2></div>
          <div className={styles.included}>
            {site.features.map((feature, i) => (
              <div key={feature}><span>{String(i + 1).padStart(2, "0")}</span><p>{feature}</p></div>
            ))}
          </div>
        </section>

        <section className={styles.conditions}>
          <span className={styles.kicker}>04 / УСЛОВИЯ И СОСТАВ УСЛУГ</span>
          <h2>Без скрытых допущений.</h2>
          <details open>
            <summary>Что включено в адаптацию</summary>
            <p>{readyAdaptation}</p>
          </details>
          <details>
            <summary>Как начинается подписка</summary>
            <p>{monthlyStart}</p>
          </details>
          <details>
            <summary>Хостинг, правки и технические проверки</summary>
            <p>{monthlySupport.editsDescription}</p>
            <p>{monthlySupport.checksDescription}</p>
          </details>
          <details>
            <summary>Отмена подписки и выкуп сайта</summary>
            <p>{monthlyCancel}</p>
            <p>{monthlyBuyout}</p>
          </details>
          <details>
            <summary>Права на концепцию при покупке</summary>
            <p>{readyRights}</p>
          </details>
          <p className={styles.notice}>Все цены и условия в ILS взяты из действующей версии NeXora. USD/RUB — предварительные коммерческие предложения для обсуждения, не утверждённый публичный прайс.</p>
        </section>


      </div>
    </main>
  );
}
