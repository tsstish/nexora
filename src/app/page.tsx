import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { readySites } from "@/data/readySites";
import { monthlyPlans, monthlySupport } from "@/data/readyMonthly";
import { services } from "@/data/services";
import { siteConfig, whatsappUrl } from "@/data/site";
import styles from "./store.module.css";

export const metadata: Metadata = {
  title: "Готовые сайты для бизнеса — выберите и адаптируйте | NeXora",
  description: "Каталог готовых сайтов NeXora: выберите концепцию, адаптируйте под свой бизнес и оставьте заявку на покупку или подписку с поддержкой.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Сайт для бизнеса — выберите готовую концепцию | NeXora",
    description: "Готовые сайты с адаптацией под ваш бренд. Покупка или подписка с хостингом и поддержкой.",
    url: "/",
    type: "website",
  },
};

function StoreHeader() {
  return <header className={styles.header}>
    <Link href="/" className={styles.brand} aria-label="NeXora — главная">
      <Image src="/brand/nexora-wordmark.png" alt="NeXora" width={188} height={66} priority />
      <span className={styles.brandRule} />
      <span className={styles.descriptor}>DIGITAL<br />PRESENCE<br />DESIGN</span>
    </Link>
    <nav aria-label="Главная навигация">
      <a href="#catalog">Готовые сайты</a>
      <a href="#how-it-works">Как работает</a>
      <Link href="/ready/monthly">Подписка</Link>
      <Link href="/services">Индивидуальная разработка</Link>
    </nav>
    <a className={styles.headerCta} href="#catalog">Выбрать сайт <span>↘</span></a>
    <details className={styles.mobileMenu}>
      <summary aria-label="Открыть меню"><i /><i /><i /></summary>
      <div>
        <a href="#catalog">Готовые сайты</a>
        <a href="#how-it-works">Как работает</a>
        <Link href="/ready/monthly">Подписка</Link>
        <Link href="/services">Индивидуальная разработка</Link>
        <a className={styles.headerCta} href="#catalog">Выбрать сайт <span>↘</span></a>
      </div>
    </details>
  </header>;
}

function HeroArt() {
  return <div className={styles.heroArt} aria-label="Стилизованная композиция из элементов сайта">
    <div className={styles.heroOrb} />
    <div className={styles.heroSun} />
    <div className={styles.heroLeaf} />
    <div className={styles.heroWindow}>
      <div className={styles.windowBar}><span /><span /><span /><small>YOUR NEXT WEBSITE</small></div>
      <div className={styles.windowBody}>
        <div className={styles.windowEyebrow}>READY TO MAKE IT YOURS</div>
        <div className={styles.windowTitle}>Ваш бренд.<br />Ваш сайт.</div>
        <div className={styles.windowLines}><i /><i /><i /></div>
        <div className={styles.windowButton}>НАЧАТЬ ↗</div>
        <div className={styles.windowBlocks}><i /><i /><i /></div>
      </div>
    </div>
    <div className={styles.artTag}><span>01—04</span><b>готовые<br />концепции</b></div>
    <div className={styles.artCaption}>СТРУКТУРА · ДИЗАЙН · КОД</div>
  </div>;
}

function ProductCard({ site, index }: { site: (typeof readySites)[number]; index: number }) {
  const plan = monthlyPlans[site.monthlyPlan];
  const purchaseLead = `Здравствуйте! Меня интересует покупка Ready-сайта ${site.name} за ${site.priceFrom.toLocaleString("ru-RU")} ₪. Хочу обсудить адаптацию под мой бизнес.`;
  const monthlyLead = `Здравствуйте! Меня интересует подписка Ready Monthly для сайта ${site.name}: ${plan.name}, ${plan.price} ₪ в месяц. Хочу оставить заявку.`;
  const audience = ({
    "dental-clinic": "Стоматологии и частные клиники",
    "private-teacher": "Преподаватели, наставники и авторы курсов",
    "brow-artist": "Beauty-мастера и студии",
    "media-kit": "Блогеры, авторы и контент-креаторы",
  } as Record<string, string>)[site.slug] ?? site.title;
  return <article className={styles.product}>
    <a className={styles.preview} href={site.demoUrl} target="_blank" rel="noreferrer" aria-label={`Открыть демо ${site.name}`} data-analytics-event="ready_demo_open" data-concept={site.slug}>
      <div className={styles.previewTop}><span><i /><i /><i /></span><b>{site.name}</b><small>LIVE DEMO ↗</small></div>
      <div className={styles.previewScreen} aria-hidden="true">
        <iframe src={site.demoUrl} title={`${site.name} — визуальный пример сайта`} loading="lazy" tabIndex={-1} />
      </div>
      <span className={styles.previewNumber}>{String(index + 1).padStart(2, "0")} / READY</span>
    </a>
    <div className={styles.productInfo}>
      <div className={styles.productType}><span>{site.formatLabel}</span><span>АДАПТАЦИЯ ВКЛЮЧЕНА</span></div>
      <h3>{site.name}</h3>
      <p className={styles.audience}>{audience}</p>
      <p className={styles.description}>{site.shortDescription}</p>
      <div className={styles.productFooter}>
        <div className={styles.pricePair}>
          <div><small>Покупка</small><strong>от {site.priceFrom.toLocaleString("ru-RU")} ₪</strong></div>
          <div><small>Подписка</small><strong>{plan.price} ₪<em>/мес.</em></strong></div>
        </div>
        <div className={styles.productActions}>
          <a className={styles.purchaseRequest} href={whatsappUrl(purchaseLead)} target="_blank" rel="noreferrer" data-direction={`ready_buy_${site.slug}`}>Заявка на покупку <span>↗</span></a>
          <a className={styles.monthlyRequest} href={whatsappUrl(monthlyLead)} target="_blank" rel="noreferrer" data-analytics-event="monthly_plan_select" data-plan={plan.id} data-direction={`monthly_${plan.id}`}>Заявка на подписку <span>↗</span></a>
        </div>
        <Link className={styles.detailsLink} href={`/ready#concept-${site.slug}`}>Что входит в адаптацию <span>→</span></Link>
      </div>
    </div>
  </article>;
}

