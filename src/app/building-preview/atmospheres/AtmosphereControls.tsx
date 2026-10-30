"use client";

import { CITY_ASSETS, CITY_OPTIONS, DAY_PHASE_LABELS, type DayPhase } from "../cityAtmospheres";
import { useCityAtmosphere } from "../CityAtmosphereProvider";
import styles from "./atmospheres.module.css";

const phases: DayPhase[] = ["morning","day","sunset","night"];

export function AtmosphereControls() {
  const { city, phase, manualPhase, chooseCity, previewPhase } = useCityAtmosphere();
  return (
    <div className={styles.controls}>
      <div className={styles.controlHeader}>
        <div><span className={styles.eyebrow}>NEXORA / ATMOSPHERES LAB</span><h1>Один город. Разный свет</h1></div>
        <p>Здесь меняется настоящая фотография, а не только подпись. В рабочем режиме освещение определяется часами вашего устройства. Этот экран нужен для сравнения кадров.</p>
      </div>
      <div className={styles.controlColumns}>
        <div>
          <span className={styles.label}>Город этой версии</span>
          <div className={styles.buttons}>
            {CITY_OPTIONS.map(id => <button key={id} type="button"
              onClick={() => chooseCity(id)} aria-pressed={city===id}>{CITY_ASSETS[id].label}</button>)}
          </div>
        </div>
        <div>
          <span className={styles.label}>Посмотрите освещение</span>
          <div className={styles.buttons}>
            {phases.map(id => <button key={id} type="button"
              onClick={() => previewPhase(id)} aria-pressed={phase===id}>{DAY_PHASE_LABELS[id]}</button>)}
          </div>
        </div>
      </div>
      <div className={styles.debugBar}>
        <span>Город: <strong>{CITY_ASSETS[city].label}</strong></span>
        <span>Свет: <strong>{DAY_PHASE_LABELS[phase]}</strong></span>
        <span>Режим: <strong>{manualPhase ? "Ручная проверка" : "По часам устройства"}</strong></span>
        <button type="button" onClick={() => previewPhase(null)}>Вернуться к реальному времени</button>
      </div>
      <p className={styles.note}>Сейчас используются четыре согласованных кадра Нью-Йорка: утро, день, закат и ночь. Облака — отдельные бесшовные слои, движущиеся только в пределах неба; вверху они плотнее, у горизонта прозрачнее. Это тестовая страница; основные тексты NeXora не изменены.</p>
      <div className={styles.links}>
        <a href="/">Главная ↗</a>
        <a href="/pricing">Стоимость ↗</a>
        <a href="/contacts">Контакты ↗</a>
      </div>
    </div>
  );
}
