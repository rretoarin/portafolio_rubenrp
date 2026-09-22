# RuberpDev — marca personal de Rubén Reto Panta

Marca personal comercial de un desarrollador full stack. Sitio de una sola
página, bilingüe (ES/EN), con tema claro y oscuro.

> **Rediseño v2 (2026-09-21).** `design_handoff_portafolio_v2/README.md` manda
> sobre este archivo. Se aplica sección por sección y este documento se pone al
> día en cada paso; si algo de aquí contradice el handoff, gana el handoff.

## Stack

- React 19 + Vite 8
- Tailwind CSS v4 (plugin `@tailwindcss/vite`, **sin** `tailwind.config.js`)
- Dos tipografías autoalojadas en `public/fonts`, las dos variables:
  Sentient (serifa, titulares) y Satoshi (sans, todo lo demás)
- Deploy: Vercel (`vercel.json` ya configurado)

## Comandos

```bash
npm run dev       # desarrollo en localhost:5173
npm run build     # build de producción a dist/
npm run preview   # sirve dist/ localmente
npm run lint      # oxlint

python scripts/contraste.py   # mide el contraste de las dos paletas
python scripts/capturas.py    # regenera las capturas de los casos
python scripts/capturas-estilo.py  # y su variante para el tema oscuro
python scripts/logo.py        # recorta el isotipo + el logo de la tarjeta OG
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
│  ├─ Logo.jsx         ← isotipo + «RuberpDev» en una línea
│  ├─ ThemeSwitch.jsx  ← botón único claro ↔ oscuro
│  ├─ HeroDeck.jsx     ← mazo de capturas del hero (una por proyecto)
│  ├─ Lightbox.jsx     ← visor de capturas, accesible
│  └─ Nav | Hero | Services | Process | Projects | Contact | Footer
├─ hooks/
│  ├─ useTheme.js      ← estilo activo: localStorage + data-theme + theme-color
│  ├─ useReveal.js     ← IntersectionObserver único para las entradas
│  ├─ useMedia.js      ← una media query en JS, para lo que no se puede con CSS
│  └─ useParallax | useMagnetic
├─ index.css           ← tokens en @theme + los DOS temas + componentes
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
   dos temas. Un componente que pregunte qué tema hay puesto para pintarse
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

Dos frases sostienen toda la comunicación (la de Estilos, «El diseño cambia. La
calidad no.», se fue con la sección en el v2):

1. **«Transformo procesos complejos en soluciones digitales simples.»**
2. **«No te dejo solo después del lanzamiento.»** — el paso 05 del proceso, que
   es el argumento que más separa a RuberpDev de quien entrega y desaparece.

### Cinco secciones. Ni una más

`hero → Proyectos → Soluciones → Proceso → Contacto`. La prueba va primero: el
visitante ve trabajo real antes de que se le pida confianza (reordenado el
2026-09-21; la sección Estilos se eliminó ese mismo día). El mismo orden en
`App.jsx`, en `SECTIONS`/`MENU` de `Nav.jsx` y en `LINKS` de `Footer.jsx`.

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
- **Las píldoras de tipos de cliente y las cifras del hero** (1 sistema / 1
  web / 0 intermediarios) — las cifras volvieron con el v2 y Rubén las quitó
  otra vez el 2026-09-21. No volver a ponerlas.

### Densidad

4 soluciones · 5 pasos · 2 proyectos. Cada caso es **una tarjeta con un
carrusel y tres líneas** (problema, solución, resultado).

- **Nunca «2 sistemas»**: es UN sistema interno (Arin) y UNA página web
  (J&M). Así lo dice el subtítulo de Proyectos.
- **Carrusel «pasar página de un libro»** en cada tarjeta (`Carrusel` en
  `Projects.jsx`): enseña TODAS las capturas (8 de Arin, 6 de J&M), sin
  enlaces «Ver las N capturas». La captura nueva va debajo con `contain` sobre
  `--color-mat`; la anterior, como `span` con fondo, gira con `rp-flip` 900 ms
  sobre su borde izquierdo y se desmonta a los 930. Ciclo de **2900 ms** en
  todos los anchos. Pausa con el puntero sobre la tarjeta y con
  `document.hidden`. Pie «3/8 · texto», 12.5px, `min-height:38px`. Al pulsar la
  captura se abre el visor en la que esté a la vista.
- **Trampa**: un intervalo sin limpiar se acumula y las páginas pasan mucho más
  rápido. Un solo `useEffect` con `clearInterval` en el cleanup. Verificado con
  Chrome headless contando los `setInterval(…, 2900)` vivos: uno por carrusel.
- Los 14 pies de foto (ES/EN) son los del handoff, copiados tal cual.
- El pie lista las cuatro secciones: Soluciones, Proyectos, Proceso, Contacto.

- **RuberpDev es la marca comercial** (logo, navegación, `<title>`, OG). *Rubén
  Reto Panta* se mantiene en el cierre, el pie y el JSON-LD: la persona real
  detrás es lo que separa esto de una agencia sin rostro.
- **Las tecnologías no son protagonistas.** Una línea al pie de cada caso
  («Construido con…») y se acabó. El cliente compra el resultado.
- **La IA se menciona UNA sola vez**, en la frase personal del cierre, y siempre
  con la misma forma: argumento de velocidad para el cliente y control humano
  explícito («las decisiones las tomo yo y todo pasa por mi revisión»). Nunca
  como característica técnica ni en más de un sitio.
- El formulario de contacto **no tiene backend**: compone el mensaje y abre
  WhatsApp. Si algún día se envía a un servidor, hay que añadir aviso de datos.
- Los canales (WhatsApp, correo, LinkedIn) van **sólo en el pie**. Estuvieron
  duplicados en Contacto y en el pie.

## Los dos temas: claro y oscuro

**Una sola marca, dos temas.** Mismo HTML con otras variables. Azul y verde se
eliminaron en el rediseño v2 (2026-09-21), con sus capturas y sus logos.

- **Un solo botón** (`ThemeSwitch`) alterna claro ↔ oscuro. `useTheme` guarda
  la elección en `localStorage` (clave `rubendev-theme`, nombre viejo a
  propósito) **sólo cuando el visitante pulsa**; el primer arranque sigue
  `prefers-color-scheme`. `index.html` hace la misma lectura en línea **antes de
  pintar**, para que el oscuro no dé un fogonazo claro.
- **Fondos**: `#F8F9FA` (Seasalt) en claro y `#020202` en oscuro. Los eligió
  Rubén; no cambiarlos sin preguntar.
