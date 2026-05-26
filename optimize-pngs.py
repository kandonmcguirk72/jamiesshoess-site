"""
Lossless PNG optimization for the logo files.
Re-saves with max compression — keeps every pixel identical, just smaller.
Backs up originals first.
"""
from PIL import Image
import os, shutil

ROOT = "images"
BACKUP = "images/_originals-pngs"
os.makedirs(BACKUP, exist_ok=True)

targets = [
    "logo-circle-blue.png",
    "logo-graffiti.png",
    "logo-graffiti-dark.png",
    "logo-graffiti-transparent.png",
    "logo-footer.png",
]

total_before, total_after = 0, 0
for f in targets:
    src = os.path.join(ROOT, f)
    if not os.path.exists(src):
        print(f"  SKIP {f} (not found)")
        continue
    bak = os.path.join(BACKUP, f)
    if not os.path.exists(bak):
        shutil.copy2(src, bak)

    before = os.path.getsize(src)
    try:
        img = Image.open(src)
        # Preserve alpha for transparency
        img.save(src, "PNG", optimize=True, compress_level=9)
        after = os.path.getsize(src)
        total_before += before
        total_after  += after
        pct = (1 - after/before) * 100
        print(f"  {f}: {before//1024} KB -> {after//1024} KB  (-{pct:.0f}%)")
    except Exception as e:
        print(f"  ERR {f}: {e}")

print(f"\nTotal: {total_before//1024} KB -> {total_after//1024} KB  (-{(1 - total_after/total_before)*100:.0f}%)")
print(f"Originals backed up to: {BACKUP}")
