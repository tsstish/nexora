import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { readySites } from "@/data/readySites";
import { monthlyPlans } from "@/data/readyMonthly";
import { services } from "@/data/services";
import { whatsappUrl } from "@/data/site";
import { MockupHeader } from "./MockupHeader";
import { MockupFooter } from "./MockupFooter";
import styles from "./mockup.module.css";

export const metadata: Metadata = { title: "Мокап магазина готовых сайтов | NeXora", robots: { index: false, follow: false } };

const audience: Record<string, string> = {
  "dental-clinic": "Стоматологии и клиники",
  "private-teacher": "Преподаватели и наставники",
  "brow-artist": "Beauty-мастера",
  "media-kit": "Авторы и контент-креаторы",
};

const individualFormats = services.filter(({ slug }) => ["mini-site", "landing", "business-site", "ecommerce"].includes(slug));

export default function StoreMockupPage() {
  return <div className={`${styles.page} mockupRoot`}>
    <MockupHeader />
    <main>
      <section className={`${styles.container} ${styles.hero}`}>
        <div className={styles.heroCopy}>
          <span className={styles.eyebrow}>READY · КОЛЛЕКЦИЯ САЙТОВ NEXORA</span>
          <h1>Сайт для вашего бизнеса. <em>Уже есть основа.</em></h1>
          <p className={styles.heroText}>Выберите готовую концепцию, а мы адаптируем её под ваш бренд, услуги и клиентов. Изучите структуру и решите, что подходит: разовая покупка или подписка с поддержкой.</p>
          <div className={styles.heroActions}>
            <a className={styles.buttonPrimary} href="#catalog">Смотреть концепции <span>↓</span></a>
            <Link className={styles.buttonText} href="#custom">Нужен сайт с нуля? ↗</Link>
          </div>
          <div className={styles.heroMeta}><span><b>04</b> концепции</span><span><b>02</b> варианта оплаты</span><span>Без онлайн-оплаты</span></div>
        </div>
        <div className={styles.heroImage}>
          <Image src="/art/nexora-storefront-stilllife.webp" alt="Авторская композиция из бумаги и материалов в палитре NeXora" fill priority sizes="(max-width: 640px) 100vw, 50vw" />
          <span className={styles.heroIndex}>Nº 01 — READY COLLECTION</span>
          <span className={styles.artCaption}>ДИЗАЙН · СТРУКТУРА · КОД</span>
        </div>
      </section>

      <section className={styles.catalog} id="catalog">
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div><span className={styles.eyebrow}>МАГАЗИН READY</span><h2 className={styles.sectionTitle}>Выберите <em>свою основу</em></h2></div>
            <p className={styles.sectionIntro}>Каждая карточка ведёт на отдельную страницу концепции: кому она подходит, что меняем при адаптации и сколько стоит.</p>
          </div>
          <div className={styles.catalogGrid}>
            {readySites.map((site, index) => {
              const plan = monthlyPlans[site.monthlyPlan];
              return <article className={styles.product} key={site.slug}>
                <Link className={styles.preview} href={`/mockup/concept/${site.slug}`} aria-label={`Детали концепции ${site.name}`}>
                  <Image className={styles.placeholder} src="/ready/site-screenshot-placeholder.svg" alt="Скриншот сайта будет здесь" fill sizes="(max-width: 640px) 100vw, 50vw" />
                </Link>
                <div className={styles.productBody}>
                  <div className={styles.productTop}><span>{site.formatLabel}</span><span>№ {String(index + 1).padStart(2,"0")}</span></div>
                  <h3>{site.name}</h3>
                  <p className={styles.productAudience}>{audience[site.slug] ?? site.title}</p>
                  <p className={styles.productDescription}>{site.shortDescription}</p>
                  <div className={styles.productBottom}>
                    <div className={styles.priceOptions}><div><small>Покупка</small><strong>от {site.priceFrom.toLocaleString("ru-RU")} ₪</strong></div><div><small>Подписка</small><strong>{plan.price} ₪ / мес.</strong></div></div>
                    <div className={styles.productLinks}><Link href={`/mockup/concept/${site.slug}`}>О концепции ↗</Link><a href={whatsappUrl(`Здравствуйте! Хочу узнать об адаптации сайта ${site.name}.`)} target="_blank" rel="noreferrer">Заявка</a></div>
                  </div>
                </div>
              </article>;
            })}
          </div>
          <div className={styles.catalogBottom}><span>Не уверены, какая структура подойдёт?</span><a href={whatsappUrl("Здравствуйте! Помогите выбрать Ready-концепцию для моего бизнеса.")} target="_blank" rel="noreferrer">Расскажите о бизнесе — подскажем ↗</a></div>
        </div>
      </section>

      <section className={`${styles.container} ${styles.options}`} id="options">
        <div className={styles.optionsHead}><span className={styles.eyebrow}>ДВА СПОСОБА НАЧАТЬ</span><h2 className={styles.sectionTitle}>Покупка или <em>подписка?</em></h2><p>Обе модели включают адаптацию сайта. Заявку оставляете напрямую — онлайн-оплаты нет.</p></div>
        <div className={styles.optionsGrid}>
          <article className={styles.option}>
            <span className={styles.optionMeta}>01 · ПОКУПКА</span><h3>Оплатить один раз</h3>
            <p>Оплачиваете адаптацию готовой концепции один раз. Цена указана в карточке сайта.</p>
            <ul className={styles.optionList}><li>Ваш бренд, тексты и материалы</li><li>Подготовка и запуск сайта</li></ul>
            <a className={styles.optionLink} href={whatsappUrl("Здравствуйте! Расскажите, пожалуйста, подробнее о покупке Ready-сайта.")} target="_blank" rel="noreferrer">Спросить о покупке ↗</a>
          </article>
          <article className={styles.option}>
            <span className={styles.optionMeta}>02 · READY MONTHLY</span><h3>Адаптация и поддержка ежемесячно</h3>
            <p>Хостинг, еженедельная проверка и до 90 минут контентных правок в месяц.</p>
            <div className={styles.optionPrices}><div>Компактный <b>249 ₪</b><span>/ мес.</span></div><div>Лендинг <b>299 ₪</b><span>/ мес.</span></div><div>Бизнес <b>399 ₪</b><span>/ мес.</span></div></div>
            <a className={styles.optionLink} href="#monthly-terms">Условия подписки ↗</a>
          </article>
        </div>
      </section>

      <section className={styles.monthlyTerms} id="monthly-terms"><div className={styles.container}><span className={styles.eyebrow}>READY MONTHLY · КРАТКО</span><p>Отменить можно в любой момент: сайт работает до конца оплаченного месяца. Включены хостинг, еженедельная техническая проверка и два пакета правок общим объёмом до 90 минут. Базовая SEO-подготовка — при запуске; постоянное SEO-продвижение подключается отдельно.</p><a href={whatsappUrl("Здравствуйте! Хочу узнать подробнее об условиях Ready Monthly.")} target="_blank" rel="noreferrer">Обсудить подписку ↗</a></div></section>

      <section className={styles.process} id="how">
        <div className={`${styles.container} ${styles.processGrid}`}>
          <div><span className={styles.eyebrow}>КАК ЭТО РАБОТАЕТ</span><h2 className={styles.processTitle}>От выбора<br />до запуска</h2></div>
          <ol className={styles.steps}><li><span>01</span><h3>Вы выбираете</h3><p>Изучаете назначение и состав концепции.</p></li><li><span>02</span><h3>Оставляете заявку</h3><p>Обсуждаем бизнес, наполнение и формат.</p></li><li><span>03</span><h3>Согласуем адаптацию</h3><p>Меняем бренд, тексты, визуалы и детали.</p></li><li><span>04</span><h3>Публикуем</h3><p>Проверяем сайт и запускаем на вашем домене.</p></li></ol>
        </div>
      </section>

      <section className={`${styles.container} ${styles.custom}`} id="custom">
        <div><span className={styles.eyebrow}>ИНДИВИДУАЛЬНАЯ РАЗРАБОТКА</span><h2>Нужна другая структура?</h2><p>Создадим сайт с нуля, если готовая концепция не подходит: спроектируем страницы, визуальный язык и нужные функции под ваш бизнес.</p></div>
        <div className={styles.customFormats}>{individualFormats.map(item => <div key={item.slug}><span>{item.name}</span><b>{item.priceLabel}</b></div>)}</div>
      </section>
    </main>
    <MockupFooter />
  </div>;
}
