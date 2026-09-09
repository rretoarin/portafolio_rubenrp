# -*- coding: utf-8 -*-
"""
Genera la variante de cada captura para los estilos que la necesitan, en
`public/proyectos/<estilo>/`.

Dos tratamientos distintos, y ninguno tiñe la captura entera:

**oscuro** — negativo + giro de tono de media vuelta, para TODAS las capturas.
El blanco pasa a negro y el texto negro a blanco sin estropear los acentos.
Invertir sólo el brillo (HSV) parece equivalente y no lo es: apaga los colores y
los gráficos quedan en barro. Sin esto, una captura clara a pantalla completa
deslumbra sobre el fondo negro.

**azul y verde** — se cambia el VERDE DE MARCA de la web de J&M por el color del
estilo: el titular, los botones, el filete del menú y los iconos. Nada más. El
texto negro, los grises, el fondo y las fotos se quedan exactamente como están.
Se probó teñir todos los grises y quedaba mal: la captura entera se volvía azul y
parecía un filtro, no un rediseño.

Las capturas del sistema de Arin no entran en azul ni en verde: no tienen un
color de marca que cambiar, así que en los tres estilos claros son las mismas.

En los dos tratamientos **las zonas de foto se vuelven a pegar en color
original**. Se detectan solas: una casilla de foto tiene decenas de colores
distintos y una de texto, dos. Las que el detector no alcanza van a mano en
`KEEP`. Sin esto, las personas de los talleres de J&M salían en negativo.

Un filtro CSS no sirve para nada de esto: no distingue una foto de una tabla ni
un verde de marca de un verde cualquiera.

Trabaja sobre los WebP ya terminados de `public/proyectos`, no sobre los PNG de
origen: esos van y vienen de `Desktop\\claude`, y esto tiene que poder rehacerse
siempre.

    python scripts/capturas-estilo.py
"""
from PIL import Image, ImageOps
from collections import deque
import numpy as np
import os

SRC = os.path.join(os.path.dirname(__file__), "..", "public", "proyectos")

# Los colores son los `--color-accent` de cada estilo en src/index.css.
ESTILOS = {
    "oscuro": None,               # se invierte entera
    "azul": (0x17, 0x53, 0x9E),   # sólo cambia el verde de marca
    "verde": (0x24, 0x5C, 0x41),
}

# En azul y en verde sólo se tocan las capturas de J&M: son las que tienen un
# color de marca. `jm-movil` incluida.
PREFIJO_MARCA = "jm-"

# Rango de tono del verde de J&M, en grados, y saturación mínima para que un
# píxel cuente como color y no como gris.
VERDE = (95, 175)
SAT_MIN = 0.18

TILE = 16
MIN_COLORS = 26            # colores distintos en una casilla para ser foto
MIN_TILES = 10             # casillas contiguas para que cuente como foto
# Una foto es ancha Y alta. Exigir las dos cosas descarta los renglones de texto
# con antialias de color, que son largos y bajos.
MIN_LADO = 64

# Fotos que el detector no alcanza, en coordenadas de la captura ya terminada.
KEEP = {}


def flip(im):
    """Negativo + giro de tono de media vuelta. Es su propio inverso."""
    hue, sat, val = ImageOps.invert(im).convert("HSV").split()
    return Image.merge("HSV", (hue.point(lambda p: (p + 128) % 256), sat, val)).convert("RGB")


def recolorear(im, destino):
    """Cambia el verde de marca por otro tono, dejando todo lo demás igual.

    Sólo entran los píxeles cuyo TONO cae en el rango del verde y que tienen
    color de verdad: los grises, el texto negro y el fondo no se mueven. Se
    conservan saturación y brillo, así que el degradado del botón y el antialias
    de las letras siguen ahí.
    """
    a = np.asarray(im.convert("RGB"), dtype=np.float32) / 255
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    mx, mn = a.max(2), a.min(2)
    dif = mx - mn
    sat = np.where(mx > 0, dif / np.maximum(mx, 1e-6), 0)

    # Tono en grados, sin recorrer píxel a píxel.
    h = np.zeros_like(mx)
    hay = dif > 1e-6
    sel_r = hay & (mx == r)
    sel_g = hay & (mx == g)
    sel_b = hay & (mx == b)
    h[sel_r] = ((g - b)[sel_r] / dif[sel_r]) % 6
    h[sel_g] = ((b - r)[sel_g] / dif[sel_g]) + 2
    h[sel_b] = ((r - g)[sel_b] / dif[sel_b]) + 4
    h *= 60

    objetivo = np.asarray(destino, dtype=np.float32) / 255
    omx, omn = objetivo.max(), objetivo.min()
    odif = omx - omn
    if odif < 1e-6:
        h_dest = 0.0
    elif omx == objetivo[0]:
        h_dest = (((objetivo[1] - objetivo[2]) / odif) % 6) * 60
    elif omx == objetivo[1]:
        h_dest = (((objetivo[2] - objetivo[0]) / odif) + 2) * 60
    else:
        h_dest = (((objetivo[0] - objetivo[1]) / odif) + 4) * 60

    marca = (h >= VERDE[0]) & (h <= VERDE[1]) & (sat >= SAT_MIN)

    # HSV -> RGB con el tono nuevo, también vectorizado.
    c = mx * sat
    hh = h_dest / 60
    x = c * (1 - abs((hh % 2) - 1))
    m = mx - c
    tramo = int(hh)
    base = {
        0: (c, x, np.zeros_like(c)), 1: (x, c, np.zeros_like(c)),
        2: (np.zeros_like(c), c, x), 3: (np.zeros_like(c), x, c),
        4: (x, np.zeros_like(c), c), 5: (c, np.zeros_like(c), x),
    }[tramo]
    nuevo = np.stack([base[0] + m, base[1] + m, base[2] + m], axis=-1)

    return Image.fromarray((np.where(marca[..., None], nuevo, a) * 255).astype(np.uint8))


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
    for estilo, color in ESTILOS.items():
        destino_dir = os.path.join(SRC, estilo)
        os.makedirs(destino_dir, exist_ok=True)
        print(f"--- {estilo} ---")

        for nombre in sorted(os.listdir(SRC)):
            if not nombre.endswith(".webp"):
                continue
            # En azul y en verde, sólo las capturas con color de marca.
            if color is not None and not nombre.startswith(PREFIJO_MARCA):
                continue

            clara = Image.open(os.path.join(SRC, nombre)).convert("RGB")
            variante = flip(clara) if color is None else recolorear(clara, color)

            # Las fotos no aguantan ni la inversión ni el recoloreado.
            cajas = photo_boxes(clara) + KEEP.get(nombre, [])
            for caja in cajas:
                variante.paste(clara.crop(caja), caja[:2])

            destino = os.path.join(destino_dir, nombre)
            variante.save(destino, "WEBP", quality=82, method=6)
            print(f"{nombre:18} {len(cajas)} foto(s) intacta(s)   "
                  f"{os.path.getsize(destino) // 1024} kB")


if __name__ == "__main__":
    main()
