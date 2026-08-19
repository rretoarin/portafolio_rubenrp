import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from './icons'

const AUTOPLAY_MS = 5000

/*
 * Carrusel de capturas. Cada captura va dentro de una ventana oscura: sin ella
 * una captura clara flota sobre el negro y no se entiende que hay una tira.
 * Por eso también asoma la siguiente por el borde.
 *
 * El desplazamiento real lo hace el navegador con scroll-snap — el gesto táctil
 * es nativo y no hay que emular arrastre. El índice se lee del scroll, nunca al
 * revés, para que deslizar con el dedo y pulsar el botón nunca se contradigan.
 */
export default function Carousel({ shots, captions, labels, name, frameLabel }) {
  const trackRef = useRef(null)
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const count = shots.length

  // Posición de scroll en la que cada captura queda encajada. Se calcula del
  // DOM y no del ancho del contenedor, porque las diapositivas no ocupan el
  // 100%: hay que dejar asomar la siguiente.
  const targetFor = (track, i) => {
    const slide = track.children[i]
    return Math.min(slide.offsetLeft, track.scrollWidth - track.clientWidth)
  }

  const scrollToIndex = useCallback((next, behavior) => {
    const track = trackRef.current
    if (!track) return
    track.scrollTo({ left: targetFor(track, next), behavior })
  }, [])

  const go = useCallback(
    (step) => {
      const next = (index + step + count) % count
      // Al dar la vuelta (última → primera) el salto es seco: recorrer toda la
      // cinta en suave sería un barrido larguísimo.
      const wraps = Math.abs(next - index) > 1
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      scrollToIndex(next, wraps || reduced ? 'auto' : 'smooth')
      setIndex(next)
    },
    [count, index, scrollToIndex],
  )

  // El scroll manda: al deslizar con el dedo se recalcula el índice buscando la
  // diapositiva cuya posición encajada es la más cercana a la actual.
  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        let closest = 0
        let best = Infinity
        for (let i = 0; i < track.children.length; i += 1) {
          const distance = Math.abs(targetFor(track, i) - track.scrollLeft)
          if (distance < best) {
            best = distance
            closest = i
          }
        }
        setIndex((prev) => (prev === closest ? prev : closest))
      })
    }

    track.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      track.removeEventListener('scroll', onScroll)
    }
  }, [])

  // Fuera de pantalla no tiene sentido que avance solo.
  const [onScreen, setOnScreen] = useState(false)
  useEffect(() => {
    const track = trackRef.current
    if (!track || !('IntersectionObserver' in window)) {
      setOnScreen(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => setOnScreen(entry.isIntersecting),
      { threshold: 0.35 },
    )
    observer.observe(track)
    return () => observer.disconnect()
  }, [])

  /*
   * Avance automático. Se apaga si el usuario pide menos movimiento, mientras
   * el puntero o el foco están encima, y cuando el carrusel no se ve. Como `go`
   * cambia con el índice, el temporizador se reinicia en cada paso: así una
   * pulsación manual también da 5 segundos limpios antes del siguiente salto.
   */
  useEffect(() => {
    if (count < 2 || paused || !onScreen) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timer = setInterval(() => go(1), AUTOPLAY_MS)
    return () => clearInterval(timer)
  }, [count, go, onScreen, paused])

  const onKeyDown = (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      go(-1)
    } else if (event.key === 'ArrowRight') {
      event.preventDefault()
      go(1)
    }
  }

  const position = (i) => labels.shotOf.replace('{i}', i + 1).replace('{n}', count)

  return (
    <div
      role="group"
      aria-roledescription={labels.galleryLabel}
      aria-label={`${labels.galleryLabel} — ${name}`}
      onKeyDown={onKeyDown}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="relative">
        <div
          ref={trackRef}
          className="gallery-track flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain"
        >
          {shots.map((src, i) => (
            <figure
              key={src}
              aria-label={position(i)}
              className={`w-[88%] shrink-0 snap-start transition-opacity duration-500 md:w-[91%] ${
                i === index ? 'opacity-100' : 'opacity-40'
              }`}
            >
              <div className="overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface">
                {/* Barra de ventana: es lo que ancla la captura clara al negro. */}
                <div className="flex items-center gap-3 border-b border-line bg-raised px-4 py-2.5">
                  <span aria-hidden className="flex shrink-0 gap-1.5">
                    <span className="size-2 rounded-full bg-line-strong" />
                    <span className="size-2 rounded-full bg-line-strong" />
                    <span className="size-2 rounded-full bg-line-strong" />
                  </span>
                  <span className="truncate font-mono text-[0.6875rem] text-muted">
                    {frameLabel}
                  </span>
                  <span className="ml-auto shrink-0 font-mono text-[0.6875rem] tabular-nums text-soft">
                    <span className="text-bright">{String(i + 1).padStart(2, '0')}</span>
                    <span className="text-muted"> / {String(count).padStart(2, '0')}</span>
                  </span>
                </div>

                <img
                  src={src}
                  alt={`${name} — ${captions[i]}`}
                  width={1600}
                  height={900}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                  draggable={false}
                  className="block aspect-[16/9] w-full object-cover"
                />
              </div>
            </figure>
          ))}
        </div>

        {/* Controles sobre la propia imagen; visibles siempre, también en táctil. */}
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label={labels.prev}
          className="gallery-btn left-2 md:left-3"
        >
          <ChevronLeft width={20} height={20} strokeWidth={1.75} />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label={labels.next}
          className="gallery-btn right-2 md:right-3"
        >
          <ChevronRight width={20} height={20} strokeWidth={1.75} />
        </button>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
        <p aria-live="polite" className="max-w-xl text-sm leading-relaxed text-muted">
          {captions[index]}
        </p>

        <div className="flex shrink-0 items-center gap-1.5">
          {shots.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => {
                scrollToIndex(i, 'smooth')
                setIndex(i)
              }}
              aria-label={position(i)}
              aria-current={i === index}
              className="group flex h-6 items-center px-0.5"
            >
              <span
                className={`h-1 rounded-full transition-all duration-300 ${
                  i === index ? 'w-6 bg-bright' : 'w-2 bg-line-strong group-hover:bg-muted'
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
