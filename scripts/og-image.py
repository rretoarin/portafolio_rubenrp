# -*- coding: utf-8 -*-
"""
Genera la imagen que se ve al compartir el enlace (Open Graph, 1200x630).

Usa las tipografías y los colores del sitio para que la tarjeta se lea como una
pieza más de RubenDev y no como una miniatura genérica: la serifa (Sentient) en
la marca y en la promesa, la sans (Satoshi) en las versalitas del pie, que es
exactamente el reparto que hace `src/index.css`.

La regla que costó una tarde aprender: **en una burbuja de WhatsApp la tarjeta
mide unos 320 px**, un 27% de esta imagen. Todo lo que aquí baje de 44 px de
alto allí queda en 12 y no se lee. Por eso sólo hay tres cosas —marca, promesa y
oficio— y nada más. No volver a meter texto pequeño.

    python scripts/og-image.py [salida.png]
"""
from PIL import Image, ImageDraw, ImageFont
import math
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FUENTES = os.path.join(ROOT, "public", "fonts")
SERIFA = os.path.join(FUENTES, "sentient-variable.woff2")
SANS = os.path.join(FUENTES, "satoshi-variable.woff2")
LOGO = os.path.join(ROOT, "src", "components", "Logo.jsx")
OUT = os.path.join(ROOT, "public", "og.png")

# Se le puede pasar otra ruta de salida para comparar variantes con
# scripts/preview-card.py.
for arg in sys.argv[1:]:
    if not arg.startswith("--"):
        OUT = arg

W, H = 1200, 630
MARGEN = 88

# Paleta del estilo claro, la identidad por defecto (ver src/index.css).
PAGE = (248, 249, 250)      # --color-page (#F8F9FA, el que eligió Rubén)
INK = (16, 19, 23)          # --color-ink
INK_SOFT = (83, 90, 99)     # --color-ink-soft
ACCENT = (154, 86, 56)      # --color-accent (terracota)
ACCENT_2 = (79, 93, 70)     # --color-accent-2 (salvia)
LINE = (225, 229, 234)      # --color-line


def serifa(tam, peso):
    """Sentient, la de los titulares. Variable 200–700."""
    f = ImageFont.truetype(SERIFA, tam)
    f.set_variation_by_axes([peso])
    return f


def sans(tam, peso):
    """Satoshi, la de todo lo demás. Variable 300–900."""
    f = ImageFont.truetype(SANS, tam)
    f.set_variation_by_axes([peso])
    return f


def trazado(nombre):
    """
    Saca un trazado del isotipo de src/components/Logo.jsx en vez de copiarlo
    aquí. La geometría del monograma vive en UN solo sitio; la única copia que
    no se puede evitar es la de public/favicon.svg, porque un archivo estático
    no puede leer nada.
    """
    fuente = open(LOGO, encoding="utf-8").read()
    bloque = re.search(r"const %s =((?:\s*'[^']*'\s*\+?)+)" % nombre, fuente)
    assert bloque, "No encuentro el trazado %s en Logo.jsx" % nombre
    return "".join(re.findall(r"'([^']*)'", bloque.group(1)))


def arco(x1, y1, rx, ry, giro, grande, barrido, x2, y2, pasos):
    """
    Un arco elíptico de SVG, punteado. Es la conversión estándar de extremos a
    centro de la especificación (F.6.5): sin ella no hay forma de dibujar con
    PIL la panza de la R ni el anillo de la D.
    """
    fi = math.radians(giro)
    cos, sen = math.cos(fi), math.sin(fi)
    dx, dy = (x1 - x2) / 2.0, (y1 - y2) / 2.0
    x1p, y1p = cos * dx + sen * dy, -sen * dx + cos * dy
    # Radios demasiado pequeños para unir los dos extremos: se agrandan.
    lam = (x1p / rx) ** 2 + (y1p / ry) ** 2
    if lam > 1:
        rx, ry = rx * math.sqrt(lam), ry * math.sqrt(lam)
    num = rx * rx * ry * ry - rx * rx * y1p * y1p - ry * ry * x1p * x1p
    den = rx * rx * y1p * y1p + ry * ry * x1p * x1p
    c = math.sqrt(max(num / den, 0))
    if grande == barrido:
        c = -c
    cxp, cyp = c * rx * y1p / ry, -c * ry * x1p / rx
    cx = cos * cxp - sen * cyp + (x1 + x2) / 2.0
    cy = sen * cxp + cos * cyp + (y1 + y2) / 2.0

    def angulo(ux, uy, vx, vy):
        a = math.atan2(uy, ux) - math.atan2(vy, vx)
        return a

    t1 = math.atan2((y1p - cyp) / ry, (x1p - cxp) / rx)
    t2 = math.atan2((-y1p - cyp) / ry, (-x1p - cxp) / rx)
    dt = t2 - t1
    if barrido and dt < 0:
        dt += 2 * math.pi
    if not barrido and dt > 0:
        dt -= 2 * math.pi

    salida = []
    tramos = max(pasos, int(abs(dt) / (math.pi / 12)))
    for k in range(1, tramos + 1):
        t = t1 + dt * k / tramos
        px, py = rx * math.cos(t), ry * math.sin(t)
        salida.append((cos * px - sen * py + cx, sen * px + cos * py + cy))
    return salida


