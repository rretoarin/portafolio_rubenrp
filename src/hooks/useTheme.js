import { useCallback, useEffect, useRef, useState } from 'react'

/*
 * Los dos temas de RuberpDev: claro y oscuro. Un solo botón los alterna.
 *
 * Aquí sólo vive el identificador: los colores están en `src/index.css` y los
 * nombres visibles, en `content.js` (uno por idioma).
 */
export const THEMES = ['claro', 'oscuro']

export const DEFAULT_THEME = 'claro'

/*
 * Se queda con el nombre viejo de la marca A PROPÓSITO. Renombrarla a
 * `ruberpdev-theme` haría que todo el que ya ha visitado el sitio perdiera el
 * tema que tenía elegido. No es una errata: no tocarla.
 * El mismo literal está en el script en línea de `index.html`.
 */
const STORAGE_KEY = 'rubendev-theme'

/*
 * El mismo cálculo que corre el script en línea de `index.html` antes de pintar:
 * lo guardado manda; si no hay nada (o era azul o verde, que ya no existen), el
 * primer arranque sigue la preferencia del sistema.
 */
export function readTheme() {
  if (typeof window === 'undefined') return DEFAULT_THEME
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (THEMES.includes(saved)) return saved
  } catch {
    // Modo privado o cookies bloqueadas: se sigue con la preferencia del sistema.
  }
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'oscuro' : DEFAULT_THEME
}

/*
 * Fuente de verdad del tema. Se llama UNA vez, en `App`, y el valor se pasa por
 * props. Ningún componente pregunta qué tema hay puesto para pintarse distinto:
 * todos consumen las variables de diseño. Lo único que hace este hook es
 * escribir `data-theme` en el <html>.
 */
export function useTheme() {
  const [theme, setThemeState] = useState(readTheme)
  const primeraVez = useRef(true)

  useEffect(() => {
    const raiz = document.documentElement
    raiz.dataset.theme = theme

    /*
     * La barra del navegador en móvil. Se lee el color ya resuelto en vez de
     * repetir la tabla de colores aquí: así el CSS sigue siendo el único sitio
     * donde vive la paleta.
     */
    const pagina = getComputedStyle(raiz).getPropertyValue('--color-page').trim()
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta && pagina) meta.setAttribute('content', pagina)

    /*
     * El fundido se enciende sólo mientras dura el cambio. En el primer render
     * no: si no, el sitio entraría fundiendo desde el tema por defecto y se
     * vería un parpadeo de color al cargar.
     */
    if (primeraVez.current) {
      primeraVez.current = false
      return
    }

    raiz.classList.add('theme-switching')
    const id = setTimeout(() => raiz.classList.remove('theme-switching'), 400)
    return () => clearTimeout(id)
  }, [theme])

  /*
   * Se guarda sólo cuando el visitante elige, no en cada render: si se guardara
   * al arrancar, la preferencia del sistema quedaría congelada en la primera
   * visita y dejaría de seguirla aunque nunca hubiese tocado el botón.
   */
  const setTheme = useCallback((siguiente) => {
    if (!THEMES.includes(siguiente)) return
    setThemeState(siguiente)
    try {
      window.localStorage.setItem(STORAGE_KEY, siguiente)
    } catch {
      // Sin almacenamiento el tema simplemente no sobrevive a la recarga.
    }
  }, [])

  return [theme, setTheme]
}
