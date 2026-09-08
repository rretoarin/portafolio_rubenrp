import { useEffect } from 'react'

/*
 * Desplazamiento ligado al scroll. Un único listener para toda la página: cada
 * elemento con `data-parallax="0.12"` se mueve esa fracción de lo que se ha
 * desplazado desde que entró en pantalla.
 *
 * Sólo toca `transform`, así que el navegador lo resuelve en la GPU y no
 * dispara relayout. El cálculo va dentro de un requestAnimationFrame y sólo
 * para los elementos visibles: fuera de pantalla no se hace ninguna cuenta.
 */
export function useParallax() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const nodes = new Set()
    let frame = 0

    const update = () => {
      frame = 0
      const vh = window.innerHeight
      nodes.forEach((el) => {
        const rect = el.getBoundingClientRect()
        if (rect.bottom < -200 || rect.top > vh + 200) return
        // -1 arriba del todo, 0 centrado, 1 abajo del todo.
        const progress = (rect.top + rect.height / 2 - vh / 2) / vh
        const amount = parseFloat(el.dataset.parallax) || 0.1
        el.style.transform = `translate3d(0, ${(progress * amount * -100).toFixed(2)}px, 0)`
      })
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    /*
     * El observer decide qué entra al bucle. Con dos o tres elementos daría
     * igual, pero así la lista no crece con la página y el scroll sigue
     * costando lo mismo aunque mañana haya veinte.
     */
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) nodes.add(entry.target)
          else nodes.delete(entry.target)
        })
        onScroll()
      },
      { rootMargin: '200px 0px' },
    )

    const observe = (root) => {
      if (root.dataset?.parallax) io.observe(root)
      root.querySelectorAll?.('[data-parallax]').forEach((el) => io.observe(el))
    }
    observe(document.body)

    // Al cambiar de idioma React remonta listas enteras; sin esto los nodos
    // nuevos se quedarían quietos hasta recargar.
    const watcher = new MutationObserver((records) => {
      records.forEach((record) => {
        record.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) observe(node)
        })
      })
    })
    watcher.observe(document.body, { childList: true, subtree: true })

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    update()

    return () => {
      watcher.disconnect()
      io.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])
}
