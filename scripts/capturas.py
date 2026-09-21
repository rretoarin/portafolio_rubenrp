# -*- coding: utf-8 -*-
"""
Prepara las capturas de los casos para `public/proyectos`.

Las capturas van claras, tal como salen del navegador; la variante del tema
oscuro la genera después `capturas-estilo.py`. Este script hace, en orden:

1. Protege los datos del sistema de Arin S.A. — es una herramienta interna:
   los nombres de clientes (en su columna y dentro del nombre de cada producto)
   y los de los usuarios del sistema se pixelan. La web de J&M es pública, así
   que sus capturas no se tocan.
2. Recorta el espacio muerto: márgenes en blanco a la derecha o abajo. El
   recorte va DESPUÉS del pixelado, así las coordenadas de `BLUR` son siempre
   las del PNG original.
3. Pone una marca de agua en diagonal, tenue y repetida, sobre TODAS las
   capturas de Arin: deja claro que es material protegido y desanima a
   reutilizarlas fuera del sitio.
4. Exporta a WebP con un tope de ancho.

    python scripts/capturas.py
    python scripts/capturas-estilo.py   # y después, la variante oscura y las reducidas
"""
from PIL import Image, ImageDraw, ImageFilter, ImageFont
import os

SRC = r"C:\Users\pruebas03\Desktop\claude"
OUT = os.path.join(os.path.dirname(__file__), "..", "public", "proyectos")

MAX_W = 1600  # tope de ancho, sólo por peso del archivo

# --- Datos protegidos --------------------------------------------------------
# Cajas (x0, y0, x1, y1) en píxeles del PNG original. Las localizó el OCR de
# Windows (Windows.Media.Ocr) palabra por palabra: nombres de clientes (ANRA,
# ANOMARI, Metgold / MG, MTM & SONS, SPARTA) y de usuarios. El saludo del panel
# («Buenas tardes, Ruben Reto») se deja: es el propio Rubén.
# Si se vuelve a capturar la misma pantalla hay que recalcularlas: van por
# coordenadas, no por contenido.
PAD = 4

BLUR = {
    # Panel: la columna Cliente y el cliente metido en el nombre del producto.
    "arin muestras/imagen 1.png": [
        (512, 629, 545, 638), (512, 664, 545, 673),
        (512, 698, 560, 707),  # «Metgold»: el OCR no lo leyó
        (512, 732, 642, 741), (512, 767, 554, 776),
        (107, 629, 166, 638), (100, 664, 159, 673),
        (64, 698, 84, 707), (64, 767, 99, 779),
    ],
    # Listado: el cliente en el nombre y en la línea de debajo, y el diseñador
    # que firma la creación, fila por fila.
    "arin muestras/imagen 2.png": [
        (193, 239, 254, 248), (148, 254, 180, 263),
        (186, 338, 246, 347), (148, 353, 180, 362),
        (149, 437, 169, 446), (149, 452, 192, 464),
        (149, 551, 272, 560),
        (148, 635, 184, 647), (149, 650, 188, 659),
        (148, 726, 184, 738), (146, 740, 425, 752),
        (1037, 262, 1107, 270), (1037, 361, 1107, 369),
        (1037, 459, 1113, 468), (1037, 559, 1107, 567),
        (1037, 657, 1113, 666),
    ],
    # Ficha: quién la creó, quién hizo el cambio, y el cliente (MG / Metgold)
    # del listado que asoma por detrás.
    "arin muestras/imagen 4.png": [
        (797, 157, 894, 167), (554, 466, 654, 476),
        (379, 327, 399, 336), (379, 342, 422, 354),
        (379, 435, 399, 444), (379, 450, 422, 462),
        (379, 543, 399, 552), (379, 558, 422, 570),
        (379, 651, 399, 660), (379, 667, 422, 679),
        (379, 752, 399, 761), (379, 767, 422, 779),
    ],
    # Diseños por semana: diseñadores en el resumen y en el eje del gráfico.
    "arin muestras/imagen 6.png": [
        (977, 117, 1054, 126), (977, 142, 1060, 151),
        (102, 602, 178, 611), (1099, 602, 1181, 611),
    ],
    # Por diseñador: la tabla y la leyenda del gráfico.
    "arin muestras/iamgen 8.png": [
        (41, 334, 129, 344), (41, 360, 129, 370), (42, 386, 120, 399),
        (368, 810, 456, 823), (483, 810, 573, 820), (599, 810, 699, 820),
    ],
}

# --- Recortes ----------------------------------------------------------------
# Espacio muerto: márgenes en blanco a la derecha o abajo. Coordenadas del PNG
# original.
CROP = {
    "arin muestras/imagen 3.png": (0, 0, 1060, 490),    # feriados, sin el blanco de abajo
    "arin muestras/imagen 5.png": (0, 0, 1620, 440),    # reportes, sin el blanco de abajo
    "arin muestras/imagen 6.png": (0, 0, 1235, 660),    # sin el blanco de la derecha
    "arin muestras/imagen 7.png": (0, 0, 960, 826),     # sin el blanco de la derecha
    "web/imagen 2.png": (0, 0, 1263, 560),              # proceso, sin el blanco de abajo
}

