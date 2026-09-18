#!/usr/bin/env python3
"""
Monta el logotipo de RuberpDev: la lámina de concepto + el monograma de Rubén.

Qué hace, y por qué así
-----------------------
La lámina (`scripts/logo-fuente/refrencia.png`) trae el logotipo resuelto en
los CUATRO estilos del sitio —claro, oscuro, azul y verde—, cada uno con su
tinta y su fondo. De ahí sale todo menos una cosa: el «RD» de dentro del
círculo, que en la lámina es tipografía y tiene que ser **el monograma dibujado
a mano por Rubén** (`scripts/logo-fuente/*.png` → `public/logo/<estilo>.webp`),
que es la marca de verdad: la R sin asta entera y la D reducida a su arco, con
la pierna de la R en terracota.

Así que este script, por cada estilo:

  1. Recorta su cuadrante de la lámina, del borde del círculo a justo debajo
     del subrayado del nombre.
  2. Despeja el fondo de la mezcla para que quede alfa limpio.
  3. Vacía el interior del círculo —sin tocar el filete ni la rayita de
     terracota— y pega encima el monograma de Rubén, recoloreado a la tinta de
     ese estilo.
  4. Exporta el apilado y el círculo suelto.

Decisiones que no son cosméticas
--------------------------------
- **El lema «IDEAS · SOLUCIONES · RESULTADOS» se queda fuera.** Está en la
  lámina, pero mide 14px de los 315 del dibujo: en la barra, con el logotipo a
  72 de alto, caería a 3px. Un renglón de texto ilegible no es «parecerse a la
  lámina», es ruido. El lema vive en la lámina, no en la barra.
- **El fondo se despeja de la mezcla, no con un umbral seco.** Cada cuadrante
  tiene su fondo (hueso, negro, azul claro, salvia) y ninguno es el del sitio;
  un umbral dejaría un halo de ese fondo en cada borde antialiaseado, y sobre
  el negro del estilo oscuro se vería.
- **La tinta y el terracota se separan por tono**, no por posición: el terracota
  tiene el rojo muy por encima del azul y las tintas son neutras o frías. Vale
  igual para la lámina y para el monograma.
- **El monograma se recolorea a la tinta del anillo de su cuadrante**, no se
  deja con la suya: son dos dibujos distintos y a ojo se notaba que el
  monograma iba un tono aparte del círculo que lo rodea. Su pierna de terracota
  no se toca.
- **Los cuatro salen a la MISMA caja.** Si cada uno saliera con la suya, el
  logotipo daría un salto de tamaño al cambiar de estilo.

    python scripts/logo.py
"""

from pathlib import Path

import numpy as np
from PIL import Image

RAIZ = Path(__file__).resolve().parent.parent
LAMINA = RAIZ / "scripts" / "logo-fuente" / "refrencia.png"
SALIDA = RAIZ / "public" / "logo"

# Los cuatro cuadrantes de la lámina y, en cada uno, el recorte del logotipo
# (sin el lema) y dónde acaba el círculo. Medido a píxel sobre la lámina.
#
#   caja    = x0, y0, x1, y1  del apilado: del borde del círculo al subrayado
#   circulo = y0, y1          del anillo, para poder recortarlo suelto
ESTILOS = {
    "claro":  {"caja": (155,  95,  617,  369), "circulo": ( 95, 252)},
    "oscuro": {"caja": (921,  91, 1385,  368), "circulo": ( 91, 252)},
    "azul":   {"caja": (155, 597,  618,  872), "circulo": (597, 755)},
    "verde":  {"caja": (924, 596, 1384,  874), "circulo": (596, 755)},
}

# El filete del anillo mide unos 6px en la lámina. Se vacía el interior dejando
# ese margen de sobra, para no morder el trazo por dentro.
MARGEN_FILETE = 11

