import { readyAdaptation, readyRights, clientMaterials, monthlyStart, monthlyCancel, monthlyBuyout } from "@/data/readyConditions";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { siteConfig, whatsappUrl } from "@/data/site";
import { addons } from "@/data/services";
import { monthlyPlans, monthlyPlanList, monthlyContentPack, monthlyPricePromise, monthlySupport } from "@/data/readyMonthly";
// ready-monthly-design-v4
import styles from "./monthly.module.css";

export const metadata: Metadata = {
  title: `Сайт по подписке от ${monthlyPlans.compact.price} ₪ в месяц | Ready Monthly`,
  description: `Сайт по подписке в Израиле от ${monthlyPlans.compact.price} ₪/мес. Ready Monthly: адаптация под бизнес, хостинг, два пакета правок и еженедельная техническая проверка.`,
  alternates: { canonical: "/ready/monthly" },
  openGraph: {
    title: "Ready Monthly — ваш сайт по подписке",
    description: `Готовый сайт с адаптацией, хостингом и ежемесячной поддержкой. От ${monthlyPlans.compact.price} ₪ в месяц.`,
    url: "/ready/monthly",
    type: "website",
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: "Ready Monthly by NeXora" }],
  },
  twitter: { card: "summary_large_image", title: "Ready Monthly — ваш сайт по подписке", description: `От ${monthlyPlans.compact.price} ₪ в месяц. Хостинг включён.`, images: ["/opengraph-image.png"] },
};

const includes = [
  ["КАЖДЫЙ МЕСЯЦ", "Два пакета правок", `Обновляем тексты, фото, цены и контакты. До ${monthlySupport.editMinutes} минут работы суммарно в месяц.`],
  ["КАЖДУЮ НЕДЕЛЮ", "Техническая проверка", "Проверяем сайт, формы, статус индексации в Search Console и сбор данных в Google Analytics."],
  ["ВЕСЬ ПЕРИОД", "Хостинг", "Размещение сайта на весь оплаченный период подписки."],
  ["НА СТАРТЕ", "Ваш бренд", "Настраиваем цвета, размещаем ваш логотип, фото и тексты, обновляем услуги и контакты."],
  ["НА СТАРТЕ", "Готовность к обращениям", "Настраиваем предусмотренные формы и WhatsApp, проверяем мобильную версию."],
  ["НА СТАРТЕ", "База для поиска", "Готовим метаданные, подключаем Search Console и базовую аналитику."],
];

const steps = [
  ["01", "Выбираем Ready", "Смотрим живое демо и подбираем концепцию под вашу задачу."],
  ["02", "Согласуем состав", "Фиксируем материалы, ежемесячную стоимость и необходимые дополнения."],
  ["03", "Адаптируем", "Собираем вашу версию сайта и согласуем её перед запуском."],
  ["04", "Запускаем", "Подключаем домен и публикуем сайт. Хостинг уже в подписке."],
];

const faq = [
  ["Чем Monthly отличается от покупки Ready?", "При покупке вы оплачиваете адаптацию выбранной Ready-концепции по цене покупки. В Monthly пользуетесь адаптированным сайтом по подписке с ежемесячной оплатой, включённым хостингом, правками и технической проверкой. Подписка сама по себе не означает автоматический выкуп сайта."],
  ["От чего зависит цена подписки?", `От формата сайта: компактный — ${monthlyPlans.compact.price} ₪/мес., лендинг — ${monthlyPlans.landing.price} ₪/мес., бизнес-сайт — ${monthlyPlans.business.price} ₪/мес. Для всех Ready-концепций одного формата действует единый тариф. Количество языков и возможности готовой концепции его не меняют.`],
  ["Что будет, если тарифы подорожают?", monthlyPricePromise],
  ["Хостинг нужно оплачивать отдельно?", "Нет. Хостинг входит в ежемесячную стоимость Ready Monthly. Домен и платные внешние сервисы — отдельные расходы, если они не включены в согласованное предложение."],
  ["Нужно ли доплачивать за второй язык?", "Количество языков в готовой Ready-концепции не меняет ежемесячную цену её формата. Если после выбора концепции потребуется добавить новый язык или заказать профессиональный перевод, эти дополнительные работы согласуем отдельно. Ежемесячный тариф подписки при этом сохраняется."],
  ["Content Pack обязателен?", "Нет. Если у вас готовы подходящие тексты и изображения, используем их. Content Pack нужен, когда требуется помощь с подготовкой контента. Его состав и стоимость согласуем до начала работ; оплата разовая."],
  ["Как работают два пакета правок?", monthlySupport.editsDescription],
  ["Что входит в еженедельную проверку?", monthlySupport.checksDescription],
  ["Можно ли добавить новые страницы или функции?", "Да. Новые страницы, языки, интеграции и изменение структуры сверх выбранной концепции оцениваем отдельно до начала работ. Сначала проверяем, что уже входит в ваш Ready."],
  ["Что нужно оплатить для запуска?", monthlyStart],
  ["Как отменить или возобновить подписку?", monthlyCancel],
  ["Можно ли выкупить сайт?", monthlyBuyout],
  ["Что можно изменить в концепции?", readyAdaptation],
  ["Кому принадлежат концепция и материалы?", readyRights + " " + clientMaterials],
];

