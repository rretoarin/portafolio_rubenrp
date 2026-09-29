# -*- coding: utf-8 -*-
"""Prepara el logo de la barra y del pie desde el PNG de Rubén.

Fuente: scripts/logo-fuente/logofinal.png (1024x1024, fondo blanco).
Salida: public/logo/logo-{claro,oscuro}-{lg,sm}@{1,2,3}x.webp (sin pérdida).
Medidas de cada tamaño: DISENO, más abajo.

Por qué así y no el PNG tal cual:
- **Nitidez.** Si el navegador reduce un PNG de 1024 a 52px, lo hace deprisa y
  sale blando. Aquí se exporta a la medida EXACTA a la que se pinta (y a 2x y
  3x para pantallas densas), con Lanczos: el navegador no reescala nada.
- **Fondo.** El PNG trae fondo blanco. Cada píxel se descompone en cuánto tiene
  de tinta y cuánto de rojo (mínimos cuadrados contra el blanco), así el borde
  suavizado se conserva y el fondo queda transparente.
- **Tema oscuro.** Con esa misma descomposición, la copia oscura cambia sólo la
  tinta a #f4f5f6 (--color-ink del oscuro); el rojo queda igual.

Uso: python scripts/logo-png.py
"""
import os

import numpy as np
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "scripts", "logo-fuente", "logofinal.png")
OUT = os.path.join(ROOT, "public", "logo")

BLANCO = np.array([255.0, 255.0, 255.0])
TINTA = np.array([0x14, 0x15, 0x19], float)   # medida en el PNG
ROJO = np.array([0xD3, 0x52, 0x3C], float)    # medido en el PNG
TINTAS = {"claro": TINTA, "oscuro": np.array([0xF4, 0xF5, 0xF6], float)}

# Diseño de cada tamaño, en píxeles CSS. El «RD» y la palabra se exportan por
# separado para que cada uno caiga en la rejilla: el RD con su alto entero
# (barra de arriba y corte rojo en píxel entero) y la palabra con la línea de
# mayúsculas y la base en píxel entero, que es lo que la hace legible a 7–9px.
# La palabra va algo más grande que en el PNG (mayúsculas de 9 y 7 en vez de
# 8 y 6): a esta medida cada píxel cuenta. El RD va centrado sobre ella.
# Si cambian W o H, cambian también en Logo.jsx.
#   rd: alto del RD · cap: alto de mayúsculas · gap: aire entre los dos
#   W, H: lienzo (H par, para que quede en píxel entero en la barra de 80/64)
DISENO = {
    "lg": dict(rd=35, cap=9, gap=6, W=77, H=54),   # barra desde 769px
    "sm": dict(rd=26, cap=7, gap=4, W=60, H=40),   # barra en móvil y pie
}
ESCALAS = (1, 2, 3)
# Enfoque suave sólo en la palabra (máscara de desenfoque de 3x3).
ENFOQUE = {1: 0.45, 2: 0.25, 3: 0.15}


def coberturas(rgb):
    """Cuánto de tinta y cuánto de rojo tiene cada píxel (0..1)."""
    d = BLANCO - rgb.reshape(-1, 3)
    m = np.stack([BLANCO - TINTA, BLANCO - ROJO], 1)          # 3x2
    a, *_ = np.linalg.lstsq(m, d.T, rcond=None)                # 2xN
    a = np.clip(a.T, 0, 1)
    s = a.sum(1, keepdims=True)
    a = np.divide(a, s, out=a.copy(), where=s > 1)
    # El PNG trae ruido tenue en el fondo (restos de compresión): por debajo
    # del 4% no es dibujo, es fondo.
    a[a.sum(1) < 0.04] = 0
    h, w, _ = rgb.shape
    return a[:, 0].reshape(h, w), a[:, 1].reshape(h, w)


