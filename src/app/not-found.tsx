import Link from "next/link";

export default function NotFound() {
  return <main className="not-found-page">
    <div className="not-found-glass">
      <span>404</span>
      <h1>Такой страницы здесь нет.</h1>
      <p>Можно вернуться на главную или посмотреть форматы работы NeXora.</p>
      <div><Link className="cta" href="/">На главную →</Link><Link className="text-link" href="/#formats">Форматы работы</Link></div>
    </div>
  </main>;
}
