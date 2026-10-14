import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { readySites } from "@/data/readySites";
import { monthlyPlans, monthlySupport } from "@/data/readyMonthly";
import { readyAdaptation, readyRights, monthlyStart, monthlyCancel, monthlyBuyout } from "@/data/readyConditions";
import { readyProductSlugs, findReadyProduct } from "@/data/readyProduct";
import { ReadyHeader, ReadyFooter } from "@/components/ReadyShell";
import { ReadyPreview } from "@/components/ReadyPreview";
import { ReadyOrderForm } from "@/components/ReadyOrderForm";
import styles from "../shop.module.css";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return readyProductSlugs.map((slug) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const site = findReadyProduct(slug);
  if (!site) return {};
  return {
    title: site.name + " — готовый сайт с адаптацией",
    description: site.seo.description,
    alternates: { canonical: "/ready/" + slug },
    openGraph: { title: site.name + " | NeXora Ready", description: site.shortDescription, url: "/ready/" + slug, type: "website" },
  };
}
export default async function ReadyProductPage({ params }: Props) {
  const { slug } = await params;
  const site = findReadyProduct(slug);
  if (!site) notFound();
  const monthly = monthlyPlans[site.monthlyPlan];
  const conceptNumber = readySites.findIndex((entry) => entry.slug === site.slug) + 1;
  return <div className={styles.shop}>
    <a href="#ready-main" className="skip-link">Перейти к содержимому</a>
    <ReadyHeader />
    <main className={styles.productPage} id="ready-main">
      <div className={styles.crumb}><Link href="/ready">← Все готовые сайты</Link> / READY {String(conceptNumber).padStart(3, "0")}</div>
      <div className={styles.detailHead}>
        <h1>{site.name}</h1>
        <p>{site.title}. Выбираете готовый дизайн — мы адаптируем его под ваш бренд, тексты, фотографии и услуги.</p>
      </div>
      <div className={styles.detailGrid}>
        <div className={styles.previewColumn}>
          <ReadyPreview site={site} size="detail" />
          <div className={styles.previewNote}><span>Настоящее демо проекта · есть мобильная версия</span><a href={site.demoUrl} target="_blank" rel="noreferrer" data-analytics-event="ready_demo_open" data-concept={site.slug}>Посмотреть полный сайт ↗</a></div>
          <div className={styles.accordion}>
            <details><summary>Как это работает</summary><p>Вы выбираете сайт, отправляете заявку, мы обсуждаем задачу и согласуем адаптацию. Затем размещаем ваши материалы и запускаем сайт. Оплата — только после согласования условий.</p></details>
            <details><summary>Что входит</summary><p>{readyAdaptation} Мобильная версия, подготовка к запуску и базовая техническая SEO-настройка предусмотрены в концепции.</p></details>
            <details><summary>Что можно изменить</summary><p>Логотип, название, фотографии, тексты, услуги, цены, контакты и цвета в рамках дизайна. Существенную перестройку и новые функции обсуждаем отдельно.</p></details>
            <details><summary>Условия покупки и Monthly</summary><p>Покупка: {readyRights} Monthly: {monthlyStart} {monthlyCancel} {monthlyBuyout} В подписку входят хостинг, два пакета правок до {monthlySupport.editMinutes} минут суммарно в месяц и еженедельная техническая проверка. <Link href="/ready/monthly">Подробнее о Monthly ↗</Link></p></details>
          </div>
        </div>
        <aside>
          <div className={styles.purchasePanel}>
            <h2>Выберите формат</h2>
            <div className={styles.offer}><span>Купить<small>Разово, с адаптацией</small></span><strong>от {site.priceFrom.toLocaleString("ru-RU")} ₪</strong></div>
            <div className={styles.offer}><span>Monthly<small>Адаптация и поддержка</small></span><strong>{monthly.price} ₪/мес.</strong></div>
            <a className={styles.glassButton} href="#ready-order">Заказать сайт ↗</a>
            <a className={styles.glassOutline} href={site.demoUrl} target="_blank" rel="noreferrer" data-analytics-event="ready_demo_open" data-concept={site.slug}>Открыть демо ↗</a>
            <p>Без оплаты на сайте. Сначала согласуем детали.</p>
          </div>
          <ReadyOrderForm product={site.name} />
        </aside>
      </div>
    </main>
    <ReadyFooter />
  </div>;
}
