import { useCallback, useEffect, useRef, useState } from 'react'

/*
 * Los cuatro estilos de RubenDev. El orden es el del selector.
 *
 * Aquí sólo vive el identificador: los colores están en `src/index.css` y los
 * nombres visibles, en `content.js` (uno por idioma). Este archivo no sabe de
 * ninguna de las dos cosas, así que añadir un quinto estilo es añadir su bloque
 * de variables, su copia y su entrada en esta lista. Nada más.
 */
export const THEMES = ['claro', 'oscuro', 'azul', 'verde']

export const DEFAULT_THEME = 'claro'

const STORAGE_KEY = 'rubendev-theme'

// El mismo cálculo que corre el script en línea de `index.html` antes de pintar.
export function readTheme() {
  if (typeof window === 'undefined') return DEFAULT_THEME
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (THEMES.includes(saved)) return saved
  } catch {
    // Modo privado o cookies bloqueadas: se arranca con el estilo por defecto.
  }
  return DEFAULT_THEME
}

/*
 * Fuente de verdad del estilo visual. Se llama UNA vez, en `App`, y el valor se
 * pasa por props a los dos únicos consumidores (la barra y la sección Estilos).
 * Es el `ThemeProvider` de toda la vida sin meter contexto, que aquí sería
 * complejidad sin beneficio — el mismo criterio que ya se sigue con el idioma.
 *
 * Ningún componente pregunta qué tema hay puesto para pintarse distinto: todos
 * consumen las variables de diseño. Lo único que hace este hook es escribir
 * `data-theme` en el <html>.
 */
export function useTheme() {
  const [theme, setThemeState] = useState(readTheme)
  const primeraVez = useRef(true)

  useEffect(() => {
    const raiz = document.documentElement
    raiz.dataset.theme = theme

    try {
      window.localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      // Sin almacenamiento el estilo simplemente no sobrevive a la recarga.
    }

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
     * no: si no, el sitio entraría fundiendo desde el estilo por defecto y se
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

  const setTheme = useCallback((siguiente) => {
    if (THEMES.includes(siguiente)) setThemeState(siguiente)
  }, [])

  return [theme, setTheme]
}
