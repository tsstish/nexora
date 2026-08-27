"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { projects } from "@/data/projects";
import { services as workFormats, addons, maintenancePlans, type Service, type ServiceSlug } from "@/data/services";
import { siteConfig, whatsappUrl } from "@/data/site";
import { ServiceContent } from "@/components/ServiceContent";

type IconName = "web"|"product"|"brand"|"strategy"|"plan"|"design"|"code"|"launch"|"whatsapp"|"arrow";

function Icon({name}:{name:IconName}){
  const p={fill:"none",stroke:"currentColor",strokeWidth:1.55,strokeLinecap:"round" as const,strokeLinejoin:"round" as const};
  return <svg viewBox="0 0 32 32" aria-hidden="true">
    {name==="web"&&<><circle cx="16" cy="16" r="10" {...p}/><path d="M6 16h20M16 6c3.1 3.2 4.7 6.5 4.7 10S19.1 22.8 16 26M16 6c-3.1 3.2-4.7 6.5-4.7 10S12.9 22.8 16 26" {...p}/></>}
    {name==="product"&&<><path d="m16 5 10 5.7v10.6L16 27 6 21.3V10.7L16 5Z" {...p}/><path d="m6.9 10.9 9.1 5.2 9.1-5.2M16 16.1V27" {...p}/></>}
    {name==="brand"&&<><path d="M7 24l2.4-8.4L20.3 4.7l7 7.1-10.8 10.8L7 24Z" {...p}/><path d="m18.2 6.8 7.1 7M9.5 15.6l6.9 7" {...p}/></>}
    {name==="strategy"&&<><circle cx="16" cy="16" r="9" {...p}/><circle cx="16" cy="16" r="4" {...p}/><path d="M20 12l7-7m0 0v6m0-6h-6" {...p}/></>}
    {name==="plan"&&<><circle cx="10" cy="10" r="3" {...p}/><circle cx="22" cy="10" r="3" {...p}/><circle cx="16" cy="22" r="3" {...p}/><path d="m12.8 11.4 2.3 7.7m4-7.7-2.3 7.7M13 10h6" {...p}/></>}
    {name==="design"&&<><path d="M7 23.5 9.5 14 19 4.5l8.5 8.5-9.5 9.5L7 23.5Z" {...p}/><path d="m17 6.5 8.5 8.5M9.5 14l8.5 8.5" {...p}/></>}
    {name==="code"&&<><path d="m12 9-7 7 7 7M20 9l7 7-7 7M18 5l-4 22" {...p}/></>}
    {name==="launch"&&<><path d="M18 6c4.5.4 7.6 3.5 8 8l-8.8 8.8-8-8L18 6Z" {...p}/><path d="m10 20-4 1 1-4m8 5-1 4 4-1" {...p}/><circle cx="19" cy="13" r="2" {...p}/></>}
    {name==="whatsapp"&&<><path d="M7.5 25.5 9 20.8A9.3 9.3 0 1 1 13 24.6l-5.5.9Z" {...p}/><path d="M12 11.5c.8 4 4 7.2 8.2 8" {...p}/></>}
    {name==="arrow"&&<><path d="M8 24 24 8M14 8h10v10" {...p}/></>}
  </svg>
}

