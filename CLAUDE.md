# RubenDev — marca personal de Rubén Reto Panta

Marca personal comercial de un desarrollador full stack. Sitio de una sola
página, bilingüe (ES/EN), con **cuatro identidades visuales** que el visitante
cambia en vivo.

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

python scripts/contraste.py   # mide el contraste de las cuatro paletas
python scripts/capturas.py    # regenera las capturas de los casos
python scripts/capturas-estilo.py  # y su variante por estilo visual
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
- **La IA se menciona UNA sola vez**, en la frase personal del cierre, y siempre
  con la misma forma: argumento de velocidad para el cliente y control humano
  explícito («las decisiones las tomo yo y todo pasa por mi revisión»). Nunca
  como característica técnica ni en más de un sitio.
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
- **`--color-nav-line` es el subrayado del menú** —el riel del estado activo y
  el trazo del hover, que son la misma línea— y va del color de la marca: el
  mismo acento que pinta el «Dev» del logotipo. Así el «estás aquí» es también
  una señal de marca y cambia con el estilo como todo lo demás. **En oscuro es
  la excepción**: ahí va en tinta, porque sobre negro la línea blanca es la que
  se ve. Se aplica sólo en la barra; en el pie `.nav-link` sigue con
  `currentColor`, porque allí la línea acompaña al texto y no marca sección.
- El CTA también es distinto por estilo: tinta en claro, invertido en oscuro y
  del color de la marca en azul y verde. Junto con los arcos teñidos con el
  acento, completa el reconocimiento de un vistazo.
- El cambio añade `.theme-switching` al `<html>` durante 400 ms y la retira. No
  dejar la transición puesta siempre: cada hover arrastraría medio segundo de
  color. Sin recarga, sin cambiar de ruta, sin perder scroll ni estados.
- `index.html` lleva un script en línea que aplica el estilo guardado **antes de
  pintar**. Sin él, quien tenga el oscuro ve un fogonazo claro en cada carga.

## Diseño

- **Dos tipografías, y cada una tiene su trabajo.** **Sentient** (serifa) en los
  titulares y en la marca; **Satoshi** (sans) en todo lo que se lee de verdad:
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
    serifa y `--font-sans` la sans; `.display` (titulares) y `.wordmark` (la
    marca) van a la primera, `.display-light` y todo lo demás a la segunda.
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
  - La marca lleva clase propia (`.wordmark`, peso 700) y no `.display`: un
    logotipo a 18px necesita cuerpo, y a 400 se quedaba en nada.
- Microetiquetas (`.eyebrow`, `.tag`): versalitas con tracking amplio y peso 700.
  Nada de monoespaciada en la interfaz.
- **Composición asimétrica**: rejilla de 12 donde los bloques no comparten eje.
  El título ocupa 7 columnas y el subtítulo cae a la derecha alineado abajo.
  La asimetría **tiene que sostenerse a 375px**.
- **Casi nada de tarjetas**: el recurso por defecto es un bloque abierto bajo
  `border-t border-line`. `.card` queda para agrupar de verdad (el formulario y
  la banda de CTA). `.card-hover` sólo si el bloque es pulsable.
- El ritmo entre secciones lo marca el espacio vertical (`py-12 md:py-16`), no
  franjas de color. **Medido**: entre el final de una sección y el título de la
  siguiente quedan ~135px en escritorio y ~103px en móvil, y de la barra al
  primer texto del hero, 39px. Con `py-24` eran 200 y Rubén los marcó como
  huecos; por encima de eso deja de leerse como ritmo.
- **El hero NO centra su contenido.** Con `items-center`, en una pantalla alta el
  espacio que sobra se repartía arriba y abajo, y arriba se leía como un hueco
  entre la barra y el titular — daba igual bajar el `padding`, porque el centrado
  lo recuperaba. Ahora es una columna: el bloque arranca bajo la barra y la fila
  de soluciones va con `mt-auto`, anclada al pie de la primera pantalla, así que
  el sobrante cae entre las dos y no encima del titular. `<Section muted>` pinta `surface-2` y se usa **como mucho en
  dos secciones** de toda la página.
