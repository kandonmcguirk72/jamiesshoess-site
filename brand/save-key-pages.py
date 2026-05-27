"""
Save key pages from Tyler's deck as ready-to-use brand assets.
Maps pages to brand subfolders based on what each page contains.
"""
import shutil, os

# Map of source page -> destination based on text dump analysis
# Pages indexed 1-based to match page-XX.png naming
PAGE_MAP = {
    # Logo pages (after "Logo" heading on page 3, before "Additional Graphics" on page 7)
    4: ("logos/primary-logo-1.png", "Primary logo design — solid render"),
    5: ("logos/primary-logo-2.png", "Primary logo design — alt"),
    6: ("logos/primary-logo-3.png", "Primary logo design — alt"),
    # Additional graphics (pages 8-10, between Additional Graphics and SHOP VINTAGE)
    8:  ("stickers/graphic-1.png", "Additional graphic"),
    9:  ("stickers/graphic-2.png", "Additional graphic"),
    10: ("stickers/graphic-3.png", "Additional graphic"),
    # Composition / locked-up graphics
    15: ("lockups/composition-1.png", "Combined logo composition"),
    16: ("lockups/composition-2.png", "Combined composition alt"),
    17: ("lockups/composition-3.png", "Combined composition alt"),
    18: ("lockups/composition-4.png", "Combined composition alt"),
    19: ("lockups/composition-5.png", "Combined composition alt"),
    20: ("lockups/composition-6.png", "Combined composition alt"),
    # Illustration pages (after "Illustration" heading on page 21)
    22: ("illustrations/illustration-1.png", "Brand illustration"),
    23: ("illustrations/illustration-2.png", "Brand illustration"),
    24: ("illustrations/illustration-3.png", "Brand illustration"),
    25: ("illustrations/illustration-4.png", "Brand illustration"),
    26: ("illustrations/illustration-5.png", "Brand illustration"),
    # Reference pages — keep these for the dashboard
    27: ("source/page-27-colors.png", "Color palette reference"),
    28: ("source/page-28-fonts.png", "Font reference"),
}

src_dir = "brand/source/pages"
brand_dir = "brand"

for page_num, (dest, desc) in PAGE_MAP.items():
    src = os.path.join(src_dir, f"page-{page_num:02d}.png")
    if not os.path.exists(src):
        print(f"  SKIP page {page_num}: source not found")
        continue
    dst = os.path.join(brand_dir, dest)
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    shutil.copy2(src, dst)
    print(f"  page-{page_num:02d}.png -> {dest}  ({desc})")

print()
print("DONE — review the assets in brand/ subfolders and pick the best variants.")