function Header(){return <header className="topbar">
  <a href="#top" className="brand-lockup" aria-label="NeXora — главная">
    <Image src="/brand/nexora-wordmark.png" alt="NeXora" width={242} height={85} priority className="brand-wordmark"/>
    <span className="brand-rule"/><span className="brand-tag">DIGITAL<br/>PRESENCE<br/>DESIGN</span>
  </a>
  <nav aria-label="Основная навигация"><a href="#top">Главное</a><a href="#projects">Проекты</a><a href="/ready">Готовые сайты</a><a href="#process">Процесс</a><a href="#formats">Стоимость</a><a href="#contacts">Контакты</a></nav>
  <a className="cta top-cta site-desktop-cta" href="#calculator">
    Обсудить проект <span>→</span>
  </a>

  <details className="site-mobile-menu">
    <summary aria-label="Открыть меню">
      <span></span>
      <span></span>
      <span></span>
    </summary>

    <div className="site-mobile-menu-panel">
      <a href="#top">Главное</a>
      <a href="#projects">Проекты</a>
      <a href="/ready">Готовые сайты</a>
      <a href="#process">Процесс</a>
      <a href="#formats">Стоимость</a>
      <a href="#contacts">Контакты</a>
      <a className="cta" href="#calculator">
        Обсудить проект <span>→</span>
      </a>
    </div>
  </details>
</header>}

function Hero(){return <section id="top" className="hero section-shell">
  <div className="hero-copy">
    <h1>Мы создаём <em>цифровое</em> присутствие бизнеса</h1>
    <p>От идеи и стратегии — до дизайна, разработки и запуска.</p>
    <div className="hero-actions"><a className="cta" href="#calculator">Обсудить проект <span>→</span></a><a className="text-link" href="#projects">Смотреть проекты ↓</a></div>
  </div>
  <div className="hero-art" aria-label="Путь от идеи к готовому цифровому продукту">
    <Image src="/art/hero-process.png" alt="Абстрактный путь от идеи к готовому цифровому продукту" fill priority className="hero-render" sizes="(max-width: 900px) 115vw, 90vw"/>
  </div>
</section>}

function Approach(){return <section className="approach section-shell">
  <div className="eyebrow">● &nbsp; НАШ ПОДХОД</div>
  <div className="approach-grid"><h2>Сначала смысл.<br/>Потом форма.</h2><p>
  Создаём сайты и цифровые продукты для бизнеса в Израиле — от лендингов
  и многостраничных бизнес-сайтов до интернет-магазинов и веб-сервисов.
  Сначала понимаем задачу и цели бизнеса, затем превращаем их в понятную
  структуру, индивидуальный UX/UI-дизайн и современную разработку.</p><svg className="approach-arrow" viewBox="0 0 210 110" aria-hidden="true"><path d="M10 88C70 84 112 48 175 28"/><path d="M158 18L178 27L163 43"/></svg></div>
</section>}

const services=[
  {n:"01",title:"Сайты",copy:"Лендинги, бизнес-сайты и интернет-магазины под конкретную задачу бизнеса. Продумываем структуру, путь клиента, дизайн, разработку и запуск.",more:"От первого экрана до формы заявки — всё работает на понятный путь клиента.",icon:"web" as IconName},
  {n:"02",title:"Цифровые продукты",copy:"Личные кабинеты, внутренние системы и веб-приложения. Проектируем логику продукта под реальные процессы бизнеса.",more:"Подходит, когда нужен уже не просто сайт, а рабочий цифровой инструмент.",icon:"product" as IconName},
  {n:"03",title:"Брендинг",copy:"Логотип, палитра, типографика и визуальная система. Создаём образ, который последовательно переносится в сайт и коммуникации.",more:"Бренд выглядит цельно и узнаваемо во всех точках контакта.",icon:"brand" as IconName}
];
function Services(){return <section className="services section-shell"><div className="eyebrow">● &nbsp; ЧТО МЫ ДЕЛАЕМ</div><div className="service-row">{services.map(s=><article className="service-item" key={s.n}><div className="service-kicker"><span>{s.n}</span><span className="service-icon"><Icon name={s.icon}/></span></div><h3>{s.title}</h3><p>{s.copy}</p><small>{s.more}</small><a href="#formats">Подробнее →</a></article>)}</div></section>}

