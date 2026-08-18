import { useEffect } from 'react'

// Un solo listener para todo el documento: coloca el foco de luz de `.card`
// en la posición del puntero. En táctil no se ejecuta nunca, así que el
// degradado se queda fuera de la tarjeta y es invisible.
export function useSpotlight() {
  useEffect(() => {
    if (!window.matchMedia('(hover: hover)').matches) return

    let frame = 0
    let last = null

    const onMove = (event) => {
      const card = event.target.closest?.('.card')

      if (last && last !== card) {
        last.style.removeProperty('--mx')
        last.style.removeProperty('--my')
        last = null
      }
      if (!card) return

      last = card
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        const rect = card.getBoundingClientRect()
        card.style.setProperty('--mx', `${event.clientX - rect.left}px`)
        card.style.setProperty('--my', `${event.clientY - rect.top}px`)
      })
    }

    document.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      document.removeEventListener('pointermove', onMove)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])
}
