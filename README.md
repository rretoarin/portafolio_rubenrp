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

## Desplegar en Netlify

1. Sube el repositorio a GitHub.
2. En Netlify: *Add new site → Import an existing project* y elige el repo.
3. Netlify lee `netlify.toml`, así que no hay que configurar nada a mano
   (build `npm run build`, publish `dist`).
4. Opcional: *Domain settings* para poner tu dominio o cambiar el subdominio
   `.netlify.app`.

Después del primer deploy, actualiza la URL real en `index.html`
(`<link rel="canonical">` y las etiquetas `og:url`).

## Estructura

Ver `CLAUDE.md` — describe la arquitectura y las convenciones del proyecto.
