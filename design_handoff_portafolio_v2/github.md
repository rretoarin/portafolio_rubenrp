repo: rretoarin/portafolio_rubenrp
branch: main
path: src, public

## Last sync
date: 2026-09-21T12:24:08Z

### Updated in this project
- Rediseño etapa 1 en `Portafolio v2.dc.html`: solo claro/oscuro con un único botón de tema.
- Logo en una línea: isotipo RD + «RuberpDev» (sin logotipo apilado).
- Visor de capturas tipo mazo apilado (14 pantallas reales), filtrable por proyecto, con teclado y controles táctiles de 44px.
- Layout fluido con `clamp()` + `auto-fit`: móvil, tablet, laptop y escritorio sin breakpoints rígidos.

## Screen map
| Pantalla | Archivos del repo |
| --- | --- |
| Portafolio v2 — copia completa | src/data/content.js |
| Portafolio v2 — paleta claro/oscuro | src/index.css (tokens `--color-*`) |
| Portafolio v2 — hero y mazo de capturas | src/components/Hero.jsx, public/proyectos/*, public/proyectos/oscuro/* |
| Portafolio v2 — tema | src/hooks/useTheme.js, src/components/ThemeSwitch.jsx |
| Portafolio v2 — logo | src/components/Logo.jsx, public/logo/icono-*.webp |
| Portafolio v2 — tipografía | public/fonts/sentient-variable.woff2, satoshi-variable.woff2 |
