import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { readySites } from "@/data/readySites";
import { monthlyPlans } from "@/data/readyMonthly";
import { whatsappUrl } from "@/data/site";
import { MockupHeader } from "../../MockupHeader";
import { MockupFooter } from "../../MockupFooter";
import styles from "../../mockup.module.css";

const purposes: Record<string, { need: string; solves: string; audience: string }> = {
  "dental-clinic": {
    need: "Представить клинику как цельную систему: команду, направления, цены и способы обращения — на одном понятном сайте.",
    solves: "Услуги разбросаны по соцсетям, пациенту трудно сравнить процедуры, найти стоимость или понять, как записаться.",
    audience: "Частным стоматологиям и клиникам с несколькими направлениями, когда важно показать услуги, врачей, кейсы и языковые версии.",
  },
  "private-teacher": {
    need: "Показать личный подход специалиста, объяснить формат занятий и провести будущего ученика от знакомства до записи.",
    solves: "Потенциальному ученику не хватает информации о преподавателе, занятиях, стоимости и том, как проходит первое обращение.",
    audience: "Частным преподавателям, наставникам и авторам курсов, чьи клиенты выбирают специалиста по опыту и личному доверию.",
  },
  "brow-artist": {
    need: "Собрать услуги, примеры работ и запись в компактную страницу, которой удобно делиться из социальных сетей и рекламы.",
    solves: "Клиенту приходится искать цены и детали услуги в публикациях и переписке, прежде чем задать вопрос или записаться.",
    audience: "Частным brow- и lash-мастерам и небольшим beauty-студиям, которым нужна самостоятельная цифровая точка входа.",
  },
  "media-kit": {
    need: "Профессионально представить автора и его площадки, чтобы брендам было проще оценить аудиторию и обсудить сотрудничество.",
    solves: "Статистика, форматы интеграций и примеры работ разбросаны между файлами, соцсетями и сообщениями.",
    audience: "Блогерам, авторам и контент-креаторам, которые предлагают рекламные интеграции или экспертное сотрудничество.",
  },
};

type Params = { slug: string };

export function generateStaticParams() { return readySites.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const site = readySites.find(item => item.slug === slug);
  return { title: site ? `${site.name} — концепция и адаптация | NeXora` : "Концепция сайта | NeXora", robots: { index: false, follow: false } };
}

export default async function MockupConceptPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const site = readySites.find(item => item.slug === slug);
  if (!site) notFound();
  const plan = monthlyPlans[site.monthlyPlan];
  const detail = purposes[site.slug] ?? { need: site.description, solves: site.shortDescription, audience: site.title };
  const buyMessage = `Здравствуйте! Меня интересует покупка и адаптация Ready-сайта ${site.name}.`;
  const monthlyMessage = `Здравствуйте! Меня интересует подписка Ready Monthly для сайта ${site.name} за ${plan.price} ₪ в месяц.`;

  return <div className={`${styles.page} mockupRoot`}>
    <MockupHeader />
    <main>
      <section className={`${styles.container} ${styles.detailHero}`}>
        <div>
          <div className={styles.breadcrumbs}><Link href="/mockup">Ready-магазин</Link><span>/</span><span>{site.name}</span></div>
          <span className={styles.eyebrow}>{site.formatLabel} · {site.category}</span>
          <h1 className={styles.detailTitle}>Сайт для <em>{site.title.toLowerCase().replace(/^для /, "")}</em></h1>
          <p className={styles.detailLead}>{detail.need}</p>
          <div className={styles.detailPrice}><div><small>Покупка</small><strong>от {site.priceFrom.toLocaleString("ru-RU")} ₪</strong></div><div><small>Подписка Ready Monthly</small><strong>{plan.price} ₪ / мес.</strong></div></div>
          <div className={styles.detailActions}><a className={styles.buttonPrimary} href={whatsappUrl(buyMessage)} target="_blank" rel="noreferrer">Заявка на покупку ↗</a><a className={styles.buttonText} href={whatsappUrl(monthlyMessage)} target="_blank" rel="noreferrer">Заявка на подписку ↗</a></div>
        </div>
        <div className={styles.detailMedia}>
          <div className={styles.previewChrome}><span className={styles.dots}><i /><i /><i /></span><span className={styles.previewName}>{site.name} · LIVE DEMO</span></div>
          <iframe src={site.demoUrl} title={`Демо-концепция ${site.name}`} loading="lazy" tabIndex={-1} />
        </div>
      </section>

      <section className={styles.detailSections}>
        <div className={styles.container}>
          <div className={styles.detailSectionHead}><h2>Для кого и зачем</h2><p>Сначала объясняем бизнес-задачу и смысл структуры. Посетителю должно быть понятно, подходит ли ему эта концепция.</p></div>
          <div className={styles.detailGrid}>
            <article><span>01</span><h3>Кому подойдёт</h3><p>{detail.audience}</p></article>
            <article><span>02</span><h3>Какую задачу решает</h3><p>{detail.solves}</p></article>
            <article><span>03</span><h3>Что уже готово</h3><p>{site.shortDescription} Структура и основные сценарии разработаны; мы адаптируем материалы под ваш бренд.</p></article>
          </div>
        </div>
      </section>

      <section className={`${styles.container} ${styles.includeGrid}`}>
        <div><span className={styles.eyebrow}>ВАША ВЕРСИЯ КОНЦЕПЦИИ</span><h2>Что меняем при адаптации</h2><p>Сохраняем логику и характер выбранного решения. Заменяем конкретное содержание под ваш бизнес; индивидуальные доработки сверх концепции предварительно согласуем отдельно.</p></div>
        <ul className={styles.includeList}>{site.adaptationIncludes.map((item, i) => <li key={`${site.slug}-${i}`}>{item}</li>)}</ul>
      </section>

      <section className={styles.process}>
        <div className={`${styles.container} ${styles.processGrid}`}>
          <div><span className={styles.eyebrow}>ПУТЬ К ЗАПУСКУ</span><h2 className={styles.processTitle}>Сначала заявка.<br />Потом согласование.</h2></div>
          <ol className={styles.steps}><li><span>01</span><h3>Расскажите о бизнесе</h3><p>Уточним задачи, материалы и языки.</p></li><li><span>02</span><h3>Выберите формат</h3><p>Разовая покупка или Ready Monthly.</p></li><li><span>03</span><h3>Утвердите состав</h3><p>Фиксируем адаптацию и сроки до старта.</p></li><li><span>04</span><h3>Запустим сайт</h3><p>Проверим страницы и подключим домен.</p></li></ol>
        </div>
      </section>

      <section className={`${styles.container} ${styles.custom}`}>
        <div><span className={styles.eyebrow}>ВЫБРАТЬ ФОРМАТ</span><h2>Покупка или подписка</h2><p>Покупка — разовая оплата адаптации. Подписка — ежемесячный платёж за сайт, хостинг и поддержку по условиям Ready Monthly. Постоянное SEO-продвижение подключается отдельно.</p></div>
        <div className={styles.customFormats}><div><span>Купить {site.name}</span><b>от {site.priceFrom.toLocaleString("ru-RU")} ₪</b></div><div><span>Ready Monthly · {plan.name}</span><b>{plan.price} ₪ / мес.</b></div><a href="/mockup#options">Все условия подписки ↗</a></div>
      </section>
    </main>
    <MockupFooter />
  </div>;
}