- **El acento cambia de color entre temas**: terracota `#9a5638` en claro y
  arena `#cbb894` en oscuro, porque el terracota no llega a 4.5:1 sobre
  `#020202`. Mantener esa distinción.
- Tokens nuevos del v2: `--color-mat` (paspartú de las capturas con
  `object-fit: contain`: `#eef0f3` / `#121416`) y `--shot-filter`.
- Los tokens por defecto van en `@theme` (= claro) sólo para que Tailwind
  genere las utilidades. Los dos temas se declaran después **fuera de toda
  `@layer`**, porque una regla sin capa gana a `@theme`. El selector es
  `[data-theme]` a secas (el handoff escribe `data-tema`; en el código es
  `data-theme`).
- **Cada paleta se mide antes de darla por buena**: `python scripts/contraste.py`
  (texto ≥ 4.5:1, controles ≥ 3:1). Si se toca un color, hay que volver a
  pasarlo y anotar el número en el CSS.
- El cambio añade `.theme-switching` al `<html>` durante 400 ms y la retira. No
  dejar la transición puesta siempre. Sin recarga, sin cambiar de ruta, sin
  perder scroll ni estados.
- **Única comparación con el tema en un componente**: el `aria-label` de
  `ThemeSwitch` (dice a qué tema lleva). El icono lo elige el CSS. Aparte,
  `shotFor()` cambia la ruta de la captura. Nada más pregunta el tema.

## Diseño

### El logo RuberpDev

