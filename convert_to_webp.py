from PIL import Image
import os

images = [
  'images/storefront.jpg',
  'images/store-interior-fisheye.jpg',
  'images/sneakers-feature.jpg',
  'images/store-interior-dark.jpg',
  'images/store-interior-shoes.jpg',
  'images/store-interior-vintage.jpg',
  'images/store-interior-counter.jpg',
  'images/store-interior-entrance.jpg',
  'images/store-interior-window.jpg',
]
for path in images:
  if os.path.exists(path):
    img = Image.open(path)
    out = path.replace('.jpg', '.webp')
    img.save(out, 'WEBP', quality=82)
    print(f'Saved {out}')
  else:
    print(f'Skipped (not found): {path}')

print('Done.')
