# Handoff: Portafolio RuberpDev — Rediseño etapa 1

## Resumen
Rediseño del portafolio personal de Rubén Reto Panta (repo `rretoarin/portafolio_rubenrp`, rama `main`).
Objetivo: un sitio más comercial, moderno, elegante y minimalista, **solo claro/oscuro** (se eliminan los temas azul y verde), bilingüe ES/EN, totalmente responsivo.

## Sobre los archivos de diseño
`Portafolio v2.dc.html` es una **referencia de diseño en HTML**: un prototipo que muestra el aspecto y el comportamiento buscados. **No es código para copiar y pegar** en el proyecto.
La tarea es **recrear este diseño dentro del proyecto React + Vite existente**, respetando sus patrones actuales: componentes en `src/components/`, copia centralizada en `src/data/content.js`, tokens CSS en `src/index.css`, hook `src/hooks/useTheme.js`.

## Fidelidad
**Alta fidelidad.** Colores, tipografía, espaciados, tiempos de animación y textos son definitivos. Reprodúcelos con exactitud usando los tokens del proyecto.

---

## 1. Sistema de temas — cambio estructural

Hoy el proyecto tiene **cuatro estilos** (claro, oscuro, azul, verde) con un selector de varios botones.
**Pasa a dos temas y un único botón** que alterna claro ↔ oscuro.

- `useTheme.js`: reduce el ciclo a `['claro','oscuro']`. Persiste en `localStorage`; primer arranque respeta `prefers-color-scheme: dark`.
- `ThemeSwitch.jsx`: un solo botón redondo de 44×44 px. Icono ☾ en claro, ☀ en oscuro. `aria-label` descriptivo.
- Elimina de `index.css` los bloques `[data-tema="azul"]` y `[data-tema="verde"]` y cualquier referencia a ellos.

### Tokens finales

**Claro** (`:root`)
```
--page:#f8f9fa;  --page-soft:#eceff2;  --surface:#ffffff;  --surface-2:#f1f3f6;
--line:#e1e5ea;  --edge:#767d86;       --ink:#101317;      --ink-soft:#535a63;
--accent:#9a5638; --accent-soft:#f3e9e4;
--btn:#101317;   --on-btn:#f8f9fa;     --mat:#eef0f3;      --shot-filter:none;
```

**Oscuro** (`[data-tema="oscuro"]`)
```
--page:#020202;  --page-soft:#0e0f11;  --surface:#0a0b0c;  --surface-2:#121416;
--line:#1f2225;  --edge:#6e747c;       --ink:#f4f5f6;      --ink-soft:#a5abb3;
--accent:#cbb894; --accent-soft:#16181b;
--btn:#f4f5f6;   --on-btn:#020202;     --mat:#121416;      --shot-filter:saturate(0.8) brightness(0.9);
```

> **Nota sobre el acento en oscuro:** el terracota `#9a5638` no alcanza 4.5:1 sobre `#020202`. En oscuro el acento pasa a arena `#cbb894`. Mantén esa distinción.

> **Capturas coloridas:** las imágenes del portafolio son muy saturadas y en oscuro pelean con el fondo. El token `--shot-filter` las atenúa; aplícalo a **toda** `img` de captura.

---

## 2. Logo

Requisito: **una sola línea** — isotipo RD + palabra «RuberpDev». Nada apilado.

```
<a href="#top" class="logo">            → display:flex; align-items:center; gap:9px
  <img src="/logo/icono-claro@2x.webp">  → height:32px; width:auto; max-width:44px; object-fit:contain
  <span>RuberpDev</span>                 → Sentient 19px, letter-spacing:-0.2px, white-space:nowrap
</a>
```

**No estirar el logo**: siempre `width:auto` + `object-fit:contain`. El bug anterior era `width` fijo.
En oscuro, invierte el isotipo por CSS en vez de cargar otro archivo:
```css
[data-tema="oscuro"] .logo img { filter: invert(1) brightness(1.08); }
```
En el pie el mismo logo a 24 px.

---

## 3. Cabecera

Barra pegajosa (`position:sticky; top:0; z-index:60`), fondo `--page`, borde inferior `--line`.
Contenido: `max-width:1140px`, `padding:12px 20px`, flex.

Orden: logo · nav · [☰ móvil] · [ES/EN] · [☾/☀] · botón «Hablemos».