- **Las capturas son la evidencia**, no ilustración. Van dentro de `<Frame>` y a
  ancho completo. Las prepara `scripts/capturas.py`: difumina los datos de
  cliente del sistema de Arin (interno; la web de J&M es pública y no lleva
  nada), recorta el espacio muerto y exporta a WebP. `shots.py` y `aclarar.py`
  son de la etapa negra del sitio y ya no se usan.
- **Cada estilo tiene su propio juego de capturas** en `public/proyectos/<estilo>/`,
  que genera `scripts/capturas-estilo.py` desde los WebP ya terminados, y **no es
  lo mismo en todos**:
  - **oscuro**: TODAS invertidas (negativo + giro de tono de media vuelta),
    porque una captura clara a pantalla completa deslumbra sobre el negro.
  - **azul y verde**: sólo las de J&M, y sólo se les cambia **el verde de marca**
    —titular, botones, filete del menú, iconos— por el color del estilo. El texto
    negro, los grises, el fondo y las fotos no se tocan. Las del sistema de Arin
    no tienen color de marca que cambiar, así que en los tres estilos claros son
    las mismas.
- **Se probó teñir todos los grises de la captura y Rubén lo rechazó**: la imagen
  entera se volvía azul y parecía un filtro encima, no un rediseño. Lo que sí
  funciona es cambiar el color de marca y dejar el resto intacto.
- **Un filtro CSS no sirve** para ninguno de los dos tratamientos: no distingue
  una foto de una tabla ni un verde de marca de un verde cualquiera. En los dos,
  las zonas de foto se repegan en color original; se detectan solas por variedad
  de color por casilla y las que se escapen van a mano en el dict `KEEP`.
- La ruta la resuelve `shotFor()` de `content.js` en `Hero`, `Styles` y
  `Projects`, y de ahí para abajo todos reciben rutas ya resueltas. **Es la única
  excepción** a que el estilo no cambie más que variables: cambia un archivo, no
  cómo se pinta un componente.
- **El pie del caso no puede prometer colores exactos** («tal como se ve hoy»):
  en tres de los cuatro estilos la captura lleva tratamiento. Dice que son reales
  y en producción, que es lo que sí se sostiene.
- **`scrim` y `on-scrim` son los únicos colores que NO cambian con el estilo.**
  Velan una captura —leyenda del bento, contador de capturas, fondo del visor— y
  tienen que ser oscuros en los cuatro. Con `ink`/`page` se invertían y en oscuro
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
- **Las cuatro muestras van en la barra, a la altura de la marca, siempre.**
  Pasaron por dos versiones peores: sólo dentro del menú (no se encontraban) y
  detrás de un desplegable (se abría sobre el hero y costaba un toque de más
  para algo que es una seña de identidad). Ahora no hay desplegable.
- **Nunca llevan los nombres a la vista**, sólo el color. Pero los nombres siguen
  en un `sr-only` y en el `aria-label` del grupo: quitarlos del DOM dejaría el
  selector mudo para un lector de pantalla.
- **Los botones encogen con el ancho** —28px, 36px desde 390px y 44px desde
  `md`— porque a 320px cuatro círculos de 44 empujaban el menú fuera de la
  pantalla. `overflow-x: clip` lo ocultaba, así que **el botón desaparecía sin
  que se notara en las medidas**: hay que comprobar que el último control entra
  entero (`right <= innerWidth`), no sólo que no haya scroll horizontal.
- **Por debajo de 360px el botón de idioma sale de la barra** y se queda sólo en
  el menú a pantalla completa, donde está siempre. Es lo único que se podía
  ceder: las cuatro muestras y el menú no admiten menos sitio.
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
- Probar **los cuatro estilos** a 375px y a 1440px
- Comprobar que el cambio de estilo no recarga, no salta el scroll y no pierde
  el estado del formulario ni del visor
