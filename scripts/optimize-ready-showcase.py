"""Prepare fast screenshot delivery for NeXora Ready collection.

Original PNG screenshots remain untouched and are retained for full-screen zoom.
For cards, generate source-faithful display/thumbnail WebP representations:
only proportional scaling and encoding, no cropping or image content edits.
"""
from pathlib import Path
from PIL import Image

ROOT = Path("public/ready/showcase")
assert ROOT.is_dir(), "Expected original Ready screenshots in repository"

produced = 0
original_bytes = 0
optimized_bytes = 0

for original in sorted(ROOT.glob("*.png")):
    if not original.stem.startswith(("mida-", "facet-", "lea-", "maya-")):
        continue
    source_size = original.stat().st_size
    with Image.open(original) as im:
        if im.mode not in ("RGB", "RGBA"):
            im = im.convert("RGBA" if "A" in im.getbands() else "RGB")
        kind = "mobile" if "-mobile-" in original.stem else "desktop"
        for variant, width in (
            ("preview", 560 if kind == "mobile" else 1140),
            ("thumb", 180 if kind == "mobile" else 280),
        ):
            filename = original.with_name(original.stem + "-" + variant + ".webp")
            frame = im.copy()
            if frame.width > width:
                height = round(frame.height * width / frame.width)
                frame = frame.resize((width, height), Image.Resampling.LANCZOS)
            frame.save(filename, format="WEBP", quality=87 if variant == "preview" else 79, method=6)
            if variant == "preview":
                original_bytes += source_size
                optimized_bytes += filename.stat().st_size
            produced += 1
            print(f"{original.name} -> {filename.name}: {source_size:,} => {filename.stat().st_size:,} bytes", flush=True)

assert produced == 48, f"Expected 48 variants from 24 original screenshots, generated {produced}"
print(f"Main display assets: originals {original_bytes:,} bytes -> previews {optimized_bytes:,} bytes; "
      f"{100*(1-optimized_bytes/original_bytes):.1f}% smaller", flush=True)