function LiveFrame({url,mode}:{url:string;mode:"desktop"|"mobile"}){
  const ref=useRef<HTMLDivElement>(null); const [scale,setScale]=useState(1); const virtualWidth=mode==="desktop"?1440:390; const virtualHeight=mode==="desktop"?900:844;
  useEffect(()=>{if(!ref.current)return; const el=ref.current; const update=()=>setScale(el.clientWidth/virtualWidth); update(); const ro=new ResizeObserver(update);ro.observe(el);return()=>ro.disconnect()},[virtualWidth]);
  return <div ref={ref} className={`live-screen ${mode}`}><iframe title={`${mode} live preview`} src={url} loading="lazy" tabIndex={-1} style={{width:virtualWidth,height:virtualHeight,transform:`scale(${scale})`}}/></div>
}
function DevicePreview({index}:{index:number}){const p=projects[index];return <div className="device-stage" aria-hidden="true"><div className="glass-laptop"><div className="laptop-bezel"><LiveFrame url={p.url} mode="desktop"/></div><div className="laptop-base"/></div><div className="glass-phone"><div className="phone-notch"/><LiveFrame url={p.url} mode="mobile"/></div></div>}
function Projects(){const[i,setI]=useState(0);const p=projects[i];return <section id="projects" className="project-section section-shell"><div className="project-copy"><div className="eyebrow">● &nbsp; НАШИ ПРОЕКТЫ</div><h2>{p.name}</h2><p>{p.description}</p><div className="tags">{p.tags.map(t=><span key={t}>{t}</span>)}</div><a className="text-link" href={p.url} target="_blank" rel="noreferrer">Смотреть проект →</a><div className="carousel-controls"><button onClick={()=>setI((i-1+projects.length)%projects.length)} aria-label="Предыдущий проект">←</button><span>{i+1} / {projects.length}</span><button onClick={()=>setI((i+1)%projects.length)} aria-label="Следующий проект">→</button></div></div><DevicePreview index={i}/></section>}

const steps=[["01","Исследуем","Погружаемся в бизнес и аудиторию","strategy"],["02","Планируем","Создаём стратегию и структуру","plan"],["03","Проектируем","Дизайн, система и прототип","design"],["04","Разрабатываем","Вёрстка, программирование и интеграции","code"],["05","Запускаем","Тестируем, запускаем и поддерживаем","launch"]] as const;
function Process(){return <section id="process" className="process section-shell"><div className="eyebrow">● &nbsp; КАК МЫ РАБОТАЕМ</div><div className="process-line">{steps.map((s,idx)=><div className="process-step" key={s[0]}><span>{s[0]}</span><i className="process-icon"><Icon name={s[3]}/></i><h3>{s[1]}</h3><p>{s[2]}</p><b className={idx===4?"active":""}/></div>)}</div></section>}
function IdeaCta(){return <section className="idea-cta section-shell"><h2>Есть идея проекта?<br/>Давайте найдём ей<br/>правильную форму.</h2><svg viewBox="0 0 160 80" aria-hidden="true"><path d="M8 64c51-34 91-42 138-24"/><path d="m126 20 22 20-30 8"/></svg><a href={whatsappUrl("Здравствуйте! Хочу обсудить проект с NeXora.")} target="_blank" rel="noreferrer" className="coral-btn"><Icon name="whatsapp"/>Написать в WhatsApp</a><span className="code-drop" aria-hidden="true"/></section>}


function PortfolioOffer(){return <section className="portfolio-offer section-shell" aria-label="Portfolio Offer"><div><span>PORTFOLIO OFFER</span><strong>−{siteConfig.portfolioOffer.discountPercent}%</strong></div><div><h2>Первые {siteConfig.portfolioOffer.slots} проекта — на специальных условиях</h2><p>Сейчас мы расширяем портфолио NeXora. При согласии на публикацию кейса вы получаете −{siteConfig.portfolioOffer.discountPercent}% на основной пакет услуги. Проект может быть показан в портфолио с активной ссылкой на ваш бизнес — дополнительная точка контакта и ещё одно упоминание бренда.</p><small>Скидка не распространяется на ежемесячное сопровождение, платные внешние сервисы и последующие дополнительные работы.</small></div></section>}

