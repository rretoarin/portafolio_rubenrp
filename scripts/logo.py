# -*- coding: utf-8 -*-
"""
Prepara el isotipo RD de los cuatro estilos para la web.

Las cuatro piezas las dibujó Rubén, una por estilo, y vienen con el fondo de su
estilo pegado (`scripts/logo-fuente/*.png`). Aquí se hacen tres cosas:

1. **Se recorta el fondo.** No con un umbral seco: se calcula cuánto hay de
   tinta y cuánto de acento en cada píxel y se despeja el fondo de la mezcla.
   Así el borde queda suave y sin halo del color del fondo original, que es lo
   que se vería al ponerlo sobre el fondo del sitio —que NO es el mismo: el
   azul y el verde del sitio van sobre #F8F9FA, no sobre el azul y el verde
   claros de estas imágenes—.
2. **Se igualan.** Los cuatro dibujos no miden lo mismo ni están centrados
   igual. Se recortan a su caja, se llevan al mismo alto y se pegan en un lienzo
   común, así que el logotipo NO da un salto al cambiar de estilo.
3. **Se exportan a WebP** con transparencia, a 3x del tamaño en que se ven, que
   es lo que necesita una pantalla retina.

También sale de aquí `public/favicon.svg`, que lleva dentro las piezas clara y
oscura en PNG y cambia con el tema del NAVEGADOR: un archivo estático no ve las
variables de `index.css`, así que es la única copia del dibujo fuera de
`public/logo/`, y se genera para que no haya que mantenerla a mano.

    python scripts/logo.py
"""
from PIL import Image
import numpy as np
import base64
import io
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FUENTE = os.path.join(ROOT, "scripts", "logo-fuente")
SALIDA = os.path.join(ROOT, "public", "logo")
ESTILOS = ("claro", "oscuro", "azul", "verde")

ALTO = 108        # 3x de los 36 px más grandes en que se llega a ver
# Sin aire alrededor: el lienzo es el dibujo. Con margen, la altura que se le
# da en CSS no era la del monograma —se quedaba en un 92%— y al lado de la
# palabra se veía más pequeño de lo que decían los números.
MARGEN = 0


def separa(ruta):
    """
    Devuelve el dibujo en RGBA con el fondo fuera.

    El fondo se toma del borde. Cada píxel se proyecta sobre las dos tintas del
    logotipo —la del trazo y la del acento— y se queda con la proyección mayor:
    ese es su alfa. Con el alfa ya se despeja el color original de la mezcla
    (`c = a*tinta + (1-a)*fondo`), que es lo que quita el halo.
    """
    a = np.asarray(Image.open(ruta).convert("RGB")).astype(float)
    borde = np.concatenate([a[0], a[-1], a[:, 0], a[:, -1]])
    fondo = np.median(borde, 0)

    d = np.linalg.norm(a - fondo, axis=2)
    # Las dos tintas por separado: el acento está MUCHO más cerca del fondo que
    # el trazo, así que un único umbral global se lo come y deja la pierna con
    # medio alfa. Se parte primero por temperatura y se busca el sólido dentro
    # de cada mitad.
    fg = a[d > d.max() * 0.2]
    calido = (fg[:, 0] - fg[:, 2]) > 45
    tintas = []
    for grupo in (fg[~calido], fg[calido]):
        if len(grupo) < 30:
            continue
        dg = np.linalg.norm(grupo - fondo, axis=1)
        tintas.append(np.median(grupo[dg > np.percentile(dg, 80)], 0))
    assert tintas, "No encuentro ninguna tinta en %s" % os.path.basename(ruta)

    alfa = np.zeros(d.shape)
    for tinta in tintas:
        v = tinta - fondo
        alfa = np.maximum(alfa, ((a - fondo) @ v) / (v @ v))
    alfa = np.clip(alfa, 0, 1)
    # El original claro trae una sombra muy suave alrededor. Sin este suelo, la
    # sombra entra en la caja y el dibujo sale un 30% más pequeño que los otros
    # tres al igualar alturas.
    alfa[alfa < 0.12] = 0

    with np.errstate(invalid="ignore", divide="ignore"):
        color = fondo + (a - fondo) / alfa[..., None]
    color = np.nan_to_num(np.clip(color, 0, 255))
    return np.dstack([color, alfa * 255]).astype("uint8")


