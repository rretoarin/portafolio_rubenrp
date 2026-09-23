import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowRight, Close } from './icons'

const MAX = 4
const DOBLE = 2.5
const REPOSO = { s: 1, x: 0, y: 0 }

/*
 * Zoom de la captura. En el móvil una tabla del sistema de Arin cabe en ~340px
 * y no se lee: aquí se amplía con dos dedos, con doble toque (o doble clic) y
 * se recorre arrastrando. Todo con Pointer Events, sin librería.
 *
 * `touch-none` es lo que impide que el pellizco amplíe la página entera en vez
 * de la captura. El desplazamiento se limita al dibujo real de la imagen —no a
 * su caja, que con `object-contain` lleva franjas vacías— para que nunca se
 * pueda arrastrar la captura fuera de la vista.
 */
function Zoom({ src, alt }) {
  const zona = useRef(null)
  const foto = useRef(null)
  const punteros = useRef(new Map())
  const inicio = useRef(null)
  const toque = useRef(null)
  const [vista, setVista] = useState(REPOSO)
  const [gesto, setGesto] = useState(false)

  // Coordenadas respecto al centro de la zona, que es el origen del transform.
  const alCentro = (cx, cy) => {
    const z = zona.current.getBoundingClientRect()
    return { x: cx - z.left - z.width / 2, y: cy - z.top - z.height / 2 }
  }

  const limitar = ({ s, x, y }) => {
    const z = zona.current.getBoundingClientRect()
    const im = foto.current
    const r = Math.min(z.width / (im.naturalWidth || 1), z.height / (im.naturalHeight || 1))
    const mx = Math.max(0, (im.naturalWidth * r * s - z.width) / 2)
    const my = Math.max(0, (im.naturalHeight * r * s - z.height) / 2)
    return { s, x: Math.min(mx, Math.max(-mx, x)), y: Math.min(my, Math.max(-my, y)) }
  }

  // Amplía manteniendo quieto el punto `p` bajo el dedo o el cursor.
  const ampliar = (s, p, v) => {
    const s2 = Math.min(MAX, Math.max(1, s))
    return limitar({ s: s2, x: p.x - (p.x - v.x) * (s2 / v.s), y: p.y - (p.y - v.y) * (s2 / v.s) })
  }

  const empezar = () => {
    const [a, b] = [...punteros.current.values()]
    inicio.current = b
      ? { dist: Math.hypot(a.x - b.x, a.y - b.y), mid: alCentro((a.x + b.x) / 2, (a.y + b.y) / 2), v: vista }
      : { x: a.x, y: a.y, v: vista, movido: false }
  }

  const onPointerDown = (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return
    zona.current.setPointerCapture(e.pointerId)
    punteros.current.set(e.pointerId, { x: e.clientX, y: e.clientY })
    setGesto(true)
    empezar()
  }

  const onPointerMove = (e) => {
    if (!punteros.current.has(e.pointerId)) return
    punteros.current.set(e.pointerId, { x: e.clientX, y: e.clientY })
    const i = inicio.current
    const [a, b] = [...punteros.current.values()]
    if (b) {
      const mid = alCentro((a.x + b.x) / 2, (a.y + b.y) / 2)
      const v = ampliar(i.v.s * (Math.hypot(a.x - b.x, a.y - b.y) / i.dist), i.mid, i.v)
      setVista(limitar({ ...v, x: v.x + mid.x - i.mid.x, y: v.y + mid.y - i.mid.y }))
      return
    }
    if (Math.hypot(a.x - i.x, a.y - i.y) > 8) i.movido = true
    if (i.v.s > 1) setVista(limitar({ ...i.v, x: i.v.x + a.x - i.x, y: i.v.y + a.y - i.y }))
  }

  const onPointerUp = (e) => {
    if (!punteros.current.has(e.pointerId)) return
    punteros.current.delete(e.pointerId)
    const i = inicio.current
    if (punteros.current.size) {
      // Se levantó un dedo del pellizco: el que queda sigue arrastrando.
      empezar()
      toque.current = null
      return
    }
    setGesto(false)
    if (i?.dist || i?.movido) return (toque.current = null)
    const antes = toque.current
    const ahora = { t: e.timeStamp, x: e.clientX, y: e.clientY }
    if (antes && ahora.t - antes.t < 320 && Math.hypot(ahora.x - antes.x, ahora.y - antes.y) < 30) {
      setVista(vista.s > 1 ? REPOSO : ampliar(DOBLE, alCentro(ahora.x, ahora.y), vista))
      toque.current = null
    } else {
      toque.current = ahora
    }
  }

  return (
    <div
      ref={zona}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      className={`relative min-h-0 flex-1 self-stretch touch-none overflow-hidden select-none ${
        vista.s > 1 ? 'cursor-grab active:cursor-grabbing' : 'cursor-zoom-in'
      }`}
    >
      <img
        ref={foto}
        src={src}
        alt={alt}
        draggable={false}
        style={{ transform: `translate3d(${vista.x}px, ${vista.y}px, 0) scale(${vista.s})` }}
        className={`size-full rounded-[var(--radius-card)] object-contain ${
          gesto ? '' : 'motion-safe:transition-transform motion-safe:duration-200'
        }`}
      />
    </div>
  )
}

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
      className="lightbox fixed inset-0 z-[70] flex flex-col bg-scrim/92 p-4 backdrop-blur-sm md:p-8"
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
          <p className="text-sm font-medium text-on-scrim">
            <span className="tabular-nums">{String(index + 1).padStart(2, '0')}</span>
            <span className="text-on-scrim/50"> / {String(shots.length).padStart(2, '0')}</span>
          </p>
          <button
            type="button"
            onClick={onClose}
            aria-label={labels.closeShot}
            className="flex size-11 items-center justify-center rounded-full border border-on-scrim/25 text-on-scrim transition-colors hover:bg-on-scrim focus-visible:bg-on-scrim hover:text-scrim focus-visible:text-scrim"
          >
            <Close width={18} height={18} />
          </button>
        </div>

        <div className="flex min-h-0 flex-1 items-center gap-3">
          <button
            type="button"
            onClick={() => mover(-1)}
            aria-label={labels.prev}
            className="hidden size-11 shrink-0 rotate-180 items-center justify-center rounded-full border border-on-scrim/25 text-on-scrim transition-colors hover:bg-on-scrim focus-visible:bg-on-scrim hover:text-scrim focus-visible:text-scrim sm:flex"
          >
            <ArrowRight width={18} height={18} />
          </button>

          {/* La `key` vuelve el zoom a cero en cada captura. */}
          <Zoom key={index} src={shots[index]} alt={`${name} — ${captions[index]}`} />

          <button
            type="button"
            onClick={() => mover(1)}
            aria-label={labels.next}
            className="hidden size-11 shrink-0 items-center justify-center rounded-full border border-on-scrim/25 text-on-scrim transition-colors hover:bg-on-scrim focus-visible:bg-on-scrim hover:text-scrim focus-visible:text-scrim sm:flex"
          >
            <ArrowRight width={18} height={18} />
          </button>
        </div>

        <p aria-live="polite" className="mx-auto max-w-2xl pt-4 text-center text-sm text-on-scrim/80">
          {captions[index]}
        </p>
        <p className="pt-1 text-center text-xs text-on-scrim/60">
          <span className="pointer-fine:hidden">{labels.zoomTouch}</span>
          <span className="hidden pointer-fine:inline">{labels.zoomMouse}</span>
        </p>

        {/*
          En móvil las flechas de los lados no caben —la captura se quedaría en
          nada— y no hay teclado, así que sin esto el visor se abría y ya no se
          podía pasar de la primera captura. Aquí van debajo, a tamaño real.
        */}
        <div className="flex items-center justify-center gap-4 pt-4 sm:hidden">
          <button
            type="button"
            onClick={() => mover(-1)}
            aria-label={labels.prev}
            className="flex size-11 rotate-180 items-center justify-center rounded-full border border-on-scrim/25 text-on-scrim"
          >
            <ArrowRight width={18} height={18} />
          </button>
          <button
            type="button"
            onClick={() => mover(1)}
            aria-label={labels.next}
            className="flex size-11 items-center justify-center rounded-full border border-on-scrim/25 text-on-scrim"
          >
            <ArrowRight width={18} height={18} />
          </button>
        </div>
      </div>
    </div>
  )
}