- **Nav de escritorio**: visible solo desde `min-width:940px`. Enlaces: Soluciones · Proyectos · Proceso · Contacto. 14 px, `--ink-soft`, hover `--ink`.
  > Antes decía «Trabajo»; ahora es **«Proyectos»** (ES) / «Projects» (EN).
- **Subrayado animado** en cada enlace del nav:
  ```css
  [data-nav]{position:relative;padding-bottom:6px}
  [data-nav]::after{content:'';position:absolute;left:0;right:0;bottom:0;height:2px;
    background:var(--accent);transform:scaleX(0);transform-origin:left center;
    transition:transform .32s cubic-bezier(.22,.8,.26,1)}
  [data-nav]:hover::after,[data-nav]:focus-visible::after,[data-nav][data-on="1"]::after{transform:scaleX(1)}
  [data-tema="oscuro"] [data-nav]::after{background:#ffffff}
  ```
  `data-on="1"` lo pone un **scroll-spy**: la sección activa es la última cuyo `getBoundingClientRect().top <= 140`. Escucha `scroll` con `{passive:true}`. Implementable con `IntersectionObserver` si prefieres.
- **Botón de idioma**: píldora de 44 px de alto, muestra el idioma *destino* (`EN` cuando estás en español). Alterna toda la copia, incluidos los pies de foto de las capturas.
- **Botón de tema**: 44×44 px, redondo.
- **CTA «Hablemos»**: fondo `--btn`, texto `--on-btn`, `border-radius:999px`, `padding:13px 20px`, peso 700. Se oculta bajo 520 px (ya está en el menú móvil).
- **Menú móvil**: botón ☰ / ✕ bajo 940 px. Panel desplegable de ancho completo, fondo `--surface`, enlaces apilados con `padding:15px 0` y separador `--line`, más el CTA de WhatsApp a lo ancho al final. Cierra al elegir un enlace.

---

## 4. Héroe

Grid de 2 columnas: `repeat(auto-fit, minmax(min(100%,330px),1fr))`, `gap:clamp(28px,5vw,56px)`.

**Columna izquierda**
- Antetítulo: 12 px, `letter-spacing:2.2px`, mayúsculas, `--accent`, peso 700.
- H1: Sentient 400, `clamp(33px,5.2vw,58px)`, `line-height:1.06`, `letter-spacing:-1px`, `text-wrap:pretty`.
  ES: «El sistema que transforma tu operación en algo simple.»
  EN: «The system that turns your operation into something simple.»
- Bajada: `clamp(15px,1.5vw,18px)`, `line-height:1.65`, `--ink-soft`, `max-width:46ch`.
- Dos botones: primario relleno + secundario con borde, ambos `border-radius:999px`, `padding:16px 26px`.
- **Tres cifras** separadas por borde superior. **Importante:** son `1` / `1` / `0` — «1 sistema interno en producción», «1 página web en línea», «0 intermediarios». *No digas «2 sistemas»*: es un sistema interno y una página web.

**Columna derecha — visor**
- Marco `aspect-ratio:16/11`, `padding:24px 26px 0 0` (deja aire a las cartas de atrás).
- Mazo de 3 cartas apiladas en `position:absolute; inset:0`, cada una con barra de ventana falsa (26 px, tres puntos) y la imagen debajo.
- Transformación por índice `k` (0 = frontal):
  `translate3d(k*7%, k*-5%, 0) scale(1 - k*0.06) rotate(k*1.3deg)`, origen `bottom left`, `opacity: 1 - k*0.2`, `blur(0.5px)` en las de atrás, `z-index: 10-k`.
  Transición `transform .5s cubic-bezier(.22,.8,.26,1), opacity .5s ease`.
- **Las imágenes nunca se recortan**: `object-fit:contain` sobre fondo `--mat`.
- **Solo 2 capturas aquí**, una por proyecto: `muestras-1.webp` y `jm-1.webp`.
- Controles: ← · pausa/play · → (44×44 px), contador «1 / 2», etiqueta «Un vistazo a cada proyecto», barra de progreso de 2 px en `--accent`, y pie de foto bajo el visor (`min-height:42px` para que no salte el layout).
- Avance automático cada **2900 ms**. Pausa al pasar el mouse, con el botón, con las flechas ← →, y si `document.hidden`.

---

## 5. Soluciones

