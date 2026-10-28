import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Privacy from "@/app/privacy/page";
import Terms from "@/app/terms/page";
import Accessibility from "@/app/accessibility/page";
import { StudioHeader } from "../../StudioHeader";
import styles from "./document.module.css";

type Props = { params: Promise<{ slug: string }> };
const documents = {
  privacy: { label: "Политика конфиденциальности", Component: Privacy },
  terms: { label: "Условия использования", Component: Terms },
  accessibility: { label: "Заявление о доступности", Component: Accessibility },
};

export function generateStaticParams() { return Object.keys(documents).map((slug) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!(slug in documents)) return { title: "Документ не найден", robots: { index: false } };
  const doc = documents[slug as keyof typeof documents];
  return { title: { absolute: `${doc.label} | NeXora` },
    robots: { index: false, follow: false }, alternates: { canonical: `/building-preview/docs/${slug}` } };
}

export default async function DocumentPreview({ params }: Props) {
  const { slug } = await params;
  if (!(slug in documents)) notFound();
  const doc = documents[slug as keyof typeof documents];
  const Component = doc.Component;
  return (
    <div className={styles.page}>
      <div className={styles.sunsetTop}>
        <StudioHeader />
        <div className={styles.heading}>
          <span>NEXORA / DOCUMENT LIBRARY</span>
          <h1>{doc.label}</h1>
          <Link href="/building-preview/contacts#documents">← Все документы</Link>
        </div>
      </div>
      <div className={styles.body}><Component /></div>

    </div>
  );
}
