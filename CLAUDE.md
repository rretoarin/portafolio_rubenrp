# RubenDev — marca personal de Rubén Reto Panta

Marca personal comercial de un desarrollador full stack. Sitio de una sola
página, bilingüe (ES/EN), con **cuatro identidades visuales** que el visitante
cambia en vivo.

## Stack

- React 19 + Vite 8
- Tailwind CSS v4 (plugin `@tailwindcss/vite`, **sin** `tailwind.config.js`)
- Manrope autoalojada en `public/fonts` (variable, 200–800)
- Deploy: Vercel (`vercel.json` ya configurado)

## Comandos

```bash
npm run dev       # desarrollo en localhost:5173
npm run build     # build de producción a dist/
npm run preview   # sirve dist/ localmente
npm run lint      # oxlint

python scripts/contraste.py   # mide el contraste de las cuatro paletas
python scripts/capturas.py    # regenera las capturas de los casos
python scripts/og-image.py    # regenera la imagen de compartir
```

## Arquitectura

```
src/
├─ data/content.js     ← TODO el texto del sitio (es/en) + datos de casos + STACK
├─ components/         ← un componente por sección, sin lógica de negocio
│  ├─ Section.jsx      ← envoltorio común (eyebrow, título, subtítulo, espaciado)
│  ├─ ui.jsx           ← Words, Eyebrow, Frame, Arc, Tick, Check
│  ├─ icons.jsx        ← SVG inline, sin librería de iconos
│  ├─ ThemeSwitch.jsx  ← selector de estilo (compacto y completo)
│  ├─ DeviceMock.jsx   ← portátil + móvil del hero, dibujados en CSS
│  ├─ Bento + Lightbox ← rejilla de capturas y visor accesible
│  └─ Nav | Hero | Problems | Services | Styles | Outcomes | Projects
│     | CtaBand | Process | About | Stack | Contact | Footer
├─ hooks/
│  ├─ useTheme.js      ← estilo activo: localStorage + data-theme + theme-color
│  ├─ useReveal.js     ← IntersectionObserver único para las entradas
│  └─ useParallax | useMagnetic
├─ index.css           ← tokens en @theme + los CUATRO estilos + componentes
└─ App.jsx             ← idioma, estilo y composición de secciones
```

### Reglas que no se rompen

1. **El texto vive en `src/data/content.js`, nunca en los componentes.**
   `CONTENT.es` y `CONTENT.en` deben tener exactamente las mismas claves.
   Si agregas texto en un idioma, agrégalo en el otro en el mismo commit.
2. **Idioma y estilo se pasan por props**, no por contexto. Todas las secciones
   son hijas directas de `App`; el contexto sería complejidad sin beneficio.
   `useTheme()` se llama una sola vez, en `App`.
3. **Nada de librerías nuevas** sin una razón concreta. Iconos, animaciones,
   maquetas de dispositivo y layout se resuelven con SVG inline, CSS y Tailwind.
4. **Ni un color escrito a mano en un componente.** Todo pasa por los tokens de
   `index.css`. Si hace falta un color nuevo, se le da nombre primero en los
   cuatro estilos. Un componente que pregunte qué tema hay puesto para pintarse
   distinto está mal escrito: **no hay ni un `if (tema === …)` en el proyecto**.
5. **Toda sección nueva** usa `<Section>`, lleva `id`, entra en `SECTIONS` o
   `MENU` de `Nav.jsx` y suma su clave a `nav` en ambos idiomas.
6. **Animaciones**: agregar la clase `reveal` al elemento. El hook global lo
   detecta solo. Todo debe respetar `prefers-reduced-motion`.

## Posicionamiento

**No es un portafolio.** Es una marca personal comercial cuyo único objetivo es
captar clientes: 80% cliente, 20% él. El visitante tiene que pensar «esta
persona entiende los problemas de un negocio y puede resolver el mío», no «este
es programador y estas son sus tecnologías».

Idea central: **«Transformo procesos complejos en sistemas digitales simples.»**

Orden de secciones: hero → El problema → Soluciones → **Estilos** → Resultados →
Proyectos → CTA intermedio → Proceso → Sobre mí → Tecnologías → Contacto.

