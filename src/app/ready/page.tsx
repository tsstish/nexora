import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { readySites } from "@/data/readySites";
import { siteConfig, whatsappUrl } from "@/data/site";

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
).replace(/\/$/, "");

export const metadata: Metadata = {
  title: "Готовые сайты с адаптацией для бизнеса в Израиле",
  description:
    "Ready by NeXora — готовые разработанные сайты, не шаблоны. Выберите концепцию, а мы адаптируем бренд, контент, языки и функции под ваш бизнес в Израиле.",
  keywords: [
    "готовые сайты для бизнеса",
    "готовый сайт Израиль",
    "сайт с адаптацией под бизнес",
    "готовый сайт для компании",
    "создание сайта для бизнеса в Израиле",
    "Ready by NeXora",
  ],
  alternates: {
    canonical: "/ready",
  },
  openGraph: {
    title: "Готовые сайты с адаптацией | Ready by NeXora",
    description:
      "Не шаблоны, а уже разработанные сайты. Выберите Ready-концепцию и адаптируйте её под бренд, контент и задачи вашего бизнеса.",
    url: "/ready",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Ready by NeXora — готовые сайты для бизнеса",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Готовые сайты с адаптацией | Ready by NeXora",
    description:
      "Не шаблоны, а уже разработанные сайты с адаптацией под конкретный бизнес.",
    images: ["/opengraph-image.png"],
  },
};

const adaptationItems = [
  {
    index: "01",
    title: "Ваш бренд",
    text: "Меняем название, логотип и фирменные данные под вашу компанию.",
  },
  {
    index: "02",
    title: "Ваш контент",
    text: "Размещаем реальные услуги, цены, тексты и фотографии бизнеса.",
  },
  {
    index: "03",
    title: "Ваши контакты",
    text: "Подключаем телефон, WhatsApp и необходимые сценарии обращения.",
  },
  {
    index: "04",
    title: "Ваш функционал",
    text: "Настраиваем формы и согласованные функции, необходимые для запуска.",
  },
  {
    index: "05",
    title: "SEO и аналитика",
    text: "Готовим техническое SEO, Search Console и Google Analytics 4.",
  },
  {
    index: "06",
    title: "Запуск",
    text: "Подключаем домен, проверяем мобильную версию и публикуем сайт.",
  },
];

const faq = [
  {
    q: "Чем готовый сайт отличается от шаблона?",
    a: "Ready by NeXora — это уже спроектированный и разработанный сайт для определённого типа бизнеса. Мы не просто меняем логотип в универсальном шаблоне, а адаптируем готовую дизайн-систему, структуру и контент под конкретную компанию.",
  },
  {
    q: "Почему Ready-сайт стоит дешевле индивидуальной разработки?",
    a: "Структура, UX/UI-дизайн и основная разработка уже выполнены. Клиент оплачивает адаптацию готового решения под свой бизнес, а не повторное создание проекта с чистого листа.",
  },
  {
    q: "Можно ли изменить готовый сайт сильнее?",
    a: "Да. Базовая цена относится к адаптации существующей концепции. Дополнительные страницы, новые модули, сложные интеграции и существенная переработка структуры рассчитываются отдельно.",
  },
  {
    q: "Входит ли SEO?",
    a: "В запуск входит базовая техническая SEO-подготовка: структура метаданных, sitemap, robots, canonical, подключение Google Search Console и базовая аналитика. Постоянное поисковое продвижение является отдельной работой.",
  },
];

