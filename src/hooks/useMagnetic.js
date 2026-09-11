import { useEffect } from 'react'

/*
 * Atracción magnética del cursor. Un único listener de `pointermove` en el
 * documento: mientras el puntero está ENCIMA de un `.magnetic`, el botón se
 * inclina unos píxeles hacia él y vuelve solo al salir.
 *
 * Sólo encima, no cerca. Antes había un radio de atracción medido desde el
 * centro —la mitad del ancho más 90px—, y en un botón ancho como el del hero
 * eso llegaba a ~225px en todas direcciones: el CTA se movía al pasar por la
 * fila de soluciones, que está debajo y no tiene nada que ver con él. Rubén lo
 * marcó (2026-09-11): el botón responde a su cursor y a nada más.
 *
 * En táctil no se registra nada — no hay puntero que seguir — y con
 * `prefers-reduced-motion` tampoco. Sólo escribe `translate`, así que no
 * provoca relayout.
 */
const FUERZA = 0.22 // fracción de la distancia que recorre el botón

export function useMagnetic() {
  useEffect(() => {
    if (!window.matchMedia('(hover: hover)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let frame = 0
    let last = null

    const soltar = (el) => {
      el.style.translate = ''
    }

    const onMove = (event) => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        const candidato = document
          .elementFromPoint(event.clientX, event.clientY)
          ?.closest?.('.magnetic')

        if (last && last !== candidato) {
          soltar(last)
          last = null
        }
        if (!candidato) return

        const r = candidato.getBoundingClientRect()
        const dx = event.clientX - (r.left + r.width / 2)
        const dy = event.clientY - (r.top + r.height / 2)
        candidato.style.translate = `${(dx * FUERZA).toFixed(1)}px ${(dy * FUERZA).toFixed(1)}px`
        last = candidato
      })
    }

    document.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      document.removeEventListener('pointermove', onMove)
      if (frame) cancelAnimationFrame(frame)
      if (last) soltar(last)
    }
  }, [])
}
