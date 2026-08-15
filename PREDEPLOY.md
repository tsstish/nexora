# NeXora — pre-deploy checklist

## Уже встроено в V10
- favicon / app icon / Apple icon из утверждённой NX-монограммы
- Open Graph 1200×630 с настоящим логотипом NeXora
- Twitter/X large-image preview
- metadataBase через `NEXT_PUBLIC_SITE_URL`
- canonical для главной, услуг и legal pages
- `sitemap.ts`
- `robots.ts` со ссылкой на sitemap
- JSON-LD Organization / ProfessionalService на сайте
- JSON-LD Service на страницах услуг
- custom 404
- optional Google Analytics 4
- optional Meta Pixel
- consent banner: GA/Meta не загружаются до согласия
- mobile/tablet calculator repositioning

## Что заполнить перед production deploy
1. В Vercel → Project → Settings → Environment Variables:
   - `NEXT_PUBLIC_SITE_URL=https://ВАШ-ДОМЕН`
   - `NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX` — только когда создан GA4
   - `NEXT_PUBLIC_META_PIXEL_ID=XXXXXXXXXXXX` — только когда создан Meta Pixel
2. После покупки домена создать `hello@...` и вписать email в `src/data/site.ts`.
3. Проверить бизнес-реквизиты и юридический статус до финального утверждения legal pages.

## Обязательная проверка на production URL
- `npm run build`
- Chrome + Safari
- mobile: 320 / 375 / 390 / 430 px
- desktop: 1366 / 1440 / 1920 px
- TAB, Shift+TAB, Escape, focus-visible
- VoiceOver: основная навигация, модалы, calculator, legal pages
- zoom 200% и отсутствие горизонтального overflow
- контраст текста на glass surfaces
- все WhatsApp / Telegram / phone links
- все `/services/...` открываются напрямую и после refresh
- `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest`
- social preview через Facebook Sharing Debugger / LinkedIn Post Inspector / Telegram test
- Lighthouse: Performance, Accessibility, Best Practices, SEO
- Google Search Console: подтвердить домен и отправить `/sitemap.xml`

## Analytics
Если GA/Meta IDs не заданы, никакие аналитические скрипты не загружаются и consent banner не показывается.
Если IDs заданы, необязательные analytics scripts загружаются только после кнопки «Разрешить аналитику».
