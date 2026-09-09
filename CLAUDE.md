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
python scripts/oscurecer.py   # y su variante para el estilo oscuro
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
│  ├─ Lightbox.jsx     ← visor de capturas, accesible
│  └─ Nav | Hero | Services | Styles | Process | Projects | Contact | Footer
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
captar clientes: 80% cliente, 20% él. El visitante tiene que pensar «esta persona
entiende los problemas de un negocio y puede resolver el mío», no «este es
programador y estas son sus tecnologías».

Tres frases sostienen toda la comunicación:

1. **«Transformo procesos complejos en soluciones digitales simples.»**
2. **«El diseño cambia. La calidad no.»** — la sección Estilos.
3. **«No te dejo solo después del lanzamiento.»** — el paso 05 del proceso, que
   es el argumento que más separa a RubenDev de quien entrega y desaparece.

### Seis secciones. Ni una más

`hero → Soluciones → Estilos → Proceso → Casos → CTA final`

La home se recorre en menos de un minuto y mide **unas seis pantallas**. Llegó a
tener once secciones y quince pantallas, y el problema nunca fue que el diseño
fuera malo: era que había demasiado contenido. **Antes de añadir una sección hay
que quitar otra**, y antes de añadir cualquier cosa: *¿ayuda a que un cliente
confíe y quiera escribir?* Si no, fuera.

Lo que se quitó en el recorte del 2026-09-09 y **no debe volver**:

- **El problema** como sección propia — el diagnóstico ya lo hace el subtítulo de
  Soluciones.
- **Resultados** («de procesos manuales a procesos digitales») — decía lo mismo
  que las soluciones con otras palabras.
- **Tecnologías** como sección — sale al pie de cada caso y nada más. Ver abajo.
- **Un CTA intermedio** — con tres CTA (hero, barra y cierre) sobra.
- **Sobre mí** como sección — queda una frase con la foto dentro del cierre, que
  es donde se decide. El cliente no necesita la trayectoria para entender qué
  gana.
- **Las píldoras de tipos de cliente y el trío de prueba del hero** — empujaban
  la maqueta fuera de la primera pantalla.

### Densidad

4 soluciones · 4 estilos · 5 pasos · 2 casos. Cada caso es **una tarjeta con una
captura y tres líneas** (problema, solución, resultado); las demás capturas viven
en el visor, a un clic. Antes cada caso ocupaba tres pantallas.

- **RubenDev es la marca comercial** (logo, navegación, `<title>`, OG). *Rubén
  Reto Panta* se mantiene en el cierre, el pie y el JSON-LD: la persona real
  detrás es lo que separa esto de una agencia sin rostro.
- **Las tecnologías no son protagonistas.** Una línea al pie de cada caso
  («Construido con…») y se acabó. El cliente compra el resultado.
- El formulario de contacto **no tiene backend**: compone el mensaje y abre
  WhatsApp. Si algún día se envía a un servidor, hay que añadir aviso de datos.
- Los canales (WhatsApp, correo, LinkedIn) van **sólo en el pie**. Estuvieron
  duplicados en Contacto y en el pie.

## Los cuatro estilos

**Una sola marca, cuatro expresiones visuales.** No son cuatro páginas ni cuatro
rutas: es el mismo HTML con otras variables. Claro, oscuro, azul y verde.

- **Sólo hay dos fondos, y los eligió Rubén**: `#F8F9FA` (Seasalt) para claro,
  azul y verde, y `#020202` para oscuro. **Los tres claros comparten base a
  propósito**: lo único que los separa es el color de la marca. No cambiarlos sin
  preguntar.
- Por eso el acento de **claro es terracota y no salvia**: con la misma base que
  verde, un acento verdoso hacía que las dos muestras del selector se
  confundieran, que es justo donde el visitante elige.
- Los tokens por defecto van en `@theme` (= estilo claro) sólo para que Tailwind
  genere las utilidades. Los cuatro estilos se declaran después **fuera de toda
  `@layer`**, porque una regla sin capa gana a `@theme`.
