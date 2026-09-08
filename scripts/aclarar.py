# -*- coding: utf-8 -*-
"""
Devuelve las capturas de los proyectos a su aspecto claro original.

`shots.py` las oscureció para el sitio en negro: negativo + giro de tono de
media vuelta. Las dos operaciones son involuciones, así que aplicarlas otra vez
restaura el original — salvo en las zonas de foto, que `darken()` volvía a pegar
en color real y que aquí hay que dejar tal cual están.

Los PNG originales ya no existen, así que esto trabaja sobre los propios WebP.
Escribe en un directorio aparte: no pisa nada hasta que se compruebe a ojo.

    python scripts/aclarar.py
"""
from PIL import Image, ImageOps
from collections import deque
import os

SRC = os.path.join(os.path.dirname(__file__), "..", "public", "proyectos")
OUT = os.path.join(os.path.dirname(__file__), "..", "public", "proyectos-claro")

TILE = 16
MIN_COLORS = 26            # colores distintos en una casilla para ser foto
MIN_TILES = 12             # casillas seguidas para que cuente como foto
# El detector de `shots.py` corría sobre el PNG original; aquí corre sobre una
# imagen ya procesada y se traga líneas de texto con antialias de color. Una
# foto de verdad es ancha Y alta: exigir las dos cosas descarta los renglones,
# que son largos y bajos. Sin esto salen bandas negras sobre el texto.
MIN_LADO = 96              # píxeles mínimos de ancho y de alto de una foto

# La captura 6 de J&M no se oscureció entera: su sección de contacto ya era
# verde oscuro y `shots.py` sólo invirtió dos bloques suyos (INVERT_ONLY). No
# tiene reverso automático, se trata a mano.
SALTAR = {"jm-6.webp"}


def flip(im):
    """El mismo negativo + giro de tono de `darken()`. Es su propio inverso."""
    hue, sat, val = ImageOps.invert(im).convert("HSV").split()
    return Image.merge("HSV", (hue.point(lambda p: (p + 128) % 256), sat, val)).convert("RGB")


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
            if n < MIN_TILES:
                continue
            caja = (x0 * TILE, y0 * TILE,
                    min(im.width, (x1 + 1) * TILE),
                    min(im.height, (y1 + 1) * TILE))
            if caja[2] - caja[0] >= MIN_LADO and caja[3] - caja[1] >= MIN_LADO:
                boxes.append(caja)
    return boxes


os.makedirs(OUT, exist_ok=True)
for name in sorted(os.listdir(SRC)):
    if not name.endswith(".webp"):
        continue
    actual = Image.open(os.path.join(SRC, name)).convert("RGB")

    if name in SALTAR:
        actual.save(os.path.join(OUT, name), "WEBP", quality=82, method=6)
        print(f"{name:16} sin tocar (INVERT_ONLY)")
        continue

    claro = flip(actual)
    # En `claro` todo es el original menos las fotos, que quedaron en negativo.
    # `actual` sí las tiene bien: se pegan de vuelta desde ahí.
    cajas = photo_boxes(claro)
    for caja in cajas:
        claro.paste(actual.crop(caja), caja[:2])

    claro.save(os.path.join(OUT, name), "WEBP", quality=82, method=6)
    gris = claro.convert("L")
    brillo = sum(gris.get_flattened_data()) / (gris.width * gris.height)
    print(f"{name:16} {len(cajas)} zona(s) de foto restauradas   brillo {brillo:5.1f}")
