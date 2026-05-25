"""
Find duplicate customer photos by visual similarity (perceptual hash).
Doesn't just check byte-identical files — catches resized/recompressed dups.

Run: python find-duplicates.py
"""
from PIL import Image
import os
import hashlib

SRC = "images/customers"


def avg_hash(path, size=8):
    """Simple perceptual hash — resize to size×size grayscale, then bit-encode pixels above mean."""
    img = Image.open(path).convert("L").resize((size, size), Image.LANCZOS)
    pixels = list(img.getdata())
    avg = sum(pixels) / len(pixels)
    bits = ''.join('1' if p > avg else '0' for p in pixels)
    return int(bits, 2)


def hamming(a, b):
    return bin(a ^ b).count('1')


def file_hash(path):
    h = hashlib.md5()
    with open(path, 'rb') as f:
        h.update(f.read())
    return h.hexdigest()


def main():
    if not os.path.isdir(SRC):
        print(f"ERR: {SRC} not found"); return

    files = sorted(f for f in os.listdir(SRC) if f.lower().endswith(('.jpg', '.jpeg', '.png')))
    if not files:
        print("No customer photos found."); return

    print(f"Analyzing {len(files)} photos...\n")

    hashes = {}
    for f in files:
        path = os.path.join(SRC, f)
        try:
            ph = avg_hash(path)
            fh = file_hash(path)
            hashes[f] = {'phash': ph, 'fhash': fh, 'size': os.path.getsize(path)}
        except Exception as e:
            print(f"  ERR reading {f}: {e}")

    # Find byte-identical duplicates
    byte_dup_groups = {}
    for f, data in hashes.items():
        byte_dup_groups.setdefault(data['fhash'], []).append(f)
    byte_dups = [g for g in byte_dup_groups.values() if len(g) > 1]

    # Find visually similar (perceptual hash within 5 bits)
    visual_dups = []
    files_list = list(hashes.keys())
    for i, a in enumerate(files_list):
        for b in files_list[i+1:]:
            if hashes[a]['fhash'] == hashes[b]['fhash']:
                continue  # already in byte dups
            d = hamming(hashes[a]['phash'], hashes[b]['phash'])
            if d <= 5:
                visual_dups.append((a, b, d))

    print("=" * 60)
    print(f"BYTE-IDENTICAL duplicates: {len(byte_dups)} group(s)")
    for group in byte_dups:
        print(f"  IDENTICAL: {', '.join(group)}")

    print(f"\nVISUALLY SIMILAR pairs (perceptual): {len(visual_dups)}")
    for a, b, d in visual_dups:
        print(f"  {a} ~ {b}  (similarity distance: {d})")

    print(f"\nTotal photos: {len(files)}")
    unique_visual = len(files) - sum(len(g) - 1 for g in byte_dup_groups.values()) - len(visual_dups)
    print(f"Likely unique: ~{max(0, unique_visual)}")


if __name__ == "__main__":
    main()