Fondo `--page-soft`, bordes arriba y abajo.
Grid `repeat(auto-fit,minmax(min(100%,240px),1fr))` con `gap:1px` sobre fondo `--line` y borde exterior: así las líneas divisorias son el propio gap (sin bordes dobles).
Cada tarjeta: fondo `--surface`, `padding:28px 24px`, número 01–04 en `--accent`, título Sentient 20 px, texto 14.5 px. Hover: fondo `--page-soft`.
Las cuatro tarjetas: Páginas web · Sistemas web · Automatización · Integraciones.

---

## 6. Proyectos (antes «Casos reales»)

Grid `repeat(auto-fit,minmax(min(100%,300px),1fr))`, `gap:20px`. Dos tarjetas:

**Arin S.A. — Sistema de Gestión de Muestras** (2026 · interno) — 8 capturas
**J&M Consulting Foods — Sitio y panel de contenidos** (2026 · en línea) — 6 capturas + enlace «Visitar el sitio →»

Cada `<article>`: borde `--line`, fondo `--surface`, `padding:clamp(22px,3vw,32px)`, flex columna, `gap:14px`.
Hover: `transform:translateY(-4px)` + `box-shadow:0 18px 40px rgba(16,19,23,.09)`.
Etiquetas de tecnología: píldoras con borde, 11.5 px.

### Carrusel «pasar página de un libro» (uno por tarjeta)

Se eliminaron los enlaces «Ver sus 8 / 6 capturas». Ahora cada tarjeta muestra **todas** sus capturas, solas.

```css
@keyframes rp-flip { from { transform:rotateY(0deg); } to { transform:rotateY(-118deg); } }
```

Contenedor: `position:relative; aspect-ratio:16/10; background:var(--mat); border:1px solid var(--line); border-radius:10px; overflow:hidden; perspective:1500px;`

- Capa base: la imagen **nueva**, `object-fit:contain`, `filter:var(--shot-filter)`.
- Capa que voltea: la imagen **anterior**, montada solo mientras dura la animación. Usa un `div` con `background-image` (no un `<img>`), `background-size:contain`, `transform-origin:left center`, `z-index:3`, `backface-visibility:hidden`, `box-shadow:6px 0 24px rgba(0,0,0,.18)`, `animation: rp-flip 900ms cubic-bezier(.45,.05,.25,1) forwards`. Se desmonta a los 930 ms.

**Tiempos definitivos:** ciclo de **2900 ms** por captura → ~2 s quieta + 0,9 s de volteo. Mismo ritmo en todos los dispositivos.
Pausa al pasar el mouse sobre la tarjeta y cuando `document.hidden`.

> ⚠️ **Trampa que ya costó varias vueltas.** Si el intervalo se crea en `useEffect`/`componentDidMount` sin limpiarlo bien, se **acumulan varios temporizadores** y las imágenes pasan mucho más rápido de lo configurado. En React: un solo `useEffect` con `[]` o con `[tick]` y `return () => clearInterval(id)`. Verifica con `console.count` que solo existe un intervalo.

Bajo cada carrusel: «3/8 · <pie de foto>», 12.5 px, `min-height:38px`.

---

## 7. Proceso

Fondo `--page-soft`. Grid `repeat(auto-fit,minmax(min(100%,190px),1fr))`, `gap:24px`.
Cinco pasos: Conversamos · Diseñamos · Desarrollamos · Lanzamos · Te acompaño.
Cada uno con `border-top:2px` — el primero en `--accent`, el resto en `--line`.

---

## 8. Contacto

Grid de 2 columnas, `gap:clamp(28px,4vw,52px)`.

**Izquierda**
- Antetítulo en `--accent`, H2 Sentient `clamp(28px,3.8vw,44px)`.
- **Bloque de perfil** (no lo quites): foto `/ruben.webp` a 76×76 px, `border-radius:999px`, `object-fit:cover`, `object-position:center top`, borde `--line`; al lado el nombre «Rubén Reto Panta» en Sentient 19 px y el rol «Desarrollador full stack · Lima, Perú» en 13 px mayúsculas.
- Texto (definitivo):
  > Soy Rubén, desarrollador full stack especializado en crear soluciones digitales para negocios. Me apoyo en inteligencia artificial para avanzar más rápido y entregarte antes, pero las decisiones las tomo yo y todo pasa por mi revisión. Hablas directamente conmigo, del primer boceto al despliegue.
