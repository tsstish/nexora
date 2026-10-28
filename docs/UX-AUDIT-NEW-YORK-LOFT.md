# NeXora — New York Loft | UX / art direction audit

Audit date: 28 October 2026. Scope: `/building-preview` and its pricing, contacts, Ready concept and document routes. This is a *design branch*, not the published site.

## Principles

1. One signature urban view, three time-of-day light treatments: morning / day / sunset.
2. Same cropping, spatial scale and framing; do not build different photographic compositions per route.
3. One transparent-surface system (`--nx-glass-fill`, `--nx-glass-border`, `--nx-glass-blur`) and one CTA system (`nx-action`).
4. Use *one* restrained brand coral `#FF735F` marker for the active Ready concept; avoid synthetic glows and unrelated accent palettes.
5. Evidence comes first: real original demos and eventually genuine screenshot assets, not mock laptops or invented site previews.
6. Use details/accordions for optional contractual information, not for the essential price or the core proposal.
7. Keep source-of-truth for ILS prices in `src/data`; USD/RUB draft proposal remains explicitly unapproved.
8. Maintain keyboard focus, visible selected state and reduced-motion fallback.

## Implemented changes

- Added `CityBackdrop.tsx` and `CityBackdrop.module.css`: one source photo; fixed 790px desktop/730px mobile photo geometry; shared 50% x / 43% y image position; variant-only color grade.
- Applied the same skyline composition to home, pricing, contacts and morning Ready detail pages.
- Suppressed independent background images on the three top-level pages.
- Added `StudioSystem.css` to the shared preview layout, with common transparency, border and button tokens.
- Normalized primary/secondary actions across header, site showcases, contact CTA, pricing CTA, Ready detail and footer.
- Enlarged mobile interaction targets for the nav CTA and currency selector; enlarged gallery arrows.
- Introduced a restrained coral mark on selected Ready tab (the main vivid accent), kept original logo and warm/green system.
- Removed obsolete, unused home prototype CSS rules to reduce stylesheet conflicts and maintenance risk.
- Preserved distinct *material* treatments on pricing below hero, rather than repeating the same photo in every section.

## Remaining checks before launch

**Required browser QA:** widths 320, 375/390, 768, 1024, 1440 and >1600px. Compare skyline alignment at the same width, including spire vertical position. Check overflow with long RUB amounts and zoom at 200%. Verify Safari and Chrome, touch, keyboard navigation, contrast against photographs, and reduced motion. No browser runtime/production build was available in this environment.

**Product proof:** the embedded live iframe is useful for exploring a demo but visually weak at small widths. Replace the primary selling image with *real authored screenshots* from MIDA, LEA NORD, FACET and MEDIA KIT, selected for beauty and accuracy; offer the iframe as secondary exploration. Do not fabricate screenshots.

**Reliability/performance:** master skyline currently references an external Unsplash URL. Before production, license/verify and store an optimized responsive image locally (`public/`) with a reliable fallback; otherwise network changes can break the entire experience. Optimize hero loading and monitor Core Web Vitals.

**Commercial/legal:** verify final terms, currencies (USD/RUB proposals are not approved), CTA destinations, privacy and accessibility copy. Preview routes remain `noindex`; production canonical URLs and sitemap should be set only when the actual pages replace old routes.

## External UX/design references consulted

- Figma 2026 visual direction: https://www.figma.com/resource-library/web-design-trends/
- Squarespace Circle 2026 editorial/material and motion narratives: https://pros.squarespace.com/blog/design-trends
- Baymard Institute product list visuals: https://baymard.com/research-articles/secondary-hover-information
- W3C WCAG 2.2 contrast, focus and target size: https://www.w3.org/TR/WCAG22/
