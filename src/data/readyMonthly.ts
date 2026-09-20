// Единственный источник публичных цен Ready Monthly.
// У каждого нового Ready укажите monthlyPlan в readySites.ts.
export type MonthlyPlanId = "compact" | "landing" | "business";
export const monthlyPlans = {
  compact: {
    id: "compact", name: "Компактный сайт", price: 249,
    description: "Главное о вас, ваших услугах и способах связи — в компактном формате. Для бизнеса, которому нужна понятная точка входа из соцсетей, рекламы и рекомендаций.",
    purpose: "Представить себя и быстро связаться",
  },
  landing: {
    id: "landing", name: "Лендинг", price: 299,
    description: "Одна развёрнутая страница вокруг конкретного предложения. Помогает раскрыть услугу, ответить на вопросы и привести посетителя к заявке или записи.",
    purpose: "Раскрыть предложение и получить обращение",
  },
  business: {
    id: "business", name: "Бизнес-сайт", price: 399,
    description: "Многостраничный сайт для компании с несколькими направлениями. Отдельное пространство для услуг, информации о бизнесе, опыта и контактов.",
    purpose: "Подробно представить компанию и её услуги",
  },
} as const;
export const monthlyPlanList = [monthlyPlans.compact, monthlyPlans.landing, monthlyPlans.business];
export const monthlyContentPack = { name: "Content Pack", price: 390 } as const;
export const monthlyPricePromise = "Если публичные тарифы Ready Monthly изменятся, стоимость вашей действующей подписки сохранится на уровне, зафиксированном при подключении. Новые цены применяются к новым подключениям, в том числе при возобновлении отменённой подписки.";

// Ready Monthly support: shared by Monthly, Ready, Services and terms.
const monthlyEditMinutes = 90;
export const monthlySupport = {
  editMinutes: monthlyEditMinutes,
  summary: "Хостинг · 2 пакета правок · еженедельная проверка",
  editsDescription: `В каждый месяц подписки входят два пакета правок — два собранных списка изменений — общим объёмом до ${monthlyEditMinutes} минут работы. Например: обновление готовых текстов, фотографий, цен, услуг и контактов в существующей структуре сайта. Это общий лимит на оба пакета, а не на каждый. Если запрос выходит за этот объём, дополнительные работы и стоимость согласуем до их выполнения.`,
  checksDescription: "Раз в неделю проверяем доступность сайта, основные страницы, формы и ссылки для связи, статус индексации и технические ошибки в Google Search Console, а также сбор данных в Google Analytics. Техническая проверка проводится отдельно от двух пакетов правок. Для проверки Search Console и Analytics нужен доступ к подключённым аккаунтам. Проверка статуса индексации не является гарантией индексации или позиций в Google; продвижение сайта — отдельная услуга.",
} as const;
