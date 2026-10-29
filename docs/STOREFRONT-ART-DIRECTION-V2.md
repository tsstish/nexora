# NeXora — Product storytelling and storefront architecture v2
Date: 2026-10-29. Branch: `design/new-york-loft`.
Status: PROPOSAL ONLY. Do not apply to runtime without visually reviewing the design.
Evidence: source-of-truth `src/data/readySites.ts` plus actual project repositories `tsstish/mida-dental-concept`, `tsstish/lea-nord-ready`, `tsstish/facet-ready`, `tsstish/nexora-ready-media-kit`.

## The core mistake
Today the storefront treats the vertical ("for clinics", "for teachers") as the product identity, duplicates those vertical labels in the hero, concept tabs, panels and pricing, and gives the same deep-green backdrop to almost everything. The mobile version nests a live iframe inside a small card. On desktop both the product screenshot and the product's customer value have insufficient prominence.

The user expects a commercial selection interface for 20+ future products, which won't fit an industry-only navigation. One industry can have multiple distinct concepts, and a product may support several verticals with reasonable rebranding.

## Editorial positioning: choose a way to present a business
The heading is a concrete commercial promise; the DEMO NAME is only a small source label, not the product name the user must memorize.

| Demo | Product promise / proposed main headline | What actually supports that claim | Editorial fit and limitations |
| --- | --- | --- | --- |
| MIDA | «Сложные услуги — понятно и убедительно» | Several pages, procedure prices, treatment plan, doctor/team profiles, before/after with context, inquiry actions, RU/HE and RTL | Demonstrated with dentistry. Similar service businesses may adapt this structure, but specialty-dependent content and modules require separate evaluation. Do NOT universally claim it fits all clinics without change |
| LEA NORD | «Когда выбирают человека, а не компанию» | Personal introduction, teaching approach, format of lessons, FAQ, enquiry/booking path, RU/HE/RTL | Works especially for an individually known specialist or independent teacher; personal trust is the underlying pattern |
| FACET | «Сначала покажите работу. Потом предложите запись» | Editorial services and prices, asymmetrical portfolio gallery, specialist introduction, booking / WhatsApp flows | Compact visual service experience; current demo is brow / lash, not an all-purpose e-commerce |
| MEDIA KIT | «Покажите, почему с вами стоит работать» | Audience/statistics, portfolio and vertical video, collaboration case studies, brand and agency modes, advertising brief | Specifically content creators / media partnerships. May need different logic for different professional use cases |

## New IA — Home/ready collection

1. **Signature city hero**: keep the single NeXora skyline and branded logo (visual continuity); short, direct offer, one proof line on adaptation; no 3-step infographic, second duplicate story, or dark catalog-in-a-dark-card.
2. **Paper storefront**: warm ivory / architectural paper surface visually distinct from the atmospheric hero. Intro «Выберите, что должен делать ваш сайт» followed by short options named by effect/presentation style, not professions.
3. **Desktop storefront**: four concise editorial selector rows on left with numbers and punchy titles. Right is ONE large original demo image or reliable screenshot, with minimal chrome; clear name “демонстрация MIDA” as attribution only. Adjacent compact proof: 2 key mechanisms, who it might suit, subscription/purchase prices, “Демо” and “Условия”. Do not fill the first screen with nested dark and gold borders.
4. **Mobile storefront**: one horizontally scrollable, explicitly labeled mini-selector or two-by-two editorial choices at 4 products; a **large product screenshot** below; one 2-line proof description, 2 prices, CTA. No embedded interactive iframe in the primary small mobile card. Open demo in a separate tab or secondary view. Avoid four screens of explanatory text.
5. **Future 20+**: no endless 20-card carousel; show curated first group and full browse with tags by *business goal* and optional vertical, language, size. Filters only after count warrants. Names and industry are searchable metadata, not primary navigation.
6. **Ready product detail**: lead with the actual product result and real screenshots, then scope, pricing modes, what's modifiable; raw feature list under expandable details.

## New IA — Pricing

