# -*- coding: utf-8 -*-
"""
Genera la imagen que se ve al compartir el enlace (Open Graph, 1200x630).

Usa las mismas tipografias, colores y motivos del sitio, para que el enlace en
WhatsApp o LinkedIn se lea como una pieza mas del portafolio y no como una
tarjeta generica.

    python scripts/og-image.py
"""
from PIL import Image, ImageDraw, ImageFont, ImageOps
import os
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FONTS = os.path.join(ROOT, "public", "fonts")
OUT = os.path.join(ROOT, "public", "og.png")

# Se le puede pasar otra ruta de salida para generar una variante y compararla
# con la actual en scripts/preview-card.py.
for arg in sys.argv[1:]:
    if not arg.startswith("--"):
        OUT = arg

W, H = 1200, 630
INK = (10, 9, 8)           # --color-ink
BRIGHT = (247, 244, 239)   # --color-bright
MUTED = (131, 126, 115)    # --color-muted
SOFT = (171, 166, 156)     # --color-soft
LINE = (54, 49, 41)        # --color-line-strong
ARC = (21, 20, 19)         # el blanco al 4.5% sobre ink, ya mezclado

MARGIN = 88

mono = lambda size, weight=500: ImageFont.truetype(
    os.path.join(FONTS, f"jetbrains-mono-{weight}-latin.woff2"), size
)
sans = lambda size: ImageFont.truetype(os.path.join(FONTS, "inter-400-latin.woff2"), size)

img = Image.new("RGB", (W, H), INK)
d = ImageDraw.Draw(img)

# Arcos de fondo: los mismos circulos gigantes de trazo casi invisible.
for cx, cy, r in ((1180, 120, 470), (980, 700, 360)):
    d.ellipse((cx - r, cy - r, cx + r, cy + r), outline=ARC, width=2)

# Tres cosas y nada mas. La imagen se ve a unos 320px de ancho en una burbuja de
# WhatsApp — un 27% de su tamano — asi que cualquier texto por debajo de 45px
# aqui no se lee alli. La maqueta anterior tenia eyebrow, una linea de apoyo,
# tres pildoras y la direccion: a tamano real todo eso era ruido gris de 5px.
# La direccion, ademas, la escribe la propia plataforma debajo de la tarjeta.

# 110 y no mas: a 118 la primera linea casi rozaba el retrato.
name_font = mono(110, 500)
for i, line in enumerate(("Rubén Reto", "Panta")):
    d.text((MARGIN, 140 + i * 130), line, font=name_font, fill=BRIGHT)

d.text((MARGIN, 428), "Desarrollador Full Stack", font=mono(50, 400), fill=SOFT)
d.text((MARGIN, 510), "React · Node.js · MongoDB", font=sans(44), fill=MUTED)

# Retrato en circulo, en gris como en la barra del sitio.
photo_path = os.path.join(ROOT, "public", "ruben.jpg")
if os.path.exists(photo_path):
    size = 300
    photo = ImageOps.fit(Image.open(photo_path).convert("L"), (size, size)).convert("RGB")
    mask = Image.new("L", (size * 4, size * 4), 0)
    ImageDraw.Draw(mask).ellipse((0, 0, size * 4, size * 4), fill=255)
    mask = mask.resize((size, size), Image.LANCZOS)
    px, py = W - MARGIN - size, 165
    img.paste(photo, (px, py), mask)
    d.ellipse((px, py, px + size, py + size), outline=LINE, width=2)

img.save(OUT, "PNG", optimize=True)
print(f"{os.path.basename(OUT)}  {os.path.getsize(OUT) / 1024:.0f} KB  {W}x{H}")
