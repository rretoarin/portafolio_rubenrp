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
4. **Colores sólo desde los tokens** definidos en `@theme` (`ink`, `surface`,
   `raised`, `line`, `line-strong`, `muted`, `soft`, `bright`). Nada de
   `text-gray-400` ni hex sueltos: la paleta es monocroma a propósito.
5. **Toda sección nueva** usa `<Section>`, lleva `id`, entra en el array
   `SECTIONS` de `Nav.jsx` y suma su clave a `nav` en ambos idiomas.
6. **Animaciones**: agregar la clase `reveal` al elemento. El hook global lo
   detecta solo. Todo debe respetar `prefers-reduced-motion`.

## Diseño

Referencia: portafolio dark minimalista con monoespaciada de display.

- Negro real (`#000`) de fondo. Jerarquía por gris, no por color.
- **JetBrains Mono es la tipografía de display**: títulos, nombres, nav, botones,
  píldoras y todo dato técnico. Inter sólo para párrafos de lectura corrida.
- Clase `.display` para cualquier titular; nunca `font-bold` suelto.
- Etiquetas de sección con `<SectionLabel>`, que renderiza `... /Nombre ...`.
- Tarjetas con `.card` (radio 1.25rem, borde de 1px, fondo `surface`).
  Hover: `hover:bg-raised`. Nada de sombras ni degradados llamativos.
- Tecnologías y enlaces secundarios como `.pill` (píldora con contorno).
- CTA principal: píldora blanca con círculo negro y flecha dentro.
- `<Arc>` para los círculos gigantes de fondo. Van dentro de un contenedor
  `relative overflow-hidden`, uno o dos por sección como máximo.
- Rejillas tipo bento: `gap-3` y anchos alternados, no columnas iguales.

## Móvil (iPhone y Android)

El sitio se diseña primero para 375px. Reglas que no se negocian:

- **Nada puede desbordar en horizontal.** Todo contenedor con un `<Arc>` dentro
  necesita `relative overflow-hidden`. `<Section>` ya lo trae.
- **Safe areas**: `index.html` usa `viewport-fit=cover`, así que los bordes se
  manejan con `env(safe-area-inset-*)`. Ya están puestos en `.shell`, en la barra
  fija, en el menú móvil y en el pie.
- **Altura**: usar `svh`, nunca `vh` — en iOS la barra de Safari rompe `100vh`.
- **Objetivo táctil de 44px** en todo lo accionable. Las `.pill` que son enlace o
  botón ya llevan `min-height: 2.5rem`; los botones circulares van en `size-11`.
- **Ningún efecto puede depender del hover**: todo lo que sea hover va dentro de
  `@media (hover: hover)`, porque en táctil se queda pegado.

## Efectos

- `useSpotlight` mueve `--mx/--my` en la `.card` bajo el puntero; el degradado
  vive en `background-image` para no crear contextos de apilamiento.
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