Pricing is **not another portfolio**. It answers three questions: What are my choices? What will I pay? What's included?
- Hero = 1 short sentence + three price-path options; skyline only in header scene.
- Light main section: subscription / purchase / custom with a focused comparison, no large green blocks duplicated for each.
- Keep actual `src/data` prices and conditions as source of truth. Present subscription as a payment METHOD applied to chosen Ready concept; distinguish purchase and custom work clearly. Never imply 3 subscription plans choose the whole design alone.
- Later services grouped into optional enhancements, with accordion per group; Care/Care Plus separate after launch, not part of main purchase journey.
- One ending CTA: «Помочь выбрать формат» linked to existing contact brief, no overlay button.
- Desktop and mobile share content and model, with distinctly composed layout; do not have hidden duplicate data-driven pages whose text can drift.

## Art direction
- City image only for top brand scene; shared exact crop as already built for home/pricing/contacts; different time of day remains.
- Main product exploration = **warm, light surface** with dark green typography and generous image breathing space.
- Keep original logo and its 3 dots. Accent only in selected selector item, and intentionally in CTA. Not green/gold outlines around everything.
- One outstanding visual per product = real full screenshot, NOT mock laptop, tablet, generated filler, tiny clipped iframes, or unreadable embedded desktop UI.
- The rest: image-led, editorial typesetting, dividers used to group content. Repeated glass overlays prohibited.
- Motion: subtle selected-item transition and image crossfade; no auto-advancing carousel or scroll-jacking. Reduced-motion support.

## CTA copy, navigation and content
- Main hero possible: «Готовые сайты. Ваш бизнес — внутри» / or keep «Готовые сайты для реального бизнеса» with shorter, meaningful support; final copy to approve alongside visual.
- Catalog heading «Выберите, как представить ваш бизнес» is a starting hypothesis. Avoid abstract buzzwords without proof.
- Make explicit that demo names, stats, visuals, fictitious reviews/medical results are demonstrative, never actual clients.
- "Работающий демо-сайт" direct action, not "посмотреть макет". Adaptation wording must respect the chosen concept scope.
- Do not conflate Ready Monthly, one-time purchase, custom development, and ongoing maintenance.
- Keep EUR/USD/RUB public prices only when approved. Use current trusted ILS source.

## Current constraints
User has not pulled most recent mobile branch. Do not ask them to update until a new storefront design is presented and independently evaluated. Draft on a separate route or visual prototype before replacing the working page. Verify mobile Safari, 320/375/390/768 widths, 200% zoom, screenshots and demo in full, currency changes and reduced motion.

## Research used
Figma 2026 design trends: https://www.figma.com/resource-library/web-design-trends/
Baymard product media: https://baymard.com/research-articles/product-images-descriptive-text
Baymard multiple product images: https://baymard.com/research-articles/secondary-hover-information
Netguru trend tradeoffs: https://www.netguru.com/blog/modern-web-design-trends


## Product-story preview created (2026-10-29)
The 4 product narratives are stored in `src/data/readyStories.ts`. These do NOT replace the existing Ready detail pages.

Standalone routes for review:
- `/building-preview/ready/dental-clinic/story`
- `/building-preview/ready/private-teacher/story`
- `/building-preview/ready/brow-artist/story`
- `/building-preview/ready/media-kit/story`

Story architecture: emotional commercial headline → real live demo on desktop and full demo link on mobile → concrete service problem → three specific, feature-backed reasons → visitor path (explicitly not a performance guarantee) → rebranding/adaptation scope → clearly sourced subscription & purchase prices → expandable legal details. Light editorial content and a green pricing footer distinguish it from the dark old product detail.

Scope and honesty:
- Demo sites are fictional illustrative brand presentations, never client portfolios. Real outcomes and endorsements are not fabricated.
- Current live iframe depends on browser embed permission and third-party demo availability; it is NOT an authored image. For release, replace the main product media with original full-width screenshots and link to the live demo as secondary proof. Small iframe is intentionally suppressed on mobile.
- The current storefront and original `/ready/[slug]` details are intentionally untouched until visual sign-off.
- Before release: check `npm run build`, Safari/Chrome responsive layouts and keyboard, currency exchange display, route navigation, demo iframe fallback and source content/legal scope.
