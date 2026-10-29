"use client";

import { useState } from "react";
import { whatsappUrl } from "@/data/site";
import styles from "./ProjectBrief.module.css";

const types = [
  "Помогите выбрать формат",
  "Сайт по подписке",
  "Покупка готового сайта",
  "Индивидуальная разработка",
] as const;

export function ProjectBrief() {
  const [projectType, setProjectType] = useState<string>(types[0]);
  const [task, setTask] = useState("");
  const message = [
    "Здравствуйте! Хочу обсудить сайт NeXora.",
    `Формат: ${projectType}.`,
    task.trim() ? `Задача: ${task.trim()}` : "",
  ].filter(Boolean).join("\n");

  return (
    <details id="brief" className={styles.brief}>
      <summary>
        <span><strong>Короткая заявка</strong><small>Два шага — и можно обсудить проект</small></span>
        <span className={styles.mark} aria-hidden="true">+</span>
      </summary>
      <div className={styles.fields}>
        <label htmlFor="nx-project-type">Что вас интересует?</label>
        <select id="nx-project-type" value={projectType} onChange={event => setProjectType(event.target.value)}>
          {types.map(type => <option key={type} value={type}>{type}</option>)}
        </select>
        <label htmlFor="nx-project-task">Пару слов о задаче <span>(необязательно)</span></label>
        <textarea
          id="nx-project-task"
          rows={3}
          maxLength={400}
          placeholder="Например, нужен сайт для стоматологии с записью"
          value={task}
          onChange={event => setTask(event.target.value)}
        />
        <a className={styles.send} href={whatsappUrl(message)}
           target="_blank" rel="noopener noreferrer">
          Продолжить в WhatsApp <span aria-hidden="true">↗</span>
        </a>
        <p className={styles.note}>Ничего не отправляется автоматически: вы проверите сообщение в WhatsApp перед отправкой</p>
      </div>
    </details>
  );
}