**Una sola línea**: isotipo RD + la palabra «RuberpDev». Nada apilado (el
logotipo apilado se retiró en el v2).

- `<a href="#top" class="logo">` → `display:flex; align-items:center; gap:5px` (el handoff decía 9; Rubén lo quería más junto).
- Isotipo: `<img src="/logo/icono-claro@2x.webp">` a `height:15px;
  width:auto` (24×15 visibles). **Nunca un `width` fijo**: ése era el bug que
  lo estiraba. En el pie, el mismo isotipo a 12px (`.logo-img-sm`).
- **El archivo va recortado al dibujo (91×56), sin margen transparente.** La
  exportación común de `logo.py` dejaba ~34px vacíos a cada lado, que a 44px
  de ancho sumaban ~10px al `gap` y separaban el «RD» del nombre (~19px en
  vez de 9). `logo.py` lo recorta al final con `recortar_margen()`. El handoff
  pedía `height:32px; max-width:44px`, que con el margen daba este mismo
  tamaño visible; ahora se da la altura directamente (2026-09-21).
- Palabra: Sentient 19px, `letter-spacing:-0.2px`, `white-space:nowrap`.
- **En oscuro se invierte por CSS** (`filter: invert(1) brightness(1.08)`) en
  vez de cargar otro archivo. Efecto conocido: el corte rojo sale en cian.
- El isotipo sale de la lámina de concepto (`scripts/logo-fuente/refrencia.png`
  → `scripts/logo.py`). **No redibujarlo.** El script ya sólo exporta
  `icono-claro@2x.webp` y la tarjeta de compartir (`tarjeta-claro.webp`), pero
  sigue midiendo los cuatro cuadrantes de la lámina porque la caja común sale
  de su unión.
- **El favicon es otra pieza** (disco con «RD» calado) y cambia con el tema del
  navegador, no con el del sitio.
- **Si cambia el nombre de la marca**: `PROFILE.brand` en `content.js`, el
  `<title>` y las OG de `index.html`, y rehacer la lámina para el isotipo.

### Tipografía, composición e interacción

- **Dos tipografías, y cada una tiene su trabajo.** **Sentient** (serifa) en los
  titulares; **Satoshi** (sans) en todo lo que se lee de verdad:
  menú, texto corrido, botones, etiquetas y títulos de tarjeta. Es el
  emparejamiento editorial clásico y es lo que da el aire premium; una serifa a
  cuerpo pequeño sólo ensucia, y una sans sola no distingue la marca de
  cualquier otra web.
  - Las dos son de Fontshare (licencia gratuita para uso comercial), las dos
    autoalojadas y variables, un archivo cada una con el juego latino completo:
    `satoshi-variable.woff2` 42,6 kB (300–900) y `sentient-variable.woff2`
    49,4 kB (200–700). **Nunca por `<link>` a un tercero** — esa petición ya
    bloqueó el pintado una vez. Las dos se precargan en `index.html`: las dos
    salen en la primera pantalla.
  - El reparto vive en dos tokens y en tres clases: `--font-display` es la
    serifa y `--font-sans` la sans; `.display` (titulares) va a la primera,
    `.display-light` y todo lo demás a la segunda. El logotipo no entra en el
    reparto: va en trazos y no usa ninguna de las dos.
    **`.display-light` apunta a `--font-sans` a propósito**: si apuntara al
    token de titulares, los títulos de tarjeta se llenarían de remates.
  - **El golpe del titular NO lo da el peso.** `.display` va a 400 con
    `-0.02em`: en una serifa el carácter está en los remates y el contraste del
    trazo, y a peso 700 se emborrona. Los `-0.038em` que hubo eran de una sans
    geométrica, donde cerrar el espacio compacta el bloque; aquí los remates ya
    ocupan ese hueco y al apretarlos las letras se tocan.
  - **Y el tracking tampoco es libre**: con `-0.01em` —lo natural para una
    serifa— el titular del hero se iba a cinco líneas y empujaba la fila de
    soluciones fuera de la primera pantalla en una ventana de 800px de alto.
    Medido en 1440x800, 1440x900, 375 y 360. La interlinea sube a 1.06 por lo
    mismo: a 1.02 las descendentes rozan las mayúsculas de la línea siguiente.
