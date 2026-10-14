import styles from "@/app/ready/shop.module.css";

/** Conceptual lettering, NOT a demo website or a screenshot of a Ready product. */
export function ReadyHeroArtwork() {
  return (
    <div className={styles.heroScene} aria-label="Ноутбук: «Ваш продукт в красивом сайте». Телефон: «Инструмент, который помогает продавать»">
      <div className={styles.sceneGlow} aria-hidden="true" />
      <div className={styles.sceneLeafA} aria-hidden="true" />
      <div className={styles.sceneLeafB} aria-hidden="true" />
      <div className={styles.sceneLeafC} aria-hidden="true" />
      <div className={styles.laptop}>
        <div className={styles.laptopBezel}>
          <div className={styles.laptopScreen}>
            <div className={styles.deviceTopline}><span>ВАШ БРЕНД</span><span>ПРОДУКТ · КОНТАКТЫ</span></div>
            <div className={styles.laptopCopy}>
              <span className={styles.deviceKicker}>СОЗДАНО ДЛЯ ВАШЕГО БИЗНЕСА</span>
              <strong>Ваш продукт<br />в красивом<br /><i>сайте.</i></strong>
              <span className={styles.deviceBody}>Выразительная подача.<br />Понятный путь к покупке.</span>
              <span className={styles.deviceAction}>Узнать больше <b>↗</b></span>
            </div>
            <div className={styles.laptopGraphic} aria-hidden="true">
              <span className={styles.graphicArch} />
              <span className={styles.graphicOrb} />
              <span className={styles.graphicLine} />
            </div>
          </div>
        </div>
        <div className={styles.laptopBase} aria-hidden="true" />
      </div>
      <div className={styles.phone}>
        <div className={styles.phoneInset}>
          <span className={styles.phoneNotch} aria-hidden="true" />
          <div className={styles.phoneHeader}>ВАШ БРЕНД <span>≡</span></div>
          <div className={styles.phoneContent}>
            <span className={styles.deviceKicker}>ВАШ БИЗНЕС / ONLINE</span>
            <strong>Инструмент,<br />который<br /><i>помогает<br />продавать.</i></strong>
            <span className={styles.phoneLine} />
            <small>Удобно посмотреть.<br />Легко обратиться.</small>
            <span className={styles.phoneButton}>Оставить заявку ↗</span>
          </div>
        </div>
      </div>
      <span className={styles.sceneShadow} aria-hidden="true" />
    </div>
  );
}
