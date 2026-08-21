# -*- coding: utf-8 -*-
"""
Prepara el retrato para la web a partir del original de scripts/fuente/.

La foto ya viene con su fondo gris oscuro resuelto, asi que aqui no se retoca
nada: no se cambian tonos ni se recorta el encuadre. Lo unico que hace falta es
tecnico.

El original trae el circulo dibujado dentro del cuadrado, con un margen oscuro
alrededor. El sitio recorta en circulo por CSS usando TODO el ancho, asi que si
se dejara ese margen apareceria un anillo oscuro rodeando la foto. Por eso se
detecta el circulo del original y se recorta justo a el.

    python scripts/retrato.py

Salen public/ruben.jpg y public/ruben.webp a 400x400 -- 5x el tamano al que se
ve en el hero, de sobra para pantallas retina. Despues hay que regenerar la
imagen de compartir, que lee ese mismo archivo:

    python scripts/og-image.py
"""
import glob
import os

import numpy as np
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LADO = 400          # tamano final
MARGEN = 0.012      # se recorta un pelo por dentro del circulo, para no dejar borde

fuentes = sorted(glob.glob(os.path.join(ROOT, "scripts", "fuente", "ruben.*")),
                 key=os.path.getmtime, reverse=True)
src = Image.open(fuentes[0]).convert("RGB")
W, H = src.size
a = np.asarray(src).astype(np.float32)
lum = a[..., 0] * 0.299 + a[..., 1] * 0.587 + a[..., 2] * 0.114

# El relleno de las esquinas es mas oscuro que el fondo del retrato. La cuerda
# mas ancha de esa zona clara da el diametro del circulo.
umbral = (float(lum[2, 2]) + float(np.percentile(lum, 60))) / 2
mejor = (0, 0, 0)
for y in range(0, H, 4):
    xs = np.nonzero(lum[y] > umbral)[0]
    if len(xs) > mejor[0]:
        mejor = (int(xs[-1] - xs[0]), int(xs[0]), int(xs[-1]))
ancho, x0, x1 = mejor
cx, cy, r = (x0 + x1) / 2, H / 2, ancho / 2 * (1 - MARGEN)
print(f"circulo detectado: centro ({cx:.0f}, {cy:.0f})  radio {r:.0f}  de {W}x{H}")

img = src.crop((round(cx - r), round(cy - r), round(cx + r), round(cy + r)))
img = img.resize((LADO, LADO), Image.LANCZOS)

img.save(os.path.join(ROOT, "public", "ruben.jpg"), "JPEG", quality=92, optimize=True)
img.save(os.path.join(ROOT, "public", "ruben.webp"), "WEBP", quality=90, method=6)
for f in ("ruben.jpg", "ruben.webp"):
    p = os.path.join(ROOT, "public", f)
    print(f"{f}  {os.path.getsize(p) / 1024:.1f} KB  {img.size[0]}x{img.size[1]}")