function ServiceDrawer({service,onClose}:{service:Service;onClose:()=>void}){
 const dialogRef=useRef<HTMLDivElement>(null); const closeRef=useRef<HTMLButtonElement>(null);
 useEffect(()=>{
   const prev=document.activeElement as HTMLElement|null; document.body.classList.add("drawer-open"); closeRef.current?.focus();
   const onKey=(e:KeyboardEvent)=>{
     if(e.key==="Escape"){e.preventDefault();onClose();return}
     if(e.key!=="Tab"||!dialogRef.current)return;
     const nodes=[...dialogRef.current.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])')];
     if(!nodes.length)return; const first=nodes[0],last=nodes[nodes.length-1];
     if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()} else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}
   };
   document.addEventListener("keydown",onKey); return()=>{document.removeEventListener("keydown",onKey);document.body.classList.remove("drawer-open");prev?.focus()}
 },[onClose]);
 return <div className="drawer-backdrop" onMouseDown={e=>{if(e.currentTarget===e.target)onClose()}}><div className="service-drawer" ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="drawer-title"><div className="drawer-head"><span id="drawer-title">{service.name}</span><a href={`/services/${service.slug}`}>Открыть отдельной страницей ↗</a><button ref={closeRef} onClick={onClose} aria-label="Закрыть подробности">×</button></div><ServiceContent service={service} compact/></div></div>
}

function WorkFormats(){
 const[open,setOpen]=useState<ServiceSlug|null>(null); const selected=open?workFormats.find(s=>s.slug===open):undefined;
 const show=(slug:ServiceSlug)=>{setOpen(slug);window.history.pushState({},"",`/services/${slug}`)};
 const close=()=>{setOpen(null);window.history.pushState({},"","/#formats")};
 return <><section id="formats" className="formats section-shell"><div className="formats-head"><div><div className="eyebrow">● &nbsp; ФОРМАТЫ РАБОТЫ</div><h2>От компактной страницы до рабочего digital-продукта.</h2></div><p>Начинаем с задачи бизнеса и подбираем формат без лишних функций. Все цены указаны «от» — точная стоимость зависит от объёма, контента, языков и интеграций.</p></div><div className="format-list">{workFormats.map((service)=><article className={`format-row ${service.slug==="landing"||service.slug==="business-site"?"featured":""}`} key={service.slug}><span>{service.index}</span><div><h3>{service.name}</h3><p>{service.short}</p></div><strong>{service.priceLabel}</strong><button onClick={()=>show(service.slug)} aria-label={`Узнать подробнее: ${service.name}`}>Узнать подробнее <i>→</i></button></article>)}</div><div className="format-help"><h3>Не знаете, что выбрать?</h3><p><b>Одна услуга</b> — чаще всего лендинг. <b>Несколько направлений</b> — бизнес-сайт. <b>Корзина и онлайн-продажи</b> — магазин. <b>Кабинет, логика или автоматизация</b> — digital product.</p><a href={whatsappUrl("Здравствуйте! Не уверена/не уверен, какой формат проекта мне подходит. Поможете выбрать?")} target="_blank" rel="noreferrer">Помочь выбрать формат →</a></div></section>{selected&&<ServiceDrawer service={selected} onClose={close}/>}</>
}

const addonDescriptions:Record<string,string>={
 page:"Ещё одна стандартная страница в рамках существующей дизайн-системы.",form:"Отдельная форма для новой услуги, консультации, записи или расчёта.","smart-form":"Многошаговая форма с условиями, уточняющими вопросами и разными сценариями результата.",seo:"Исследование запросов, структура, SEO-заголовки, descriptions и structured data — не ежемесячное продвижение.",integration:"Передача обращений в CRM, систему бронирования, email-сервис или другой внешний инструмент.",module:"Калькулятор, бронирование, подбор услуги, генерация расчёта или другая функция под задачу бизнеса.",language:"Дополнительная языковая версия; профессиональный перевод текста оплачивается отдельно.",rtl:"Корректная адаптация интерфейса под иврит или арабский справа налево.",brand:"Логотип, палитра, шрифты и базовая визуальная система для сайта."
};

