# -*- coding: utf-8 -*-
"""Mide el contraste de las cuatro paletas. AA: 4.5 en texto, 3 en controles."""

def lum(h):
    h = h.lstrip('#')
    c = [int(h[i:i+2], 16) / 255 for i in (0, 2, 4)]
    c = [x / 12.92 if x <= 0.04045 else ((x + 0.055) / 1.055) ** 2.4 for x in c]
    return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]


def ratio(a, b):
    la, lb = lum(a), lum(b)
    hi, lo = max(la, lb), min(la, lb)
    return (hi + 0.05) / (lo + 0.05)


TEMAS = {
    # Base clara: #F8F9FA (Seasalt), la que eligió Rubén. La comparten claro,
    # azul y verde: lo único que los separa es el color de la marca.
    'claro': dict(
        page='#F8F9FA', page_soft='#ECEFF2', surface='#FFFFFF', surface2='#F1F3F6',
        line='#E1E5EA', edge='#767D86', ink='#101317', ink_soft='#535A63',
        btn='#101317', on_btn='#F8F9FA', heading='#101317', eyebrow='#535A63',
        accent='#9A5638', accent_soft='#F3E9E4', on_accent='#F8F9FA', accent2='#4F5D46',
    ),
    # Base oscura: #020202, negro puro.
    'oscuro': dict(
        page='#020202', page_soft='#0E0F11', surface='#0A0B0C', surface2='#121416',
        line='#1F2225', edge='#6E747C', ink='#F4F5F6', ink_soft='#A5ABB3',
        btn='#F4F5F6', on_btn='#020202', heading='#F4F5F6', eyebrow='#A5ABB3',
        accent='#CBB894', accent_soft='#16181B', on_accent='#0A0B0C', accent2='#8FA8A0',
    ),
    'azul': dict(
        page='#F8F9FA', page_soft='#E9EEF6', surface='#FFFFFF', surface2='#F0F4FA',
        line='#DCE3EC', edge='#78828F', ink='#0C1725', ink_soft='#4C5A6D',
        btn='#17539E', on_btn='#FFFFFF', heading='#123F78', eyebrow='#17539E',
        accent='#17539E', accent_soft='#E4EDF9', on_accent='#FFFFFF', accent2='#0F7480',
    ),
    'verde': dict(
        page='#F8F9FA', page_soft='#E9F1EC', surface='#FFFFFF', surface2='#F0F6F2',
        line='#DDE5E0', edge='#79837C', ink='#0D1913', ink_soft='#485950',
        btn='#245C41', on_btn='#FFFFFF', heading='#1B4A33', eyebrow='#245C41',
        accent='#245C41', accent_soft='#E1EDE6', on_accent='#FFFFFF', accent2='#8A6A2E',
    ),
}

# (primer plano, fondo, mínimo, para qué)
PRUEBAS = [
    ('ink', 'page', 7.0, 'texto principal'),
    ('ink', 'surface', 7.0, 'texto en tarjeta'),
    ('ink_soft', 'page', 4.5, 'texto secundario'),
    ('ink_soft', 'page_soft', 4.5, 'secundario en hover'),
    ('ink_soft', 'surface2', 4.5, 'secundario en superficie'),
    ('ink_soft', 'accent_soft', 4.5, 'secundario sobre tinte'),
    ('edge', 'page', 3.0, 'borde de control'),
    ('accent', 'page', 4.5, 'acento como texto/enlace'),
    ('accent', 'surface', 4.5, 'acento en tarjeta'),
    ('on_accent', 'accent', 4.5, 'texto sobre acento'),
    ('on_btn', 'btn', 4.5, 'texto del CTA'),
    ('btn', 'page', 3.0, 'el CTA sobre el fondo'),
    ('accent2', 'page', 3.0, 'marca gráfica pequeña'),
    ('heading', 'page', 7.0, 'titulares'),
    ('heading', 'surface2', 7.0, 'titulares sobre superficie'),
    ('eyebrow', 'page', 4.5, 'etiqueta de sección'),
    ('eyebrow', 'surface2', 4.5, 'etiqueta sobre superficie'),
]

fallos = 0
for nombre, t in TEMAS.items():
    print(f'\n=== {nombre.upper()} ===')
    for fg, bg, minimo, para in PRUEBAS:
        r = ratio(t[fg], t[bg])
        ok = r >= minimo
        if not ok:
            fallos += 1
        print(f'  {"OK " if ok else "MAL"} {r:5.2f} (>={minimo})  {fg:10} sobre {bg:11} — {para}')

print('\nFALLOS:', fallos)
