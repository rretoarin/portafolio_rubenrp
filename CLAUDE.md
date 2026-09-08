# Portafolio — Rubén Reto Panta

Portafolio personal de un desarrollador full stack. Sitio de una sola página,
bilingüe (ES/EN), estética minimalista en negro.

## Stack

- React 19 + Vite 8
- Tailwind CSS v4 (plugin `@tailwindcss/vite`, **sin** `tailwind.config.js`)
- Deploy: Vercel (`vercel.json` ya configurado)

## Comandos

```bash
npm run dev       # desarrollo en localhost:5173
npm run build     # build de producción a dist/
npm run preview   # sirve dist/ localmente
npm run lint      # oxlint
```

## Arquitectura

```
src/
├─ data/content.js     ← TODO el texto del sitio (es/en) + datos de proyectos
├─ components/         ← un componente por sección, sin lógica de negocio
│  ├─ Section.jsx      ← envoltorio común (numeración, título, espaciado)
│  ├─ icons.jsx        ← SVG inline, sin librería de iconos
│  └─ Nav | Hero | About | Projects | Process | Stack | Contact | Footer
├─ hooks/useReveal.js  ← IntersectionObserver único para animaciones de entrada
├─ index.css           ← tokens de color en @theme + estilos base
└─ App.jsx             ← estado de idioma y composición de secciones
```

### Reglas que no se rompen

1. **El texto vive en `src/data/content.js`, nunca en los componentes.**
   `CONTENT.es` y `CONTENT.en` deben tener exactamente las mismas claves.
   Si agregas texto en un idioma, agrégalo en el otro en el mismo commit.
2. **El idioma se pasa por props** (`t`), no por contexto. Todas las secciones
   son hijas directas de `App`; el contexto sería complejidad sin beneficio.
3. **Nada de librerías nuevas** sin una razón concreta. Iconos, animaciones y
   layout se resuelven con SVG inline, CSS y Tailwind.
4. **Colores sólo desde los tokens** de `@theme`: `page`, `page-soft`,
   `surface`, `line`, `edge`, `ink`, `ink-soft`, `accent`, más `frame`/
   `frame-line` para la ventana de las capturas. **`line` (1.24:1) y `accent`
   (2.03:1) son decorativos: nunca texto ni contorno de algo pulsable.** Los
   bordes de control van en `edge` (3.33:1) y el texto siempre en `ink` o
   `ink-soft`.

5. **Toda sección nueva** usa `<Section>`, lleva `id`, entra en el array
   `SECTIONS` de `Nav.jsx` y suma su clave a `nav` en ambos idiomas.
6. **Animaciones**: agregar la clase `reveal` al elemento. El hook global lo
   detecta solo. Todo debe respetar `prefers-reduced-motion`.

## Posicionamiento

El sitio vende **dos mitades del mismo oficio**: diseño y desarrollo web (lo que
hace que a un negocio lo encuentren) y software a medida (lo que hace que
funcione por dentro). El titular nombra las dos, y Soluciones abre con el
diseño web. **No es un portafolio**: la tecnología es soporte, el producto es la
solución al problema de negocio.

Orden de secciones: hero → El problema → Soluciones → Casos → Cómo trabajo →
Sobre mí → Contacto. Siete, y no hay sección de tecnologías: el stack sale al
pie de cada caso ("Construido con") y una línea en Sobre mí. **No volver a
añadir una sección de herramientas**: convierte la marca en un portafolio.

Densidad: 3 problemas, 4 soluciones, 3 pilares, 2 párrafos en Sobre mí. Si algo
crece por encima de eso, hay que quitar otra cosa — el sitio ya se recortó una
vez por estar sobrecargado. Máximo dos columnas por bloque.

La IA se menciona **una sola vez**, como argumento de velocidad para el cliente
("Entrego más rápido"), nunca como característica técnica.

El formulario de contacto **no tiene backend**: compone el mensaje y abre
WhatsApp. Si algún día se envía a un servidor, hay que añadir aviso de datos.

## Diseño

Marca personal orientada a captar clientes. **No es un portafolio**: el producto
es la solución al problema de negocio, y la tecnología es soporte. El sitio pasó
por varias identidades en 2026 (negro → papel verde → crema lavanda → esta).
Cada cambio lo pidió Rubén; no revertir sin preguntar.

