import { useEffect } from 'react'

// Un solo IntersectionObserver para todo el documento: marca cada `.reveal`
// como visible la primera vez que entra en pantalla y deja de observarlo.
export function useReveal() {
  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      document
        .querySelectorAll('.reveal')
        .forEach((node) => node.setAttribute('data-visible', 'true'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.setAttribute('data-visible', 'true')
          observer.unobserve(entry.target)
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )

    // Observa el nodo y todo `.reveal` que cuelgue de él.
    const observe = (node) => {
      if (node.classList.contains('reveal')) observer.observe(node)
      node.querySelectorAll('.reveal').forEach((child) => observer.observe(child))
    }

    observe(document.body)

    /*
     * React puede montar `.reveal` nuevos después del primer render: pasa, por
     * ejemplo, si una lista se vuelve a crear al cambiar de idioma. Sin esto se
     * quedarían en opacity 0 y sólo aparecerían al recargar la página.
     */
    const watcher = new MutationObserver((records) => {
      records.forEach((record) => {
        record.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) observe(node)
        })
      })
    })
    watcher.observe(document.body, { childList: true, subtree: true })

    return () => {
      watcher.disconnect()
      observer.disconnect()
    }
  }, [])
}
