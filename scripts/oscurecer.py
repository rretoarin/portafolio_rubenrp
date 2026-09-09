# -*- coding: utf-8 -*-
"""
Genera la variante oscura de cada captura, en `public/proyectos/oscuro/`.

En el estilo oscuro una captura clara a pantalla completa deslumbra y rompe la
página. **Un filtro CSS no basta**: `invert()` a secas apaga los colores de marca
—un botón naranja acaba marrón— y, sobre todo, deja las FOTOS en negativo. Eso es
inaceptable cuando el pie del caso dice "capturas reales del sitio publicado, tal
como se ve hoy": la gente saldría con la piel invertida.

La receta que sí funciona, heredada de la etapa negra del sitio:

  1. negativo + giro de tono de media vuelta — el blanco pasa a negro y el texto
     negro a blanco, sin estropear los acentos. Invertir sólo el brillo (HSV)
     parece equivalente y no lo es: apaga los colores y los gráficos quedan en
     barro.
  2. las zonas de foto se vuelven a pegar en color original.

Las fotos se detectan solas: una casilla de foto tiene decenas de colores
distintos y una de texto, dos. Las que el detector no alcanza van a mano en
`KEEP`.

Trabaja sobre los WebP ya terminados de `public/proyectos`, no sobre los PNG de
origen: esos van y vienen de `Desktop\\claude`, y esto tiene que poder rehacerse
siempre.

    python scripts/oscurecer.py
"""
from PIL import Image, ImageOps
from collections import deque
import os

SRC = os.path.join(os.path.dirname(__file__), "..", "public", "proyectos")
OUT = os.path.join(SRC, "oscuro")

TILE = 16
MIN_COLORS = 26            # colores distintos en una casilla para ser foto
MIN_TILES = 10             # casillas contiguas para que cuente como foto
# Una foto es ancha Y alta. Exigir las dos cosas descarta los renglones de texto
# con antialias de color, que son largos y bajos: sin esto salen bandas claras
# sobre el texto.
MIN_LADO = 64

# Fotos que el detector no alcanza, en coordenadas de la captura ya terminada.
# Se rellenan mirando el resultado, no adivinando.
KEEP = {}

# Capturas que NO se invierten porque ya son oscuras de origen. Ninguna por
# ahora; queda el gancho, que en la etapa anterior sí hizo falta.
SALTAR = set()


def flip(im):
    """Negativo + giro de tono de media vuelta. Es su propio inverso."""
    hue, sat, val = ImageOps.invert(im).convert("HSV").split()
    return Image.merge("HSV", (hue.point(lambda p: (p + 128) % 256), sat, val)).convert("RGB")


def photo_boxes(im):
    """Rectángulos que parecen foto, por variedad de color en cada casilla."""
    w, h = im.width // TILE, im.height // TILE
    px = im.load()
    rica = [[0] * w for _ in range(h)]
    for ty in range(h):
        for tx in range(w):
            vistos = set()
            for y in range(ty * TILE, ty * TILE + TILE, 2):
                for x in range(tx * TILE, tx * TILE + TILE, 2):
                    r, g, b = px[x, y]
                    vistos.add((r >> 3, g >> 3, b >> 3))
            rica[ty][tx] = 1 if len(vistos) >= MIN_COLORS else 0

    cajas, visto = [], [[False] * w for _ in range(h)]
    for ty in range(h):
        for tx in range(w):
            if not rica[ty][tx] or visto[ty][tx]:
                continue
            cola = deque([(tx, ty)])
            visto[ty][tx] = True
            x0 = x1 = tx
            y0 = y1 = ty
            n = 0
            while cola:
                cx, cy = cola.popleft()
                n += 1
                x0, x1 = min(x0, cx), max(x1, cx)
                y0, y1 = min(y0, cy), max(y1, cy)
                for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1),
                               (1, 1), (-1, -1), (1, -1), (-1, 1)):
                    nx, ny = cx + dx, cy + dy
                    if 0 <= nx < w and 0 <= ny < h and not visto[ny][nx] and rica[ny][nx]:
                        visto[ny][nx] = True
                        cola.append((nx, ny))
            if n < MIN_TILES:
                continue
            caja = (x0 * TILE, y0 * TILE,
                    min(im.width, (x1 + 1) * TILE),
                    min(im.height, (y1 + 1) * TILE))
            if caja[2] - caja[0] >= MIN_LADO and caja[3] - caja[1] >= MIN_LADO:
                cajas.append(caja)
    return cajas


def main():
    os.makedirs(OUT, exist_ok=True)
    for nombre in sorted(os.listdir(SRC)):
        if not nombre.endswith(".webp"):
            continue

        clara = Image.open(os.path.join(SRC, nombre)).convert("RGB")

        if nombre in SALTAR:
            clara.save(os.path.join(OUT, nombre), "WEBP", quality=82, method=6)
            print(f"{nombre:18} sin invertir")
            continue

        oscura = flip(clara)
        cajas = photo_boxes(clara) + KEEP.get(nombre, [])
        for caja in cajas:
            oscura.paste(clara.crop(caja), caja[:2])

        destino = os.path.join(OUT, nombre)
        oscura.save(destino, "WEBP", quality=82, method=6)

        gris = oscura.convert("L")
        brillo = sum(gris.tobytes()) / (gris.width * gris.height)
        print(f"{nombre:18} {len(cajas)} foto(s) preservada(s)   brillo {brillo:5.1f}"
              f"   {os.path.getsize(destino) // 1024} kB")


if __name__ == "__main__":
    main()