- **RubenDev es la marca comercial** (logo, navegación, `<title>`, OG). *Rubén
  Reto Panta* se mantiene en Sobre mí, el pie y el JSON-LD: la persona real
  detrás es lo que separa esto de una agencia sin rostro.
- Densidad: 5 problemas, 4 soluciones, 5 resultados, 5 pasos, 3 pilares de
  confianza. Si algo crece por encima de eso, hay que quitar otra cosa.
- **Las tecnologías van al final y en pequeño**, como banda de texto en `Stack`.
  Sin logotipos y sin rejilla — eso es lo que devolvería el aire de portafolio.
  Y **sólo las que están de verdad** en los dos casos o en este sitio: el array
  `STACK` de `content.js`. Nunca rellenar con lo que quedaría bien.
- El CTA aparece tres veces: hero, `CtaBand` a media página y contacto.
- El formulario de contacto **no tiene backend**: compone el mensaje y abre
  WhatsApp. Si algún día se envía a un servidor, hay que añadir aviso de datos.

## Los cuatro estilos

**Una sola marca, cuatro expresiones visuales.** No son cuatro páginas ni cuatro
rutas: es el mismo HTML con otras variables. Claro, oscuro, azul y verde.

- Los tokens por defecto van en `@theme` (= estilo claro) sólo para que Tailwind
  genere las utilidades. Los cuatro estilos se declaran después **fuera de toda
  `@layer`**, porque una regla sin capa gana a `@theme`.
- El selector es `[data-theme]` a secas, no `html[data-theme]`: así cualquier
  subárbol adopta un estilo. De eso viven las muestras del selector y la
  previsualización de la sección Estilos, que enseñan colores reales sin repetir
  la paleta en JavaScript.
- **Cada paleta se mide antes de darla por buena**: `python scripts/contraste.py`
  comprueba doce pares por estilo (texto ≥ 4.5:1, bordes de control ≥ 3:1). Si
  se toca un color, hay que volver a pasarlo y anotar el número en el CSS.
- **`--color-heading` y `--color-eyebrow` son lo que separa azul y verde del
  claro.** Con el acento sólo en el botón y en detalles, los tres claros se
  confundían — probado y descartado. Ahora los titulares (`text-heading` en h1,
  los h2 de sección y el nombre de cada caso) y las etiquetas de sección van del
  color de la marca en azul y en verde, y siguen en tinta en claro y en oscuro,
  donde el contraste blanco/negro ya los distingue.
  **El texto corrido y los subtítulos NO se tiñen nunca**: es lo que evita que
  parezca una web pintada de azul.
- El CTA también es distinto por estilo: tinta en claro, invertido en oscuro y
  del color de la marca en azul y verde. Junto con los arcos teñidos con el
  acento, completa el reconocimiento de un vistazo.
- El cambio añade `.theme-switching` al `<html>` durante 400 ms y la retira. No
  dejar la transición puesta siempre: cada hover arrastraría medio segundo de
  color. Sin recarga, sin cambiar de ruta, sin perder scroll ni estados.
- `index.html` lleva un script en línea que aplica el estilo guardado **antes de
  pintar**. Sin él, quien tenga el oscuro ve un fogonazo claro en cada carga.

## Diseño

- **Tipografía: Manrope**, autoalojada (`public/fonts`, variable 200–800, un
  archivo por subconjunto: 24,8 kB latin + 15,1 kB latin-ext). **Nunca por
  `<link>` a un tercero** — esa petición ya bloqueó el pintado una vez. El golpe
  del titular lo dan el peso 800 y el tracking cerrado (`-0.038em`) de `.display`.
- Microetiquetas (`.eyebrow`, `.tag`): versalitas con tracking amplio y peso 700.
  Nada de monoespaciada en la interfaz.
- **Composición asimétrica**: rejilla de 12 donde los bloques no comparten eje.
  El título ocupa 7 columnas y el subtítulo cae a la derecha alineado abajo.
  La asimetría **tiene que sostenerse a 375px**.
- **Casi nada de tarjetas**: el recurso por defecto es un bloque abierto bajo
  `border-t border-line`. `.card` queda para agrupar de verdad (el formulario y
  la banda de CTA). `.card-hover` sólo si el bloque es pulsable.
