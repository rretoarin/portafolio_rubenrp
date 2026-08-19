# -*- coding: utf-8 -*-
"""
Prepara las capturas de los proyectos para el carrusel del portafolio.

Toma los PNG originales de Desktop\\claude, difumina los datos confidenciales
del cliente, recorta el espacio muerto, encaja cada una en un marco 16:9
uniforme (si no, el carrusel saltaría de alto en cada paso) y las exporta a
public/proyectos como WebP.

    python scripts/shots.py
"""
from PIL import Image, ImageFilter, ImageOps
from collections import deque
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
    "jm-consulting.png": (0, 8, 1203, 676),      # 1.40 -> 1.80, la portada sola.
                                                 # Las 8 primeras filas son el
                                                 # borde del navegador: al
                                                 # invertir salían en blanco.
    "jm-consulting_1.png": (0, 0, 1130, 795),    # 1.23 -> 1.42, sin la fila cortada
    "jm-consulting_3.png": (0, 0, 1287, 800),    # 1.40 -> 1.61, sin los logos cortados
    "sistema_muestras_10.png": (445, 42, 1310, 428),  # 3.04 -> 2.24, sin el vacío
}

# Dos capturas verticales de la misma ficha. Sueltas desperdiciarían la mitad
# del marco; juntas dan 1.63, casi la proporción de la ventana.
PAIR = ("sistema_muestras_5.png", "sistema_muestras_6.png")
PAIR_GAP = 36

# --- Fondo negro -------------------------------------------------------------
# No basta con pintar el fondo: el texto es oscuro y desaparecería. Hay que
# invertir la luminosidad y dejar el tono intacto, que es lo que convierte un
# blanco en negro y un texto negro en blanco sin estropear los colores de marca.
#
# Lo único que no sobrevive a eso son las fotos: en negativo son horribles. Se
# detectan solas (una casilla de foto tiene decenas de colores distintos; una de
# texto, dos) y se vuelven a pegar en color original encima.
# La sección de contacto de J&M ya es verde oscuro: invertirla entera la
# aclararía, que es lo contrario de lo que se busca. Ahí sólo se invierten los
# dos bloques claros — la barra de navegación y la tarjeta del formulario.
INVERT_ONLY = {
    "jm-consulting_6.png": [(0, 0, 1210, 58), (495, 221, 1011, 718)],
}

# Fotos que el detector no pilla: la de equipo tiene fondo blanco entre persona
# y persona, y las miniaturas de joyería son pequeñas. Coordenadas del PNG ya
# recortado.
KEEP = {
    "jm-consulting_2.png": [(12, 94, 484, 412)],       # foto del equipo
    "sistema_muestras_7.png": [(1300, 162, 1398, 750)],  # columna "Foto"
}

TILE = 16
MIN_COLORS = 26            # colores distintos en una casilla para ser foto
MIN_TILES = 12             # casillas seguidas para que cuente como foto

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


def photo_boxes(im):
    """Rectángulos que parecen foto, por variedad de color en cada casilla."""
    w, h = im.width // TILE, im.height // TILE
    px = im.load()
    rich = [[0] * w for _ in range(h)]
    for ty in range(h):
        for tx in range(w):
            seen = set()
            for y in range(ty * TILE, ty * TILE + TILE, 2):
                for x in range(tx * TILE, tx * TILE + TILE, 2):
                    r, g, b = px[x, y]
                    seen.add((r >> 3, g >> 3, b >> 3))
            rich[ty][tx] = 1 if len(seen) >= MIN_COLORS else 0

    boxes, visited = [], [[False] * w for _ in range(h)]
    for ty in range(h):
        for tx in range(w):
            if not rich[ty][tx] or visited[ty][tx]:
                continue
            queue = deque([(tx, ty)])
            visited[ty][tx] = True
            x0 = x1 = tx
            y0 = y1 = ty
            n = 0
            while queue:
                cx, cy = queue.popleft()
                n += 1
                x0, x1 = min(x0, cx), max(x1, cx)
                y0, y1 = min(y0, cy), max(y1, cy)
                for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1),
                               (1, 1), (-1, -1), (1, -1), (-1, 1)):
                    nx, ny = cx + dx, cy + dy
                    if 0 <= nx < w and 0 <= ny < h and not visited[ny][nx] and rich[ny][nx]:
                        visited[ny][nx] = True
                        queue.append((nx, ny))
            if n >= MIN_TILES:
                boxes.append((x0 * TILE, y0 * TILE,
                              min(im.width, (x1 + 1) * TILE),
                              min(im.height, (y1 + 1) * TILE)))
    return boxes


def darken(im, src):
    """
    Pone el fondo en negro. Negativo y luego el tono girado media vuelta: el
    negativo convierte el blanco en negro y el texto oscuro en claro, y el giro
    del tono deshace el cambio de color que el negativo provoca. Un naranja de
    marca sigue siendo naranja; sólo cambia de lado la luminosidad.

    Invertir sólo el brillo (HSV) parecía equivalente y no lo es: apaga los
    acentos: un botón naranja acaba marrón y los gráficos se vuelven barro.
    """
    hue, sat, val = ImageOps.invert(im).convert("HSV").split()
    flipped = Image.merge("HSV", (hue.point(lambda p: (p + 128) % 256), sat, val)).convert("RGB")

    if src in INVERT_ONLY:
        out = im.copy()
        for box in INVERT_ONLY[src]:
            out.paste(flipped.crop(box), box[:2])
        return out

    out = flipped
    for box in photo_boxes(im) + KEEP.get(src, []):
        out.paste(im.crop(box), box[:2])
    return out


def load(src):
    """Abre un PNG y le aplica difuminado, recorte y fondo negro."""
    im = Image.open(os.path.join(SRC, src)).convert("RGB")
    if src in BLUR:
        im = redact(im, BLUR[src])
    if src in CROP:
        im = im.crop(CROP[src])
    im = darken(im, src)
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
