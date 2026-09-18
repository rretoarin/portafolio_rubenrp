#!/usr/bin/env python3
"""
Recorta el logotipo de RuberpDev de la lámina de concepto y lo adapta a la web.

    scripts/logo-fuente/refrencia.png   la lámina, tal como la entregó Rubén
    public/logo/*.webp                  las ocho piezas que sirve el sitio

La lámina trae el logotipo resuelto en cuatro cuadrantes —el monograma RD con
su corte rojo y «RuberpDev» debajo—, uno por estilo del sitio. De aquí sale
todo; **no se redibuja nada**. Se intentó reconstruirlo con vectores y se
descartó: la lámina es la referencia aprobada.

La adaptación que hay que hacer, y por qué
------------------------------------------
En la lámina, **azul y verde llevan el logotipo en blanco sobre un fondo de
color** (azul acero y verde salvia). La web no tiene esos fondos: de los cuatro
estilos sólo el oscuro es oscuro, y azul y verde comparten la misma base clara
(#F8F9FA) que el claro —eso lo eligió Rubén y no se toca—. Un logotipo blanco
ahí sería invisible.

Así que en esos dos la tinta se cambia por el **color de marca del estilo**, el
mismo `--color-heading` con el que ya se pintan sus titulares y que ya está
medido en contraste: azul #123F78 (9.92:1) y verde #1B4A33 (9.61:1). Claro y
oscuro se quedan con la tinta de la lámina, que sobre sus fondos ya funciona.

**El corte rojo no se toca en ninguno de los cuatro**: es marca, no interfaz.

Lo demás que importa
--------------------
- **El fondo se despeja de la mezcla, no con un umbral seco.** Cada cuadrante
  tiene el suyo y ninguno es el de la web; un umbral dejaría un halo de ese
  fondo en cada borde antialiaseado, y sobre el negro del estilo oscuro se
  vería.
- **La tinta y el rojo se separan por tono**, no por posición: el rojo tiene el
  canal rojo muy por encima del azul.
- **Los ocho archivos salen a la MISMA caja.** Se consigue llevando el
  monograma de los cuatro al mismo ancho ANTES de recortar y usando una caja
  común. Con la caja de cada uno, el logotipo daba un salto de tamaño al
  cambiar de estilo.
- **Dos piezas por estilo**: el apilado (monograma + nombre) para la barra de
  escritorio, y el monograma solo para móvil y para el pie.

    python scripts/logo.py
"""

from pathlib import Path

import numpy as np
from PIL import Image

RAIZ = Path(__file__).resolve().parent.parent
LAMINA = RAIZ / "scripts" / "logo-fuente" / "refrencia.png"
SALIDA = RAIZ / "public" / "logo"

# Los cuatro cuadrantes de la lámina y, dentro de cada uno, dónde acaba el
# monograma. Medido a píxel sobre la lámina.
#
#   caja  = x0, y0, x1, y1  del apilado entero
#   mono  = y1              última fila del monograma, antes del nombre
ESTILOS = {
    "claro":  {"caja": (200, 157,  575, 379), "mono": 291},
    "oscuro": {"caja": (966, 160, 1343, 378), "mono": 288},
    "azul":   {"caja": (203, 666,  572, 882), "mono": 795},
    "verde":  {"caja": (967, 667, 1342, 883), "mono": 794},
}

# La tinta de cada estilo. `None` = la que trae la lámina.
#
# Azul y verde vienen en blanco sobre fondo de color y la web los tiene sobre
# base clara, así que se tiñen con el color de marca del estilo —el mismo
# `--color-heading` de sus titulares, ya medido en contraste en index.css—.
TINTA = {
    "claro": None,
    "oscuro": None,
    "azul": (0x12, 0x3F, 0x78),   # 9.92:1 sobre #F8F9FA
    "verde": (0x1B, 0x4A, 0x33),  # 9.61:1 sobre #F8F9FA
}

# El monograma de los cuatro se lleva a este ancho antes de recortar, para que
# las ocho piezas salgan a la misma caja.
ANCHO_OBJETIVO = 360.0

# La barra pide 56 de alto en escritorio; en retina hacen falta 112, así que
# con 140 sobra. Lossy a 94: a este tamaño no se distingue del lossless y pesa
# mucho menos.
ALTO_APILADO = 140
CALIDAD = 94

# Por debajo de esto, el píxel es fondo. Ver `despejar()`.
PISO_ALFA = 0.10


def es_acento(rgb):
    """El rojo del corte, separado por tono."""
    r = rgb[..., 0].astype(int)
    b = rgb[..., 2].astype(int)
    g = rgb[..., 1].astype(int)
    return (r - b > 55) & (r - g > 55) & (r > 110)


