"""
Extract Tyler's brand deck — render each page as a PNG so I can review,
extract all embedded images, and read all text to find color hex values.
"""
import fitz  # PyMuPDF
import os
import json

PDF = "brand/source/tyler-brand-deck.pdf"
OUT_PAGES = "brand/source/pages"
OUT_IMAGES = "brand/source/extracted"
os.makedirs(OUT_PAGES, exist_ok=True)
os.makedirs(OUT_IMAGES, exist_ok=True)

doc = fitz.open(PDF)
print(f"PDF: {len(doc)} pages")
print()

# ── Render each page at 2x for review ───────────────────────────────────────
print("=== Rendering pages ===")
for i, page in enumerate(doc):
    pix = page.get_pixmap(matrix=fitz.Matrix(2, 2))
    out = os.path.join(OUT_PAGES, f"page-{i+1:02d}.png")
    pix.save(out)
    print(f"  page-{i+1:02d}.png  {pix.width}x{pix.height}")

# ── Extract embedded images ─────────────────────────────────────────────────
print()
print("=== Extracting embedded images ===")
image_count = 0
for page_num, page in enumerate(doc):
    images = page.get_images(full=True)
    for img_idx, img in enumerate(images):
        xref = img[0]
        try:
            pix = fitz.Pixmap(doc, xref)
            if pix.n - pix.alpha > 3:  # CMYK
                pix = fitz.Pixmap(fitz.csRGB, pix)
            ext = "png" if pix.alpha else "png"
            out = os.path.join(OUT_IMAGES, f"p{page_num+1:02d}-img{img_idx+1:02d}.{ext}")
            pix.save(out)
            print(f"  {out}  ({pix.width}x{pix.height})")
            image_count += 1
            pix = None
        except Exception as e:
            print(f"  ERR p{page_num+1} img{img_idx+1}: {e}")

print()
print(f"Extracted {image_count} images")
print()

# ── Read all text + try to find hex colors ──────────────────────────────────
print("=== Searching for hex colors in slide text ===")
import re
all_text = ""
for page in doc:
    all_text += page.get_text() + "\n\n=== PAGE BREAK ===\n\n"

hex_pattern = re.compile(r"#[0-9a-fA-F]{6}\b")
rgb_pattern = re.compile(r"rgb\s*\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)", re.I)
hexes = sorted(set(hex_pattern.findall(all_text)))
rgbs  = sorted(set(rgb_pattern.findall(all_text)))
print(f"Hex codes mentioned in text: {hexes}")
print(f"RGB values mentioned: {rgbs}")

# Save full text dump for further review
with open("brand/source/deck-text-dump.txt", "w", encoding="utf-8") as f:
    f.write(all_text)
print()
print(f"Full text dumped to: brand/source/deck-text-dump.txt ({len(all_text)} chars)")

# ── Sample dominant colors from pages 1-3 (usually the brand spec pages) ───
print()
print("=== Sampling dominant colors from first few pages ===")
from collections import Counter

def sample_colors(page_num, top_n=8):
    pix = doc[page_num].get_pixmap()
    samples = Counter()
    # Sample every 20th pixel
    for y in range(0, pix.height, 20):
        for x in range(0, pix.width, 20):
            r, g, b = pix.pixel(x, y)[:3]
            # Skip very dark (background) and very white (paper)
            if (r + g + b) < 30 or (r > 245 and g > 245 and b > 245):
                continue
            # Quantize to nearest 16 to group similar colors
            samples[(r // 16 * 16, g // 16 * 16, b // 16 * 16)] += 1
    return samples.most_common(top_n)

for p in range(min(5, len(doc))):
    print(f"\n  Page {p+1} top colors:")
    for (r, g, b), count in sample_colors(p):
        print(f"    #{r:02x}{g:02x}{b:02x}  rgb({r:3d},{g:3d},{b:3d})  count={count}")

doc.close()
print()
print("DONE.")
