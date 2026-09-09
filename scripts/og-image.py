# -*- coding: utf-8 -*-
"""
Genera la imagen que se ve al compartir el enlace (Open Graph, 1200x630).

Usa la tipografía y los colores del sitio para que la tarjeta se lea como una
pieza más de RubenDev y no como una miniatura genérica.

La regla que costó una tarde aprender: **en una burbuja de WhatsApp la tarjeta
mide unos 320 px**, un 27% de esta imagen. Todo lo que aquí baje de 44 px de
alto allí queda en 12 y no se lee. Por eso sólo hay tres cosas —marca, promesa y
oficio— y nada más. No volver a meter texto pequeño.

    python scripts/og-image.py [salida.png]
"""
from PIL import Image, ImageDraw, ImageFont
import os
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FUENTE = os.path.join(ROOT, "public", "fonts", "manrope-latin.woff2")
OUT = os.path.join(ROOT, "public", "og.png")

# Se le puede pasar otra ruta de salida para comparar variantes con
# scripts/preview-card.py.
for arg in sys.argv[1:]:
    if not arg.startswith("--"):
        OUT = arg

W, H = 1200, 630
MARGEN = 88

# Paleta del estilo claro, la identidad por defecto (ver src/index.css).
PAGE = (251, 250, 247)      # --color-page
INK = (23, 21, 15)          # --color-ink
INK_SOFT = (90, 85, 70)     # --color-ink-soft
ACCENT = (79, 93, 70)       # --color-accent (salvia)
ACCENT_2 = (156, 91, 65)    # --color-accent-2 (terracota)
LINE = (228, 224, 214)      # --color-line


def manrope(tam, peso):
    """Manrope es variable (200–800): se instancia el peso que haga falta."""
    f = ImageFont.truetype(FUENTE, tam)
    f.set_variation_by_axes([peso])
    return f


img = Image.new("RGB", (W, H), PAGE)
d = ImageDraw.Draw(img)

# Los mismos arcos de trazo casi invisible que hay detrás de cada sección.
for cx, cy, r in ((1150, 90, 430), (120, 620, 300)):
    d.ellipse((cx - r, cy - r, cx + r, cy + r), outline=LINE, width=2)

y = MARGEN

# 1) La marca. Dos pesos en la misma palabra, como en la barra del sitio.
marca_a, marca_b = "Ruben", "Dev"
f_marca = manrope(44, 800)
d.text((MARGEN, y), marca_a, font=f_marca, fill=INK)
ancho_a = d.textlength(marca_a, font=f_marca)
d.text((MARGEN + ancho_a, y), marca_b, font=f_marca, fill=ACCENT)

# 2) La promesa. Es lo único que tiene que leerse sí o sí.
y += 132
f_titular = manrope(76, 800)
for linea in ("Transformo procesos", "complejos en sistemas", "digitales simples."):
    d.text((MARGEN, y), linea, font=f_titular, fill=INK)
    y += 92

# 3) El oficio, en versalitas anchas. Precedido del punto de terracota.
y += 40
d.ellipse((MARGEN, y + 11, MARGEN + 13, y + 24), fill=ACCENT_2)
f_pie = manrope(27, 700)
d.text(
    (MARGEN + 30, y),
    "DISEÑO Y DESARROLLO DE SOLUCIONES DIGITALES",
    font=f_pie,
    fill=INK_SOFT,
)

img.save(OUT, "PNG", optimize=True)
print(f"{OUT}  {img.width}x{img.height}  {os.path.getsize(OUT) // 1024} kB")