const addonDetails:Record<string,{why:string;includes:string[];not:string}>= {
  page:{why:"Когда в уже спроектированном сайте появляется ещё одно самостоятельное направление или раздел.",includes:["страница в существующей дизайн-системе","адаптивная вёрстка","базовая metadata и внутренние ссылки"],not:"Это не новая отдельная концепция сайта и не полный редизайн."},
  form:{why:"Для отдельной услуги, консультации, записи или сценария обращения.",includes:["поля и валидация","адаптивное состояние","отправка в согласованный канал"],not:"Сложная логика, расчёты и ветвления относятся к умной форме или индивидуальному модулю."},
  "smart-form":{why:"Когда обычной формы недостаточно и нужно задавать уточняющие вопросы по шагам.",includes:["несколько шагов","условия и ветвления","разные результаты или CTA"],not:"Это не CRM и не полноценный личный кабинет."},
  seo:{why:"Когда важна более глубокая техническая и контентная подготовка страниц к поиску.",includes:["исследование запросов","SEO-структура","title/description","structured data и рекомендации"],not:"Это не ежемесячное SEO-продвижение и не гарантия позиций Google."},
  integration:{why:"Когда заявки или данные должны автоматически уходить во внешний сервис.",includes:["подключение одного согласованного сервиса","передача данных","проверка основного сценария"],not:"Стоимость сторонних сервисов, сложные двусторонние синхронизации и нестандартные API оцениваются отдельно."},
  module:{why:"Для функции, которая решает конкретную задачу бизнеса и не входит в стандартный сайт.",includes:["логика одного модуля","интерфейс","интеграция в сайт","проверка сценария"],not:"Сложность может сильно отличаться: точная цена после короткой технической оценки."},
  language:{why:"Когда нужно показать тот же сайт ещё одной языковой аудитории.",includes:["языковая версия интерфейса","переключение языка","отдельные metadata при необходимости"],not:"Профессиональный перевод текста не входит; RTL для иврита и арабского считается отдельно."},
  rtl:{why:"Для корректной работы интерфейса справа налево на иврите или арабском.",includes:["направление интерфейса","перестройка ключевых компонентов","проверка основных экранов"],not:"Это не перевод контента и не полноценная локализация продукта."},
  brand:{why:"Когда у бизнеса ещё нет цельного визуального образа для нового сайта.",includes:["базовый логотип или wordmark","палитра","типографика","базовые digital-файлы"],not:"Не включает глубокую бренд-стратегию, нейминг и большой brand book."}
};

