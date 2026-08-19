# -*- coding: utf-8 -*-
"""
Prepara las capturas de los proyectos para el carrusel del portafolio.

Toma los PNG originales de Desktop\\claude, difumina los datos confidenciales
del cliente, los normaliza a un marco 16:10 uniforme (si no, el carrusel
saltaría de alto en cada paso) y los exporta a public/proyectos como WebP.

    python scripts/shots.py
"""
from PIL import Image, ImageFilter
import os

SRC = r"C:\Users\pruebas03\Desktop\claude"
OUT = r"C:\Users\pruebas03\Desktop\PORTAFOLIO\public\proyectos"

W, H = 1600, 1000          # marco 16:10 uniforme
PAD = 30
MAT = (16, 14, 12)         # --color-surface #100e0c
EDGE = (34, 31, 27)        # --color-line #221f1b

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

JM = [
    ("jm-consulting.png",   "jm-1"),
    ("jm-consulting_1.png", "jm-2"),
    ("jm-consulting_2.png", "jm-3"),
    ("jm-consulting_3.png", "jm-4"),
    ("jm-consulting_5.png", "jm-5"),
    ("jm-consulting_6.png", "jm-6"),
]
MU = [
    ("sistema_muestras.png",    "muestras-1"),
    ("sistema_muestras_5.png",  "muestras-2"),
    ("sistema_muestras_6.png",  "muestras-3"),
    ("sistema_muestras_7.png",  "muestras-4"),
    ("sistema_muestras_8.png",  "muestras-5"),
    ("sistema_muestras_9.png",  "muestras-6"),
    ("sistema_muestras_2.png",  "muestras-7"),
    ("sistema_muestras_3.png",  "muestras-8"),
    ("sistema_muestras_10.png", "muestras-9"),
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


total = 0
for src, name in JM + MU:
    im = Image.open(os.path.join(SRC, src)).convert("RGB")

    boxes = BLUR.get(src)
    if boxes:
        im = redact(im, boxes)

    box_w, box_h = W - PAD * 2, H - PAD * 2
    scale = min(box_w / im.width, box_h / im.height, 1.0)
    w, h = round(im.width * scale), round(im.height * scale)
    im = im.resize((w, h), Image.LANCZOS)

    canvas = Image.new("RGB", (W, H), MAT)
    x, y = (W - w) // 2, (H - h) // 2
    # Filete de 1px para separar la captura clara del mate oscuro.
    canvas.paste(Image.new("RGB", (w + 2, h + 2), EDGE), (x - 1, y - 1))
    canvas.paste(im, (x, y))

    dest = os.path.join(OUT, name + ".webp")
    canvas.save(dest, "WEBP", quality=82, method=6)
    kb = os.path.getsize(dest) / 1024
    total += kb
    flag = "  [difuminado]" if boxes else ""
    print(f"{name}.webp  {kb:6.1f} KB   <- {src}{flag}")

print(f"\n{len(JM) + len(MU)} imagenes, {total / 1024:.2f} MB")
