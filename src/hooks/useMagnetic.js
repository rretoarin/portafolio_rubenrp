import { useEffect } from 'react'

/*
 * Atracción magnética del cursor. Un único listener de `pointermove` en el
 * documento: cuando el puntero entra en el radio de un `.magnetic`, el botón se
 * inclina unos píxeles hacia él y vuelve solo al salir.
 *
 * En táctil no se registra nada — no hay puntero que seguir — y con
 * `prefers-reduced-motion` tampoco. Sólo escribe `translate`, así que no
 * provoca relayout.
 */
const RADIO = 90 // px alrededor del botón donde empieza a notarse
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
        const el = document
          .elementFromPoint(event.clientX, event.clientY)
          ?.closest?.('.magnetic')

        // Buscar el más cercano aunque el puntero aún no esté encima.
        const candidato =
          el ||
          [...document.querySelectorAll('.magnetic')].find((node) => {
            const r = node.getBoundingClientRect()
            const dx = event.clientX - (r.left + r.width / 2)
            const dy = event.clientY - (r.top + r.height / 2)
            return Math.hypot(dx, dy) < r.width / 2 + RADIO
          })

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
