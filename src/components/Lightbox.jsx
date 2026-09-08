import { useCallback, useEffect, useRef } from 'react'
import { ArrowRight, Close } from './icons'

/*
 * Visor de capturas a pantalla completa. Existe para que el bento pueda mostrar
 * las imágenes pequeñas sin perder el detalle: quien quiera leer la interfaz
 * hace clic y la ve grande.
 *
 * Accesibilidad, que en un overlay es donde más se rompe:
 * - `role="dialog"` y `aria-modal`, con el título en `aria-label`.
 * - El foco entra al abrir y vuelve al disparador al cerrar.
 * - Tab queda atrapado dentro; Escape cierra; las flechas cambian de captura.
 * - El fondo no se desplaza mientras está abierto.
 */
export default function Lightbox({ shots, captions, index, name, labels, onClose, onMove }) {
  const panel = useRef(null)
  const disparador = useRef(null)
  const abierto = index !== null

  const mover = useCallback(
    (paso) => onMove((index + paso + shots.length) % shots.length),
    [index, onMove, shots.length],
  )

  /*
   * Apertura y cierre. Va en su propio efecto y depende SÓLO de `abierto`: si
   * dependiera también del índice se volvería a ejecutar en cada flecha, y al
   * cerrar devolvería el foco al panel en vez de al botón que abrió el visor.
   */
  useEffect(() => {
    if (!abierto) return
    disparador.current = document.activeElement
    panel.current?.focus()
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = ''
      disparador.current?.focus?.()
    }
  }, [abierto])

  // El teclado sí cambia con el índice; resuscribirlo no toca el foco.
  useEffect(() => {
    if (!abierto) return

    const onKey = (e) => {
      if (e.key === 'Escape') return onClose()
      if (e.key === 'ArrowRight') return mover(1)
      if (e.key === 'ArrowLeft') return mover(-1)
      if (e.key !== 'Tab') return
      // Trampa de foco: sólo hay botones, así que basta con ciclar entre ellos.
      const focos = panel.current?.querySelectorAll('button')
      if (!focos?.length) return
      const primero = focos[0]
      const ultimo = focos[focos.length - 1]
      if (e.shiftKey && document.activeElement === primero) {
        e.preventDefault()
        ultimo.focus()
      } else if (!e.shiftKey && document.activeElement === ultimo) {
        e.preventDefault()
        primero.focus()
      }
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [abierto, mover, onClose])

  if (!abierto) return null

  return (
    <div
      className="lightbox fixed inset-0 z-[70] flex flex-col bg-ink/92 p-4 backdrop-blur-sm md:p-8"
      onClick={onClose}
    >
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-label={`${labels.galleryLabel} — ${name}`}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="mx-auto flex h-full w-full max-w-6xl flex-col outline-none"
      >
        <div className="flex items-center justify-between gap-4 pb-4">
          <p className="text-sm font-medium text-page">
            <span className="tabular-nums">{String(index + 1).padStart(2, '0')}</span>
            <span className="text-page/50"> / {String(shots.length).padStart(2, '0')}</span>
          </p>
          <button
            type="button"
            onClick={onClose}
            aria-label={labels.closeShot}
            className="flex size-11 items-center justify-center rounded-full border border-page/25 text-page transition-colors hover:bg-page hover:text-ink"
          >
            <Close width={18} height={18} />
          </button>
        </div>

        <div className="flex min-h-0 flex-1 items-center gap-3">
          <button
            type="button"
            onClick={() => mover(-1)}
            aria-label={labels.prev}
            className="hidden size-11 shrink-0 rotate-180 items-center justify-center rounded-full border border-page/25 text-page transition-colors hover:bg-page hover:text-ink sm:flex"
          >
            <ArrowRight width={18} height={18} />
          </button>

          <img
            src={shots[index]}
            alt={`${name} — ${captions[index]}`}
            className="min-h-0 flex-1 rounded-[var(--radius-card)] object-contain"
          />

          <button
            type="button"
            onClick={() => mover(1)}
            aria-label={labels.next}
            className="hidden size-11 shrink-0 items-center justify-center rounded-full border border-page/25 text-page transition-colors hover:bg-page hover:text-ink sm:flex"
          >
            <ArrowRight width={18} height={18} />
          </button>
        </div>

        <p aria-live="polite" className="mx-auto max-w-2xl pt-4 text-center text-sm text-page/80">
          {captions[index]}
        </p>
      </div>
    </div>
  )
}
