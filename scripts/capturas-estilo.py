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
from PIL import Image, ImageDraw, ImageOps
from collections import deque
import numpy as np
import os

SRC = os.path.join(os.path.dirname(__file__), "..", "public", "proyectos")

# Los colores son los `--color-accent` de cada estilo en src/index.css.
#
# Rediseño v2: sólo quedan claro y oscuro. El tratamiento de azul y verde se
# conserva abajo por si vuelve, pero ya no se genera.
ESTILOS = {
    "oscuro": None,               # se invierte entera
}

# En azul y en verde sólo se tocan las capturas de J&M: son las que tienen un
# color de marca.
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

# Fotos que NO se invierten, en coordenadas de la captura ya terminada. Van a
# mano: el detector automático (`photo_boxes`) dejaba franjas blancas, fotos a
# medias y se saltaba las de fondo blanco (el equipo de «Nosotros»). Dentro de
# cada caja, el blanco que toca el borde se trata como fondo y se invierte con
# el resto de la página: así se respetan las esquinas redondeadas, la onda de
# la portada y el fondo blanco de los retratos.
FOTOS = {
    # (caja, forma, radio, bordes desde los que se busca fondo blanco)
    "jm-1.webp": [((589, 169, 1137, 508), "round", 28, ("bottom",))],       # portada: la onda de abajo
    "jm-3.webp": [((41, 433, 392, 630), "top", 16, ("bottom",)),             # servicios: la placa del
                  ((422, 433, 773, 630), "top", 16, ("bottom",)),            # icono toca el borde de
                  ((803, 433, 1155, 630), "top", 16, ("bottom",))],          # abajo y es fondo
    "jm-5.webp": [((634, 182, 1158, 530), "round", 22, ("top", "bottom", "left", "right")),  # equipo
                  ((659, 609, 739, 689), "circle", 0, ())],                  # consultora
    "jm-6.webp": [((x, 440, x + 207, 716), "round", 18, ()) for x in (25, 252, 479, 706, 933)],  # talleres
    "jm-8.webp": [((40, 405, 1140, 530), "rect", 0, ("top", "bottom", "left", "right"))],     # logos
    "muestras-1.webp": [((39, 92, 86, 139), "circle", 0, ())],               # avatar del panel
}
BLANCO = 245   # un píxel con los tres canales por encima cuenta como fondo


def mascara_foto(recorte, forma, radio, bordes):
    """255 = foto (se conserva); 0 = se invierte con el resto de la página.

    La forma recorta las esquinas (redondeadas o en círculo). Además, el
    blanco conectado a los `bordes` indicados es fondo de la página, no foto.
    Sólo desde esos bordes: si se busca desde todos, el relleno se cuela por
    los blancos de la propia foto (batas, cascos, estanterías).
    """
    w, h = recorte.size
    forma_m = Image.new("L", (w, h), 0)
    d = ImageDraw.Draw(forma_m)
    if forma == "circle":
        d.ellipse((0, 0, w - 1, h - 1), fill=255)
    elif forma == "round":
        d.rounded_rectangle((0, 0, w - 1, h - 1), radius=radio, fill=255)
    elif forma == "top":
        d.rounded_rectangle((0, 0, w - 1, h - 1 + radio), radius=radio, fill=255)
    else:
        d.rectangle((0, 0, w - 1, h - 1), fill=255)
    if not bordes:
        return forma_m

    px = recorte.load()
    marca = Image.new("L", (w, h), 0)
    m = marca.load()
    for y in range(h):
        for x in range(w):
            r, g, b = px[x, y]
            if r >= BLANCO and g >= BLANCO and b >= BLANCO:
                m[x, y] = 255
    semillas = []
    if "top" in bordes:
        semillas += [(x, 0) for x in range(w)]
    if "bottom" in bordes:
        semillas += [(x, h - 1) for x in range(w)]
    if "left" in bordes:
        semillas += [(0, y) for y in range(h)]
    if "right" in bordes:
        semillas += [(w - 1, y) for y in range(h)]
    for x, y in semillas:
        if m[x, y] == 255:
            ImageDraw.floodfill(marca, (x, y), 128)
    foto = marca.point(lambda v: 0 if v == 128 else 255)
    return Image.composite(foto, Image.new("L", (w, h), 0), forma_m)


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
            # Las reducidas (`@560w`) se sacan después de cada tema, no se invierten.
            if not nombre.endswith(".webp") or "@" in nombre:
                continue
            # En azul y en verde, sólo las capturas con color de marca.
            if color is not None and not nombre.startswith(PREFIJO_MARCA):
                continue

            clara = Image.open(os.path.join(SRC, nombre)).convert("RGB")
            variante = flip(clara) if color is None else recolorear(clara, color)

            # Las fotos no aguantan ni la inversión ni el recoloreado.
            cajas = FOTOS.get(nombre, [])
            for caja, forma, radio, bordes in cajas:
                recorte = clara.crop(caja)
                variante.paste(recorte, caja[:2], mascara_foto(recorte, forma, radio, bordes))

            destino = os.path.join(destino_dir, nombre)
            variante.save(destino, "WEBP", quality=CALIDAD, method=6)
            print(f"{nombre:18} {len(cajas)} foto(s) intacta(s)   "
                  f"{os.path.getsize(destino) // 1024} kB")


# --- Tamaños para `srcset` ----------------------------------------------------
# En la página las capturas se pintan a 260–680 px de ancho y los archivos miden
# 900–1600: el navegador las reducía 2–5 veces y, como van dentro de capas con
# `transform` (el volteo del carrusel, el mazo del hero), esa reducción la hace
# la GPU con un filtro rápido y blando. Por eso se veían sin nitidez. Aquí se
# exportan ya reducidas con Lanczos y `srcset` elige la más cercana al tamaño
# real × la densidad de la pantalla: la reducción que queda es de 1–1,4x.
#
# NO se enfoca después de reducir: con texto pequeño se come el antialiasing
# (ver lo que se probó con el logo en CLAUDE.md).
ANCHOS = (400, 560, 800, 1120)
CALIDAD = 86
TAMANOS_JSON = os.path.join(os.path.dirname(__file__), "..", "src", "data", "capturas.json")


def reducidas():
    """`nombre@560w.webp` y compañía, en claro y en oscuro, y el JSON de anchos."""
    import json
    tamanos = {}
    for carpeta in (SRC, os.path.join(SRC, "oscuro")):
        for viejo in os.listdir(carpeta):
            if "@" in viejo and viejo.endswith(".webp"):
                os.remove(os.path.join(carpeta, viejo))
        for nombre in sorted(os.listdir(carpeta)):
            if not nombre.endswith(".webp"):
                continue
            im = Image.open(os.path.join(carpeta, nombre)).convert("RGB")
            anchos = [w for w in ANCHOS if w < im.width]
            for w in anchos:
                h = round(im.height * w / im.width)
                base = nombre[:-5]
                im.resize((w, h), Image.LANCZOS).save(
                    os.path.join(carpeta, f"{base}@{w}w.webp"), "WEBP", quality=CALIDAD, method=6)
            # Claro y oscuro salen del mismo tamaño: basta con apuntarlo una vez.
            tamanos[nombre[:-5]] = anchos + [im.width]
    with open(TAMANOS_JSON, "w", encoding="utf-8") as f:
        json.dump(tamanos, f, indent=2, sort_keys=True)
        f.write("\n")
    print(f"--- reducidas: {len(tamanos)} capturas, anchos {ANCHOS} + el original ---")


if __name__ == "__main__":
    main()
    reducidas()
