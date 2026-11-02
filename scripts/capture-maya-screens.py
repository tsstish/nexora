"""Capture the MAYA—LAVI demo directly for the fourth NeXora showroom concept.

The screenshot content is not retouched, filtered, reframed or otherwise edited.
The live demo is captured at the existing gallery's standard desktop and mobile
browser viewport sizes.
"""
from pathlib import Path
from playwright.sync_api import sync_playwright

DEST = Path("public/ready/showcase")
DEST.mkdir(parents=True, exist_ok=True)
BASE = "https://media-kit.nexoradesign.online"

# filename, width, height, DPR, mobile, heading anchors, offset above anchor
SHOTS = (
    ("maya-desktop-home.png", 1600, 900, 1, False, (), 0),
    ("maya-desktop-audience.png", 1600, 900, 1, False, ("Мои подписчики", "ЯДРО АУДИТОРИИ", "АУДИТОРИЯ"), 110),
    ("maya-desktop-cases.png", 1600, 900, 1, False, ("Не просто красиво", "С результатом", "LUMA SKIN"), 100),
    ("maya-mobile-home.png", 390, 890, 1.6, True, (), 0),
    ("maya-mobile-audience.png", 390, 890, 1.6, True, ("126.4K", "126,4K", "НЕПОДПИСЧИКИ В ОХВАТЕ"), 140),
    ("maya-mobile-cases.png", 390, 890, 1.6, True, ("LUMA SKIN", "LUMA", "СМОТРЕТЬ КЕЙС"), 250),
)

with sync_playwright() as playwright:
    browser = playwright.chromium.launch()
    for filename, width, height, dpr, mobile, anchors, offset in SHOTS:
        context = browser.new_context(
            viewport={"width": width, "height": height},
            device_scale_factor=dpr,
            is_mobile=mobile, has_touch=mobile, locale="ru-RU",
            color_scheme="dark",
        )
        page = context.new_page()
        response = page.goto(BASE, wait_until="networkidle", timeout=60000)
        if not response or response.status >= 400:
            raise RuntimeError(f"{filename}: demo unavailable: HTTP {response.status if response else 'none'}")
        page.evaluate("document.fonts.ready")
        y = 0
        if anchors:
            found = None
            for anchor in anchors:
                matches = page.get_by_text(anchor, exact=False)
                if matches.count():
                    for index in range(min(matches.count(), 10)):
                        element = matches.nth(index)
                        if element.is_visible():
                            found = element
                            break
                if found:
                    break
            if found is None:
                raise RuntimeError(f"{filename}: expected section text not found; check the original live demo headings")
            y = found.evaluate("(el) => el.getBoundingClientRect().top + scrollY")
        page.evaluate("(y) => window.scrollTo({top: Math.max(0,y),behavior:'instant'})", max(0, y-offset))
        page.wait_for_timeout(850)
        page.screenshot(path=str(DEST / filename), full_page=False, animations="disabled")
        print(f"{filename}: {(DEST / filename).stat().st_size} bytes, scroll={max(0,y-offset):.1f}", flush=True)
        context.close()
    browser.close()
