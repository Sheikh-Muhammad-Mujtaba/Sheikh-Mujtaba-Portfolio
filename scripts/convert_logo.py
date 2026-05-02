#!/usr/bin/env python3
from pathlib import Path
from PIL import Image

src = Path('public/Logo.png')
if not src.exists():
    print('Logo.png not found at', src)
    raise SystemExit(1)

out = src.with_suffix('.avif')
with Image.open(src) as img:
    if img.mode in ('RGBA','LA','P'):
        bg = Image.new('RGB', img.size, (255,255,255))
        if img.mode == 'P':
            img = img.convert('RGBA')
        bg.paste(img, mask=img.split()[-1] if img.mode=='RGBA' else None)
        img = bg
    else:
        img = img.convert('RGB')
    img.save(out, 'AVIF', quality=85, method=6)

print('Converted', src.name, '→', out.name)
print('Size:', src.stat().st_size, '→', out.stat().st_size)
