# -*- coding: utf-8 -*-
"""
Genera una pagina local para ver como quedara la tarjeta del enlace en WhatsApp,
LinkedIn y X antes de compartirlo con nadie.

Lee los metadatos reales de dist/index.html y mete la og.png dentro del HTML,
asi el archivo funciona solo, sin servidor. No se despliega: sale fuera del
repositorio, a la carpeta que se le pase.

    npm run build && python scripts/preview-card.py [carpeta_destino]
"""
import base64
import html
import io
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DIST = os.path.join(ROOT, "dist", "index.html")
# Primer argumento: carpeta destino. Los siguientes, imagenes a comparar.
# Sin mas argumentos se usa la og.png que hay puesta ahora.
args = [a for a in sys.argv[1:]]
OUT_DIR = args[0] if args else os.path.join(ROOT, "..")
IMAGES = args[1:] or [os.path.join(ROOT, "public", "og.png")]
OUT = os.path.join(OUT_DIR, "vista-previa-enlace.html")

# Limites a partir de los cuales cada plataforma corta. Son aproximados: cada
# una recorta por ancho en pixeles, no por numero de caracteres.
LIMITS = {
    "WhatsApp": {"titulo": 65, "descripcion": 100},
    "LinkedIn": {"titulo": 70, "descripcion": None},  # no muestra descripcion
    "X": {"titulo": 70, "descripcion": 125},
}


def read_meta():
    src = io.open(DIST, encoding="utf-8").read()

    def meta(name):
        pat = r'<meta[^>]*(?:property|name)="%s"[^>]*content="([^"]*)"' % re.escape(name)
        m = re.search(pat, src)
        if not m:
            pat = r'<meta[^>]*content="([^"]*)"[^>]*(?:property|name)="%s"' % re.escape(name)
            m = re.search(pat, src)
        return m.group(1) if m else ""

    return {
        "titulo": meta("og:title") or re.search(r"<title>(.*?)</title>", src).group(1),
        "descripcion": meta("og:description"),
        "url": meta("og:url"),
        "sitio": meta("og:site_name"),
        "card": meta("twitter:card"),
    }


def cut(text, limit):
    """Devuelve (texto_visible, texto_cortado)."""
    if limit is None or len(text) <= limit:
        return text, ""
    return text[:limit], text[limit:]


def card_text(text, limit):
    visible, sobra = cut(text, limit)
    out = html.escape(visible)
    if sobra:
        out += f'<span class="cut">{html.escape(sobra)}</span>'
    return out


m = read_meta()
host = re.sub(r"^https?://", "", m["url"]).rstrip("/")
def as_data_uri(path):
    return "data:image/png;base64," + base64.b64encode(io.open(path, "rb").read()).decode()

filas = []
for plataforma, lim in LIMITS.items():
    for campo, valor in (("título", m["titulo"]), ("descripción", m["descripcion"])):
        tope = lim["titulo"] if campo == "título" else lim["descripcion"]
        if tope is None:
            estado, clase = "no la muestra", "na"
        elif len(valor) <= tope:
            estado, clase = f"entra entera ({len(valor)}/{tope})", "ok"
        else:
            estado, clase = f"se corta ({len(valor)}/{tope})", "bad"
        filas.append(f'<tr><td>{plataforma}</td><td>{campo}</td>'
                     f'<td class="{clase}">{estado}</td></tr>')

