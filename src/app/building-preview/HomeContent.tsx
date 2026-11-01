import Link from "next/link";
import { monthlyPlanList, monthlySupport } from "@/data/readyMonthly";
import { whatsappUrl } from "@/data/site";
import { CurrencyPrice } from "./CurrencyControl";
import styles from "./HomeContent.module.css";

const features = [
  { index: "01", title: "Клиенту удобно найти вас", detail: "Продуманная структура, понятные услуги и подготовка страниц для поисковых систем." },
  { index: "02", title: "Легко связаться и записаться", detail: "WhatsApp, телефон и формы обращения — в зависимости от выбранной концепции." },
  { index: "03", title: "Удобно с любого устройства", detail: "Сайт адаптирован для телефона и компьютера. Дополнительные языки доступны по условиям концепции." },
  { index: "04", title: "Есть кому поддерживать", detail: "Хостинг, технические проверки и два пакета правок в месяц включены в Ready Monthly." },
] as const;

const steps = [
  { number: "01", name: "Выбираете", description: "Открываете настоящее демо и выбираете концепцию, которая подходит вашему бизнесу." },
  { number: "02", name: "Мы адаптируем", description: "Меняем логотип, цвета, фотографии, тексты и контакты в рамках готовой структуры. До 7 рабочих дней после получения материалов для стандартной адаптации." },
  { number: "03", name: "Запускаем и поддерживаем", description: "Публикуем сайт, подключаем предусмотренные способы связи и продолжаем техническое обслуживание по подписке." },
] as const;

const faq = [
  { question: "Это конструктор?", answer: "Нет. Готовые концепции NeXora разработаны на кодовой базе Next.js. Вы выбираете уже работающий сайт, который мы адаптируем под ваш бренд и содержание." },
  { question: "Что можно изменить?", answer: "Логотип, цвета в рамках концепции, фотографии, тексты, услуги, цены и контакты. Новые разделы, сложные интеграции и существенные изменения структуры согласовываются отдельно." },
  { question: "Что входит в подписку?", answer: "Хостинг, еженедельная техническая проверка и два пакета правок общим объёмом до 90 минут в месяц. Дополнительные работы оплачиваются отдельно после согласования." },
  { question: "Поможете с Google?", answer: "В зависимости от выбранного сайта предусмотрены базовая SEO-подготовка, настройка Google Analytics 4 и Google Search Console. Это не гарантия индексации, позиций или заявок; поисковое продвижение и реклама — отдельные услуги." },
  { question: "Можно ли отменить подписку или выкупить сайт?", answer: "Подписку можно отменить в любой момент: сайт работает до конца оплаченного месяца. Выкуп доступен по актуальной цене выбранной концепции; прошлые платежи за подписку не вычитаются из стоимости покупки." },
] as const;