def bandas(cov):
    """Filas del RD y de la palabra, y medidas de la fuente (bordes, en px)."""
    filas = (cov > 0.5).any(1)
    segs, ini = [], None
    for i, v in enumerate(filas):
        if v and ini is None:
            ini = i
        if not v and ini is not None:
            segs.append((ini, i))
            ini = None
    (rd0, rd1), (tx0, tx1) = segs[0], segs[-1]
    cols = lambda a, b: np.where((cov[a:b] > 0.5).any(0))[0]
    rdc, txc = cols(rd0, rd1), cols(tx0, tx1)
    # La R de la palabra: su asta da la línea de mayúsculas y la base.
    col = txc[0] + 10
    rr = np.where(cov[tx0:tx1, col] > 0.5)[0]
    return dict(
        corte=(rd1 + tx0) // 2,
        rd=(rd0, rd1), rd_x=(rdc[0], rdc[-1] + 1),
        cap=(tx0 + rr[0], tx0 + rr[-1] + 1), tx_x=(txc[0], txc[-1] + 1),
    )


def muestrear(c, W, H, s, ax, bx, ay, by, pad):
    """Remuestrea c (fuente con `pad` de margen) para que la x de la fuente
    `ax` caiga en `bx` y la y `ay` en `by`, a escala `s` (salida W x H)."""
    L, T = ax - bx / s + pad, ay - by / s + pad
    img = Image.fromarray(c, "F").resize((W, H), Image.LANCZOS, box=(L, T, L + W / s, T + H / s))
    return np.clip(np.array(img), 0, 1)


def enfocar(c, k):
    if not k:
        return c
    b = np.pad(c, 1, mode="edge")
    b = (b[:-2] + 2 * b[1:-1] + b[2:]) / 4
    b = (b[:, :-2] + 2 * b[:, 1:-1] + b[:, 2:]) / 4
    return np.clip(c + k * (c - b), 0, 1)


def main():
    rgb = np.array(Image.open(SRC).convert("RGB")).astype(float)
    ink, red = coberturas(rgb)
    m = bandas(ink + red)
    cap_src = m["cap"][1] - m["cap"][0]
    print(f"fuente: RD filas {m['rd']} cols {m['rd_x']} · palabra mayúsculas {m['cap']} ({cap_src}px) cols {m['tx_x']}")

    PAD = 400
    capas_src = {}
    for nombre, c in (("ink", ink), ("red", red)):
        rd = c.copy(); rd[m["corte"]:] = 0
        tx = c.copy(); tx[:m["corte"]] = 0
        capas_src[nombre] = {"rd": np.pad(rd, PAD).astype(np.float32), "tx": np.pad(tx, PAD).astype(np.float32)}

    for tam, d in DISENO.items():
        for k in ESCALAS:
            W, H = d["W"] * k, d["H"] * k
            # Palabra: mayúsculas de `cap` px, arriba en rd+gap, centrada.
            st = d["cap"] * k / cap_src
            tx_w = (m["tx_x"][1] - m["tx_x"][0]) * st
            tx_b = round((W - tx_w) / 2)
            # RD: `rd` px de alto desde arriba, centrado sobre la palabra.
            sr = d["rd"] * k / (m["rd"][1] - m["rd"][0])
            centro = tx_b + tx_w / 2
            rd_b = round(centro - (m["rd_x"][1] - m["rd_x"][0]) * sr / 2)
            out = {}
            for nombre, cc in capas_src.items():
                r = muestrear(cc["rd"], W, H, sr, m["rd_x"][0], rd_b, m["rd"][0], 0, PAD)
                t = muestrear(cc["tx"], W, H, st, m["tx_x"][0], tx_b, m["cap"][0], (d["rd"] + d["gap"]) * k, PAD)
                out[nombre] = np.clip(r + enfocar(t, ENFOQUE[k]), 0, 1)
            a_i, a_r = out["ink"], out["red"]
            alfa = np.clip(a_i + a_r, 0, 1)
            for tema, tinta in TINTAS.items():
                col = (a_i[..., None] * tinta + a_r[..., None] * ROJO) / np.maximum(alfa, 1e-6)[..., None]
                rgba = np.dstack([np.clip(col, 0, 255), alfa * 255]).round().astype(np.uint8)
                nombre = f"logo-{tema}-{tam}@{k}x.webp"
                Image.fromarray(rgba, "RGBA").save(os.path.join(OUT, nombre), lossless=True, quality=100, method=6)
            print(f"{tam}@{k}x: {W}x{H} · palabra {tx_w:.1f}px de ancho desde x={tx_b} · RD desde x={rd_b}")


if __name__ == "__main__":
    main()