def recorta(rgba):
    """Caja del dibujo. El umbral es alto a propósito: ver `separa()`."""
    ys, xs = np.where(rgba[..., 3] > 90)
    return rgba[ys.min():ys.max() + 1, xs.min():xs.max() + 1]


piezas = []
for estilo in ESTILOS:
    pieza = recorta(separa(os.path.join(FUENTE, estilo + ".png")))
    im = Image.fromarray(pieza, "RGBA")
    # Todas al mismo alto: es lo que hace que no salte al cambiar de estilo.
    im = im.resize((max(1, round(im.width * ALTO / im.height)), ALTO), Image.LANCZOS)
    piezas.append((estilo, im))

ancho = max(im.width for _, im in piezas)
aire = round(ALTO * MARGEN)
lienzo = (ancho + aire * 2, ALTO + aire * 2)

os.makedirs(SALIDA, exist_ok=True)
for estilo, im in piezas:
    hoja = Image.new("RGBA", lienzo, (0, 0, 0, 0))
    hoja.paste(im, ((lienzo[0] - im.width) // 2, aire), im)
    ruta = os.path.join(SALIDA, estilo + ".webp")
    # WebP con pérdida a 92: sobre estas cuatro piezas es indistinguible del
    # sin pérdida y pesa un tercio. El logotipo entra en la primera pantalla.
    hoja.save(ruta, "WEBP", quality=92, method=6, exact=True)
    print("%-7s %dx%d  %d bytes" % (estilo, hoja.width, hoja.height, os.path.getsize(ruta)))

print("proporción %.4f  (ancho/alto del lienzo)" % (lienzo[0] / lienzo[1]))


# ---------------------------------------------------------------------------
# El favicon, con las piezas dentro.
#
# Va a sangre y sin pastilla: con el recuadro redondeado que tuvo, a 16 px el
# monograma se quedaba en 13 px de ancho y se leía como una mancha.
#
# Lleva la clara y la oscura y elige con `prefers-color-scheme`, así que en una
# pestaña oscura no es el logotipo invertido: es la pieza que Rubén dibujó para
# el estilo oscuro. En PNG y no en WebP porque aquí lo que manda es que lo
# entienda cualquier navegador de los que aceptan favicon SVG (Safari no acepta
# ninguno, así que WebP no pierde nada y pesa un cuarto que PNG).
# ---------------------------------------------------------------------------
FAVICON_ALTO = 64


def incrusta(im):
    chico = im.resize((round(im.width * FAVICON_ALTO / im.height), FAVICON_ALTO), Image.LANCZOS)
    buf = io.BytesIO()
    chico.save(buf, "WEBP", quality=88, method=6, exact=True)
    return base64.b64encode(buf.getvalue()).decode(), chico.width, chico.height


piezas = dict(piezas)
claro, w, h = incrusta(piezas["claro"])
oscuro = incrusta(piezas["oscuro"])[0]
favicon = """<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 %d %d">
  <!-- Generado por scripts/logo.py. No editar a mano: se regenera. -->
  <style>
    .oscuro { display: none }
    @media (prefers-color-scheme: dark) {
      .claro { display: none }
      .oscuro { display: inline }
    }
  </style>
  <image class="claro" width="%d" height="%d" xlink:href="data:image/webp;base64,%s"/>
  <image class="oscuro" width="%d" height="%d" xlink:href="data:image/webp;base64,%s"/>
</svg>
""" % (w, h, w, h, claro, w, h, oscuro)

ruta = os.path.join(ROOT, "public", "favicon.svg")
open(ruta, "w", encoding="utf-8", newline=chr(10)).write(favicon)
print("favicon %dx%d  %d bytes" % (w, h, os.path.getsize(ruta)))