def bloque(path, indice):
    nombre = os.path.splitext(os.path.basename(path))[0]
    im = __import__("PIL.Image", fromlist=["Image"]).open(path)
    peso_kb = os.path.getsize(path) / 1024
    src = as_data_uri(path)
    etiqueta = f"{nombre} · {im.width}×{im.height} · {peso_kb:.0f} KB"
    # La letra sólo tiene sentido cuando hay varias imágenes que comparar.
    letra = f"{chr(65 + indice)} — " if len(IMAGES) > 1 else ""
    return f"""
  <p class="variant">{letra}{html.escape(etiqueta)}</p>
  <div class="grid">
    <div class="col">
      <h2>WhatsApp</h2>
      <div class="wa"><div class="wa-bubble">
        <div class="wa-prev">
          <img src="{src}" alt="">
          <div class="wa-meta">
            <div class="wa-title">{card_text(m["titulo"], LIMITS["WhatsApp"]["titulo"])}</div>
            <div class="wa-desc">{card_text(m["descripcion"], LIMITS["WhatsApp"]["descripcion"])}</div>
            <div class="wa-host">{html.escape(host)}</div>
          </div>
        </div>
        <div class="wa-link">https://{html.escape(host)}/</div>
      </div></div>
    </div>
    <div class="col">
      <h2>LinkedIn</h2>
      <div class="li"><div class="li-card">
        <img src="{src}" alt="">
        <div class="li-meta">
          <div class="li-title">{card_text(m["titulo"], LIMITS["LinkedIn"]["titulo"])}</div>
          <div class="li-host">{html.escape(host)}</div>
        </div>
      </div></div>
    </div>
    <div class="col">
      <h2>X</h2>
      <div class="x"><div class="x-card">
        <img src="{src}" alt="">
        <span class="x-host">{html.escape(host)}</span>
      </div></div>
    </div>
  </div>"""


bloques = chr(10).join(bloque(path, i) for i, path in enumerate(IMAGES))

