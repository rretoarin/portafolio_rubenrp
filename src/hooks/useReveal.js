import { useEffect } from 'react'

// Un solo IntersectionObserver para todo el documento: marca cada `.reveal`
// como visible la primera vez que entra en pantalla y deja de observarlo.
export function useReveal() {
  useEffect(() => {
    const nodes = document.querySelectorAll('.reveal')

    if (!('IntersectionObserver' in window)) {
      nodes.forEach((node) => node.setAttribute('data-visible', 'true'))
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

    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])
}
