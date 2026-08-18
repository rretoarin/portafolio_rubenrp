# Portafolio — Rubén Reto Panta

Sitio personal. React + Vite + Tailwind CSS v4. Una sola página, bilingüe (ES/EN),
minimalista en negro.

## Correr en local

```bash
npm install
npm run dev
```

## Editar el contenido

Todo el texto está en un solo archivo: **`src/data/content.js`**.

| Qué quieres cambiar | Dónde |
| --- | --- |
| Nombre, correo, LinkedIn | `PROFILE` |
| Proyectos: URL, año, tecnologías | `PROJECTS` |
| Proyectos: nombre, descripción, logros | `CONTENT.es.projects.items` y `CONTENT.en.projects.items` |
| Tecnologías del stack | `STACK` |
| Cualquier otro texto | `CONTENT.es` / `CONTENT.en` |

> Si agregas un texto en español, agrégalo también en inglés con la misma clave.

### Agregar un proyecto nuevo

1. Añade una entrada a `PROJECTS` con un `id` único.
2. Añade ese mismo `id` dentro de `projects.items` en **ambos** idiomas.
3. Listo: la sección se renderiza sola y la numeración se recalcula.

Si el proyecto es interno y no tiene demo pública, deja `url: null` y el sitio
mostrará la etiqueta de sistema privado automáticamente.

## Desplegar en Vercel

`vercel.json` ya trae el build, el fallback de SPA y las cabeceras de caché y
seguridad. No hay que configurar nada en el panel.

### Opción A — desde esta carpeta (la más rápida, sin GitHub)

```bash
npx vercel login     # una sola vez
npx vercel           # despliegue de prueba, te da una URL
npx vercel --prod    # publica en la URL definitiva
```

### Opción B — conectado a GitHub (despliegue automático en cada push)

1. Crea un repositorio vacío en GitHub.
2. Conéctalo y sube el código:

   ```bash
   git remote add origin https://github.com/USUARIO/portafolio.git
   git branch -M main
   git push -u origin main
   ```

3. En vercel.com: *Add New → Project → Import Git Repository*.
4. Vercel detecta Vite y lee `vercel.json`. Sólo pulsa *Deploy*.

Desde ahí, cada `git push` a `main` publica solo.

### Después del primer despliegue

Actualiza la URL real en `index.html` — la etiqueta `<link rel="canonical">` y
`og:url`. Ahora mismo apuntan a `https://portafolio-rubenrp.vercel.app/`, que es un
marcador de posición.

## Estructura

Ver `CLAUDE.md` — describe la arquitectura y las convenciones del proyecto.
