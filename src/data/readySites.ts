export type ReadySite = {
  slug: string;
  name: string;
  category: string;
  title: string;
  shortDescription: string;
  description: string;
  priceFrom: number;
  individualPriceFrom: number;
  pricingBreakdown: {
  label: string;
  price: number;
  }[];
  currency: "ILS";
  demoUrl: string;
  cover: string;
  languages: string[];
  features: string[];
  adaptationIncludes: string[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
};

export const readySites: ReadySite[] = [
  {
    slug: "dental-clinic",
    name: "MIDA",
    category: "Стоматология и клиники",

    title: "Готовый сайт для стоматологии",

    shortDescription:
      "Многостраничный сайт стоматологической клиники с современным дизайном, версиями на русском и иврите и адаптацией под ваш бизнес.",

    description:
      "MIDA — готовая дизайн-концепция и разработанный многостраничный сайт для стоматологической клиники. Структура, UX/UI и основная техническая часть уже созданы. NeXora адаптирует сайт под вашу клинику: бренд, услуги, тексты, фотографии, цены, контакты и необходимые способы обращения.",

    priceFrom: 4900,
    currency: "ILS",
    individualPriceFrom: 10600,

pricingBreakdown: [
  {
    label: "Индивидуальный бизнес-сайт",
    price: 8900,
  },
  {
    label: "Дополнительный язык",
    price: 1200,
  },
  {
    label: "RTL-адаптация для иврита",
    price: 500,
  },
],

    demoUrl: "https://mida.nexoradesign.online",

    cover: "/ready/mida-cover.jpg",

    languages: ["Русский", "Иврит", "RTL"],

    features: [
      "Многостраничная структура",
      "Версии на русском и иврите",
      "Полная RTL-адаптация",
      "Адаптивный дизайн для мобильных устройств",
      "Страницы процедур и цен",
      "Раздел кейсов «До и после»",
      "Страница клиники и врача",
      "Контактные сценарии и CTA",
      "Базовая SEO-подготовка",
      "Open Graph и техническая структура для поисковых систем",
    ],

    adaptationIncludes: [
      "Замена логотипа и фирменных данных",
      "Адаптация цветовой системы в рамках концепции",
      "Размещение материалов вашей клиники",
      "Замена услуг, цен и контактной информации",
      "Адаптация предоставленных текстов",
      "Подключение телефона и WhatsApp",
      "Подключение формы обращения",
      "Базовая SEO-настройка перед запуском",
      "Подключение Google Analytics 4",
      "Подключение Google Search Console",
      "Подготовка и публикация сайта",
    ],

    seo: {
      title: "Готовый сайт для стоматологии в Израиле | NeXora",
      description:
        "Готовый сайт для стоматологии с адаптацией под клинику: индивидуальный бренд, RU/HE, RTL, мобильная версия и базовая SEO-настройка. MIDA by NeXora — от 4 900 ₪.",
      keywords: [
        "готовый сайт для стоматологии",
        "сайт для стоматологической клиники",
        "создание сайта для стоматологии",
        "разработка сайта стоматологии",
        "сайт для клиники в Израиле",
        "сайт стоматологии на иврите",
        "двуязычный сайт Израиль",
      ],
    },
  },
];

export const readySiteMap = Object.fromEntries(
  readySites.map((site) => [site.slug, site])
) as Record<string, ReadySite>;