- Microetiquetas (`.eyebrow`, `.tag`): versalitas con tracking amplio y peso 700.
  Nada de monoespaciada en la interfaz.
- **Composición asimétrica**: rejilla de 12 donde los bloques no comparten eje.
  El título ocupa 7 columnas y el subtítulo cae a la derecha alineado abajo.
  La asimetría **tiene que sostenerse a 375px**.
- **Casi nada de tarjetas**: el recurso por defecto es un bloque abierto bajo
  `border-t border-line`. `.card` queda para agrupar de verdad (el formulario y
  la banda de CTA). `.card-hover` sólo si el bloque es pulsable.
- El ritmo entre secciones lo marca el espacio vertical (`py-10 md:py-12`, y lo
  mismo en `Contact` y en el `pt` del pie), no franjas de color. **Medido**:
  entre el final de una sección y el título de la siguiente quedan ~106px en
  escritorio y ~90px en móvil, iguales en los seis cortes; de la barra al
  primer texto del hero, 39px, y tras saltar por el menú, 54px en escritorio
  y 46px en móvil (medido 2026-09-21). El destino de las anclas es `.ancla`
  en `index.css`: el borde de la sección cae justo bajo la barra (4rem, 5rem
  desde `md`, más el safe area). Si cambia el alto de la barra, cambia ahí. Rubén marcó como huecos los 200px de `py-24` y después
  también los 138px de `md:py-16` (2026-09-11); por encima de ~110 deja de
  leerse como ritmo.
- **El hero NO ocupa la pantalla entera ni centra su contenido.** Mide lo que
  mide su contenido. Pasó por dos versiones peores: con `min-h-svh` e
  `items-center` el sobrante de una pantalla alta se repartía arriba y abajo, y
  arriba se leía como un hueco entre la barra y el titular; con `mt-auto` en la
  fila de soluciones el sobrante caía entre los botones y la fila, y Rubén lo
  marcó como hueco (2026-09-11): crecía con la altura de la ventana, 210px en
  una de 900 y 390 en una de 1080. Ahora la fila va a 64px fijos de los
  botones en cualquier pantalla y, en las altas, asoma el comienzo de
  Soluciones, que invita a bajar. **No volver a estirar el hero con `svh`.**
- **Los arcos NO pueden tocar el texto.** `<Arc>` va dentro de `.arc-marco`,
  cuya máscara sólo lo deja pasar por fuera de la columna de `.shell` (78rem más
  2,5rem de aire). Por debajo de ese ancho los topes de la máscara se cruzan y
  el arco no se dibuja: si no cabe fuera del texto, no va. Además se oculta
  entero por debajo de `lg`.
  **Colocarlos «bien» no funciona y se probó**: el ancho de la columna cambia
  con la ventana y el largo del texto con el idioma, así que cada ajuste
  arreglaba un ancho y rompía otro. Medido a 320, 390, 768, 1024, 1280, 1440 y
  1600: **cero píxeles de arco sobre texto**. Se comprueba capturando la página
  con y sin arcos y restando las dos imágenes; el solape de cajas no vale,
  porque la caja del arco es enorme y lo que se ve es sólo el trazo.
- `<Section muted>` pinta `surface-2` y se usa **como mucho en dos secciones**
  de toda la página.
- **Las capturas son la evidencia**, no ilustración. Van dentro de `<Frame>` y a
  ancho completo. Las prepara `scripts/capturas.py` desde
  `Desktop\clauderin muestras` (11) y `Desktop\claude\web` (8): pixela los
  nombres de clientes y usuarios del sistema de Arin (localizados con el OCR
  de Windows; el saludo «Ruben Reto» se deja), le pone a TODAS las de Arin una
  marca de agua diagonal tenue («RuberpDev · datos protegidos»), recorta el
  espacio muerto y exporta a WebP. La web de J&M es pública y no lleva nada.
  `shots.py` y `aclarar.py` son de la etapa negra del sitio y ya no se usan.