function AddonIcon({id}:{id:string}){
  const common={fill:"none",stroke:"currentColor",strokeWidth:1.6,strokeLinecap:"round" as const,strokeLinejoin:"round" as const};
  return <svg viewBox="0 0 32 32" aria-hidden="true">
    {id==="page"&&<><rect x="7" y="5" width="18" height="22" rx="3" {...common}/><path d="M11 11h10M11 16h10M11 21h6" {...common}/></>}
    {id==="form"&&<><rect x="5" y="6" width="22" height="20" rx="4" {...common}/><path d="M10 12h12M10 17h8M10 22h6" {...common}/><circle cx="23" cy="22" r="2" {...common}/></>}
    {id==="smart-form"&&<><path d="M7 8h8v7H7zM17 17h8v7h-8z" {...common}/><path d="M15 11.5h4v9h-2M11 15v4h6" {...common}/></>}
    {id==="seo"&&<><circle cx="14" cy="14" r="7" {...common}/><path d="m19 19 7 7M9 14h10M14 9c2 2 3 3.5 3 5s-1 3-3 5M14 9c-2 2-3 3.5-3 5s1 3 3 5" {...common}/></>}
    {id==="integration"&&<><circle cx="9" cy="16" r="4" {...common}/><circle cx="23" cy="9" r="4" {...common}/><circle cx="23" cy="23" r="4" {...common}/><path d="M13 15l6-4M13 17l6 4" {...common}/></>}
    {id==="module"&&<><path d="M8 8h7v7H8zM17 8h7v7h-7zM8 17h7v7H8z" {...common}/><path d="M20.5 17v7M17 20.5h7" {...common}/></>}
    {id==="language"&&<><circle cx="16" cy="16" r="11" {...common}/><path d="M5 16h22M16 5c3 3.5 4.5 7 4.5 11S19 23.5 16 27M16 5c-3 3.5-4.5 7-4.5 11S13 23.5 16 27" {...common}/></>}
    {id==="rtl"&&<><path d="M25 9H10m0 0 5-5m-5 5 5 5M7 23h15m0 0-5-5m5 5-5 5" {...common}/></>}
    {id==="brand"&&<><path d="M7 24l3-10 10-10 7 7-10 10-10 3Z" {...common}/><path d="m18 6 7 7M10 14l7 7" {...common}/></>}
  </svg>
}

