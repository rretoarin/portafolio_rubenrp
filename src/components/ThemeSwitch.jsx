import { Moon, Sun } from './icons'

/*
 * Interruptor de tema: un solo botón redondo de 44×44 que alterna claro ↔
 * oscuro. Enseña el tema al que LLEVA —luna en claro, sol en oscuro— y el
 * `aria-label` dice lo mismo con palabras.
 *
 * Los dos iconos están siempre en el DOM y el CSS enseña el que toca según el
 * `data-theme` del <html>: así el componente no pregunta qué tema hay puesto
 * para pintarse distinto. La etiqueta sí depende del tema, pero es texto, no
 * aspecto, y viene resuelta de `content.js`.
 */
export default function ThemeSwitch({ theme, onChange, labels }) {
  const oscuro = theme === 'oscuro'
  return (
    <button
      type="button"
      onClick={() => onChange(oscuro ? 'claro' : 'oscuro')}
      aria-label={oscuro ? labels.toLight : labels.toDark}
      className="theme-toggle flex size-11 shrink-0 items-center justify-center rounded-full border border-line text-ink"
    >
      <Moon width={18} height={18} className="theme-toggle-moon" />
      <Sun width={18} height={18} className="theme-toggle-sun" />
    </button>
  )
}
