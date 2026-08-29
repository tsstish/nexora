"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  services,
  addons,
  maintenancePlans,
  type ServiceSlug,
} from "@/data/services";
import { siteConfig, whatsappUrl } from "@/data/site";

const websiteSlugs: ServiceSlug[] = [
  "mini-site",
  "landing",
  "business-site",
  "ecommerce",
];

const addonGroups = [
  {
    index: "01",
    label: "СТРУКТУРА & CONVERSION",
    ids: ["page", "form", "smart-form"],
  },
  {
    index: "02",
    label: "SEARCH & LOCALIZATION",
    ids: ["seo", "language", "rtl"],
  },
  {
    index: "03",
    label: "SYSTEM & BRAND",
    ids: ["integration", "module", "brand"],
  },
];

export function ServicesHub() {
  const [type, setType] = useState<ServiceSlug | "">("");
  const [selected, setSelected] = useState<string[]>([]);
  const [maintenance, setMaintenance] = useState<"" | "care" | "care-plus">("");

  const websiteServices = services.filter((service) =>
    websiteSlugs.includes(service.slug)
  );

  const digitalProduct = services.find(
    (service) => service.slug === "digital-product"
  )!;

  const brandStart = services.find(
    (service) => service.slug === "brand-start"
  )!;

  const base = type
    ? services.find((service) => service.slug === type)?.price || 0
    : 0;

  const addonsTotal = selected.reduce(
    (sum, id) => sum + (addons.find((addon) => addon.id === id)?.price || 0),
    0
  );

  const plan = maintenancePlans.find((item) => item.id === maintenance);
  const total = base + addonsTotal;

  const toggleAddon = (id: string) => {
    setSelected((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  const estimateMessage = type
    ? `Здравствуйте! Хочу обсудить проект с NeXora. Формат: ${
        services.find((service) => service.slug === type)?.name
      }. Дополнения: ${
        selected.length
          ? selected
              .map((id) => addons.find((addon) => addon.id === id)?.name)
              .join(", ")
          : "без дополнительных опций"
      }. Предварительный ориентир: от ${total.toLocaleString(
        "ru-RU"
      )} ₪. Сопровождение: ${
        plan ? `${plan.name} — ${plan.price} ₪/месяц` : "не выбрано"
      }. Хочу уточнить задачу и получить точную оценку.`
    : "Здравствуйте! Хочу обсудить сайт или digital-проект с NeXora.";

  return (
    <>
      <a className="skip-link" href="#services-main">
        Перейти к содержимому
      </a>

      <header className="topbar services-topbar-v2">
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

        <nav aria-label="Основная навигация">
          <Link href="/#projects">Проекты</Link>
          <Link href="/#solutions">Решения</Link>
          <Link href="/ready">Ready</Link>
          <Link href="/#process">Процесс</Link>
          <Link href="/services" aria-current="page">
            Стоимость
          </Link>
        </nav>

        <a className="cta top-cta site-desktop-cta" href="#services-contact">
          Обсудить проект <span>→</span>
        </a>

        <details className="site-mobile-menu">
          <summary aria-label="Открыть меню">
            <span></span>
            <span></span>
            <span></span>
          </summary>

          <div className="site-mobile-menu-panel">
            <Link href="/#projects">Проекты</Link>
            <Link href="/#solutions">Решения</Link>
            <Link href="/ready">Ready</Link>
            <Link href="/#process">Процесс</Link>
            <Link href="/services">Стоимость</Link>

            <a className="cta" href="#services-contact">
              Обсудить проект <span>→</span>
            </a>
          </div>
        </details>
      </header>

      <main id="services-main">

        <section className="services-hub-hero section-shell">
          <div className="services-hub-copy">
            <div className="eyebrow">
              УСЛУГИ · СТОИМОСТЬ · DIGITAL DEVELOPMENT
            </div>

            <h1>
              Решение начинается
              <span>не с тарифа</span>
            </h1>

            <p>
              Сначала определяем, что должен делать сайт или digital-продукт
              для бизнеса. Затем выбираем формат, объём и функциональность —
              без лишних страниц и функций.
            </p>

            <div className="services-hub-actions">
              <a className="cta" href="#service-formats">
                Смотреть форматы <span>↓</span>
              </a>
              <Link className="text-link" href="/ready">
                Или выбрать Ready →
              </Link>
            </div>
          </div>

          <div className="services-hub-art services-hub-art-render" aria-hidden="true">
            <Image
              src="/art/services-hero-orbit.png"
              alt=""
              width={1536}
              height={1024}
              priority
              className="services-hub-orbit-image"
            />
          </div>
        </section>


        <section id="service-formats" className="service-formats-hub section-shell">
          <div className="service-formats-head">
            <div>
              <div className="eyebrow">● &nbsp; ФОРМАТЫ РАБОТЫ</div>
              <h2>Подбираем масштаб под задачу бизнеса</h2>
            </div>

            <p>
              Стоимость указана «от». Точный объём определяется после
              короткого брифа: учитываем структуру, контент, языки,
              интеграции и нестандартные функции.
            </p>
          </div>


          <div id="websites" className="service-format-composition">

            <article className="service-family-sites">
              <div className="service-family-heading">
                <span>01 / WEBSITES</span>
                <h3>Сайты для бизнеса</h3>
                <p>
                  От компактной точки входа до многостраничного проекта
                  и полноценного интернет-магазина.
                </p>
              </div>

              <div className="service-family-list">
                {websiteServices.map((service) => (
                  <Link
                    href={`/services/${service.slug}`}
                    key={service.slug}
                    className="service-family-row"
                  >
                    <span>{service.index}</span>
                    <div>
                      <strong>{service.name}</strong>
                      <small>{service.short}</small>
                    </div>
                    <b>{service.priceLabel}</b>
                    <i>→</i>
                  </Link>
                ))}
              </div>

              <div className="service-family-graphic" aria-hidden="true">
                <i></i>
                <i></i>
                <i></i>
              </div>
            </article>


            <div className="service-format-side">

              <article id="digital-product" className="service-format-product">
                <span>05 / DIGITAL PRODUCT</span>
                <h3>{digitalProduct.name}</h3>
                <p>{digitalProduct.short}</p>

                <div className="service-format-meta">
                  <strong>{digitalProduct.priceLabel}</strong>
                  <small>{digitalProduct.duration}</small>
                </div>

                <Link href={`/services/${digitalProduct.slug}`}>
                  Подробнее о формате →
                </Link>

                <div className="service-product-orbit" aria-hidden="true">
                  <i></i><b></b>
                </div>
              </article>


              <article id="brand-start" className="service-format-brand">
                <span>06 / BRAND &amp; LAUNCH</span>
                <h3>{brandStart.name}</h3>
                <p>{brandStart.short}</p>

                <div className="service-format-meta">
                  <strong>{brandStart.priceLabel}</strong>
                  <small>{brandStart.duration}</small>
                </div>

                <Link href={`/services/${brandStart.slug}`}>
                  Подробнее о Brand Start →
                </Link>
              </article>

            </div>
          </div>
        </section>


        <section id="extras" className="services-extras-v2 section-shell">

          <div className="services-extras-head">
            <div>
              <div className="eyebrow">● &nbsp; ДОПОЛНИТЕЛЬНЫЕ ВОЗМОЖНОСТИ</div>
              <h2>
                Добавляем только то,
                <span>что действительно нужно проекту</span>
              </h2>
            </div>

            <p>
              Базовая мобильная адаптация, WhatsApp и техническая
              SEO-подготовка входят в соответствующие сайты.
              Ниже — задачи, которые расширяют стартовый объём.
            </p>
          </div>


          <div className="extras-rails-v2">
            {addonGroups.map((group) => (
              <article key={group.index} className={`extras-rail extras-rail-${group.index}`}>
                <div className="extras-rail-title">
                  <span>{group.index}</span>
                  <small>{group.label}</small>
                </div>

                <div className="extras-rail-items">
                  {group.ids.map((id) => {
                    const addon = addons.find((item) => item.id === id)!;

                    return (
                      <div key={addon.id}>
                        <span>{addon.name}</span>
                        <strong>от {addon.price.toLocaleString("ru-RU")} ₪</strong>
                      </div>
                    );
                  })}
                </div>
              </article>
            ))}
          </div>

          <p className="services-extras-note">
            Профессиональный перевод, сторонние сервисы, домен, хостинг
            и комиссии внешних систем оплачиваются отдельно.
            Точная стоимость нестандартного функционала определяется
            после технической оценки.
          </p>
        </section>


        <section className="services-care-v2 section-shell">
          <div className="services-care-intro">
            <div className="eyebrow">CARE AFTER LAUNCH</div>
            <h2>Сайт можно не оставлять один на один с бизнесом</h2>
            <p>
              После запуска можно передать регулярную техническую проверку
              и небольшие изменения NeXora или вести сайт самостоятельно.
            </p>
          </div>

          <div className="services-care-plans">
            {maintenancePlans.map((plan, index) => (
              <article
                key={plan.id}
                className={index === 1 ? "care-plan care-plan-plus" : "care-plan"}
              >
                <span>{index === 0 ? "01" : "02"}</span>
                <h3>{plan.name}</h3>
                <strong>{plan.price} ₪ / месяц</strong>

                <ul>
                  {plan.included.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>


        <section id="calculator" className="services-calculator-v2 section-shell">

          <div className="services-calculator-copy">
            <div className="eyebrow">● &nbsp; БЫСТРЫЙ РАСЧЁТ</div>

            <h2>Соберите ориентир проекта</h2>

            <p>
              Это не автоматическая оферта, а удобный способ понять порядок
              бюджета до короткого брифа.
            </p>

            <div className="services-calculator-number" aria-hidden="true">
              01—06
            </div>
          </div>


          <div className="services-calculator-panel">

            <label className="services-calc-select">
              <span>Основа проекта</span>

              <select
                value={type}
                onChange={(event) =>
                  setType(event.target.value as ServiceSlug | "")
                }
              >
                <option value="">Выберите формат</option>

                {services.map((service) => (
                  <option key={service.slug} value={service.slug}>
                    {service.name} — {service.priceLabel}
                  </option>
                ))}
              </select>
            </label>


            <fieldset className="services-calc-addons">
              <legend>Дополнительно</legend>

              {addons.map((addon) => (
                <label key={addon.id}>
                  <span>
                    <input
                      type="checkbox"
                      checked={selected.includes(addon.id)}
                      onChange={() => toggleAddon(addon.id)}
                    />
                    {addon.name}
                  </span>

                  <b>+ {addon.price.toLocaleString("ru-RU")} ₪</b>
                </label>
              ))}
            </fieldset>


            <fieldset className="services-calc-support">
              <legend>Сопровождение</legend>

              <label>
                <span>
                  <input
                    type="radio"
                    name="services-support"
                    checked={maintenance === ""}
                    onChange={() => setMaintenance("")}
                  />
                  Без сопровождения
                </span>
              </label>

              {maintenancePlans.map((item) => (
                <label key={item.id}>
                  <span>
                    <input
                      type="radio"
                      name="services-support"
                      checked={maintenance === item.id}
                      onChange={() =>
                        setMaintenance(item.id as "care" | "care-plus")
                      }
                    />
                    {item.name}
                  </span>

                  <b>+ {item.price} ₪ / мес.</b>
                </label>
              ))}
            </fieldset>


            <div className="services-calc-result">
              <span>Предварительный ориентир</span>

              <strong>
                {type
                  ? `от ${total.toLocaleString("ru-RU")} ₪`
                  : "Выберите формат"}
              </strong>

              {plan && (
                <small>
                  Сопровождение: + {plan.price} ₪ / месяц
                </small>
              )}
            </div>

            <p className="services-calc-disclaimer">
              Финальная стоимость определяется после брифа и согласования
              точного объёма. Переводы, платные сервисы, домен, хостинг
              и комиссии внешних систем оплачиваются отдельно.
            </p>

            <a
              className="cta"
              href={whatsappUrl(estimateMessage)}
              target="_blank"
              rel="noreferrer"
            >
              Получить точную оценку →
            </a>
          </div>
        </section>


        <section id="services-contact" className="services-final-v2 section-shell">
          <div>
            <div className="eyebrow">START A PROJECT</div>

            <h2>
              Не уверены в формате?
              <span>Начнём с задачи бизнеса</span>
            </h2>

            <p>
              Расскажите, что нужно запустить или изменить.
              Поможем выбрать между индивидуальной разработкой,
              Ready-концепцией и более компактным решением.
            </p>

            <div className="services-final-actions">
              <a
                className="cta"
                href={whatsappUrl(
                  "Здравствуйте! Хочу обсудить проект с NeXora и подобрать подходящий формат."
                )}
                target="_blank"
                rel="noreferrer"
              >
                Обсудить проект →
              </a>

              <a
                className="text-link"
                href={siteConfig.telegram}
                target="_blank"
                rel="noreferrer"
              >
                Написать в Telegram ↗
              </a>
            </div>
          </div>

          <div className="services-final-art" aria-hidden="true">
            <i></i>
            <i></i>
            <b></b>
            <em>NEXORA</em>
          </div>
        </section>

      </main>


      <footer className="footer footer-v2 section-shell services-footer-v2">

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

          <p>Сайты и digital-продукты для бизнеса в Израиле</p>
        </div>


        <nav className="footer-links footer-links-v2" aria-label="Навигация в футере">
          <Link href="/#projects">Проекты</Link>
          <Link href="/#solutions">Решения</Link>
          <Link href="/ready">Ready</Link>
          <Link href="/#process">Процесс</Link>
          <Link href="/services">Стоимость</Link>
        </nav>


        <div className="footer-contact footer-contact-v2">
          <a href={siteConfig.whatsapp} target="_blank" rel="noreferrer">
            WhatsApp
          </a>

          <a href={siteConfig.telegram} target="_blank" rel="noreferrer">
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