- El selector es `[data-theme]` a secas, no `html[data-theme]`: así cualquier
  subárbol adopta un estilo. De eso viven las muestras de la barra y **las cuatro
  miniaturas de la sección Estilos**, que se ven a la vez con sus colores reales
  sin repetir la paleta en JavaScript. Esas miniaturas SON el selector: ver y
  elegir es el mismo gesto, y demuestran la capacidad de adaptación mejor que
  cualquier párrafo.
- **Cada paleta se mide antes de darla por buena**: `python scripts/contraste.py`
  comprueba diecisiete pares por estilo (texto ≥ 4.5:1, controles ≥ 3:1). Si
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
- **Las capturas son la evidencia**, no ilustración. Van dentro de `<Frame>` y a
  ancho completo. Las prepara `scripts/capturas.py`: difumina los datos de
  cliente del sistema de Arin (interno; la web de J&M es pública y no lleva
  nada), recorta el espacio muerto y exporta a WebP. `shots.py` y `aclarar.py`
  son de la etapa negra del sitio y ya no se usan.
- **El estilo oscuro tiene su propio juego de capturas**, en
  `public/proyectos/oscuro/`, que genera `scripts/oscurecer.py` desde los WebP ya
  terminados. **Un filtro CSS no sirve** y está probado: `invert()` apaga los
  colores de marca y deja las FOTOS en negativo — la gente de los talleres de
  J&M salía con la piel invertida, y el pie del caso dice "tal como se ve hoy".
  La receta que funciona es negativo + giro de tono de media vuelta, y después
  **repegar las zonas de foto en color original**; se detectan solas por variedad
  de color por casilla, y las que se escapen van a mano en el dict `KEEP`.
  La ruta la resuelve `shotFor()` de `content.js` en `Hero` y en `Projects`, y de
  ahí para abajo todos reciben rutas ya resueltas. **Es la única excepción** a
  que el estilo no cambie más que variables: cambia un archivo, no cómo se pinta
  un componente.
- **`scrim` y `on-scrim` son los únicos colores que NO cambian con el estilo.**
  Velan una captura —leyenda del bento, contador de capturas, fondo del visor— y
  tienen que ser oscuros en los cuatro. Con `ink`/`page` se invertían y en oscuro
  aparecía un bloque blanco encima de la imagen.
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
- **El selector de estilos está en la barra también en móvil.** Las cuatro
  muestras no caben junto al logo, el idioma y el menú (ni a 320px), así que se
  dibuja una sola —la del estilo puesto— y abre un desplegable con las cuatro. El
  corte es en `md`. Está además dentro del menú a pantalla completa, que es otra
  vía, no la única: la primera versión sólo lo tenía ahí y no se encontraba.
- **En móvil el desplegable NO lleva los nombres a la vista**, sólo los círculos:
  con cuatro filas de texto medía 240×150 y tapaba el titular del hero. Ahora es
  una píldora de 198×54 que deja el `h1` limpio. Los nombres siguen en un
  `sr-only` y en el `aria-label` — quitarlos del DOM habría dejado el selector
  mudo para un lector de pantalla.
- **El desplegable se ancla al `<header>`, no al botón que lo abre.** Anclado al
  botón se salía de la pantalla por la izquierda a 320px, porque el botón no está
  pegado al borde: tiene el idioma y el menú a su derecha.
- **Ningún efecto puede depender del hover**: todo lo que sea hover va dentro de
  `@media (hover: hover)`, porque en táctil se queda pegado.
- **Ni del teclado.** El visor tenía las flechas en `hidden sm:flex` y en el
  móvil no hay teclado: se abría y no se podía pasar de la primera captura, con
  el contador marcando «01 / 08». Por debajo de `sm` los controles van bajo el
  pie de foto, a 44px. Si se añade un control que sólo existe en escritorio, hay
  que preguntarse cómo se hace lo mismo con el dedo.

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
