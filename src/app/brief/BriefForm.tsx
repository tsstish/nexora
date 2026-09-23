"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { siteConfig } from "@/data/site";
import styles from "./brief.module.css";

type Model = "ready-buy" | "monthly" | "individual";
type BriefState = {
  projectCode: string;
  clientName: string;
  businessName: string;
  contact: string;
  model: Model | "";
  concept: string;
  business: string;
  audience: string;
  geography: string;
  goals: string[];
  mainAction: string;
  palette: string;
  avoidColors: string;
  visualNotes: string;
  logoStatus: string;
  textsStatus: string;
  photosStatus: string;
  pricesStatus: string;
  languages: string;
  phone: string;
  whatsapp: string;
  social: string;
  address: string;
  domain: string;
  extras: string;
  comments: string;
  confirmed: boolean;
};

const storageKey = "nexora-client-brief-v1";
const initialState: BriefState = {
  projectCode: "",
  clientName: "",
  businessName: "",
  contact: "",
  model: "",
  concept: "",
  business: "",
  audience: "",
  geography: "",
  goals: [],
  mainAction: "",
  palette: "",
  avoidColors: "",
  visualNotes: "",
  logoStatus: "",
  textsStatus: "",
  photosStatus: "",
  pricesStatus: "",
  languages: "",
  phone: "",
  whatsapp: "",
  social: "",
  address: "",
  domain: "",
  extras: "",
  comments: "",
  confirmed: false,
};

const models: { value: Model; title: string; text: string }[] = [
  { value: "ready-buy", title: "Покупка Ready", text: "Адаптация выбранной концепции с разовой оплатой" },
  { value: "monthly", title: "Ready Monthly", text: "Готовый сайт по подписке с поддержкой" },
  { value: "individual", title: "Индивидуальная разработка", text: "Структура, дизайн и разработка с нуля" },
];

const goalOptions = [
  "Получать обращения",
  "Запись на услугу",
  "Показать услуги и цены",
  "Повысить доверие",
  "Запустить рекламу",
  "Продажа онлайн",
];

const palettes = [
  { id: "natural", title: "Спокойная природная", colors: ["#173c35", "#6fa38f", "#cdded5", "#f5f1e9"] },
  { id: "minimal", title: "Светлая минималистичная", colors: ["#263833", "#9eafaa", "#e5ece9", "#ffffff"] },
  { id: "warm", title: "Тёплая и мягкая", colors: ["#663f38", "#bd7864", "#e7c1b3", "#f7efe8"] },
  { id: "professional", title: "Строгая профессиональная", colors: ["#183852", "#58748e", "#b7c8d5", "#f1f5f7"] },
  { id: "premium", title: "Сдержанная премиальная", colors: ["#24212d", "#655b69", "#b5a49d", "#eee7e1"] },
  { id: "bright", title: "Выразительная современная", colors: ["#125a53", "#4c62b8", "#de7a64", "#f2eee8"] },
  { id: "brand", title: "У меня есть фирменные цвета", colors: ["#263833", "#a8b2ae", "#dedbd4", "#f8f7f4"] },
  { id: "trust", title: "Доверяю выбор NeXora", colors: ["#13372f", "#cfe8e3", "#e5e3f2", "#f3e3d8"] },
];

const steps = ["Проект", "Задача", "Визуальный стиль", "Материалы", "Контакты", "Проверка"];

function labelForModel(model: Model | "") {
  return models.find(item => item.value === model)?.title || "Не указан";
}