def despejar(recorte, fondo):
    """
    RGBA con el fondo plano fuera y el color de la tinta recuperado.

    El alfa sale de cuánto se aleja cada píxel del fondo; el color se despeja de
    la mezcla (`p = f·a + fondo·(1-a)`), que es lo que evita el halo del fondo
    original en los bordes antialiaseados.
    """
    p = recorte.astype(np.float64)
    fondo = np.array(fondo, dtype=np.float64)
    dist = np.abs(p - fondo).max(axis=2)
    alfa = np.clip(dist / max(dist.max(), 1.0), 0.0, 1.0)

    # El fondo de la lámina NO es perfectamente plano —es una imagen renderizada
    # y tiene grano—, así que sin suelo el alfa nunca llega a cero y queda un
    # velo del color del cuadrante sobre todo el recorte: una caja crema detrás
    # del logotipo, que sobre el #F8F9FA del sitio se ve. Se corta por debajo del
    # suelo y se reescala lo que queda, para no comerse el antialiasing.
    alfa = np.clip((alfa - PISO_ALFA) / (1.0 - PISO_ALFA), 0.0, 1.0)

    seguro = np.where(alfa[..., None] > 0.004, alfa[..., None], 1.0)
    color = np.clip(fondo + (p - fondo) / seguro, 0, 255)
    salida = np.zeros(p.shape[:2] + (4,), dtype=np.uint8)
    salida[..., :3] = color.astype(np.uint8)
    salida[..., 3] = (alfa * 255).astype(np.uint8)
    return salida


def tenir(rgba, tinta):
    """La tinta a `tinta`; el rojo del corte, intacto."""
    if tinta is None:
        return rgba
    salida = rgba.copy()
    pixeles = ~es_acento(salida[..., :3])
    for i, v in enumerate(tinta):
        canal = salida[..., i]
        canal[pixeles] = v
        salida[..., i] = canal
    return salida


def recortar_alfa(rgba):
    """Ajusta el lienzo a la tinta: sin aire alrededor."""
    ys, xs = np.nonzero(rgba[..., 3] > 6)
    return rgba[ys.min(): ys.max() + 1, xs.min(): xs.max() + 1], (xs.min(), ys.min())


def guardar(im, nombre, alto):
    im = im.resize((max(round(im.width * alto / im.height), 1), alto), Image.LANCZOS)
    ruta = SALIDA / nombre
    im.save(ruta, "WEBP", quality=CALIDAD, method=6)
    print("  %-22s %3dx%-3d  %5.1f kB" % (nombre, im.width, im.height, ruta.stat().st_size / 1024))
    return im.size


def main():
    SALIDA.mkdir(parents=True, exist_ok=True)
    lamina = np.asarray(Image.open(LAMINA).convert("RGB"))
    piezas, medidas = {}, {}

    for estilo, d in ESTILOS.items():
        x0, y0, x1, y1 = d["caja"]
        fondo = tuple(lamina[max(y0 - 14, 0), x0])

        limpio = despejar(lamina[y0:y1, x0:x1], fondo)
        limpio = tenir(limpio, TINTA[estilo])
        limpio, _ = recortar_alfa(limpio)

        # El monograma ocupa la parte de arriba; su ancho es el patrón con el
        # que se igualan los cuatro, porque es la pieza que se usa sola.
        alto_mono = d["mono"] - y0
        mono = limpio[:alto_mono]
        mono, _ = recortar_alfa(mono)

        s = ANCHO_OBJETIVO / mono.shape[1]
        im = Image.fromarray(limpio, "RGBA")
        im = im.resize((round(im.width * s), round(im.height * s)), Image.LANCZOS)
        piezas[estilo] = {"im": im, "mono": round(alto_mono * s)}

    # La caja común: la unión de los cuatro, para que ninguno se recorte y todos
    # compartan lienzo.
    ancho = max(d["im"].width for d in piezas.values())
    alto = max(d["im"].height for d in piezas.values())
    alto_mono = max(d["mono"] for d in piezas.values())

    for estilo, d in piezas.items():
        lienzo = Image.new("RGBA", (ancho, alto), (0, 0, 0, 0))
        lienzo.alpha_composite(d["im"], ((ancho - d["im"].width) // 2, 0))
        medidas[f"apilado-{estilo}"] = guardar(lienzo, f"apilado-{estilo}.webp", ALTO_APILADO)

        icono = lienzo.crop((0, 0, ancho, alto_mono))
        recorte, _ = recortar_alfa(np.asarray(icono))
        icono = Image.new("RGBA", (ancho, alto_mono), (0, 0, 0, 0))
        icono.alpha_composite(lienzo.crop((0, 0, ancho, alto_mono)))
        medidas[f"icono-{estilo}"] = guardar(
            icono, f"icono-{estilo}.webp", round(ALTO_APILADO * alto_mono / alto)
        )

    print()
    print("  aspect-ratio para index.css (tienen que coincidir los cuatro):")
    for n, (w, h) in sorted(medidas.items()):
        print("    %-16s %d / %d   (%.4f)" % (n, w, h, w / h))


if __name__ == "__main__":
    main()