- **Las capturas se sirven con `srcset`** (`src/data/capturas.js`). Se pintan
  a 260–680 px y los originales miden 900–1600: el navegador las reducía 2–5x
  dentro de capas con `transform` (volteo, mazo) y se veían blandas.
  `capturas-estilo.py` exporta copias con Lanczos (`nombre@400w/560w/800w/1120w`,
  en claro y en oscuro) y escribe sus anchos en `src/data/capturas.json`; ahora
  la reducción es de 1–1,4x. El visor a pantalla completa sigue con el
  original. Si cambia el ancho de un visor, cambia `SIZES_*`.
- **En la variante oscura las fotos se marcan a mano** (`FOTOS` en
  `capturas-estilo.py`: caja, forma y bordes desde los que buscar fondo
  blanco). El detector automático dejaba franjas blancas, fotos a medias y se
  saltaba las de fondo blanco. Si se recaptura una pantalla con fotos, hay que
  volver a medir sus cajas.
- **Capturas por tema**: en oscuro salen de `public/proyectos/oscuro/`
  (negativo + giro de tono de media vuelta, que genera
  `scripts/capturas-estilo.py`) y además llevan `filter: var(--shot-filter)`
  —`saturate(0.8) brightness(0.9)`—, que se aplica a **toda** imagen de
  captura. En claro, `--shot-filter: none`. La ruta la resuelve `shotFor()` de
  `content.js` en `Hero` y `Projects`.
- **`scrim` y `on-scrim` son los únicos colores que NO cambian con el estilo.**
  Velan una captura —leyenda del bento, contador de capturas, fondo del visor— y
  tienen que ser oscuros en los dos. Con `ink`/`page` se invertían y en oscuro
  aparecía un bloque blanco encima de la imagen.
- **Interacción, casi toda en CSS.** `.nav-link` dibuja el subrayado del hover
  con `scaleX`, nunca animando el ancho. El estado activo de la barra es la
  excepción: no lo pinta cada enlace, lo pinta **un solo riel compartido**
  (`.nav-rail`) que se desplaza de una sección a la siguiente, porque encender
  uno y apagar otro se leía como parpadeo. Su posición la mide `Nav.jsx` con
  `getBoundingClientRect` —hacen falta los decimales— y la escribe en un
  `transform`; se remide al cambiar de sección, al cambiar de idioma (las
  palabras no miden lo mismo) y con un `ResizeObserver`. Mide **1px y no 1.5**:
  con `transform` va en su propia capa y ahí el navegador no ajusta la altura a
  la rejilla, así que 1.5 se reparte entre dos filas y la línea sale más blanda
  que el trazo del hover. Los bloques editoriales llevan `.block` +
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
- **El tema es un solo botón redondo de 44×44** en la barra (☾ en claro, ☀ en
  oscuro), en todos los anchos. Las muestras de color y su `radiogroup` ya no
  existen.
- **El menú a pantalla completa arranca justo bajo la barra**, no centrado: con
  `justify-center` dejaba más de cien píxeles muertos antes del primer enlace.
- **El pie va a dos columnas desde 375px**, no desde `sm`: apilado dejaba media
  pantalla vacía a la derecha. Los **enlaces van en fila fluida a lo ancho** y
  contacto y sitio se emparejan debajo, que tienen alto parecido. En una columna
  propia los enlaces dejaban un agujero de 176px —son más cortos que los otros
  dos juntos— y en dos subcolumnas quedaba una celda suelta.
- **El correo no cabe en media columna.** `truncate` lo dejaba cortado y
  `break-all` lo partía por donde tocase («rubenretopanta@g / mail.com»): va con
  un `<wbr>` después de la arroba, así que parte por donde se lee bien.
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
- Probar **los dos temas** a 375px y a 1440px
- Comprobar que el cambio de estilo no recarga, no salta el scroll y no pierde
  el estado del formulario ni del visor ...
  