export function BriefForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<BriefState>(initialState);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedDraft = window.localStorage.getItem(storageKey);
    let draft: Partial<BriefState> = {};
    if (savedDraft) {
      try {
        draft = JSON.parse(savedDraft) as Partial<BriefState>;
      } catch {
        window.localStorage.removeItem(storageKey);
      }
    }
    const params = new URLSearchParams(window.location.search);
    const requestedModel = params.get("model");
    const model: Model | undefined = requestedModel === "monthly" || requestedModel === "individual" || requestedModel === "ready-buy" ? requestedModel : undefined;
    setData(current => ({
      ...current,
      ...draft,
      ...(model ? { model } : {}),
      ...(params.get("concept") ? { concept: params.get("concept") || "" } : {}),
      ...(params.get("client") ? { clientName: params.get("client") || "" } : {}),
      ...(params.get("project") ? { projectCode: params.get("project") || "" } : {}),
    }));
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      window.localStorage.setItem(storageKey, JSON.stringify(data));
      setSaved(true);
      window.setTimeout(() => setSaved(false), 1100);
    }, 250);
    return () => window.clearTimeout(timer);
  }, [data]);

  const update = <K extends keyof BriefState>(key: K, value: BriefState[K]) => setData(current => ({ ...current, [key]: value }));
  const toggleGoal = (goal: string) => update("goals", data.goals.includes(goal) ? data.goals.filter(item => item !== goal) : [...data.goals, goal]);

  const summary = useMemo(() => [
    "Здравствуйте! Я заполнил(а) бриф NeXora.",
    data.projectCode && `Проект: ${data.projectCode}`,
    `Заказчик: ${data.clientName || "—"}`,
    `Контакт: ${data.contact || "—"}`,
    `Бизнес: ${data.businessName || "—"}`,
    `Формат: ${labelForModel(data.model)}`,
    data.concept && `Концепция: ${data.concept}`,
    `О бизнесе: ${data.business || "—"}`,
    `Аудитория: ${data.audience || "—"}`,
    `География: ${data.geography || "—"}`,
    `Задачи: ${data.goals.join(", ") || "—"}`,
    `Главное действие: ${data.mainAction || "—"}`,
    `Палитра: ${palettes.find(item => item.id === data.palette)?.title || "—"}`,
    `Не использовать: ${data.avoidColors || "—"}`,
    `Визуальное впечатление: ${data.visualNotes || "—"}`,
    `Логотип: ${data.logoStatus || "—"}`,
    `Тексты: ${data.textsStatus || "—"}`,
    `Фотографии: ${data.photosStatus || "—"}`,
    `Цены: ${data.pricesStatus || "—"}`,
    `Языки: ${data.languages || "—"}`,
    `Телефон: ${data.phone || "—"}`,
    `WhatsApp: ${data.whatsapp || "—"}`,
    `Соцсети: ${data.social || "—"}`,
    `Адрес: ${data.address || "—"}`,
    `Домен: ${data.domain || "—"}`,
    `Дополнения: ${data.extras || "—"}`,
    `Комментарий: ${data.comments || "—"}`,
  ].filter(Boolean).join("\n"), [data]);

  const next = () => setStep(current => Math.min(current + 1, steps.length - 1));
  const previous = () => setStep(current => Math.max(current - 1, 0));
  const reset = () => {
    if (!window.confirm("Очистить все ответы и начать бриф заново?")) return;
    window.localStorage.removeItem(storageKey);
    setData(initialState);
    setStep(0);
  };
  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (step < steps.length - 1) return next();
    if (!data.confirmed) return;
    window.open(`${siteConfig.whatsapp}?text=${encodeURIComponent(summary)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <form className={styles.form} onSubmit={submit}>
      <div className={styles.progressHead}>
        <span>Шаг {step + 1} из {steps.length}</span>
        <span>{saved ? "Черновик сохранён" : steps[step]}</span>
      </div>
      <div className={styles.progress}><span style={{ width: `${((step + 1) / steps.length) * 100}%` }} /></div>

      <section className={styles.panel} aria-labelledby={`brief-step-${step}`}>
        <div className={styles.stepTitle}><span>0{step + 1}</span><div><h2 id={`brief-step-${step}`}>{steps[step]}</h2><p>{step === 0 ? "Проверим основные данные проекта" : step === 5 ? "Проверьте ответы перед отправкой" : "Можно отвечать коротко и своими словами"}</p></div></div>

        {step === 0 && <div className={styles.fields}>
          <p className={`${styles.requiredNote} ${styles.wide}`}><span>*</span> Поля, обязательные для продолжения</p>
          <label>Ваше имя <span className={styles.required}>*</span><input value={data.clientName} onChange={e => update("clientName", e.target.value)} autoComplete="name" required /></label>
          <label>Название бизнеса<input value={data.businessName} onChange={e => update("businessName", e.target.value)} /></label>
          <label className={styles.wide}>Телефон или email для связи <span className={styles.required}>*</span><input value={data.contact} onChange={e => update("contact", e.target.value)} required /></label>
          <fieldset className={styles.wide}><legend>Согласованный формат <span className={styles.required}>*</span></legend><div className={styles.choiceGrid}>{models.map(model => <label key={model.value} className={data.model === model.value ? styles.selected : ""}><input type="radio" name="model" required checked={data.model === model.value} onChange={() => update("model", model.value)} /><strong>{model.title}</strong><span>{model.text}</span></label>)}</div></fieldset>
          {data.model && data.model !== "individual" && <label className={styles.wide}>Выбранная концепция Ready<input value={data.concept} onChange={e => update("concept", e.target.value)} placeholder="Например, MIDA или LEA NORD" /></label>}
        </div>}

        {step === 1 && <div className={styles.fields}>
          <label className={styles.wide}>Чем занимается ваш бизнес?<textarea value={data.business} onChange={e => update("business", e.target.value)} rows={3} /></label>
          <label>Кто ваши клиенты?<textarea value={data.audience} onChange={e => update("audience", e.target.value)} rows={3} /></label>
          <label>Где вы работаете?<textarea value={data.geography} onChange={e => update("geography", e.target.value)} rows={3} placeholder="Город, регион или онлайн" /></label>
          <fieldset className={styles.wide}><legend>Что сайт должен помочь сделать?</legend><div className={styles.chips}>{goalOptions.map(goal => <label key={goal} className={data.goals.includes(goal) ? styles.activeChip : ""}><input type="checkbox" checked={data.goals.includes(goal)} onChange={() => toggleGoal(goal)} />{goal}</label>)}</div></fieldset>
          <label className={styles.wide}>Какое главное действие должен совершить посетитель?<input value={data.mainAction} onChange={e => update("mainAction", e.target.value)} placeholder="Написать в WhatsApp, записаться, оформить заказ…" /></label>
        </div>}

        {step === 2 && <div className={styles.fields}>
          <fieldset className={styles.wide}><legend>Какое визуальное направление вам ближе?</legend><p className={styles.hint}>Это не окончательные цвета, а направление. Мы проверим оттенки, контраст и сочетание с вашим логотипом.</p><div className={styles.paletteGrid}>{palettes.map(palette => <label key={palette.id} className={data.palette === palette.id ? styles.paletteSelected : ""}><input type="radio" name="palette" checked={data.palette === palette.id} onChange={() => update("palette", palette.id)} /><span className={styles.swatches}>{palette.colors.map(color => <i key={color} style={{ background: color }} />)}</span><strong>{palette.title}</strong></label>)}</div></fieldset>
          <label>Какие цвета точно не использовать?<input value={data.avoidColors} onChange={e => update("avoidColors", e.target.value)} /></label>
          <label>Что важно в визуальном впечатлении?<textarea value={data.visualNotes} onChange={e => update("visualNotes", e.target.value)} rows={3} placeholder="Спокойно, технологично, тепло, строго…" /></label>
          <label className={styles.wide}>Логотип<select value={data.logoStatus} onChange={e => update("logoStatus", e.target.value)}><option value="">Выберите вариант</option><option>Есть и готов к передаче</option><option>Есть, но требует доработки</option><option>Нужно создать</option><option>Пока используем название текстом</option></select></label>
        </div>}

        {step === 3 && <div className={styles.fields}>
          <label>Тексты<select value={data.textsStatus} onChange={e => update("textsStatus", e.target.value)}><option value="">Выберите вариант</option><option>Готовы</option><option>Есть черновики</option><option>Нужна редактура</option><option>Нужен Content Pack</option></select></label>
          <label>Фотографии<select value={data.photosStatus} onChange={e => update("photosStatus", e.target.value)}><option value="">Выберите вариант</option><option>Есть свои фотографии</option><option>Нужно подобрать изображения</option><option>Нужна генерация</option><option>Пока не знаю</option></select></label>
          <label>Цены и перечень услуг<select value={data.pricesStatus} onChange={e => update("pricesStatus", e.target.value)}><option value="">Выберите вариант</option><option>Готовы полностью</option><option>Нужно уточнить</option><option>Цены на сайте не показываем</option></select></label>
          <label>Языки сайта<input value={data.languages} onChange={e => update("languages", e.target.value)} placeholder="Русский, иврит, английский…" /></label>
          <div className={`${styles.materialNote} ${styles.wide}`}><strong>Файлы не нужно прикреплять к брифу</strong><p>После согласования состава проекта NeXora отправит персональную ссылку для безопасной загрузки логотипа, фотографий и окончательных текстов. Пароли через форму не передаются.</p></div>
        </div>}

        {step === 4 && <div className={styles.fields}>
          <label>Телефон<input value={data.phone} onChange={e => update("phone", e.target.value)} inputMode="tel" /></label>
          <label>WhatsApp<input value={data.whatsapp} onChange={e => update("whatsapp", e.target.value)} inputMode="tel" /></label>
          <label>Соцсети или другие ссылки<input value={data.social} onChange={e => update("social", e.target.value)} /></label>
          <label>Адрес или зона работы<input value={data.address} onChange={e => update("address", e.target.value)} /></label>
          <label className={styles.wide}>Домен<input value={data.domain} onChange={e => update("domain", e.target.value)} placeholder="Есть домен / нужна помощь с подключением" /></label>
          <label className={styles.wide}>Дополнительные страницы, формы или функции<textarea value={data.extras} onChange={e => update("extras", e.target.value)} rows={3} /></label>
          <label className={styles.wide}>Что ещё важно знать?<textarea value={data.comments} onChange={e => update("comments", e.target.value)} rows={3} /></label>
        </div>}

        {step === 5 && <div className={styles.review}>
          <dl><div><dt>Заказчик</dt><dd>{data.clientName || "Не указано"}</dd></div><div><dt>Бизнес</dt><dd>{data.businessName || "Не указано"}</dd></div><div><dt>Формат</dt><dd>{labelForModel(data.model)}</dd></div>{data.concept && <div><dt>Концепция</dt><dd>{data.concept}</dd></div>}<div><dt>Задачи</dt><dd>{data.goals.join(", ") || "Не указаны"}</dd></div><div><dt>Палитра</dt><dd>{palettes.find(item => item.id === data.palette)?.title || "Не выбрана"}</dd></div><div><dt>Материалы</dt><dd>{[data.textsStatus, data.photosStatus, data.pricesStatus].filter(Boolean).join(" · ") || "Не указано"}</dd></div><div><dt>Домен</dt><dd>{data.domain || "Не указано"}</dd></div></dl>
          <label className={styles.confirm}><input type="checkbox" checked={data.confirmed} onChange={e => update("confirmed", e.target.checked)} /><span>Я проверил(а) ответы. Понимаю, что окончательные объём, стоимость и сроки будут зафиксированы в форме заказа до начала работы.</span></label>
          <p className={styles.hint}>После нажатия откроется WhatsApp с собранными ответами. Отправка произойдёт только после вашего подтверждения в WhatsApp.</p>
          <button type="button" className={styles.reset} onClick={reset}>Очистить бриф и начать заново</button>
        </div>}
      </section>

      <div className={styles.controls}>
        {step > 0 ? <button type="button" className={styles.secondary} onClick={previous}>← Назад</button> : <span />}
        <button type="submit" className={styles.primary} disabled={step === steps.length - 1 && !data.confirmed}>{step === steps.length - 1 ? "Открыть ответы в WhatsApp →" : "Продолжить →"}</button>
      </div>
    </form>
  );
}
