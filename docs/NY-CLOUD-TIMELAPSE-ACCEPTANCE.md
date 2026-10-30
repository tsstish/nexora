# NeXora | New York cloud timelapse — development brief and acceptance
Status: Implemented prototype v3, subject to Safari visual acceptance.
Branch: `feature/city-atmospheres`. Never merge into the approved production release until accepted.

## Objective
Add small, realistic, clearly moving clouds to the existing four aligned New York hero images without introducing architectural artifacts, repeating seams, large dark blotches, sudden resets, or page-performance problems. Keep NeXora's actual text, common framing, typography, links and all four browser-local lighting modes untouched.

## Starting problem — confirmed from screenshot
- The old cloud sprite was stretched across 170% of the viewport. Its sparse alpha gradients became huge cloud silhouettes.
- It produced a false impression of buildings casting dark moving shadows into the sky.
- Repeating cloud patterns / edges and alternating left-right travel looked artificial.
- The cloud movement was difficult to perceive on brighter frames.

## Visual contract
1. Exactly three small, independent, *light-coloured* cloudlet groups using existing `cloud-wisps.webp`. No full-width cloud overlay.
2. Confine the clouds strictly to the sky with aligned `sky-mask.png` (both desktop and mobile). Empire State Building, foreground tower and horizon must stay fixed, unaltered and fully unobscured.
3. Use `mix-blend-mode: screen` and a white transparent source: animated clouds can only brighten, never create fake black shadows.
4. Feather each sprite's boundaries with a radial alpha gradient. Never tile or use `repeat-x`. Crops and sprite edges may not be visible as rectangles.
5. All clouds move continuously **left to right**, not back and forth, with independent travel times 31, 34 and 43 seconds. Individual average travel speeds approximately 10–12 CSS pixels/second on desktop. Motion should be perceptible within ~3–5 seconds, not frantic.
6. Fade each group in after travel starts, remain visible during the middle, fade fully out before resetting its translation. Stagger animation phases so a cloud remains available while others reset.
7. Default daytime visibility is the strongest; morning slightly reduced; sunset moderate; night more subtle. Never transform a day sky into storm clouds.
8. Keep the existing four real photographic lighting states and browser-local time ranges exactly as approved: 05:00–10:30, 10:30–16:30, 16:30–19:30, 19:30–05:00. The laboratory manual switch is for testing only.
9. Use composited CSS transforms on a few small sprites; no full-page video, continuous canvas drawing or high-frequency JS timers for clouds.
10. Respect `prefers-reduced-motion: reduce`: stop movement and retain a modest static cloud view.

## Implementation
- Component: `src/app/building-preview/CityBackdrop.tsx`, three `styles.cloud` children inside `styles.cloudMask`.
- Styling: `CityBackdrop.module.css`. Use existing pixel-aligned mask; original photo positions are unchanged.
- Existing assets: `public/cities/new-york/sky-mask.png`, `cloud-wisps.webp`, and the four approved `new-york-{morning,day,sunset,night}.webp` files. No new assets required.
- Unrelated pages or approved release branches remain unchanged.

## QA / acceptance (must be performed in real browser)
- **Safari desktop**: switch through all four times on `/building-preview/atmospheres`; watch each for at least 15 seconds and examine an entire cloud pass (~45 seconds). Cloud groups visibly travel one way, no visible repeat boundary or abrupt reversal, no dark building shadow on sky.
- **Safari 390px/430px mobile simulation**: sky mask aligns with building silhouettes; the sprites are small and readable, not stretched, headline stays clear; no horizontal overflow.
- **Chrome desktop**: confirm CSS mask, moving groups and reduced-motion behavior; no rendering seams.
- **Navigation**: visit home, pricing, contacts, all four Ready routes — photo selection and phase remain consistent; hero content stays unchanged.
- **Accessibility/performance**: `aria-hidden` scene, reduced motion disables animation; image cache working; monitor mobile smoothness.
- If the old photographic sprite still looks artificial at this smaller scale, replace its artwork after visual approval; **do not** compensate by reintroducing giant cloud layers or opacity-heavy filters.

## Release gate
Visual QA in Safari is not performed by GitHub static inspection or a successful Vercel build. Do not label the effect polished/production-ready until the user has visually accepted the updated city scene in both day and night.
