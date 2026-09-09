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
 * Dos tamaños, el mismo componente: `compact` para la barra y el menú móvil,
 * `full` para la sección Estilos, donde cada opción lleva su nombre.
 */
export default function ThemeSwitch({ theme, onChange, labels, variant = 'compact' }) {
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

  const completo = variant === 'full'

  return (
    <div
      ref={grupo}
      role="radiogroup"
      aria-label={labels.aria}
      onKeyDown={onKeyDown}
      className={completo ? 'grid gap-3 sm:grid-cols-2' : 'flex items-center gap-1'}
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
            onClick={() => onChange(id)}
            className={
              completo
                ? `style-option flex items-center gap-4 rounded-[var(--radius-card)] border p-4 text-left transition-colors ${
                    activo
                      ? 'border-ink bg-surface-2'
                      : 'border-line hover:border-edge'
                  }`
                : `style-option flex size-11 items-center justify-center rounded-full transition-colors ${
                    activo ? 'bg-page-soft' : ''
                  }`
            }
          >
            <Swatch theme={id} className={completo ? 'size-9 shrink-0' : 'size-5'} />

            {completo ? (
              <span className="min-w-0">
                <span className="block font-semibold">{labels.names[id]}</span>
                <span className="mt-0.5 block text-sm text-ink-soft">{labels.moods[id]}</span>
              </span>
            ) : (
              <span className="sr-only">{labels.names[id]}</span>
            )}
          </button>
        )
      })}
    </div>
  )
}
