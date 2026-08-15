# NeXora V6 — pre-launch checklist

## Already wired
- 6 service formats with one data source: `src/data/services.ts`
- Portfolio Offer: −20% for first 3 projects, main package only
- Service detail drawer on the homepage + direct `/services/[slug]` pages
- Neutral glass laptop/phone mockups rendered in code
- Updated calculator with service/add-on pricing and Care/Care Plus
- WhatsApp: 055-282-3660 / +972552823660
- Telegram: @tss_tish
- Privacy / Terms / Accessibility pages
- Keyboard focus styles, skip-link, Escape/focus trap for drawer, reduced-motion support
- SEO metadata for service routes

## Before production deploy
1. Buy/confirm the NeXora domain.
2. Create `hello@YOUR-DOMAIN` and set it in `src/data/site.ts` (`email`).
3. Once the final public domain is known, add absolute `metadataBase`, canonical domain and `sitemap.ts`.
4. Confirm legal business details (registered business/entity name and invoicing model). The legal pages intentionally do not invent these details.
5. Run final browser accessibility test after deploy: keyboard, focus, 200% zoom, 320px reflow, contrast, Safari/Chrome, VoiceOver/NVDA where possible.
6. If Google Analytics/Meta Pixel/cookies are added, update Privacy Policy and implement the consent/notice flow required for the actual tracking setup.
7. Review Terms/Privacy with an Israeli lawyer if they will be relied on as legal documents for commercial transactions.

## Portfolio
The project data structure is still easy to expand. Brand identity cases can be added as a separate visual case type later without changing the service/pricing architecture.
