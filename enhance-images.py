from PIL import Image, ImageEnhance, ImageOps
import os

def enhance_image(path, brightness=1.02, contrast=1.05, color=1.0, sharpness=1.3):
    img = Image.open(path)
    img = ImageOps.exif_transpose(img)
    if img.mode != 'RGB':
        img = img.convert('RGB')
    img = ImageEnhance.Brightness(img).enhance(brightness)
    img = ImageEnhance.Contrast(img).enhance(contrast)
    img = ImageEnhance.Color(img).enhance(color)
    img = ImageEnhance.Sharpness(img).enhance(sharpness)
    img.save(path, 'JPEG', quality=93, optimize=True)

def create_hero_version():
    src = 'images/storefront.jpg'
    if not os.path.exists(src):
        print('- images/storefront.jpg not found, skipping hero version')
        return False
    img = Image.open(src)
    img = ImageOps.exif_transpose(img)
    if img.mode != 'RGB':
        img = img.convert('RGB')
    w, h = img.size
    # Crop top 10% (sky/excess building above car)
    img = img.crop((0, int(h * 0.1), w, h))
    # Gentle pass only — no color boost (photo already saturated)
    img = ImageEnhance.Contrast(img).enhance(1.1)
    img = ImageEnhance.Sharpness(img).enhance(1.5)
    img = ImageEnhance.Brightness(img).enhance(1.05)
    img.thumbnail((2400, 1400), Image.LANCZOS)
    img.save('images/storefront-hero.jpg', 'JPEG', quality=94, optimize=True)
    print('OK: Created images/storefront-hero.jpg (hero-optimized)')
    return True

targets = [
    'images/storefront.jpg',
    'images/store-interior-counter.jpg',
    'images/store-interior-dark.jpg',
    'images/store-interior-entrance.jpg',
    'images/store-interior-fisheye.jpg',
    'images/store-interior-shoes.jpg',
    'images/store-interior-vintage.jpg',
    'images/store-interior-window.jpg',
    'images/sneakers-feature.jpg',
]

processed = 0
for path in targets:
    if os.path.exists(path):
        try:
            enhance_image(path)
            print('OK: Enhanced: ' + path)
            processed += 1
        except Exception as e:
            print('ERR: ' + path + ': ' + str(e))
    else:
        print('SKIP: ' + path)

hero_ok = create_hero_version()

print('\nDone -- ' + str(processed) + ' images enhanced, hero version ' + ('created' if hero_ok else 'skipped'))
