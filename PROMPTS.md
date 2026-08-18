# Prompts para seguir armando el portafolio con Claude Code

Este proyecto ya tiene un `CLAUDE.md` con la arquitectura y las reglas. Claude Code
lo lee solo al abrir la carpeta, así que **no hace falta repetir el stack ni las
convenciones en cada prompt**. Los prompts de abajo asumen eso.

---

## 1. Prompt maestro (si quisieras regenerar el sitio de cero)

Úsalo sólo si empiezas en una carpeta vacía. Si ya tienes este proyecto, salta al punto 2.

> Construye mi portafolio personal como desarrollador full stack. Soy Rubén Reto
> Panta: trabajo de punta a punta (React, Node.js, Express, MongoDB) y me
> especializo en traducir el requerimiento y la necesidad real del cliente en un
> sistema que lo resuelve. Estudié arquitectura de software en la Universidad
> Católica, y eso define cómo construyo: capas claras, datos bien modelados y
> decisiones que aguantan el tiempo. Uso Claude Code para acelerar el desarrollo,
> siempre supervisando cada cambio.
>
> **Stack:** React + Vite + Tailwind CSS v4 (plugin de Vite, sin archivo de
> config). Sin librerías de UI, animación ni iconos: SVG inline y CSS.
>
> **Diseño:** minimalista, fondo negro real (#000), jerarquía sólo por escala de
> grises. Tipografía Inter para texto y JetBrains Mono para etiquetas y números.
> Títulos en peso ligero con tracking negativo. Bordes de 1px, sin sombras ni
> degradados llamativos. Que se sienta sobrio y caro, no oscuro y genérico.
>
> **Secciones:** hero, perfil, proyectos, proceso de trabajo, stack, contacto.
>
> **Proyectos:**
> 1. J&M Consulting Foods (https://jm-consulting-foods.netlify.app/) — sitio
>    corporativo con panel de administración para una consultora de inocuidad
>    alimentaria: servicios, proceso, sectores, clientes, blog editable y
>    contacto con WhatsApp.
> 2. Sistema de Gestión de Muestras — herramienta interna de empresa, sin demo
>    pública: registro de muestras, seguimiento por estados, trazabilidad
>    completa y roles de acceso, sobre React + Node + MongoDB.
>
> **Contacto:** rubenretopanta@gmail.com y
> https://www.linkedin.com/in/ruben-reto-panta-1580301a8/
>
> **Requisitos:** bilingüe ES/EN con un toggle, con TODO el texto centralizado en
> `src/data/content.js` (mismas claves en ambos idiomas). Responsive real desde
> 375px. Accesible: navegación por teclado, foco visible y respeto a
> `prefers-reduced-motion`. Meta tags y Open Graph completos. Listo para Netlify.
>
> Antes de terminar corre `npm run build` y `npm run lint`, y arregla lo que salga.

---

## 2. Prompts para el día a día

Copia, ajusta y pega. Uno por vez: Claude Code trabaja mejor con un objetivo claro.

### Agregar un proyecto

> Agrega un proyecto nuevo a la sección de proyectos: se llama **[NOMBRE]**, es
> **[qué es y para quién]**, resolvió **[el problema del cliente]**, y lo construí
> con **[tecnologías]**. La URL es **[URL o "es interno, sin demo pública"]**.
> Escribe 4 logros concretos en la lista de highlights, en español y en inglés.
> Redáctalo enfocado en el problema resuelto, no en la lista de features.

### Ajustar el texto

> Reescribe la sección **[cuál]** en `content.js`. Quiero que suene **[más
> directo / menos técnico / más orientado a empresas]**. Mantén las mismas claves
> y actualiza español e inglés a la vez.

### Sección nueva

> Agrega una sección de **[servicios / experiencia / testimonios]** entre
> **[sección A]** y **[sección B]**. Sigue el patrón de `Section.jsx`, agrégala a
> `SECTIONS` en `Nav.jsx` y añade sus textos en ambos idiomas.

### Revisar el diseño

> Revisa el sitio a 375px, 768px y 1440px y arregla lo que se vea mal: texto que
> se desborda, espaciados inconsistentes o áreas de toque menores a 44px. No
> cambies la paleta ni el estilo general.

### Rendimiento y SEO

> Audita el sitio para producción: tamaño del bundle, meta tags, texto alternativo,
> jerarquía de encabezados y contraste. Dame los hallazgos ordenados por impacto
> antes de cambiar nada.

### Antes de publicar

> Prepara el sitio para el deploy: actualiza la URL canónica y las etiquetas
> Open Graph a **[mi dominio]**, verifica que `npm run build` y `npm run lint`
> pasen limpio, y dime exactamente qué pasos me tocan a mí en Netlify.

---

## 3. Cómo pedir bien (lo que más cambia el resultado)

- **Di el problema, no la solución.** "El hero se ve vacío en móvil" da mejor
  resultado que "ponle margin-top 40px al hero".
- **Un objetivo por prompt.** Cinco cambios en un mensaje salen peor que cinco
  mensajes.
- **Pide el plan antes del código** cuando el cambio es grande: *"antes de tocar
  nada, dime cómo lo harías"*. Ahí corriges el rumbo barato.
- **Aprovecha `CLAUDE.md`.** Cuando corrijas algo dos veces, no lo corrijas una
  tercera: pide *"agrega esa regla a CLAUDE.md"* y deja de repetirlo.
- **Exige la verificación.** Cerrar con *"corre el build y el lint antes de decir
  que terminaste"* evita entregas rotas.
- **Revisa el diff.** Es tu portafolio y tu criterio el que se está mostrando;
  el código tiene que ser código que puedas defender en una entrevista.
