# NeXora — single-photo city-atmosphere direction (29 October 2026)

**Status:** new design direction for approval. Do NOT ship the previous cross-angle day/night demo. No imagery has yet been retouched, sky-masked or visually QA'd.

## Core choice

The user's target is analogous to Apple Watch Timelapse: the same real buildings stay aligned while daylight changes. A previous proof-of-concept switched between unrelated camera angles, so it **does not** meet this requirement. Do not consider that experiment an acceptable visual release.

A high-quality free-asset alternative:
1. Choose one high-resolution, commercially reusable photograph per approved city. Keep it as the immutable master photograph.
2. Make an accurate, pixel-aligned segmentation of foreground architecture vs sky. Store a sky mask per desktop/mobile crop, or use image-aligned masks with CSS object-position.
3. Create artistic day states from this same photo:
   * morning: pale cooler sky, warm directional highlight, careful shadows;
   * day: lightly retouched original;
   * sunset: peach/amber sky, cooler architecture, subtle horizon haze;
   * night: a separately composited artwork with believable sky replacement, *selective* lit windows and reflection/glow masks. Never claim a CSS brightness filter is a realistic night photograph.
4. A few near-transparent clouds drift very slowly **behind the buildings**, clipped by the sky mask. Avoid obvious repeated cloud shapes. Disable on prefers-reduced-motion; stop work while tab is not visible.
5. At runtime select city once per tab/session, persist in sessionStorage and keep it through all routes. Phase comes from local browser clock; blend between already authored state layers. Exact sunrise/sunset requires location data; by default use fixed hour buckets and describe them as illustrative.
6. Produce responsive export sizes in AVIF/WebP; maintain the same landmark framing and text contrast for each of the 4 moods.

**Never:** use an image generator on each hour independently and assume the architecture stays identical; indiscriminately darken all pixels; put moving clouds over a skyscraper; use paid stock; fetch all 7 cities × 4 times on first page view.

## Curated FREE photo candidate links — editorial short-list (NOT yet approved)

All entries below surfaced as free downloads under the Unsplash License. These pages, not search thumbnails, are the authoritative provenance:
- New York — https://unsplash.com/photos/city-skyline-under-blue-sky-during-daytime-ZLjNi2x0ots
- Tokyo — https://unsplash.com/photos/city-skyline-under-blue-sky-during-daytime-x9IGq7q5A04
- Chicago — https://unsplash.com/photos/chicagos-skyscrapers-rise-above-the-river-Ruc82YWv_YQ
- London — https://unsplash.com/photos/aerial-photography-of-city-buildings-during-daytime-T6VTsM4_fGU
- Paris — https://unsplash.com/photos/expansive-view-of-dense-european-city-rooftops-under-daylight-MTaGcBTXkBo
- Shanghai — https://unsplash.com/photos/shanghai-skyline-on-a-cloudy-day-0p37Ch2LYQc
- Hong Kong — https://unsplash.com/photos/city-skyline-under-white-clouds-and-blue-sky-during-daytime-DcexwOy8n8M

Source license: https://unsplash.com/license (permitted free commercial use and modification, subject to limits/third-party rights).

These are candidates for **composition testing**, not a claim that all are technically adequate; reject photographs with insufficient sky for cloud effects, poor light/focal separation, or unusable vertical crops. Prioritize the existing New York composition as a continuity baseline.

## Recommended professional workflow

Do not produce a 7-city launch from untested assets. Start with one mature master — existing New York scene — and produce all four mood states, including a hand-composited night mask and very subtle clouds. Compare the master and variants at 390, 768, and 1440 px using the actual NeXora hero typography. Require a desktop/mobile visual review before extending to Tokyo and Chicago. Then scale to 5–7 cities only if the quality and workload are sustainable.

## Explicit limitation

This is capable of producing an atmospheric, polished architectural illustration based on real photographs. It will not be a physically faithful sun-tracking timelapse: sunlight direction and original building shadows cannot be fully reconstructed from one still, and the night windows must be artistically created. A truly photographic 24-hour sequence with exact changing cast shadows still requires locked-camera time-lapse footage.

## QA
- All 4 states are visually DISTINCT; day and night aren't just brightness changes.
- No jumping skyline, double clouds, cloud overlay in front of buildings, banding in sky gradients or muddy window highlights.
- Text shadows legible without a rectangular hero scrim.
- Crop and focal landmarks consistent on mobile and desktop.
- One city consistent across site and reload, time phase updates correctly.
- Reference authors/licensing recorded, artwork exports optimized, restrained animations and battery safeguards.