export function HomeContent() {
  return (
    <div className={styles.content}>
      <section className={styles.quickFacts} aria-label="Кратко об условиях Ready Monthly">
        <div className={styles.wrap}>
          <div><strong>До 7 рабочих дней</strong><span>Стандартная адаптация после получения материалов</span></div>
          <div><strong>Без стартового взноса</strong><span>Начать можно с ежемесячной подписки</span></div>
          <div><strong>Готовая кодовая база</strong><span>Не конструктор и не пустой макет</span></div>
          <div><strong>Хостинг и поддержка</strong><span>Входят в Ready Monthly</span></div>
        </div>
      </section>

      <section className={styles.section} id="what-you-get" aria-labelledby="value-title">
        <div className={styles.wrap}>
          <div className={styles.sectionHeader}>
            <span className={styles.overline}>01 / НЕ ТОЛЬКО ДИЗАЙН</span>
            <h2 id="value-title">Сайт, который<br/><em>работает для бизнеса</em></h2>
            <p>Не просто красивое оформление. Посетитель должен понять ваше предложение, найти нужное и без лишних шагов связаться с вами.</p>
          </div>
          <div className={styles.valueGrid}>
            {features.map(item => (
              <article className={styles.valueItem} key={item.index}>
                <span className={styles.index}>{item.index}</span>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>
          <p className={styles.disclaimer}>Что именно подключается при запуске, зависит от концепции и выбранных услуг. Индексация и позиции в Google не гарантируются.</p>
        </div>
      </section>

      <section className={styles.darkSection} id="how-it-works" aria-labelledby="process-title">
        <div className={styles.wrap}>
          <div className={styles.sectionHeader}>
            <span className={styles.overline}>02 / ПРОСТОЙ ПРОЦЕСС</span>
            <h2 id="process-title">От выбора<br/><em>до запуска</em></h2>
            <p>Вам не нужно разбираться в коде, размещении сайта и технических проверках.</p>
          </div>
          <div className={styles.steps}>
            {steps.map(step => (
              <article key={step.number} className={styles.step}>
                <span>{step.number}</span>
                <h3>{step.name}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
          <Link className={styles.textLink} href="/pricing">Полные условия подписки <span aria-hidden="true">↗</span></Link>
        </div>
      </section>

      <section className={styles.section} id="home-prices" aria-labelledby="prices-title">
        <div className={styles.wrap}>
          <div className={styles.sectionHeader}>
            <span className={styles.overline}>03 / READY MONTHLY</span>
            <h2 id="prices-title">Понятная цена.<br/><em>Без стартового взноса</em></h2>
            <p>Выберите объём сайта. В каждом тарифе предусмотрены хостинг, технический контроль и правки в пределах условий подписки.</p>
          </div>
          <div className={styles.planGrid}>
            {monthlyPlanList.map((plan, index) => (
              <article key={plan.id} className={styles.plan}>
                <span className={styles.planIndex}>0{index+1} / READY MONTHLY</span>
                <h3>{plan.name}</h3>
                <p>{plan.purpose}</p>
                <strong><CurrencyPrice group="monthly" priceId={plan.id} ils={plan.price} perMonth /></strong>
                <ul>
                  <li>Хостинг включён</li>
                  <li>2 пакета правок, до {monthlySupport.editMinutes} минут суммарно</li>
                  <li>Еженедельная техническая проверка</li>
                </ul>
                <a href={whatsappUrl(`Здравствуйте! Интересует Ready Monthly — ${plan.name}.`)} target="_blank" rel="noopener noreferrer" data-analytics-event="home_plan_whatsapp">Обсудить тариф ↗</a>
              </article>
            ))}
          </div>
          <div className={styles.otherFormats}>
            <div><span>Хотите владеть сайтом?</span><strong>Купите готовую концепцию с адаптацией</strong><Link href="/pricing#monthly">Выкуп и условия ↗</Link></div>
            <div><span>Не подходит готовая структура?</span><strong>Разработаем сайт с нуля под вашу задачу</strong><Link href="/pricing#individual">Индивидуальная разработка ↗</Link></div>
          </div>
        </div>
      </section>

      <section className={styles.section} id="home-faq" aria-labelledby="faq-title">
        <div className={styles.wrap}>
          <div className={styles.faqLayout}>
            <div className={styles.sectionHeader}>
              <span className={styles.overline}>04 / ЧЕСТНО ОБ УСЛОВИЯХ</span>
              <h2 id="faq-title">Важные вопросы<br/><em>до старта</em></h2>
              <p>Все условия понятны заранее — без обязательств, о которых вы узнаете после заказа.</p>
            </div>
            <div className={styles.faqList}>
              {faq.map((entry) => (
                <details key={entry.question}>
                  <summary>{entry.question}<span aria-hidden="true">+</span></summary>
                  <p>{entry.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.contactSection} aria-labelledby="contact-title">
        <div className={styles.wrap}>
          <span className={styles.overline}>NEXORA / START A PROJECT</span>
          <h2 id="contact-title">Расскажите, какой у вас бизнес</h2>
          <p>Подберём готовую концепцию или предложим индивидуальную разработку. Начните с короткого сообщения.</p>
          <a href={whatsappUrl("Здравствуйте! Хочу подобрать сайт NeXora для моего бизнеса.")} target="_blank" rel="noopener noreferrer" data-analytics-event="home_footer_whatsapp">Написать в WhatsApp ↗</a>
        </div>
      </section>
    </div>
  );
}