def poligono(d, pasos=24):
    """
    Convierte un trazado SVG en una lista de puntos. Entiende M/L/H/V/C/A/Z, que
    es todo lo que usa el isotipo, y parte cada curva en 24 tramos: a la escala
    de esta tarjeta, más tramos no se distinguen.

    Los arcos (A) hacen falta sí o sí: la panza de la R y el anillo de la D son
    arcos de verdad, no cúbicas que se les parezcan.
    """
    puntos = []
    x = y = 0.0
    for comando, resto in re.findall(r"([MLHVCAZ])([^MLHVCAZ]*)", d):
        n = [float(v) for v in re.findall(r"-?\d*\.?\d+", resto)]
        if comando in "ML":
            x, y = n[0], n[1]
            puntos.append((x, y))
        elif comando == "H":
            x = n[0]
            puntos.append((x, y))
        elif comando == "V":
            y = n[0]
            puntos.append((x, y))
        elif comando == "C":
            for i in range(0, len(n), 6):
                x1, y1, x2, y2, x3, y3 = n[i : i + 6]
                for paso in range(1, pasos + 1):
                    t = paso / pasos
                    u = 1 - t
                    puntos.append(
                        (
                            u ** 3 * x + 3 * u * u * t * x1 + 3 * u * t * t * x2 + t ** 3 * x3,
                            u ** 3 * y + 3 * u * u * t * y1 + 3 * u * t * t * y2 + t ** 3 * y3,
                        )
                    )
                x, y = x3, y3
        elif comando == "A":
            for i in range(0, len(n), 7):
                rx, ry, giro, grande, barrido, x2, y2 = n[i : i + 7]
                puntos += arco(x, y, rx, ry, giro, grande, barrido, x2, y2, pasos)
                x, y = x2, y2
    return puntos


def isotipo(destino, x, base, alto):
    """
    Pinta el monograma RD con la base apoyada en `base`, igual que en la barra
    del sitio. Se dibuja a 4x y se reduce porque `polygon()` de PIL no suaviza
    bordes: a tamaño real los cortes a 45° salían dentados.

    Devuelve el ancho ocupado, para saber dónde empieza el nombre.
    """
    escala = 4
    k = alto / 100.0
    ancho = int(math.ceil(134.6 * k))
    capa = Image.new("RGBA", (ancho * escala, alto * escala), (0, 0, 0, 0))
    lapiz = ImageDraw.Draw(capa)
    # La pierna primero y la tinta encima, el mismo orden que en Logo.jsx.
    for nombre, color in (("PIERNA", ACCENT), ("R", INK), ("D", INK)):
        lapiz.polygon(
            [(px * k * escala, py * k * escala) for px, py in poligono(trazado(nombre))],
            fill=color + (255,),
        )
    capa = capa.resize((ancho, alto), Image.LANCZOS)
    destino.paste(capa, (x, base - alto), capa)
    return ancho


img = Image.new("RGB", (W, H), PAGE)
d = ImageDraw.Draw(img)

# Los mismos arcos de trazo casi invisible que hay detrás de cada sección.
for cx, cy, r in ((1150, 90, 430), (120, 620, 300)):
    d.ellipse((cx - r, cy - r, cx + r, cy + r), outline=LINE, width=2)

y = MARGEN

# 1) La marca: isotipo + nombre, el mismo bloque que la barra del sitio. El
# monograma se apoya en la línea base del nombre, no en su caja, y mide 52 px
# frente a los 44 del nombre: la misma proporción que en la barra (24 y 20).
marca_a, marca_b = "Ruben", "Dev"
f_marca = serifa(44, 700)
base = y + f_marca.getmetrics()[0]
x = MARGEN + isotipo(img, MARGEN, base, 52) + 14
d.text((x, y), marca_a, font=f_marca, fill=INK)
ancho_a = d.textlength(marca_a, font=f_marca)
d.text((x + ancho_a, y), marca_b, font=f_marca, fill=ACCENT)

# 2) La promesa. Es lo único que tiene que leerse sí o sí.
y += 132
f_titular = serifa(76, 400)
for linea in ("Transformo procesos", "complejos en sistemas", "digitales simples."):
    d.text((MARGEN, y), linea, font=f_titular, fill=INK)
    y += 92

# 3) El oficio, en versalitas anchas. Precedido del punto de terracota.
y += 40
d.ellipse((MARGEN, y + 11, MARGEN + 13, y + 24), fill=ACCENT_2)
f_pie = sans(27, 700)
d.text(
    (MARGEN + 30, y),
    "DISEÑO Y DESARROLLO DE SOLUCIONES DIGITALES",
    font=f_pie,
    fill=INK_SOFT,
)

img.save(OUT, "PNG", optimize=True)
print(f"{OUT}  {img.width}x{img.height}  {os.path.getsize(OUT) // 1024} kB")
