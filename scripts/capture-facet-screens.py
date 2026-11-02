"""Capture the six original FACET demo views without image editing.

Screens are captured from the live FACET site at the desktop/mobile
viewports shown in the approved design. No filters, compositing, cropping,
color correction or generative alterations are performed. Only screenshots.
"""
from pathlib import Path
from playwright.sync_api import sync_playwright

DEST=Path("public/ready/showcase")
DEST.mkdir(parents=True, exist_ok=True)
BASE="https://facet.nexoradesign.online"

SHOTS=(
    ("facet-desktop-home.png",1600,900,1,False,None),
    ("facet-desktop-gallery.png",1600,1000,1,False,"Примеры оформления бровей"),
    ("facet-desktop-about.png",1600,900,1,False,"Как я работаю"),
    ("facet-mobile-home.png",390,890,1.6,True,None),
    ("facet-mobile-gallery.png",390,890,1.6,True,"Примеры оформления бровей"),
    ("facet-mobile-about.png",390,890,1.6,True,"Как я работаю"),
)

with sync_playwright() as playwright:
    browser=playwright.chromium.launch()
    for filename,width,height,dpr,is_mobile,heading in SHOTS:
        ctx=browser.new_context(
            viewport={"width":width,"height":height},
            device_scale_factor=dpr,
            is_mobile=is_mobile,has_touch=is_mobile,
            locale="ru-RU",
        )
        page=ctx.new_page()
        response=page.goto(BASE,wait_until="networkidle",timeout=60000)
        if response is None or response.status>=400:
            raise RuntimeError(f"FACET screenshot failed: {filename}, HTTP {response.status if response else 'none'}")
        page.evaluate("document.fonts.ready")
        if heading:
            element=page.get_by_text(heading,exact=False).first
            element.wait_for(timeout=15000)
            position=element.evaluate("(el) => el.getBoundingClientRect().top + window.scrollY")
            page.evaluate("(y) => window.scrollTo({top:Math.max(0,y-90),behavior:'instant'})",position)
        else:
            page.evaluate("window.scrollTo(0,0)")
        page.wait_for_timeout(700)
        page.screenshot(path=str(DEST/filename),full_page=False,animations="disabled")
        print(filename,(DEST/filename).stat().st_size)
        ctx.close()
    browser.close()