const individualFormats = services.filter(({ slug }) => ["mini-site", "landing", "business-site", "ecommerce"].includes(slug));

export default function HomePage() {
  return <>
    <a className={styles.skipLink} href="#main">Перейти к каталогу</a>
    <StoreHeader />
    <main id="main">
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <div className={styles.kicker}><span /> READY SITES · BY NEXORA</div>
          <h1>Хороший сайт<br />уже <em>начался.</em></h1>
          <p>Выберите готовую концепцию и превратите её в сайт своего бизнеса: с вашим логотипом, цветами, фотографиями, услугами и контактами.</p>
          <div className={styles.heroActions}>
            <a className={styles.primaryButton} href="#catalog">Выбрать готовый сайт <span>↓</span></a>
            <Link className={styles.secondaryButton} href="/services">Нужен сайт с нуля? <span>↗</span></Link>
          </div>
          <div className={styles.heroFootnote}><span>4</span> живые концепции <i /> <span>2</span> способа оплаты</div>
        </div>
        <HeroArt />
      </section>

      <section className={styles.promise} aria-label="Что можно адаптировать">
        <span>Вы выбираете основу</span><b>→</b><span>Мы меняем под ваш бизнес</span><b>→</b><span>Вы получаете готовый сайт</span>
        <p>Логотип · палитра · тексты · фото · услуги · цены · контакты</p>
      </section>

      <section id="catalog" className={styles.catalog}>
        <div className={styles.sectionHeading}>
          <div><span className={styles.eyebrow}>КАТАЛОГ READY</span><h2>Выберите свою концепцию</h2></div>
          <p>Это уже разработанные сайты, а не наборы макетов. Посмотрите живые демо и выберите основу, которая ближе вашему бизнесу.</p>
        </div>
        <div className={styles.productGrid}>
          {readySites.map((site, index) => <ProductCard key={site.slug} site={site} index={index} />)}
        </div>
        <div className={styles.catalogNote}><span>Не уверены, какая концепция подойдёт?</span><a href={whatsappUrl("Здравствуйте! Помогите, пожалуйста, выбрать Ready-сайт для моего бизнеса.")} target="_blank" rel="noreferrer">Опишите бизнес — поможем выбрать ↗</a></div>
      </section>

      <section className={styles.adaptation}>
        <div className={styles.adaptationVisual} aria-hidden="true">
          <div className={styles.colorCard}><span>ВАШ БРЕНД</span><i /><i /><i /><b>ЛОГОТИП</b></div>
          <div className={styles.colorSwatch}><span /><span /><span /><span /></div>
          <div className={styles.adaptArrow}>→</div>
          <div className={styles.adaptLabel}>ГОТОВАЯ<br />КОНЦЕПЦИЯ</div>
        </div>
        <div className={styles.adaptationCopy}>
          <span className={styles.eyebrow}>ВАША ОСНОВА · ВАШ БИЗНЕС</span>
          <h2>Поменяем содержание.<br /><em>Сохраним сильную структуру.</em></h2>
          <p>В выбранной концепции заменим фирменные данные, тексты, изображения, услуги, цены и способы связи. Подстроим цвета под ваш бренд, проверим мобильную версию и подготовим сайт к запуску.</p>
          <ul><li>Логотип и название компании</li><li>Цветовая система и фотографии</li><li>Тексты, услуги, цены и контакты</li><li>Формы обращения и WhatsApp</li><li>Базовая SEO-подготовка и аналитика</li></ul>
          <Link href="/ready">Посмотреть детали адаптации <span>→</span></Link>
        </div>
      </section>

      <section className={styles.commerce}>
        <div className={styles.sectionHeading}>
          <div><span className={styles.eyebrow}>ДВА ПУТИ К СВОЕМУ САЙТУ</span><h2>Покупка или подписка?</h2></div>
          <p>Выберите удобный способ начать. В обоих случаях сайт адаптируется под ваш бизнес и публикуется после согласования.</p>
        </div>
        <div className={styles.commerceGrid}>
          <article className={styles.buyCard}>
            <div className={styles.choiceIndex}>01 / КУПИТЬ</div>
            <h3>Оплатить один раз</h3>
            <p>Вы оплачиваете адаптацию выбранной концепции и используете сайт для своего бизнеса. Хостинг для Ready включён.</p>
            <ul><li>Разовая стоимость — указана в карточке</li><li>Замена бренда и материалов</li><li>Базовая SEO-подготовка и публикация</li><li>Поддержку после запуска можно согласовать отдельно</li></ul>
            <a href={whatsappUrl("Здравствуйте! Хочу узнать о покупке и адаптации Ready-сайта.")} target="_blank" rel="noreferrer">Заявка на покупку <span>↗</span></a>
          </article>
          <article className={styles.monthlyCard}>
            <div className={styles.choiceIndex}>02 / ПОДПИСКА</div>
            <h3>Платить помесячно</h3>
            <p>Ready Monthly включает адаптацию, хостинг и поддержку. Без стартового платежа и обязательного минимального срока.</p>
            <div className={styles.monthlyPrices}>{Object.values(monthlyPlans).map(plan => <div key={plan.id}><span>{plan.name}</span><b>{plan.price} ₪<small> / мес.</small></b></div>)}</div>
            <ul><li>Хостинг включён</li><li>Два пакета правок до {monthlySupport.editMinutes} минут в месяц</li><li>Еженедельная техническая проверка сайта и форм</li><li>Отмена в любой момент; сайт работает до конца оплаченного месяца</li></ul>
            <p className={styles.seoNote}>Базовая SEO-подготовка входит в запуск. Постоянное поисковое продвижение — отдельная услуга.</p>
            <Link href="/ready/monthly">Сравнить условия Monthly <span>→</span></Link>
          </article>
        </div>
      </section>

      <section id="how-it-works" className={styles.process}>
        <div className={styles.sectionHeading}>
          <div><span className={styles.eyebrow}>ПРОСТО НАЧАТЬ</span><h2>От заявки до запуска</h2></div>
          <p>Сначала обсуждаем задачу и объём адаптации. Онлайн-покупки нет: заявку отправите напрямую команде NeXora.</p>
        </div>
        <ol className={styles.steps}>
          <li><span>01</span><h3>Выбираете сайт</h3><p>Открываете демо и смотрите стоимость покупки или подписки.</p></li>
          <li><span>02</span><h3>Оставляете заявку</h3><p>Мы уточняем детали бизнеса, сроки и необходимые материалы.</p></li>
          <li><span>03</span><h3>Адаптируем</h3><p>Подготавливаем вариант с вашим брендом и показываем на согласование.</p></li>
          <li><span>04</span><h3>Запускаем</h3><p>Подключаем домен, проверяем сайт и публикуем.</p></li>
        </ol>
      </section>

      <section className={styles.individual}>
        <div><span className={styles.eyebrow}>INDIVIDUAL DEVELOPMENT</span><h2>Ни одна концепция<br />не подходит?</h2><p>Разработаем сайт с нуля: структуру, дизайн и функции соберём под конкретный бизнес. Индивидуальная разработка подходит, если нужна уникальная логика, нестандартный визуальный язык или сложные интеграции.</p><Link href="/services">Сравнить форматы и стоимость <span>↗</span></Link></div>
        <div className={styles.formatList}>{individualFormats.map(format => <div key={format.slug}><span>{format.name}</span><b>{format.priceLabel}</b></div>)}</div>
      </section>
    </main>
    <footer className={styles.footer}>
      <div className={styles.footerMain}><Link href="/" className={styles.brand}><Image src="/brand/nexora-wordmark.png" alt="NeXora" width={166} height={58} /><span className={styles.brandRule} /><span className={styles.descriptor}>DIGITAL<br />PRESENCE<br />DESIGN</span></Link><p>Готовые сайты, адаптированные к вашему бизнесу.</p><a href={siteConfig.whatsapp} target="_blank" rel="noreferrer">WhatsApp · {siteConfig.phoneDisplay}</a></div>
      <div className={styles.footerLinks}><Link href="/ready">Каталог Ready</Link><Link href="/ready/monthly">Подписка Monthly</Link><Link href="/services">Индивидуальная разработка</Link><Link href="/terms">Условия</Link><Link href="/privacy">Конфиденциальность</Link><Link href="/accessibility">Доступность</Link></div>
      <small>© {new Date().getFullYear()} NeXora · Хайфа, Израиль</small>
    </footer>
  </>;
}