page = f"""<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Vista previa del enlace — {html.escape(m["titulo"])}</title>
<style>
  :root {{
    --ink: #0a0908; --surface: #100e0c; --raised: #171511;
    --line: #221f1b; --line-strong: #363129;
    --muted: #837e73; --soft: #aba69c; --bright: #f7f4ef;
    --mono: "JetBrains Mono", ui-monospace, Menlo, monospace;
    --sans: Inter, system-ui, -apple-system, "Segoe UI", sans-serif;
  }}
  * {{ box-sizing: border-box; }}
  body {{
    margin: 0; padding: 48px 24px 96px;
    background: var(--ink); color: var(--bright); font-family: var(--sans);
  }}
  .shell {{ max-width: 1080px; margin-inline: auto; }}
  h1 {{ font-family: var(--mono); font-weight: 500; letter-spacing: -.04em;
       font-size: 1.75rem; margin: 0 0 8px; }}
  .lead {{ color: var(--muted); margin: 0 0 8px; line-height: 1.6; }}
  .warn {{ color: var(--soft); font-size: .8125rem; line-height: 1.6;
          border-left: 2px solid var(--line-strong); padding-left: 14px; margin: 24px 0 0; }}
  .variant {{ font-family: var(--mono); font-size: .8125rem; color: var(--bright);
              margin: 48px 0 0; padding-top: 20px; border-top: 1px solid var(--line); }}
  .grid {{ display: grid; gap: 28px; margin-top: 20px;
          grid-template-columns: repeat(auto-fit, minmax(330px, 1fr)); }}
  .col > h2 {{ font-family: var(--mono); font-size: .6875rem; letter-spacing: .18em;
              text-transform: uppercase; color: var(--muted); margin: 0 0 16px; font-weight: 500; }}
  .cut {{ opacity: .28; text-decoration: line-through; }}

  /* --- WhatsApp: burbuja saliente, tema oscuro --- */
  .wa {{ background: #0b141a; padding: 18px; border-radius: 14px; }}
  .wa-bubble {{ background: #005c4b; border-radius: 10px; padding: 4px; max-width: 320px;
                margin-left: auto; font-family: "Helvetica Neue", Arial, sans-serif; }}
  .wa-prev {{ background: rgba(0,0,0,.22); border-radius: 7px; overflow: hidden; }}
  .wa-prev img {{ display: block; width: 100%; aspect-ratio: 1.91; object-fit: cover; }}
  .wa-meta {{ padding: 8px 10px 10px; }}
  .wa-title {{ color: #e9edef; font-size: 13px; line-height: 1.35; font-weight: 400;
               display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }}
  .wa-desc {{ color: #8696a0; font-size: 12px; line-height: 1.35; margin-top: 2px;
              display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }}
  .wa-host {{ color: #8696a0; font-size: 12px; margin-top: 3px; }}
  .wa-link {{ color: #53bdeb; font-size: 14.2px; padding: 6px 8px 4px; word-break: break-all; }}

  /* --- LinkedIn: tarjeta de publicacion --- */
  .li {{ background: #f4f2ee; padding: 18px; border-radius: 14px; }}
  .li-card {{ background: #fff; border: 1px solid #e0dfdc; border-radius: 2px;
              max-width: 340px; font-family: -apple-system, "Segoe UI", Arial, sans-serif; }}
  .li-card img {{ display: block; width: 100%; aspect-ratio: 1.91; object-fit: cover; }}
  .li-meta {{ background: #f3f2ef; padding: 10px 12px; }}
  .li-title {{ color: #000000e6; font-size: 14px; font-weight: 600; line-height: 1.3;
               display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }}
  .li-host {{ color: #00000099; font-size: 12px; margin-top: 3px; }}

  /* --- X: summary_large_image --- */
  .x {{ background: #000; padding: 18px; border-radius: 14px; }}
  .x-card {{ max-width: 340px; border: 1px solid #2f3336; border-radius: 16px; overflow: hidden;
             position: relative; font-family: -apple-system, "Segoe UI", Arial, sans-serif; }}
  .x-card img {{ display: block; width: 100%; aspect-ratio: 2; object-fit: cover; }}
  .x-host {{ position: absolute; left: 12px; bottom: 12px; background: rgba(0,0,0,.77);
             color: #fff; font-size: 12px; padding: 2px 6px; border-radius: 4px; }}

  table {{ border-collapse: collapse; width: 100%; margin-top: 20px; font-size: .875rem; }}
  th, td {{ text-align: left; padding: 10px 14px; border-bottom: 1px solid var(--line); }}
  th {{ font-family: var(--mono); font-size: .6875rem; letter-spacing: .12em;
        text-transform: uppercase; color: var(--muted); font-weight: 500; }}
  td {{ color: var(--soft); }}
  .ok {{ color: #6ee7a8; }} .bad {{ color: #f87171; }} .na {{ color: var(--muted); }}
  .facts {{ font-family: var(--mono); font-size: .8125rem; color: var(--muted);
            margin-top: 40px; line-height: 1.9; }}
  .facts b {{ color: var(--bright); font-weight: 500; }}
</style>
</head>
<body>
<div class="shell">
  <h1>Vista previa del enlace</h1>
  <p class="lead">Cómo se verá <b>{html.escape(host)}</b> al compartirlo. Los datos y la
  imagen salen del build de verdad, no están escritos a mano.</p>

  {bloques}

  <table>
    <thead><tr><th>Plataforma</th><th>Campo</th><th>Qué pasa</th></tr></thead>
    <tbody>{''.join(filas)}</tbody>
  </table>

  <p class="warn">Los recortes son aproximados: cada plataforma corta por ancho en
  píxeles, no por número de caracteres, y cambia sus plantillas cada cierto tiempo.
  Lo que sí es exacto es la imagen, el título y la descripción — vienen del build.</p>

  <div class="facts">
    título <b>{len(m["titulo"])}</b> caracteres · descripción <b>{len(m["descripcion"])}</b><br>
    twitter:card <b>{html.escape(m["card"])}</b> · og:site_name <b>{html.escape(m["sitio"])}</b>
  </div>
</div>
</body>
</html>
"""

os.makedirs(OUT_DIR, exist_ok=True)
io.open(OUT, "w", encoding="utf-8", newline="\n").write(page)
print(f"{OUT}  ({os.path.getsize(OUT) / 1024:.0f} KB)")
