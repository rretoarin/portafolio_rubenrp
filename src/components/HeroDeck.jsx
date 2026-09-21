import { useEffect, useState } from 'react'
import { useMedia } from '../hooks/useMedia'
import { SIZES_MAZO, srcsetFor } from '../data/capturas'
import { ChevronLeft, ChevronRight, Pause, Play } from './icons'

const CICLO_MS = 2900

// Las tres cartas del mazo, de atrás adelante: k = 0 es la de delante.
const CARTAS = [2, 1, 0]

/*
 * El visor del hero: un mazo de cartas apiladas, una por proyecto (el sistema
 * interno de Arin y la web de J&M), que pasan solas cada 2,9 s.
 *
 * Cada carta es una ventana falsa —barra de 26px con tres puntos— y la captura
 * debajo, con `contain` sobre el paspartú: las capturas nunca se recortan.
 * Las de atrás se desplazan, encogen, giran y se desenfocan según su posición.
 *
 * Se pausa con el puntero encima, con el botón, con las flechas ← → y mientras
 * la pestaña está oculta. UN solo intervalo, limpiado en su efecto. Con
 * `prefers-reduced-motion` no pasa solo: las flechas siguen funcionando.
 */
export default function HeroDeck({ shots, labels }) {
  const [i, setI] = useState(0)
  const [reproduciendo, setReproduciendo] = useState(true)
  const [encima, setEncima] = useState(false)
  const [oculto, setOculto] = useState(() => typeof document !== 'undefined' && document.hidden)
  const quieto = useMedia('(prefers-reduced-motion: reduce)')
  const total = shots.length

  const mover = (paso) => setI((actual) => (actual + paso + total) % total)

  useEffect(() => {
    const onVis = () => setOculto(document.hidden)
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [])

  useEffect(() => {
    if (!reproduciendo || encima || oculto || quieto) return
    const id = setInterval(() => setI((actual) => (actual + 1) % total), CICLO_MS)
    return () => clearInterval(id)
  }, [reproduciendo, encima, oculto, quieto, total])

  // Flechas del teclado: mueven y pausan. No si hay un visor abierto o se escribe.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return
      if (document.querySelector('[role="dialog"]')) return
      if (e.target.closest?.('input, textarea, select, [contenteditable="true"]')) return
      setI((actual) => (actual + (e.key === 'ArrowRight' ? 1 : -1) + total) % total)
      setReproduciendo(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [total])

  const actual = shots[i]

  return (
    <div onMouseEnter={() => setEncima(true)} onMouseLeave={() => setEncima(false)}>
      <div className="deck">
        {CARTAS.map((k) => {
          const shot = shots[(i + k) % total]
          const delante = k === 0
          return (
            <div
              key={k}
              aria-hidden={!delante}
              className="deck-card"
              style={{
                transform: `translate3d(${k * 7}%, ${k * -5}%, 0) scale(${1 - k * 0.06}) rotate(${k * 1.3}deg)`,
                opacity: 1 - k * 0.2,
                filter: delante ? 'none' : 'blur(0.5px)',
                zIndex: 10 - k,
                pointerEvents: delante ? 'auto' : 'none',
              }}
            >
              <div className="deck-bar">
                <span />
                <span />
                <span />
              </div>
              <div className="deck-shot">
                <img
                  src={shot.src}
                  srcSet={srcsetFor(shot.src)}
                  sizes={SIZES_MAZO}
                  alt={delante ? shot.caption : ''}
                  decoding="async"
                />
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2.5">
        <button type="button" onClick={() => mover(-1)} aria-label={labels.prev} className="deck-btn">
          <ChevronLeft width={18} height={18} />
        </button>
        <button
          type="button"
          onClick={() => setReproduciendo((r) => !r)}
          aria-label={reproduciendo ? labels.pause : labels.play}
          title={reproduciendo ? labels.pause : labels.play}
          className="deck-btn"
        >
          {reproduciendo ? <Pause width={16} height={16} /> : <Play width={16} height={16} />}
        </button>
        <button type="button" onClick={() => mover(1)} aria-label={labels.next} className="deck-btn">
          <ChevronRight width={18} height={18} />
        </button>
        <span className="deck-counter">
          {i + 1} / {total}
        </span>
        <span className="deck-tag">{labels.tag}</span>
      </div>

      <div className="deck-progress">
        <span style={{ transform: `scaleX(${(i + 1) / total})` }} />
      </div>

      <p className="deck-caption">{actual.caption}</p>
    </div>
  )
}