- **Todo el sitio va sobre blanco puro.** No hay fondos alternos ni texturas:
  el ritmo entre secciones lo marca el espacio vertical (`py-20 md:py-28`), no
  un cambio de color. `page-soft` (#f7f7f5) sobrevive **sólo** como estado
  hover de píldoras y botón fantasma; no usarlo como fondo de sección.
- **Sin color de acento.** El sitio es blanco, gris y tinta; el color vivo lo
  ponen las capturas de los proyectos y nada más. Si algún día vuelve un
  acento, que sea uno solo y con texto en `ink` encima.
- **Interacción, toda en CSS.** `.nav-link` dibuja un subrayado con `scaleX`
  (el estado activo lo deja puesto, así hover y "estás aquí" hablan el mismo
  idioma). Los bloques editoriales llevan `.block` + `.block-rule` —cuando el
  filete ya es un `<span>`— o `.block-top` —cuando lo dibuja un `border-t`—, y
  al pasar el cursor repintan el filete, desplazan `.block-title` 4px y
  encienden `.block-num`. **El color en reposo de `.block-num` va en el CSS, no
  en una utilidad `text-ink-soft`**: las utilidades de Tailwind se declaran
  después de `@layer components` y ganarían a la regla de hover.
- Todo lo anterior se apaga en `prefers-reduced-motion` y se enciende también
  con `:focus-within`, para que el teclado vea lo mismo que el ratón.
- **Sin fuentes web.** El titular usa la pila del sistema (`--font-sans`), igual
  que la referencia: Segoe UI en Windows, SF Pro en macOS, Roboto en Android.
  El golpe lo dan el peso 700 y el tracking cerrado (`-0.034em`) de `.display`,
  no una tipografía de pago. Se ahorran ~129 kB y desaparece el salto de texto
  al cargar. **Si alguna vez se añade una fuente propia, autoalojarla en
  `public/fonts`, nunca por `<link>` a un tercero** — esa petición tardaba más
  de un segundo y bloqueaba el pintado.
- Microetiquetas (`.eyebrow`, `.tag`): la misma familia en versalitas con
  tracking amplio y peso 600. Nada de monoespaciada en la interfaz.
- **Composición asimétrica**: rejilla de 12 donde los bloques no comparten eje.
  El título ocupa 7 columnas y el subtítulo cae a la derecha alineado abajo.
  La asimetría **tiene que sostenerse a 375px**.
- **Casi nada de tarjetas**: el recurso por defecto es un bloque abierto bajo
  `border-t border-sand`. `.card` queda para agrupar de verdad.
- **Las capturas son la evidencia**, no ilustración. Van claras (ver
  `scripts/aclarar.py`) dentro de `<Frame>`, a ancho completo, con los datos de
  cliente difuminados. Una aparece ya en el hero.
- `.link` lleva el subrayado en `::after` y `.tap` el área de toque en
  `::before`. **Nunca al revés**: si ambos usan el mismo pseudo-elemento se
  funden en una caja gris visible.
- Movimiento controlado: entrada fade + slide-up de 0.6s y microinteracciones
  de 0.2s. Nada más largo, nada permanente.

## Móvil (iPhone y Android)

El sitio se diseña primero para 375px. Reglas que no se negocian:

- **Nada puede desbordar en horizontal.** Todo contenedor con un `<Arc>` dentro
  necesita `relative overflow-hidden`. `<Section>` ya lo trae.
- **Safe areas**: `index.html` usa `viewport-fit=cover`, así que los bordes se
  manejan con `env(safe-area-inset-*)`. Ya están puestos en `.shell`, en la barra
  fija, en el menú móvil y en el pie.
- **Altura**: usar `svh`, nunca `vh` — en iOS la barra de Safari rompe `100vh`.
- **Objetivo táctil de 44px** en todo lo accionable. Las `.pill` que son enlace o
  botón ya llevan `min-height: 2.75rem`; los botones circulares van en `size-11`.
  `.tap` agranda el toque sin mover nada, pero **no sirve para elementos pegados
  entre sí**: los pseudo-elementos se solapan y el toque cae en el vecino. Ahí
  hay que dar altura real (los atajos del pie van así).
- **Ningún efecto puede depender del hover**: todo lo que sea hover va dentro de
  `@media (hover: hover)`, porque en táctil se queda pegado.

## Efectos

- `.stagger` en una rejilla escalona la entrada de sus hijos `.reveal`.
- `<Marquee>` duplica la lista y anima `translateX(-50%)`: por eso el bucle es
  continuo. Si cambias `MARQUEE`, no toques ese 50%.
- `<ScrollProgress>` anima `transform: scaleX`, nunca `width`.
- `.grain` es una textura SVG fija; mantenerla por debajo de 0.04 de opacidad.
- Todo movimiento se apaga en `prefers-reduced-motion`.

## Antes de dar algo por terminado

- `npm run build` sin errores
- `npm run lint` sin errores
- Probar el toggle ES/EN en la sección tocada
- Probar a 375px de ancho (móvil) y a 1440px
