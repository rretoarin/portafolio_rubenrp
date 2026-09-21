import TAMANOS from './capturas.json'

/*
 * `srcset` de una captura ya resuelta por `shotFor()` (clara u oscura).
 *
 * `capturas.json` lo escribe `scripts/capturas-estilo.py`: por cada captura,
 * los anchos de sus copias reducidas (`nombre@560w.webp`, con Lanczos) y, al
 * final, el del original. Sin esto el navegador reducía los originales 2–5
 * veces dentro de capas con `transform` y se veían sin nitidez.
 */
export function srcsetFor(ruta) {
  const m = ruta.match(/^(.*\/)([^/]+)\.webp$/)
  const anchos = m && TAMANOS[m[2]]
  if (!anchos) return undefined
  const original = anchos[anchos.length - 1]
  return anchos
    .map((w) => (w === original ? `${ruta} ${w}w` : `${m[1]}${m[2]}@${w}w.webp ${w}w`))
    .join(', ')
}

/*
 * A qué ancho se pinta cada visor, para que `srcset` elija bien. Medido:
 * carrusel 555 px a 1440, 437 a 1024, 678 a 768 y el ancho de la pantalla
 * menos márgenes en móvil; el mazo del hero, ~540 en escritorio.
 */
export const SIZES_CARRUSEL = '(min-width: 1024px) 560px, (min-width: 768px) 680px, calc(100vw - 40px)'
export const SIZES_MAZO = '(min-width: 1024px) 540px, calc(100vw - 66px)'
