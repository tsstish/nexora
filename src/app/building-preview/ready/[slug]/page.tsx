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

const readyOutcomes: Record<string, { audience: string; value: string; examples: string[] }> = {
  "dental-clinic": {
    audience: "Для стоматологий и частных клиник",
    value: "Удобно представить процедуры, врачей, цены и результаты работ. Посетитель сможет разобраться в услугах и выбрать удобный способ обращения.",
    examples: ["Услуги и процедуры", "Врач и клиника", "Работы «До и после»", "Контакты и запись"],
  },
  "private-teacher": {
    audience: "Для преподавателей и экспертов",
    value: "Сайт поможет познакомить потенциальных учеников с вашим подходом, занятиями и условиями, чтобы им было проще решиться на знакомство.",
    examples: ["О преподавателе", "Форматы занятий", "Подход и отзывы", "Запись и связь"],
  },
  "brow-artist": {
    audience: "Для beauty-мастеров",
    value: "Аккуратно покажите услуги, работы, цены и информацию о себе, а клиент сможет быстро перейти к записи.",
    examples: ["Портфолио работ", "Услуги и цены", "О мастере", "Быстрая запись"],
  },
  "media-kit": {
    audience: "Для авторов и блогеров",
    value: "Представьте брендам аудиторию, примеры контента, кейсы и форматы сотрудничества без длинной PDF-презентации.",
    examples: ["Статистика аудитории", "Видео и кейсы", "Рекламные форматы", "Бриф для брендов"],
  },
};

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return readySites.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = readySites.find((x) => x.slug === slug);
  if (!product) return { title: "Концепция не найдена", robots: { index: false } };
  return {
    title: { absolute: `${product.title} — ${product.name} | NeXora` },
    description: product.shortDescription,
      alternates: { canonical: `/ready/${slug}` },
  };
}

export default async function ReadyConcept({ params }: Props) {
  const { slug } = await params;
  const site = readySites.find((x) => x.slug === slug);
  if (!site) notFound();
  const monthly = monthlyPlans[site.monthlyPlan];
  const outcome = readyOutcomes[site.slug];

  return (
    <main className={`${styles.root} nx-city-stage`}>
      <CityBackdrop time="morning" />
      <StudioHeader />
      <div className={styles.shell}>


        <section className={styles.hero}>
          <div className={`${styles.heading} nx-hero-copy`}>
            <Link className={`${styles.backToCollection} ${styles.backDesktop}`} href="/#collection">← Вернуться к коллекции</Link>
            <Link className={`${styles.backToCollection} ${styles.backMobile}`} href="/#mobile-collection">← Вернуться к коллекции</Link>
            <span className={styles.kicker}>NEXORA / READY COLLECTION / {site.name}</span>
            <span className={styles.conceptName}>{site.name} — демонстрационный бренд, который заменим вашим</span>
            <h1>{site.title}</h1>
            <p>{site.shortDescription}</p>
            <p className={styles.customBrandNote}>Сайт уже разработан. Перед запуском адаптируем логотип, цвета, фотографии, тексты и контакты под ваш бизнес</p>
            <a className={`${styles.demoLink} nx-action nx-action--outline`} href={site.demoUrl} target="_blank" rel="noopener noreferrer">Посмотреть работающий демо-сайт ↗</a>
          </div>
        </section>

        <section className={styles.productValue} aria-labelledby="ready-value-heading">
          <div className={styles.valueIntro}>
            <div>
              <span className={styles.kicker}>ГОТОВАЯ СТРУКТУРА · ПОД ВАШУ НИШУ</span>
              <h2 id="ready-value-heading">{outcome?.audience ?? site.title}</h2>
            </div>
            <p>{outcome?.value ?? site.description}</p>
          </div>
          <div className={styles.valueColumns}>
            <article className={styles.valueCard}>
              <span className={styles.valueIndex}>01 / УЖЕ СОЗДАНО</span>
              <h3>Всё важное уже продумано</h3>
              <ul>{(outcome?.examples ?? site.features.slice(0, 4)).map((item) => <li key={item}>{item}</li>)}</ul>
              <p>Дизайн, структура и мобильная версия уже разработаны на кодовой базе.</p>
            </article>
            <article className={styles.valueCard}>
              <span className={styles.valueIndex}>02 / АДАПТИРУЕМ ПОД ВАС</span>
              <h3>Ваш бренд, ваши материалы</h3>
              <ul>
                <li>Логотип и фирменные цвета в рамках концепции</li>
                <li>Фотографии, тексты и услуги</li>
                <li>Цены, контакты и способы связи</li>
                <li>Материалы для вашей ниши</li>
              </ul>
              <p>Вы передаёте материалы, мы берём на себя адаптацию и публикацию.</p>
            </article>
          </div>
          <details className={styles.fullAdaptation}>
            <summary>Полный состав адаптации именно этой концепции <span aria-hidden="true">+</span></summary>
            <ul>{site.adaptationIncludes.map((item) => <li key={item}>{item}</li>)}</ul>
            <p>Дополнительные страницы, функции и существенные изменения структуры согласуются отдельно.</p>
          </details>
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

        <details className={styles.mobileFeatures}>
          <summary>Что уже есть в этой концепции <span aria-hidden="true">+</span></summary>
          <ul>{site.features.map(feature => <li key={feature}>{feature}</li>)}</ul>
        </details>

        <section className={styles.editorial}>
          <div><span className={styles.kicker}>03 / THE DETAILS</span><h2>Что уже продумано</h2></div>
          <div className={styles.included}>
            {site.features.map((feature, i) => (
              <div key={feature}><span>{String(i + 1).padStart(2, "0")}</span><p>{feature}</p></div>
            ))}
          </div>
        </section>

        <section className={styles.conditions}>
          <span className={styles.kicker}>04 / УСЛОВИЯ И СОСТАВ УСЛУГ</span>
          <h2>Условия и детали</h2>
          <details>
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
