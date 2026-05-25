"""
Compress JPGs over 180KB to under ~150KB using progressive encoding at quality 88.
Backs up originals first. Skips PNGs (they need exact transparency).
"""
from PIL import Image, ImageOps
import os
import shutil

ROOT = "images"
BACKUP = "images/_originals-bigjpg"
THRESHOLD_KB = 180
QUALITY = 88

os.makedirs(BACKUP, exist_ok=True)

targets = []
for f in os.listdir(ROOT):
    fp = os.path.join(ROOT, f)
    if not os.path.isfile(fp):
        continue
    if not f.lower().endswith((".jpg", ".jpeg")):
        continue
    if os.path.getsize(fp) > THRESHOLD_KB * 1024:
        targets.append(f)

if not targets:
    print("No JPGs over threshold.")
    raise SystemExit

print(f"Compressing {len(targets)} JPGs...\n")
total_before, total_after = 0, 0
for f in targets:
    src = os.path.join(ROOT, f)
    bak = os.path.join(BACKUP, f)
    if not os.path.exists(bak):
        shutil.copy2(src, bak)

    before = os.path.getsize(src)
    try:
        img = Image.open(src)
        img = ImageOps.exif_transpose(img)
        if img.mode != "RGB":
            img = img.convert("RGB")
        img.save(src, "JPEG", quality=QUALITY, optimize=True, progressive=True)
        after = os.path.getsize(src)
        total_before += before
        total_after  += after
        pct = (1 - after / before) * 100
        print(f"  {f}: {before//1024} KB -> {after//1024} KB  (-{pct:.0f}%)")
    except Exception as e:
        print(f"  ERR {f}: {e}")

print(f"\nTotal: {total_before//1024} KB -> {total_after//1024} KB  (-{(1 - total_after/total_before)*100:.0f}%)")
print(f"Originals backed up to: {BACKUP}")
