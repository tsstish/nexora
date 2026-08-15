# NeXora Final V5

Final-candidate refinement focused on mobile alignment, pricing structure and realistic custom Next.js positioning.

# NeXora Final Candidate V3

Clean rebuild from the approved mockup and Final V2 base.

## V3 changes
- Hero 3D process asset enlarged to dominate ~90% of the desktop hero width and overlap behind the headline.
- All explanatory labels removed from the hero artwork.
- Mobile service links fixed so “Подробнее” stays attached to its service.
- Portfolio laptop and phone remain live iframe previews, with lighter optical-glass device shells.
- CTA glass stone removed and replaced by a CSS-rendered glass droplet.
- Pricing re-composed: explanatory note + real 3D glass stone on the left, price accordion on the right.
- Calculator keeps only the glass calculator asset, enlarged with stronger realistic shadow.
- Page resets to the top on initial load.

Run: `npm install && npm run dev`.

## V10: SEO / social preview / analytics

Перед production deploy скопируйте `.env.example` в `.env.local` для локальной проверки или задайте значения через Vercel Environment Variables.

- `NEXT_PUBLIC_SITE_URL` — production URL без завершающего `/`
- `NEXT_PUBLIC_GA_ID` — optional GA4 ID
- `NEXT_PUBLIC_META_PIXEL_ID` — optional Meta Pixel ID

Подробный финальный список: `PREDEPLOY.md`.
