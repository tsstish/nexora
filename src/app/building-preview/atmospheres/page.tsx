import { CityBackdrop } from "../CityBackdrop";
import { StudioHeader } from "../StudioHeader";
import { AtmosphereControls } from "./AtmosphereControls";
import styles from "./atmospheres.module.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Лаборатория городов | NeXora",
  robots: { index: false, follow: false },
};

export default function AtmospheresLab() {
  return (
    <main className={styles.page}>
      <div className={`${styles.cityScene} nx-city-stage`}>
        <CityBackdrop />
        <StudioHeader />
        <div className={styles.cityTitle}>
          <span>NE XORA / CITY ATMOSPHERES</span>
          <h2>Digital spaces<br/>for real business</h2>
        </div>
      </div>
      <AtmosphereControls />
    </main>
  );
}
