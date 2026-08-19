# -*- coding: utf-8 -*-
"""
Prepara las capturas de los proyectos para el carrusel del portafolio.

Toma los PNG originales de Desktop\\claude, difumina los datos confidenciales
del cliente, recorta el espacio muerto, encaja cada una en un marco 16:9
uniforme (si no, el carrusel saltaría de alto en cada paso) y las exporta a
public/proyectos como WebP.

    python scripts/shots.py
"""
from PIL import Image, ImageFilter
import os

SRC = r"C:\Users\pruebas03\Desktop\claude"
OUT = r"C:\Users\pruebas03\Desktop\PORTAFOLIO\public\proyectos"

# 16:9. Es la proporción que menos hueco deja: las capturas de escritorio
# tiran a apaisadas, y el marco no puede cambiar de alto entre diapositivas.
RATIO = 16 / 9
MAX_W = 1600               # tope de ancho, sólo por peso del archivo
MAT = (16, 14, 12)         # --color-surface #100e0c: el hueco que sobra
                           # se funde con el cuerpo de la ventana.

# Zonas a difuminar, en píxeles del PNG original: (x0, y0, x1, y1).
# Sólo nombres de clientes y de personas — el sistema de muestras es interno
# de Arin S.A. y esos datos no pueden salir en un sitio público.
BLUR = {
    # Columna "Cliente" de la tabla de productos, y el nombre de ese mismo
    # cliente colado en la columna "Nombre" de dos productos.
    "sistema_muestras.png": [(520, 288, 612, 875), (450, 406, 500, 425),
                             (461, 494, 511, 512)],
    # "Creado por" y el cliente de la ficha.
    "sistema_muestras_5.png": [(232, 81, 320, 99), (24, 202, 252, 230)],
    # "Creado por" y la firma de cada entrada del historial.
    "sistema_muestras_6.png": [(228, 82, 322, 104), (42, 314, 142, 336), (42, 738, 142, 760)],
    # Columnas "Cliente" y "Dirigido" del detalle de muestras.
    "sistema_muestras_7.png": [(396, 158, 702, 748)],
    # El cliente repetido en cada tarjeta del panel lateral del calendario.
    "sistema_muestras_9.png": [(1368, 133, 1518, 155), (1368, 306, 1518, 328),
                               (1368, 479, 1518, 501), (1368, 652, 1518, 674),
                               (1368, 825, 1518, 847)],
}

# Recortes que quitan espacio muerto: filas de tarjetas cortadas a media altura
# o zonas en blanco. Acercan la proporción de cada captura a la del marco, así
# la banda oscura que queda alrededor es mínima.
CROP = {
    "jm-consulting.png": (0, 0, 1203, 676),      # 1.40 -> 1.78, la portada sola
    "jm-consulting_1.png": (0, 0, 1130, 795),    # 1.23 -> 1.42, sin la fila cortada
    "jm-consulting_3.png": (0, 0, 1287, 800),    # 1.40 -> 1.61, sin los logos cortados
    "sistema_muestras_10.png": (445, 42, 1310, 428),  # 3.04 -> 2.24, sin el vacío
}

# Dos capturas verticales de la misma ficha. Sueltas desperdiciarían la mitad
# del marco; juntas dan 1.63, casi la proporción de la ventana.
PAIR = ("sistema_muestras_5.png", "sistema_muestras_6.png")
PAIR_GAP = 36

JM = [
    ("jm-consulting.png",   "jm-1"),
    ("jm-consulting_1.png", "jm-2"),
    ("jm-consulting_2.png", "jm-3"),
    ("jm-consulting_3.png", "jm-4"),
    ("jm-consulting_5.png", "jm-5"),
    ("jm-consulting_6.png", "jm-6"),
]
# El índice de reportes (sistema_muestras_2.png) se quedó fuera: era una rejilla
# de tarjetas casi vacía, y el reporte de verdad ya sale en muestras-6.
MU = [
    ("sistema_muestras.png",    "muestras-1"),
    (PAIR,                      "muestras-2"),
    ("sistema_muestras_7.png",  "muestras-3"),
    ("sistema_muestras_8.png",  "muestras-4"),
    ("sistema_muestras_9.png",  "muestras-5"),
    ("sistema_muestras_3.png",  "muestras-6"),
    ("sistema_muestras_10.png", "muestras-7"),
]


def redact(im, boxes):
    """Pixela y desenfoca: el texto no se reconstruye ni ampliando la imagen."""
    for box in boxes:
        region = im.crop(box)
        w, h = region.size
        small = region.resize((max(1, w // 14), max(1, h // 8)), Image.BILINEAR)
        region = small.resize((w, h), Image.NEAREST).filter(ImageFilter.GaussianBlur(3))
        im.paste(region, box)
    return im


def load(src):
    """Abre un PNG, le aplica el difuminado y el recorte que le tocan."""
    im = Image.open(os.path.join(SRC, src)).convert("RGB")
    if src in BLUR:
        im = redact(im, BLUR[src])
    if src in CROP:
        im = im.crop(CROP[src])
    return im


def side_by_side(sources):
    """Pega varias capturas en fila, a la misma altura."""
    parts = [load(s) for s in sources]
    height = max(p.height for p in parts)
    parts = [p.resize((round(p.width * height / p.height), height), Image.LANCZOS) for p in parts]
    width = sum(p.width for p in parts) + PAIR_GAP * (len(parts) - 1)
    out = Image.new("RGB", (width, height), MAT)
    x = 0
    for p in parts:
        out.paste(p, (x, 0))
        x += p.width + PAIR_GAP
    return out


total = 0
for src, name in JM + MU:
    im = side_by_side(src) if isinstance(src, tuple) else load(src)

    # El lienzo se ajusta a la captura, no al revés: es el 16:9 más pequeño que
    # la contiene a tamaño nativo. Así nunca se amplía nada — ampliar una
    # captura emborrona el texto, que es justo lo que hay que poder leer.
    if im.width / im.height >= RATIO:
        cw, ch = im.width, round(im.width / RATIO)
    else:
        cw, ch = round(im.height * RATIO), im.height

    canvas = Image.new("RGB", (cw, ch), MAT)
    canvas.paste(im, ((cw - im.width) // 2, (ch - im.height) // 2))
    if cw > MAX_W:
        canvas = canvas.resize((MAX_W, round(MAX_W / RATIO)), Image.LANCZOS)

    dest = os.path.join(OUT, name + ".webp")
    canvas.save(dest, "WEBP", quality=82, method=6)
    kb = os.path.getsize(dest) / 1024
    total += kb
    waste = 100 - round(im.width * im.height * 100 / (cw * ch))
    print(f"{name}.webp  {kb:6.1f} KB   hueco {waste:2d}%   <- {src}")

print(f"\n{len(JM) + len(MU)} imagenes, {total / 1024:.2f} MB")