- Botones: WhatsApp +51 933 214 520 (relleno) y «Escribir un correo» (borde).

**Derecha**: cita en `--accent-soft` con borde, Sentient `clamp(18px,2vw,22px)`, firmada «Rubén Reto Panta · Lima, Perú».

---

## 9. Pie

Dos bloques.

**Superior** — grid `repeat(auto-fit,minmax(min(100%,220px),1fr))`, `gap:clamp(28px,4vw,48px)`, `padding:clamp(40px,5vw,64px) 20px 28px`:
1. Navegación vertical (las cuatro secciones).
2. **Contacto** con iconos SVG en línea (WhatsApp, sobre, LinkedIn) a 16 px, `opacity:.75`, `gap:11px`: teléfono, correo, LinkedIn.
3. **Sitio**: «Diseñado y construido por mí» / «Claro y oscuro, un mismo contenido» / «Desplegado en Vercel».

**Inferior** — separado por `border-top:1px solid var(--line)`, `padding:22px 20px 34px`: isotipo 24 px · «© 2026 Rubén Reto Panta · Todos los derechos reservados.» · botón circular ↑ de 44 px alineado a la derecha.

**Botón flotante de WhatsApp**: `position:fixed; right:20px; bottom:20px; z-index:80`, 56×56 px, fondo `#0f6b4f` (hover `#0c5640`), icono blanco 28 px, `box-shadow:0 10px 26px rgba(15,107,79,.4)`.

---

## 10. Responsivo

Sin anchos fijos en ningún sitio. La regla es `clamp()` + `auto-fit`:
- Todos los grids: `repeat(auto-fit, minmax(min(100%, Npx), 1fr))` — el `min(100%, …)` evita el desborde horizontal en pantallas estrechas.
- Tipografía y espaciados con `clamp()`; nada de unidades de viewport en alturas.
- Único punto de corte real: **940 px** (nav ↔ hamburguesa). Secundario: **520 px** (oculta el CTA de cabecera).
- Objetivos táctiles nunca por debajo de **44×44 px**.
- `overflow-x:hidden` en el contenedor raíz.
- Verificar en 360, 390, 768, 1024, 1280 y 1920 px.

## 11. Animaciones

```css
a, button, nav a, article, [data-card] {
  transition: color .32s ease, background-color .32s ease, border-color .32s ease,
              opacity .32s ease, transform .32s ease, box-shadow .32s ease;
}
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration:.01ms !important; transition-duration:.01ms !important; }
}
```
Entrada del héroe: `@keyframes rp-in` (opacidad 0→1, `translateY(14px)→0`), 0.7 s / 0.8 s con 0.1 s de retardo en la columna derecha.

## 12. Bilingüe ES/EN

Toda la copia vive en un diccionario `{ es: {...}, en: {...} }` — encaja con el `src/data/content.js` actual. Incluye **los 14 pies de foto** de las capturas en ambos idiomas (están en el prototipo, cópialos tal cual). El idioma se guarda en `localStorage`.

## Recursos

- Fuentes: Sentient (display) y Satoshi (texto), variables, ya en `public/fonts/`.
- Logo: `public/logo/icono-claro@2x.webp` (en oscuro se invierte por CSS).
- Foto: `public/ruben.webp`.
- Capturas: `public/proyectos/muestras-1..8.webp`, `jm-1..6.webp` y sus variantes en `public/proyectos/oscuro/`.
  > **Pendiente:** se mencionaron 16 capturas y en el repo hay 14 (8 + 6). Si faltan dos, súbelas y añádelas al arreglo.

## Archivos de este paquete
- `Portafolio v2.dc.html` — el prototipo completo, referencia visual y de comportamiento.
- `github.md` — repo, rama y mapa de pantallas ↔ archivos del repo.

## Prompt sugerido para Claude Code

> Lee `design_handoff_portafolio_v2/README.md`. Es el rediseño de este portafolio. Aplícalo sobre el código actual de React + Vite respetando la arquitectura existente (`src/components`, `src/data/content.js`, tokens en `src/index.css`, `useTheme`). Empieza por el punto 1 (reducir de cuatro temas a claro/oscuro con un solo botón) y ve sección por sección, mostrándome el diff de cada una antes de pasar a la siguiente. No toques la lógica de despliegue.
