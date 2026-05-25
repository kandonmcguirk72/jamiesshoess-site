"""
Enhance customer slideshow photos.

What it does:
  1. Backs up originals to images/customers/_originals/ (first run only)
  2. Auto-orients (fixes EXIF rotation)
  3. Crops to square (centered, slightly top-biased to keep faces in frame)
  4. Resizes to 1080x1080 (retina-quality for the 640px slideshow display)
  5. Applies gentle enhancement: contrast, sharpness, slight color boost
  6. Saves as high-quality JPEG (quality 88, optimized) - typically ~80% smaller
  7. Keeps the original .png filename pattern by saving as .jpg alongside

Run:  python enhance-customers.py
"""

from PIL import Image, ImageEnhance, ImageOps
import os
import shutil
import sys

SRC_DIR    = "images/customers"
BACKUP_DIR = "images/customers/_originals"
TARGET_PX  = 1080
QUALITY    = 88

# Enhancement strengths
BRIGHTNESS = 1.04
CONTRAST   = 1.10
COLOR      = 1.08
SHARPNESS  = 1.35


def smart_square_crop(img):
    """Crop to square, centered horizontally, biased slightly toward the top
    to keep faces in frame (typical portrait composition)."""
    w, h = img.size
    if w == h:
        return img
    if w > h:
        # Landscape -> crop sides
        left = (w - h) // 2
        return img.crop((left, 0, left + h, h))
    # Portrait -> crop top/bottom, but keep more of the top (faces)
    top_bias = 0.35  # 0 = pure top, 0.5 = center, 1.0 = pure bottom
    top = int((h - w) * top_bias)
    return img.crop((0, top, w, top + w))


def enhance_one(src_path, out_path):
    img = Image.open(src_path)
    img = ImageOps.exif_transpose(img)
    if img.mode != "RGB":
        img = img.convert("RGB")

    # Square crop
    img = smart_square_crop(img)

    # Resize
    if img.size[0] > TARGET_PX:
        img = img.resize((TARGET_PX, TARGET_PX), Image.LANCZOS)

    # Enhance
    img = ImageEnhance.Brightness(img).enhance(BRIGHTNESS)
    img = ImageEnhance.Contrast(img).enhance(CONTRAST)
    img = ImageEnhance.Color(img).enhance(COLOR)
    img = ImageEnhance.Sharpness(img).enhance(SHARPNESS)

    img.save(out_path, "JPEG", quality=QUALITY, optimize=True, progressive=True)
    return os.path.getsize(out_path)


def main():
    if not os.path.isdir(SRC_DIR):
        print(f"ERR: {SRC_DIR} not found")
        sys.exit(1)

    # Find customer photos
    files = sorted(
        f for f in os.listdir(SRC_DIR)
        if f.lower().startswith("customer-") and f.lower().endswith((".png", ".jpg", ".jpeg"))
        and not f.lower().endswith(".jpg.bak")
    )

    if not files:
        print("No customer-XX.* files found.")
        sys.exit(0)

    # Back up originals
    os.makedirs(BACKUP_DIR, exist_ok=True)
    backed_up = 0
    for f in files:
        src = os.path.join(SRC_DIR, f)
        dst = os.path.join(BACKUP_DIR, f)
        if not os.path.exists(dst):
            shutil.copy2(src, dst)
            backed_up += 1
    if backed_up:
        print(f"BACKUP: Saved {backed_up} originals to {BACKUP_DIR}")
    else:
        print(f"BACKUP: Originals already saved in {BACKUP_DIR}")

    # Enhance each
    total_before = 0
    total_after  = 0
    processed    = 0
    failed       = []

    for f in files:
        src       = os.path.join(SRC_DIR, f)
        base, _   = os.path.splitext(f)
        out_path  = os.path.join(SRC_DIR, base + ".jpg")
        before    = os.path.getsize(src)
        try:
            after = enhance_one(src, out_path)
            # If original was PNG, delete it now that .jpg replaces it
            if f.lower().endswith(".png") and out_path.lower() != src.lower():
                os.remove(src)
            total_before += before
            total_after  += after
            processed    += 1
            saved_pct = (1 - after / before) * 100 if before else 0
            print(f"OK  {base}.jpg  {before//1024} KB -> {after//1024} KB  (-{saved_pct:.0f}%)")
        except Exception as e:
            failed.append((f, str(e)))
            print(f"ERR {f}: {e}")

    print("")
    print("=" * 50)
    print(f"Enhanced: {processed} / {len(files)}")
    if total_before:
        savings = (1 - total_after / total_before) * 100
        print(f"Total size: {total_before//1024} KB -> {total_after//1024} KB  (-{savings:.0f}%)")
    if failed:
        print(f"Failed: {len(failed)}")
        for f, err in failed:
            print(f"  - {f}: {err}")


if __name__ == "__main__":
    main()
