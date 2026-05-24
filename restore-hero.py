from PIL import Image, ImageEnhance, ImageOps
import os

def restore_clean_hero():
    backup = 'images/originals-backup/storefront.jpg'
    source = backup if os.path.exists(backup) else 'images/storefront.jpg'
    print('Source: ' + source)

    img = Image.open(source)
    img = ImageOps.exif_transpose(img)
    if img.mode != 'RGB':
        img = img.convert('RGB')

    # MINIMAL enhancement only — DO NOT touch color/saturation
    img = ImageEnhance.Sharpness(img).enhance(1.3)
    img = ImageEnhance.Contrast(img).enhance(1.08)
    img = ImageEnhance.Brightness(img).enhance(1.02)

    img.thumbnail((2200, 1400), Image.LANCZOS)

    img.save('images/storefront-clean.jpg', 'JPEG', quality=92, optimize=True)
    print('Saved clean hero: images/storefront-clean.jpg')

restore_clean_hero()