export default function ReadyPage() {
  const catalogJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Готовые сайты NeXora",
    url: `${siteUrl}/ready`,
    description:
      "Готовые сайты для бизнеса с адаптацией под бренд, контент и задачи клиента.",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: readySites.map((site, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: site.demoUrl,
        name: site.title,
      })),
    },
  };

  const readyMessage =
    "Здравствуйте! Меня интересуют готовые сайты Ready by NeXora. Хочу подобрать вариант под мой бизнес.";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(catalogJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <a className="skip-link" href="#ready-main">
        Перейти к содержимому
      </a>

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
          <Link href="/#projects">Проекты</Link>
          <Link href="/#solutions">Решения</Link>
          <Link href="/ready" aria-current="page">Ready</Link>
          <Link href="/#process">Процесс</Link>
          <Link href="/services">Стоимость</Link>
        </nav>


        <a
          className="cta top-cta ready-desktop-cta"
          href={whatsappUrl(readyMessage)}
          target="_blank"
          rel="noreferrer"
        >
          Обсудить адаптацию <span>→</span>
        </a>


        <details className="ready-mobile-menu">
          <summary aria-label="Открыть меню">
            <span></span>
            <span></span>
            <span></span>
          </summary>

          <div className="ready-mobile-menu-panel">
            <Link href="/#projects">Проекты</Link>
            <Link href="/#solutions">Решения</Link>
            <Link href="/ready">Ready</Link>
            <Link href="/#process">Процесс</Link>
            <Link href="/services">Стоимость</Link>

            <a
              className="cta"
              href={whatsappUrl(readyMessage)}
              target="_blank"
              rel="noreferrer"
            >
              Обсудить адаптацию <span>→</span>
            </a>
          </div>
        </details>
      </header>

      <main id="ready-main" className="ready-v2">
        {/* HERO */}
        <section className="ready-v2-hero section-shell">
          <div className="ready-v2-copy">
            <div className="eyebrow">READY BY NEXORA · DIGITAL SHOWROOM</div>

<h1>
  Шоурум
  <br />
  готовых сайтов
</h1>

<p className="ready-v2-lead">
  Не шаблоны, а полностью разработанные концепции сайтов.
  Вы выбираете подходящую основу — мы адаптируем её под ваш бренд,
  контент и задачи бизнеса.
</p>

            <div className="ready-v2-actions">
              <a className="cta" href="#ready-collection">
                Смотреть коллекцию <span>↓</span>
              </a>

              <Link className="text-link" href="/services">
                Индивидуальная разработка →
              </Link>
            </div>

            <div className="ready-v2-proof">
              <span>Не шаблоны</span>
              <span>Адаптация под бизнес</span>
              <span>SEO-ready</span>
            </div>
          </div>

          <div className="ready-v2-art" aria-hidden="true">
  <Image
    src="/ready/ready-hero.png"
    alt=""
    width={1536}
    height={1024}
    className="ready-v2-art-image"
    priority
  />
</div>
        </section>

        {/* COLLECTION */}
        <section
          id="ready-collection"
          className="ready-v2-collection section-shell"
        >
          <div className="ready-v2-section-head ready-showroom-head">
            <div>
              <div className="eyebrow">КОЛЛЕКЦИЯ READY</div>
              <h2>Шоурум готовых концепций</h2>
            </div>

            <p>
              Здесь не шаблоны. Каждый проект уже спроектирован,
              оформлен и разработан как полноценный сайт для
              определённого типа бизнеса.
            </p>
          </div>

          <div className="ready-showcase-list">
            {readySites.map((site, index) => {
              const difference =
                site.individualPriceFrom - site.priceFrom;

              const adaptationMessage =
                `Здравствуйте! Меня интересует Ready-концепция ${site.name}. Хочу обсудить адаптацию под мой бизнес.`;

              return (
                <article className="ready-showcase-card" key={site.slug}>
                  <div className="ready-showcase-stage">
                    <span className="ready-showcase-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <div
                      className="ready-showcase-devices"
                      aria-label={`Живая демонстрация ${site.name}`}
                    >
                      <div className="ready-showcase-laptop">
                        <div className="ready-showcase-laptop-screen">
                          <div className="ready-showcase-browserbar">
                            <span>
                              <i />
                              <i />
                              <i />
                            </span>
                            <b>{site.name}</b>
                            <small>LIVE DEMO</small>
                          </div>

                          <div className="ready-showcase-desktop-frame">
                            <iframe
                              src={site.demoUrl}
                              title={`${site.name} — демонстрация на компьютере`}
                              loading="lazy"
                              tabIndex={-1}
                            />
                          </div>
                        </div>

                        <div className="ready-showcase-laptop-base" />
                      </div>

                      <div className="ready-showcase-phone">
                        <div className="ready-showcase-phone-notch" />
                        <div className="ready-showcase-mobile-frame">
                          <iframe
                            src={site.demoUrl}
                            title={`${site.name} — мобильная демонстрация`}
                            loading="lazy"
                            tabIndex={-1}
                          />
                        </div>
                      </div>
                    </div>

                    <span className="ready-showcase-live">
                      Можно прокручивать прямо в экране — это интерактивное демо
                    </span>
                  </div>

                  <div className="ready-showcase-info">
                    <div className="ready-showcase-topline">
                      <span className="ready-product-status">
                        Доступен для адаптации
                      </span>
                      <span>
                        {String(index + 1).padStart(2, "0")} / READY
                      </span>
                    </div>

                    <div className="eyebrow">{site.category}</div>

                    <h3>{site.name}</h3>
                    <h4>{site.title}</h4>

                    <p className="ready-showcase-plain">
                      Это уже разработанный сайт. Перед запуском мы
                      заменим его бренд, материалы и настройки на данные
                      вашей компании.
                    </p>

                    <p className="ready-showcase-description">
                      {site.shortDescription}
                    </p>

                    <div className="ready-product-tags">
                      {site.languages.map((item) => (
                        <span key={item}>{item}</span>
                      ))}
                      <span>Mobile</span>
                      <span>SEO</span>
                    </div>

                    <div className="ready-showcase-pricing">
                      <div>
                        <span>Аналогичная разработка с нуля</span>
                        <strong>
                          от {site.individualPriceFrom.toLocaleString("ru-RU")} ₪
                        </strong>
                      </div>

                      <div className="ready-showcase-price-main">
                        <span>Адаптация Ready-концепции</span>
                        <strong>
                          от {site.priceFrom.toLocaleString("ru-RU")} ₪
                        </strong>
                      </div>
                    </div>

                    <div className="ready-showcase-saving">
                      Вы экономите от {difference.toLocaleString("ru-RU")} ₪ —
                      дизайн, структура и основная разработка уже готовы
                    </div>

                    <div className="ready-showcase-actions">
                      <a
                        className="ready-demo-link"
                        href={site.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Смотреть демо ↗
                      </a>

                      <a
                        className="cta"
                        href={whatsappUrl(adaptationMessage)}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Обсудить адаптацию →
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* WHAT CHANGES */}
        <section className="ready-adaptation-strip section-shell">
          <div className="ready-adaptation-intro">
            <div>
              <div className="eyebrow">ЧТО ВХОДИТ В АДАПТАЦИЮ</div>
              <h2>Готовая концепция становится вашим сайтом</h2>
            </div>

            <p>
              Основа уже создана. Перед запуском мы заменяем демонстрационные
              данные на материалы вашего бизнеса и настраиваем сайт под реальные
              задачи компании.
            </p>
          </div>

          <div className="ready-adaptation-rail">
            {adaptationItems.map((item) => (
              <article key={item.index}>
                <span className="ready-adaptation-index">{item.index}</span>

                <div className="ready-adaptation-symbol" aria-hidden="true">
                  {item.index === "01" && "✦"}
                  {item.index === "02" && "Aa"}
                  {item.index === "03" && "⌁"}
                  {item.index === "04" && "↗"}
                  {item.index === "05" && "◎"}
                  {item.index === "06" && "✓"}
                </div>

                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        {/* READY VS INDIVIDUAL */}
        <section className="ready-paths section-shell">
          <div className="ready-paths-head">
            <div>
              <div className="eyebrow">ДВА ПУТИ</div>
              <h2>Выберите степень свободы</h2>
            </div>

            <p>
              Если вам подходит готовая концепция — мы адаптируем уже
              разработанную основу. Если нужна полностью своя структура,
              визуальный язык и логика — создаём проект с нуля.
            </p>
          </div>

          <div className="ready-paths-board">
            <article className="ready-path ready-path-featured">
              <span className="ready-path-label">READY</span>
              <span className="ready-path-number">01</span>

              <h3>Выбрать готовую концепцию</h3>

              <p>
                Вы заранее видите будущий сайт и оплачиваете адаптацию,
                а не повторное создание уже готового дизайна и разработки.
              </p>

              <div className="ready-path-prices">
                <div>
                  <span>Мини-сайт</span>
                  <strong>от 1 190 ₪</strong>
                </div>
                <div>
                  <span>Лендинг</span>
                  <strong>от 2 900 ₪</strong>
                </div>
                <div>
                  <span>Бизнес-сайт</span>
                  <strong>от 4 900 ₪</strong>
                </div>
              </div>

              <small className="ready-path-note">
                Цена конкретной Ready-концепции указана в её карточке и зависит
                от уже реализованных в ней возможностей
              </small>

              <div className="ready-path-bottom">
                <a href="#ready-collection">Смотреть Ready ↑</a>
              </div>
            </article>

            <div className="ready-path-divider" aria-hidden="true">
              <span>или</span>
            </div>

            <article className="ready-path ready-path-individual">
              <span className="ready-path-label">INDIVIDUAL</span>
              <span className="ready-path-number">02</span>

              <h3>Создать всё с нуля</h3>

              <p>
                Проектируем структуру, дизайн и разработку специально под
                конкретный бизнес без привязки к готовой концепции.
              </p>

              <div className="ready-path-prices ready-path-prices-individual">
                <div>
                  <span>Мини-сайт</span>
                  <strong>от 1 900 ₪</strong>
                </div>
                <div>
                  <span>Лендинг</span>
                  <strong>от 4 900 ₪</strong>
                </div>
                <div>
                  <span>Бизнес-сайт</span>
                  <strong>от 8 900 ₪</strong>
                </div>
              </div>

              <small className="ready-path-note">
                Дополнительные языки, RTL, интеграции, страницы и отдельные
                функции рассчитываются дополнительно
              </small>

              <div className="ready-path-bottom">
                <a href="/services">Смотреть форматы →</a>
              </div>
            </article>
          </div>

          <div className="ready-paths-explainer">
            <span>Например</span>
            <p>
              MIDA включает второй язык и RTL. Поэтому аналогичная разработка
              с нуля рассчитывается от 10 600 ₪, а адаптация готовой
              MIDA-концепции — от 4 900 ₪.
            </p>
          </div>
        </section>

        {/* NEXT COLLECTION */}
        <section className="ready-future section-shell">
          <div className="ready-future-copy">
            <div className="eyebrow">КОЛЛЕКЦИЯ РАСТЁТ</div>

            <h2>Следующие концепции уже в работе</h2>

            <p>
              Мы не заполняем каталог шаблонами ради количества.
              Каждый новый Ready-проект сначала проходит полноценный дизайн,
              разработку и проверку — и только потом появляется в шоуруме.
            </p>
          </div>

          <div className="ready-future-shelf">
            <article className="ready-future-card ready-future-card-a">
              <span>02</span>
              <div className="ready-future-lines" aria-hidden="true">
                <i />
                <i />
                <i />
              </div>
              <strong>В разработке</strong>
              <small>Следующая Ready-концепция</small>
            </article>

            <article className="ready-future-card ready-future-card-b">
              <span>03</span>
              <div className="ready-future-window" aria-hidden="true">
                <i />
                <i />
                <b />
              </div>
              <strong>В разработке</strong>
              <small>Новый тип бизнеса</small>
            </article>

            <article className="ready-future-card ready-future-card-c">
              <span>04</span>
              <div className="ready-future-orbit" aria-hidden="true">
                <i />
                <b />
              </div>
              <strong>В разработке</strong>
              <small>Коллекция продолжится</small>
            </article>
          </div>
        </section>

        {/* FAQ */}
        <section className="ready-faq-showroom section-shell">
          <div className="ready-faq-showroom-intro">
            <div className="eyebrow">КРАТКО О READY</div>

            <h2>Что важно знать перед выбором</h2>

            <p>
              Ready — это не покупка шаблона. Вы получаете уже разработанную
              основу, которую NeXora адаптирует и готовит к реальному запуску.
            </p>

            <span>READY / FAQ</span>
          </div>

          <div className="ready-faq-showroom-list">
            {faq.map((item, index) => (
              <details key={item.q}>
                <summary>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{item.q}</strong>
                  <i>+</i>
                </summary>

                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section id="contact" className="ready-end section-shell">
          <div>
            <span>НЕ НАШЛИ ПОДХОДЯЩУЮ КОНЦЕПЦИЮ?</span>
            <h2>Тогда создадим вашу</h2>
            <p>
              Расскажите о бизнесе и задаче — подскажем, имеет ли смысл
              адаптировать Ready-сайт или лучше начать индивидуальную
              разработку.
            </p>
          </div>

          <a
            className="cta"
            href={whatsappUrl(readyMessage)}
            target="_blank"
            rel="noreferrer"
          >
            Обсудить задачу →
          </a>
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
          <Link href="/#projects">Проекты</Link>
          <Link href="/#solutions">Решения</Link>
          <Link href="/ready">Ready</Link>
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
    </>
  );
}