# Cuánto del ancho del círculo ocupa el monograma. En la lámina el «RD»
# tipográfico ocupa 85 de 157 (0,54); el monograma de Rubén es más ancho y de
# trazo más fino, así que a la misma medida pesa menos y se queda pequeño
# dentro del anillo. A 0,60 las dos piezas se leen con el mismo peso — es la
# misma corrección que ya hizo falta cuando el monograma iba al lado del
# nombre.
ANCHO_MONOGRAMA = 0.60

# El anillo de los cuatro se lleva a este radio ANTES de recortar, y el recorte
# es una caja común en unidades de radio. Es lo que garantiza que los cuatro
# salgan a la misma caja al píxel: medidos en crudo, sus proporciones se iban de
# 1,4029 a 1,4161, y esa diferencia es un salto de tamaño visible al cambiar de
# estilo.
RADIO_OBJETIVO = 86.0

# La barra pide 72 de alto; en retina hacen falta 144, así que con 176 sobra.
# Lossy a 94: a este tamaño no se distingue del lossless y pesa diez veces
# menos —el lossless salía a 160-220 kB por pieza, que para un logo es absurdo.
ALTO_APILADO = 176
CALIDAD = 94


def es_acento(rgb):
    """El terracota, separado por tono: rojo muy por encima del azul."""
    return (rgb[..., 0].astype(int) - rgb[..., 2].astype(int)) > 45


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
    seguro = np.where(alfa[..., None] > 0.004, alfa[..., None], 1.0)
    color = np.clip(fondo + (p - fondo) / seguro, 0, 255)
    salida = np.zeros(p.shape[:2] + (4,), dtype=np.uint8)
    salida[..., :3] = color.astype(np.uint8)
    salida[..., 3] = (alfa * 255).astype(np.uint8)
    return salida


def vaciar_circulo(rgba, cx, cy, radio):
    """
    Quita lo que haya dentro del anillo dejando el filete y la rayita.

    Se borra por máscara radial y no por caja porque el «RD» tipográfico de la
    lámina casi toca el trazo por los lados: una caja rectangular se comería
    parte del anillo.
    """
    h, w = rgba.shape[:2]
    yy, xx = np.mgrid[0:h, 0:w]
    dentro = ((xx - cx) ** 2 + (yy - cy) ** 2) < (radio - MARGEN_FILETE) ** 2
    borrar = dentro & ~es_acento(rgba[..., :3])
    rgba[..., 3][borrar] = 0
    return rgba


def recolorear(rgba, tinta):
    """La tinta a `tinta`; el terracota, intacto."""
    salida = rgba.copy()
    tinta_px = ~es_acento(salida[..., :3])
    for i, v in enumerate(tinta):
        canal = salida[..., i]
        canal[tinta_px] = v
        salida[..., i] = canal
    return salida


def recortar_alfa(rgba):
    """Ajusta el lienzo a la tinta: sin aire alrededor."""
    ys, xs = np.nonzero(rgba[..., 3] > 6)
    return rgba[ys.min(): ys.max() + 1, xs.min(): xs.max() + 1]


def monograma(estilo, tinta, ancho):
    """El dibujo de Rubén, recoloreado a `tinta` y escalado a `ancho`."""
    im = Image.open(SALIDA / f"{estilo}.webp").convert("RGBA")
    a = recortar_alfa(np.asarray(im))
    a = recolorear(a, tinta)
    im = Image.fromarray(a, "RGBA")
    alto = round(im.height * ancho / im.width)
    return im.resize((ancho, alto), Image.LANCZOS)


def guardar(im, nombre, alto):
    im = im.resize((round(im.width * alto / im.height), alto), Image.LANCZOS)
    ruta = SALIDA / nombre
    im.save(ruta, "WEBP", quality=CALIDAD, method=6)
    print("  %-22s %dx%d  %5.1f kB" % (nombre, im.width, im.height, ruta.stat().st_size / 1024))
    return im.size


