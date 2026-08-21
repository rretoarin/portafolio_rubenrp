# -*- coding: utf-8 -*-
"""
Apaga el fondo del retrato para que el circulo no flote como un disco claro
sobre el negro del sitio.

La foto viene de modo retrato: oficina clara y desenfocada detras. En la barra
y en el hero se muestra en gris y a 36-80px, asi que ese fondo se lee como una
mancha blanca. Aqui se sustituye por un fondo oscuro propio.

No hay segmentacion automatica que valga: la piel es lisa y cualquier deteccion
por bordes o por luminancia se come la cara. Como es UNA sola imagen, la
silueta va trazada a mano (elipse de la cabeza + trapecio de los hombros),
difuminada, y el apagado solo actua sobre los pixeles claros: lo oscuro ya
estaba integrado y no se toca.

    python scripts/retrato.py

Entra scripts/fuente/ruben.jpg (el original, sin tocar) y salen
public/ruben.jpg y public/ruben.webp. Despues hay que regenerar la imagen de
compartir, que lee ese mismo archivo:

    python scripts/og-image.py
"""
import os

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "scripts", "fuente", "ruben.jpg")

PISO = 0.09          # cuanto queda del fondo original (0 = negro puro)
DESENFOQUE = 16      # borra los muebles y las columnas de la oficina
PLUMA = 9            # difuminado del borde de la silueta


def paso(a, b, x):
    t = np.clip((x - a) / (b - a), 0, 1)
    return t * t * (3 - 2 * t)


src = Image.open(SRC).convert("RGB")
W, H = src.size
a = np.asarray(src).astype(np.float32)
fondo = np.asarray(src.filter(ImageFilter.GaussianBlur(DESENFOQUE))).astype(np.float32)

silueta = Image.new("L", (W, H), 0)
d = ImageDraw.Draw(silueta)
d.ellipse([0.255 * W, 0.09 * H, 0.655 * W, 0.69 * H], fill=255)
d.polygon(
    [
        (0.33 * W, 0.62 * H), (0.60 * W, 0.62 * H), (0.80 * W, 0.82 * H),
        (0.95 * W, H), (0.03 * W, H), (0.16 * W, 0.82 * H),
    ],
    fill=255,
)
m = (np.asarray(silueta.filter(ImageFilter.GaussianBlur(PLUMA))).astype(np.float32) / 255)[..., None]

base = a * m + fondo * (1 - m)
lum = base[..., 0] * 0.299 + base[..., 1] * 0.587 + base[..., 2] * 0.114
claro = paso(55, 145, lum)[..., None]

# El borde del circulo se funde en negro: asi el retrato no termina en un canto
# gris contra el fondo de la pagina.
yy, xx = np.mgrid[0:H, 0:W]
r = np.hypot(xx - W / 2, yy - H / 2) / (W / 2)
canto = (1 - 0.55 * paso(0.72, 1.0, r))[..., None]

out = base * (1 - (1 - m) * claro * (1 - PISO)) * (m + (1 - m) * canto)
out = np.clip(out, 0, 255)
out[r > 1 - 1.5 / W * 2] = 0                     # fuera del circulo, negro puro

img = Image.fromarray(out.astype(np.uint8))
img.save(os.path.join(ROOT, "public", "ruben.jpg"), "JPEG", quality=88, optimize=True)
img.save(os.path.join(ROOT, "public", "ruben.webp"), "WEBP", quality=86, method=6)
for f in ("ruben.jpg", "ruben.webp"):
    p = os.path.join(ROOT, "public", f)
    print(f"{f}  {os.path.getsize(p) / 1024:.1f} KB  {img.size[0]}x{img.size[1]}")
