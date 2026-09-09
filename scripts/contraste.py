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
    'claro': dict(
        page='#FBFAF7', page_soft='#F2F0EA', surface='#FFFFFF', surface2='#F6F4EF',
        line='#E4E0D6', edge='#87826F', ink='#17150F', ink_soft='#5A5546',
        btn='#17150F', on_btn='#FBFAF7',
        accent='#4F5D46', accent_soft='#E7EBE1', on_accent='#FBFAF7', accent2='#9C5B41',
    ),
    'oscuro': dict(
        page='#0E1013', page_soft='#171A1F', surface='#14171B', surface2='#1B1F25',
        line='#262B33', edge='#767E8B', ink='#ECEDEF', ink_soft='#A3AAB5',
        btn='#ECEDEF', on_btn='#0E1013',
        accent='#CBB894', accent_soft='#23272E', on_accent='#14171B', accent2='#8FA8A0',
    ),
    'azul': dict(
        page='#F6F9FC', page_soft='#EAF0F8', surface='#FFFFFF', surface2='#F1F6FC',
        line='#D9E3F0', edge='#78859A', ink='#0C1725', ink_soft='#4C5A6D',
        btn='#17539E', on_btn='#FFFFFF',
        accent='#17539E', accent_soft='#E3EDFA', on_accent='#F6F9FC', accent2='#0F7480',
    ),
    'verde': dict(
        page='#F6FAF8', page_soft='#E9F1EC', surface='#FFFFFF', surface2='#F0F6F2',
        line='#D8E5DE', edge='#788A80', ink='#0D1913', ink_soft='#485950',
        btn='#245C41', on_btn='#FFFFFF',
        accent='#245C41', accent_soft='#E0EDE6', on_accent='#F6FAF8', accent2='#8A6A2E',
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