# --- Orden de salida ---------------------------------------------------------
# El índice manda: cada nombre se empareja por posición con `shots` de
# `content.js`. La primera de cada proyecto es la que enseña el visor del hero.
SALIDA = [
    ("arin muestras/imagen 1.png",  "muestras-1"),   # panel general
    ("arin muestras/imagen 2.png",  "muestras-2"),   # listado de diseños
    ("arin muestras/imagen 11.png", "muestras-3"),   # calendario de cierres
    ("arin muestras/imagen 4.png",  "muestras-4"),   # ficha e historial
    ("arin muestras/imagen 10.png", "muestras-5"),   # vencimiento de muestras
    ("arin muestras/imagen 9.png",  "muestras-6"),   # reprogramaciones
    ("arin muestras/imagen 3.png",  "muestras-7"),   # feriados
    ("arin muestras/imagen 5.png",  "muestras-8"),   # índice de reportes
    ("arin muestras/imagen 6.png",  "muestras-9"),   # diseños por semana
    ("arin muestras/imagen 7.png",  "muestras-10"),  # diseños por mes
    ("arin muestras/iamgen 8.png",  "muestras-11"),  # por diseñador
    ("web/imagen 1.png",            "jm-1"),         # portada
    ("web/imagen 2.png",            "jm-2"),         # proceso
    ("web/imagen 3.png",            "jm-3"),         # servicios
    ("web/imagen 4.png",            "jm-4"),         # sectores
    ("web/imagen 5.png",            "jm-5"),         # nosotros
    ("web/imagen 6.png",            "jm-6"),         # capacitaciones
    ("web/imagen 7.png",            "jm-7"),         # contacto
    ("web/imagen 8.png",            "jm-8"),         # clientes
]

# --- Marca de agua -----------------------------------------------------------
MARCA = "RuberpDev  ·  datos protegidos"
MARCA_FUENTE = r"C:\Windows\Fonts\segoeuib.ttf"
MARCA_COLOR = (120, 126, 134)   # gris medio: se ve en el claro y, invertido, en el oscuro
MARCA_ALFA = 30                 # de 255: tenue, no tapa la interfaz
MARCA_ANGULO = 24


def redact(im, cajas):
    """Pixela y desenfoca: el texto no se reconstruye ni ampliando la imagen."""
    for x0, y0, x1, y1 in cajas:
        caja = (max(0, x0 - PAD), max(0, y0 - PAD), min(im.width, x1 + PAD), min(im.height, y1 + PAD))
        region = im.crop(caja)
        w, h = region.size
        chico = region.resize((max(1, w // 10), max(1, h // 6)), Image.BILINEAR)
        region = chico.resize((w, h), Image.NEAREST).filter(ImageFilter.GaussianBlur(3))
        im.paste(region, caja)
    return im


def watermark(im):
    """La frase repetida en diagonal por toda la captura, en un gris tenue."""
    w, h = im.size
    tam = max(14, round(w / 55))
    fuente = ImageFont.truetype(MARCA_FUENTE, tam)
    # Se dibuja en una capa más grande que la imagen, se gira y se recorta al
    # centro: así la trama cubre también las esquinas.
    lado = int((w ** 2 + h ** 2) ** 0.5) + tam * 4
    capa = Image.new("RGBA", (lado, lado), (0, 0, 0, 0))
    d = ImageDraw.Draw(capa)
    ancho_txt = d.textlength(MARCA, font=fuente)
    paso_x = int(ancho_txt + tam * 4)
    paso_y = tam * 7
    for fila, y in enumerate(range(0, lado, paso_y)):
        desfase = (paso_x // 2) * (fila % 2)
        for x in range(-paso_x + desfase, lado, paso_x):
            d.text((x, y), MARCA, font=fuente, fill=MARCA_COLOR + (MARCA_ALFA,))
    capa = capa.rotate(MARCA_ANGULO, resample=Image.BICUBIC)
    izq, arr = (lado - w) // 2, (lado - h) // 2
    capa = capa.crop((izq, arr, izq + w, arr + h))
    base = im.convert("RGBA")
    base.alpha_composite(capa)
    return base.convert("RGB")


def main():
    os.makedirs(OUT, exist_ok=True)
    for origen, nombre in SALIDA:
        ruta = os.path.join(SRC, *origen.split("/"))
        im = Image.open(ruta).convert("RGB")

        if origen in BLUR:
            im = redact(im, BLUR[origen])
        if origen in CROP:
            im = im.crop(CROP[origen])
        if origen.startswith("arin muestras/"):
            im = watermark(im)

        if im.width > MAX_W:
            im = im.resize((MAX_W, round(im.height * MAX_W / im.width)), Image.LANCZOS)

        destino = os.path.join(OUT, f"{nombre}.webp")
        im.save(destino, "WEBP", quality=86, method=6)
        print(f"{nombre:12} {im.width}x{im.height}  <- {origen}")


if __name__ == "__main__":
    main()
