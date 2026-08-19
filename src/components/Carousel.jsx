import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from './icons'

/*
 * Carrusel de capturas. El desplazamiento real lo hace el navegador con
 * scroll-snap — así el gesto táctil es nativo y no hay que emular arrastre.
 * Los botones sólo empujan el scroll; el índice se lee de vuelta del scroll,
 * nunca al revés, para que deslizar con el dedo y pulsar el botón coincidan.
 */
export default function Carousel({ shots, captions, labels, name }) {
  const trackRef = useRef(null)
  const [index, setIndex] = useState(0)
  const count = shots.length

  const scrollToIndex = useCallback((next, behavior) => {
    const track = trackRef.current
    if (!track) return
    track.scrollTo({ left: next * track.clientWidth, behavior })
  }, [])

  const go = useCallback(
    (step) => {
      const next = (index + step + count) % count
      // Al dar la vuelta (última → primera) el salto es seco: recorrer toda
      // la cinta en suave sería un barrido larguísimo.
      const wraps = Math.abs(next - index) > 1
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      scrollToIndex(next, wraps || reduced ? 'auto' : 'smooth')
      setIndex(next)
    },
    [count, index, scrollToIndex],
  )

  // El scroll manda: al deslizar con el dedo se recalcula el índice.
  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const current = Math.round(track.scrollLeft / track.clientWidth)
        setIndex((prev) => (prev === current ? prev : current))
      })
    }

    track.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      track.removeEventListener('scroll', onScroll)
    }
  }, [])

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
    >
      <div className="relative overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface">
        <div
          ref={trackRef}
          className="gallery-track flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain"
        >
          {shots.map((src, i) => (
            <figure
              key={src}
              className="w-full shrink-0 snap-center"
              aria-label={position(i)}
            >
              <img
                src={src}
                alt={`${name} — ${captions[i]}`}
                width={1600}
                height={1000}
                loading={i === 0 ? 'eager' : 'lazy'}
                decoding="async"
                draggable={false}
                className="block aspect-[16/10] w-full object-cover"
              />
            </figure>
          ))}
        </div>

        {/* Controles sobre la propia imagen; visibles siempre, también en táctil. */}
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label={labels.prev}
          className="gallery-btn left-3 md:left-4"
        >
          <ChevronLeft width={18} height={18} />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label={labels.next}
          className="gallery-btn right-3 md:right-4"
        >
          <ChevronRight width={18} height={18} />
        </button>

        <p className="pointer-events-none absolute bottom-3 left-3 rounded-full border border-line-strong bg-ink/70 px-3 py-1 font-mono text-[0.6875rem] text-soft backdrop-blur-sm md:bottom-4 md:left-4">
          <span className="text-bright tabular-nums">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="text-muted"> / {String(count).padStart(2, '0')}</span>
        </p>
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
