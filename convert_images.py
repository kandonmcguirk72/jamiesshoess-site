from PIL import Image
import os

images_dir = "images"
to_convert = [f for f in os.listdir(images_dir) if f.endswith(".jpg")]

for filename in to_convert:
    path = os.path.join(images_dir, filename)
    # Check if it's actually a PNG
    with open(path, "rb") as f:
        header = f.read(4)
    if header[:4] == b'\x89PNG':
        img = Image.open(path).convert("RGB")
        img.save(path, "JPEG", quality=92, optimize=True)
        print(f"Converted: {filename}")
    else:
        print(f"Already JPEG: {filename}")

print("Done.")
