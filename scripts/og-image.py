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

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FONTS = os.path.join(ROOT, "public", "fonts")
OUT = os.path.join(ROOT, "public", "og.png")

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

# Etiqueta de seccion: ... /Nombre ...
label_font = mono(21, 400)
y = MARGIN
d.text((MARGIN, y), "... /", font=label_font, fill=MUTED)
w1 = d.textlength("... /", font=label_font)
d.text((MARGIN + w1, y), "Desarrollador Full Stack", font=label_font, fill=SOFT)
w2 = d.textlength("Desarrollador Full Stack", font=label_font)
d.text((MARGIN + w1 + w2, y), " ...", font=label_font, fill=MUTED)

# Nombre a gran escala, como el cierre del pie del sitio.
name_font = mono(92, 500)
y = 176
for i, line in enumerate(("Rubén Reto", "Panta")):
    d.text((MARGIN + (i * 26), y + i * 108), line, font=name_font, fill=BRIGHT)

# Linea de apoyo.
d.text((MARGIN, 424), "Webs y sistemas a medida del requerimiento real.",
       font=sans(27), fill=SOFT)

# Pildoras de tecnologias.
x = MARGIN
pill_font = mono(19, 400)
for tech in ("React", "Node.js", "MongoDB"):
    tw = d.textlength(tech, font=pill_font)
    d.rounded_rectangle((x, 486, x + tw + 40, 486 + 46), radius=23, outline=LINE, width=1)
    d.text((x + 20, 486 + 12), tech, font=pill_font, fill=SOFT)
    x += tw + 40 + 12

# Retrato en circulo, en gris como en la barra del sitio.
photo_path = os.path.join(ROOT, "public", "ruben.jpg")
if os.path.exists(photo_path):
    size = 232
    photo = ImageOps.fit(Image.open(photo_path).convert("L"), (size, size)).convert("RGB")
    mask = Image.new("L", (size * 4, size * 4), 0)
    ImageDraw.Draw(mask).ellipse((0, 0, size * 4, size * 4), fill=255)
    mask = mask.resize((size, size), Image.LANCZOS)
    px, py = W - MARGIN - size, 176
    img.paste(photo, (px, py), mask)
    d.ellipse((px, py, px + size, py + size), outline=LINE, width=2)

# Direccion del sitio, abajo del todo.
d.text((MARGIN, H - 74), "portafolio-rubenrp.vercel.app", font=mono(21, 400), fill=MUTED)

img.save(OUT, "PNG", optimize=True)
print(f"og.png  {os.path.getsize(OUT) / 1024:.0f} KB  {W}x{H}")
