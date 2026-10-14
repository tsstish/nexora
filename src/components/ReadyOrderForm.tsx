"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { whatsappUrl } from "@/data/site";
import { trackSiteEvent } from "@/lib/analytics";
import styles from "@/app/ready/shop.module.css";

type Plan = "buy" | "monthly";

export function ReadyOrderForm({ product, initialPlan = "buy" }: { product: string; initialPlan?: Plan }) {
  const [plan, setPlan] = useState<Plan>(initialPlan);
  const [name, setName] = useState("");
  const [contactMethod, setContactMethod] = useState("WhatsApp");
  const [contact, setContact] = useState("");
  const [business, setBusiness] = useState("");
  const [wishes, setWishes] = useState("");
  const [agreed, setAgreed] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!agreed) return;
    // No database or unconfigured external email service. The user confirms sending inside WhatsApp.
    const message = [
      "Здравствуйте! Заявка на Ready by NeXora.",
      "Сайт: " + product,
      "Формат: " + (plan === "buy" ? "Покупка" : "Monthly"),
      "Имя: " + name.trim(),
      "Связаться через: " + contactMethod,
      "Контакт: " + contact.trim(),
      "Бизнес: " + business.trim(),
      "Пожелания: " + (wishes.trim() || "Не указаны"),
    ].join("\n");

    trackSiteEvent("whatsapp_click", { placement: "ready_order_form", direction: "ready_order" });
    window.location.assign(whatsappUrl(message));
  }

  return (
    <form id="ready-order" className={styles.orderForm} onSubmit={submit}>
      <div className={styles.formEyebrow}>ЗАЯВКА / БЕЗ ОПЛАТЫ</div>
      <h2>Заказать {product}</h2>
      <p>Оставьте контакты — обсудим адаптацию и согласуем детали до начала работы.</p>
      <fieldset className={styles.planFieldset}>
        <legend>Формат</legend>
        <label className={styles.radioLine}><input type="radio" name="plan" value="buy" checked={plan === "buy"} onChange={() => setPlan("buy")} /> Купить сайт</label>
        <label className={styles.radioLine}><input type="radio" name="plan" value="monthly" checked={plan === "monthly"} onChange={() => setPlan("monthly")} /> Monthly</label>
      </fieldset>
      <div className={styles.orderFields}>
        <label>Как к вам обращаться?
          <input value={name} onChange={(event) => setName(event.target.value)} name="name" autoComplete="name" maxLength={90} required placeholder="Ваше имя" />
        </label>
        <label>Как с вами связаться?
          <select value={contactMethod} onChange={(event) => setContactMethod(event.target.value)} name="contactMethod">
            <option>WhatsApp</option><option>Telegram</option><option>Телефон</option>
          </select>
        </label>
        <label>Контакт
          <input value={contact} onChange={(event) => setContact(event.target.value)} name="contact" required maxLength={100} placeholder={contactMethod === "Telegram" ? "@username или номер" : "+972 ..."} />
        </label>
        <label>Чем занимается ваш бизнес?
          <input value={business} onChange={(event) => setBusiness(event.target.value)} name="business" required maxLength={160} placeholder="Например, частная клиника" />
        </label>
        <label className={styles.wishes}>Пожелания (необязательно)
          <textarea value={wishes} onChange={(event) => setWishes(event.target.value)} maxLength={1500} rows={3} placeholder="Что хотите поменять или добавить?" />
        </label>
      </div>
      <label className={styles.consent}><input type="checkbox" checked={agreed} onChange={(event) => setAgreed(event.target.checked)} required />
        <span>Согласен(на) на использование указанных данных для ответа на заявку. <Link href="/privacy" target="_blank">Политика конфиденциальности ↗</Link></span>
      </label>
      <button type="submit" className={styles.glassButton}>Перейти к отправке заявки <span>↗</span></button>
      <small className={styles.formNote}>Откроется WhatsApp с готовым сообщением. Для отправки нажмите «Отправить» в чате. Никакого списания денег.</small>
    </form>
  );
}
