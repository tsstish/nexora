"""Capture unedited LEA NORD demonstration screens at the approved viewports.

Screenshots are direct browser captures of the original live demo. No color
changes, filters, compositing, retouching or cropping. The website's own design
remains untouched. Destination filenames are consumed by ReadyShowcase.
"""
from pathlib import Path
import re
from playwright.sync_api import sync_playwright

BASE = "https://music-ready.nexoradesign.online/ru"
DEST = Path("public/ready/showcase")
DEST.mkdir(parents=True, exist_ok=True)
SHOTS = (
    ("lea-desktop-home.png", 1600, 900, 1, False, None),
    ("lea-desktop-students.png", 1600, 900, 1, False, "У каждой точки старта"),
    ("lea-desktop-atmosphere.png", 1600, 900, 1, False, "Играть увереннее"),
    ("lea-mobile-home.png", 390, 890, 1.6, True, None),
    ("lea-mobile-benefits.png", 390, 890, 1.6, True, "Почему ученики любят занятия"),
    ("lea-mobile-lessons.png", 390, 890, 1.6, True, "Как проходят занятия"),
)

with sync_playwright() as playwright:
    browser = playwright.chromium.launch()
    for file_name, width, height, dpr, mobile, heading in SHOTS:
        ctx = browser.new_context(
            viewport={"width": width, "height": height},
            device_scale_factor=dpr,
            is_mobile=mobile,
            has_touch=mobile,
            locale="ru-RU",
            color_scheme="light",
        )
        page = ctx.new_page()
        result = page.goto(BASE, wait_until="networkidle", timeout=60000)
        if not result or result.status >= 400:
            raise RuntimeError(f"LEA NORD {file_name}: demo page failed to load")
        page.evaluate("document.fonts.ready")
        if heading:
            candidate = page.get_by_role("heading", name=re.compile(re.escape(heading), re.I)).first
            candidate.wait_for(timeout=12000)
            y = candidate.evaluate("(e) => e.getBoundingClientRect().top + window.scrollY")
            page.evaluate("(y) => window.scrollTo({top: Math.max(0, y - (innerWidth <= 700 ? 90 : 55)), behavior: 'instant'})", y)
        else:
            page.evaluate("window.scrollTo(0, 0)")
        page.wait_for_timeout(650)
        page.screenshot(path=str(DEST / file_name), full_page=False, animations="disabled")
        print(f"Captured {file_name}: {(DEST / file_name).stat().st_size} bytes")
        ctx.close()
    browser.close()