function Extension({ id }: { id: string }) {
  const addon = addons.find(item => item.id === id);
  if (!addon) return null;
  return <div><span>{addon.name}</span><strong>от {addon.price.toLocaleString("ru-RU")} ₪</strong><small>разово (при необходимости)</small></div>;
}

export default function ReadyMonthlyPage() {
  const readyMessage = "Здравствуйте! Меня интересует Ready Monthly — сайт по подписке. Хочу подобрать концепцию под мой бизнес.";
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://nexoradesign.online").replace(/\/$/, "");
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${siteUrl}/ready/monthly#service`,
        name: "Ready Monthly — сайт по подписке",
        url: `${siteUrl}/ready/monthly`,
        serviceType: "Создание и сопровождение сайта по подписке",
        description: "Адаптация Ready-концепции, хостинг, два пакета правок в месяц и еженедельная техническая проверка.",
        provider: { "@id": `${siteUrl}/#organization` },
        areaServed: { "@type": "Country", name: "Israel" },
        offers: monthlyPlanList.map(plan => ({
          "@type": "Offer",
          name: `Ready Monthly — ${plan.name}`,
          url: `${siteUrl}/ready/monthly#${plan.id}`,
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: plan.price,
            priceCurrency: "ILS",
            unitText: "месяц",
            referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitText: "месяц" },
          },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "NeXora", item: `${siteUrl}/` },
          { "@type": "ListItem", position: 2, name: "Ready", item: `${siteUrl}/ready` },
          { "@type": "ListItem", position: 3, name: "Ready Monthly", item: `${siteUrl}/ready/monthly` },
        ],
      },
    ],
  };
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    <a className="skip-link" href="#ready-main">Перейти к содержимому</a>
    <header className="topbar ready-topbar">
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

          <span className="brand-tag">
            DIGITAL
            <br />
            PRESENCE
            <br />
            DESIGN
          </span>
        </Link>


        <nav aria-label="Навигация">
          <Link href="/#projects">Пример работы</Link>
          <Link href="/#solutions">Решения</Link>
          <Link href="/ready">Ready</Link>
          <Link href="/ready/monthly" aria-current="page">Monthly</Link>
          <Link href="/#process">Процесс</Link>
          <Link href="/services">Стоимость</Link>
        </nav>


        <a
          className="cta top-cta ready-desktop-cta"
          href={whatsappUrl(readyMessage)}
          target="_blank"
          rel="noreferrer"
        >
          Обсудить Monthly <span>→</span>
        </a>


        <details className="ready-mobile-menu">
          <summary aria-label="Открыть меню">
            <span></span>
            <span></span>
            <span></span>
          </summary>

          <div className="ready-mobile-menu-panel">
            <Link href="/#projects">Пример работы</Link>
            <Link href="/#solutions">Решения</Link>
            <Link href="/ready">Ready</Link>
          <Link href="/ready/monthly" aria-current="page">Monthly</Link>
            <Link href="/#process">Процесс</Link>
            <Link href="/services">Стоимость</Link>

            <a
              className="cta"
              href={whatsappUrl(readyMessage)}
              target="_blank"
              rel="noreferrer"
            >
              Обсудить Monthly <span>→</span>
            </a>
          </div>
        </details>
      </header>
    <main id="ready-main" className={styles.page}>
      <section className={`${styles.shell} ${styles.hero}`}>
        <div className={styles.heroCopy}>
          <Link href="/ready" className={styles.breadcrumb}>← Коллекция Ready</Link>
          <div className={styles.eyebrow}>READY MONTHLY · BY NEXORA</div>
          <h1>Ваш сайт<br /><em>с поддержкой<br />каждый месяц</em></h1>
          <p className={styles.lead}>Сайт по подписке от {monthlyPlans.compact.price} ₪ в месяц. Адаптация, хостинг и постоянная техническая поддержка включены.</p>
          <div className={styles.actions}>
            <a className="cta" href="#monthly-formats">Выбрать формат <span>↓</span></a>
            <Link className={styles.textLink} href="/ready#ready-collection">Посмотреть живые демо ↗</Link>
          </div>
          <div className={styles.proof}><span>2 пакета правок в месяц</span><span>Проверка сайта каждую неделю</span></div>
        </div>
        <div className={styles.heroArt} aria-hidden="true"><Image src="/images/monthly-glass-v4.webp" alt="" width={1536} height={1024} sizes="(max-width: 760px) 92vw, 52vw" priority /></div>
      </section>

      <section id="monthly-formats" className={`${styles.shell} ${styles.section}`}>
        <div className={styles.sectionHead}>
          <div><div className={styles.eyebrow}>01 / ВЫБЕРИТЕ ФОРМАТ</div><h2>Выберите свой формат</h2></div>
          <p>Один тариф для всех Ready-концепций выбранного формата. Во всех тарифах — хостинг, правки и техническая проверка.</p>
        </div>
        <div className={styles.offers}>
          {monthlyPlanList.map((plan) => <article key={plan.id} id={plan.id} className={styles.offer}>
            <h3>{plan.name}</h3>
            <p className={styles.offerDescription}>{plan.purpose}.</p>
            <div className={styles.offerPrice}>{plan.price} ₪ <small>/ месяц</small></div>
            <div className={styles.offerLinks}>
              <a href={whatsappUrl(`Здравствуйте! Меня интересует подписка Ready Monthly «${plan.name}» за ${plan.price} ₪ в месяц. Хочу подобрать Ready под мой бизнес.`)} target="_blank" rel="noreferrer">Выбрать →</a>
            </div>
          </article>)}
        </div>
        <p className={styles.footnote}><strong>Без стартового платежа и минимального срока подписки</strong></p>
        <p className={styles.pricePromise}><strong>Цена остаётся с вами.</strong> Новые тарифы не меняют стоимость действующей подписки.</p>
        <p className={styles.footnote}>Языки готовой концепции включены. Работы сверх её состава согласуем отдельно. <Link href="/ready#ready-collection">Смотреть концепции →</Link></p>
      </section>

      <section className={`${styles.shell} ${styles.section}`}>
        <div className={styles.sectionHead}>
          <div><div className={styles.eyebrow}>02 / ЧТО ВХОДИТ</div><h2>Запускаем и поддерживаем</h2></div>
        </div>
        <div className={styles.included}>{includes.map(([period, title, text]) => <article key={title}><span className={styles.includeNumber}>{period}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
        <p className={styles.footnote}>Пакет правок — один собранный список изменений. Два пакета делят общий лимит {monthlySupport.editMinutes} минут. <a href="#monthly-support-faq">Подробнее о поддержке →</a></p>
      </section>

      <section className={`${styles.shell} ${styles.section}`}>
        <div className={styles.sectionHead}>
          <div><div className={styles.eyebrow}>03 / ПРИ НЕОБХОДИМОСТИ</div><h2>Если нужно больше</h2></div>
          <p>Только дополнения сверх концепции и включённой поддержки. Стоимость согласуем до начала.</p>
        </div>
        <div className={styles.rails}>
          <article className={styles.contentPack}>
            <div><h3>{monthlyContentPack.name}</h3><p>Помощь с текстами и изображениями, если ваши материалы ещё не готовы.</p></div>
            <div className={styles.extraPrice}><strong>от {monthlyContentPack.price} ₪</strong><small>разово (при необходимости)</small></div>
          </article>
          <details className={styles.extraDetails}><summary><span>Языки и локализация</span><span aria-hidden="true">+</span></summary><div className={styles.railItems}><Extension id="language" /><Extension id="rtl" /></div><p>Уже включённые языки повторно не оплачиваются. Дополнения не меняют ежемесячный тариф.</p></details>
          <details className={styles.extraDetails}><summary><span>Страницы и формы</span><span aria-hidden="true">+</span></summary><div className={styles.railItems}><Extension id="page" /><Extension id="form" /><Extension id="smart-form" /></div></details>
        </div>
        <p className={styles.footnote}>Домен, профессиональный перевод и платные внешние сервисы — отдельно, если не включены в предложение. <Link href="/services#extras">Все дополнения →</Link></p>
      </section>

      <section className={`${styles.shell} ${styles.section}`}>
        <div className={styles.sectionHead}><div><div className={styles.eyebrow}>04 / КАК НАЧАТЬ</div><h2>Четыре шага до запуска</h2></div></div>
        <div className={styles.steps}>
          {steps.map(([number, title, text]) => <article key={number}><span className={styles.stepOrb}>{number}</span><h3>{title}</h3><p>{text}</p></article>)}
        </div>
      </section>

      <section className={`${styles.shell} ${styles.section} ${styles.faq}`}>
        <div><div className={styles.eyebrow}>READY MONTHLY / FAQ</div><h2>О подписке<br />по существу</h2></div>
        <div>{faq.map(([question, answer]) => <details key={question} id={question === "Как работают два пакета правок?" ? "monthly-support-faq" : undefined}><summary>{question}</summary><p>{answer}</p></details>)}</div>
      </section>

      <section className={`${styles.shell} ${styles.final}`}>
        <div className={styles.finalCopy}><div className={styles.eyebrow}>YOUR NEXT STEP</div><h2>Начнём с вашего бизнеса</h2><p>Подберём Ready для вашей задачи и возьмём на себя запуск и поддержку.</p><a className="cta" href={whatsappUrl(readyMessage)} target="_blank" rel="noreferrer">Обсудить Monthly <span>→</span></a></div>
        <div className={styles.finalArt} aria-hidden="true"><Image src="/images/monthly-glass-v4.webp" alt="" width={1536} height={1024} sizes="(max-width: 760px) 160px, 320px" /></div>
      </section>
    </main>
    <footer className="footer footer-v2 ready-footer ready-footer-v2 section-shell">

        <div className="footer-brand footer-brand-v2">
          <Image
            src="/brand/nexora-wordmark.png"
            alt="NeXora"
            width={160}
            height={60}
          />

          <span className="footer-brand-tag-v2">
            DIGITAL
            <br />
            PRESENCE
            <br />
            DESIGN
          </span>

          <p>
            Сайты и digital-продукты для бизнеса в Израиле
          </p>
        </div>


        <nav
          className="footer-links footer-links-v2"
          aria-label="Навигация в футере"
        >
          <Link href="/#projects">Пример работы</Link>
          <Link href="/#solutions">Решения</Link>
          <Link href="/ready">Ready</Link>
          <Link href="/ready/monthly">Monthly</Link>
          <Link href="/#process">Процесс</Link>
          <Link href="/services">Стоимость</Link>
        </nav>


        <div className="footer-contact footer-contact-v2">
          <a
            href={siteConfig.whatsapp}
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp
          </a>

          <a
            href={siteConfig.telegram}
            target="_blank"
            rel="noreferrer"
          >
            Telegram
          </a>

          <a href={siteConfig.phoneHref}>
            {siteConfig.phoneDisplay}
          </a>

          <small>
            Хайфа · Работаем с бизнесом по всему Израилю и удалённо
          </small>
        </div>


        <div className="footer-legal footer-legal-v2">
          <Link href="/privacy">Конфиденциальность</Link>
          <Link href="/terms">Условия</Link>
          <Link href="/accessibility">Доступность</Link>
        </div>

      </footer>
  </>;
}