- El ritmo entre secciones lo marca el espacio vertical (`py-16 md:py-24`), no
  franjas de color. `<Section muted>` pinta `surface-2` y se usa **como mucho en
  dos secciones** de toda la página.
- **Las capturas son la evidencia**, no ilustración. Van claras, tal como salen
  del navegador, dentro de `<Frame>` —la ventana es lo que las ancla cuando el
  sitio está en oscuro— y pasan por `--shot-filter`. Las prepara
  `scripts/capturas.py`: difumina los datos de cliente del sistema de Arin
  (interno; la web de J&M es pública y no lleva nada), recorta el espacio muerto
  y exporta a WebP. `shots.py` y `aclarar.py` son de la etapa negra del sitio y
  ya no se usan.
- **Interacción, toda en CSS.** `.nav-link` dibuja un subrayado con `scaleX` (el
  estado activo lo deja puesto). Los bloques editoriales llevan `.block` +
  `.block-rule` —cuando el filete ya es un `<span>`— o `.block-top` —cuando lo
  dibuja un `border-t`—, y al pasar el cursor repintan el filete, desplazan
  `.block-title` 4px y encienden `.block-num`. **El color en reposo de
  `.block-num` va en el CSS, no en una utilidad `text-ink-soft`**: las utilidades
  de Tailwind se declaran después de `@layer components` y ganarían a la regla de
  hover.
- Todo lo anterior se apaga en `prefers-reduced-motion` y se enciende también con
  `:focus-within`, para que el teclado vea lo mismo que el ratón.
- `.link` lleva el subrayado en `::after` y `.tap` el área de toque en
  `::before`. **Nunca al revés**: si ambos usan el mismo pseudo-elemento se
  funden en una caja gris visible.
- Movimiento controlado: entrada fade + slide-up de 0.6s y microinteracciones de
  0.2s. Nada más largo, nada permanente.

## Móvil (iPhone y Android)

El sitio se diseña primero para 375px. Reglas que no se negocian:

- **Nada puede desbordar en horizontal.** Todo contenedor con un `<Arc>` dentro
  necesita `relative overflow-hidden`. `<Section>` ya lo trae.
- **Safe areas**: `index.html` usa `viewport-fit=cover`, así que los bordes se
  manejan con `env(safe-area-inset-*)`. Ya están puestos en `.shell`, en la barra
  fija, en el menú móvil y en el pie.
- **Altura**: usar `svh`, nunca `vh` — en iOS la barra de Safari rompe `100vh`.
- **Objetivo táctil de 44px** en todo lo accionable. Se verifica con
  `elementFromPoint`, **no midiendo la caja** — la caja no ve el pseudo-elemento
  de `.tap` y parece que no funciona. `.tap` **no sirve para elementos pegados
  entre sí**: los pseudo-elementos se solapan y el toque cae en el vecino. Ahí
  hay que dar altura real (los atajos del pie y el menú móvil van así).
- **El selector de estilos también va en el menú móvil**: en la barra no cabe y
  es justo donde más se agradece poder probar los cuatro.
- **Ningún efecto puede depender del hover**: todo lo que sea hover va dentro de
  `@media (hover: hover)`, porque en táctil se queda pegado.

## Efectos

- `.stagger` en una rejilla escalona la entrada de sus hijos `.reveal`.
- `<ScrollProgress>` anima `transform: scaleX`, nunca `width`.
- `.grain` es una textura SVG fija; su opacidad y su modo de fusión los pone cada
  estilo (`--grain-opacity`, `--grain-blend`). Mantenerla por debajo de 0.05.
- Todo movimiento se apaga en `prefers-reduced-motion`.

## Antes de dar algo por terminado

- `npm run build` sin errores
- `npm run lint` sin errores
- `python scripts/contraste.py` sin fallos si se tocó un color
- Paridad de claves ES/EN de `content.js` (script de una línea con `walk()`)
- Probar el toggle ES/EN en la sección tocada
- Probar **los cuatro estilos** a 375px y a 1440px
- Comprobar que el cambio de estilo no recarga, no salta el scroll y no pierde
  el estado del formulario ni del visor
