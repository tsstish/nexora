# NeXora — rotating city, visitor-local daylight / implementation proposal
Date: 29 October 2026
Status: SPEC ONLY; not enabled in the website. Visual assets and city selection to be approved before coding.

## Intent
The same visitor sees one architecturally coherent city on **every** NeXora preview route, from first landing to Ready, pricing and contacts. Another visitor can be assigned another approved city. Light treatment follows the viewer's local clock, not the route. Switching pages must not restart selection or flicker.

## The recommended implementation
- Put a single client-side `CityAtmosphereProvider` inside `src/app/building-preview/layout.tsx`, wrapping all pages and `CityBackdrop` components.
- First load: select a city from an **approved** list of equal-quality photo sets. Store the ID in `sessionStorage` under a versioned key; don't reroll on navigation, reload or Back button. Closing the tab ends the selection. (New tabs generally make a new session, with browser opener exceptions.) Use `localStorage` only if repeat visits should keep the last city instead.
- Visitor local time: obtain `new Date().getHours()` in the browser, no geolocation permission, IP lookups or external time API. First cut phases: morning 05–10, day 10–17, golden hour 17–20, night 20–05. These are visual clock bands and **do not pretend to calculate actual sunrise or sunset**. Recheck on visibility changes or low-frequency interval if a tab remains open.
- Keep **the exact same selected city** throughout every page. A city change across pages would destroy the continuity requested.
- `CityBackdrop` should no longer receive hard-coded morning/day/sunset times from individual route pages. It should consume the common provider. Keep existing New York image as a fallback until all variants are approved.
- Browser-only state must be read after hydration (Client Component); avoid mismatched HTML and a first-paint New York→Tokyo flash with a neutral staged background and soft first-ready transition. Cookies+SSR could eliminate initial uncertainty but would add complexity / dynamic rendering. Evaluate after image QA.

## Visual acceptance — non-negotiable
- Start with 2–3 curated cities, e.g. New York, Tokyo and a third chosen by design. **Do not upload arbitrary stock thumbnails.**
- For credible night/morning, obtain genuine photos with controlled rights and matching stylistic quality. A CSS darkening filter cannot create illuminated windows from a daylight cityscape. Daylight photographs, sunset shots and night scenes should belong to the same city and fit the same architectural framing.
- Hero across home / pricing / contacts / all 4 Ready products must preserve shared `--nx-city-stage-height`, crop behavior, header baseline and text contrast. Make separate desktop/mobile focal positions per city to protect key landmarks and overlay typography.
- No rectangular tint behind the hero title; use a subtle gradient and clean multidirectional text shadow.
- Prefer AVIF/WebP in `public/city/`, responsive source sizes, preload only the selected primary hero, cache images and respect `prefers-reduced-motion`.
- Night phase should feel atmospheric and readable, not pitch black. Avoid drastic flash during route transitions.

## QA before enabling
- Safari iPhone 320/375/390/430, tablet 768/1024, desktop 1280/1440/1920; check no landmark or text clipping and no hero/section overlap.
- Open home→pricing→Ready→contacts→back: city stays identical. Reload in same tab: stays identical. Open a fresh tab: fresh pick, except browser opener-copy edge case.
- Browser with denied storage: graceful safe fallback to New York. A browser without JS: baseline branded hero photo still works.
- Time zones: confirm local clock phases on client without location permission. Do not store location. Check reduced motion, Safari image decoding and bandwidth.
- Manual QA for every city × lighting × breakpoint. Current static city photo alone is not sufficient to release this feature.

## Sequencing
1. Current phase: fix hero layout and header WhatsApp on existing New York art direction.
2. Choose a small set of exact photo assets with licensing/permission and an approved mobile focal crop.
3. Implement provider+assets behind a feature flag, compare on MIDA home/pricing/contacts.
4. Enable across remaining pages only after visual QA.

Sources: MDN sessionStorage, MDN Date.getHours, Next.js App Router Client Components.


## First approved-candidate shortlist (research, not asset approval)

1. **New York — existing default:** vertical skyline and familiar spire; keep original existing photo and its current crop as fallback. Best: morning / golden hour.
2. **Tokyo — Marunouchi/Tokyo Station or layered skyline:** premium contrast of historic red brick, glass towers and warm architectural lights. Avoid cheap tourist neon / giant readable advertisements. Best: blue hour and night. Photography research: https://unsplash.com/photos/a-view-of-a-city-at-night-with-tall-buildings-ywIGo_5c7O4 and https://unsplash.com/photos/illuminated-historic-building-surrounded-by-modern-skyscrapers-at-night-jFV2EMJl5Hg
3. **Chicago — Chicago River / Loop bridges:** warm window lighting, textured stone and steel, reflective water. Best: blue hour/sunset. Research: https://unsplash.com/photos/a-view-of-a-city-at-night-from-a-river-hTxtGBUqfJU and https://unsplash.com/photos/a-view-of-a-city-from-a-bridge-nsAn3nSW5T0
4. **Paris — Haussmann rooftops (optional alternate to Chicago):** warm historic façades; visual tone softer than NY/Tokyo. Good for golden hour, but harder to create a distinctive night scene in the same framing. Research: https://unsplash.com/photos/paris-rooftops-and-buildings-at-twilight-l5XSqzQgaK0 and https://unsplash.com/photos/aerial-view-of-paris-with-arc-de-triomphe-ZtRU5xSkknw
5. **Hong Kong — Victoria Harbour (future experiment):** dramatic night skyline, but signage and busy illuminated windows can harm reading contrast and become generic tourist scenery. Do not start with it unless crop works.

Shortlist **recommendation: NY + Tokyo + Chicago**, not yet final photograph selections. Preserve locations as editorial city identities, not geographically accurate weather/sunrise views.

### Image sourcing & licensing
- Use licensed original photos from Unsplash/Pexels or paid architectural photographers; retain source photo URL, author, retrieval date and license in `public/city/CREDITS.md`.
- Pexels license: https://www.pexels.com/license/; Unsplash license: https://unsplash.com/license.
- No Getty/iStock/watermarked previews in the build without an appropriate paid license.
- Each candidate must pass 2 compositions: desktop wide (around 16:9 and up) and portrait 390px mobile without cropping critical buildings/text. At least one genuinely lit dusk/night photo is needed.
- Creative accept criteria: left-side negative space for white heading, sky and architecture balance, lights readable, texture sharp at 200% zoom, no obvious logos. Test selected scenes under the shared shadow typography.

### A/B design decision
The current NeXora effect is a single photo plus CSS brightness/saturation overlays. For the final premium version, **prefer 2 genuine photo captures per city (day and illuminated blue-hour/night)**, then apply modest colour temperature overlays for morning and golden-hour transitions. Four independent photos per city without matching viewpoints would make buildings jump whenever local time changes. A truly identical framing across day and night requires photographer-provided matched captures or a carefully constructed composite; do not claim it is automatic.

### Visitor clock accuracy
On the client `new Date().getHours()` uses the visitor's device time zone without geolocation. Fixed time windows are a design convention; they do **not** reflect actual sunrise/sunset or current weather. To match astronomical dawn/dusk requires additional location context or permission; do not collect exact coordinates by default.
