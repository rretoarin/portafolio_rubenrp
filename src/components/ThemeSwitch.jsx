import { useRef } from 'react'
import { THEMES } from '../hooks/useTheme'

/*
 * Muestra de un estilo. El truco está en el `data-theme` del propio <span>: las
 * variables de tema se declaran para cualquier elemento, no sólo para el <html>,
 * así que aquí dentro `--color-page` y `--color-accent` valen los del tema al
 * que lleva el botón. Los colores de verdad, sin repetir la paleta en JS.
 */
export function Swatch({ theme, className = '' }) {
  return (
    <span aria-hidden data-theme={theme} className={`swatch ${className}`}>
      <span className="swatch-half bg-page" />
      <span className="swatch-half bg-accent" />
    </span>
  )
}

/*
 * Selector de estilos. Es un `radiogroup` de verdad: una sola parada de
 * tabulador y las flechas mueven la selección, que es lo que espera quien
 * navega con teclado. La etiqueta la pone quien lo usa.
 *
 * Una sola presentación: la fila de cuatro muestras. La usan la barra de
 * escritorio, el desplegable de la barra en móvil y el menú a pantalla completa.
 * En móvil no lleva nombres a la vista —el color ES la señal— pero cada botón
 * conserva el suyo para quien navega con lector de pantalla.
 *
 * En la sección Estilos el selector son las cuatro miniaturas del sitio, que
 * viven en `Styles.jsx`: ahí ver y elegir tienen que ser el mismo gesto.
 *
 * Todas mantienen los 44px de objetivo táctil: los botones van pegados entre sí
 * y `.tap` no sirve ahí — los pseudo-elementos se solapan y el toque cae en el
 * vecino.
 */
export default function ThemeSwitch({ theme, onChange, labels, onPick }) {
  const grupo = useRef(null)

  // Flechas: mueven la selección en círculo y dejan el foco donde corresponde.
  const onKeyDown = (event) => {
    const paso = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[event.key]
    if (!paso) return
    event.preventDefault()
    const i = THEMES.indexOf(theme)
    const siguiente = THEMES[(i + paso + THEMES.length) % THEMES.length]
    onChange(siguiente)
    grupo.current?.querySelector(`[data-theme-option="${siguiente}"]`)?.focus()
  }

  return (
    <div
      ref={grupo}
      role="radiogroup"
      aria-label={labels.aria}
      onKeyDown={onKeyDown}
      className="flex items-center gap-1"
    >
      {THEMES.map((id) => {
        const activo = id === theme
        return (
          <button
            key={id}
            type="button"
            role="radio"
            aria-checked={activo}
            data-theme-option={id}
            tabIndex={activo ? 0 : -1}
            onClick={() => {
              onChange(id)
              onPick?.(id)
            }}
            className={`style-option flex size-11 items-center justify-center rounded-full transition-colors ${
              activo ? 'bg-page-soft' : ''
            }`}
          >
            <Swatch theme={id} className="size-5" />
            <span className="sr-only">{labels.names[id]}</span>
          </button>
        )
      })}
    </div>
  )
}