def main():
    lamina = np.asarray(Image.open(LAMINA).convert("RGB"))
    medidas, piezas = {}, {}

    for estilo, d in ESTILOS.items():
        x0, y0, x1, y1 = d["caja"]
        cy0, cy1 = d["circulo"]
        fondo = tuple(lamina[max(y0 - 12, 0), x0])

        # El anillo, para saber su centro, su radio y su tinta.
        banda = lamina[cy0:cy1, x0:x1]
        visible = np.abs(banda.astype(int) - np.array(fondo)).max(axis=2) > 16
        ys, xs = np.nonzero(visible)
        acx, acy = (xs.min() + xs.max()) / 2, (cy0 - y0) + (ys.min() + ys.max()) / 2
        radio = (xs.max() - xs.min() + 1) / 2
        # La tinta se lee en el trazo, a la altura del centro y por su izquierda.
        tinta = tuple(int(v) for v in lamina[int(cy0 + (ys.min() + ys.max()) / 2), x0 + int(xs.min()) + 2])

        limpio = despejar(lamina[y0:y1, x0:x1], fondo)
        limpio = vaciar_circulo(limpio, acx, acy, radio)

        # El monograma, centrado en el anillo y algo por encima del centro, que
        # es donde estaba el «RD» de la lámina: la rayita de terracota ocupa la
        # parte de abajo.
        mono = monograma(estilo, tinta, round(2 * radio * ANCHO_MONOGRAMA))
        pieza = Image.fromarray(limpio, "RGBA")
        # Centrado en el anillo y sólo un poco por encima: en la lámina el «RD»
        # va prácticamente al centro y la rayita de terracota queda debajo. Más
        # arriba se pega al trazo y deja un hueco grande sobre la rayita.
        pieza.alpha_composite(
            mono,
            (round(acx - mono.width / 2), round(acy - radio * 0.10 - mono.height / 2)),
        )

        # Todo a la misma escala de anillo, para poder recortar con una caja
        # común expresada en radios.
        s = RADIO_OBJETIVO / radio
        pieza = pieza.resize((round(pieza.width * s), round(pieza.height * s)), Image.LANCZOS)
        piezas[estilo] = {"im": pieza, "cx": acx * s, "cy": acy * s}

    # --- Segunda pasada: la caja común ------------------------------------
    # Se toma la unión de las cuatro tintas, medida desde el centro del anillo,
    # así ninguna se recorta y las cuatro comparten lienzo.
    bordes = []
    for d in piezas.values():
        ys, xs = np.nonzero(np.asarray(d["im"])[..., 3] > 6)
        bordes.append((d["cx"] - xs.min(), xs.max() - d["cx"], d["cy"] - ys.min(), ys.max() - d["cy"]))
    izq, der, arr, aba = (max(b[i] for b in bordes) for i in range(4))

    for estilo, d in piezas.items():
        cx, cy = d["cx"], d["cy"]
        caja = (round(cx - izq), round(cy - arr), round(cx + der) + 1, round(cy + aba) + 1)
        apilado = d["im"].crop(caja)
        medidas[f"apilado-{estilo}"] = guardar(apilado, f"apilado-{estilo}.webp", ALTO_APILADO)

        # El círculo suelto: la misma pieza recortada al anillo, en las dos
        # direcciones. Sale cuadrado y a la misma caja en los cuatro.
        r = RADIO_OBJETIVO + 1
        icono = d["im"].crop((round(cx - r), round(cy - r), round(cx + r) + 1, round(cy + r) + 1))
        medidas[f"icono-{estilo}"] = guardar(icono, f"icono-{estilo}.webp", round(2 * r))

    print()
    print("  aspect-ratio para index.css (tienen que coincidir los cuatro):")
    for n, (w, h) in sorted(medidas.items()):
        print("    %-16s %d / %d   (%.4f)" % (n, w, h, w / h))


if __name__ == "__main__":
    main()
