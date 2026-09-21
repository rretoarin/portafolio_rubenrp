# -*- coding: utf-8 -*-
"""
Prepara las capturas de los casos para `public/proyectos`.

El sitio es blanco y las capturas van claras, tal como salen del navegador: aquí
no se invierte nada (eso lo hacían `shots.py` y `aclarar.py`, de la etapa negra
del sitio). Este script sólo hace tres cosas, en este orden:

1. Difumina los datos de cliente del sistema de Arin S.A. — es una herramienta
   interna y esos nombres no pueden salir en un sitio público. La web de J&M es
   pública, así que sus capturas no se tocan.
2. Recorta el espacio muerto: márgenes en blanco y paneles cortados a media
   altura. El recorte va DESPUÉS del difuminado, así las coordenadas de `BLUR`
   son siempre las del PNG original.
3. Exporta a WebP con un tope de ancho, sin marco ni relleno: la ventana la pone
   `<Frame>` y el encuadre lo resuelve el `object-cover` del bento.

    python scripts/capturas.py
"""
from PIL import Image, ImageFilter
import os

SRC = r"C:\Users\pruebas03\Desktop\claude"
OUT = os.path.join(os.path.dirname(__file__), "..", "public", "proyectos")

MAX_W = 1600  # tope de ancho, sólo por peso del archivo

# --- Difuminado --------------------------------------------------------------
# Zonas con datos de cliente o de personas, en píxeles del PNG original:
# (x0, y0, x1, y1). Sólo el sistema de Arin. Si se vuelve a capturar la misma
# pantalla hay que recalcularlas: van por coordenadas, no por contenido.


def _filas(x0, x1, y0, alto, paso, veces):
    """Misma caja repetida por fila de tabla — las tablas tienen paso fijo."""
    return [(x0, round(y0 + i * paso), x1, round(y0 + i * paso) + alto) for i in range(veces)]


BLUR = {
    # Panel: la columna "Cliente" de los últimos productos creados.
    "muestras/imagen1.png": [(875, 658, 1190, 828)],
    # Listado: el cliente en la línea de especificación y el diseñador que firma
    # la creación, una vez por fila.
    "muestras/imagen2 .png": (
        _filas(357, 443, 282, 21, 88.7, 7) + _filas(1174, 1276, 295, 20, 88.7, 7)
    ),
    # Ficha: quién la creó, las tres aprobaciones finales, el cliente del
    # formulario y el cliente repetido en el listado que se ve por detrás.
    "muestras/iamgen 6.png": [
        (830, 146, 932, 168),
        (588, 235, 706, 257),
        (588, 268, 706, 290),
        (588, 301, 706, 323),
        (586, 466, 702, 492),
    ] + _filas(357, 443, 298, 21, 89.3, 7),
}

# --- Recortes ----------------------------------------------------------------
# Espacio muerto: márgenes en blanco y bloques cortados por la mitad al final de
# la captura. Coordenadas del PNG original.
CROP = {
    "muestras/imagen 4.png": (40, 0, 1090, 478),    # el formulario de feriados, sin el blanco de abajo
    "muestras/imagen 7.png": (48, 0, 1180, 420),    # la rejilla de reportes, sin el blanco de abajo
    "muestras/imagen 8.png": (0, 0, 1108, 648),     # sin el panel de clientes cortado a media altura
    "pagina web/imagen 2.png": (0, 0, 1192, 901),   # sin la franja blanca de la derecha
    "pagina web/iamgen 4.png": (0, 0, 1257, 396),   # sólo los sectores, sin la sección cortada
    # Arriba asomaba media fila de la sección anterior y abajo sobraba blanco:
    # queda sólo el carrusel de clientes, de borde a borde.
    "pagina web/imagen 6.png": (0, 190, 1148, 692),
}

# --- Orden de salida ---------------------------------------------------------
# El índice manda: cada nombre se empareja por posición con `shots` de
# `content.js`. Las tres primeras son las que enseña el bento sin abrir el visor.
SALIDA = [
    ("muestras/imagen1.png",       "muestras-1"),  # panel general
    ("muestras/imagen2 .png",      "muestras-2"),  # listado de diseños
    ("muestras/imagen 9.png",      "muestras-3"),  # calendario de cierres
    ("muestras/iamgen 6.png",      "muestras-4"),  # ficha del diseño
    ("muestras/imagen 3.png",      "muestras-5"),  # vencimiento de muestras
    ("muestras/imagen 8.png",      "muestras-6"),  # reporte de muestras
    ("muestras/imagen 4.png",      "muestras-7"),  # feriados
    ("muestras/imagen 7.png",      "muestras-8"),  # índice de reportes
    ("pagina web/iamgen 1.png",    "jm-1"),        # portada
    ("pagina web/imagen 3.png",    "jm-2"),        # servicios
    ("pagina web/imagen 5.png",    "jm-3"),        # capacitaciones
    ("pagina web/imagen 2.png",    "jm-4"),        # proceso
    ("pagina web/iamgen 4.png",    "jm-5"),        # sectores
    ("pagina web/imagen 6.png",    "jm-6"),        # clientes
]


def redact(im, cajas):
    """Pixela y desenfoca: el texto no se reconstruye ni ampliando la imagen."""
    for caja in cajas:
        region = im.crop(caja)
        w, h = region.size
        chico = region.resize((max(1, w // 14), max(1, h // 8)), Image.BILINEAR)
        region = chico.resize((w, h), Image.NEAREST).filter(ImageFilter.GaussianBlur(3))
        im.paste(region, caja)
    return im


def main():
    os.makedirs(OUT, exist_ok=True)
    for origen, nombre in SALIDA:
        ruta = os.path.join(SRC, *origen.split("/"))
        im = Image.open(ruta).convert("RGB")

        if origen in BLUR:
            im = redact(im, BLUR[origen])
        if origen in CROP:
            im = im.crop(CROP[origen])

        if im.width > MAX_W:
            im = im.resize((MAX_W, round(im.height * MAX_W / im.width)), Image.LANCZOS)

        destino = os.path.join(OUT, f"{nombre}.webp")
        im.save(destino, "WEBP", quality=82, method=6)
        print(f"{nombre:12} {im.width}x{im.height}  <- {origen}")


if __name__ == "__main__":
    main()
