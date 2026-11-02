"""Generate factual, uncropped PNG screens of the approved live MIDA demo.

No retouching, filters, overlays or compositing. A screenshot is taken directly
from the live website at fixed display dimensions. Keep original designs intact.
"""
from pathlib import Path
from playwright.sync_api import sync_playwright

DEST = Path("public/ready/showcase")
DEST.mkdir(parents=True, exist_ok=True)
BASE = "https://mida.nexoradesign.online"
SCREENS = (
    ("mida-desktop-home.png", "/", 2048, 1240, 1, False),
    ("mida-desktop-services.png", "/procedures", 2048, 1230, 1, False),
    ("mida-desktop-process.png", "/transformation", 2048, 1215, 1, False),
    ("mida-mobile-process.png", "/transformation", 390, 880, 1.6, True),
    ("mida-mobile-home.png", "/", 390, 880, 1.6, True),
    ("mida-mobile-clinic.png", "/clinic", 390, 880, 1.6, True),
)

with sync_playwright() as playwright:
    browser = playwright.chromium.launch()
    for filename, route, width, height, scale, is_mobile in SCREENS:
        context = browser.new_context(
            viewport={"width": width, "height": height},
            device_scale_factor=scale,
            is_mobile=is_mobile,
            has_touch=is_mobile,
            locale="ru-RU",
        )
        page = context.new_page()
        response = page.goto(BASE + route, wait_until="networkidle", timeout=60000)
        if response is None or response.status >= 400:
            raise RuntimeError(f"Cannot capture {BASE + route}: HTTP {response.status if response else 'N/A'}")
        page.evaluate("document.fonts.ready")
        page.wait_for_timeout(500)
        page.screenshot(path=str(DEST / filename), animations="disabled", full_page=False)
        print(f"Captured {filename}: {(DEST / filename).stat().st_size} bytes")
        context.close()
    browser.close()
