from PIL import Image
import numpy as np

img = Image.open("images/logo-graffiti.png").convert("RGBA")
data = np.array(img, dtype=np.uint8)

r, g, b, a = data[:,:,0], data[:,:,1], data[:,:,2], data[:,:,3]

# Full white removal — pure white and very near-white
white_mask = (r > 230) & (g > 230) & (b > 230)
data[white_mask] = [0, 0, 0, 0]

# Edge feathering — near-white pixels get semi-transparent
# Only apply to pixels still visible (not already zeroed)
edge_mask = (r > 200) & (g > 200) & (b > 200) & (data[:,:,3] > 0)
data[edge_mask, 3] = 100

result = Image.fromarray(data)
result.save("images/logo-graffiti-transparent.png")
result.save("images/logo-graffiti.png")
result.save("images/logo-graffiti-dark.png")
result.save("images/logo-footer.png")

w, h = result.size
print(f"Done — {w}x{h}px transparent logo saved to all 4 logo files.")