function AddonsDrawer({onClose}:{onClose:()=>void}){
  const dialogRef=useRef<HTMLDivElement>(null); const closeRef=useRef<HTMLButtonElement>(null);
  useEffect(()=>{const prev=document.activeElement as HTMLElement|null; document.body.classList.add("drawer-open"); closeRef.current?.focus(); const onKey=(e:KeyboardEvent)=>{if(e.key==="Escape"){e.preventDefault();onClose();return} if(e.key!=="Tab"||!dialogRef.current)return; const nodes=[...dialogRef.current.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),input:not([disabled]),[tabindex]:not([tabindex="-1"])')]; if(!nodes.length)return; const first=nodes[0],last=nodes[nodes.length-1]; if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}};document.addEventListener("keydown",onKey);return()=>{document.removeEventListener("keydown",onKey);document.body.classList.remove("drawer-open");prev?.focus()}},[onClose]);
  return <div className="drawer-backdrop" onMouseDown={e=>{if(e.currentTarget===e.target)onClose()}}><div ref={dialogRef} className="service-drawer addons-drawer" role="dialog" aria-modal="true" aria-labelledby="addons-drawer-title"><div className="drawer-head"><span id="addons-drawer-title">Дополнительные возможности</span><span/><button ref={closeRef} onClick={onClose} aria-label="Закрыть дополнительные возможности">×</button></div><div className="addons-detail"><div className="addons-detail-hero"><div><div className="eyebrow">● &nbsp; ОПЦИИ И ИНТЕГРАЦИИ</div><h2>Добавляем функцию только тогда, когда она решает задачу.</h2><p>Ниже — что делает каждая опция, когда она полезна и что не стоит подразумевать под стартовой ценой.</p></div><Image src="/art/glass-stone-soft.png" alt="" width={330} height={220} className="addons-detail-stone"/></div><div className="addons-detail-list">{addons.map((a,i)=>{const d=addonDetails[a.id];return <article key={a.id}><div className={`addon-icon accent-${i%3}`}><AddonIcon id={a.id}/></div><div><h3>{a.name}</h3><strong>от {a.price.toLocaleString("ru-RU")} ₪</strong><p>{d.why}</p><h4>Что входит</h4><ul>{d.includes.map(x=><li key={x}>{x}</li>)}</ul><small><b>Важно:</b> {d.not}</small></div></article>})}</div><div className="addons-support"><h3>Сопровождение после запуска</h3><p>Для регулярных проверок и небольших изменений доступны Care и Care Plus. Новые страницы, редизайн и новые функции оцениваются отдельно.</p><a className="cta glass-cta" href="#calculator" onClick={onClose}>Рассчитать проект →</a></div></div></div></div>
}

function Addons(){const[plans,setPlans]=useState(false);const[details,setDetails]=useState(false);return <><section className="addons section-shell"><div className="addons-glass-intro"><div><div className="eyebrow">● &nbsp; ДОПОЛНИТЕЛЬНЫЕ ВОЗМОЖНОСТИ</div><h2>Добавляем только то, что действительно нужно проекту</h2><p>WhatsApp-кнопки, мобильная адаптация, базовая аналитика и базовая SEO-подготовка уже входят в сайты.</p><button className="glass-link-btn" onClick={()=>setDetails(true)}>Открыть все возможности <span>→</span></button></div><Image src="/art/glass-sculpture.png" alt="" width={260} height={280} className="addons-sculpture"/></div><div className="addon-icons-grid">{addons.map((a,i)=><button className="addon-mini" key={a.id} onClick={()=>setDetails(true)} aria-label={`${a.name}: открыть подробности`}><span className={`addon-icon accent-${i%3}`}><AddonIcon id={a.id}/></span><span><b>{a.name}</b><small>от {a.price.toLocaleString("ru-RU")} ₪</small></span></button>)}</div><button className="maintenance-toggle" onClick={()=>setPlans(!plans)} aria-expanded={plans}>Сопровождение сайта <span>от 390 ₪ / месяц</span><i>{plans?"↑":"↓"}</i></button>{plans&&<div className="maintenance-grid">{maintenancePlans.map(p=><article key={p.id}><h3>{p.name}</h3><strong>{p.price} ₪ / месяц</strong><ul>{p.included.map(x=><li key={x}>{x}</li>)}</ul></article>)}<p className="maintenance-note">Дополнительное время — 250 ₪/час. Неиспользованное время не переносится. Новые страницы, редизайн, функции и сложные технические работы оцениваются отдельно.</p></div>}</section>{details&&<AddonsDrawer onClose={()=>setDetails(false)}/>}</>}

const basePrices=Object.fromEntries(workFormats.map(s=>[s.slug,s.price])) as Record<ServiceSlug,number>;
function Calculator(){
 const[type,setType]=useState<ServiceSlug|"">(""); const[selected,setSelected]=useState<string[]>([]); const[maintenance,setMaintenance]=useState<""|"care"|"care-plus">("");
 const toggle=(id:string)=>setSelected(v=>v.includes(id)?v.filter(x=>x!==id):[...v,id]);
 const base=type?basePrices[type]:0; const addonsTotal=selected.reduce((sum,id)=>sum+(addons.find(a=>a.id===id)?.price||0),0); const standard=base+addonsTotal; const promoBase=type?Math.round(base*(1-siteConfig.portfolioOffer.discountPercent/100)):0; const promo=promoBase+addonsTotal;
 const plan=maintenancePlans.find(p=>p.id===maintenance);
 const msg=type?`Здравствуйте! Хочу получить точную оценку NeXora. Формат: ${workFormats.find(s=>s.slug===type)?.name}. Дополнения: ${selected.length?selected.map(id=>addons.find(a=>a.id===id)?.name).join(", "):"без дополнений"}. Предварительная разовая стоимость: от ${standard.toLocaleString("ru-RU")} ₪; Portfolio Offer: от ${promo.toLocaleString("ru-RU")} ₪. Сопровождение: ${plan?`${plan.name} — ${plan.price} ₪/месяц`:"не выбрано"}. Свяжитесь со мной, пожалуйста, чтобы уточнить задачу.`:"Здравствуйте! Хочу обсудить проект с NeXora.";
 return <section id="calculator" className="calculator section-shell"><div className="calc-copy"><div className="eyebrow">● &nbsp; БЫСТРЫЙ РАСЧЁТ</div><h2>Рассчитайте ориентир вашего проекта</h2><p>Выберите основу и дополнительные задачи. После короткого брифа мы подтвердим точную стоимость.</p></div><div className="calc-panel"><label>Тип проекта<select value={type} onChange={e=>setType(e.target.value as ServiceSlug|"")}><option value="">Выберите формат проекта</option>{workFormats.map(s=><option key={s.slug} value={s.slug}>{s.name}</option>)}</select></label><div className="checks">{addons.map(a=><label key={a.id}><span><input type="checkbox" checked={selected.includes(a.id)} onChange={()=>toggle(a.id)}/> {a.name}</span><b>+ {a.price.toLocaleString("ru-RU")} ₪</b></label>)}</div><fieldset className="support-options"><legend>Сопровождение</legend><label><input type="radio" name="support" checked={maintenance===""} onChange={()=>setMaintenance("")}/> Без сопровождения</label>{maintenancePlans.map(p=><label key={p.id}><input type="radio" name="support" checked={maintenance===p.id} onChange={()=>setMaintenance(p.id as "care"|"care-plus")}/>{p.name}<b>+ {p.price} ₪ / мес.</b></label>)}</fieldset><div className="calc-result"><span>Предварительно</span><strong>{type?`от ${standard.toLocaleString("ru-RU")} ₪`:"Выберите формат проекта"}</strong>{type&&<small className="promo-result">Portfolio Offer −{siteConfig.portfolioOffer.discountPercent}% на основной пакет: от {promo.toLocaleString("ru-RU")} ₪</small>}{plan&&<small>Сопровождение: +{plan.price} ₪ / мес.</small>}</div><p className="calc-disclaimer">Это предварительный ориентир, а не окончательная оферта. Точная стоимость определяется после короткого брифа. Переводы, платные сервисы, домен, хостинг и комиссии внешних систем оплачиваются отдельно.</p><a className="cta" href={whatsappUrl(msg)} target="_blank" rel="noreferrer">Получить точную оценку →</a></div><div className="calc-art"><Image src="/art/glass-calculator.png" alt="" fill sizes="280px"/></div></section>}

function Footer(){return <footer id="contacts" className="footer section-shell"><div className="footer-brand"><Image src="/brand/nexora-wordmark.png" alt="NeXora" width={160} height={60}/><span>DIGITAL PRESENCE DESIGN</span></div><div className="footer-links"><a href="#projects">Проекты</a><a href="#process">Процесс</a><a href="#formats">Форматы</a><a href="#contacts">Контакты</a></div><div className="footer-contact">{siteConfig.email&&<a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>}<span>Написать нам: <a href={siteConfig.telegram} target="_blank" rel="noreferrer">Telegram</a></span><span>Написать нам: <a href={siteConfig.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a></span><a href={siteConfig.phoneHref}>{siteConfig.phoneDisplay}</a><span className="footer-location">
  Веб-дизайн и разработка в Хайфе · Работаем с бизнесом по всему Израилю и удалённо
</span></div><div className="footer-legal"><a href="/accessibility">Доступность</a><a href="/privacy">Политика конфиденциальности</a><a href="/terms">Условия использования</a></div></footer>}

export default function Page(){
  useLayoutEffect(()=>{
    if(typeof window==="undefined") return;
    if("scrollRestoration" in history) history.scrollRestoration="manual";
    const reset=()=>{document.documentElement.scrollTop=0;document.body.scrollTop=0;window.scrollTo({top:0,left:0,behavior:"auto"})};
    reset(); const raf=requestAnimationFrame(reset); const timer=window.setTimeout(reset,80);
    return()=>{cancelAnimationFrame(raf);window.clearTimeout(timer)};
  },[]);
  return <><a className="skip-link" href="#main-content">Перейти к содержимому</a><Header/><main id="main-content"><Hero/><Approach/><Services/><Projects/><Process/><IdeaCta/><PortfolioOffer/><WorkFormats/><Addons/><Calculator/></main><Footer/></>
}
